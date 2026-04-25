
const token = window.localStorage.getItem("token") ? window.localStorage.getItem("token") : null;

function setupToken() {
    let token2 = window.localStorage.getItem("token");
    if (token2 != undefined && token2 != null) {
        console.log("profile");

        document.getElementById("login").classList = "remove"
        document.getElementById("profile").classList = ""
    }
    else {
        console.log("login");

        document.getElementById("login").classList = ""
        document.getElementById("profile").classList = "remove"
    }
}

function navButtonClick() {
    const topNav = document.getElementById("myTopnav");

    if (topNav.classList.contains("responsive")) {
        hideNav();
    } else {
        showNav();
    }
}

function isMobile() {
    var k1 = window.matchMedia("only screen and (max-width: 980px)").matches;
    var k2 = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    return k1 && k2;
}

function hideNav() {
    const topNav = document.getElementById("myTopnav");
    const content = document.getElementById("backdrop");
    const navToggleIcon = document.getElementById('js-navbar-toggle');
    if (topNav.classList.contains("responsive")) {
        topNav.classList.remove("responsive");
        content.style.display = "none";
        navToggleIcon.classList.remove("change");
    }
}

function showNav() {
    const topNav = document.getElementById("myTopnav");
    const content = document.getElementById("backdrop");
    const navToggleIcon = document.getElementById('js-navbar-toggle');
    if (!topNav.classList.contains("responsive")) {
        topNav.classList.add("responsive");
        content.style.display = "block";
        navToggleIcon.classList.add("change");
    }
}

function setupScrollNav() {
    const topNav = document.getElementById("myTopnav");
    const content = document.getElementById("backdrop");
    $(document).ready(function () {
        // Function to check if the website is opened on a phone
        if (isMobile()) {
            console.log("The website is being viewed on a phone.");
        } else {
            console.log("The website is being viewed on a non-phone device.");
        }

        // Event listener for window scrolling
        $(window).on("scroll", function () {
            if (isMobile()) {
                hideNav();
            }
        });

        $(window).on("resize", function () {
            if (isMobile()) {
                hideNav();
            }
        });

        document.addEventListener(
            "mousedown",
            (event) => {
                if (event.target !== topNav && event.target === content && topNav.classList.contains("responsive")) {
                    if (isMobile()) {
                        hideNav();
                    }
                }
            },
            { passive: true }
        );
    });
}

function setupColumns() {
    $(document).ready(function () {
        $(".column").click(function () {
            this.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    });
}

let counter = 0;

function implement_views() {
    $.get("../main/header.html", function (data) {
        $("#myUniqueHeaderID").html(data);
    })
        .done(function () {
            console.log("All HTML content loaded successfully. #Header");
            setupScrollNav();
            setupLogin();
            setupToken();
            if (window.LanguageManager) window.LanguageManager.updateElements();
            counter++;
            if (counter == 2) {
                document.body.classList.add("loaded");
            }
        })
        .fail(function () {
            console.error("Error loading HTML content. #Header");
            $.get("./main/header.html", function (data) {
                $("#myUniqueHeaderID").html(data);
            })
        });

    $.get("../main/footer.html", function (data) {
        $("#myUniqueFooterID").html(data);
    })
        .done(function () {
            console.log("All HTML content loaded successfully. #Footer");
            setupScrollTop();
            initializeDarkMode();
            if (window.LanguageManager) window.LanguageManager.updateElements();
            counter++;
            if (counter == 2) {
                document.body.classList.add("loaded");
            }
        })
        .fail(function () {
            console.error("Error loading HTML content. #Footer");
            $.get("./main/footer.html", function (data) {
                $("#myUniqueFooterID").html(data);
            })
        });
}

function setupLogin() {
    // Check if the user is logged in (you can replace this with your actual authentication logic)
    //const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Example: Check localStorage

    // Get the buttons
    const loginButton = document.getElementById("login");
    // const registerButton = document.getElementById("register");
    const profileButton = document.getElementById("profile");

    // Update button visibility based on login status
    if (token) {
        // User is logged in → Show Profile, hide Log In and Register
        loginButton.style.display = "none";
        // registerButton.style.display = "none";
        profileButton.style.display = "inline-block";
    } else {
        // User is NOT logged in → Show Log In and Register, hide Profile
        loginButton.style.display = "inline-block";
        // registerButton.style.display = "inline-block";
        profileButton.style.display = "none";
    }
}

// ================= TOAST =================
function showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");

    const toast = document.createElement("div");
    toast.className = `toast text-bg-${type} show`;
    toast.innerHTML = `<div class="toast-body">${message}</div>`;

    container.appendChild(toast);

    // Auto remove with animation
    setTimeout(() => {
        toast.classList.add("hide");

        toast.addEventListener("animationend", () => {
            toast.remove();
        });
    }, AppConstants.UI_CONFIG.TOAST_DURATION);
}

window.showToast = showToast;

function setupScrollTop() {
    var btn = document.getElementById('scrollToTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > AppConstants.UI_CONFIG.SCROLL_THRESHOLD) {
            btn.classList.add('visible');
        } else {
            // Arrived at top — remove launching state and hide button
            btn.classList.remove('visible');
            btn.classList.remove('launching');
        }
    }, { passive: true });

    btn.addEventListener('click', function () {
        // Show particles while scrolling up
        btn.classList.add('launching');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}



// ---------------------- Dark Mode ----------------------
function initializeDarkMode() {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const darkModeIcon = darkModeToggle.querySelector("i");
    const setDarkModeIcon = (isDark, animate = false) => {
        if (!darkModeIcon) return;
        if (animate && darkModeIcon.animate) {
            darkModeIcon.animate(
                [
                    { transform: "rotate(0deg) scale(1)", opacity: 1 },
                    { transform: "rotate(90deg) scale(0.75)", opacity: 0.35 },
                    { transform: "rotate(180deg) scale(1)", opacity: 1 },
                ],
                { duration: AppConstants.UI_CONFIG.ANIMATION_DURATION, easing: "ease-in-out" }
            );
        }
        darkModeIcon.classList.toggle("fa-moon", !isDark);
        darkModeIcon.classList.toggle("fa-sun", isDark);
    };

    const isDark = localStorage.getItem("darkMode") === "true";
    document.body.classList.toggle("dark-mode", isDark);
    document.body.classList.toggle("dark", isDark);
    darkModeToggle.setAttribute("aria-pressed", String(isDark));
    setDarkModeIcon(isDark);

    darkModeToggle.addEventListener("click", () => {
        const toggled = !document.body.classList.contains("dark-mode");
        document.body.classList.toggle("dark-mode", toggled);
        document.body.classList.toggle("dark", toggled);
        localStorage.setItem("darkMode", String(toggled));
        darkModeToggle.setAttribute("aria-pressed", String(toggled));
        setDarkModeIcon(toggled, true);
    });
}

if (localStorage.getItem("darkMode") === "true") document.body.classList.add("dark");


window.addEventListener('load', () => {
    implement_views();
    setupColumns();
});
