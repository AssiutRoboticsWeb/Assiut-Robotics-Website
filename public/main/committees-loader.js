document.addEventListener('DOMContentLoaded', () => {
     loadCommittees();
});

async function loadCommittees() {
     const container = document.getElementById('committees-container');
     if (!container) return;

     try {
          const response = await fetch('./config/committees.json');
          if (!response.ok) throw new Error('Failed to load committees');
          const data = await response.json();
          renderCommittees(data, container);
     } catch (error) {
          console.error('Committees Error:', error);
          container.innerHTML = '<p class="error-text">Unable to load committees content.</p>';
     }
}

function renderCommittees(data, container) {
     container.innerHTML = ''; // Clear container

     let currentRow = null;

     data.forEach((item, index) => {
          // Create a new row every 3 items
          if (index % 3 === 0) {
               currentRow = document.createElement('div');
               currentRow.className = 'row';
               container.appendChild(currentRow);
          }

          const col = document.createElement('div');
          col.className = 'column';
          col.innerHTML = `
            <div class="card">
                <div class="img-container">
                    <img src="${item.image}" alt="${item.title}" loading="lazy" />
                </div>
                <a target="_blank">
                    <h3>${item.title}</h3>
                </a>
                <div class="card-description fade22">
                    ${item.description}
                </div>
            </div>
        `;
          currentRow.appendChild(col);
     });
}
