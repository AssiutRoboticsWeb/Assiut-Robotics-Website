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
        tasks: [
          { title: "تنظيم الفروع", course: "Embedded Basics", status: "doing", deadline: "2025-08-20", corrected: true, points: 8, submission: "https://example.com/submissions/clean-repo" },
          { title: "مراجعة PRs", course: "API Fundamentals", status: "done", deadline: "2025-08-10", corrected: true, points: 10, submission: "https://example.com/submissions/review-prs" },
          { title: "تجربة API", course: "API Fundamentals", status: "doing", deadline: "2025-08-25", corrected: false, points: 0, submission: "https://example.com/submissions/api-test" },
        ],
      },
      {
        id: "m2",
        name: "مصطفى أحمد",
        role: "عضو أساسي",
        tasks: [
          { title: "member dashboard", course: "Member Dashboard", status: "doing", deadline: "2025-08-23", corrected: false, points: 3, submission: "https://example.com/submissions/member-dash" },
          { title: "زر اختيار التراك", course: "Member Dashboard", status: "done", deadline: "2025-08-12", corrected: true, points: 10, submission: "https://example.com/submissions/track-button" },
          { title: "إظهار applicants", course: "Member Dashboard", status: "blocked", deadline: "2025-08-19", corrected: false, points: 0, submission: "https://example.com/submissions/applicants" },
        ],
      },
      {
        id: "m3",
        name: "كارين مدحت",
        role: "Backend & API",
        tasks: [
          { title: "توثيق مشاكل API", course: "API Fundamentals", status: "doing", deadline: "2025-08-22", corrected: false, points: 0, submission: "https://example.com/submissions/api-issues" },
          { title: "تحسين /electric", course: "API Fundamentals", status: "blocked", deadline: "2025-08-24", corrected: false, points: 0, submission: "https://example.com/submissions/perf" },
        ],
      },
    ],
  },
  {
    id: "hardware",
    title: "Hardware",
    courseOwners: { "Sensors 101": ["م. سارة حاتم"] },
    members: [
      {
        id: "m4",
        name: "أحمد علاء",
        role: "عضو",
        tasks: [
          { title: "إعداد لوحة التجارب", course: "Sensors 101", status: "doing", deadline: "2025-08-21", corrected: false, points: 2, submission: "https://example.com/submissions/breadboard" },
          { title: "توثيق الأعطال", course: "Sensors 101", status: "done", deadline: "2025-08-05", corrected: true, points: 10, submission: "https://example.com/submissions/issues" },
        ],
      },
      {
        id: "m5",
        name: "سارة حاتم",
        role: "عضو",
        tasks: [
          { title: "اختبار المستشعرات", course: "Sensors 101", status: "blocked", deadline: "2025-08-20", corrected: false, points: 0, submission: "https://example.com/submissions/sensors" },
        ],
      },
    ],
  },
  {
    id: "software",
    title: "Software",
    courseOwners: { "Track UI": ["م. يوسف سامي"] },
    members: [
      {
        id: "m6",
        name: "يوسف سامي",
        role: "عضو",
        tasks: [
          { title: "تصميم صفحة track", course: "Track UI", status: "doing", deadline: "2025-08-19", corrected: false, points: 4, submission: "https://example.com/submissions/track-ui" },
          { title: "تحسين UI البطاقات", course: "Track UI", status: "done", deadline: "2025-08-11", corrected: true, points: 10, submission: "https://example.com/submissions/cards-ui" },
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

/** ملخّص مهام */
function summarizeTasks(tasks = []) {
  return tasks.reduce(
    (acc, t) => {
      acc.total++;
      acc[t.status] = (acc[t.status] || 0) + 1;
      if (t.status !== "done" && t.deadline) {
        const due = new Date(t.deadline);
        if (!acc.near || due < acc.nearDate) {
          acc.near = t; acc.nearDate = due;
        }
      }
      return acc;
    },
    { total: 0, done: 0, doing: 0, blocked: 0, near: null, nearDate: null }
  );
}

/** جمع كورسات تراك معين من مهام الأعضاء + courseOwners */
function collectCoursesForTrack(trackId) {
  const set = new Set();
  const tr = tracks.find(t => t.id === trackId);
  if (!tr) return [];
  tr.members.forEach(m => m.tasks.forEach(t => t.course && set.add(t.course)));
  Object.keys(tr.courseOwners || {}).forEach(c => set.add(c));
  return Array.from(set);
}

/* =============== حالة الواجهة =============== */
const state = {
  activeTrackId: tracks[0]?.id || "",
  search: "",
  status: "",           // done | doing | blocked | ''
  courseMembers: ""     // فلتر كورس عام لبطاقات الأعضاء + الافتراضي للمودال
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
      fillCourseFilterForActiveTrack(); // إعادة بناء كورسات الفلتر العام
      renderTabs();
      renderGrid();
    });
    tabs.appendChild(btn);
  });
}

/* =============== شبكة بطاقات الأعضاء =============== */
function renderGrid() {
  const grid = $("#grid");
  grid.innerHTML = "";

  const track = tracks.find((t) => t.id === state.activeTrackId);
  if (!track) { grid.innerHTML = `<div class="empty">لا يوجد تراك محدد</div>`; return; }

  // فلترة الأعضاء بالاسم والحالة + كورس عام (لو مختار)
  const members = track.members.filter((m) => {
    const byName = state.search ? m.name.includes(state.search) : true;
    const byStatus = state.status === "" ? true : m.tasks.some((t) => t.status === state.status);
    const byCourse = state.courseMembers === "" ? true : m.tasks.some((t) => t.course === state.courseMembers);
    return byName && byStatus && byCourse;
  });

  if (!members.length) {
    grid.innerHTML = `<div class="empty">لا توجد نتائج مطابقة للبحث/الفلاتر</div>`;
    return;
  }

  members.forEach((m) => {
    const card = document.createElement("article");
    card.className = "card";

    // ملخص مبني إمّا على كل المهام أو (اختياريًا) ممكن نظهر sum للCourse المختار فقط
    const tasksForSummary = state.courseMembers
      ? m.tasks.filter(t => t.course === state.courseMembers)
      : m.tasks;

    const sum = summarizeTasks(tasksForSummary);
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
        <span class="badge">تاسكات: ${sum.total}</span>
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

/* =============== المودال — فلترة «التاسكات» بالكورس هنا أيضًا =============== */
function openModal(member, track) {
  closeModal();

  // قائمة كورسات هذا التراك / العضو
  const trackCourses = collectCoursesForTrack(track.id);
  const memberCourses = Array.from(new Set(member.tasks.map(t => t.course).filter(Boolean)));
  const courses = trackCourses.length ? trackCourses : memberCourses;

  // فلتر مبدئي للمودال = Course Filter العام إن وُجد
  let courseFilter = state.courseMembers || "";

  const root = document.createElement("div");
  root.className = "modal-wrap";
  root.id = "memberModal";

  const renderModalBody = () => {
    const tasksFiltered = courseFilter ? member.tasks.filter(t => t.course === courseFilter) : member.tasks;
    const sum = summarizeTasks(tasksFiltered);

    const tableRows = tasksFiltered.length
      ? tasksFiltered.map((t) => {
        const pillClass = t.status === "done" ? "status-done" : t.status === "blocked" ? "status-blocked" : "status-doing";
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

    const owners = courseFilter ? (track.courseOwners?.[courseFilter] || []) : [];
    const ownersBar = courseFilter
      ? `<div class="course-owners">
           <span class="course-label">مسؤولو مادة: <b>${courseFilter}</b></span>
           ${owners.length ? owners.map(o => `<span class="course-pill">${o}</span>`).join("") : `<span class="course-pill">لم يُحدّد</span>`}
         </div>` : "";

    return `
      <div class="member-line">
        <div class="avatar">${initials(member.name)}</div>
        <div>
          <div class="who">${member.name}</div>
          <div class="role">${member.role || ""}</div>
        </div>
      </div>

      <div class="modal-controls">
        <div class="field">
          <select id="modalCourseFilter" aria-label="فلتر الكورس (داخل المودال)">
            <option value="">كل الكورسات</option>
            ${courses.map(c => `<option value="${c}" ${c === courseFilter ? "selected" : ""}>${c}</option>`).join("")}
          </select>
        </div>
      </div>

      ${ownersBar}

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
    `;
  };

  root.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-label="تفاصيل العضو">
      <header>
        <h2>تفاصيل العضو — ${track.title}</h2>
        <button class="close" aria-label="إغلاق">×</button>
      </header>
      <div class="body" id="modalBody">${renderModalBody()}</div>
    </div>
  `;

  root.addEventListener("click", (e) => { if (e.target === root) closeModal(); });
  root.querySelector(".close").addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); }, { once: true });

  const rebindModalFilter = () => {
    const sel = $("#modalCourseFilter", root);
    sel?.addEventListener("change", (e) => {
      courseFilter = e.target.value;
      $("#modalBody", root).innerHTML = renderModalBody();
      rebindModalFilter();
    });
  };

  $("#modalRoot").appendChild(root);
  rebindModalFilter();
}
function closeModal() { const m = $("#memberModal"); if (m) m.remove(); }

/* =============== فلاتر عامة =============== */
function bindFilters() {
  $("#searchInput").addEventListener("input", (e) => { state.search = e.target.value.trim(); renderGrid(); });
  $("#statusFilter").addEventListener("change", (e) => { state.status = e.target.value; renderGrid(); });
  $("#courseFilter").addEventListener("change", (e) => {
    state.courseMembers = e.target.value;
    renderGrid();
  });
}

/* =============== تهيئة قائمة كورسات التراك النشط =============== */
function fillCourseFilterForActiveTrack() {
  const select = $("#courseFilter");
  select.innerHTML = "";
  // إعادة ضبط الحالة
  state.courseMembers = "";

  // بناء الخيارات
  const makeOpt = (value, text) => {
    const opt = document.createElement("option");
    opt.value = value; opt.textContent = text;
    return opt;
  };

  select.appendChild(makeOpt("", "كل الكورسات"));

  const courses = collectCoursesForTrack(state.activeTrackId);
  courses.forEach(c => select.appendChild(makeOpt(c, c)));
}

/* =============== بدء التشغيل =============== */
function init() {
  renderTabs();
  fillCourseFilterForActiveTrack(); // لازم تتنادى قبل renderGrid عشان القيمة تظهر
  renderGrid();
  bindFilters();
}
document.addEventListener("DOMContentLoaded", init);
