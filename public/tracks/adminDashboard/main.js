// ================= Core Config =================
const backendURL = (typeof API_BASE_URL !== "undefined" ? API_BASE_URL : "") + "/";
const MEMBERS_API = "http://localhost:3000/members/get/web";

// ================= State =================
let membersDirectory = []; // filled from API
let electricData = {
  tracks: [
    {
      _id: "local-embedded",
      name: "Embedded",
      icon: "<i class='fa fa-microchip icon'></i>",
      description: "كل ما يخص الأنظمة المدمجة.",
      courses: [
        {
          name: "Intro to Embedded",
          description: "مقدمة عن الأنظمة المدمجة.",
          admins: [], // will be selectable from API
          tasks: [
            { name: "Blink LED", description: "برمجة دائرة لجعل LED تضيء وتطفئ.", link: "https://example.com/blink", deadline: "2025-10-01" }
          ]
        }
      ]
    },
    { _id: "local-hw", name: "Hardware", icon: "<i class='fa fa-cogs icon'></i>", description: "كل ما يخص الهاردوير.", courses: [] }
  ]
};

let announceTrackData = JSON.parse(localStorage.getItem("announceTrackData") || "[]");
let currentView = "tracks", selectedTrackIndex = null, selectedCourseIndex = null, editMode = false, editIndices = {};

// ================= DOM =================
const headerTitle = document.getElementById("header-title");
const addTrackBtn = document.getElementById("add-track-btn");
const announceTrackBtn = document.getElementById("all-announce-tracks-btn");
const coreSection = document.getElementById("core-section");

const modal = document.getElementById("modal");
const modalContent = document.querySelector(".modal-content");
const modalTitle = document.getElementById("modal-title");
const floatingClose = document.getElementById("floating-close");
const closeModalBtn = document.getElementById("close-modal");
const modalCancelBtn = document.getElementById("modal-cancel");
const modalForm = document.getElementById("modal-form");
const modalFields = document.getElementById("modal-fields");
const modalPreview = document.getElementById("modal-preview");

const applicationBtn = document.getElementById("application-btn");
const applicationSection = document.getElementById("application-section");
const allTracksCtrlBtn = document.getElementById("all-tracks-ctrl-btns");
const customAddBtn = document.getElementById("custom-add-btn");

// ================= Notifications =================
function showNotification(msg, type = "success") {
  const notif = document.createElement("div");
  notif.className = `notif notif-${type}`;
  notif.textContent = msg;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 2000);
}

// ================= Members (API) =================
async function loadMembers() {
  try {
    const res = await fetch(MEMBERS_API, { headers: { "Accept": "application/json" } });
    if (!res.ok) throw new Error("Failed members API");
    const data = await res.json();

    // توقع أن الـAPI بيرجع List من الأعضاء، نوحّدها للشكل المطلوب
    membersDirectory = (Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : []).map(m => ({
      id: m.id || m._id || m.userId || String(m.email || m.name),
      name: m.name || `${m.firstName || ""} ${m.lastName || ""}`.trim() || m.username || "Member",
      email: m.email || "",
      avatar: m.avatar || m.image || "https://i.pravatar.cc/40",
      roles: Array.isArray(m.roles) ? m.roles : (m.role ? [m.role] : [])
    }));
  } catch (e) {
    console.error(e);
    showNotification("Members API failed. Using empty list.", "error");
    membersDirectory = [];
  }
}

// ================= Backend Tracks =================
function getTrack() {
  fetch(`${backendURL}tracks`, {
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  })
    .then((r) => { if (r.status === 401) { window.location.href = "../../login/login.html"; return; } return r.json(); })
    .then((data) => {
      if (data && data.data) {
        electricData.tracks = data.data.map((t) => ({
          ...t,
          courses: (t.courses || []).map(c => ({ ...c, admins: Array.isArray(c.admins) ? c.admins : [] }))
        }));
      }
      renderTracks();
    })
    .catch((e) => { console.error(e); showNotification("Failed to fetch tracks","error"); renderTracks(); });
}

// ================= View Switching =================
addTrackBtn.onclick = renderTracks;

function showApplication() {
  applicationBtn.textContent = applicationBtn.textContent === "Applications" ? "hide Applications" : "Applications";
  applicationSection.classList.toggle("show");
  allTracksCtrlBtn.classList.toggle("hide");
  if (!applicationSection.classList.contains("show")) renderTracks();
}

function renderTracks() {
  if (applicationSection.classList.contains("show")) {
    applicationBtn.textContent = "Applications";
    applicationSection.classList.remove("show");
    allTracksCtrlBtn.classList.remove("hide");
  }

  customAddBtn.style.display = "block";
  currentView = "tracks";
  selectedTrackIndex = selectedCourseIndex = null;

  headerTitle.textContent = "Tracks";
  coreSection.innerHTML = "";

  electricData.tracks.forEach((track, idx) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.position = "relative";
    card.innerHTML = `
      <i class="AnnounceNewTrack-icon fa-solid fa-bullhorn fa-flip-horizontal fa-xl" style="position:absolute; top:30px; right:10px;"></i>
      ${track.icon || ""}
      <h3>${track.name}</h3>
      <p>${track.description || ""}</p>
      <div class="card-actions">
        <span class="edit-btn" title="Edit"><i class="fa fa-edit"></i></span>
        <span class="delete-btn" title="Delete"><i class="fa fa-trash"></i></span>
      </div>
    `;

    card.onclick = (e) => {
      if (e.target.closest(".edit-btn")) { e.stopPropagation(); openModal("track", true, { idx }); }
      else if (e.target.closest(".delete-btn")) {
        e.stopPropagation();
        if (confirm("Delete this track?")) {
          fetch(`${backendURL}tracks/${track._id}`, { method: "DELETE", headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
            .then((res) => {
              if (!res.ok) { if (res.status === 401) { window.location.href = "../../login/login.html"; return; } throw new Error(); }
              electricData.tracks.splice(idx, 1);
              showNotification("Track deleted","success");
              renderTracks();
            })
            .catch(()=>showNotification("Failed to delete track","error"));
        }
      } else if (e.target.closest(".AnnounceNewTrack-icon")) {
        e.stopPropagation();
        AnnounceNewTrack();
      } else {
        renderCourses(idx);
      }
    };

    coreSection.appendChild(card);
  });
}

function AnnounceNewTrack() { currentView = "announceTracks"; openModal("announceTrack"); }

// ================= Courses / Tasks =================
function renderCourses(trackIdx) {
  currentView = "courses";
  customAddBtn.style.display = "block";
  selectedTrackIndex = trackIdx;
  selectedCourseIndex = null;

  const track = electricData.tracks[trackIdx];
  headerTitle.innerHTML = `${track.icon || ""} ${track.name} - Courses`;
  coreSection.innerHTML = "";

  const backBtn = document.createElement("button");
  backBtn.className = "back-btn";
  backBtn.textContent = "Back to Tracks";
  backBtn.onclick = renderTracks;
  backBtn.style.display = "inline-block";
  coreSection.appendChild(backBtn);

  fetch(`${backendURL}tracks/${track._id}/courses`, {
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  })
    .then((r) => { if (r.status === 401) { window.location.href = "../../login/login.html"; return; } return r.json(); })
    .then((data) => {
      if (Array.isArray(data?.data)) {
        track.courses = data.data.map(c => ({ ...c, admins: Array.isArray(c.admins) ? c.admins : [] }));
      }
      drawCourses(track, trackIdx);
    })
    .catch(() => { showNotification("Failed to fetch courses","error"); drawCourses(track, trackIdx); });
}

function drawCourses(track, trackIdx) {
  if (!Array.isArray(track.courses) || track.courses.length === 0) {
    const empty = document.createElement("div");
    empty.textContent = "No courses yet.";
    empty.style.margin = "32px auto";
    coreSection.appendChild(empty);
    return;
  }

  track.courses.forEach((course, idx) => {
    const admins = Array.isArray(course.admins) ? course.admins : [];
    const adminsChips =
      admins.length === 0
        ? `<span class="muted">No admins</span>`
        : admins.slice(0, 3).map(a => `
            <span class="chip chip-sm">
              <img src="${a.avatar || "https://i.pravatar.cc/40"}" alt="${a.name}">
              <span class="chip-text">${a.name?.split(" ")[0] || "Admin"}</span>
            </span>
          `).join("") + (admins.length > 3 ? `<span class="chip-more">+${admins.length - 3}</span>` : "");

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${course.name}</h3>
      <p>${course.description || ""}</p>

      <div class="admins-inline">
        <span class="admins-title">Admins:</span>
        <div class="admins-chips">${adminsChips}</div>
      </div>

      <div class="card-actions">
        <span class="edit-btn" title="Edit"><i class="fa fa-edit"></i></span>
        <span class="delete-btn" title="Delete"><i class="fa fa-trash"></i></span>
      </div>
    `;
    card.onclick = (e) => {
      if (e.target.closest(".edit-btn")) { e.stopPropagation(); openModal("course", true, { idx }); }
      else if (e.target.closest(".delete-btn")) {
        e.stopPropagation();
        if (confirm("Delete this course?")) {
          track.courses.splice(idx, 1);
          showNotification("Course deleted","success");
          renderCourses(trackIdx);
        }
      } else { renderTasks(trackIdx, idx); }
    };
    coreSection.appendChild(card);
  });
}

function renderTasks(trackIdx, courseIdx) {
  currentView = "tasks";
  customAddBtn.style.display = "block";
  selectedTrackIndex = trackIdx;
  selectedCourseIndex = courseIdx;

  const track = electricData.tracks[trackIdx];
  const course = track.courses[courseIdx];

  headerTitle.innerHTML = `${track.icon || ""} ${track.name} / ${course.name} - Tasks`;
  coreSection.innerHTML = "";

  const backBtn = document.createElement("button");
  backBtn.className = "back-btn";
  backBtn.textContent = "Back to Courses";
  backBtn.onclick = () => renderCourses(trackIdx);
  backBtn.style.display = "inline-block";
  coreSection.appendChild(backBtn);

  if (!Array.isArray(course.tasks) || course.tasks.length === 0) {
    const empty = document.createElement("div");
    empty.textContent = "No tasks yet.";
    empty.style.margin = "32px auto";
    coreSection.appendChild(empty);
  } else {
    course.tasks.slice().sort((a,b)=>new Date(a.deadline||0) - new Date(b.deadline||0))
      .forEach((task, idx) => {
        const deadlineText = task.deadline ? new Date(task.deadline).toLocaleDateString() : "—";
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h3>${task.name}</h3>
          <p>${task.description || ""}</p>
          ${task.link ? `<a href="${task.link}" target="_blank" rel="noopener">Task Link</a>` : ""}
          <p><strong>Deadline:</strong> ${deadlineText}</p>
          <div class="card-actions">
            <span class="edit-btn" title="Edit"><i class="fa fa-edit"></i></span>
            <span class="delete-btn" title="Delete"><i class="fa fa-trash"></i></span>
          </div>
        `;
        card.onclick = (e) => {
          if (e.target.closest(".edit-btn")) { e.stopPropagation(); openModal("task", true, { idx }); }
          else if (e.target.closest(".delete-btn")) {
            e.stopPropagation();
            if (confirm("Delete this task?")) {
              course.tasks.splice(idx, 1);
              showNotification("Task deleted","success");
              renderTasks(trackIdx, courseIdx);
            }
          }
        };
        coreSection.appendChild(card);
      });
  }
}

// ================= Announce view =================
announceTrackBtn.onclick = renderAnnounceTracks;
function renderAnnounceTracks() {
  if (applicationSection.classList.contains("show")) {
    applicationBtn.textContent = "Applications";
    applicationSection.classList.remove("show");
    allTracksCtrlBtn.classList.remove("hide");
  }
  currentView = "announceTracks";
  customAddBtn.style.display = "none";
  selectedTrackIndex = selectedCourseIndex = null;

  headerTitle.textContent = "Announce Tracks";
  coreSection.innerHTML = "";

  announceTrackData.forEach((announceTrack, idx) => {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("key", announceTrack.id);
    card.innerHTML = `
      ${announceTrack.icon || "<i class='fa fa-bullhorn icon'></i>"}
      <h3>${announceTrack.name}</h3>
      <p>${announceTrack.description || ""}</p>
      <p>${announceTrack.announcementContent || ""}</p>
      <div class="card-actions">
        <span class="edit-btn" title="Edit"><i class="fa fa-edit"></i></span>
        <span class="delete-btn" title="Delete"><i class="fa fa-trash"></i></span>
      </div>
    `;
    card.onclick = (e) => {
      if (e.target.closest(".edit-btn")) { e.stopPropagation(); openModal("announceTrack", true, { idx }); }
      else if (e.target.closest(".delete-btn")) {
        e.stopPropagation();
        if (confirm("Delete this track?")) {
          announceTrackData.splice(idx, 1);
          localStorage.setItem("announceTrackData", JSON.stringify(announceTrackData));
          showNotification("Track deleted", "success");
          renderAnnounceTracks();
        }
      }
    };
    coreSection.appendChild(card);
  });
}

// ================= Toolbar =================
function addSomething() {
  if (currentView === "announceTracks") openModal("announceTrack");
  else if (currentView === "tracks") openModal("track");
  else if (currentView === "courses") openModal("course");
  else if (currentView === "tasks") openModal("task");
}
function backForword() { if (currentView === "tasks") renderCourses(selectedTrackIndex); else renderTracks(); }

// ================= Modal helpers =================
function setModalTitleByType(type, isEdit) {
  const map = {
    track: isEdit ? "Edit Track" : "Add Track",
    course: isEdit ? "Edit Course" : "Add Course",
    task: isEdit ? "Edit Task" : "Add Task",
    announceTrack: isEdit ? "Edit Announcement" : "Add Announcement"
  };
  modalTitle.textContent = map[type] || "Modal";
}

// Icons
const FA_ICON_OPTIONS = [
  "fa-microchip","fa-cogs","fa-robot","fa-bolt","fa-microphone-lines",
  "fa-code","fa-diagram-project","fa-screwdriver-wrench","fa-flask","fa-wave-square"
];
function iconHTMLFromChoice(choice){ if(!choice) return "<i class='fa fa-microchip icon'></i>"; if(choice==="__custom__") return ""; return `<i class="fa ${choice} icon"></i>`; }
function sanitizeHTMLIcon(input){
  const div=document.createElement("div"); div.innerHTML=input; const i=div.querySelector("i");
  if(!i) return ""; const cls=(i.getAttribute("class")||"").split(/\s+/).filter(c=>c==="icon"||c.startsWith("fa")).join(" ");
  return `<i class="${cls}"></i>`;
}

async function openModal(type, isEdit = false, indices = {}) {
  setModalTitleByType(type, isEdit);

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modalFields.innerHTML = "";
  editMode = isEdit;
  editIndices = indices;

  let values = {};
  if (isEdit) {
    if (type === "track") {
      const t = electricData.tracks[indices.idx];
      values = { name: t.name, icon: t.icon, description: t.description };
    } else if (type === "course") {
      const c = electricData.tracks[selectedTrackIndex].courses[indices.idx];
      values = { name: c.name, description: c.description, admins: c.admins || [] };
    } else if (type === "task") {
      const t = electricData.tracks[selectedTrackIndex].courses[selectedCourseIndex].tasks[indices.idx];
      values = { name: t.name, description: t.description, link: t.link || "", deadline: t.deadline || "" };
    } else if (type === "announceTrack") {
      const t = announceTrackData[indices.idx];
      values = { name: t.name, description: t.description, content: t.announcementContent };
    }
  }

  // ===== Render modal fields =====
  if (type === "track") {
    const m = (values.icon || "").match(/fa\s+(fa-[\w-]+)/i);
    const cls = m ? m[1] : null;
    const resolvedIconChoice = cls && FA_ICON_OPTIONS.includes(cls) ? cls : "__custom__";
    const initialCustomIcon = resolvedIconChoice === "__custom__" ? (values.icon || "<i class='fa fa-microchip icon'></i>") : "";

    modalFields.innerHTML = `
      <div class="grid-2">
        <div>
          <label for="track-name">Track Name</label>
          <input id="track-name" required value="${values.name || ""}" maxlength="60" placeholder="e.g., Embedded Systems"/>

          <label for="track-description">Description</label>
          <textarea id="track-description" required maxlength="220" placeholder="Short, clear description">${values.description || ""}</textarea>
        </div>

        <div>
          <label for="track-icon-choice">Icon</label>
          <div class="icon-picker">
            <select id="track-icon-choice">
              ${FA_ICON_OPTIONS.map(c => `<option value="${c}" ${resolvedIconChoice===c?"selected":""}>${c.replace("fa-","")}</option>`).join("")}
              <option value="__custom__" ${resolvedIconChoice==="__custom__"?"selected":""}>Custom &lt;i&gt; HTML</option>
            </select>
            <span id="icon-choice-preview" class="icon-choice-preview">${iconHTMLFromChoice(resolvedIconChoice)}</span>
          </div>

          <div id="custom-icon-wrap" class="${resolvedIconChoice==="__custom__"?"":"hidden"}">
            <label for="track-icon-custom">Custom Icon HTML (safe &lt;i class="fa ..."&gt; only)</label>
            <input id="track-icon-custom" value='${initialCustomIcon.replace(/'/g,"&apos;")}' placeholder="<i class='fa fa-microchip icon'></i>"/>
          </div>
        </div>
      </div>
    `;

    // preview (no admins for track)
    modalPreview.hidden = false;
    setupTrackLivePreview({
      name: values.name || "",
      description: values.description || "",
      iconHTML: values.icon || "<i class='fa fa-microchip icon'></i>"
    });
    document.getElementById("preview-admins-wrap").style.display = "none";

    // icon behavior
    const choiceEl = document.getElementById("track-icon-choice");
    const choicePreview = document.getElementById("icon-choice-preview");
    const customWrap = document.getElementById("custom-icon-wrap");
    const customInput = document.getElementById("track-icon-custom");
    function applyIconPreview(){
      const val=choiceEl.value;
      if(val==="__custom__"){
        customWrap.classList.remove("hidden");
        choicePreview.innerHTML = sanitizeHTMLIcon(customInput.value.trim()) || "<i class='fa fa-circle-question'></i>";
        updatePreviewIcon(choicePreview.innerHTML);
      } else {
        customWrap.classList.add("hidden");
        const html = iconHTMLFromChoice(val);
        choicePreview.innerHTML = html; updatePreviewIcon(html);
      }
    }
    choiceEl.addEventListener("change", applyIconPreview);
    customInput.addEventListener("input", applyIconPreview);

    document.getElementById("track-name").addEventListener("input", (e)=>updatePreviewName(e.target.value));
    document.getElementById("track-description").addEventListener("input", (e)=>updatePreviewDesc(e.target.value));
  }

  else if (type === "course") {
    // Load members from API before building the picker
    if (!Array.isArray(membersDirectory) || membersDirectory.length === 0) {
      await loadMembers();
    }
    const initialAdminIds = (values.admins || []).map(a => a.id);

    modalFields.innerHTML = `
      <label for="course-name">Course Name</label>
      <input id="course-name" required value="${values.name || ""}">
      <label for="course-description">Description</label>
      <textarea id="course-description" required>${values.description || ""}</textarea>

      <!-- Admins Picker (COURSE) -->
      <div class="admins-picker">
        <div class="admins-header"><h4>الأعضاء المختارِين (Admins)</h4></div>
        <div id="admins-selected" class="chips-wrap"></div>
        <label for="admins-search" class="admins-label">اختر الأعضاء</label>
        <input id="admins-search" class="admins-search" type="text" placeholder="ابحث عن عضو..."/>
        <div id="admins-list" class="admins-list" tabindex="0"></div>
      </div>
    `;

    // preview (with admins)
    modalPreview.hidden = false;
    document.getElementById("preview-admins-wrap").style.display = "flex";
    setupCourseLivePreview({
      name: values.name || "",
      description: values.description || "",
      adminIds: initialAdminIds
    });

    // build admins UI and ensure scroll goes to bottom if needed
    buildAdminsUI(initialAdminIds, /*updatePreview*/ true);

    // live typing preview
    document.getElementById("course-name").addEventListener("input", (e)=>updatePreviewName(e.target.value));
    document.getElementById("course-description").addEventListener("input", (e)=>updatePreviewDesc(e.target.value));
  }

  else if (type === "task") {
    modalPreview.hidden = true;
    modalFields.innerHTML = `
      <label for="task-name">Task Name</label>
      <input id="task-name" required value="${values.name || ""}">
      <label for="task-description">Description</label>
      <textarea id="task-description" required>${values.description || ""}</textarea>
      <label for="task-link">Task Link</label>
      <input id="task-link" type="url" placeholder="https://..." value="${values.link || ""}">
      <label for="task-deadline">Deadline</label>
      <input id="task-deadline" type="date" value="${values.deadline || ""}">
    `;
  }

  else if (type === "announceTrack") {
    modalPreview.hidden = true;
    const options = (electricData.tracks || []).map(t => `<option value="${t.name}">${t.name}</option>`).join("");
    modalFields.innerHTML = `
      <label for="announce-track-name">Select Announcement Track</label>
      <select name="announce-track-name" id="announce-track-name">${options}</select>
      <label for="announce-track-description">Description</label>
      <textarea id="announce-track-description" required>${values.description || ""}</textarea>
      <label for="announce-track-content">Announcement content</label>
      <textarea id="announce-track-content" required>${values.content || ""}</textarea>
    `;
  }

  // ===== Submit =====
  modalForm.onsubmit = (e) => {
    e.preventDefault();
    const errorsEl = document.getElementById("form-errors");
    errorsEl.textContent = "";

    if (type === "track") {
      const name = document.getElementById("track-name").value.trim();
      const description = document.getElementById("track-description").value.trim();

      const iconChoice = document.getElementById("track-icon-choice").value;
      let iconHTML = iconHTMLFromChoice(iconChoice);
      if (iconChoice === "__custom__") {
        iconHTML = sanitizeHTMLIcon(document.getElementById("track-icon-custom").value.trim());
      }

      const errs = [];
      if (!name) errs.push("Track name is required.");
      if (!description) errs.push("Description is required.");
      if (iconChoice === "__custom__" && !iconHTML) errs.push("Custom icon HTML is invalid.");
      if (errs.length) { errorsEl.textContent = errs.join(" "); return; }

      if (editMode) {
        const t = electricData.tracks[editIndices.idx];
        t.name = name; t.description = description; t.icon = iconHTML || t.icon;
        fetch(`${backendURL}tracks/${t._id || editIndices.idx}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
          body: JSON.stringify({ name, description, icon: t.icon })
        }).catch(()=>{});
        showNotification("Track updated","success");
      } else {
        const payload = { name, description, icon: iconHTML || "<i class='fa fa-microchip icon'></i>" };
        fetch(`${backendURL}tracks`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
          body: JSON.stringify(payload)
        }).catch(()=>{});
        electricData.tracks.push({ _id: `local-${Date.now()}`, ...payload, courses: [] });
        showNotification("Track added","success");
      }
      renderTracks();
    }

    else if (type === "course") {
      const name = document.getElementById("course-name").value.trim();
      const description = document.getElementById("course-description").value.trim();

      const adminsSelectedIds = Array.from(document.querySelectorAll(".admin-checkbox:checked")).map(cb => cb.value);
      const selectedAdmins = membersDirectory.filter(m => adminsSelectedIds.includes(m.id));

      if (!name || !description) {
        errorsEl.textContent = "Course name and description are required.";
        return;
      }

      if (editMode) {
        const c = electricData.tracks[selectedTrackIndex].courses[editIndices.idx];
        c.name = name; c.description = description; c.admins = selectedAdmins;
        showNotification("Course updated","success");
      } else {
        electricData.tracks[selectedTrackIndex].courses.push({ name, description, admins: selectedAdmins, tasks: [] });
        showNotification("Course added","success");
      }
      renderCourses(selectedTrackIndex);
    }

    else if (type === "task") {
      const name = document.getElementById("task-name").value.trim();
      const description = document.getElementById("task-description").value.trim();
      const link = document.getElementById("task-link").value.trim();
      const deadline = document.getElementById("task-deadline").value;
      if (!name || !description) { errorsEl.textContent = "Task name and description are required."; return; }
      if (editMode) {
        const t = electricData.tracks[selectedTrackIndex].courses[selectedCourseIndex].tasks[editIndices.idx];
        t.name = name; t.description = description; t.link = link || ""; t.deadline = deadline || "";
        showNotification("Task updated","success");
      } else {
        electricData.tracks[selectedTrackIndex].courses[selectedCourseIndex].tasks.push({ name, description, link: link || "", deadline: deadline || "" });
        showNotification("Task added","success");
      }
      renderTasks(selectedTrackIndex, selectedCourseIndex);
    }

    else if (type === "announceTrack") {
      const name = document.getElementById("announce-track-name").value;
      const description = document.getElementById("announce-track-description").value.trim();
      const announcementContent = document.getElementById("announce-track-content").value.trim();

      if (editMode) {
        const t = announceTrackData[editIndices.idx];
        t.name = name; t.description = description; t.announcementContent = announcementContent;
        localStorage.setItem("announceTrackData", JSON.stringify(announceTrackData));
        showNotification("Track announcement updated","success");
      } else {
        const id = generateUUID();
        announceTrackData.push({
          name, icon:"<i class='fa fa-bullhorn icon'></i>", description, announcementContent,
          RequestStatus:"pending", id,
          applay:{ isApplaying:false, trackId:"", trackName:"", Membername:"", email:"" }
        });
        localStorage.setItem("announceTrackData", JSON.stringify(announceTrackData));
        showNotification("Track announcement added","success");
      }
      renderAnnounceTracks();
    }

    closeModal();
  };

  // ===== focus trap + position =====
  requestAnimationFrame(() => {
    const focusables = modalContent.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])');
    if (focusables.length) focusables[0].focus();
    function onKeyDown(e){
      if(e.key==="Escape"){e.preventDefault();closeModal();}
      else if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){e.preventDefault();modalForm.requestSubmit();}
      else if(e.key==="Tab"){
        const f=Array.from(focusables).filter(el=>!el.hasAttribute("disabled"));
        if(!f.length) return; const first=f[0], last=f[f.length-1];
        if(e.shiftKey && document.activeElement===first){ last.focus(); e.preventDefault();}
        else if(!e.shiftKey && document.activeElement===last){ first.focus(); e.preventDefault();}
      }
    }
    modal.addEventListener("keydown", onKeyDown, { once:false });
    modal._removeTrap = () => modal.removeEventListener("keydown", onKeyDown);
  });

  centerModal();
}

// Close modal
function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (typeof modal._removeTrap === "function") modal._removeTrap();
  modalForm.reset();
  editMode = false; editIndices = {};
  modalContent.style.left = ""; modalContent.style.top = "";
  modalContent.classList.remove("dragging");
  const preview = document.getElementById("modal-preview");
  if (preview) preview.hidden = true;
}

// Close handlers
function onBackDropClick(e){ if (e.target === modal) closeModal(); }
window.addEventListener("click", onBackDropClick);
closeModalBtn.onclick = closeModal;
floatingClose.onclick = closeModal;
modalCancelBtn.onclick = closeModal;

// -------------------- Draggable --------------------
const handle = document.querySelector(".drag-handle");
let dragStartX = 0, dragStartY = 0, startLeft = 0, startTop = 0, dragging = false;
function centerModal(){
  const vw=window.innerWidth, vh=window.innerHeight;
  const rect=modalContent.getBoundingClientRect();
  modalContent.style.position="fixed";
  modalContent.style.left=`${(vw-rect.width)/2}px`;
  modalContent.style.top =`${(vh-rect.height)/2}px`;
}
function startDrag(x,y){ dragging=true; modalContent.classList.add("dragging"); dragStartX=x; dragStartY=y; const r=modalContent.getBoundingClientRect(); startLeft=r.left; startTop=r.top; }
function moveDrag(x,y){
  if(!dragging) return;
  const dx=x-dragStartX, dy=y-dragStartY;
  const vw=window.innerWidth, vh=window.innerHeight;
  const rect=modalContent.getBoundingClientRect();
  let nextLeft=startLeft+dx, nextTop=startTop+dy;
  nextLeft=Math.min(Math.max(nextLeft,8), vw-rect.width-8);
  nextTop =Math.min(Math.max(nextTop,8),  vh-rect.height-8);
  modalContent.style.left=`${nextLeft}px`; modalContent.style.top=`${nextTop}px`;
}
function endDrag(){ dragging=false; modalContent.classList.remove("dragging"); }
handle.addEventListener("mousedown",(e)=>{e.preventDefault();startDrag(e.clientX,e.clientY);});
window.addEventListener("mousemove",(e)=>moveDrag(e.clientX,e.clientY));
window.addEventListener("mouseup",endDrag);
handle.addEventListener("touchstart",(e)=>{const t=e.touches[0];startDrag(t.clientX,t.clientY);},{passive:true});
window.addEventListener("touchmove",(e)=>{const t=e.touches[0];moveDrag(t.clientX,t.clientY);},{passive:true});
window.addEventListener("touchend",endDrag);

// ---------------- Admins picker + Live Preview (COURSE) ----------------
function buildAdminsUI(initialIds = [], updatePreview = false) {
  const selectedSet = new Set(initialIds);
  const selectedWrap = document.getElementById("admins-selected");
  const listEl = document.getElementById("admins-list");
  const searchEl = document.getElementById("admins-search");

  function renderSelected() {
    selectedWrap.innerHTML =
      Array.from(selectedSet).map(id => {
        const m = membersDirectory.find(u => u.id === id);
        if (!m) return "";
        return `
          <span class="chip">
            <img src="${m.avatar}" alt="${m.name}" />
            <span>${m.name}</span>
            <button type="button" class="chip-remove" data-id="${m.id}" aria-label="Remove">&times;</button>
          </span>
        `;
      }).join("") || `<span class="muted">لا يوجد أعضاء مختارون.</span>`;

    selectedWrap.querySelectorAll(".chip-remove").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.id;
        selectedSet.delete(id);
        renderSelected(); renderList(searchEl.value.trim());
        if (updatePreview) updatePreviewAdmins(Array.from(selectedSet));
      });
    });

    if (updatePreview) updatePreviewAdmins(Array.from(selectedSet));
  }

  function renderList(query = "") {
    const q = query.toLowerCase();
    const filtered = membersDirectory.filter(m => m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q));
    listEl.innerHTML = filtered.map(m => {
      const checked = selectedSet.has(m.id) ? "checked" : "";
      const rolesBadges = (m.roles || []).map(r => `<span class="role-badge ${r}">${r}</span>`).join(" ");
      return `
        <label class="admin-row">
          <input class="admin-checkbox" type="checkbox" value="${m.id}" ${checked}/>
          <img class="admin-avatar" src="${m.avatar}" alt="${m.name}">
          <div class="admin-meta">
            <div class="admin-name">${m.name}</div>
            <div class="admin-email">${m.email || ""}</div>
            <div class="admin-roles">${rolesBadges}</div>
          </div>
        </label>
      `;
    }).join("");

    // تمكين السحب لأسفل للنهاية بدون ما الـfooter يغطي
    listEl.scrollTop = listEl.scrollHeight;

    listEl.querySelectorAll(".admin-checkbox").forEach(cb => {
      cb.addEventListener("change", (e) => {
        const id = e.currentTarget.value;
        if (e.currentTarget.checked) selectedSet.add(id);
        else selectedSet.delete(id);
        renderSelected();
      });
    });
  }

  searchEl.addEventListener("input", (e) => renderList(e.target.value));
  renderSelected(); renderList();
}

// Live preview helpers
function setupTrackLivePreview({name, description, iconHTML}) {
  updatePreviewName(name);
  updatePreviewDesc(description);
  updatePreviewIcon(iconHTML);
}
function setupCourseLivePreview({name, description, adminIds}) {
  updatePreviewName(name);
  updatePreviewDesc(description);
  updatePreviewIcon("<i class='fa fa-book icon'></i>");
  updatePreviewAdmins(adminIds);
}
function updatePreviewName(v){ document.getElementById("preview-name").textContent = v || "Name"; }
function updatePreviewDesc(v){ document.getElementById("preview-desc").textContent = v || "Description"; }
function updatePreviewIcon(html){
  const holder = document.getElementById("preview-icon");
  holder.innerHTML = sanitizeHTMLIcon(html || "<i class='fa fa-microchip icon'></i>");
}
function updatePreviewAdmins(ids){
  const wrap = document.getElementById("preview-admins");
  if (!ids || ids.length === 0) { wrap.innerHTML = `<span class="muted">No admins</span>`; return; }
  wrap.innerHTML = ids.slice(0,3).map(id=>{
    const m = membersDirectory.find(x=>x.id===id);
    if (!m) return "";
    return `
      <span class="chip chip-sm">
        <img src="${m.avatar}" alt="${m.name}">
        <span class="chip-text">${(m.name||"").split(" ")[0] || "Admin"}</span>
      </span>
    `;
  }).join("") + (ids.length>3?`<span class="chip-more">+${ids.length-3}</span>`:"");
}

// ================= Applications =================
applicationBtn.addEventListener("click", () => {
  coreSection.innerHTML = "";
  showApplication();

  announceTrackData = JSON.parse(localStorage.getItem("announceTrackData") || "[]");
  const tbody = document.getElementById("application-body");
  tbody.innerHTML = "";

  const applicationData = announceTrackData.filter(track => track.applay?.isApplaying === true);
  applicationData.forEach((application, index) => {
    if (applicationSection.classList.contains("show")) {
      tbody.innerHTML += `
        <tr class="application-row" key="${application.id}">
          <td>${index + 1}</td>
          <td>${application.applay.trackName || ""}</td>
          <td>${application.applay.Membername || ""}</td>
          <td>
            <button class="action-btn" id="reject-Btn" onclick="rejectApplication('${application.id}')">reject</button>
            <button class="action-btn" id="accept-Btn" onclick="acceptApplication('${application.id}')">accept</button>
          </td>
        </tr>
      `;
    }
  });
});

function acceptApplication(id) {
  const application = announceTrackData.find(track => track.id === id);
  if (application) {
    application.RequestStatus = "accepted";
    localStorage.setItem("announceTrackData", JSON.stringify(announceTrackData));
    showNotification("Application accepted","success");
  }
}
function rejectApplication(id) {
  const application = announceTrackData.find(track => track.id === id);
  if (application) {
    application.RequestStatus = "rejected";
    localStorage.setItem("announceTrackData", JSON.stringify(announceTrackData));
    showNotification("Application rejected","success");
    renderAnnounceTracks();
  }
}

// ================= Helpers =================
function generateUUID(){
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(c){const r=(Math.random()*16)|0;const v=c==="x"?r:(r&0x3)|0x8;return v.toString(16);});
}

// Inline notif CSS inject
(function addNotifCSS() {
  const style = document.createElement("style");
  style.innerHTML = `
    .notif { position: fixed; top: 32px; right: 32px; background: #222a44; color: #fff; padding: 16px 32px; border-radius: 8px; font-size: 1.1rem; z-index: 3000; box-shadow: 0 2px 12px rgba(0,0,0,0.18); opacity: .95; transition: opacity .3s; }
    .notif-success { background: #43a047; } .notif-error { background: #e53935; }
  `;
  document.head.appendChild(style);
})();

// Boot
getTrack();
renderTracks();
