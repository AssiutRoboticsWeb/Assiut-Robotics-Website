document.addEventListener('DOMContentLoaded', () => {
     loadPioneers();
});

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
     data.sort((a, b) => (a.priority || 999) - (b.priority || 999));

     // 3. Populate Slides
     data.forEach(pioneer => {
          let content = `
            <article class="slider-card" dir="auto">
                <div class="quote-wrapper">
                    <p class="quote"><span>"${pioneer.message || pioneer.quote}"</span></p>
                </div>
                <button class="see-more" aria-expanded="false">See more</button>
                <div class="author-info">
                    <h4 class="author name">— ${pioneer.author || pioneer.name}</h4>
                    <h4 class="author role">${pioneer.graduationYear ? '— ' + pioneer.graduationYear : (pioneer.role || '')}</h4>
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
               const isOverflowing = quote.scrollHeight > quote.clientHeight;

               if (!isOverflowing) {
                    btn.style.display = 'none';
               } else {
                    btn.style.display = 'block'; // Ensure visible if needed
                    btn.addEventListener('click', () => {
                         const isCurrentlyExpanded = wrapper.classList.contains('expanded');

                         // Helper to smooth collapse
                         const collapse = (el, btn) => {
                              // 1. Lock current height in pixels
                              el.style.maxHeight = el.scrollHeight + "px";

                              // 2. Force reflow
                              void el.offsetHeight;

                              // 3. Animate to the collapsed CSS height (8.5rem)
                              // We set this explicitly so the browser has a target to animate to
                              el.style.maxHeight = '8.5rem';

                              if (btn) {
                                   btn.setAttribute('aria-expanded', 'false');
                                   btn.textContent = 'See more';
                              }

                              // 4. Cleanup after transition
                              setTimeout(() => {
                                   el.classList.remove('expanded');
                                   el.style.maxHeight = null; // Revert to CSS handling
                              }, 400); // Matches CSS transition duration
                         };

                         // 1. Collapse ALL other cards
                         slides.forEach(otherCard => {
                              if (otherCard === card) return; // Skip self
                              const otherWrapper = otherCard.querySelector('.quote-wrapper');
                              const otherBtn = otherCard.querySelector('.see-more');

                              if (otherWrapper && otherWrapper.classList.contains('expanded')) {
                                   collapse(otherWrapper, otherBtn);
                              }
                         });

                         // 2. Toggle SELF
                         if (isCurrentlyExpanded) {
                              collapse(wrapper, btn);
                         } else {
                              // Expand
                              wrapper.classList.add('expanded');
                              wrapper.style.maxHeight = wrapper.scrollHeight + "px"; // Expand to exact height
                              btn.setAttribute('aria-expanded', 'true');
                              btn.textContent = 'See less';
                         }
                    });
               }
          });

          // Initial update
          update();
     });

     function update() {
          if (!slides.length) return;

          const slideWidth = slides[0].getBoundingClientRect().width;
          // console.log('slideWidth:', slideWidth);
          const viewport = container.querySelector('.slider-viewport');
          const gap = parseFloat(getComputedStyle(track).gap || 0);

          const visibleCount = Math.max(1, Math.floor(viewport.clientWidth / (slideWidth + gap)));
          const maxIndex = Math.max(0, slides.length - visibleCount);

          index = Math.min(Math.max(0, index), maxIndex);
          const offset = index * (slideWidth + gap);

          // RTL: Postive transform moves track to the right, revealing items on the left
          track.style.transform = `translateX(${offset}px)`;
          prevBtn.disabled = index === 0;
          nextBtn.disabled = index === maxIndex;
     }

     // 5. Navigation Events
     prevBtn.addEventListener('click', () => { index -= 1; update(); });
     nextBtn.addEventListener('click', () => { index += 1; update(); });
     window.addEventListener('resize', update);

     // 6. Swipe Support
     let dragging = false;
     let startX = 0;
     let currentX = 0;
     let baseTranslateX = 0;
     const viewport = container.querySelector('.slider-viewport');

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

          const slideWidth = slides[0].getBoundingClientRect().width;
          const threshold = slideWidth * 0.25;

          if (totalDx > threshold) {
               // Dragged Right -> Move Track Right -> Reveal Left -> Next Item
               const gap = parseFloat(getComputedStyle(track).gap || 0);
               const viewportWidth = viewport.clientWidth;
               const visibleCount = Math.max(1, Math.floor(viewportWidth / (slideWidth + gap)));
               const maxIndex = Math.max(0, slides.length - visibleCount);
               index = Math.min(maxIndex, index + 1);
          } else if (totalDx < -threshold) {
               // Dragged Left -> Move Track Left -> Reveal Right -> Prev Item
               index = Math.max(0, index - 1);
          }
          update();
     }, { passive: true });
}
