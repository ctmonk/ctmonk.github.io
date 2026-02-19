document.addEventListener('DOMContentLoaded', function() {
    // Get all necessary elements
    const searchInput = document.getElementById('publication-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const publications = document.querySelectorAll('.csl-entry');
    
    // Add year data attributes to each publication
    publications.forEach(pub => {
      const entryId = pub.getAttribute('data-csl-entry-id');
      const yearMatch = entryId.match(/\d{4}/);
      if (yearMatch) {
        pub.dataset.pubYear = yearMatch[0];
      }
    });
  
    // Search functionality
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      
      publications.forEach(pub => {
        const text = pub.textContent.toLowerCase();
        pub.style.display = text.includes(searchTerm) ? 'block' : 'none';
      });
    });
    
    // Filter by year
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        
        publications.forEach(pub => {
          const pubYear = parseInt(pub.dataset.pubYear || '0');
          
          if (filter === 'all') {
            pub.style.display = 'block';
          } 
          else if (filter === 'year-2026' && pubYear >= 2026 && pubYear < 2027) {
            pub.style.display = 'block';
          } 
          else if (filter === 'year-2025' && pubYear >= 2025 && pubYear < 2026) {
            pub.style.display = 'block';
          } 
          else if (filter === 'year-2024' && pubYear >= 2024 && pubYear < 2025) {
            pub.style.display = 'block';
          } 
          else if (filter === 'year-2023' && pubYear >= 2023 && pubYear < 2024) {
            pub.style.display = 'block';
          } 
          else if (filter === 'year-2020' && pubYear >= 2020 && pubYear <= 2022) {
            pub.style.display = 'block';
          } 
          else if (filter === 'year-2010' && pubYear >= 2010 && pubYear <= 2019) {
            pub.style.display = 'block';
          } 
          else if (filter === 'year-2000' && pubYear < 2010) {
            pub.style.display = 'block';
          } 
          else {
            pub.style.display = 'none';
          }
        });
      });
    });
  });