const qForm = document.getElementById('questionForm');
const qText = document.getElementById('qText');
const qType = document.getElementById('qType');
const qCommittee = document.getElementById('qCommittee');
const optionsBlock = document.getElementById('optionsBlock');
const optionsList = document.getElementById('optionsList');
const addOptionBtn = document.getElementById('addOption');
const questionsList = document.getElementById('questionsList');
const questionsEmpty = document.getElementById('questionsEmpty');
const clearAllBtn = document.getElementById('clearAll');
const filterCommittee = document.getElementById('filterCommittee');

let questions = storage.read(KEYS.QUESTIONS, []);

// تعبئة القوائم باللجان
function fillCommittees(select, withAll=false){
  if(!select) return;
  select.innerHTML = '';
  if (withAll){
    const optAll = document.createElement('option');
    optAll.value = '__all__'; optAll.textContent = 'كل اللجان';
    select.appendChild(optAll);
  }
  COMMITTEES.forEach(c=>{
    const o = document.createElement('option');
    o.value = c; o.textContent = c;
    select.appendChild(o);
  });
}
fillCommittees(qCommittee);
fillCommittees(filterCommittee, true);

renderQuestions();

qType.addEventListener('change', ()=>{
  const needsOptions = ['mcq_single','mcq_multi'].includes(qType.value);
  optionsBlock.classList.toggle('hidden', !needsOptions);
});
addOptionBtn.addEventListener('click', ()=> addOptionRow());

qForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const text = qText.value.trim();
  if (!text) return qText.focus();

  const type = qType.value;
  const committee = qCommittee.value || COMMITTEES[0];
  let options = [];
  if (['mcq_single','mcq_multi'].includes(type)){
    options = Array.from(optionsList.querySelectorAll('input[type="text"]'))
      .map(i=>i.value.trim()).filter(Boolean);
    if (options.length < 2) return alert('أضف خيارين على الأقل.');
  }

  const model = { id: uid(), text, type, options, committee };
  questions.push(model);
  storage.write(KEYS.QUESTIONS, questions);

  qForm.reset();
  optionsList.innerHTML = '';
  optionsBlock.classList.add('hidden');
  renderQuestions();
});

clearAllBtn.addEventListener('click', ()=>{
  if (!questions.length) return;
  if (confirm('هل تريد حذف كل الأسئلة؟')){
    questions = [];
    storage.write(KEYS.QUESTIONS, questions);
    renderQuestions();
  }
});

filterCommittee.addEventListener('change', renderQuestions);

function addOptionRow(value=''){
  const row = document.createElement('div');
  row.className = 'option-row';
  row.innerHTML = `
    <input type="text" placeholder="اكتب خيارًا" value="${value}" />
    <button type="button" class="btn danger outline" aria-label="حذف">حذف</button>
  `;
  row.querySelector('button').addEventListener('click', ()=> row.remove());
  optionsList.appendChild(row);
}

function renderQuestions(){
  const filterVal = filterCommittee?.value || '__all__';
  questionsList.innerHTML = '';
  const list = (filterVal==='__all__') ? questions : questions.filter(q=>q.committee===filterVal);

  if (!list.length){
    questionsEmpty.classList.remove('hidden');
    return;
  }
  questionsEmpty.classList.add('hidden');

  list.forEach((q)=>{
    const li = document.createElement('li');
    li.className = 'q-item';
    li.innerHTML = `
      <div class="q-text">${escapeHtml(q.text)}</div>
      <div class="meta">
        <span>نوع: ${typeLabel(q.type)}</span>
        <span>لجنة: ${q.committee}</span>
        <span class="mono">#${q.id}</span>
      </div>
      <div class="row">
        <button class="btn" data-action="edit">تعديل</button>
        <button class="btn danger outline" data-action="delete">حذف</button>
      </div>
    `;
    li.querySelector('[data-action="delete"]').addEventListener('click', ()=>{
      if (confirm('حذف هذا السؤال؟')){
        questions = questions.filter(x=>x.id!==q.id);
        storage.write(KEYS.QUESTIONS, questions);
        renderQuestions();
      }
    });
    li.querySelector('[data-action="edit"]').addEventListener('click', ()=> editQuestion(q));
    questionsList.appendChild(li);
  });
}

function editQuestion(q){
  const newText = prompt('عدل نص السؤال:', q.text);
  if (newText===null) return;
  const trimmed = newText.trim();
  if (!trimmed) return alert('لا يمكن ترك السؤال فارغًا.');
  q.text = trimmed;
  storage.write(KEYS.QUESTIONS, questions);
  renderQuestions();
}

function typeLabel(t){
  switch(t){
    case 'short': return 'إجابة قصيرة';
    case 'long': return 'إجابة طويلة';
    case 'mcq_single': return 'اختيار واحد';
    case 'mcq_multi': return 'اختيارات متعددة';
    default: return t;
  }
}
function escapeHtml(s){
  return s.replace(/[&<>\"']/g, (c)=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[c]);
}
