// Load members from JSON file
fetch('Assets/members.json')
  .then(response => response.json())
  .then(data => {
    const currentContainer = document.getElementById('current-members');
    const pastContainer = document.getElementById('past-members');
    
    // Render current members
    renderMembers(data.current, currentContainer);
    
    // Render past members (with isPast flag set to true)
    renderMembers(data.past, pastContainer, true);
    
    // Initialize dropdown filter after members are loaded
    initDropdownFilter();
  })
  .catch(error => {
    console.error('Error loading members:', error);
    document.getElementById('current-members').innerHTML = '<p>Error loading member information. Please try again later.</p>';
  });

// Updated renderMembers function with end year support
function renderMembers(members, container, isPast = false) {
  container.innerHTML = '';
  
  members.forEach(member => {
    const linksHtml = member.links.map(link => {
      switch(link.type) {
        case 'email':
          return `<a href="${link.url}" class="member-link" aria-label="Email"><i class="fa-solid fa-envelope"></i></a>`;
        case 'cv':
          return `<a href="${link.url}" class="member-link" aria-label="CV"><i class="ai ai-cv-square"></i></a>`;
        case 'scholar':
          return `<a href="${link.url}" class="member-link" aria-label="Google Scholar"><i class="ai ai-google-scholar-square"></i></a>`;
        case 'researchgate':
          return `<a href="${link.url}" class="member-link" aria-label="ResearchGate"><i class="ai ai-researchgate-square"></i></a>`;
        case 'linkedin':
          return `<a href="${link.url}" class="member-link" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>`;
        default:
          return '';
      }
    }).join('');
    
    // Add end year badge for past members if end_year exists
    const endYearBadge = isPast && member.end_year 
      ? `<div class="end-year-badge">${member.end_year}</div>`
      : '';
    
    container.innerHTML += `
      <div class="member-card ${isPast ? 'past-member' : ''}">
        <div class="member-photo-container">
          <img src="${member.photo}" alt="${member.name}" class="member-photo" loading="lazy">
        </div>
        <div class="member-info">
          <h3 class="member-name">${member.name}</h3>
          <p class="member-role">${member.role}</p>
          <p class="member-focus"><strong>Research Focus:</strong> ${member.focus}</p>
          <div class="member-links">
            ${linksHtml}
          </div>
          ${endYearBadge}
        </div>
      </div>
    `;
  });
}

// Initialize dropdown filter
function initDropdownFilter() {
  const dropdownBtn = document.querySelector('.dropdown-btn');
  const dropdownContent = document.querySelector('.dropdown-content');
  
  // Toggle dropdown
  dropdownBtn.addEventListener('click', () => {
    document.querySelector('.filter-dropdown').classList.toggle('active');
  });
  
  // Filter members when option is selected
  dropdownContent.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = link.getAttribute('data-filter');
      filterMembers(filter);
      dropdownBtn.textContent = link.textContent + ' ';
      dropdownBtn.appendChild(createChevronIcon());
      document.querySelector('.filter-dropdown').classList.remove('active');
    });
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.filter-dropdown')) {
      document.querySelector('.filter-dropdown').classList.remove('active');
    }
  });
}

// Helper function to create chevron icon
function createChevronIcon() {
  const icon = document.createElement('i');
  icon.className = 'fas fa-chevron-down';
  return icon;
}

// Filter function
function filterMembers(filter) {
  document.querySelectorAll('.member-card').forEach(card => {
    if (filter === 'all') {
      card.style.display = 'flex';
    } else if (filter === 'past') {
      card.style.display = card.closest('#past-members') ? 'flex' : 'none';
    } else {
      const role = card.querySelector('.member-role').textContent.toLowerCase();
      const shouldShow = role.includes(filter);
      card.style.display = shouldShow ? 'flex' : 'none';
    }
  });
}