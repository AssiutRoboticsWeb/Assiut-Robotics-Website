const total = 11;
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
     wrapper.style.transform = `translateX(-${current * (100 / total)}%)`;
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

// Custom Interactive Cursor
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = mouseX;
let cursorY = mouseY;

if (cursor && cursorDot) {
     document.addEventListener('mousemove', (e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
          
          cursorDot.style.left = `${mouseX}px`;
          cursorDot.style.top = `${mouseY}px`;
     });

     function animateCursor() {
          let dx = mouseX - cursorX;
          let dy = mouseY - cursorY;
          cursorX += dx * 0.15;
          cursorY += dy * 0.15;
          
          cursor.style.left = `${cursorX}px`;
          cursor.style.top = `${cursorY}px`;
          
          requestAnimationFrame(animateCursor);
     }
     animateCursor();

     const interactables = document.querySelectorAll('button, a, .card-h, .nav-btn');
     interactables.forEach(el => {
          el.addEventListener('mouseenter', () => {
               cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
               cursor.style.borderColor = '#fbbf24';
               cursor.style.backgroundColor = 'rgba(251, 191, 36, 0.1)';
               cursorDot.style.transform = 'translate(-50%, -50%) scale(0)';
          });
          el.addEventListener('mouseleave', () => {
               cursor.style.transform = 'translate(-50%, -50%) scale(1)';
               cursor.style.borderColor = 'rgba(96, 165, 250, 0.5)';
               cursor.style.backgroundColor = 'transparent';
               cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
          });
     });
}