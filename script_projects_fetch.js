// Load projects from JSON file
fetch('Assets/Projects.json')
  .then(response => response.json())
  .then(projects => {
    const container = document.getElementById('projects-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Render all projects initially
    renderProjects(projects, 'all'); // ADD THIS LINE TO INITIALLY RENDER PROJECTS
    
    // Add filter functionality
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderProjects(projects, button.dataset.filter);
      });
    });
    
    function renderProjects(projects, filter) {
      container.innerHTML = '';
      
      const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(project => project.status === filter);
      
      filteredProjects.forEach(project => {
        let mediaHtml = '';
        let navHtml = '';
        
        if (project.media && project.media.length > 0) {
          mediaHtml = project.media.map((mediaItem, i) => `
            <img src="${mediaItem.url}" alt="${mediaItem.alt || ''}" 
                 class="project-media ${i === 0 ? 'active' : ''}" 
                 loading="lazy">
          `).join('');
          
          navHtml = project.media.map((_, i) => `
            <button class="media-nav-btn ${i === 0 ? 'active' : ''}" 
                    data-index="${i}"></button>
          `).join('');
        }
        
        // Build funding HTML
        let fundingHtml = '';
        if (project.funding && project.funding.length > 0) {
          fundingHtml = `
            <p class="project-funding">
              Funding: ${project.funding.map(fund => `
                <a href="${fund.url}" class="funding-link" target="_blank">${fund.source}</a>
              `).join(', ')}
            </p>
          `;
        }
        
        container.innerHTML += `
          <div class="project-card" data-status="${project.status}">
            <div class="project-media-container">
              <div class="project-media-slider">
                ${mediaHtml}
              </div>
              ${project.media?.length > 1 ? `
                <div class="media-nav">
                  ${navHtml}
                </div>
              ` : ''}
            </div>
            
            <div class="project-content">
              <h3 class="project-header">${project.title}</h3>
              ${project.subtitle ? `<h4 class="project-subtitle">${project.subtitle}</h4>` : ''}
              <p class="project-description">${project.description}</p>
              ${fundingHtml}
              
              <div class="project-meta-container">
                <div class="project-meta">
                  <span>${project.date}</span>
                  ${project.links?.length > 0 ? `
                    <div class="project-links">
                      ${project.links.map(link => `
                        <a href="${link.url}" class="project-link" target="_blank">
                          <svg viewBox="0 0 24 24"><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/></svg>
                          ${link.text}
                        </a>
                      `).join('')}
                    </div>
                  ` : ''}
                </div>
                <span class="project-status status-${project.status}">${project.status}</span>
              </div>
            </div>
          </div>
        `;
      });
    
      // Initialize media sliders
      initMediaSliders();
    }

    function initMediaSliders() {
      document.querySelectorAll('.project-media-container').forEach(container => {
        const images = container.querySelectorAll('.project-media');
        const buttons = container.querySelectorAll('.media-nav-btn');
        
        if (images.length > 1) {
          let currentIndex = 0;
          
          buttons.forEach(button => {
            button.addEventListener('click', () => {
              const index = parseInt(button.dataset.index);
              currentIndex = index;
              
              images.forEach(img => img.classList.remove('active'));
              images[index].classList.add('active');
              
              buttons.forEach(btn => btn.classList.remove('active'));
              button.classList.add('active');
            });
          });
          
          setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            
            images.forEach(img => img.classList.remove('active'));
            images[currentIndex].classList.add('active');
            
            buttons.forEach(btn => btn.classList.remove('active'));
            buttons[currentIndex].classList.add('active');
          }, 5000);
        }
      });
    }
  })
  .catch(error => {
    console.error('Error loading projects:', error);
    // You might want to display an error message to users here
  });