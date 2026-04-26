// Global Vars
let nav_items = document.querySelectorAll(".nav-tabs .nav-item");
let contests = document.querySelectorAll("section.contests");
let navbar_items = document.querySelectorAll('.navbar-nav li a')
let carousel_paragraph = document.getElementById('carousel-paragraph');
let carousel_heading = document.getElementById('carousel-modal-label');
let carousel_buttons = document.querySelectorAll('.carousel-item .btn');


// add/remove active class from navbar items
navbar_items.forEach(item => {
    item.addEventListener('click', (e)=>{
        e.preventDefault();
        navbar_items.forEach(element => {
            element.classList.remove('active');
        });
        item.classList.add('active');

        // scrolling just above the element
        window.scrollTo(window.scrollX, 
            document.querySelector((item.getAttribute('href') === "#") ? "#cover-div" : item.getAttribute('href'))
            .offsetTop - 70);
    });
});


// showing the timeline based on the clicked year
nav_items.forEach(item =>{
    item.addEventListener('click', (e)=>{
        if(!e.target.classList.contains('active')){
            let date = e.target.getAttribute('data-date');
            
            // removing the active class from the old element
            nav_items.forEach(element => {
                if(element.children[0].classList.contains('active')){
                    element.children[0].classList.remove('active');
                }
            })

            // showing the right year
            contests.forEach(contest => {
                // removing the wrong year
                contest.classList.remove('d-block')
                contest.classList.add('d-none')

                // showing the right year
                if(contest.getAttribute('data-date') === date){
                    contest.classList.remove('d-none')
                    contest.classList.add('d-block')
                }
            })
            
            // adding the active class to the chosen element
            e.target.classList.add('active');

            // Refresh AOS to ensure new elements animate correctly
            if (typeof AOS !== 'undefined') {
                setTimeout(() => AOS.refresh(), 100);
            }
        }
    });
});


// adding the text of the carousel slide to teh modal
carousel_buttons.forEach(button => {
    button.addEventListener('click', ()=>{
        // getting the text from the heading and the paragraph in the carousel
        const paragraph = button.parentElement.previousElementSibling.innerHTML;
        const heading = button.parentElement.previousElementSibling.previousElementSibling.innerHTML;

        // adding the text to the carousel
        carousel_heading.innerHTML = heading;
        carousel_paragraph.innerHTML = paragraph;
    })
});

// dynamically add thumbnail navigation to the sliders
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.carousel').forEach(carousel => {
        const indicatorsContainer = carousel.querySelector('.carousel-indicators');
        const items = carousel.querySelectorAll('.carousel-item');
        
        if (indicatorsContainer && items.length > 0) {
            indicatorsContainer.classList.add('slider-navigation');
            indicatorsContainer.innerHTML = ''; // Clear existing static buttons
            
            items.forEach((item, index) => {
                const img = item.querySelector('img');
                const imgSrc = img ? img.getAttribute('src') : '';
                const isVideo = item.querySelector('iframe') !== null;
                
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.setAttribute('data-bs-target', `#${carousel.id}`);
                btn.setAttribute('data-bs-slide-to', index);
                btn.setAttribute('aria-label', `Slide ${index + 1}`);
                if (index === 0) {
                    btn.classList.add('active');
                    btn.setAttribute('aria-current', 'true');
                }
                btn.classList.add('nav-button');
                
                if (isVideo) {
                    btn.innerHTML = `<div class="thumbnail video-thumbnail d-flex align-items-center justify-content-center bg-dark h-100" style="width: 100%; height: 100%;"><i class="bi bi-play-circle text-light fs-4"></i></div>`;
                } else if (imgSrc) {
                    btn.innerHTML = `<img class="thumbnail" src="${imgSrc}" alt="Thumbnail ${index + 1}" loading="lazy">`;
                }
                
                indicatorsContainer.appendChild(btn);
            });
        }
    });
});

// Keyboard navigation for active carousel
document.addEventListener('keydown', (e) => {
    // Find the currently visible carousel
    const activeContest = document.querySelector('section.contests:not(.d-none)');
    if (!activeContest) return;
    
    const activeCarousel = activeContest.querySelector('.carousel');
    if (!activeCarousel) return;

    if (e.key === 'ArrowLeft') {
        const prevBtn = activeCarousel.querySelector('.carousel-control-prev');
        if (prevBtn) prevBtn.click();
    } else if (e.key === 'ArrowRight') {
        const nextBtn = activeCarousel.querySelector('.carousel-control-next');
        if (nextBtn) nextBtn.click();
    }
});
