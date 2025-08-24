// DOM references
const home = document.getElementById("home");
const track = document.getElementById("track");
const courseContainer = document.getElementById("course");
const header = document.getElementById("header");
const backward_BTN = `<div><button onclick="window.history.back()" class ="backward" title="Back"><i class="fa-solid fa-angle-left"></i></button></div>`;

// Backend base
const backendUrl = serverConfig.getApiUrl("");

// Data
const electricData = {
    tracks: [
        {
            name: "Embedded",
            icon: "<i class='fa fa-microchip'></i>",
            description: "كل ما يخص الأنظمة المدمجة.",
            courses: [
                {
                    name: "Intro to Embedded", description: "مقدمة عن الأنظمة المدمجة.", tasks: [
                        { name: "Blink LED", description: "برمجة دائرة لجعل LED تضيء وتطفئ.", link: "https://example.com/blink", submitLink: "", deadline: "2024-08-10" },
                        { name: "Blink LED", description: "برمجة دائرة لجعل LED تضيء وتطفئ.", link: "https://example.com/blink", submitLink: "", deadline: "2024-07-15" },
                        { name: "Blink LED", description: "برمجة دائرة لجعل LED تضيء وتطفئ.", link: "https://example.com/blink", submitLink: "", deadline: "2024-07-20" }
                    ]
                },
                {
                    name: "Intro to Embedded", description: "مقدمة عن الأنظمة المدمجة.", tasks: [
                        { name: "Blink LED", description: "برمجة دائرة لجعل LED تضيء وتطفئ.", link: "https://example.com/blink", submitLink: "", deadline: "2024-07-10" },
                        { name: "Blink LED", description: "برمجة دائرة لجعل LED تضيء وتطفئ.", link: "https://example.com/blink", submitLink: "", deadline: "2024-07-15" },
                        { name: "Blink LED", description: "برمجة دائرة لجعل LED تضيء وتطفئ.", link: "https://example.com/blink", submitLink: "", deadline: "2024-08-20" }
                    ]
                },
                {
                    name: "Intro to Embedded", description: "مقدمة عن الأنظمة المدمجة.", tasks: [
                        { name: "Blink LED", description: "برمجة دائرة لجعل LED تضيء وتطفئ.", link: "https://example.com/blink", submitLink: "", deadline: "2024-07-10" },
                        { name: "Blink LED", description: "برمجة دائرة لجعل LED تضيء وتطفئ.", link: "https://example.com/blink", submitLink: "", deadline: "2024-07-15" },
                        { name: "Blink LED", description: "برمجة دائرة لجعل LED تضيء وتطفئ.", link: "https://example.com/blink", submitLink: "", deadline: "2024-08-20" }
                    ]
                }
            ]
        },
        { name: "Hardware", icon: "<i class='fa fa-cogs'></i>", description: "كل ما يخص الهاردوير.", courses: [] }
    ],
    teamData: {
        mainTeam: [
            { name: "John Smith", role: "Technical Lead, Robotics & AI", department: "Department of Robotics and Automation", image: "https://picsum.photos/150/150?random=1" },
            { name: "Emily Chen", role: "Lead Software Engineer", department: "Department of Computer Science", image: "https://picsum.photos/150/150?random=2" },
            { name: "David Wilson", role: "Hardware Systems Expert", department: "Department of Electronic Engineering", image: "https://picsum.photos/150/150?random=3" }
        ],
        assistantTeam: [
            { name: "Mark Johnson", role: "Computer Vision Specialist", department: "Department of AI and Machine Learning", image: "https://picsum.photos/150/150?random=4" },
            { name: "Sarah Davis", role: "ROS Developer", department: "Department of Robotics", image: "https://picsum.photos/150/150?random=5" },
            { name: "Michael Lee", role: "Embedded Systems Engineer", department: "Department of Electronics", image: "https://picsum.photos/150/150?random=6" }
        ],
        hrTeam: [
            { name: "Jessica Brown", role: "HR Manager", department: "Human Resources Department", image: "https://picsum.photos/150/150?random=7" },
            { name: "Robert Taylor", role: "HR Coordinator", department: "Human Resources Department", image: "https://picsum.photos/150/150?random=8" }
        ]
    },
    trackData: {
        'All Tracks': [
            { rank: 1, name: "Alex Johnson", track: "ROS & Raspberry", points: 2150 },
            { rank: 2, name: "Sarah Chen", track: "Computer Vision", points: 2080 },
            { rank: 3, name: "Michael Brown", track: "Embedded", points: 1950 },
            { rank: 4, name: "Emma Davis", track: "Hardware", points: 1900 },
            { rank: 5, name: "James Wilson", track: "ROS & Raspberry", points: 1850 },
            { rank: 6, name: "Linda Garcia", track: "Computer Vision", points: 1800 },
            { rank: 7, name: "David Lee", track: "Embedded", points: 1750 },
            { rank: 8, name: "Sophie Taylor", track: "Hardware", points: 1700 }
        ],
        'Hardware': [
            { rank: 1, name: "Emma Davis", track: "Hardware", points: 1900 },
            { rank: 2, name: "Sophie Taylor", track: "Hardware", points: 1700 },
            { rank: 3, name: "Ryan Murphy", track: "Hardware", points: 1650 },
            { rank: 4, name: "Alice Cooper", track: "Hardware", points: 1600 }
        ],
        'Computer Vision': [
            { rank: 1, name: "Sarah Chen", track: "Computer Vision", points: 2080 },
            { rank: 2, name: "Linda Garcia", track: "Computer Vision", points: 1800 },
            { rank: 3, name: "Tom Anderson", track: "Computer Vision", points: 1650 },
            { rank: 4, name: "Nina Patel", track: "Computer Vision", points: 1550 }
        ],
        'ROS & Raspberry': [
            { rank: 1, name: "Alex Johnson", track: "ROS & Raspberry", points: 2150 },
            { rank: 2, name: "James Wilson", track: "ROS & Raspberry", points: 1850 },
            { rank: 3, name: "Maria Rodriguez", track: "ROS & Raspberry", points: 1700 },
            { rank: 4, name: "Chris Evans", track: "ROS & Raspberry", points: 1600 }
        ],
        'Embedded': [
            { rank: 1, name: "Michael Brown", track: "Embedded", points: 1950 },
            { rank: 2, name: "David Lee", track: "Embedded", points: 1750 },
            { rank: 3, name: "Lisa Wang", track: "Embedded", points: 1650 },
            { rank: 4, name: "Kevin Smith", track: "Embedded", points: 1600 }
        ]
    }
};

// API helpers
async function fetchTracks() {
    try {
        const response = await fetch(`${backendUrl}tracks/`);
        const res = await response.json();
        if (!response.ok) throw new Error('Failed to fetch tracks');
        return res.data;
    } catch (err) {
        console.warn('Tracks API failed; using local data.', err);
        return [];
    }
}

function getAllData() {
    fetch("https://tempbackendelectrical-production.up.railway.app/api/data").then(r => r.json()).then(console.log).catch(() => { });
}

// Renderers
function renderLeaderboard(trackName = 'All Tracks', trackData) {
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.style.opacity = '0';
    setTimeout(() => {
        leaderboardList.innerHTML = (trackData[trackName] || []).map(item => `
      <div class="leaderboard-item">
        <span>#${item.rank}</span>
        <span>${item.name}</span>
        <span>${item.track}</span>
        <span>${item.points} pts</span>
      </div>`).join('');
        leaderboardList.style.opacity = '1';
    }, 250);
}

function renderTeam(teamArray, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = teamArray.map(member => `
    <div class="team-card">
      <img src="${member.image}" alt="${member.name}" />
      <h3>${member.name}</h3>
      <p>${member.role}</p>
      <p>${member.department}</p>
    </div>`).join('');
}

function goHome() {
    home.classList.remove("disabled"); header.classList.remove("disabled");
    track.classList.add("disabled"); courseContainer.classList.add("disabled");
    history.pushState(null, '', '');
}

function renderTracks(tracks) {
    const tracksCards = document.getElementsByClassName("tracks")[0];
    tracksCards.innerHTML = (tracks || []).map(t => `
    <div class="track-card" onclick="tapSwitching(this)" id="${t.name}">
      <div class="track-icon">${t.icon || ''}</div>
      <h3>${t.name}</h3>
      <p>${t.description || ''}</p>
    </div>`).join('');
}

let currentTrack = null;
function tapSwitching(el) {
    currentTrack = el.id;
    renderTrack(electricData.tracks, currentTrack, track);
    home.classList.add("disabled"); header.classList.add("disabled");
    track.classList.remove("disabled"); courseContainer.classList.add("disabled");
    history.pushState({ view: 'track', trackName: currentTrack }, '', '');
}

function renderTrack(tracks, trackName, trackContainer) {
    const trk = (tracks || []).find(t => t.name === trackName);
    if (!trk || !Array.isArray(trk.courses)) { trackContainer.innerHTML = "<p>No courses found for this track.</p>"; return; }
    const trackDetails = `
    <div class="track-details">
      <div class="track-icon">${trk.icon || ''}</div>
      <h2>${trk.name}</h2>
      <p>${trk.description || ''}</p>
    </div>`;
    const coursesHtml = trk.courses.map(course => `
    <div class="course-card" onclick="tasksRendering(this)" id="${course.name}">
      <h3>${course.name}</h3>
      <p>${course.description || ''}</p>
    </div>`).join('');
    trackContainer.innerHTML = `${backward_BTN}${trackDetails}<section class="courses">${coursesHtml}</section>`;
}

// Local submissions map
const submissionsKey = 'ar_submissions_v1';
function getSubmissionsMap() { try { return JSON.parse(localStorage.getItem(submissionsKey) || '{}'); } catch { return {}; } }
function setSubmissionsMap(map) { localStorage.setItem(submissionsKey, JSON.stringify(map)); }
function makeKey(track, course, task) { return `${track}|${course}|${task}`; }

function tasksRendering(el) {
    const courseName = el.id;
    const trk = electricData.tracks.find(t => t.name === currentTrack);
    if (!trk) return;
    const course = trk.courses.find(c => c.name === courseName);
    track.classList.add("disabled"); header.classList.add("disabled");
    courseContainer.classList.remove("disabled");
    renderCourse(course);
    history.pushState({ view: 'course', trackName: currentTrack, courseName }, '', '');
}

function renderCourse(course) {
    if (!course) { courseContainer.innerHTML = "<p>No course details found.</p>"; return; }
    const subs = getSubmissionsMap();
    const tasksHtml = Array.isArray(course.tasks) ? course.tasks.map(task => {
        const deadlineDate = task.deadline ? new Date(task.deadline) : null;
        const today = new Date();
        const daysLeft = deadlineDate ? Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24)) : null;
        const deadlineHtml = deadlineDate ? `
      <div class="deadline-info">
        <strong style="color:#ffd166;">Deadline:</strong>
        <span>${deadlineDate.toLocaleDateString()}</span>
        <span style="margin-left:8px; color:#93c5fd;">(${daysLeft > 0 ? daysLeft + ' days left' : daysLeft === 0 ? 'Today!' : 'Expired'})</span>
      </div>` : '';
        const k = makeKey(currentTrack, course.name, task.name);
        const isSubmitted = !!subs[k];
        const statusBadge = isSubmitted ? `<span class="badge" title="Submitted at ${new Date(subs[k].submittedAt).toLocaleString()}">Submitted</span>` : '';
        return `
      <div class="task-block" data-track="${currentTrack}" data-course="${course.name}" data-task="${task.name}">
        <div class="task-title">
          <h4>${task.name}</h4>
          ${statusBadge}
        </div>
        <p>${task.description}</p>
        ${deadlineHtml}
        <div class="links">
          <a class="btn secondary" href="${task.link}" target="_blank" rel="noopener">Task Link</a>
          <button class="btn" onclick="openSubmissionModal('${currentTrack}', '${course.name}', '${task.name}')">Submit Work</button>
        </div>
      </div>`;
    }).join('') : '<p>No tasks for this course.</p>';

    courseContainer.innerHTML = `${backward_BTN}
    <div class="course-details">
      <h2>${course.name}</h2>
      <p>${course.description || ''}</p>
      <div class="tasks-list">${tasksHtml}</div>
    </div>`;
}

// Modal logic
const modal = document.getElementById('submissionModal');
const form = document.getElementById('submissionForm');
const workUrlInput = document.getElementById('workUrl');
const notesInput = document.getElementById('notes');
const metaTrack = document.getElementById('metaTrack');
const metaCourse = document.getElementById('metaCourse');
const metaTask = document.getElementById('metaTask');

function openSubmissionModal(trackName, courseName, taskName) {
    metaTrack.value = trackName;
    metaCourse.value = courseName;
    metaTask.value = taskName;
    workUrlInput.value = '';
    notesInput.value = '';
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    setTimeout(() => workUrlInput.focus(), 60);
}
function closeSubmissionModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
}
modal.addEventListener('click', (e) => { if (e.target === modal) closeSubmissionModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('show')) closeSubmissionModal(); });

// Submit handler
async function handleSubmission(e) {
    e.preventDefault();
    const userId = localStorage.getItem('userId') || localStorage.getItem('USER_ID') || 'ANON_USER';
    const payload = {
        userId,
        trackName: metaTrack.value,
        courseName: metaCourse.value,
        taskName: metaTask.value,
        link: workUrlInput.value.trim(),
        notes: notesInput.value.trim(),
        submittedAt: new Date().toISOString()
    };
    if (!/^https?:\/\/.+/.test(payload.link)) { showToast('Please enter a valid URL (starts with http/https).'); return; }
    try {
        let posted = false;
        try {
            const resp = await fetch(`${backendUrl}submissions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (resp.ok) { posted = true; }
        } catch (_) { /* ignore network error; fallback to local */ }
        const subs = getSubmissionsMap();
        subs[makeKey(payload.trackName, payload.courseName, payload.taskName)] = payload;
        setSubmissionsMap(subs);
        renderCourse({ name: payload.courseName, description: document.querySelector('.course-details p')?.textContent || '', tasks: findTasks(payload.trackName, payload.courseName) });
        showToast(posted ? 'Submitted successfully ✔' : 'Saved locally ✔ (backend not reachable)');
        closeSubmissionModal();
    } catch (err) {
        console.error(err);
        showToast('Submission failed. Please try again.');
    }
}

function findTasks(trackName, courseName) {
    const trk = electricData.tracks.find(t => t.name === trackName);
    return trk?.courses.find(c => c.name === courseName)?.tasks || [];
}

// Toast
const toast = document.getElementById('toast');
let toastTimer = null;
function showToast(msg) {
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    getAllData();
    renderLeaderboard('All Tracks', electricData.trackData);
    renderTeam(electricData.teamData.mainTeam, 'mainTeam');
    renderTeam(electricData.teamData.assistantTeam, 'assistantTeam');
    renderTeam(electricData.teamData.hrTeam, 'hrTeam');
    renderTracks(electricData.tracks);
    const filterButtons = document.querySelectorAll('.track-filters button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderLeaderboard(button.textContent, electricData.trackData);
        });
    });
});

// History support
window.addEventListener('popstate', (event) => {
    if (event.state) {
        if (event.state.view === 'track') {
            currentTrack = event.state.trackName;
            renderTrack(electricData.tracks, currentTrack, track);
            home.classList.add('disabled'); track.classList.remove('disabled'); courseContainer.classList.add('disabled'); header.classList.add('disabled');
        } else if (event.state.view === 'course') {
            currentTrack = event.state.trackName;
            const trk = electricData.tracks.find(t => t.name === event.state.trackName);
            const course = trk ? trk.courses.find(c => c.name === event.state.courseName) : null;
            renderCourse(course);
            home.classList.add('disabled'); track.classList.add('disabled'); courseContainer.classList.remove('disabled'); header.classList.add('disabled');
        }
    } else {
        home.classList.remove('disabled'); header.classList.remove('disabled'); track.classList.add('disabled'); courseContainer.classList.add('disabled');
    }
});
