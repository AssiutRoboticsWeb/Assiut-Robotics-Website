// To use API_BASE_URL for API calls, example:
// fetch(`${API_BASE_URL}/your-endpoint`)
const API_BASE_URL = window.API_BASE_URL ;
const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2"),
};

const texts = ["Let's", "Know", "More", "About", "Assiut", "Robotics", "Team", ":)"];

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

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
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
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

animate();


//=============================slider image ===================================================


class Slider {
    constructor(slider) {
        this.slider = slider;
        this.display = slider.querySelector(".image-display");
        this.navButtons = Array.from(slider.querySelectorAll(".nav-button"));
        this.prevButton = slider.querySelector(".prev-button");
        this.nextButton = slider.querySelector(".next-button");
        this.sliderNavigation = slider.querySelector(".slider-navigation");
        this.currentSlideIndex = 0;
        this.preloadedImages = {};

        this.initialize();
    }

    initialize() {
        this.setupSlider();
        this.preloadImages();
        this.eventListeners();
    }

    setupSlider() {
        this.showSlide(this.currentSlideIndex);
    }

    showSlide(index) {
        this.currentSlideIndex = index;
        const navButtonImg = this.navButtons[
            this.currentSlideIndex
        ].querySelector("img");
        if (navButtonImg) {
            const imgClone = navButtonImg.cloneNode();
            this.display.replaceChildren(imgClone);
        }
        this.updateNavButtons();
    }

    updateNavButtons() {
        this.navButtons.forEach((button, buttonIndex) => {
            const isSelected = buttonIndex === this.currentSlideIndex;
            button.setAttribute("aria-selected", isSelected);
            // if (isSelected) button.focus();
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
        document.addEventListener("keydown", (event) => {
            this.handleAction(event.key);
        });

        this.sliderNavigation.addEventListener("click", (event) => {
            const targetButton = event.target.closest(".nav-button");
            const index = targetButton
                ? this.navButtons.indexOf(targetButton)
                : -1;
            if (index !== -1) {
                this.showSlide(index);
            }
        });

        this.prevButton.addEventListener("click", () =>
            this.handleAction("prev")
        );
        this.nextButton.addEventListener("click", () =>
            this.handleAction("next")
        );
    }

    handleAction(action) {
        if (action === "Home") {
            this.currentSlideIndex = 0;
        } else if (action === "End") {
            this.currentSlideIndex = this.navButtons.length - 1;
        } else if (action === "ArrowRight" || action === "next") {
            this.currentSlideIndex =
                (this.currentSlideIndex + 1) % this.navButtons.length;
        } else if (action === "ArrowLeft" || action === "prev") {
            this.currentSlideIndex =
                (this.currentSlideIndex - 1 + this.navButtons.length) %
                this.navButtons.length;
        }

        this.showSlide(this.currentSlideIndex);
    }


}

const ImageSlider = new Slider(document.querySelector(".image-slider"));

document.querySelector(".slider-navigation").style = `
grid-template-columns:repeat(${ImageSlider.navButtons.length}, 1fr);
`
setInterval(() => {
    const imgs = ImageSlider.navButtons.length;
    let index = ImageSlider.currentSlideIndex + 1;
    if (index > imgs - 1)
        index = 0
    ImageSlider.showSlide(index);



}, 4000);







// sendIp 

const getip = async () => {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
} 


sendIp = async () => {
    const ip = await getip();
    const response = await fetch(`${API_BASE_URL}/visits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ip }),
    });
    const data = await response.json();
    return data;
}

document.addEventListener('DOMContentLoaded', async () => {
    await sendIp();
});

// ============================ Pioneers ===================================================

(function () {
        const section = document.getElementById('pioneers');
        if (!section) return;

        const track = section.querySelector('.slider-track');
        const prevBtn = section.querySelector('.slider-btn.prev');
        const nextBtn = section.querySelector('.slider-btn.next');
        let index = 0;

        // data may come from an API in dynamic use case
        const data = [
            {
                message: "السلام عليكم ورحمة الله وبركاته ... انا احمد أسامة ... كنت ف التيم من ٢٠١٥ إلى ٢٠١٩ ... دخلت لجنةOC أول ما دخلت التيم و بعدها بكام شهر مسكت اللجنة لمدة سنة و نص تقريبا و انتقلت إلى AC لحد التخرج ... إشتركت ف مشروع minesweeper ٣ سنين ورا بعض أخرهم أخدنا المركز الثاني و كنا هنسافر اسبانيا بس ماحصلش نصيب ... بعد التخرج اتعينت معيد ف قسم كهربا من ٢٠٢٠ إلى ٢٠٢٤ و أخدت الماسترز ف ٢٠٢٣ و كنت  mentor ... مشرف غير رسمى للتيم حوالى سنة و حاليا بحضر دكتوراه ف جامعة كونكورديا موتيريال بكندا ... روبوتيكس و الناس اللى عرفتها فيه و المواقف و الخبرات يعتبر ساعدنى ف حاجات كتير ف حياتى بشكل عام مش ف الدراسة بس ... كانت تجربة عملية علمية إجتماعية لا تنسى بالنسبالى ... ف enjoy يا شباب و learn how to learn ... و نشوفكم ع خير دايما يا شباب و نسمع عنكم كل خير و نفتخر بيكم يا رب",
                author: "أحمد أسامة",
                graduationYear: "2019",
                priority: 1
            },
            {
                message: "السلام عليكم ورحمه الله ... عصام محفوظ 2012-2016 ... بدأت من اول ما كنا بنجمع بال خمسه جنيه علشان نشترى المونتال ومواتير لغاية ما دخلنا ال ROV , MINSWEEPERS ... مسكت technical leader لاول فريق ماينسويبر و اول ليدر لفريق ROV وطبعا اول PR head ... صممت أول مسابقة روبوتات فى أسيوط كـ final project ... فخور أن ليا بصمه ف كل زاوية وكورنر ف المعمل ... انا شغال projects team leader in a drilling company in Egypt ... تحت امركم لو اى حد محتاج مساعده ف شىء",
                author: "عصام محفوظ",
                graduationYear: "2016",
                priority: 2
            },
            {
                message: "السلام عليكم ... انا مي امين ... كنت ف روبوتكس من ٢٠١٦ لحد ٢٠١٩ ... كنت HR وشاركت ف مسابقة IRC كنت ليدر التيم وشاركت بعدها ف بروجيكت CNC ... هتلاقي روبتكس هو احلي حاجة حصلت ف سنين الكلية لأغلبنا ... اتخرجت ٢٠٢٠ واشتغلت Embedded Software Engineer في شركة Valeo وبدايتي مع الامبيدد كانت ف روبوتكس 💕 ... ربنا يديم عليكم التوفيق واتمني نقدر نفيدكم ان شاء الله.",
                author: "مي أمين",
                graduationYear: "2020",
                priority: 3
            },
            {
                message: "السلام عليكم جميعا ... أنا أميرة جمال كنت في روبوتكس من ٢٠١٧ ل ٢٠٢١ ... كنت ليدر rov لفترة طويلة وبدأنا وقتها ال rov إلي موجودة حالياً في المعمل بشكلها الحالي ... كانت رحلة جميلة وغالية عليا جدا، علمتني وهذبتني كتير ... المعمل مكان الناس تفخر بيه على قدر المجهود إلي اتحط وبيتحط فيه من ساعة ما بدأ ... شدوا حيلكم واستمتوا بالتجربة الجميلة دي وحافظوا على المعمل ومتبطلوش تسألوا وتتعلموا وتستفادوا وتفيدوا إلي حواليكم بعلمكم.",
                author: "أميرة جمال",
                graduationYear: "2022",
                priority: 4
            },
            {
                message: "السلام عليكم ورحمة الله وبركاته ... انا أحمد محمد عبدالرازق، دخلت التيم فى نهاية سنة ٢٠١٧ لحد ٢٠٢٠ سنة التخرج ... اشتغلت فى لجنة الميديا ومسكت هيد السوشيال ميديا ... شاركت فى مسابقة Minesweepers واخدنا المركز التاني واتأهلنا لمسابقة عالمية ... كانت احلى فترة قضيتها فى الكلية هي فترة المعمل وهتفضل متتنسيش بالنسبالي ... روبوتكس هتفيدكم كتير وهتخليكم فارقين عن أي خريج تاني لو استغليتوا وجودكم صح.",
                author: "أحمد محمد عبدالرازق",
                graduationYear: "2020",
                priority: 5
            },
            {
                message: "السلام عليكم ، انا مصطفى عطوان ، التحقت بالفريق سنه ٢٠١٤ الى ٢٠١٨ ضمن لجان ال OC وال AC وشاركت فى مسابقات minesweeper  ، حاليا بشتغل مهندس اول مشروعات فى هيئه ITIDA بوزاره الاتصالات وتكنولوجيا المعلومات ... دائما بكون فى غايه السعاده وانا بتواصل معاكم فى الانشطه المختلفه ... واكيد لا أنكر فضل جميع زملائى وأساتذتى الى ليهم فضل عليا دائما بالعلم والمعرفة.",
                author: "مصطفى عطوان",
                graduationYear: "2018",
                priority: 6
            },
            {
                message: "السلام عليكم ... انا هبة حسام ... التحقت بالفريق سنة ٢٠١٢ كان اسمه روبوكون أسيوط ... كنت head الميديا وغيرنا اسم الفريق ل assiut robotics وعملنا Logo ... بدأنا ندخل مسابقات أكتر واقترحنا minesweeper و ROV ... سعدت وشرفت بالتعرف على زملاء كتير جدا خلال ٥ سنين تواجدي في المعمل ... اتخرجت ٢٠١٧ وبقيت مشرف اكاديمي للفريق.",
                author: "هبة حسام",
                graduationYear: "2017",
                priority: 7
            },
            {
                message: "السلام عليكم ... انا أحمد فوزي ... كنت فى روبتوكس من ٢٠١٧ ل ٢٠٢١ ... اشتغلت HR و AC وكنت هيد HR ... دخلت minsweeper 2017 وخدنا تاني مصر ... انا مش هكون ببالغ لو قولت ان المعمل ده أثر على حياتي الأجتماعية والعملية بشكل كبير ... حاليا شغال Digital design methodology engineer في شركة si vision.",
                author: "أحمد فوزي",
                graduationYear: "2022",
                priority: 8
            },
            {
                message: "السلام عليكم ... انا محسن بدر … التحقت بالتيم في ٢٠٠٩ لما كان اسمه روبوكون أسيوط ... في ٢٠١٢ بقيت team leader و بعد التخرج بقيت مشرف على المعمل و نقلنا المعمل لقسم كهربا ... وقتها غيرنا الاسم و السلوجان للموجودين حاليا Assiut Robotics - Learn how to learn ... سعيد جدا لما بشوف التقدم في الفريق و بتمنى أشوفكم بخير دايماً.",
                author: "محسن بدر",
                graduationYear: "2012",
                priority: 9
            },
            {
                message: "السلام عليكم يا شباب ... أنا أحمد عبد الحكيم، دخلت التيم أول 2022 وفضلت فيه لحد التخرج 2025 ... بدأت في الماركتنج وبعدها في AC Electrical ... اشتغلت على ROV وMinesweeper ... دلوقتي أنا IC Layout Intern في شركة Mixel Egypt ... تجربتي في التيم كانت هي الأكشن اللي في الكلية ونقطة انطلاق كبيرة بالنسبالي.",
                author: "أحمد عبد الحكيم",
                graduationYear: "2025",
                priority: 10
            }
        ];

        // populate slides
        for(let i = 0; i < data.length; i++) {
            let content = `
                    <article class="slider-card" dir="auto">
                    <p class="quote">"${data[i].message}"</p>
                    <div>
                    <h4 class="author">— ${data[i].author}</h4>
                    <h4 class="author">— ${data[i].graduationYear}</h4>
                    </div>
                </article>
            `
            track.insertAdjacentHTML('beforeend', content);
        }
        const slides = Array.from(track.children);

        function update() {
            const slideWidth = slides[0].getBoundingClientRect().width;
            console.log('slideWidth:', slideWidth);
            // compute how many fully visible cards fit in viewport
            const viewport = section.querySelector('.slider-viewport');
            const visibleCount = Math.max(1, Math.floor(viewport.clientWidth / (slideWidth + parseFloat(getComputedStyle(track).gap || 0))));
            const maxIndex = Math.max(0, slides.length - visibleCount);
            index = Math.min(Math.max(0, index), maxIndex);
            const offset = index * (slideWidth + parseFloat(getComputedStyle(track).gap || 0));
            track.style.transform = `translateX(-${offset}px)`;
            prevBtn.disabled = index === 0;
            nextBtn.disabled = index === maxIndex;
        }

        prevBtn.addEventListener('click', () => { index -= 1; update(); });
        nextBtn.addEventListener('click', () => { index += 1; update(); });

        // swipe support
        let startX = 0, currentX = 0, dragging = false;
        section.querySelector('.slider-viewport').addEventListener('pointerdown', (e) => {
            dragging = true; startX = e.clientX; section.querySelector('.slider-viewport').setPointerCapture(e.pointerId);
        });
        section.querySelector('.slider-viewport').addEventListener('pointermove', (e) => {
            if (!dragging) return; currentX = e.clientX;
        });
        section.querySelector('.slider-viewport').addEventListener('pointerup', () => {
            if (!dragging) return; dragging = false;
            const dx = currentX - startX;
            if (dx / window.innerWidth > 0.1) index -= 1;
            else if (dx / window.innerWidth < -0.1) index += 1;
            update();
        });

        window.addEventListener('resize', update);
        // initial layout
        requestAnimationFrame(update);
    })();