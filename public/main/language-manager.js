/**
 * Assiut Robotics Language Manager (i18next Integration)
 * Handles bilingual (English/Arabic) support across the website using i18next.
 * Includes smooth fade animation on language switch.
 */

(function() {
    'use strict';

    const ANIMATION_DURATION = 300; // ms for each fade phase

    const LanguageManager = {
        currentLang: localStorage.getItem('appLanguage') || localStorage.getItem('i18nextLng') || 'en',
        _isAnimating: false,

        init: function() {
            this.loadScripts().then(() => {
                this.initI18next();
            }).catch(err => {
                console.error("Failed to load i18next scripts", err);
            });
        },

        loadScripts: function() {
            const scripts = [
                "https://unpkg.com/i18next@23.10.1/i18next.min.js",
                "https://unpkg.com/i18next-http-backend@2.5.0/i18nextHttpBackend.min.js",
                "https://unpkg.com/i18next-browser-languagedetector@7.2.0/i18nextBrowserLanguageDetector.min.js"
            ];

            // Load RTL CSS
            if (!document.querySelector('link[href*="rtl.css"]')) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = (window.location.pathname.includes('/public/') ? '/public' : '') + '/main/rtl.css';
                document.head.appendChild(link);
            }

            // Load LTR CSS
            if (!document.querySelector('link[href*="ltr.css"]')) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = (window.location.pathname.includes('/public/') ? '/public' : '') + '/main/ltr.css';
                document.head.appendChild(link);
            }

            return Promise.all(scripts.map(src => {
                return new Promise((resolve, reject) => {
                    if (document.querySelector(`script[src="${src}"]`)) {
                        resolve();
                        return;
                    }
                    const script = document.createElement('script');
                    script.src = src;
                    script.async = false;
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }));
        },

        initI18next: function() {
            // Adjust path depending on if we're in a subdirectory
            const rootPath = window.location.pathname.includes('/public/') ? '/public' : '';
            const loadPath = rootPath + '/locales/{{lng}}/translation.json';

            i18next
                .use(i18nextHttpBackend)
                .use(i18nextBrowserLanguageDetector)
                .init({
                    fallbackLng: 'en',
                    supportedLngs: ['en', 'ar'],
                    debug: false,
                    backend: {
                        loadPath: loadPath,
                    },
                    detection: {
                        order: ['path', 'cookie', 'localStorage', 'navigator'],
                        lookupLocalStorage: 'appLanguage',
                        lookupCookie: 'i18next',
                        caches: ['localStorage', 'cookie'],
                        lookupFromPathIndex: 0
                    }
                })
                .then(() => {
                    this.currentLang = i18next.language.split('-')[0];
                    this._applyInstant(this.currentLang);
                    this.setupToggles();
                    
                    // Dispatch a global event when i18n is fully ready
                    window.dispatchEvent(new CustomEvent('i18nReady', { detail: { language: this.currentLang } }));
                    
                    window.addEventListener('storage', (e) => {
                        if (e.key === 'appLanguage') {
                            this._applyInstant(e.newValue);
                        }
                    });
                });
        },

        toggleLanguage: function() {
            const newLang = this.currentLang === 'en' ? 'ar' : 'en';
            this.applyLanguage(newLang);
        },

        applyLanguage: function(lang) {
            if (lang === this.currentLang || this._isAnimating) return;
            this._isAnimating = true;

            const elements = document.querySelectorAll('[data-i18n]');
            elements.forEach(el => el.classList.add('lang-fade-out'));

            setTimeout(() => {
                i18next.changeLanguage(lang).then(() => {
                    this.currentLang = lang;
                    localStorage.setItem('appLanguage', lang);

                    const html = document.documentElement;
                    html.setAttribute('lang', lang);
                    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

                    document.body.classList.toggle('rtl', lang === 'ar');
                    document.body.classList.toggle('ltr', lang === 'en');

                    this._swapText(elements);
                    this.updateToggles();

                    elements.forEach(el => {
                        el.classList.remove('lang-fade-out');
                        el.classList.add('lang-fade-in');
                    });

                    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
                    console.log(`Language switched to: ${lang.toUpperCase()}`);

                    setTimeout(() => {
                        elements.forEach(el => el.classList.remove('lang-fade-in'));
                        this._isAnimating = false;
                    }, ANIMATION_DURATION);
                });
            }, ANIMATION_DURATION);
        },

        _applyInstant: function(lang) {
            if (i18next.language !== lang) {
                i18next.changeLanguage(lang);
            }
            this.currentLang = lang;
            localStorage.setItem('appLanguage', lang);

            const html = document.documentElement;
            html.setAttribute('lang', lang);
            html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

            document.body.classList.toggle('rtl', lang === 'ar');
            document.body.classList.toggle('ltr', lang === 'en');

            this.updateElements();
            this.updateToggles();

            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
        },

        updateElements: function() {
            const elements = document.querySelectorAll('[data-i18n]');
            this._swapText(elements);
        },

        _swapText: function(elements) {
            elements.forEach(el => {
                const key = el.getAttribute('data-i18n');
                const text = i18next.t(key);
                
                if (text && text !== key) {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        if (el.hasAttribute('placeholder')) {
                            el.setAttribute('placeholder', text);
                        } else {
                            el.value = text;
                        }
                    } else {
                        el.innerHTML = text;
                    }
                }
            });
        },

        setupToggles: function() {
            const checkToggles = setInterval(() => {
                const toggles = document.querySelectorAll('.lang-toggle');
                if (toggles.length > 0) {
                    toggles.forEach(btn => {
                        // avoid adding multiple event listeners
                        if(!btn.dataset.initialized) {
                            btn.addEventListener('click', () => this.toggleLanguage());
                            btn.dataset.initialized = 'true';
                        }
                    });
                    this.updateToggles();
                    clearInterval(checkToggles);
                }
            }, 100);
            
            setTimeout(() => clearInterval(checkToggles), 5000);
        },

        updateToggles: function() {
            const toggles = document.querySelectorAll('.lang-toggle');
            toggles.forEach(btn => {
                const flagImg = btn.querySelector('.lang-flag');
                const textSpan = btn.querySelector('span:not(.lang-flag)');
                if (flagImg) {
                    const basePath = flagImg.src.substring(0, flagImg.src.lastIndexOf('/') + 1);
                    flagImg.src = basePath + (this.currentLang === 'en' ? 'ar.webp' : 'en.webp');
                }
                if (textSpan) {
                    textSpan.textContent = this.currentLang === 'en' ? 'AR' : 'EN';
                }
                btn.setAttribute('aria-label', this.currentLang === 'en' ? 'Switch to Arabic' : 'Switch to English');
            });
        }
    };

    window.LanguageManager = LanguageManager;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => LanguageManager.init());
    } else {
        LanguageManager.init();
    }
})();
