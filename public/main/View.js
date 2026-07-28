// ==================== Hero Text Animation ====================
// API Base URL configuration
const API_BASE_URL = window.API_BASE_URL;

const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2"),
};

const bilingualTexts = {
    en: ["Innovating", "Building", "Leading", "Assiut", "Robotics", "Team", ":)"],
    ar: ["نبتكر", "نبني", "نقود", "فريق", "أسيوط", "روبوتكس", ":)"]
};

let texts = bilingualTexts[window.LanguageManager?.currentLang || 'en'];
window.addEventListener('languageChanged', (e) => {
    texts = bilingualTexts[e.detail.language];
    textIndex = 0; // Reset index on language change
});

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

// Initialize text content
if (elts.text1 && elts.text2) {
    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    if (!elts.text1 || !elts.text2) return;

    const blur = Math.min(8 / fraction - 8, 100);
    const opacity = Math.pow(fraction, 0.4) * 100;

    elts.text2.style.filter = `blur(${blur}px)`;
    elts.text2.style.opacity = `${opacity}%`;

    fraction = 1 - fraction;
    const blur1 = Math.min(8 / fraction - 8, 100);
    const opacity1 = Math.pow(fraction, 0.4) * 100;

    elts.text1.style.filter = `blur(${blur1}px)`;
    elts.text1.style.opacity = `${opacity1}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    if (!elts.text1 || !elts.text2) return;

    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    const newTime = new Date();
    const shouldIncrementIndex = cooldown > 0;
    const dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }
        doMorph();
    } else {
        doCooldown();
    }
}

// Start animation only if elements exist
if (elts.text1 && elts.text2) {
    animate();
}


// ==================== Image Slider Class ====================

class Slider {
    constructor(slider) {
        if (!slider) {
            console.warn('Slider element not found');
            return;
        }

        this.slider = slider;
        this.display = slider.querySelector(".image-display");
        this.navButtons = Array.from(slider.querySelectorAll(".nav-button"));
        this.prevButton = slider.querySelector(".prev-button");
        this.nextButton = slider.querySelector(".next-button");
        this.sliderNavigation = slider.querySelector(".slider-navigation");
        this.currentSlideIndex = 0;
        this.preloadedImages = {};
        this.autoplayInterval = null;
        this.autoplayDelay = 4000;
        this.isUserInteracting = false;

        this.initialize();
    }

    initialize() {
        this.setupSlider();
        this.preloadImages();
        this.eventListeners();
        this.startAutoplay();
    }

    setupSlider() {
        this.showSlide(this.currentSlideIndex);

        // Set grid columns dynamically
        if (this.sliderNavigation && this.navButtons.length > 0) {
            this.sliderNavigation.style.gridTemplateColumns =
                `repeat(${this.navButtons.length}, 1fr)`;
        }
    }

    showSlide(index) {
        // Ensure index is within bounds
        this.currentSlideIndex = ((index % this.navButtons.length) + this.navButtons.length) % this.navButtons.length;

        const navButtonImg = this.navButtons[this.currentSlideIndex]?.querySelector("img");

        if (navButtonImg && this.display) {
            const imgClone = navButtonImg.cloneNode();
            imgClone.alt = navButtonImg.alt || "Slider image";
            
            // Wrap in an anchor tag so it's clickable and goes to it
            const link = document.createElement("a");
            link.href = imgClone.src;
            link.target = "_blank"; // Open in new tab
            link.style.display = "block";
            link.style.width = "100%";
            link.style.height = "100%";
            link.style.cursor = "pointer";
            link.appendChild(imgClone);

            this.display.replaceChildren(link);
        }

        this.updateNavButtons();
    }

    updateNavButtons() {
        this.navButtons.forEach((button, buttonIndex) => {
            const isSelected = buttonIndex === this.currentSlideIndex;
            button.setAttribute("aria-selected", isSelected);
            button.setAttribute("tabindex", isSelected ? "0" : "-1");
        });
    }

    preloadImages() {
        this.navButtons.forEach((button) => {
            const imgElement = button.querySelector("img");
            if (imgElement) {
                const imgSrc = imgElement.src;
                if (!this.preloadedImages[imgSrc]) {
                    this.preloadedImages[imgSrc] = new Image();
                    this.preloadedImages[imgSrc].src = imgSrc;
                }
            }
        });
    }

    eventListeners() {
        // Keyboard navigation
        document.addEventListener("keydown", (event) => {
            if (event.target.closest('.image-slider')) {
                this.handleAction(event.key);
            }
        });

        // Thumbnail clicks
        this.sliderNavigation?.addEventListener("click", (event) => {
            const targetButton = event.target.closest(".nav-button");
            const index = targetButton ? this.navButtons.indexOf(targetButton) : -1;

            if (index !== -1) {
                this.pauseAutoplay();
                this.showSlide(index);
                this.resumeAutoplayAfterDelay();
            }
        });

        // Navigation buttons
        this.prevButton?.addEventListener("click", () => {
            this.pauseAutoplay();
            this.handleAction("prev");
            this.resumeAutoplayAfterDelay();
        });

        this.nextButton?.addEventListener("click", () => {
            this.pauseAutoplay();
            this.handleAction("next");
            this.resumeAutoplayAfterDelay();
        });

        // Pause autoplay on hover
        this.slider?.addEventListener("mouseenter", () => this.pauseAutoplay());
        this.slider?.addEventListener("mouseleave", () => this.resumeAutoplayAfterDelay());

        // Pause autoplay when tab is not visible
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                this.pauseAutoplay();
            } else {
                this.resumeAutoplayAfterDelay();
            }
        });
    }

    handleAction(action) {
        const actions = {
            "Home": () => this.currentSlideIndex = 0,
            "End": () => this.currentSlideIndex = this.navButtons.length - 1,
            "ArrowRight": () => this.currentSlideIndex++,
            "next": () => this.currentSlideIndex++,
            "ArrowLeft": () => this.currentSlideIndex--,
            "prev": () => this.currentSlideIndex--,
        };

        if (actions[action]) {
            actions[action]();
            this.showSlide(this.currentSlideIndex);
        }
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            if (!this.isUserInteracting) {
                this.handleAction("next");
            }
        }, this.autoplayDelay);
    }

    pauseAutoplay() {
        this.isUserInteracting = true;
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    resumeAutoplayAfterDelay(delay = 2000) {
        setTimeout(() => {
            this.isUserInteracting = false;
            if (!this.autoplayInterval) {
                this.startAutoplay();
            }
        }, delay);
    }
}

// Initialize slider
const sliderElement = document.querySelector(".image-slider");
if (sliderElement) {
    const ImageSlider = new Slider(sliderElement);
}


// ==================== IP Tracking ==================== 

const getip = async () => {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
}


sendIp = async () => {
    try {
        const ip = await getip();
        const response = await fetch(APIConfig.getVisitorEndpoint(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ip }),
        });
        if (!response.ok) return;
        const data = await response.json();
        return data;
    } catch (error) {
        console.warn('Analytics server unreachable. This is expected in development.');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await sendIp();
});
