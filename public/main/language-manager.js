/**
 * Assiut Robotics Language Manager
 * Handles bilingual (English/Arabic) support across the website.
 * Includes smooth fade animation on language switch.
 */

(function() {
    'use strict';

    const ANIMATION_DURATION = 300; // ms for each fade phase

    const LanguageManager = {
        currentLang: localStorage.getItem('appLanguage') || 'en',
        _isAnimating: false,

        init: function() {
            // On first load, apply instantly (no animation)
            this._applyInstant(this.currentLang);
            this.setupToggles();
            
            // Listen for changes from other tabs
            window.addEventListener('storage', (e) => {
                if (e.key === 'appLanguage') {
                    this._applyInstant(e.newValue);
                }
            });
        },

        toggleLanguage: function() {
            const newLang = this.currentLang === 'en' ? 'ar' : 'en';
            this.applyLanguage(newLang);
        },

        /**
         * Apply language WITH animation (used for user-triggered switches)
         */
        applyLanguage: function(lang) {
            if (lang === this.currentLang || this._isAnimating) return;
            this._isAnimating = true;

            const elements = document.querySelectorAll('[data-en], [data-ar]');

            // Phase 1: Fade out all translatable elements
            elements.forEach(el => el.classList.add('lang-fade-out'));

            setTimeout(() => {
                // Phase 2: Swap text, direction, and classes
                this.currentLang = lang;
                localStorage.setItem('appLanguage', lang);

                const html = document.documentElement;
                html.setAttribute('lang', lang);
                html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

                document.body.classList.toggle('rtl', lang === 'ar');
                document.body.classList.toggle('ltr', lang === 'en');

                // Update text content
                this._swapText(elements);

                // Update UI toggles
                this.updateToggles();

                // Phase 3: Fade back in
                elements.forEach(el => {
                    el.classList.remove('lang-fade-out');
                    el.classList.add('lang-fade-in');
                });

                // Dispatch event for other scripts (like loaders) to react
                window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));

                console.log(`Language switched to: ${lang.toUpperCase()}`);

                // Cleanup animation classes
                setTimeout(() => {
                    elements.forEach(el => el.classList.remove('lang-fade-in'));
                    this._isAnimating = false;
                }, ANIMATION_DURATION);

            }, ANIMATION_DURATION);
        },

        /**
         * Apply language WITHOUT animation (used for initial load and storage sync)
         */
        _applyInstant: function(lang) {
            this.currentLang = lang;
            localStorage.setItem('appLanguage', lang);

            const html = document.documentElement;
            html.setAttribute('lang', lang);
            html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

            // Update body classes
            document.body.classList.toggle('rtl', lang === 'ar');
            document.body.classList.toggle('ltr', lang === 'en');

            // Update all elements with data-en/data-ar
            this.updateElements();
            
            // Update UI toggles
            this.updateToggles();

            // Dispatch event for other scripts (like loaders) to react
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
            console.log(`Language applied: ${lang.toUpperCase()}`);
        },

        /**
         * Update all data-en/data-ar elements (no animation, used after dynamic content loads)
         */
        updateElements: function() {
            const elements = document.querySelectorAll('[data-en], [data-ar]');
            this._swapText(elements);
        },

        /**
         * Internal: swap text content of a NodeList of elements
         */
        _swapText: function(elements) {
            elements.forEach(el => {
                const text = el.getAttribute(`data-${this.currentLang}`);
                if (text) {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        if (el.hasAttribute('placeholder')) {
                            el.setAttribute('placeholder', text);
                        } else {
                            el.value = text;
                        }
                    } else {
                        el.textContent = text;
                    }
                }
            });
        },

        setupToggles: function() {
            // This will be called after header is loaded
            const checkToggles = setInterval(() => {
                const toggles = document.querySelectorAll('.lang-toggle');
                if (toggles.length > 0) {
                    toggles.forEach(btn => {
                        btn.addEventListener('click', () => this.toggleLanguage());
                    });
                    this.updateToggles();
                    clearInterval(checkToggles);
                }
            }, 100);
            
            // Safety timeout
            setTimeout(() => clearInterval(checkToggles), 5000);
        },

        updateToggles: function() {
            const toggles = document.querySelectorAll('.lang-toggle');
            toggles.forEach(btn => {
                const flagImg = btn.querySelector('.lang-flag');
                const textSpan = btn.querySelector('span:not(.lang-flag)');
                if (flagImg) {
                    // Resolve path relative to current page
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

    // Export to window
    window.LanguageManager = LanguageManager;

    // Auto-init on script load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => LanguageManager.init());
    } else {
        LanguageManager.init();
    }
})();
