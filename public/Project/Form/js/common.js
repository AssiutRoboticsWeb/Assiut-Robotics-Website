(function setupTheme(){
  const saved = localStorage.getItem('theme') || 'light';
  if (saved === 'dark') document.documentElement.classList.add('dark-mode');
  document.addEventListener('click', (e)=>{
    if (e.target && e.target.id === 'themeToggle'){
      document.documentElement.classList.toggle('dark-mode');
      const mode = document.documentElement.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', mode);
    }
  });
})();

const storage = {
  read(key, fallback){ try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
  write(key, value){ localStorage.setItem(key, JSON.stringify(value)); },
  remove(key){ localStorage.removeItem(key); }
};

const KEYS = {
  QUESTIONS: 'qa_questions',
  RESPONSES: 'qa_responses',
  PROFILE:   'qa_profile',
};

const COMMITTEES = ['Electronics','Mechanical','Programming','Media','Logistics'];
const uid = () => Math.random().toString(36).slice(2,10);
