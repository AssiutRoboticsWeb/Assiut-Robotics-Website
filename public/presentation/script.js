const total = 10;
let current = 0;
const wrapper = document.getElementById('slides-wrapper');
const slides = document.querySelectorAll('.slide');
const progressBar = document.getElementById('progress-bar');
const slideNum = document.getElementById('slide-num');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function goSlide(n) {
     if (n < 0 || n >= total) return;
     slides[current].classList.remove('active');
     current = n;
     slides[current].classList.add('active');
     wrapper.style.transform = `translateX(-${current * 100}vw)`;
     progressBar.style.width = `${((current + 1) / total) * 100}%`;
     slideNum.textContent = String(current + 1).padStart(2, '0');
     prevBtn.style.opacity = current === 0 ? '0' : '1';
     prevBtn.style.pointerEvents = current === 0 ? 'none' : 'auto';
     nextBtn.style.opacity = current === total - 1 ? '0' : '1';
     nextBtn.style.pointerEvents = current === total - 1 ? 'none' : 'auto';
}

document.addEventListener('keydown', e => {
     if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); goSlide(current + 1); }
     if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); goSlide(current - 1); }
});

let touchStartX = 0;
document.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
document.addEventListener('touchend', e => {
     const diff = touchStartX - e.changedTouches[0].screenX;
     if (Math.abs(diff) > 50) { diff > 0 ? goSlide(current + 1) : goSlide(current - 1); }
});

goSlide(0);
lucide.createIcons({ attrs: { 'stroke-width': 1.5 } });