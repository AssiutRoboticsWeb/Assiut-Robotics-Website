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
      <td>
        <button class="rateBtn" onclick="openModal(${task.id})">تصحيح</button>
        <button class="submitBtn" onclick="openSubmitModal(${task.id})">تسليم</button>
      </td>
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

  alert(`Task Has Been Checked!\n\nYour Comment: ${comment}\nThe Rate: ${grade}`);
  closeModal();
}

populateTable();


// === Submission Modal ===
const submitModal = document.getElementById("submitModal");
const submissionForm = document.getElementById("submissionForm");
const trackNameInput = document.getElementById("trackName");
const courseNameInput = document.getElementById("courseName");
const taskNameInput = document.getElementById("taskNameInput");
const fileInput = document.getElementById("fileInput");

function ensureUserId() {
  let uid = localStorage.getItem("userId");
  if (!uid) {
    uid = "user-" + Math.random().toString(36).slice(2, 10);
    localStorage.setItem("userId", uid);
  }
  return uid;
}

function openSubmitModal(taskId) {
  selectedTask = tasks.find(t => t.id === taskId) || null;
  if (selectedTask) {
    taskNameInput.value = selectedTask.taskName;
  }
  submitModal.style.display = "block";
}

function closeSubmitModal() {
  submitModal.style.display = "none";
  submissionForm.reset();
}

submissionForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const uid = ensureUserId();
  const file = fileInput.files[0];
  if (!file) {
    alert("من فضلك ارفع ملف أولاً.");
    return;
  }

  const submission = {
    userId: uid,
    uploadedFile: {
      name: file.name,
      type: file.type,
      size: file.size
    },
    submissionDate: new Date().toISOString(),
    trackName: trackNameInput.value.trim(),
    courseName: courseNameInput.value.trim(),
    taskName: taskNameInput.value.trim()
  };

  const saved = JSON.parse(localStorage.getItem("submissions") || "[]");
  saved.push(submission);
  localStorage.setItem("submissions", JSON.stringify(saved));

  console.log("✅ Submission Object:", submission);
  alert("تم إرسال المهمة بنجاح!");
  closeSubmitModal();
});

window.addEventListener("click", (e) => {
  if (e.target === submitModal) closeSubmitModal();
  if (e.target === modal) closeModal();
});

function goToPage() {
  window.location.href = "../index.html"; 
}