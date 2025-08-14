const tasks = [
  { id: 1, student: "Mai", taskName: "Task 1", courseName: "Frontend 101", trackName: "Web", status: "Waiting For Rate", date: "2025-08-01", answer: "Task Checked" },
  { id: 2, student: "Laren", taskName: "Task 10", courseName: "Frontend 201", trackName: "Web", status: "Task Checked", date: "2025-07-28", answer: "The Task was Good" }
];

const tableBody    = document.querySelector("#taskTable tbody");
const correctionMd = document.getElementById("correctionModal");

const taskTitle    = document.getElementById("taskTitle");
const taskAnswer   = document.getElementById("taskAnswer");
const commentInput = document.getElementById("commentInput");
const gradeInput   = document.getElementById("gradeInput");

let selectedTask = null;

function populateTable() {
  tableBody.innerHTML = "";
  tasks.forEach(task => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td data-label="Person">${task.student}</td>
      <td data-label="Task">${task.taskName}</td>
      <td data-label="Course">${task.courseName}</td>
      <td data-label="Track">${task.trackName}</td>
      <td data-label="State">${task.status}</td>
      <td data-label="Date">${task.date}</td>
      <td data-label="Actions">
        <div class="actions">
          <button onclick="openCorrectionModal(${task.id})">Checking</button>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}
populateTable();

function openCorrectionModal(taskId) {
  selectedTask = tasks.find(t => t.id === taskId);
  if (!selectedTask) return;

  taskTitle.textContent = `Checked - ${selectedTask.taskName}`;
  taskAnswer.textContent = selectedTask.answer || "No answer yet.";
  commentInput.value = "";
  gradeInput.value = "";
  openModal("correctionModal");
}

function submitCorrection() {
  const comment = commentInput.value.trim();
  const grade = gradeInput.value;

  if (!comment || grade === "") {
    alert("Please Send The Feedback & The Rate");
    return;
  }

  alert(`Task Has Been Checked!\n\nYour Comment: ${comment}\nThe Rate: ${grade}`);
  closeModal("correctionModal");
}

function openModal(id) {
  const el = document.getElementById(id);
  el.style.display = "block";
  el.setAttribute("aria-hidden", "false");
}
function closeModal(id) {
  const el = document.getElementById(id);
  el.style.display = "none";
  el.setAttribute("aria-hidden", "true");
}

window.addEventListener('click', (e) => {
  if (e.target === correctionMd) closeModal('correctionModal');
});

function goToHome() {
  window.location.href = "../index.html";
}
