
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
          // deptSection.dataset.aos = "fade-up"; // Preparation for animation if used

          // Title
          const title = document.createElement('div');
          title.className = 'department-title';
          title.textContent = dept.title;
          deptSection.appendChild(title);

          // Split members into Heads and Others (Vices/Members)
          const heads = [];
          const others = [];

          dept.members.forEach(member => {
               const role = member.role || "";

               // Special case: High Board (Team Leader & Vice) stays in one row
               if (dept.id === 'high-board' || dept.id === 'ac') {
                    heads.push(member);
                    return;
               }

               // Special case: Software Team (Head & Vice in one row, Sub-heads in another)
               if (dept.id === 'software') {
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

          // Add a small spacer if both exist? 
          // With standard block layout, they will stack. 
          // .team-grid has gap: 2rem which handles internal spacing.
          // Between two grids, there is 0 margin. 
          // Let's add a spacer or margin to the first grid if strictly needed, 
          // but let's try standard stacking first as it might look cleaner (just a new line).
          // Actually, without margin, they might look like one big blob if width allows.
          // But since they are separate DIVs, they force a line break. 
          // Adding a style for separate rows might be safer for visual distinction.
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

     // Optional: Socials (if added to JSON later)
     // const socials = document.createElement('div');
     // socials.className = 'member-socials';
     // ...

     info.appendChild(name);
     info.appendChild(role);

     card.appendChild(imgWrapper);
     card.appendChild(info);

     return card;
}
