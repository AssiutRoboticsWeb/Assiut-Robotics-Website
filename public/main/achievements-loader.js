document.addEventListener('DOMContentLoaded', () => {
     loadAchievements();
});

async function loadAchievements() {
     const container = document.getElementById('Ach_cards');
     if (!container) return; // Keep existing container, just populate it

     try {
          const response = await fetch('./config/achievements.json');
          if (!response.ok) throw new Error('Failed to load achievements');
          const data = await response.json();
          renderAchievements(data, container);
     } catch (error) {
          console.error('Achievements Error:', error);
          container.innerHTML = '<p class="error-text">Unable to load achievements content.</p>';
     }
}

function renderAchievements(data, container) {
     container.innerHTML = ''; // Clear hardcoded content

     data.forEach(item => {
          const card = document.createElement('div');
          card.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <h2>${item.title}</h2>
            <p>${item.description}</p>
            <a href="${item.link}"> <button class="learnMore">Learn more</button></a>
       `;
          container.appendChild(card);
     });
}
