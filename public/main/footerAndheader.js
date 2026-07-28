
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
    
    // Setup Global Search after a short delay to ensure header is loaded
    setTimeout(() => {
        const searchInput = document.getElementById('globalSearchInput');
        const searchResults = document.getElementById('globalSearchResults');
        
        if (searchInput && searchResults) {
            let debounceTimer;
            
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                
                clearTimeout(debounceTimer);
                
                if (query.length < 2) {
                    searchResults.style.display = 'none';
                    return;
                }
                
                debounceTimer = setTimeout(async () => {
                    try {
                        searchResults.style.display = 'block';
                        searchResults.innerHTML = '<div style="text-align: center; color: #888;">Searching...</div>';
                        
                        const baseUrl = (window.ServerConfig && window.ServerConfig.getAllUrls().baseUrl) 
                            ? window.ServerConfig.getAllUrls().baseUrl 
                            : 'http://localhost:3000';
                            
                        const response = await fetch(`${baseUrl}/api/search?q=${encodeURIComponent(query)}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            credentials: 'include'
                        });
                        
                        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                        const jsonRes = await response.json();
                        const data = jsonRes.data;
                        
                        let html = '';
                        
                        // Members
                        if (data.members && data.members.length > 0) {
                            html += '<div style="font-weight: bold; margin-bottom: 5px; color: #3b82f6; border-bottom: 1px solid #334155; padding-bottom: 5px;">Members</div>';
                            data.members.forEach(m => {
                                html += `<div style="padding: 5px 0; font-size: 14px; color: #f8fafc;">${m.name} <span style="font-size: 12px; color: #94a3b8;">(${m.committee})</span></div>`;
                            });
                        }
                        
                        // Components
                        if (data.components && data.components.length > 0) {
                            html += '<div style="font-weight: bold; margin-top: 10px; margin-bottom: 5px; color: #10b981; border-bottom: 1px solid #334155; padding-bottom: 5px;">Components</div>';
                            data.components.forEach(c => {
                                html += `<div style="padding: 5px 0; font-size: 14px; color: #f8fafc;">${c.title} <span style="font-size: 12px; color: #94a3b8;">(${c.category})</span></div>`;
                            });
                        }
                        
                        // Events
                        if (data.events && data.events.length > 0) {
                            html += '<div style="font-weight: bold; margin-top: 10px; margin-bottom: 5px; color: #8b5cf6; border-bottom: 1px solid #334155; padding-bottom: 5px;">Events</div>';
                            data.events.forEach(e => {
                                html += `<div style="padding: 5px 0; font-size: 14px; color: #f8fafc;">${e.title}</div>`;
                            });
                        }
                        
                        // Tasks
                        if (data.tasks && data.tasks.length > 0) {
                            html += '<div style="font-weight: bold; margin-top: 10px; margin-bottom: 5px; color: #f59e0b; border-bottom: 1px solid #334155; padding-bottom: 5px;">Tasks</div>';
                            data.tasks.forEach(t => {
                                html += `<div style="padding: 5px 0; font-size: 14px; color: #f8fafc;">${t.title}</div>`;
                            });
                        }
                        
                        if (html === '') {
                            html = '<div style="text-align: center; color: #888;">No results found.</div>';
                        }
                        
                        searchResults.innerHTML = html;
                    } catch (err) {
                        console.error("Search error caught:", err);
                        searchResults.innerHTML = '<div style="text-align: center; color: #ef4444;">Error fetching results</div>';
                    }
                }, 400); // 400ms debounce
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                    searchResults.style.display = 'none';
                }
            });
        }
    }, 1000); // Give header 1 second to load
});
