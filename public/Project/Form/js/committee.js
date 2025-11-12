const answersForm = document.getElementById('answersForm');
const submitBtn = document.getElementById('submitAnswers');
const successBanner = document.getElementById('successBanner');
const emptyState = document.getElementById('emptyState');
const lastSubmission = document.getElementById('lastSubmission');
const clearResponses = document.getElementById('clearResponses');
const committeeTitle = document.getElementById('committeeTitle');

const profile = storage.read(KEYS.PROFILE, null);
const allQuestions = storage.read(KEYS.QUESTIONS, []);
let responses = storage.read(KEYS.RESPONSES, []);

if (!profile){
  // لو مفيش بيانات، ارجعي للخطوة الأولى
  window.location.href = './form.html';
}

committeeTitle.textContent = `أسئلة لجنة: ${profile.committee}`;
const committeeQs = allQuestions.filter(q=> q.committee === profile.committee);

renderLastSubmission();

if (!committeeQs.length){
  emptyState.classList.remove('hidden');
} else {
  emptyState.classList.add('hidden');
  buildForm();
}

function buildForm(){
  answersForm.innerHTML = '';
  committeeQs.forEach((q, idx)=>{
    const block = document.createElement('div');
    block.className = 'q-block';

    const title = document.createElement('div');
    title.className = 'q-title';
    title.textContent = `${idx + 1}. ${q.text}`;
    block.appendChild(title);

    let inputEl;
    if (q.type === 'short'){
      inputEl = document.createElement('input');
      inputEl.type = 'text';
      inputEl.name = q.id;
      inputEl.placeholder = 'اكتب إجابة قصيرة';
    } else if (q.type === 'long'){
      inputEl = document.createElement('textarea');
      inputEl.name = q.id;
      inputEl.placeholder = 'اكتب إجابة طويلة';
    } else if (q.type === 'mcq_single'){
      inputEl = document.createElement('div');
      q.options.forEach((opt,i)=>{
        const id = `${q.id}_${i}`;
        const wrap = document.createElement('div');
        const radio = document.createElement('input');
        radio.type = 'radio'; radio.name = q.id; radio.value = opt; radio.id = id;
        const label = document.createElement('label'); label.setAttribute('for', id); label.textContent = opt;
        wrap.append(radio, label);
        inputEl.appendChild(wrap);
      });
    } else if (q.type === 'mcq_multi'){
      inputEl = document.createElement('div');
      q.options.forEach((opt,i)=>{
        const id = `${q.id}_${i}`;
        const wrap = document.createElement('div');
        const chk = document.createElement('input');
        chk.type = 'checkbox'; chk.name = q.id; chk.value = opt; chk.id = id;
        const label = document.createElement('label'); label.setAttribute('for', id); label.textContent = opt;
        wrap.append(chk, label);
        inputEl.appendChild(wrap);
      });
    }

    block.appendChild(inputEl);
    const hint = document.createElement('div');
    hint.className = 'q-help';
    hint.textContent = hintText(q.type);
    block.appendChild(hint);
    answersForm.appendChild(block);
  });
}

function hintText(t){
  switch(t){
    case 'short': return 'حقل نص قصير.';
    case 'long': return 'حقل نص طويل.';
    case 'mcq_single': return 'اختر إجابة واحدة فقط.';
    case 'mcq_multi': return 'يمكنك اختيار أكثر من إجابة.';
    default: return '';
  }
}

submitBtn.addEventListener('click', ()=>{
  const payload = {
    timestamp: new Date().toISOString(),
    committee: profile.committee,
    profile: { fullName: profile.fullName, email: profile.email, phone: profile.phone },
    answers: {}
  };

  for (const q of committeeQs){
    if (q.type === 'short' || q.type === 'long'){
      const el = answersForm.querySelector(`[name="${q.id}"]`);
      payload.answers[q.id] = el ? el.value.trim() : '';
    } else if (q.type === 'mcq_single'){
      const sel = answersForm.querySelector(`input[name="${q.id}"]:checked`);
      payload.answers[q.id] = sel ? sel.value : '';
    } else if (q.type === 'mcq_multi'){
      const checks = Array.from(answersForm.querySelectorAll(`input[name="${q.id}"]:checked`)).map(c=>c.value);
      payload.answers[q.id] = checks;
    }
  }

  responses.push(payload);
  storage.write(KEYS.RESPONSES, responses);
  renderLastSubmission();

  successBanner.classList.remove('hidden');
  setTimeout(()=> successBanner.classList.add('hidden'), 2500);

  answersForm.reset();
});

function renderLastSubmission(){
  if (!responses.length){
    lastSubmission.textContent = 'لا يوجد بعد.';
    lastSubmission.classList.add('empty');
    return;
  }
  const last = responses[responses.length - 1];
  lastSubmission.classList.remove('empty');

  let html = `<div>التاريخ: <span class="mono">${new Date(last.timestamp).toLocaleString()}</span></div>`;
  html += `<div>اللجنة: <strong>${last.committee}</strong></div>`;
  html += `<div>الاسم: ${last.profile.fullName} — البريد: ${last.profile.email} — الهاتف: ${last.profile.phone || '-'}</div>`;
  html += '<ol>';
  const qs = storage.read(KEYS.QUESTIONS, []);
  for (const q of qs.filter(q=>q.committee===last.committee)){
    const v = last.answers[q.id];
    const val = Array.isArray(v) ? v.join('، ') : (v ?? '');
    html += `<li><strong>${escapeHtml(q.text)}:</strong> ${escapeHtml(String(val))}</li>`;
  }
  html += '</ol>';
  lastSubmission.innerHTML = html;
}

clearResponses.addEventListener('click', ()=>{
  if (!responses.length) return;
  if (confirm('حذف كل الإرسالات؟')){
    responses = [];
    storage.write(KEYS.RESPONSES, responses);
    renderLastSubmission();
  }
});

function escapeHtml(s){ return s.replace(/[&<>\"']/g, (c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
