/**
 * Committees Loader with Bilingual Support
 */

document.addEventListener('DOMContentLoaded', () => {
    loadCommittees();
    
    // Re-render when language changes
    window.addEventListener('languageChanged', () => {
        loadCommittees();
    });
});

async function loadCommittees() {
    const container = document.getElementById('committees-container');
    if (!container) return;

    try {
        const response = await fetch('./config/committees.json');
        if (!response.ok) throw new Error('Failed to load committees');
        const data = await response.json();
        renderCommittees(data, container);
    } catch (error) {
        console.error('Committees Error:', error);
        container.innerHTML = '<p class="error-text">Unable to load committees content.</p>';
    }
}

function renderCommittees(data, container) {
    const lang = window.LanguageManager?.currentLang || 'en';
    container.innerHTML = ''; // Clear container

    let delay = 100;
    data.forEach((item) => {
        const title = typeof item.title === 'object' ? item.title[lang] : item.title;
        const description = typeof item.description === 'object' ? item.description[lang] : item.description;

        const col = document.createElement('div');
        col.className = 'column';
        col.innerHTML = `
            <div class="card" data-aos="fade-up" data-aos-delay="${delay}">
                <div class="img-container">
                    <img src="${item.image}" alt="${title}" loading="lazy" />
                </div>
                <a>
                    <h3>${title}</h3>
                </a>
                <div class="card-description fade22">
                    ${description}
                </div>
            </div>
        `;
        container.appendChild(col);
        delay += 100;
    });

    // Re-initialize AOS for new elements
    if (window.AOS) {
        window.AOS.refresh();
    }
}
