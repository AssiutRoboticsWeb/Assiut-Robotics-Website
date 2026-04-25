



function renderPioneers(data, container) {
    
    
    
    const lang = window.LanguageManager?.currentLang || 'en';
    
    
    container.innerHTML = ''; // Clear container

    // Sort by priority or year
    const sortedData = data.sort((a, b) => b.graduationYear - a.graduationYear);

    sortedData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'pioneer-card';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index % 3) * 100);

        // Testimonials stay in Arabic as they are personal messages, 
        // but we ensure the container respects RTL/LTR
        card.innerHTML = `
            <div class="pioneer-message" dir="rtl">
                <i class="fas fa-quote-right quote-icon"></i>
                <p>${item.message}</p>
            </div>
            <div class="pioneer-info">
                <h4 class="pioneer-name">${item.author}</h4>
                <p class="pioneer-year">${lang === 'en' ? 'Class of' : 'دفعة'} ${item.graduationYear}</p>
            </div>
        `;
        container.appendChild(card);
    });

    if (window.AOS) window.AOS.refresh();
}