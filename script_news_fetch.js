// Load news from JSON file
fetch('Assets/News.json')
  .then(response => response.json())
  .then(newsItems => {
    const container = document.getElementById('news-container');
    
    newsItems.forEach(item => {
      let imagesHtml = '';
      
      // Check if images array exists and has items
      if (item.images && item.images.length > 0) {
        imagesHtml = item.images.map(image => `
          <div class="news-image-container">
            <img src="${image.url}" alt="${image.alt}" class="news-image" loading="lazy">
            ${image.caption ? `<p class="news-image-caption">${image.caption}</p>` : ''}
          </div>
        `).join('');
      }

      container.innerHTML += `
        <div class="news-item">
          <h3 class="news-header">${item.title}</h3>
          <p class="news-date">${item.date}</p>
          <p class="news-text">${item.content}</p>
          ${imagesHtml}
        </div>
      `;
    });
  });