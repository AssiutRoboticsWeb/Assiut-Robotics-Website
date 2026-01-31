
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

        // Grid
        const grid = document.createElement('div');
        grid.className = 'team-grid';

        // Members
        dept.members.forEach(member => {
            const card = createMemberCard(member);
            grid.appendChild(card);
        });

        deptSection.appendChild(grid);
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
