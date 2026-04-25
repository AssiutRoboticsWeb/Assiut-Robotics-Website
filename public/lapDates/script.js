// Add this at the beginning of your script
function initTheme() {
     const theme = localStorage.getItem('theme') || 'light';
     document.documentElement.setAttribute('data-theme', theme);
     updateThemeIcon(theme);
}

function toggleTheme() {
     const currentTheme = document.documentElement.getAttribute('data-theme');
     const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

     document.documentElement.setAttribute('data-theme', newTheme);
     localStorage.setItem('theme', newTheme);
     updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
     const icon = document.querySelector('.theme-toggle i');
     icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

document.getElementById('themeToggle').addEventListener('click', toggleTheme);

// إنشاء مصفوفة الساعات
const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 8 AM to 6 PM

// دالة لتنسيق التاريخ
function formatDate(date) {
     return new Date(date).toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
     });
}

// دالة لتنسيق الوقت
function formatTime(hour) {
     const period = hour >= 12 ? 'PM' : 'AM';
     const displayHour = hour > 12 ? hour - 12 : hour;
     return `${displayHour}:00 ${period}`;
}

function formatDateTime(dateString) {
     const date = new Date(dateString);
     return date.toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
     });
}

async function fetchAndDisplayAppointments() {
     try {
          const token = localStorage.getItem('token');
          const response = await fetch(APIConfig.getLapDatesEndpoint(), {
               headers: {
                    'Authorization': `Bearer ${token}`
               }
          });
          const data = await response.json();
          console.log(data);


          if (data.message === 'success') {
               createCalendar(data.lapDates);
          }
     } catch (error) {
          console.error('Error fetching appointments:', error);
     }
}

function createCalendar(appointments) {
     const headerRow = document.querySelector('.calendar thead tr');
     const today = new Date();
     const days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          return date;
     });

     days.forEach((day, index) => {
          const th = document.createElement('th');
          th.textContent = formatDate(day);

          // Highlight today
          if (day.getDate() === today.getDate() &&
               day.getMonth() === today.getMonth()) {
               th.className = 'today';
          }
          headerRow.appendChild(th);
     });

     const tbody = document.querySelector('.calendar tbody');
     hours.forEach(hour => {
          const row = document.createElement('tr');
          const timeCell = document.createElement('td');
          timeCell.className = 'time-slot';
          timeCell.textContent = formatTime(hour);
          row.appendChild(timeCell);

          days.forEach((day, dayIndex) => {
               const cell = document.createElement('td');

               // Add today-column class for current day
               if (day.getDate() === today.getDate() &&
                    day.getMonth() === today.getMonth()) {
                    cell.className = 'today-column';
               }

               // Find appointments for this time and day
               appointments.forEach((apt, index) => {
                    const startDate = new Date(apt.startDate);
                    const endDate = new Date(apt.endDate);
                    if (startDate.getDate() === day.getDate() &&
                         startDate.getMonth() === day.getMonth() &&
                         // startDate.getHours() <= hour &&
                         // endDate.getHours() > hour) {
                         startDate.getUTCHours() <= hour &&
                         endDate.getUTCHours() >= hour) {

                         const appointment = document.createElement('div');
                         appointment.className = 'appointment';
                         appointment.style.animationDelay = `${index * 0.1}s`;
                         appointment.textContent = apt.member.name;
                         appointment.onclick = () => showMemberDetails(apt.member, apt);
                         cell.appendChild(appointment);
                    }
               });

               row.appendChild(cell);
          });

          tbody.appendChild(row);
     });
}

function showMemberDetails(member, appointment) {
     const popup = document.getElementById('popup');
     const memberInfo = document.getElementById('memberInfo');
     const appointmentInfo = document.getElementById('appointmentInfo');

     memberInfo.innerHTML = `
                <img src="${member.avatar}" alt="${member.name}" class="member-avatar">
                <div class="member-details">
                    <h3>${member.name}</h3>
                    <p><strong>Committee:</strong> ${member.committee}</p>
                    <p><strong>Email:</strong> ${member.email}</p>
                    <p><strong>Phone:</strong> ${member.phoneNumber}</p>
                </div>
            `;

     appointmentInfo.innerHTML = `
                <div class="appointment-details">
                    <h4>Appointment Details</h4>
                    <p><strong>Start:</strong> ${formatDateTime(appointment.startDate)}</p>
                    <p><strong>End:</strong> ${formatDateTime(appointment.endDate)}</p>
                    <p><strong>Duration:</strong> ${calculateDuration(appointment.startDate, appointment.endDate)}</p>
                </div>
            `;

     popup.style.display = 'flex';
     setTimeout(() => {
          popup.classList.add('active');
     }, 10);
}

function calculateDuration(start, end) {
     const startTime = new Date(start);
     const endTime = new Date(end);
     const diffHours = (endTime - startTime) / (1000 * 60 * 60);
     return `${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
}

function closePopup() {
     const popup = document.getElementById('popup');
     popup.classList.remove('active');
     setTimeout(() => {
          popup.style.display = 'none';
     }, 300);
}

window.addEventListener('DOMContentLoaded', () => {
     // Initialize theme on page load
     initTheme();
     fetchAndDisplayAppointments();
});