// main.js
// يُحسب عرض اللوجو ويضبط max-width لحاوية اللجان حتى لا تحدث عملية قطع/clipping.
// كما يحافظ على سلوك التمرير الأفقي للـ committees إذا كان عدد الأزرار كبيرًا.

const home = document.getElementById("home");
const track = document.getElementById("track");
const courseContainer = document.getElementById("course");
const header = document.getElementById("header");
const committeesNav = document.getElementById("committeesNav");
const tracksSection = document.getElementById("tracksSection");
const leaderboardList = document.getElementById("leaderboardList");
const trackFiltersContainer = document.getElementById("trackFiltersContainer");
const menuToggle = document.getElementById("menuToggle");
const siteLogo = document.getElementById("siteLogo");
const backward_BTN = `<div><button onclick="window.history.back()" class ="backward" title="Back"><i class="fa-solid fa-angle-left"></i></button></div>`;

// backend base (optional)
const backendUrl = (typeof API_BASE_URL !== 'undefined') ? API_BASE_URL + "/" : "";

/* بيانات تجريبية */
const electricData = {
    // committees: [
    //     { id: "hardware", name: "لجنة الهاردوير", short: "الهاردوير", icon: "<i class='fa fa-cogs'></i>", description: "لجنة تصميم وتجميع القطع المادية.", tracks: [{ name: "Circuit Design", description: "تصميم الدوائر.", tasks: [{ name: "PCB Layout", description: "تصميم لوحة الدوائر المطبوعة.", link: "https://example.com/pcb", deadline: "2024-12-01" }] }, { name: "Mechanical", description: "التصميم الميكانيكي للروبوتات.", tasks: [] }] },
    //     { id: "embeded", name: "لجنة الأنظمة المدمجة", short: "الأنظمة المدمجة", icon: "<i class='fa fa-microchip'></i>", description: "لجنة خاصة بكل ما يخص الأنظمة المدمجة ودوائر الإلكترونيات.", tracks: [{ name: "Embedded Basics", description: "أساسيات الأنظمة المدمجة.", tasks: [{ name: "Blink LED", description: "برمجة دائرة لجعل LED تضيء وتطفئ.", link: "https://example.com/blink", deadline: "2024-08-10" }, { name: "GPIO Input", description: "قراءة قيمة من زر.", link: "https://example.com/gpio", deadline: "2024-09-01" }] }, { name: "Sensors & Actuators", description: "التعامل مع حساسات ومحركات.", tasks: [] }] },
    //     { id: "ros", name: "لجنة ROS", short: "ROS", icon: "<i class='fa fa-brain'></i>", description: "لجنة أنظمة الروبوت المفتوحة ROS ودمجها.", tracks: [{ name: "ROS Basics", description: "مبادئ ROS.", tasks: [] }, { name: "ROS Navigation", description: "تنقل في ROS.", tasks: [] }] },
    //     { id: "vision", name: "لجنة الرؤية الحاسوبية", short: "الرؤية الحاسوبية", icon: "<i class='fa fa-camera'></i>", description: "لجنة تعلم الآلة ورؤية الحاسوب.", tracks: [{ name: "Intro CV", description: "مبادئ الرؤية.", tasks: [] }, { name: "Deep Learning", description: "شبكات عصبية للرؤية.", tasks: [] }] }
    // ],
    committees: [
    { id: "hardware", name: "Hardware Committee", short: "Hardware", icon: "<i class='fa fa-cogs'></i>", description: "Committee for designing and assembling physical parts.", tracks: [{ name: "Circuit Design", description: "Designing circuits.", tasks: [{ name: "PCB Layout", description: "Designing the printed circuit board.", link: "https://example.com/pcb", deadline: "2024-12-01" }] }, { name: "Mechanical", description: "Mechanical design for robots.", tasks: [] }] },
    { id: "embedded", name: "Embedded Systems Committee", short: "Embedded Systems", icon: "<i class='fa fa-microchip'></i>", description: "Committee for everything related to embedded systems and electronics circuits.", tracks: [{ name: "Embedded Basics", description: "Fundamentals of embedded systems.", tasks: [{ name: "Blink LED", description: "Programming a circuit to make an LED blink.", link: "https://example.com/blink", deadline: "2024-08-10" }, { name: "GPIO Input", description: "Reading a value from a button.", link: "https://example.com/gpio", deadline: "2024-09-01" }] }, { name: "Sensors & Actuators", description: "Dealing with sensors and actuators.", tasks: [] }] },
    { id: "ros", name: "ROS Committee", short: "ROS", icon: "<i class='fa fa-brain'></i>", description: "Committee for Robot Operating System (ROS) and its integration.", tracks: [{ name: "ROS Basics", description: "Principles of ROS.", tasks: [] }, { name: "ROS Navigation", description: "Navigation in ROS.", tasks: [] }] },
    { id: "vision", name: "Computer Vision Committee", short: "Computer Vision", icon: "<i class='fa fa-camera'></i>", description: "Committee for machine learning and computer vision.", tracks: [{ name: "Intro CV", description: "Principles of vision.", tasks: [] }, { name: "Deep Learning", description: "Neural networks for vision.", tasks: [] }] }
],
    teamData: {
        mainTeam: [
            { name: "John Smith", role: "Technical Lead, Robotics & AI", department: "Department of Robotics and Automation", image: "https://picsum.photos/150/150?random=1" },
            { name: "Emily Chen", role: "Lead Software Engineer", department: "Department of Computer Science", image: "https://picsum.photos/150/150?random=2" }
        ],
        assistantTeam: [
            { name: "Mark Johnson", role: "Computer Vision Specialist", department: "Department of AI and Machine Learning", image: "https://picsum.photos/150/150?random=4" }
        ],
        hrTeam: [
            { name: "Jessica Brown", role: "HR Manager", department: "Human Resources Department", image: "https://picsum.photos/150/150?random=7" }
        ]
    },
    leaderboard: {
        "All Committees": [{ rank: 1, name: "Alex Johnson", committee: "ROS & Raspberry", points: 2150 }, { rank: 2, name: "Sarah Chen", committee: "Computer Vision", points: 2080 }],
        "الأنظمة المدمجة": [{ rank: 1, name: "Michael Brown", committee: "الأنظمة المدمجة", points: 1950 }],
        "الهاردوير": [{ rank: 1, name: "Emma Davis", committee: "الهاردوير", points: 1900 }],
        "الرؤية الحاسوبية": [{ rank: 1, name: "Sarah Chen", committee: "الرؤية الحاسوبية", points: 2080 }],
        "ROS": [{ rank: 1, name: "Alex Johnson", committee: "ROS", points: 2150 }]
    }
};

/* ---------- NAV rendering ---------- */
let currentCommitteeId = null;

function renderCommitteesNav() {
    if (!committeesNav) return;
    committeesNav.innerHTML = electricData.committees.map(c => {
        return `<button class="committee-btn" data-id="${c.id}" onclick="selectCommittee('${c.id}')">${c.name}</button>`;
    }).join('');
    committeesNav.insertAdjacentHTML('afterbegin', `<button class="committee-btn" data-id="all-committees" onclick="selectCommittee('all-committees')">All Committees</button>`);
    // ensure visible for desktop
    if (window.innerWidth > 820) {
        committeesNav.style.display = 'flex';
        committeesNav.classList.remove('show');
    }
}

function selectCommittee(id) {
    document.querySelectorAll('.committee-btn').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.committee-btn[data-id="${id}"]`);
    if (btn) btn.classList.add('active');

    currentCommitteeId = id;
    if (id === 'all-committees') {
        const allTracks = electricData.committees.flatMap(c => c.tracks.map(t => ({ ...t, committee: c.short })));
        renderTracks(allTracks);
        renderLeaderboard('All Committees', electricData.leaderboard);
        renderTrackFilters(['All Tracks']);
    } else {
        const comm = electricData.committees.find(c => c.id === id);
        if (!comm) return;
        renderTracks(comm.tracks, comm.name);
        renderLeaderboard(comm.short || comm.name, electricData.leaderboard);
        renderTrackFilters(['All Tracks', ...comm.tracks.map(t => t.name)]);
    }
}

function renderTrackFilters(options = []) {
    if (!trackFiltersContainer) return;
    trackFiltersContainer.innerHTML = options.map(opt => `<button class="filter-btn">${opt}</button>`).join('');
    document.querySelectorAll('#trackFiltersContainer .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#trackFiltersContainer .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const text = btn.textContent;
            if (text === 'All Tracks') {
                if (currentCommitteeId && currentCommitteeId !== 'all-committees') {
                    const comm = electricData.committees.find(c => c.id === currentCommitteeId);
                    renderTracks(comm.tracks);
                } else {
                    const allTracks = electricData.committees.flatMap(c => c.tracks.map(t => ({ ...t, committee: c.short })));
                    renderTracks(allTracks);
                }
            } else {
                const filtered = electricData.committees.flatMap(c => c.tracks.map(t => ({ ...t, committee: c.short }))).filter(t => t.name === text);
                renderTracks(filtered);
            }
        });
    });
}

/* ---------- render tracks ---------- */
function renderTracks(tracks = [], title) {
    header && header.classList.remove('disabled');
    if (!tracksSection) return;
    tracksSection.innerHTML = '';
    if (!Array.isArray(tracks) || tracks.length === 0) {
        tracksSection.innerHTML = `<p style="padding:1rem 4%;">لا توجد تراكات لعرضها.</p>`;
        return;
    }
    tracksSection.innerHTML = tracks.map(t => `
    <div class="track-card" onclick="tapSwitching(this)" id="${escapeId(t.name)}">
      <div class="track-icon">${t.icon || "<i class='fa fa-layer-group'></i>"}</div>
      <h3>${t.name}</h3>
      <p>${t.description || ''}${t.committee ? '<br><small> committee: ' + t.committee + '</small>' : ''}</p>
    </div>
  `).join('');
//     tracksSection.innerHTML = tracks.map(t => `
//     <div class="track-card" onclick="tapSwitching(this)" id="${escapeId(t.name)}">
//       <div class="track-icon">${t.icon || "<i class='fa fa-layer-group'></i>"}</div>
//       <h3>${t.name}</h3>
//       <p>${t.description || ''}${t.committee ? '<br><small>اللجنة: ' + t.committee + '</small>' : ''}</p>
//     </div>
//   `).join('');
}
function escapeId(name) { return String(name).replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_ء-يـ]/g, ''); }

/* ---------- leaderboard ---------- */
function renderLeaderboard(committeeKey = 'All Committees', leaderboardData) {
    if (!leaderboardList) return;
    leaderboardList.style.opacity = '0';
    setTimeout(() => {
        const list = (leaderboardData[committeeKey] || []);
        leaderboardList.innerHTML = list.map(item => `
      <div class="leaderboard-item">
        <span>#${item.rank}</span>
        <span>${item.name}</span>
        <span>${item.committee || item.track || ''}</span>
        <span>${item.points} pts</span>
      </div>
    `).join('') || '<p>لا توجد بيانات.</p>';
        leaderboardList.style.opacity = '1';
    }, 180);
}

/* ---------- team ---------- */
function renderTeam(teamArray, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = (teamArray || []).map(member => `
    <div class="team-card">
      <img src="${member.image}" alt="${member.name}" />
      <h3>${member.name}</h3>
      <p>${member.role}</p>
      <p>${member.department}</p>
    </div>
  `).join('');
}

/* ---------- navigation / track -> course flow ---------- */
let currentTrack = null;
function tapSwitching(el) {
    currentTrack = el.id;
    const found = electricData.committees.flatMap(c => c.tracks.map(t => ({ ...t, committee: c }))).find(t => escapeId(t.name) === currentTrack);
    if (!found) {
        renderCourse({ name: el.querySelector('h3')?.textContent || 'التراك', description: el.querySelector('p')?.textContent || '' });
        home && home.classList.add("disabled");
        header && header.classList.add("disabled");
        track && track.classList.remove("disabled");
        courseContainer && courseContainer.classList.add("disabled");
        history.pushState({ view: 'track', trackName: currentTrack }, '', '');
        return;
    }
    renderTrack(found.committee.tracks, found.name, track, found.committee);
    home && home.classList.add("disabled");
    header && header.classList.add("disabled");
    track && track.classList.remove("disabled");
    courseContainer && courseContainer.classList.add("disabled");
    history.pushState({ view: 'track', trackName: currentTrack }, '', '');
}

function renderTrack(tracks, trackName, trackContainer, committee = null) {
    if (!trackContainer) return;
    const trk = (tracks || []).find(t => t.name === trackName);
    if (!trk) { trackContainer.innerHTML = "<p>لا توجد دورات لهذا التراك.</p>"; return; }
    const committeeLabel = committee ? `<small>اللجنة: ${committee.name}</small>` : '';
    const trackDetails = `
    <div class="track-details">
      <div class="track-icon">${committee?.icon || "<i class='fa fa-layer-group'></i>"}</div>
      <h2>${trk.name}</h2>
      <p>${trk.description || ''} ${committeeLabel}</p>
    </div>`;
    const coursesHtml = (trk.courses || []).map(course => `
    <div class="course-card" onclick="tasksRendering(this)" id="${escapeId(course.name)}">
      <h3>${course.name}</h3>
      <p>${course.description || ''}</p>
    </div>
  `).join('') || '<p>لا توجد دورات.</p>';
    trackContainer.innerHTML = `${backward_BTN}${trackDetails}<section class="courses">${coursesHtml}</section>`;
}

/* ---------- course & tasks ---------- */
const submissionsKey = 'ar_submissions_v1';
function getSubmissionsMap() { try { return JSON.parse(localStorage.getItem(submissionsKey) || '{}'); } catch { return {}; } }
function setSubmissionsMap(map) { localStorage.setItem(submissionsKey, JSON.stringify(map)); }
function makeKey(track, course, task) { return `${track}|${course}|${task}`; }

function tasksRendering(el) {
    const courseName = el.id;
    const trkName = document.querySelector('.track-details h2')?.textContent || '';
    const found = electricData.committees.flatMap(c => c.tracks.map(t => ({ ...t, committee: c }))).find(t => t.name === trkName);
    const course = found?.courses?.find(c => escapeId(c.name) === courseName || c.name === courseName) || found?.courses?.find(c => c.name === (document.querySelector(`.course-card#${courseName} h3`)?.textContent || courseName));
    if (!course) {
        courseContainer && (courseContainer.innerHTML = "<p>لا توجد تفاصيل لهذه الدورة.</p>");
        return;
    }
    track && track.classList.add("disabled");
    header && header.classList.add("disabled");
    courseContainer && courseContainer.classList.remove("disabled");
    renderCourse(course, found?.name, found?.committee?.name);
    history.pushState({ view: 'course', trackName: found?.name, courseName: course.name }, '', '');
}

function renderCourse(course, parentTrackName = '', committeeName = '') {
    if (!course) { courseContainer && (courseContainer.innerHTML = "<p>No course details found.</p>"); return; }
    const subs = getSubmissionsMap();
    const tasksHtml = Array.isArray(course.tasks) ? course.tasks.map(task => {
        const deadlineDate = task.deadline ? new Date(task.deadline) : null;
        const today = new Date();
        const daysLeft = deadlineDate ? Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24)) : null;
        const deadlineHtml = deadlineDate ? `
      <div class="deadline-info">
        <strong style="color:#ffd166;">الموعد النهائي:</strong>
        <span>${deadlineDate.toLocaleDateString()}</span>
        <span style="margin-left:8px; color:#93c5fd;">(${daysLeft > 0 ? daysLeft + ' أيام متبقية' : daysLeft === 0 ? 'اليوم!' : 'انتهت'})</span>
      </div>` : '';
        const k = makeKey(committeeName || parentTrackName, course.name, task.name);
        const isSubmitted = !!subs[k];
        const statusBadge = isSubmitted ? `<span class="badge" title="Submitted at ${new Date(subs[k].submittedAt).toLocaleString()}">تم الإرسال</span>` : '';
        return `
      <div class="task-block" data-track="${parentTrackName}" data-course="${course.name}" data-task="${task.name}">
        <div class="task-title">
          <h4>${task.name}</h4>
          ${statusBadge}
        </div>
        <p>${task.description}</p>
        ${deadlineHtml}
        <div class="links">
          <a class="btn secondary" href="${task.link}" target="_blank" rel="noopener">رابط المهمة</a>
          <button class="btn" onclick="openSubmissionModal('${committeeName || parentTrackName}', '${course.name}', '${task.name}')">سلم عمل</button>
        </div>
      </div>
    `;
    }).join('') : '<p>لا توجد مهام لهذه الدورة.</p>';

    if (courseContainer) courseContainer.innerHTML = `${backward_BTN}
    <div class="course-details">
      <h2>${course.name}</h2>
      <p>${course.description || ''}</p>
      <div class="tasks-list">${tasksHtml}</div>
    </div>`;
}

/* ---------- modal logic ---------- */
const modal = document.getElementById('submissionModal');
const form = document.getElementById('submissionForm');
const workUrlInput = document.getElementById('workUrl');
const notesInput = document.getElementById('notes');
const metaTrack = document.getElementById('metaTrack');
const metaCourse = document.getElementById('metaCourse');
const metaTask = document.getElementById('metaTask');

function openSubmissionModal(trackName, courseName, taskName) {
    if (metaTrack) metaTrack.value = trackName || '';
    if (metaCourse) metaCourse.value = courseName || '';
    if (metaTask) metaTask.value = taskName || '';
    if (workUrlInput) workUrlInput.value = '';
    if (notesInput) notesInput.value = '';
    if (modal) {
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        setTimeout(() => workUrlInput && workUrlInput.focus(), 60);
    }
}
function closeSubmissionModal() {
    if (modal) {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
    }
}
modal && modal.addEventListener('click', (e) => { if (e.target === modal) closeSubmissionModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal && modal.classList.contains('show')) closeSubmissionModal(); });

/* submit handler */
async function handleSubmission(e) {
    e.preventDefault();
    const userId = localStorage.getItem('userId') || localStorage.getItem('USER_ID') || 'ANON_USER';
    const payload = {
        userId,
        committee: metaTrack ? metaTrack.value : '',
        courseName: metaCourse ? metaCourse.value : '',
        taskName: metaTask ? metaTask.value : '',
        link: workUrlInput ? workUrlInput.value.trim() : '',
        notes: notesInput ? notesInput.value.trim() : '',
        submittedAt: new Date().toISOString()
    };
    if (!/^https?:\/\/.+/.test(payload.link)) { showToast('من فضلك أدخل رابط صحيح يبدأ ب http/https.'); return; }
    try {
        let posted = false;
        if (backendUrl) {
            try { const resp = await fetch(`${backendUrl}submissions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); if (resp.ok) posted = true; } catch (_) { }
        }
        const subs = getSubmissionsMap();
        subs[makeKey(payload.committee, payload.courseName, payload.taskName)] = payload;
        setSubmissionsMap(subs);
        renderCourse({ name: payload.courseName, description: document.querySelector('.course-details p')?.textContent || '', tasks: findTasks(payload.committee, payload.courseName) });
        showToast(posted ? 'تم الإرسال ✔' : 'حُفظ محليًا ✔ (الخادم غير متاح)');
        closeSubmissionModal();
    } catch (err) {
        console.error(err);
        showToast('فشل الإرسال. حاول مرة أخرى.');
    }
}

function findTasks(committeeName, courseName) {
    const comm = electricData.committees.find(c => c.short === committeeName || c.name === committeeName || c.id === committeeName);
    return comm?.tracks.flatMap(t => t.tasks || []).filter(task => task && task.name) || [];
}

/* toast */
const toast = document.getElementById('toast');
let toastTimer = null;
function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* goHome */
function goHome() {
    home && home.classList.remove("disabled");
    header && header.classList.remove("disabled");
    track && track.classList.add("disabled");
    courseContainer && courseContainer.classList.add("disabled");
    history.pushState(null, '', '');
}

/* ---------- helpers: mobile menu + dynamic nav width ---------- */
function toggleCommitteesMenu() {
    if (!committeesNav) return;
    const shown = committeesNav.classList.toggle('show');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', shown ? 'true' : 'false');
}

/* حساب المساحة المتبقية للمكان المخصص للأزرار - يمنع القص.
   نحسب عرض العنصر logo ونضبط max-width على committeesNav */
function adjustCommitteesMaxWidth() {
    if (!committeesNav || !siteLogo) return;
    // قياس عرض اللوجو (بما فيه المسافة الداخلية)
    const logoRect = siteLogo.getBoundingClientRect();
    const logoWidth = Math.ceil(logoRect.width);
    // مساحة حافة إضافية (buffer) لمنع القص القريب
    const buffer = 32; // يمكنك تغييرها لو احتجت مساحة أكبر
    const maxWidth = Math.max(120, window.innerWidth - logoWidth - buffer);
    committeesNav.style.maxWidth = `${maxWidth}px`;
    // on desktop ensure visible flex display
    if (window.innerWidth > 820) {
        committeesNav.style.display = 'flex';
        committeesNav.classList.remove('show');
    } else {
        // mobile: let CSS control (hidden until toggle)
        committeesNav.style.display = '';
    }
}

if (menuToggle) {
    menuToggle.addEventListener('click', (e) => { e.stopPropagation(); toggleCommitteesMenu(); });
    document.addEventListener('click', (e) => { if (!e.target.closest('.committees-wrap')) committeesNav.classList.remove('show'); });
}

/* init */
document.addEventListener('DOMContentLoaded', () => {
    renderCommitteesNav();
    selectCommittee('all-committees');

    renderTeam(electricData.teamData.mainTeam, 'mainTeam');
    renderTeam(electricData.teamData.assistantTeam, 'assistantTeam');
    renderTeam(electricData.teamData.hrTeam, 'hrTeam');

    // footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // adjust width once loaded
    adjustCommitteesMaxWidth();

    // recalc on resize and when fonts/images finish loading
    window.addEventListener('resize', () => {
        adjustCommitteesMaxWidth();
        if (window.innerWidth > 820 && committeesNav) {
            committeesNav.classList.remove('show');
        }
    });
    // also adjust after a short delay in case images/fonts change layout
    setTimeout(adjustCommitteesMaxWidth, 400);
});
