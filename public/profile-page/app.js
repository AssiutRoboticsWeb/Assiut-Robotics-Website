// ---------------------- Config & API endpoints ----------------------
const API_URL = `${API_BASE_URL}/members/login`;
const VERIFY_URL = `${API_BASE_URL}/members/verify`;
const CHANGE_PROFILE_IMAGE_URL = `${API_BASE_URL}/members/changeProfileImage`;
const SUBMIT_TASK_URL = `${API_BASE_URL}/members/submitTask`;

// ---------------------- State ----------------------
let currentMemberData = null;
let currentTrackId = null;
let currentCourseId = null;
let currentTaskId = null;

// ---------------------- DOM ----------------------
const userAvatar = document.getElementById("userAvatar");
const userName = document.getElementById("userName");
const userRole = document.getElementById("userRole");
const userEmail = document.getElementById("userEmail");
const userCommittee = document.getElementById("userCommittee");
const userPhone = document.getElementById("userPhone");
const userStatus = document.getElementById("userStatus");
const avgRate = document.getElementById("avgRate");

const darkModeToggle = document.getElementById("darkModeToggle");
const changeAvatarBtn = document.getElementById("changeAvatarBtn");
const avatarInput = document.getElementById("avatarInput");
const submitTaskModal = document.getElementById("submitTaskModal");
const submitTaskForm = document.getElementById("submitTaskForm");

const bino = document.getElementsByClassName("bino")[0];
const body = document.body;
const main = document.getElementsByTagName("main")[0];
const header = document.getElementsByTagName("header")[0];

const notificationCount = document.getElementById("notificationCount");
const notificationList = document.getElementById("notificationList");
const notificationSidebar = document.getElementById("notificationSidebar");
const notificationBell = document.getElementById("notificationBell");
const overlay = document.getElementById("overlay");

const relatedLinksBtn = document.getElementById("RelatedLinks");
const relatedLinksBox = document.getElementById("related-links");
const rlClose = document.getElementById("rl-close");
const rlCategory = document.getElementById("rl-category");
const rlCards = document.getElementById("rl-cards");

const currentTasksList = document.getElementById("CurrentTasksList");
const historyTasksList = document.getElementById("HistoryTasksList");

// ---------------------- Links Dictionary (base) ----------------------
// وضعنا category لكل رابط لفرزه داخل الكروت حسب التصنيف المحدد في الـ Select
const Links = {
  general: {
    member: [
      { name: "Components", link: "../OC_page/component.html", category: "Educational" },
      { name: "Meeting vote", link: "../meeting/vote.html", category: "Meetings" },
    ],
    head: [],
  },
  HR: {
    member: [
      { name: "HR page", link: "../control-panel/addHrTocommittee.html", category: "Committee" },
    ],
    head: [],
  },
  web: { member: [], head: [] },
  media: {
    member: [{ name: "Make blog", link: "../blog/add-blog.html", category: "Educational" }],
    head: [],
  },
  OC: {
    member: [{ name: "Components management page", link: "../OC_page/OC.html", category: "Committee" }],
    head: [],
  },
  PR: { member: [], head: [] },
  "AC Electric": { member: [], head: [] },
  "AC Mechanical": { member: [], head: [] },
  head: {
    head: [
      { name: "Task manager", link: "../head/index.html", category: "Management" },
      { name: "Tracks manager", link: "../Tracks/adminDashboard/index.html", category: "Management" },
      { name: "Leader page", link: "../leader/index.html", category: "Management" },
      { name: "Create meeting", link: "../meeting/addMeeting.html", category: "Meetings" },
    ],
  },
  leader: {
    member: [
      { name: "Members", link: "../leader/index.html", category: "Management" },
      { name: "Leader page", link: "../leader/index.html", category: "Management" },
    ],
    head: [],
  },
};

// ---------------------- Auth ----------------------
async function verifyToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "../login/login.html";
    return false;
  }

  try {
    const response = await fetch(VERIFY_URL, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      window.location.href = "../login/login.html";
      return false;
    }

    const data = await response.json();
    if (data?.data) {
      // Show UI
      bino.classList.add("disabled");
      body.classList.remove("loading");
      main.classList.remove("disabled");
      header.classList.remove("disabled");

      currentMemberData = data.data;
      renderMemberData(currentMemberData);
      renderCurrentTasks(currentMemberData.tasks || []);
      renderHistoryTasks(currentMemberData.tasks || []);
    } else {
      console.warn("Invalid data format received from API", data);
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

// ---------------------- UI: Member Data ----------------------
function renderMemberData(data) {
  localStorage.setItem("data", JSON.stringify(data));

  userAvatar.src = data.avatar;
  userAvatar.alt = `${data.name}'s avatar`;
  userName.textContent = data.name;
  userRole.textContent = data.role;
  userEmail.textContent = data.email;
  userCommittee.textContent = data.committee;
  userPhone.textContent = data.phoneNumber;
  userStatus.textContent = data.verified ? "Verified" : "Pending";
  userStatus.className = `status-badge ${data.verified ? "verified" : "pending"}`;
  avgRate.textContent = data.avgRate ? data.avgRate : "No Rate yet";

  // Add Lab Dates button for all
  const headerButtons = document.querySelector(".header-buttons");
  const labDatesBtn = document.createElement("a");
  labDatesBtn.id = "lapDates";
  labDatesBtn.href = "../lapDates/getDates.html";
  labDatesBtn.className = "header-btn";
  labDatesBtn.innerHTML = `<i class="fas fa-calendar-alt"></i> Lab Dates`;
  headerButtons.appendChild(labDatesBtn);

  // Add Date for OC only
  if ((data.committee || "").trim() === "OC") {
    const addDateBtn = document.createElement("a");
    addDateBtn.id = "addDate";
    addDateBtn.href = "../lapDates/addDate.html";
    addDateBtn.className = "header-btn";
    addDateBtn.innerHTML = `<i class="fas fa-calendar-plus"></i> Add Date`;
    headerButtons.appendChild(addDateBtn);
  }

  // Build categorized links
  const categorized = buildCategorizedLinks(data);
  renderRelatedLinksUI(categorized);
}

// ---------------------- Build categorized links ----------------------
function buildCategorizedLinks(user) {
  // ترتيب ثابت للتصنيفات
  const cats = {
    General: [],
    Meetings: [],
    Management: [],
    Educational: [],
    Committee: [],
  };

  // general
  (Links.general.member || []).forEach((l) => pushByCat(cats, l));

  // committee links
  const committeeKey = (user.committee || "").trim();
  if (Links[committeeKey]) {
    (Links[committeeKey].member || []).forEach((l) =>
      pushByCat(cats, { ...l, category: l.category || "Committee" })
    );
    if (user.role === "head" || user.role === "vice") {
      (Links[committeeKey].head || []).forEach((l) =>
        pushByCat(cats, { ...l, category: l.category || "Committee" })
      );
    }
  }

  // heads
  if (user.role === "head" || user.role === "vice") {
    (Links.head.head || []).forEach((l) => pushByCat(cats, l));
  }

  // leaders
  if (user.role === "leader" || user.role === "viceLeader") {
    (Links.leader.member || []).forEach((l) => pushByCat(cats, l));
  }

  return cats;
}

function pushByCat(cats, linkObj) {
  const cat = (linkObj.category || "General");
  if (!cats[cat]) cats[cat] = [];
  cats[cat].push(linkObj);
}

// ---------------------- UI: Select + Cards ----------------------
function renderRelatedLinksUI(cats) {
  // املأ الـ select بالتصنيفات مع عدد الروابط
  rlCategory.innerHTML = "";
  const entries = Object.entries(cats);

  entries.forEach(([cat, arr]) => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = `${cat} (${arr.length})`;
    opt.disabled = arr.length === 0;
    rlCategory.appendChild(opt);
  });

  const firstAvailable = entries.find(([, arr]) => arr.length > 0)?.[0] || "General";
  rlCategory.value = firstAvailable;

  // دالة لعرض الكروت لتصنيف معين
  const renderCardsFor = (category) => {
    rlCards.innerHTML = "";
    const list = cats[category] || [];
    if (list.length === 0) {
      rlCards.innerHTML = `<div class="link-card" role="listitem" aria-disabled="true">
        <i class="fas fa-circle-exclamation"></i><span>No links</span>
      </div>`;
      return;
    }

    list.forEach((l) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "link-card";
      btn.setAttribute("role", "listitem");
      btn.setAttribute("aria-label", `${l.name} (${category})`);
      btn.innerHTML = `<i class="${iconForCategory(category)}"></i><span>${l.name}</span>`;
      btn.addEventListener("click", () => {
        if (l.link) window.open(l.link, "_blank");
        closeRelatedLinksPopup();
      });
      rlCards.appendChild(btn);
    });
  };

  renderCardsFor(firstAvailable);
  rlCategory.onchange = (e) => renderCardsFor(e.target.value);
}

function iconForCategory(cat) {
  switch (cat) {
    case "Meetings": return "fas fa-handshake";
    case "Management": return "fas fa-gear";
    case "Educational": return "fas fa-graduation-cap";
    case "Committee": return "fas fa-users";
    default: return "fas fa-link";
  }
}

function setupRelatedLinksToggle() {
  relatedLinksBtn.addEventListener("click", () => {
    const isHidden = relatedLinksBox.classList.contains("disabled");
    if (isHidden) {
      relatedLinksBox.classList.remove("disabled");
      relatedLinksBox.classList.remove("disapear");
      relatedLinksBox.classList.add("appearence");
      relatedLinksBtn.setAttribute("aria-expanded", "true");
      relatedLinksBox.setAttribute("aria-hidden", "false");
    } else {
      closeRelatedLinksPopup();
    }
  });

  rlClose.addEventListener("click", closeRelatedLinksPopup);
}

function closeRelatedLinksPopup() {
  relatedLinksBox.classList.remove("appearence");
  relatedLinksBox.classList.add("disapear");
  relatedLinksBtn.setAttribute("aria-expanded", "false");
  relatedLinksBox.setAttribute("aria-hidden", "true");
  relatedLinksBox.addEventListener(
    "animationend",
    () => relatedLinksBox.classList.add("disabled"),
    { once: true }
  );
}

// ---------------------- Avatar ----------------------
changeAvatarBtn.addEventListener("click", () => avatarInput.click());
avatarInput.addEventListener("change", (e) => {
  if (e.target.files?.[0]) changeAvatar(e.target.files[0]);
});

async function changeAvatar(file) {
  const token = localStorage.getItem("token");
  if (!token || !file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch(CHANGE_PROFILE_IMAGE_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to change avatar");
    userAvatar.src = data.avatar;
    alert(data.message || "Avatar changed successfully");
    window.location.reload();
  } catch (err) {
    console.error("Error changing avatar:", err);
    alert(err.message);
  }
}

// ---------------------- Submit Task (tracks-courses path) ----------------------
async function submitTask(submissionLink) {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await fetch(SUBMIT_TASK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        trackId: currentTrackId,
        courseId: currentCourseId,
        taskId: currentTaskId,
        submissionLink,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Submit failed");

    alert(data.message || "Submitted");
    window.location.reload();
  } catch (err) {
    alert(err.message);
  }
}

// ---------------------- Submit Current Task (member tasks) ----------------------
async function submitCurrentTask(formData) {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await fetch(`${API_BASE_URL}/members/submitMemberTask/${currentTaskId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Submit failed");

    alert(data.message || "Submitted");
    window.location.reload();
  } catch (error) {
    if ((error.message || "").includes("jwt expired")) {
      window.location.href = "../login/login.html";
      return;
    }
    console.error(error);
    alert(error.message);
  }
}

submitTaskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await submitCurrentTask(new FormData(submitTaskForm));
  submitTaskModal.style.display = "none";
  submitTaskForm.reset();
});

document.querySelector(".cancel-btn").addEventListener("click", () => {
  submitTaskModal.style.display = "none";
  submitTaskForm.reset();
});

// ---------------------- Tasks Rendering ----------------------
function renderCurrentTasks(tasks = []) {
  currentTasksList.innerHTML = "";
  const pending = tasks.filter(
    (t) => !(t.headEvaluation > 0 || (t.submissionLink && t.submissionLink !== "*"))
  );

  pending.forEach((task) => {
    const {
      _id,
      title,
      startDate,
      deadline,
      description,
      taskUrl,
      points,
      headEvaluation,
      deadlineEvaluation,
    } = task;

    const taskElement = document.createElement("div");
    taskElement.className = "task-item";

    const isDeadlinePassed = deadline && new Date(deadline) < new Date();

    taskElement.innerHTML = `
      <div class="task-header">
        <h3 class="task-title">${title ?? ""}</h3>
        <div class="task-deadline">
          <i class="icon clock-icon"></i> Start ${startDate ? new Date(startDate).toLocaleDateString() : ""}
        </div>
        <div class="task-deadline" style="${isDeadlinePassed ? "color:red;" : ""}">
          <i class="icon clock-icon"></i> Deadline ${deadline ? new Date(deadline).toLocaleDateString() : ""}
          ${
            isDeadlinePassed && deadline
              ? `<span style="color:red; font-size:.9em;">
                  (+${Math.floor((Date.now() - new Date(deadline)) / (1000 * 60 * 60 * 24))} days late)
                 </span>`
              : ""
          }
        </div>
      </div>

      <p class="task-description">${description ?? ""}</p>
      ${taskUrl ? `<a class="task-link" href="${taskUrl}" target="_blank">Material Link</a>` : ""}

      <div class="task-meta">
        <span class="task-points">Points: ${points ?? 0}</span>
        ${
          headEvaluation > 0
            ? `<span class="task-evaluation">Head Eval: ${headEvaluation}, deadline: ${deadlineEvaluation ?? ""}</span>`
            : `<button class="submit-task-btn">Submit Task</button>`
        }
      </div>
    `;

    if (!(headEvaluation > 0)) {
      taskElement.querySelector(".submit-task-btn").addEventListener("click", () => {
        currentTaskId = _id;
        submitTaskModal.style.display = "block";
      });
    }

    currentTasksList.appendChild(taskElement);
  });
}

function renderHistoryTasks(tasks = []) {
  historyTasksList.innerHTML = "";

  tasks.forEach((task) => {
    if (!(task.submissionLink && task.submissionLink !== "*")) return;

    const {
      title,
      startDate,
      deadline,
      description,
      taskUrl,
      points,
      rate,
      submissionLink,
      submissionDate,
    } = task;

    const taskElement = document.createElement("div");
    taskElement.className = "task-item";

    const late = submissionDate && deadline && new Date(submissionDate) > new Date(deadline);

    taskElement.innerHTML = `
      <div class="task-header">
        <h3 class="task-title">${title ?? ""}</h3>
        <div class="task-deadline">
          <i class="icon clock-icon"></i> Start ${startDate ? new Date(startDate).toLocaleDateString() : ""}
        </div>
        <div class="task-deadline">
          <i class="icon clock-icon"></i> Deadline ${deadline ? new Date(deadline).toLocaleDateString() : ""}
        </div>
        <div class="task-deadline" style="${late ? "color:red;" : ""}">
          <i class="icon clock-icon"></i> Submission ${submissionDate ? new Date(submissionDate).toLocaleDateString() : ""}
        </div>
      </div>

      <p class="task-description">${description ?? ""}</p>
      <div class="links">
        ${taskUrl ? `<a class="task-link" href="${taskUrl}" target="_blank">Material Link</a>` : ""}
        ${submissionLink ? `<a class="task-link" href="${submissionLink}" target="_blank">Submission Link</a>` : ""}
      </div>

      <div class="task-meta">
        <span class="task-points">Points: ${points ?? 0}</span>
        <span class="task-points">Score: ${rate ?? 0}</span>
      </div>
    `;

    historyTasksList.appendChild(taskElement);
  });
}

// ---------------------- Dark Mode ----------------------
function initializeDarkMode() {
  const isDark = localStorage.getItem("darkMode") === "true";
  document.body.classList.toggle("dark-mode", isDark);
  darkModeToggle.setAttribute("aria-pressed", String(isDark));

  darkModeToggle.addEventListener("click", () => {
    const toggled = !document.body.classList.contains("dark-mode");
    document.body.classList.toggle("dark-mode", toggled);
    localStorage.setItem("darkMode", String(toggled));
    darkModeToggle.setAttribute("aria-pressed", String(toggled));
  });
}

// ---------------------- Notifications ----------------------
function toggleNotifications() {
  notificationSidebar.classList.toggle("active");
  overlay.classList.toggle("active");
  const opened = notificationSidebar.classList.contains("active");
  notificationSidebar.setAttribute("aria-hidden", String(!opened));
}

notificationBell.addEventListener("click", toggleNotifications);
overlay.addEventListener("click", toggleNotifications);

// Load notifications from localStorage
function loadNotifications() {
  const announceTrackData = localStorage.getItem("announceTrackData")
    ? JSON.parse(localStorage.getItem("announceTrackData"))
    : [];

  notificationCount.textContent = announceTrackData.length;
  notificationList.innerHTML = "";

  announceTrackData.forEach((notification, idx) => {
    const li = document.createElement("li");
    li.className = "notification-item";

    const applied = notification?.applay?.isApplaying === true;
    const statusText = applied ? (notification?.applay?.RequestStatus || "Applied") : "Not Applied yet";

    li.innerHTML = `
      <div><strong>${notification.name || ""}</strong></div>
      <div>${notification.description || ""}</div>
      <div>${notification.announcementContent || ""}</div>
      <button class="applay-btn" ${applied ? "disabled" : ""} 
        style="background-color:${applied ? "gray" : "green"}"
        data-idx="${idx}">
        Apply
      </button>
      <span class="apply-status"> ${statusText} </span>
    `;

    const btn = li.querySelector("button.applay-btn");
    btn.addEventListener("click", () => handleApply(idx, btn, li));
    notificationList.appendChild(li);
  });
}

function handleApply(index, buttonEl, liEl) {
  if (!currentMemberData) {
    alert("Please wait until your profile is loaded.");
    return;
  }

  const announceTrackData = localStorage.getItem("announceTrackData")
    ? JSON.parse(localStorage.getItem("announceTrackData"))
    : [];

  if (!announceTrackData[index]) return;

  const item = announceTrackData[index];
  item.applay = {
    isApplaying: true,
    email: currentMemberData.email,
    Membername: currentMemberData.name,
    trackId: item.id,
    trackName: item.name,
    RequestStatus: "Pending",
  };

  announceTrackData[index] = item;
  localStorage.setItem("announceTrackData", JSON.stringify(announceTrackData));

  buttonEl.disabled = true;
  buttonEl.style.backgroundColor = "gray";
  const statusSpan = liEl.querySelector(".apply-status");
  if (statusSpan) statusSpan.textContent = " Pending";
}

// ---------------------- Init ----------------------
function initialize() {
  verifyToken().then(() => {
    setupRelatedLinksToggle();
    initializeDarkMode();
    loadNotifications();
  });

  // Esc to close modal or links popup
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (submitTaskModal.style.display === "block") {
        submitTaskModal.style.display = "none";
      }
      if (!relatedLinksBox.classList.contains("disabled")) {
        closeRelatedLinksPopup();
      }
    }
  });
}

initialize();
