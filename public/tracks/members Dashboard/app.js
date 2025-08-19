/* =========================
   البيانات: التراكات + مسؤولي المواد داخل كل تراك
   ========================= */
const tracks = [
  {
    id: "electric",
    title: "Electric",
    courseOwners: {
      "Embedded Basics": ["د. مروان عبد المنعم", "م. رودينا رفعت"],
      "API Fundamentals": ["م. كارين مدحت"],
      "Member Dashboard": ["م. مصطفى أحمد"],
      "Sensors 101": ["م. سارة حاتم"],
      "Track UI": ["م. يوسف سامي"]
    },
    members: [
      {
        id: "m1",
        name: "فدية أحمد",
        role: "قائدة التراك",
        // الطالب ممكن يكون عنده أكتر من كورس عبر المهام
        tasks: [
          { title: "تنظيف الريبو وتنظيم الفروع", course: "Embedded Basics", status: "doing", deadline: "2025-08-20", corrected: true, points: 8, submission: "https://example.com/submissions/clean-repo" },
          { title: "مراجعة PRs المعلّقة", course: "API Fundamentals", status: "done", deadline: "2025-08-10", corrected: true, points: 10, submission: "https://example.com/submissions/review-prs" },
          { title: "تجربة API وتحديد التعديلات المطلوبة", course: "API Fundamentals", status: "doing", deadline: "2025-08-25", corrected: false, points: 0, submission: "https://example.com/submissions/api-test" },
        ],
      },
      {
        id: "m2",
        name: "مصطفى أحمد",
        role: "عضو أساسي",
        tasks: [
          { title: "بناء member dashboard", course: "Member Dashboard", status: "doing", deadline: "2025-08-23", corrected: false, points: 3, submission: "https://example.com/submissions/member-dash" },
          { title: "زر اختيار التراك + إظهار المتاح", course: "Member Dashboard", status: "done", deadline: "2025-08-12", corrected: true, points: 10, submission: "https://example.com/submissions/track-button" },
          { title: "إظهار applicants بالأعلى", course: "Member Dashboard", status: "blocked", deadline: "2025-08-19", corrected: false, points: 0, submission: "https://example.com/submissions/applicants" },
        ],
      },
      {
        id: "m3",
        name: "كارين مدحت",
        role: "Backend & API",
        tasks: [
          { title: "تجربة الـ API وتوثيق المشاكل", course: "API Fundamentals", status: "doing", deadline: "2025-08-22", corrected: false, points: 0, submission: "https://example.com/submissions/api-issues" },
          { title: "تحسين الأداء في endpoint /electric", course: "API Fundamentals", status: "blocked", deadline: "2025-08-24", corrected: false, points: 0, submission: "https://example.com/submissions/perf" },
        ],
      },
    ],
  },
  {
    id: "hardware",
    title: "Hardware",
    courseOwners: {
      "Sensors 101": ["م. سارة حاتم"]
    },
    members: [
      {
        id: "m4",
        name: "أحمد علاء",
        role: "عضو",
        tasks: [
          { title: "إعداد لوحة التجارب", course: "Sensors 101", status: "doing", deadline: "2025-08-21", corrected: false, points: 2, submission: "https://example.com/submissions/breadboard" },
          { title: "توثيق الأعطال المتكررة", course: "Sensors 101", status: "done", deadline: "2025-08-05", corrected: true, points: 10, submission: "https://example.com/submissions/issues" },
        ],
      },
      {
        id: "m5",
        name: "سارة حاتم",
        role: "عضو",
        tasks: [
          { title: "اختبار وحدات الاستشعار", course: "Sensors 101", status: "blocked", deadline: "2025-08-20", corrected: false, points: 0, submission: "https://example.com/submissions/sensors" },
        ],
      },
    ],
  },
  {
    id: "software",
    title: "Software",
    courseOwners: {
      "Track UI": ["م. يوسف سامي"]
    },
    members: [
      {
        id: "m6",
        name: "يوسف سامي",
        role: "عضو",
        tasks: [
          { title: "تصميم صفحة track", course: "Track UI", status: "doing", deadline: "2025-08-19", corrected: false, points: 4, submission: "https://example.com/submissions/track-ui" },
          { title: "تحسين UI بطاقات الأعضاء", course: "Track UI", status: "done", deadline: "2025-08-11", corrected: true, points: 10, submission: "https://example.com/submissions/cards-ui" },
        ],
      },
    ],
  },
];

/* =============== أدوات مساعدة =============== */
const $ = (sel, root = document) => root.querySelector(sel);
function initials(name = "") {
  const parts = name.trim().split(/\s+/);
  const two = (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
  return two || (parts[0]?.slice(0, 2) || "؟");
}
function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("ar-EG", { year: "numeric", month: "short", day: "numeric" });
}

/** ملخّص مهام مع مراعاة فلتر الكورس */
function summarizeTasks(tasks = [], courseFilter = "") {
  const list = courseFilter ? tasks.filter(t => t.course === courseFilter) : tasks;
  return list.reduce(
    (acc, t) => {
      acc.total++;
      acc[t.status] = (acc[t.status] || 0) + 1;
      if (t.status !== "done" && t.deadline) {
        const due = new Date(t.deadline);
        if (!acc.near || due < acc.nearDate) {
          acc.near = t;
          acc.nearDate = due;
        }
      }
      return acc;
    },
    { total: 0, done: 0, doing: 0, blocked: 0, near: null, nearDate: null }
  );
}

/** جمع كل الكورسات من كل المهام */
function collectCourses() {
  const set = new Set();
  tracks.forEach(tr => tr.members.forEach(m => m.tasks.forEach(t => set.add(t.course))));
  return Array.from(set);
}

/* =============== حالة الواجهة =============== */
const state = {
  activeTrackId: tracks[0]?.id || "",
  search: "",
  status: "",   // done | doing | blocked | ''
  course: ""    // اسم الكورس
};

/* =============== تبويبات التراكات =============== */
function renderTabs() {
  const tabs = $("#tabs");
  tabs.innerHTML = "";
  tracks.forEach((tr) => {
    const btn = document.createElement("button");
    btn.className = "tab" + (tr.id === state.activeTrackId ? " active" : "");
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", tr.id === state.activeTrackId ? "true" : "false");
    btn.innerHTML = `<span>${tr.title}</span><span class="count">${tr.members.length}</span>`;
    btn.addEventListener("click", () => {
      state.activeTrackId = tr.id;
      renderTabs();
      renderGrid();
      renderCourseBar(); // تحديث شريط المسؤولين إذا كان فيه فلتر كورس
    });
    tabs.appendChild(btn);
  });
}

/* =============== شريط مسؤولي المادة =============== */
function renderCourseBar() {
  const bar = $("#courseBar");
  if (!state.course) { bar.hidden = true; bar.innerHTML = ""; return; }
  const track = tracks.find(t => t.id === state.activeTrackId);
  const owners = track?.courseOwners?.[state.course] || [];
  bar.hidden = false;
  bar.innerHTML = `
    <span class="course-label">مسؤولو مادة: <b>${state.course}</b></span>
    ${owners.length ? owners.map(o => `<span class="course-pill">${o}</span>`).join("") : `<span class="course-pill">لم يُحدّد</span>`}
  `;
}

/* =============== شبكة بطاقات الأعضاء =============== */
function renderGrid() {
  renderCourseBar();

  const grid = $("#grid");
  grid.innerHTML = "";

  const track = tracks.find((t) => t.id === state.activeTrackId);
  if (!track) { grid.innerHTML = `<div class="empty">لا يوجد تراك محدد</div>`; return; }

  // فلترة الأعضاء بالاسم والحالة والكورس
  const members = track.members.filter((m) => {
    const byName = state.search ? m.name.includes(state.search) : true;
    const byStatus = state.status === "" ? true : m.tasks.some((t) => t.status === state.status);
    const byCourse = state.course === "" ? true : m.tasks.some((t) => t.course === state.course);
    return byName && byStatus && byCourse;
  });

  if (!members.length) {
    grid.innerHTML = `<div class="empty">لا توجد نتائج مطابقة للبحث/الفلاتر</div>`;
    return;
  }

  members.forEach((m) => {
    const card = document.createElement("article");
    card.className = "card";

    const sum = summarizeTasks(m.tasks, state.course);
    const near = sum.near;

    card.innerHTML = `
      <div class="head">
        <div class="avatar" aria-hidden="true">${initials(m.name)}</div>
        <div>
          <button class="name-btn" aria-label="تفاصيل ${m.name}">${m.name}</button>
          <div class="role">${m.role || ""}</div>
        </div>
      </div>

      <div class="meta">
        <span class="badge">تاسكات${state.course ? ` (${state.course})` : ""}: ${sum.total}</span>
        <span class="badge ok">تم: ${sum.done}</span>
        <span class="badge warn">قيد التنفيذ: ${sum.doing}</span>
        <span class="badge danger">متوقف: ${sum.blocked}</span>
        ${near ? `<span class="badge deadline">أقرب ديدلاين: ${formatDate(near.deadline)}</span>` : ""}
      </div>

      <div class="actions">
        <button class="link open-details" aria-label="فتح تفاصيل ${m.name}">تفاصيل العضو</button>
      </div>
    `;

    card.querySelector(".name-btn").addEventListener("click", () => openModal(m, track));
    card.querySelector(".open-details").addEventListener("click", () => openModal(m, track));

    grid.appendChild(card);
  });
}

/* =============== المودال =============== */
function openModal(member, track) {
  closeModal();

  const root = document.createElement("div");
  root.className = "modal-wrap";
  root.id = "memberModal";

  const filteredTasks = state.course ? member.tasks.filter(t => t.course === state.course) : member.tasks;
  const sum = summarizeTasks(member.tasks, state.course);

  const tableRows = filteredTasks.length
    ? filteredTasks.map((t) => {
      const pillClass =
        t.status === "done" ? "status-done" : t.status === "blocked" ? "status-blocked" : "status-doing";
      const statusLabel = t.status === "done" ? "منتهي" : t.status === "doing" ? "قيد التنفيذ" : "متوقف";
      const corr = t.corrected ? "✓ تم التصحيح" : "بانتظار";
      const pts = Number.isFinite(t.points) ? t.points : 0;
      const date = formatDate(t.deadline);
      return `
          <tr>
            <td>${t.title}</td>
            <td>${t.course || "-"}</td>
            <td><span class="status-pill ${pillClass}">${statusLabel}</span></td>
            <td>${date}</td>
            <td>${corr}</td>
            <td>${pts}</td>
            <td><a href="${t.submission}" target="_blank" rel="noopener">
              <button class="submission-btn" aria-label="فتح تسليم المهمة">رابط التسليم</button>
            </a></td>
          </tr>`;
    }).join("")
    : `<tr><td colspan="7" class="empty">لا توجد تاسكات</td></tr>`;

  root.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-label="تفاصيل العضو">
      <header>
        <h2>تفاصيل العضو — ${track.title}${state.course ? ` — ${state.course}` : ""}</h2>
        <button class="close" aria-label="إغلاق">×</button>
      </header>
      <div class="body">
        <div class="member-line">
          <div class="avatar">${initials(member.name)}</div>
          <div>
            <div class="who">${member.name}</div>
            <div class="role">${member.role || ""}</div>
          </div>
        </div>

        <div class="kpis">
          <div class="kpi">إجمالي: <span class="num">${sum.total}</span></div>
          <div class="kpi">تم: <span class="num">${sum.done}</span></div>
          <div class="kpi">قيد التنفيذ: <span class="num">${sum.doing}</span></div>
          <div class="kpi">متوقف: <span class="num">${sum.blocked}</span></div>
          ${sum.near ? `<div class="kpi">أقرب ديدلاين: <span class="num">${formatDate(sum.near.deadline)}</span></div>` : ""}
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>المهمة</th>
                <th>الكورس</th>
                <th>الحالة</th>
                <th>الديدلاين</th>
                <th>التصحيح</th>
                <th>النقاط</th>
                <th>التسليم</th>
              </tr>
            </thead>
            <tbody>${tableRows}</tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  root.addEventListener("click", (e) => { if (e.target === root) closeModal(); });
  root.querySelector(".close").addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); }, { once: true });

  $("#modalRoot").appendChild(root);
}
function closeModal() { const m = $("#memberModal"); if (m) m.remove(); }

/* =============== فلاتر =============== */
function bindFilters() {
  $("#searchInput").addEventListener("input", (e) => { state.search = e.target.value.trim(); renderGrid(); });
  $("#statusFilter").addEventListener("change", (e) => { state.status = e.target.value; renderGrid(); });
  $("#courseFilter").addEventListener("change", (e) => { state.course = e.target.value; renderCourseBar(); renderGrid(); });
}

/* =============== ملء قائمة الكورسات =============== */
function fillCourseFilter() {
  const select = $("#courseFilter");
  const courses = collectCourses();
  courses.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c; opt.textContent = c;
    select.appendChild(opt);
  });
}

/* =============== بدء التشغيل =============== */
function init() {
  renderTabs();
  fillCourseFilter();
  renderGrid();
  bindFilters();
}
document.addEventListener("DOMContentLoaded", init);
