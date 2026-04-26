document.addEventListener('DOMContentLoaded', () => {
    // Wait for i18next to be ready before initial load
    if (window.i18next && typeof i18next.t === 'function') {
        loadAchievements(window.LanguageManager ? window.LanguageManager.currentLang : i18next.language);
    } else {
        window.addEventListener('i18nReady', (e) => {
            loadAchievements(e.detail.language);
        }, { once: true });
    }

    // Re-render when language changes
    window.addEventListener('languageChanged', (e) => {
        loadAchievements(e.detail.language);
    });
});

async function loadAchievements(lang) {
    const container = document.getElementById('Ach_cards');
    if (!container) return; 

    try {
        const response = await fetch('./config/achievements.json');
        if (!response.ok) throw new Error('Failed to load achievements');
        const data = await response.json();
        renderAchievements(data, container, lang);
    } catch (error) {
        console.error('Achievements Error:', error);
        container.innerHTML = '<p class="error-text">Unable to load achievements content.</p>';
    }
}

function renderAchievements(data, container, lang) {
    container.innerHTML = ''; 
    const currentLang = lang || (window.LanguageManager ? window.LanguageManager.currentLang : (i18next.language || 'en')).split('-')[0];
    const isAr = currentLang === 'ar';
    console.log('Rendering achievements for:', currentLang);

    var i = 100;
    data.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'ach-card';

        const title = isAr ? (item.title_ar || item.title) : item.title;
        const description = isAr ? (item.description_ar || item.description) : item.description;
        let hasLongDesc = description.length > 100;

        card.innerHTML = `
            <img src="${item.image}" alt="${title}" loading="lazy">
            <h2>${title}</h2>
            <p class="ach-desc ${hasLongDesc ? 'truncated' : ''}" id="ach-desc-${index}">${description}</p>
            ${hasLongDesc ? `<button class="toggle-desc-btn" onclick="toggleAchDesc('ach-desc-${index}', this)" data-i18n="ui.see_more">${i18next.t('ui.see_more')}</button>` : ''}
            <div class="ach-card-footer">
              <a href="${item.link}"> <button class="learnMore" data-i18n="ui.learn_more">${i18next.t('ui.learn_more')}</button></a>
            </div>
       `;
        card.dataset.aos = "fade-up"; // Preparation for animation if used
        card.dataset.aosDelay = i;
        container.appendChild(card);
        i += 100;
    });

    if (window.LanguageManager && typeof window.LanguageManager.updateElements === 'function') {
        window.LanguageManager.updateElements();
    }

    if (window.AOS) {
        window.AOS.refresh();
    }
}

window.toggleAchDesc = function (descId, btn) {
    const desc = document.getElementById(descId);
    const isAr = i18next.language.split('-')[0] === 'ar';

    if (desc.classList.contains('truncated')) {
        desc.classList.remove('truncated');
        const text = i18next.t('ui.see_less');
        btn.setAttribute('data-i18n', 'ui.see_less');
        btn.innerHTML = text;
    } else {
        desc.classList.add('truncated');
        const text = i18next.t('ui.see_more');
        btn.setAttribute('data-i18n', 'ui.see_more');
        btn.innerHTML = text;
    }
};
