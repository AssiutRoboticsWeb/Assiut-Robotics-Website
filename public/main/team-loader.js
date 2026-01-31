
document.addEventListener('DOMContentLoaded', () => {
     loadTeamData();
});

async function loadTeamData() {
     const teamContainer = document.getElementById('team-board-container');
     if (!teamContainer) return;

     try {
          const response = await fetch('./config/team-members.json');
          if (!response.ok) {
               throw new Error('Failed to load team data');
          }
          const data = await response.json();
          renderTeamBoard(data, teamContainer);
     } catch (error) {
          console.error('Error loading team board:', error);
          teamContainer.innerHTML = '<p class="error-message">Unable to load team info.</p>';
     }
}

function renderTeamBoard(departments, container) {
     container.innerHTML = ''; // Clear existing content

     departments.forEach(dept => {
          // Create Department Section
          const deptSection = document.createElement('div');
          deptSection.className = 'department-section';
          deptSection.dataset.aos = "fade-up"; // Preparation for animation if used

          // Title
          const title = document.createElement('div');
          title.className = 'department-title';
          title.textContent = dept.title;
          deptSection.appendChild(title);

          // Split members into Heads and Others (Vices/Members)
          const heads = [];
          const others = [];

          dept.members.forEach(member => {
               if (member.name.toLowerCase() === "name here") return;

               const role = member.role || "";

               // Special case: High Board (Team Leader & Vice) stays in one row
               if (dept.id === 'high-board' || dept.id === 'hr' || dept.id === 'oc' || dept.id === 'pr') {
                    heads.push(member);
                    return;
               }

               // Special case: Software Team (Head & Vice in one row, Sub-heads in another)
               if (dept.id === 'software' || dept.id === 'ac-electrical' || dept.id === 'ac-mechanical' || dept.id === 'digital-marketing') {
                    if (/Head|Leader|Vice/i.test(role) && !/Sub-head/i.test(role)) {
                         heads.push(member);
                    } else {
                         others.push(member);
                    }
                    return;
               }

               // Check for Vice/Subhead first so title like "Vice Head" goes to Vice
               const isVice = /Vice|Sub-head/i.test(role);
               const isHead = /Head|Leader/i.test(role);

               if (isVice) {
                    others.push(member);
               } else if (isHead) {
                    heads.push(member);
               } else {
                    others.push(member);
               }
          });

          // Sort heads by priority to ensure Head -> Vice order
          heads.sort((a, b) => getRolePriority(a.role) - getRolePriority(b.role));

          // Helper to create and append a grid row
          const appendGrid = (membersList) => {
               if (membersList.length === 0) return;
               const grid = document.createElement('div');
               grid.className = 'team-grid';
               // Reset margin if multiple grids to avoid big gaps, or handle via CSS if needed
               // Currently .team-grid has no vertical margin, strictly padding and gap.

               membersList.forEach(member => {
                    grid.appendChild(createMemberCard(member));
               });
               deptSection.appendChild(grid);
          };

          // Render Rows
          if (heads.length > 0) {
               appendGrid(heads);
          }

          if (heads.length > 0 && others.length > 0) {
               // simple spacer
               const spacer = document.createElement('div');
               spacer.style.height = '2rem';
               deptSection.appendChild(spacer);
          }

          if (others.length > 0) {
               appendGrid(others);
          }

          container.appendChild(deptSection);
     });
}

function getRolePriority(role) {
     var priority = 99;
     if (!role) return priority;
     const r = role.toLowerCase();
     if (r.includes('leader') || r.includes('head') && !r.includes('vice') && !r.includes('sub')) priority = 1;
     if (r.includes('vice') || r.includes('face')) priority = 2;
     if (r.includes('sub-head') || r.includes('sub head')) priority = 3;
     // console.log("role: ", r, "priority: ", priority);
     return priority;
}

function createMemberCard(member) {
     const card = document.createElement('div');
     card.className = `team-member-card ${member.cardClass || ''}`;

     // Image Wrapper
     const imgWrapper = document.createElement('div');
     imgWrapper.className = 'team-member-img-wrapper';

     const img = document.createElement('img');
     img.src = member.image;
     img.alt = member.role;
     img.loading = "lazy";

     imgWrapper.appendChild(img);

     // Info
     const info = document.createElement('div');
     info.className = 'team-member-info';

     const name = document.createElement('div');
     name.className = 'member-name';
     name.textContent = member.name;

     const role = document.createElement('div');
     role.className = 'member-role';
     role.textContent = member.role;

     info.appendChild(name);
     info.appendChild(role);

     // New Fields: Bio, Email, Date
     if (member.bio) {
          const bio = document.createElement('p');
          bio.className = 'member-bio';
          bio.textContent = member.bio;
          info.appendChild(bio);
     }

     if (member.email) {
          const email = document.createElement('a');
          email.className = 'member-email';
          email.href = `mailto:${member.email}`;
          email.textContent = member.email;
          info.appendChild(email);
     }

     if (member.date) {
          const date = document.createElement('span');
          date.className = 'member-date';
          date.textContent = member.date;
          info.appendChild(date);
     }

     card.appendChild(imgWrapper);
     card.appendChild(info);

     return card;
}
