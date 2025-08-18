/* =========================
   بيانات تجريبية (يمكن ربط API لاحقًا)
   ========================= */
const tracks = [
  {
    id: "electric",
    title: "Electric",
    members: [
      {
        id: "m1",
        name: "فدية أحمد",
        role: "قائدة التراك",
        tasks: [
          { title: "تنظيف الريبو وتنظيم الفروع", status: "doing", deadline: "2025-08-20" },
          { title: "مراجعة PRs المعلّقة", status: "done", deadline: "2025-08-10" },
          { title: "تجربة API وتحديد التعديلات المطلوبة", status: "doing", deadline: "2025-08-25" },
        ],
      },
      {
        id: "m2",
        name: "مصطفى أحمد",
        role: "عضو أساسي",
        tasks: [
          { title: "بناء member dashboard", status: "doing", deadline: "2025-08-23" },
          { title: "زر اختيار التراك + إظهار المتاح", status: "done", deadline: "2025-08-12" },
          { title: "إظهار applicants بالأعلى", status: "blocked", deadline: "2025-08-19" },
        ],
      },
      {
        id: "m3",
        name: "كارين مدحت",
        role: "Backend & API",
        tasks: [
          { title: "تجربة الـ API وتوثيق المشاكل", status: "doing", deadline: "2025-08-22" },
          { title: "تحسين الأداء في endpoint /electric", status: "blocked", deadline: "2025-08-24" },
        ],
      },
    ],
  },
  {
    id: "hardware",
    title: "Hardware",
    members: [
      {
        id: "m4",
        name: "أحمد علاء",
        role: "عضو",
        tasks: [
          { title: "إعداد لوحة التجارب", status: "doing", deadline: "2025-08-21" },
          { title: "توثيق الأعطال المتكررة", status: "done", deadline: "2025-08-05" },
        ],
      },
      {
        id: "m5",
        name: "سارة حاتم",
        role: "عضو",
        tasks: [
          { title: "اختبار وحدات الاستشعار", status: "blocked", deadline: "2025-08-20" },
        ],
      },
    ],
  },
  {
    id: "software",
    title: "Software",
    members: [
      {
        id: "m6",
        name: "يوسف سامي",
        role: "عضو",
        tasks: [
          { title: "تصميم صفحة track", status: "doing", deadline: "2025-08-19" },
          { title: "تحسين UI بطاقات الأعضاء", status: "done", deadline: "2025-08-11" },
        ],
      },
    ],
  },
];

/* =============== أدوات مساعدة =============== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

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

/** تجمع ملخص المهام + أقرب ديدلاين (للمهام غير المنتهية) */
function summarizeTasks(tasks = []) {
  return tasks.reduce(
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

/* =============== حالة الواجهة =============== */
const state = {
  activeTrackId: tracks[0]?.id || "",
  search: "",
  status: "", // done | doing | blocked | ''
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
    });
    tabs.appendChild(btn);
  });
}

/* =============== شبكة بطاقات الأعضاء =============== */
function renderGrid() {
  const grid = $("#grid");
  grid.innerHTML = "";

  const track = tracks.find((t) => t.id === state.activeTrackId);
  if (!track) {
    grid.innerHTML = `<div class="empty">لا يوجد تراك محدد</div>`;
    return;
  }

  // فلترة الأعضاء بالبحث والحالة
  const members = track.members.filter((m) => {
    const byName = state.search ? m.name.includes(state.search) : true;
    const byStatus =
      state.status === ""
        ? true
        : m.tasks.some((t) => t.status === state.status);
    return byName && byStatus;
  });

  if (!members.length) {
    grid.innerHTML = `<div class="empty">لا توجد نتائج مطابقة للبحث/الفلتر</div>`;
    return;
  }

  members.forEach((m) => {
    const card = document.createElement("article");
    card.className = "card";

    const sum = summarizeTasks(m.tasks);
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

    // الضغط على الاسم أو زر التفاصيل يفتح المودال
    card.querySelector(".name-btn").addEventListener("click", () => openModal(m, track));
    card.querySelector(".open-details").addEventListener("click", () => openModal(m, track));

    grid.appendChild(card);
  });
}

/* =============== المودال =============== */
function openModal(member, track) {
  closeModal(); // تأمين عدم تكرار مودال مفتوح

  const root = document.createElement("div");
  root.className = "modal-wrap";
  root.id = "memberModal";

  const sum = summarizeTasks(member.tasks);

  const tableRows =
    member.tasks?.length
      ? member.tasks
        .map((t) => {
          const pillClass =
            t.status === "done"
              ? "status-done"
              : t.status === "blocked"
                ? "status-blocked"
                : "status-doing";
          const statusLabel =
            t.status === "done" ? "منتهي" : t.status === "doing" ? "قيد التنفيذ" : "متوقف";
          return `
            <tr>
              <td>${t.title}</td>
              <td><span class="status-pill ${pillClass}">${statusLabel}</span></td>
              <td>${formatDate(t.deadline)}</td>
            </tr>`;
        })
        .join("")
      : `<tr><td colspan="3" class="empty">لا توجد تاسكات</td></tr>`;

  root.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-label="تفاصيل العضو">
      <header>
        <h2>تفاصيل العضو — ${track.title}</h2>
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
          ${sum.near
      ? `<div class="kpi">أقرب ديدلاين: <span class="num">${formatDate(
        sum.near.deadline
      )}</span></div>`
      : ""
    }
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>المهمة</th>
                <th>الحالة</th>
                <th>الديدلاين</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  // إغلاق بالضغط خارج الصندوق
  root.addEventListener("click", (e) => {
    if (e.target === root) closeModal();
  });

  // زر ×
  root.querySelector(".close").addEventListener("click", closeModal);

  // ESC
  const onEsc = (e) => { if (e.key === "Escape") closeModal(); };
  document.addEventListener("keydown", onEsc, { once: true });

  $("#modalRoot").appendChild(root);
}

function closeModal() {
  const m = $("#memberModal");
  if (m) m.remove();
}

/* =============== البحث والفلاتر =============== */
function bindFilters() {
  $("#searchInput").addEventListener("input", (e) => {
    state.search = e.target.value.trim();
    renderGrid();
  });
  $("#statusFilter").addEventListener("change", (e) => {
    state.status = e.target.value;
    renderGrid();
  });
}

/* =============== بدء التشغيل =============== */
function init() {
  renderTabs();
  renderGrid();
  bindFilters();
}

document.addEventListener("DOMContentLoaded", init);
