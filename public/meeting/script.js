const user = JSON.parse(localStorage.getItem("data") || "{}");
const userId = user?._id;
const isAdmin = ["admin", "head"].includes(user?.role);

let currentMeeting = null;
let selectedTimeId = null;
let currentSlot = null;

const modal = new bootstrap.Modal(document.getElementById('timeSlotModal'));

// ================= FETCH =================
async function fetchMeetings() {
     try {
          const res = await fetch(APIConfig.getMeetingEndpoint(), {
               headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          const data = await res.json();
          renderMeetings(data.data || []);
     } catch {
          showToast("Failed to load meetings", "danger");
     }
}

// ================= RENDER =================
function renderMeetings(meetings) {
     const container = document.getElementById('meetingsContainer');
     container.innerHTML = '';

     if (!meetings.length) {
          container.innerHTML = `<p>No meetings available</p>`;
          return;
     }

     meetings.forEach(meeting => {
          const card = document.createElement('div');
          card.className = 'col-md-4';
          card.setAttribute("data-aos", "fade-up");

          card.innerHTML = `
    <div class="card meeting-card">
        <h5>${meeting.title}</h5>
        <p>Created by: ${meeting.createdBy?.name || "Unknown"}</p>
    </div>
`;

          card.onclick = () => showCalendar(meeting);
          container.appendChild(card);
     });
}

// ================= CALENDAR =================
function showCalendar(meeting) {
     currentMeeting = meeting;
     document.getElementById('calendarContainer').style.display = 'block';
     document.getElementById('meetingTitle').textContent = meeting.title;

     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
     const tabs = document.getElementById('dayTabs');
     const content = document.getElementById('dayTabsContent');

     tabs.innerHTML = '';
     content.innerHTML = '';

     meeting.tableOfDates.forEach((day, i) => {
          tabs.innerHTML += `
    <li class="nav-item">
        <button class="nav-link ${i === 0 ? 'active' : ''}" data-bs-toggle="tab" data-bs-target="#day${i}">
            ${days[i]}
        </button>
    </li>
`;

          const wrapper = document.createElement("div");
          wrapper.className = `tab-pane fade ${i === 0 ? 'show active' : ''}`;
          wrapper.id = `day${i}`;

          const grid = document.createElement("div");
          grid.className = "time-slot-grid";

          day.forEach(slot => {
               const el = document.createElement("div");

               const isMine = slot.bookedBy?.includes(userId);

               el.className = `time-slot ${slot.isBooked ? 'booked' : 'available'} ${isMine ? 'disabled' : ''}`;
               el.innerHTML = `
        <div class="fw-bold">${slot.time}</div>
        <small>${slot.bookedBy?.length || 0} booked</small>
    `;

               el.addEventListener("click", () => openSlot(slot));
               grid.appendChild(el);
          });

          wrapper.appendChild(grid);
          content.appendChild(wrapper);
     });
}

// ================= SLOT =================
function openSlot(slot) {
     selectedTimeId = slot._id;
     currentSlot = slot;

     document.getElementById('timeSlotTitle').textContent = `Time: ${slot.time}`;
     const list = document.getElementById('bookedMembersList');

     if (!slot.bookedBy?.length) {
          list.innerHTML = `<p>No bookings yet</p>`;
     } else {
          list.innerHTML = slot.bookedBy.map(id => {
               const m = currentMeeting.members.find(x => x._id === id);
               if (!m) return '';
               return `
        <div class="d-flex mb-2">
            <img src="${m.avatar}" class="member-avatar me-2">
            <div>
                <div>${m.name}</div>
                <small>${m.email}</small>
            </div>
        </div>
    `;
          }).join('');
     }

     modal.show();
}

// ================= BOOK =================
async function bookTimeSlot() {
     if (!selectedTimeId) return showToast("Select a slot", "warning");

     if (currentSlot.bookedBy.includes(userId)) {
          return showToast("Already booked ⚠️", "warning");
     }

     if (!isAdmin) {
          return showToast("Only admins can book 🚫", "danger");
     }

     try {
          const res = await fetch(APIConfig.getMeetingEndpoint(`/${currentMeeting._id}/book`), {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
               },
               body: JSON.stringify({ timeId: selectedTimeId })
          });

          const result = await res.json();
          if (!res.ok) throw new Error(result.message);

          showToast("Booked successfully ✅");
          modal.hide();
          fetchMeetings();

     } catch (err) {
          showToast(err.message, "danger");
     }
}

// ================= SOCKET =================
// const socket = new WebSocket("wss://your-server-url");

// socket.onmessage = (e) => {
//      const data = JSON.parse(e.data);
//      if (data.type === "MEETING_UPDATED") {
//           fetchMeetings();
//           showToast("Updated 🔄", "info");
//      }
// };

// ================= EVENTS =================
document.getElementById('bookTimeSlot').addEventListener('click', bookTimeSlot);
document.addEventListener('DOMContentLoaded', () => {
     fetchMeetings();
     AOS.init({ duration: 800, once: true });
});