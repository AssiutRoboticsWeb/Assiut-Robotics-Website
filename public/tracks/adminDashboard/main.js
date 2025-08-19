const backendURL = "https://assiut-robotics-server.vercel.app/"; // Replace with your backend URL

// Electric Data Model
var electricData = {
  tracks: [
    {
      name: "Embedded",
      icon: "<i class='fa fa-microchip icon'></i>",
      description: "كل ما يخص الأنظمة المدمجة.",
      courses: [
        {
          name: "Intro to Embedded",
          description: "مقدمة عن الأنظمة المدمجة.",
          tasks: [
            {
              name: "Blink LED",
              description: "برمجة دائرة لجعل LED تضيء وتطفئ.",
              link: "https://example.com/blink",
              submitLink: "https://forms.gle/submit-blink",
            },
          ],
        },
      ],
    },
    {
      name: "Hardware",
      icon: "<i class='fa fa-cogs icon'></i>",
      description: "كل ما يخص الهاردوير.",
      courses: [],
    },
  ],
};

/* ----------------------------------- ED ----------------------------------- */

const showApplication = () => {
  if (applicationBtn.textContent == "Applications") {
    applicationBtn.textContent = "hide Applications";
    applicationSection.classList.toggle("show");
    allTracksCtrlBtn.classList.toggle("hide");
  } else {
    applicationBtn.textContent = "Applications";
    applicationSection.classList.toggle("show");
    allTracksCtrlBtn.classList.toggle("hide");
    renderTracks();
  }
};

// Announce Tracks Data & store in localStorage
let announceTrackData = localStorage.getItem("announceTrackData")
  ? JSON.parse(localStorage.getItem("announceTrackData"))
  : [];

// State
let currentView = "tracks"; // 'tracks' | 'courses' | 'tasks' | 'announceTracks'
let selectedTrackIndex = null;
let selectedCourseIndex = null;
let editMode = false;
let editIndices = {};
let token = localStorage.getItem("token");
// DOM Elements
const headerTitle = document.getElementById("header-title");
const addTrackBtn = document.getElementById("add-track-btn");
const announceTrackBtn = document.getElementById("all-announce-tracks-btn");
const coreSection = document.getElementById("core-section");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal");
const modalForm = document.getElementById("modal-form");
const modalFields = document.getElementById("modal-fields");
const modalSubmit = document.getElementById("modal-submit");
const applicationBtn = document.getElementById("application-btn");
const applicationSection = document.getElementById("application-section");
const allTracksCtrlBtn = document.getElementById("all-tracks-ctrl-btns");
const customAddBtn = document.getElementById("custom-add-btn");

const announceTracksCtrlBtn = document.getElementById(
  "announce-tracks-ctrl-btns"
);

// Notification
function showNotification(msg, type = "success") {
  let notif = document.createElement("div");
  notif.className = `notif notif-${type}`;
  notif.textContent = msg;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 2000);
}
addTrackBtn.onclick = renderTracks;
//event

// Render Functions

function getTrack() {
  // Example usage: fetch all tracks from backend
  fetch(`${backendURL}tracks`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        window.location.href = "../../login/login.html";
        return;
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data.data);
      electricData.tracks = data.data;
      // console.log(electricData);
      renderTracks();
    })
    .catch((error) => {
      showNotification("Failed to fetch tracks", "error");
      console.error(error);
      return [];
    });
}
getTrack();

function renderTracks() {
  if (applicationBtn.textContent == "hide Applications") {
    applicationBtn.textContent = "Applications";
    applicationSection.classList.toggle("show");
    allTracksCtrlBtn.classList.toggle("hide");
  }
  customAddBtn.style.display = "block";
  currentView = "tracks";
  selectedTrackIndex = null;
  selectedCourseIndex = null;
  headerTitle.textContent = "Tracks";
  headerTitle.setAttribute("title", headerTitle.textContent);
  // addTrackBtn.textContent = "Add Track";
  //   addTrackBtn.onclick = () => openModal("track");
  coreSection.innerHTML = "";
  electricData.tracks.forEach((track, idx) => {
    // console.log(track);

    const card = document.createElement("div");
    card.className = "card";
    card.style.position = "relative";
    card.innerHTML = `
    <i  onclick="AnnounceNewTrack(this)" class="AnnounceNewTrack-icon fa-solid fa-bullhorn fa-flip-horizontal fa-xl" style="color: #043a64ff; position: absolute; top: 30px; right: 10px;">
    </i>
    ${track.icon}
            <h3>${track.name}</h3>
            <p>${track.description}</p>
            <div class="card-actions">
                <span class="edit-btn" title="Edit"><i class="fa fa-edit"></i></span>
                <span class="delete-btn" title="Delete"><i class="fa fa-trash"></i></span>
            </div>
        `;
    card.onclick = (e) => {
      if (e.target.closest(".edit-btn")) {
        e.stopPropagation();
        openModal("track", true, { idx });
      } else if (e.target.closest(".delete-btn")) {
        e.stopPropagation();
        if (confirm("Delete this track?")) {
          fetch(`${backendURL}tracks/${track._id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then((response) => {
              if (!response.ok) {
                if (response.status === 401) {
                  window.location.href = "../../login/login.html";
                  return;
                }
                throw new Error("Failed to delete track");
              }
              electricData.tracks.splice(idx, 1);
              showNotification("Track deleted", "success");
              renderTracks();
            })
            .catch((error) => {
              showNotification("Failed to delete track", "error");
              console.error(error);
            });
        }
      } else if (e.target.closest(".AnnounceNewTrack-icon")) {
        AnnounceNewTrack(track);
      } else {
        renderCourses(idx);
      }
    };
    coreSection.appendChild(card);
  });
}

/* -------------------------------------------------------------------------- */
function AnnounceNewTrack(track) {
  currentView = "announceTracks";
  openModal("announceTrack");
}

function renderCourses(trackIdx) {
  currentView = "courses";
  customAddBtn.style.display = "block";
  selectedTrackIndex = trackIdx;
  selectedCourseIndex = null;
  const track = electricData.tracks[trackIdx];
  headerTitle.innerHTML = `${track.icon} ${track.name} - Courses`;
  // addTrackBtn.textContent = "Add Course";
  //   addTrackBtn.onclick = () => openModal("course");
  coreSection.innerHTML = "";
  // Back button
  const backBtn = document.createElement("button");
  backBtn.className = "back-btn";
  backBtn.textContent = "Back to Tracks";
  backBtn.onclick = renderTracks;
  coreSection.appendChild(backBtn);
  // Courses
  fetch(`${backendURL}tracks/${track._id}/courses`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        window.location.href = "../../login/login.html";
        return;
      }
      return response.json();
    })
    .then((data) => {
      if (Array.isArray(data.data)) {
        track.courses = data.data;
      }
    })
    .catch((error) => {
      showNotification("Failed to fetch courses", "error");
      console.error(error);
    });

  if (track.courses.length === 0) {
    const empty = document.createElement("div");
    empty.textContent = "No courses yet.";
    empty.style.margin = "32px auto";
    coreSection.appendChild(empty);
  } else {
    track.courses.forEach((course, idx) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
                <h3>${course.name}</h3>
                <p>${course.description}</p>
                <div class="card-actions">
                    <span class="edit-btn" title="Edit"><i class="fa fa-edit"></i></span>
                    <span class="delete-btn" title="Delete"><i class="fa fa-trash"></i></span>
                </div>
            `;
      card.onclick = (e) => {
        if (e.target.closest(".edit-btn")) {
          e.stopPropagation();
          openModal("course", true, { idx });
        } else if (e.target.closest(".delete-btn")) {
          e.stopPropagation();
          if (confirm("Delete this course?")) {
            track.courses.splice(idx, 1);
            showNotification("Course deleted", "success");
            renderCourses(trackIdx);
          }
        } else {
          renderTasks(trackIdx, idx);
        }
      };
      coreSection.appendChild(card);
    });
  }
}

function renderTasks(trackIdx, courseIdx) {
  currentView = "tasks";
  customAddBtn.style.display = "block";
  selectedTrackIndex = trackIdx;
  selectedCourseIndex = courseIdx;
  const track = electricData.tracks[trackIdx];
  const course = track.courses[courseIdx];
  headerTitle.innerHTML = `${track.icon} ${track.name} / ${course.name} - Tasks`;
  headerTitle.setAttribute("title", headerTitle.textContent);
  // addTrackBtn.textContent = "Add Task";
  //   addTrackBtn.onclick = () => openModal("task");
  coreSection.innerHTML = "";
  // Back button
  const backBtn = document.createElement("button");
  backBtn.className = "back-btn";
  backBtn.textContent = "Back to Courses";
  backBtn.onclick = () => renderCourses(trackIdx);
  coreSection.appendChild(backBtn);
  // Tasks
  if (!course.tasks || course.tasks.length === 0) {
    const empty = document.createElement("div");
    empty.textContent = "No tasks yet.";
    empty.style.margin = "32px auto";
    coreSection.appendChild(empty);
  } else {
    course.tasks.forEach((task, idx) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
                <h3>${task.name}</h3>
                <p>${task.description}</p>
                <a href="${task.link}" target="_blank">Task Link</a><br>
                <a href="${task.submitLink}" target="_blank">Submit</a>
                <div class="card-actions">
                    <span class="edit-btn" title="Edit"><i class="fa fa-edit"></i></span>
                    <span class="delete-btn" title="Delete"><i class="fa fa-trash"></i></span>
                </div>
            `;
      card.onclick = (e) => {
        if (e.target.closest(".edit-btn")) {
          e.stopPropagation();
          openModal("task", true, { idx });
        } else if (e.target.closest(".delete-btn")) {
          e.stopPropagation();
          if (confirm("Delete this task?")) {
            course.tasks.splice(idx, 1);
            showNotification("Task deleted", "success");
            renderTasks(trackIdx, courseIdx);
          }
        }
      };
      coreSection.appendChild(card);
    });
  }
}
/* ----------------------------------- ED renderAnnounceTracks--------- zx-------------------------- */
// Render Announce Tracks
announceTrackBtn.onclick = renderAnnounceTracks;
function renderAnnounceTracks() {
  if (applicationBtn.textContent == "hide Applications") {
    applicationBtn.textContent = "Applications";
    applicationSection.classList.toggle("show");
    allTracksCtrlBtn.classList.toggle("hide");
  }

  currentView = "announceTracks";
  customAddBtn.style.display = "none";
  selectedTrackIndex = null;
  selectedCourseIndex = null;
  headerTitle.textContent = "Announce Tracks";
  headerTitle.setAttribute("title", headerTitle.textContent);
  //   announceTrackBtn.textContent = "Add Track Announcement";
  // addTrackBtn.textContent = "Add Track";
  coreSection.innerHTML = "";
  //   announceTrackBtn.onclick = () => openModal("announceTrack");
  announceTrackData.forEach((announceTrack, idx) => {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("key", announceTrack.id);
    card.innerHTML += `
            ${announceTrack.icon}
            <h3>${announceTrack.name}</h3>
            <p>${announceTrack.description}</p>
            <p>${announceTrack.announcementContent}</p>
            <div class="card-actions">
                <span class="edit-btn" title="Edit"><i class="fa fa-edit"></i></span>
                <span class="delete-btn" title="Delete"><i class="fa fa-trash"></i></span>
            </div>
        `;
    card.onclick = (e) => {
      if (e.target.closest(".edit-btn")) {
        e.stopPropagation();
        openModal("announceTrack", true, { idx });
      } else if (e.target.closest(".delete-btn")) {
        e.stopPropagation();
        if (confirm("Delete this track?")) {
          announceTrackData.splice(idx, 1);
          localStorage.setItem(
            "announceTrackData",
            JSON.stringify(announceTrackData)
          );

          showNotification("Track deleted", "success");
          renderAnnounceTracks();
        }
      }
      //  else {
      //     announceTrack(idx);
      // }
    };
    coreSection.appendChild(card);
  });
}

function addSomething(e) {
  if (currentView === "announceTracks") {
    openModal("announceTrack");
  } else if (currentView === "tracks") {
    openModal("track");
  } else if (currentView === "courses") {
    openModal("course");
  } else if (currentView === "tasks") {
    openModal("task");
  }
}

function backForword(e) {
  if (currentView === "tasks") {
    renderCourses(selectedTrackIndex);
  } else {
    renderTracks();
  }
  // if (currentView === "announceTracks") {
  //   renderTracks();
  // } else if (currentView === "tracks") {
  //   renderTracks();
  // } else if (currentView === "courses") {
  //   renderTracks();
  // } else if (currentView === "tasks") {
  //   renderCourses(selectedTrackIndex);
  // }
}

/* -------------------------------------------------------------------------- */
// Modal Logic
function openModal(type, isEdit = false, indices = {}) {
  modal.classList.add("show");
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
      values = { name: c.name, description: c.description };
    } else if (type === "task") {
      const t =
        electricData.tracks[selectedTrackIndex].courses[selectedCourseIndex]
          .tasks[indices.idx];
      values = {
        name: t.name,
        description: t.description,
        link: t.link,
        submitLink: t.submitLink,
      };
    }
  }
  modalForm.onsubmit = (e) => {
    e.preventDefault();
    if (type === "track") {
      const name = document.getElementById("track-name").value;
      // const icon = document.getElementById("track-icon").value;
      const description = document.getElementById("track-description").value;
      if (editMode) {
        const t = electricData.tracks[editIndices.idx];
        t.name = name;
        // t.icon = icon;
        t.description = description;
        const icon = document.getElementById("track-icon").value;
        fetch(`${backendURL}tracks/${t._id || editIndices.idx}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, description }),
        })
          .then((response) => response.json())
          .then((data) => {
            showNotification("Track updated on server", "success");
            // Optionally handle server response here
          })
          .catch((error) => {
            showNotification("Failed to update track on server", "error");
            console.error(error);
          });
        showNotification("Track updated", "success");
      } else {
        const icon = document.getElementById("track-icon").value;

        // Example: send data to a server endpoint (replace URL with your API)
        fetch(`${backendURL}tracks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ name, description }),
        })
          .then((response) => response.json())
          .then((data) => {
            showNotification("Track sent to server", "success");
            // Optionally handle server response here
          })
          .catch((error) => {
            showNotification("Failed to send track to server", "error");
            console.error(error);
          });
        showNotification("Track added", "success");
      }
      renderTracks();
    } else if (type === "course") {
      const name = document.getElementById("course-name").value;
      const description = document.getElementById("course-description").value;
      if (editMode) {
        const c =
          electricData.tracks[selectedTrackIndex].courses[editIndices.idx];
        c.name = name;
        c.description = description;
        showNotification("Course updated", "success");
      } else {
        electricData.tracks[selectedTrackIndex].courses.push({
          name,
          description,
          tasks: [],
        });
        showNotification("Course added", "success");
      }
      renderCourses(selectedTrackIndex);
    } else if (type === "task") {
      const name = document.getElementById("task-name").value;
      const description = document.getElementById("task-description").value;
      const link = document.getElementById("task-link").value;
      const submitLink = document.getElementById("task-submit-link").value;
      if (editMode) {
        const t =
          electricData.tracks[selectedTrackIndex].courses[selectedCourseIndex]
            .tasks[editIndices.idx];
        t.name = name;
        t.description = description;
        t.link = link;
        t.submitLink = submitLink;
        showNotification("Task updated", "success");
      } else {
        electricData.tracks[selectedTrackIndex].courses[
          selectedCourseIndex
        ].tasks.push({ name, description, link, submitLink });
        showNotification("Task added", "success");
      }
      renderTasks(selectedTrackIndex, selectedCourseIndex);
      /* ----------------------------------- ED ----------------------------------- */
    } else if (type === "announceTrack") {
      const name = document.getElementById("announce-track-name").value;
      const description = document.getElementById(
        "announce-track-description"
      ).value;
      const announcementContent = document.getElementById(
        "announce-track-content"
      ).value;
      if (editMode) {
        const t = announceTrackData[editIndices.idx];
        t.name = name;
        t.description = description;
        t.announcementContent = announcementContent;

        showNotification("Track announcement updated", "success");
        localStorage.setItem(
          "announceTrackData",
          JSON.stringify(announceTrackData)
        );
      } else {
        const id = generateUUID();
        announceTrackData.push({
          name,
          icon: "<i class='fa fa-bullhorn icon'></i>",
          description,
          announcementContent,
          RequestStatus: "pending",
          id,
          applay: {
            isApplaying: false,
            trackId: "",
            trackName: "",
            Membername: "",
            Membername: "",
            email: "",
          },
        });
        localStorage.setItem(
          "announceTrackData",
          JSON.stringify(announceTrackData)
        );
        showNotification("Track announcement added", "success");
      }
      // renderTracks();
      renderAnnounceTracks();
    }
    /* ----------------------------------- ED ----------------------------------- */

    closeModal();
  };
  if (type === "track") {
    modalFields.innerHTML = `
            <label for="track-name">Track Name</label>
            <input id="track-name" required value="${values.name || ""}">
            <label for="track-icon">Track Icon (HTML)</label>
            <input id="track-icon" value='${
              values.icon
                ? values.icon.replace(/'/g, "&apos;")
                : "<i class='fa fa-microchip icon'></i>"
            }'>
            <label for="track-description">Description</label>
            <textarea id="track-description" required>${
              values.description || ""
            }</textarea>    
        `;
  } else if (type === "course") {
    modalFields.innerHTML = `
            <label for="course-name">Course Name</label>
            <input id="course-name" required value="${values.name || ""}">
            <label for="course-description">Description</label>
            <textarea id="course-description" required>${
              values.description || ""
            }</textarea>
        `;
  } else if (type === "task") {
    modalFields.innerHTML = `
            <label for="task-name">Task Name</label>
            <input id="task-name" required value="${values.name || ""}">
            <label for="task-description">Description</label>
            <textarea id="task-description" required>${
              values.description || ""
            }</textarea>
            <label for="task-link">Task Link</label>
            <input id="task-link" type="url" value="${values.link || ""}">
            <label for="task-submit-link">Submit Link</label>
            <input id="task-submit-link" type="url" value="${
              values.submitLink || ""
            }">
        `;
    /* ----------------------------------- ED ----------------------------------- */
  } else if (type === "announceTrack") {
    let AvilableTacks = electricData.tracks;
    modalFields.innerHTML = `

            <label for="announce-track-name">select Announcement Track</label>
              <select name="announce-track-name" id="announce-track-name">
              ${AvilableTacks.map(
                (track) =>
                  `<option value="${track.name}">${track.name}</option>`
              )}
               </select>

            <label for="announce-track-description">Description</label>
            <textarea id="announce-track-description" required>${
              values.description || ""
            }</textarea>
            <label for="announce-track-content">Announcement content</label>
            <textarea id="announce-track-content" required>${
              values.content || ""
            }</textarea>
            `;
  }
  /* ----------------------------------- ED ----------------------------------- */
}

function closeModal() {
  modal.classList.remove("show");
  modalForm.reset();
  editMode = false;
  editIndices = {};
}
closeModalBtn.onclick = closeModal;
window.onclick = function (event) {
  if (event.target === modal) closeModal();
};

// Notification CSS
(function addNotifCSS() {
  const style = document.createElement("style");
  style.innerHTML = `
    .notif {
        position: fixed;
        top: 32px;
        right: 32px;
        background: #222a44;
        color: #fff;
        padding: 16px 32px;
        border-radius: 8px;
        font-size: 1.1rem;
        z-index: 2000;
        box-shadow: 0 2px 12px rgba(0,0,0,0.18);
        opacity: 0.95;
        transition: opacity 0.3s;
    }
    .notif-success { background: #43a047; }
    .notif-error { background: #e53935; }
    `;
  document.head.appendChild(style);
})();

applicationBtn.addEventListener("click", () => {
  coreSection.innerHTML = "";
  // applicationBtn.textContent= (applicationBtn.textContent == "Applications" ? "hide Applications" : "Applications");
  // applicationSection.classList.toggle("show");
  // allTracksCtrlBtn.classList.toggle("hide");
  showApplication();

  announceTrackData = localStorage.getItem("announceTrackData")
    ? JSON.parse(localStorage.getItem("announceTrackData"))
    : [];

  console.log(announceTrackData);
  let applicationData = announceTrackData.filter(
    (track) => track.applay.isApplaying == true
  );
  console.log(applicationData);
  applicationData.forEach((application, index) => {
    if (applicationSection.classList.contains("show")) {
      document.getElementById("application-body").innerHTML += `
                    <tr class="application-row" key="${application.id}">
                        <td>${index}</td>
                        <td>${application.applay.trackName}</td>
                        <td>${application.applay.Membername}</td>
                        <td>
                            <button class="action-btn" id="reject-Btn"onclick="rejectApplication('${application.id}') ">reject</button>
                            <button class="action-btn" id="accept-Btn"onclick="acceptApplication('${application.id}') ">accept</button>
                        </td>
                    </tr>        
    `;
    }
  });
});

// acceptApplication
function acceptApplication(applicationId) {
  // Find the application in the data
  const application = announceTrackData.find(
    (track) => track.id === applicationId
  );
  if (application) {
    application.RequestStatus = "accepted";
    showNotification("Application accepted", "success");
    console.log(announceTrackData);
    localStorage.setItem(
      "announceTrackData",
      JSON.stringify(announceTrackData)
    );
  }
}
// rejectApplication
function rejectApplication(applicationId) {
  // Find the application in the data
  const application = announceTrackData.find(
    (track) => track.id === applicationId
  );
  if (application) {
    application.RequestStatus = "rejected";
    showNotification("Application rejected");
    console.log(announceTrackData);
    localStorage.setItem(
      "announceTrackData",
      JSON.stringify(announceTrackData)
    );
    renderAnnounceTracks();
  }
}

// Generate UUID function
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Initial Render
renderTracks();
