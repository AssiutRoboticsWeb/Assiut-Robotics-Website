const profileForm = document.getElementById('profileForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const committeeSelect = document.getElementById('committeeSelect');

// عبّي اللجان
committeeSelect.innerHTML = '';
COMMITTEES.forEach(c=>{
  const o = document.createElement('option');
  o.value = c; o.textContent = c;
  committeeSelect.appendChild(o);
});

// حمّل بيانات محفوظة إن وجدت
const existing = storage.read(KEYS.PROFILE, null);
if (existing){
  fullName.value = existing.fullName || '';
  email.value = existing.email || '';
  phone.value = existing.phone || '';
  committeeSelect.value = existing.committee || COMMITTEES[0];
}

profileForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const payload = {
    fullName: fullName.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
    committee: committeeSelect.value
  };
  if (!payload.fullName || !payload.email){
    alert('من فضلك أدخل الاسم والبريد الإلكتروني.');
    return;
  }
  storage.write(KEYS.PROFILE, payload);
  // انتقال لصفحة أسئلة اللجنة
  window.location.href = './committee.html';
});
