const tasks = [
  {
    id: 1,
    student: "Mai",
    taskName: "Task  1",
    status: "Waiting For Rate",
    date: "2025-08-01",
    answer: "Task Checked"
  },
  {
    id: 2,
    student: "Laren",
    taskName: "Task 10",
    status: "Task Checked ",
    date: "2025-07-28",
    answer: "The Task was Good"
  }
];

const tableBody = document.querySelector("#taskTable tbody");
const modal = document.getElementById("correctionModal");
const taskTitle = document.getElementById("taskTitle");
const taskAnswer = document.getElementById("taskAnswer");
const commentInput = document.getElementById("commentInput");
const gradeInput = document.getElementById("gradeInput");

let selectedTask = null;

function populateTable() {
  tasks.forEach(task => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${task.student}</td>
      <td>${task.taskName}</td>
      <td>${task.status}</td>
      <td>${task.date}</td>
      <td><button onclick="openModal(${task.id})">Checking</button></td>
    `;
    tableBody.appendChild(row);
  });
}

function openModal(taskId) {
  selectedTask = tasks.find(t => t.id === taskId);
  taskTitle.textContent = `Checked - ${selectedTask.taskName}`;
  taskAnswer.textContent = selectedTask.answer;
  commentInput.value = "";
  gradeInput.value = "";
  modal.style.display = "block";
  modal.style.color = "white";
}

function closeModal() {
  modal.style.display = "none";
}

function submitCorrection() {
  const comment = commentInput.value.trim();
  const grade = gradeInput.value;

  if (comment === "" || grade === "") {
    alert("Please Send The Feedback & The Rate");
    return;
  }

  alert(`Task Has Been Checked!\n\n Your Comment ${comment}\The Rate: ${grade}`);
  closeModal();
}

populateTable();

function goToHome() {
  window.location.href = "../index.html"; 
}
