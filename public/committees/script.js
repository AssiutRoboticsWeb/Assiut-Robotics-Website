// Initialize AOS Animations
AOS.init({
     duration: 800,
     easing: 'ease-in-out',
     once: true
});

// Tab Switching Logic with Image Swap
function openTab(evt, tabName, imgId) {
     let i, tabcontent, tablinks;

     // Get the parent card to limit scope
     const cardBody = evt.currentTarget.closest('.card-body');
     const card = evt.currentTarget.closest('.committee-card');

     // Hide all tab contents in this card
     tabcontent = cardBody.getElementsByClassName("tab-content");
     for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].classList.remove("active");
     }

     // Remove active class from all buttons in this card
     tablinks = cardBody.getElementsByClassName("tab-btn");
     for (i = 0; i < tablinks.length; i++) {
          tablinks[i].classList.remove("active");
     }

     // Show current tab and set button as active
     cardBody.querySelector('#' + tabName).classList.add("active");
     evt.currentTarget.classList.add("active");

     // Swap the card image if imgId is provided
     if (imgId && card) {
          const allImgs = card.querySelectorAll('.card-img');
          allImgs.forEach(img => img.classList.remove('active'));
          const targetImg = document.getElementById(imgId);
          if (targetImg) {
               targetImg.classList.add('active');
          }
     }
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
     menuToggle.addEventListener('click', () => {
          navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
          navLinks.classList.toggle('mobile-active');
     });
}




// ============================
// Committee Details (Modal Data)
// ============================
let committeeDetailsData = {};

// Load committee data
fetch('committees.json')
     .then(response => response.json())
     .then(data => {
          committeeDetailsData = data;
     })
     .catch(err => console.error("Error loading committee details:", err));

// ============================
// Modal Functions
// ============================
const modal = document.getElementById('modal');
const modalContentEl = document.getElementById('modal-content');
const modalTitle = document.getElementById('modal-title');
const closeBtn = document.querySelector('.close');

let currentModalCommittee = null;
let currentModalTab = null;

function showDetails(committee, activeTabId = null) {
     if (!committeeDetailsData[committee]) {
          console.error(`Details for committee "${committee}" not found. Ensure JSON is loaded.`);
          return;
     }

     currentModalCommittee = committee;

     const lang = window.LanguageManager ? window.LanguageManager.currentLang : 'en';
     const detail = committeeDetailsData[committee];

     // Helper to get bilingual text
     const getText = (obj) => {
          if (!obj) return '';
          if (typeof obj === 'string') return obj;
          return obj[lang] || obj['en'] || ''; 
     };

     const titleText = detail.titleAr && lang === 'ar' ? detail.titleAr : getText(detail.title);
     modalTitle.textContent = titleText;

     let contentHtml = `<div class="committee-detail-content">`;
     contentHtml += `<h2>${titleText}</h2>`;

     if (detail.description) {
          contentHtml += `<p>${getText(detail.description)}</p>`;
     }

     if (detail.sections) {
          // Generate Tabs
          contentHtml += `<div class="committee-tabs">`;
          const sectionKeys = Object.keys(detail.sections);
          
          // Determine which tab should be active
          if (!activeTabId || !sectionKeys.includes(activeTabId)) {
               activeTabId = sectionKeys[0];
          }
          currentModalTab = activeTabId;

          sectionKeys.forEach((key) => {
               const isActive = key === activeTabId ? 'active' : '';
               const sectionTitle = getText(detail.sections[key].title);
               contentHtml += `<button class="tab-btn ${isActive}" onclick="switchModalTab('${key}')">${sectionTitle}</button>`;
          });
          contentHtml += `</div>`;

          // Generate Tab Contents
          sectionKeys.forEach((key) => {
               const isActive = key === activeTabId ? 'active' : '';
               const sec = detail.sections[key];
               contentHtml += `<div id="${key}-content" class="tab-content ${isActive}">`;
               contentHtml += `<h3>${getText(sec.title)}</h3>`;
               
               if (sec.description) {
                    contentHtml += `<p>${getText(sec.description)}</p>`;
               }
               
               if (sec.fields && sec.fields.length > 0) {
                    contentHtml += `<h4>${lang === 'ar' ? 'التخصصات الرئيسية:' : 'Main Fields:'}</h4>`;
                    contentHtml += `<ul>`;
                    sec.fields.forEach(field => {
                         contentHtml += `<li>`;
                         contentHtml += `<strong>${getText(field.title)}</strong>`;
                         if (field.description) {
                              contentHtml += `<p>${getText(field.description)}</p>`;
                         }
                         if (field.items) {
                              const items = field.items[lang] || field.items['en'] || [];
                              if (items.length > 0) {
                                   contentHtml += `<ul>`;
                                   items.forEach(item => {
                                        contentHtml += `<li>${item}</li>`;
                                   });
                                   contentHtml += `</ul>`;
                              }
                         }
                         contentHtml += `</li>`;
                    });
                    contentHtml += `</ul>`;
               }
               contentHtml += `</div>`;
          });
     }

     if (detail.tasks && detail.tasks.length > 0) {
          contentHtml += `<h3>${lang === 'ar' ? 'المهام الرئيسية:' : 'Main Tasks:'}</h3>`;
          contentHtml += `<ul>`;
          detail.tasks.forEach(task => {
               contentHtml += `<li>${getText(task)}</li>`;
          });
          contentHtml += `</ul>`;
     }

     contentHtml += `</div>`;

     modalContentEl.innerHTML = contentHtml;
     modal.style.display = 'flex';
     document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeModal() {
     modal.style.display = 'none';
     document.body.style.overflow = '';
     currentModalCommittee = null;
     currentModalTab = null;
}

// Tab switching inside the modal
function switchModalTab(tabName) {
     currentModalTab = tabName;
     const modalContents = document.querySelectorAll('.modal .tab-content');
     const modalButtons = document.querySelectorAll('.modal .tab-btn');

     modalContents.forEach(content => content.classList.remove('active'));
     modalButtons.forEach(button => button.classList.remove('active'));

     const targetContent = document.querySelector(`.modal #${tabName}-content`);
     const targetButton = document.querySelector(`.modal [onclick="switchModalTab('${tabName}')"]`);

     if (targetContent) targetContent.classList.add('active');
     if (targetButton) targetButton.classList.add('active');
}

// Close modal: click close btn, click outside, or press Escape
if (closeBtn) closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', function (event) {
     if (event.target === modal) closeModal();
});

document.addEventListener('keydown', function (event) {
     if (event.key === 'Escape') closeModal();
});

// Re-render modal instantly if language changes while it's open
window.addEventListener('languageChanged', function() {
     if (modal.style.display === 'flex' && currentModalCommittee) {
          showDetails(currentModalCommittee, currentModalTab);
     }
});