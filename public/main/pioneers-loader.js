











async function loadPioneers() {
    const container = document.getElementById('pioneers-container');
    if (!container) return;

    try {
        const response = await fetch('./config/pioneers.json');
        if (!response.ok) throw new Error('Failed to load pioneers');
        const data = await response.json();
        renderPioneers(data, container);
    } catch (error) {
        console.error('Pioneers Error:', error);
        container.innerHTML = '<p class="error-text">Unable to load pioneers content.</p>';
    }
}



function renderPioneers(data, container) {

    const lang = window.LanguageManager?.currentLang || 'en';

    // 1. Build the Slider Layout (RTL)
    container.innerHTML = `
        <div class="card-slider-wrapper">
            <div class="card-slider" dir="rtl">
                <button class="slider-btn prev" aria-label="Previous">›</button>
                <div class="slider-viewport">
                    <div class="slider-track">
                        <!-- Slides will be injected here -->
                    </div>
                </div>
                <button class="slider-btn next" aria-label="Next">‹</button>
            </div>
        </div>
    `;

    const section = document.getElementById('pioneers'); // Or use container.parentElement
    const track = container.querySelector('.slider-track');
    const prevBtn = container.querySelector('.slider-btn.prev');
    const nextBtn = container.querySelector('.slider-btn.next');
    let index = 0;

    // 2. Sort data
    const sortedData = data.sort((a, b) => (a.priority || 999) - (b.priority || 999));

    // 3. Populate Slides
    sortedData.forEach(pioneer => {
        let content = `
            <article class="slider-card" dir="auto">
                <div class="quote-wrapper">
                <i class="fas fa-quote-right quote-icon"></i>
                    <p class="quote"><span>"${pioneer.message || pioneer.quote}"</span></p>
                </div>
                <button class="see-more" aria-expanded="false">See more</button>
                <div class="author-info">
                    <h4 class="author name">— ${pioneer.author || pioneer.name}</h4>
                    <h4 class="author role">${pioneer.role || ''}</h4>
                    <h4 class="author year">${lang === 'en' ? 'Class of' : 'دفعة'} ${pioneer.year || pioneer.graduationYear || ''}</h4>
                </div>
            </article>
        `;
        track.insertAdjacentHTML('beforeend', content);
    });

    const slides = Array.from(track.children);

    // 4. Wire up "See more" buttons
    // Use requestAnimationFrame to ensure DOM flows have settled
    requestAnimationFrame(() => {
        slides.forEach(card => {
            const wrapper = card.querySelector('.quote-wrapper');
            const quote = card.querySelector('.quote'); // Check the text element
            const btn = card.querySelector('.see-more');
            if (!wrapper || !btn || !quote) return;

            // Check overflow on the text element (line-clamp)
            // Simple check: is scrollHeight (content) > clientHeight (box)?
            // const isOverflowing = quote.scrollHeight > quote.clientHeight;
            const isOverflowing = quote.offsetHeight < quote.scrollHeight;

            if (!isOverflowing) {
                btn.style.display = 'none';
            } else {
                btn.style.display = 'block';

                btn.addEventListener('click', () => {
                    const isExpanded = wrapper.classList.contains('expanded');

                    // Close all others
                    slides.forEach(otherCard => {
                        if (otherCard === card) return;

                        const otherWrapper = otherCard.querySelector('.quote-wrapper');
                        const otherBtn = otherCard.querySelector('.see-more');

                        if (otherWrapper?.classList.contains('expanded')) {
                            otherWrapper.style.maxHeight = otherWrapper.scrollHeight + "px";

                            requestAnimationFrame(() => {
                                otherWrapper.style.maxHeight = "8.5rem";
                            });

                            setTimeout(() => {
                                otherWrapper.classList.remove('expanded');
                                otherWrapper.style.maxHeight = null;
                            }, 600);

                            if (otherBtn) {
                                otherBtn.textContent = 'See more';
                                otherBtn.setAttribute('aria-expanded', 'false');
                            }
                        }
                    });

                    // Toggle current
                    if (isExpanded) {
                        wrapper.style.maxHeight = wrapper.scrollHeight + "px";

                        requestAnimationFrame(() => {
                            wrapper.style.maxHeight = "8.5rem";
                        });

                        setTimeout(() => {
                            wrapper.classList.remove('expanded');
                            wrapper.style.maxHeight = null;
                        }, 600);

                        btn.textContent = 'See more';
                        btn.setAttribute('aria-expanded', 'false');

                    } else {
                        wrapper.classList.add('expanded');
                        wrapper.style.maxHeight = wrapper.scrollHeight + "px";

                        btn.textContent = 'See less';
                        btn.setAttribute('aria-expanded', 'true');
                    }
                });
            }
        });

        // Initial update
        update();
    });

    function update() {
        if (!slides.length) return;

        const viewport = container.querySelector('.slider-viewport');
        const viewportWidth = viewport.clientWidth;
        const slideWidth = slides[0].offsetWidth;
        const gap = parseFloat(getComputedStyle(track).gap || 0);
        const paddingStart = parseFloat(getComputedStyle(track).paddingInlineStart || 0);

        const visibleCount = Math.max(1, Math.floor((viewportWidth + gap) / (slideWidth + gap)));
        const maxIndex = Math.max(0, slides.length - visibleCount);

        index = Math.min(Math.max(0, index), maxIndex);

        const currentVisibleCount = Math.min(visibleCount, slides.length - index);
        const groupWidth = currentVisibleCount * slideWidth + (currentVisibleCount - 1) * gap;
        const targetOffset = (viewportWidth - groupWidth) / 2;

        const itemPosition = paddingStart + index * (slideWidth + gap);
        const offset = itemPosition - targetOffset;

        // RTL: Positive transform moves track to the right, revealing items on the left
        const direction = 1;
        track.style.transform = `translateX(${offset * direction}px)`;

        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === maxIndex;
    }

    function closeAllCards() {
        slides.forEach(card => {
            const wrapper = card.querySelector('.quote-wrapper');
            const btn = card.querySelector('.see-more');

            if (wrapper?.classList.contains('expanded')) {
                wrapper.classList.remove('expanded');
                wrapper.style.maxHeight = null;

                if (btn) {
                    btn.textContent = 'See more';
                    btn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }

    function recalcOverflow() {
        slides.forEach(card => {
            const quote = card.querySelector('.quote');
            const btn = card.querySelector('.see-more');

            if (!quote || !btn) return;

            const isOverflowing = quote.offsetHeight < quote.scrollHeight;
            btn.style.display = isOverflowing ? 'block' : 'none';
        });
    }

    // 5. Navigation Events
    prevBtn.addEventListener('click', () => {
        index -= 1;
        closeAllCards();
        update();
    });

    nextBtn.addEventListener('click', () => {
        index += 1;
        closeAllCards();
        update();
    });

    window.addEventListener('resize', () => {
        update();
        recalcOverflow();
    });

    // 6. Swipe Support
    let dragging = false;
    let startX = 0;
    let currentX = 0;
    let baseTranslateX = 0;
    const viewport = container.querySelector('.slider-viewport');

    // Touch Events
    viewport.addEventListener('touchstart', (e) => {
        if (!e.touches || e.touches.length === 0) return;
        startX = e.touches[0].clientX;
        currentX = startX;
        dragging = true;

        const style = getComputedStyle(track).transform;
        if (style && style !== 'none') {
            try {
                const m = new DOMMatrixReadOnly(style);
                baseTranslateX = m.m41;
            } catch (err) {
                const match = style.match(/matrix\([^,]+,[^,]+,[^,]+,[^,]+,\s*([^,]+),/);
                baseTranslateX = match ? parseFloat(match[1]) : 0;
            }
        } else {
            baseTranslateX = 0;
        }
        track.style.transition = 'none';
    }, { passive: true });

    viewport.addEventListener('touchmove', (e) => {
        if (!dragging) return;
        if (!e.touches || e.touches.length === 0) return;
        // e.preventDefault(); // Optional: prevent vertical scroll
        currentX = e.touches[0].clientX;
        const dx = currentX - startX;
        track.style.transform = `translateX(${baseTranslateX + dx}px)`;
    }, { passive: false });

    viewport.addEventListener('touchend', (e) => {
        if (!dragging) return;
        dragging = false;
        track.style.transition = '';

        const totalDx = currentX - startX;
        if (!slides.length) return;

        const slideWidth = slides[0].offsetWidth;
        const threshold = slideWidth * 0.25;

        // Dragged Right -> Move Track Right -> Reveal Left -> Next Item
        if (totalDx > threshold) {
            index += 1;
        } else if (totalDx < -threshold) {
            index -= 1;
        }

        update();

    }, { passive: true });

    // Mouse Events for dragging
    viewport.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        currentX = startX;
        dragging = true;
        viewport.style.cursor = 'grabbing';

        const style = getComputedStyle(track).transform;
        if (style && style !== 'none') {
            try {
                const m = new DOMMatrixReadOnly(style);
                baseTranslateX = m.m41;
            } catch (err) {
                const match = style.match(/matrix\([^,]+,[^,]+,[^,]+,[^,]+,\s*([^,]+),/);
                baseTranslateX = match ? parseFloat(match[1]) : 0;
            }
        } else {
            baseTranslateX = 0;
        }
        track.style.transition = 'none';
    });

    window.addEventListener('mousemove', (e) => {
        if (!dragging) return;
        e.preventDefault(); // Prevent text selection while dragging
        currentX = e.clientX;
        const dx = currentX - startX;
        track.style.transform = `translateX(${baseTranslateX + dx}px)`;
    });

    const handleMouseUp = (e) => {
        if (!dragging) return;
        dragging = false;
        viewport.style.cursor = 'grab';
        track.style.transition = '';

        const totalDx = currentX - startX;
        if (!slides.length) return;

        const slideWidth = slides[0].offsetWidth;
        const threshold = slideWidth * 0.25;

        // Dragged Right -> Move Track Right -> Reveal Left -> Next Item
        if (totalDx > threshold) {
            index += 1;
        } else if (totalDx < -threshold) {
            index -= 1;
        }

        update();
    };

    window.addEventListener('mouseup', handleMouseUp);
    
    // Set initial cursor
    viewport.style.cursor = 'grab';

    if (window.AOS) {
        window.AOS.refresh()
    };
}





/**
 * Pioneers Loader with Bilingual Support
 */
document.addEventListener('DOMContentLoaded', () => {
    loadPioneers();

    window.addEventListener('languageChanged', () => {
        loadPioneers();
    });
});