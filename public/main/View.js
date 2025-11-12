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
                message: "السلام عليكم ورحمة الله وبركاته لعلكم بخير يا شباب انا احمد أسامة ... كنت ف التيم من ٢٠١٥ إلى ٢٠١٩ ... دخلت لجنةOC أول ما دخلت التيم و بعدها بكام شهر مسكت اللجنة لمدة سنة و نص تقريبا و انتقلت إلى AC لحد التخرج إشتركت ف مشروع minesweeper ٣ سنين ورا بعض أخرهم أخدنا المركز الثاني و كنا هنسافر اسبانيا بس ماحصلش نصيب بعد التخرج اتعينت معيد ف قسم كهربا من ٢٠٢٠ إلى ٢٠٢٤ و أخدت الماسترز ف ٢٠٢٣ و كنت mentor ... مشرف غير رسمى للتيم حوالى سنة و حاليا بحضر دكتوراه ف جامعة كونكورديا موتيريال بكندا روبوتيكس و الناس اللى عرفتها فيه و المواقف و الخبرات يعتبر ساعدنى ف حاجات كتير ف حياتى بشكل عام مش ف الدراسة بس كانت تجربة عملية علمية إجتماعية لا تنسى بالنسبالى ف enjoy يا شباب و learn how to learn",
                author: "أحمد أسامة",
                graduationYear: "2019",
                priority: 1
            },
            {
                message: "السلام عليكم ورحمه الله عصام محفوظ 2012-2016 * بدأت من اول ما كنا بنجمع بال خمسه جنيه علشان نشترى المونتال ومواتير لغاية ما دخلنا ال ROV , MINSWEEPERS * مسكت technical leader لاول فريق ماينسويبر و اول ليدر لفريق ROV وطبعا اول PR head * شكرا محسن بدر والتيم الجميل اللى رجع بعد احباط روبوكون 2013 وبدانا ننظم ونغير طريقة تفكيرنا أننا نبنى كيان متكامل وعملنا Assiut Robotics بالنظام الحالى * صممت أول مسابقة روبوتات فى أسيوط اتعملت لفرق روبوتكس الجدد ك final project وعملناها ف الساحه بتاعت كهربا لو حد فاكر والواد محمد عاشور اتبهدل معايا فيها 😅 * دخلنا النيوماتيك وجبنا عدد كتير والكمبروسور وتانك المياه بتاع ال rov طمنونى لو لسه موجود 😅 * تقريبا المعمل كان مقر تواجدى اليومى او بيتى التانى بفكس لاى حاجه ف سبيل الشغل ف المعمل * ال ROV مشروعى المفضل والواد مصطفى النمر كان ليه الفضل باصراره رغم ضعف الإمكانيات الموجوده في وقتها أننا نشارك * فخور أن ليا بصمه ف كل زاوية وكورنر ف المعمل * حاولنا اكتر من نره ناخد مكان اكبر وأوسع بس الجامعه مساعدتش. * اتمنى تكونو بخير وبتعملو شغل كل يوم افضل وافضل وعلمو بعض وانصحو بعض * انا شغال projects team leader in a drilling company in Egypt",
                author: "عصام محفوظ",
                graduationYear: "2016",
                priority: 2
            },
            {
                message: "السلام عليكم أنا مي امين كنت ف روبوتكس من ٢٠١٦ لحد ٢٠١٩ كنت HR وشاركت ف مسابقة IRC كنت ليدر التيم وشاركت بعدها ف بروجيكت CNC لحد ما سبت التيم. هتلاقي روبتكس هو احلي حاجة حصلت ف سنين الكلية لأغلبنا بسبب الخبرات اللي اكتسبناها والناس اللي اتعرفنا عليها. اتخرجت ٢٠٢٠ واشتغلت Embedded Software Engineer في شركة Valeo وبدايتي مع الامبيدد كانت ف روبوتكس 💕",
                author: "مي أمين",
                graduationYear: "2020",
                priority: 3
            },
            {
                message: "السلام عليكم جميعا أنا أميرة جمال كنت في روبوتكس من ٢٠١٧ ل ٢٠٢١ اشتغلت في البداية في الoc ثم في الميديا في بدايات ظهور لجنة الويب، ثم في AC electrical. كنت ليدر rov لفترة طويلة وبدأنا وقتها ال rov إلي موجودة حالياً في المعمل بشكلها الحالي، ودخلنا بيها مسابقات متوفقناش فيها ولكن كانت رحلة جميلة وغالية عليا جدا، علمتني وهذبتني كتير، والناس إلي فيها والي في المعمل كانوا أقرب للعائلة وفضل الناس الأكبر -والأصغر سنناً- عليا والي اتعلمته منهم مقدرش أوفيه أبدا. روبوتكس من أكتر الحاجات إلي أثرت وغيرت فينا جميعا غالبا، والتأثر دا كان بيظهر في المجهود إلي الناس بتحطه عشان التيم يكبر ويستمر وإلي كان بيوصل أحيانا لإنه يفوق مجهودهم في الكلية نفسها (متعملوش كده😂) كنت بس عايزة أقول كده عشان تعرفوا إن المعمل عشان يفضل مكمل للنهاردة الناس تعبت وبذلت في سبيل دا كتير جداً، من البداية لحد دلوقتي، وفي المقابل أخدوا واتعلموا فيه كتير. والمعمل عموما مكان الناس تفخر بيه على قدر المجهود إلي اتحط وبيتحط فيه من ساعة ما بدأ، وعلى محاولة كل الناس إلي فيه إنها تشتغل وتتعلم وتكبر وتنافس بأقل الإمكانيات مقارنةً بغيرهم. شدوا حيلكم واستمتوا بالتجربة الجميلة دي وحافظوا على المعمل ومتبطلوش تسألوا وتتعلموا وتستفادوا وتفيدوا إلي حواليكم بعلمكم. أنا خريجة 2022 اشتغلت بعد التخرج في جامعة النيل وخلصت فيها ماجستير في ال applied electromagnetics وحاليا بشتغل في ال AUC ك Research Assistant",
                author: "أميرة جمال",
                graduationYear: "2022",
                priority: 4
            },
            {
                message: "السلام عليكم ورحمة الله وبركاته يا رب تكونوا بخير جميعا أنا أحمد محمد عبدالرازق، دخلت التيم فى نهاية سنة ٢٠١٧ لحد ٢٠٢٠ سنة التخرج. اشتغلت فى لجنة الميديا طول فترة تواجدي داخل التيم ومسكت هيد السوشيال ميديا وكنت مسئول عن صفحات التواصل الإجتماعي مع باقي زمايلنا. شاركت فى مسابقة Minesweepers سنة ٢٠١٨ واخدنا المركز التاني على مستوى الجامعات المحلية فى مصر واتأهلنا للمسابقة العالمية واللي كانت هتتعمل فى مدريد وقتها لكن محصلش نصيب فى اننا نسافر، وبالمناسبة روبوتكس كان أول فريق فى صعيد مصر يوصل لمسابقة عالمية خارج مصر. شاركت فى مسابقة ROV سنة ٢٠١٩ وكنت ليدر تيم الميكانيكا والمسابقة كانت فى بداية سنة ٢٠٢٠ لكن اتاجلت بسبب ظروف الكورونا ولكن اتعملت اخر السنة وقدرنا ناخد جائزة احسن عرض تقديمي من بين الفرق المشاركة. حاليا بشتغل كمهندس لسلامة العمليات فى شركة غاز مصر. كانت احلى فترة قضيتها فى الكلية هي فترة المعمل وكنت دايما بحب اكون متواجد هناك ولحد الان الواحد مفتقد جو المعمل وهتفضل فترة متتنسيش بالنسبالي وخصوصا زمايلي اللي لسه على تواصل بيهم لحد دلوقتي. روبوتكس هتفيدكم كتير وهتكتسبوا منها مهارات سواء على المستوى العلمي او الاجتماعي وهتخليكم فارقين كتير عن أي خريج تاني لو استغليتوا تواجدكم داخل التيم صح.",
                author: "أحمد محمد عبدالرازق",
                graduationYear: "2020",
                priority: 5
            },
            {
                message: "السلام عليكم ، انا مصطفى عطوان ، التحقت بالفريق سنه ٢٠١٤ الى ٢٠١٨ ضمن لجان ال OC وال AC وشاركت فى مسابقات minesweeper ، حاليا بشتغل مهندس اول مشروعات فى هيئه ITIDA بوزاره الاتصالات وتكنولوجيا المعلومات ، من مهام عملى برامج مختلفه ضمن اداره صناعه الالكترونيات فى الهيئه والمبادرة القوميه مصر تصنع الالكترونيات EME ، ومن ضمن البرامج الى شغال عليها اداره معامل ابداع EME بالمنطقه التكنولوجيه باسيوط الجديده دائما بكون فى غايه السعاده والبهجه وانا بتواصل معاكم فى الانشطه المختلفه 😃🙏 واكيد لا أنكر فضل جميع زملائى وأساتذتى الى ليهم فضل عليا دائما بالعلم والمعرفة ومنهم دكتور محسن بدر نفع الله بكم وبعلمكم 🙏",
                author: "مصطفى عطوان",
                graduationYear: "2018",
                priority: 6
            },
            {
                message: "السلام عليكم انا هبة حسام مدرس مساعد في قسم التصميم الميكانيكي والانتاج التحقت بالفريق سنة ٢٠١٢ كان اسمه وقتها روبوكون أسيوط وكان تحت اشراف أ.د مازن عبد السلام و دكتور محسن بدر المعمل كان بيشارك في مسابقة روبوكون فقط عشان كدا كان بيحمل هذا الاسم شاركت في مسابقة روبوكون سنة ٢٠١٣ على ما اتذكر كانت في جامعة حلوان بعد م رجعنا من المسابقة قررنا نعمل هيكلة للفريق بمعني أن يبقي في ليدر للفريق ولجان تختص بال media و ال OC و PR … الخ طبعا الكلام دا بديهي بالنسبالكم لكن في وقتها ماكنش في حاجه اسمها كدا أو على الاقل عندنا كنت head الميديا وغيرنا اسم الفريق ل assiut robotics وعملنا Logo … الخ بدانا ندخل مسابقات أكتر اقترحنا minesweeper و ROV وبقينا كل سنة بنزل form عشان ناس اكتر تدخل الفريق ونقدر نخش مسابقات أكتر مسكت VICE AC(mech) كنت بعمل الجزء الاكاديمي في الانترفيوهات وكنت بشرف على الخطة التعليمية للفريق شاركت بعدها كذا مرة في روبوكون و مرة في ROV و مرتين تقريبا في minesweeper سعدت وشرفت بالتعرف على زملاء كتير جدا خلال ٥ سنين تواجدي في المعمل اتخرجت سنة ٢٠١٧ وبقيت مشرف اكاديمي للفريق وسافرت مع الطلبة كذا مسابقة ودائما بتابع أخباركم ونجاحكم  بالتوفيق",
                author: "هبة حسام",
                graduationYear: "2017",
                priority: 7
            },
            {
                message: "السلام عليكم. انا أحمد فوزي كنت فى روبتوكس من ٢٠١٧ ل ٢٠٢١ اشتغلت HR و AC وكنت هيد HR شوية دخلت minsweeper 2017 وخدنا تاني مصر بس مقدرناش نسافر الأنترناشيونال في أسبانيا😢 ودخلت ROV وكنت Electrical head واشتغلت في شوية مشاريع صغيرة كده مكملتش وكنت شغال بشكل أساسي ك Embbeded Hardware سواء في المشاريع او الAC انا مش هكون ببالغ لو قولت ان المعمل ده أثر على حياتي الأجتماعية والعملية بشكل كبير وطلعت منه بكمية مكاسب كبيرة قوي سواء في الأشخاص او الknowledge او ال skills انا اتخرجت ٢٠٢٢ وحاليا شغال Digital design methodology engineer في شركة si vision واشتغلت شوية Embedded Hardware وكل الشكر للناس اللي كانت في المعمل الفترة ديه وساعدتني اوصل للي انا وصلتله❤",
                author: "أحمد فوزي",
                graduationYear: "2022",
                priority: 8
            },
            {
                message: "السلام عليكم يا شباب شكرا على الاضافة انا محسن بدر … التحقت بالتيم في ٢٠٠٩ لما كان اسمه روبوكون أسيوط و كان في قسم ميكانيكا … في ٢٠١٢ بقيت team leader و بعد التخرج و التعيين كمعيد في اواخر ٢٠١٢ اصبحت مشرف على المعمل و نقلنا المعمل لقسم كهربا تحت اشراف د عادل عبده حسين … وقتها غيرنا الاسم و السلوجان للموجودين حاليا Assiut Robotics Learn how to learn في سبتمبر ٢٠١٦ سافرت كندا و ما زلت موجود بكندا حتى الان سعيد جدا بوجودي في الجروب ده و ببقى فخور جدا لما بشوف الاخبار على صفحة الفيس بوك …. انا شايف تقدم كبير جدا في التيم على كل المستويات …. ربنا يوفقكم دايماً …. سعيد جدا بالتواصل معكم و اتمنى اشوفكم جميعا بخير قريبا ان شاء الله",
                author: "محسن بدر",
                graduationYear: "2012",
                priority: 1
            },
            {
                message: "سلام عليكم يا شباب، لعلكم بخير أنا أحمد عبد الحكيم، دخلت التيم أول 2022 وفضلت فيه لحد التخرج 2025. بدأت كام شهر في لجنة الماركتنج، وبعدها كملت في لجنة AC Electrical. اتعلمت فيها كتير جداً من الناس القديمة، واتعلمت أكتر لما بقيت أنا من الناس القديمة وبحضر كونتنت وبشرحه — لأن-من وجهة نظري-أفضل طريقة تتعلم بيها إنك تذاكر حاجة عشان تشرحها لحد. اشتغلت على ROV وMinesweeper، وكنت مركز على جزء الـHardware. دلوقتي أنا IC Layout Intern في شركة Mixel Egypt، وتجربتي في التيم كانت هي الأكشن اللي في الكلية ونقطة انطلاق كبيرة بالنسبالي، واتعلمت منها حاجات كتير على المستوى التقني والشخصي، وكسبت منها ناس وتجارب عمرها ما تتنسى.",
                author: "أحمد عبد الحكيم",
                graduationYear: "2025",
                priority: 10
            }
        ];

        // populate slides
        data.sort((a, b) => a.priority - b.priority);
        for (let i = 0; i < data.length; i++) {
            // Wrap quote in a wrapper so we can collapse it with CSS, and add a See more button
            let content = `
                    <article class="slider-card" dir="auto">
                        <div class="quote-wrapper">
                            <p class="quote">"${data[i].message}"</p>
                        </div>
                        <button class="see-more" aria-expanded="false">See more</button>
                        <div>
                            <h4 class="author">— ${data[i].author}</h4>
                            <h4 class="author">— ${data[i].graduationYear}</h4>
                        </div>
                    </article>
                `;
            track.insertAdjacentHTML('beforeend', content);
        }

        const slides = Array.from(track.children);

        // Wire up See more buttons after layout is ready
        requestAnimationFrame(() => {
            slides.forEach(card => {
                const wrapper = card.querySelector('.quote-wrapper');
                const btn = card.querySelector('.see-more');
                if (!wrapper || !btn) return;

                // If the quote fits within the collapsed wrapper, hide the button
                const collapsedHeight = parseFloat(getComputedStyle(wrapper).maxHeight) || 72; // fallback
                const needsToggle = wrapper.scrollHeight > wrapper.clientHeight + 2;
                if (!needsToggle) {
                    btn.style.display = 'none';
                    return;
                }

                // Toggle behavior: expand/collapse without changing slider index
                btn.addEventListener('click', (e) => {
                    console.log("see more");
                    const expanded = btn.getAttribute('aria-expanded') === 'true';
                    btn.setAttribute('aria-expanded', (!expanded).toString());
                    btn.textContent = expanded ? 'See more' : 'See less';
                    wrapper.classList.toggle('expanded', !expanded);
                });
            });
        });

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
        // let startX = 0, currentX = 0, dragging = false;
        // section.querySelector('.slider-viewport').addEventListener('pointerdown', (e) => {
        //     dragging = true; startX = e.clientX; section.querySelector('.slider-viewport').setPointerCapture(e.pointerId);
        // });
        // section.querySelector('.slider-viewport').addEventListener('pointermove', (e) => {
        //     if (!dragging) return; currentX = e.clientX;
        // });
        // section.querySelector('.slider-viewport').addEventListener('pointerup', () => {
        //     if (!dragging) return; dragging = false;
        //     const dx = currentX - startX;
        //     if (dx / window.innerWidth > 0.1) index -= 1;
        //     else if (dx / window.innerWidth < -0.1) index += 1;
        //     update();
        // });
        var dragging = false;
        var startX = 0;
        var currentX = 0;
        var baseTranslateX = 0; // pixels

        const viewport = section.querySelector('.slider-viewport');

        viewport.addEventListener('touchstart', (e) => {
            if (!e.touches || e.touches.length === 0) return;
            startX = e.touches[0].clientX;
            currentX = startX;
            dragging = true;

            // read current transform (may be like 'matrix(a, b, c, d, tx, ty)')
            const style = getComputedStyle(track).transform;
            if (style && style !== 'none') {
                try {
                    const m = new DOMMatrixReadOnly(style);
                    baseTranslateX = m.m41; // translation x
                } catch (err) {
                    // fallback parsing
                    const match = style.match(/matrix\([^,]+,[^,]+,[^,]+,[^,]+,\s*([^,]+),/);
                    baseTranslateX = match ? parseFloat(match[1]) : 0;
                }
            } else {
                baseTranslateX = 0;
            }

            // disable track transition during dragging for immediate response
            track.style.transition = 'none';
        }, { passive: true });

        // touchmove: prevent default to avoid page scrolling during horizontal drag
        viewport.addEventListener('touchmove', (e) => {
            if (!dragging) return;
            if (!e.touches || e.touches.length === 0) return;
            // prevent vertical scrolling while dragging horizontally
            e.preventDefault && e.preventDefault();
            currentX = e.touches[0].clientX;
            const dx = currentX - startX; // positive = move right
            // apply delta to the base translate (baseTranslateX already includes current offset)
            track.style.transform = `translateX(${baseTranslateX + dx}px)`;
        }, { passive: false });

        viewport.addEventListener('touchend', (e) => {
            if (!dragging) return;
            dragging = false;
            // re-enable transition
            track.style.transition = '';

            const totalDx = currentX - startX;
            // determine threshold (one quarter of a slide)
            const slideWidth = slides[0].getBoundingClientRect().width;
            const threshold = slideWidth * 0.25;

            if (totalDx > threshold) {
                // swipe right -> previous
                index = Math.max(0, index - 1);
            } else if (totalDx < -threshold) {
                // swipe left -> next
                const viewportWidth = viewport.clientWidth;
                const visibleCount = Math.max(1, Math.floor(viewportWidth / (slideWidth + parseFloat(getComputedStyle(track).gap || 0))));
                const maxIndex = Math.max(0, slides.length - visibleCount);
                index = Math.min(maxIndex, index + 1);
            }

            // snap to calculated index
            update();
        }, { passive: true });


        window.addEventListener('resize', update);
        // initial layout
        requestAnimationFrame(update);
    })();