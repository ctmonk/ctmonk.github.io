// --- START OF FILE script_blog_fetch.js ---

document.addEventListener('DOMContentLoaded', () => {
    fetchBlogPosts();
});

async function fetchBlogPosts() {
    // Replace 'blog_data.json' with your actual data source (JSON file or API endpoint)
    const dataUrl = 'Assets/Blog.json'; 
    const container = document.getElementById('blog-posts-container');

    if (!container) {
        console.error("Blog post container not found!");
        return;
    }

    // Clear any existing example content (like the static card in the HTML)
    // container.innerHTML = ''; // Uncomment this line once you have dynamic loading working

    try {
        const response = await fetch(dataUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const posts = await response.json();

        if (posts && posts.length > 0) {
            posts.forEach(post => {
                const postElement = createBlogPostCard(post);
                container.appendChild(postElement);
            });
        } else {
            container.innerHTML = '<p style="color: #aaa;">No blog posts found.</p>';
        }

    } catch (error) {
        console.error("Could not fetch blog posts:", error);
        container.innerHTML = '<p style="color: #ff8a8a;">Error loading blog posts. Please try again later.</p>';
    }
}

function createBlogPostCard(post) {
    // Create the main article element
    const card = document.createElement('article');
    card.className = 'blog-post-card';
    if (post.category) { // Add data attribute if category exists
        card.dataset.category = post.category.toLowerCase().replace(/\s+/g, '-');
    }

    // --- Image Section (Optional) ---
    let imageHtml = '';
    if (post.imageUrl) {
        imageHtml = `
            <div class="blog-post-image-container">
                <img src="${post.imageUrl}" alt="${post.imageAlt || 'Blog post image'}" class="blog-post-image">
            </div>
        `;
    }

    // --- Content Section ---
    const content = document.createElement('div');
    content.className = 'blog-post-content';

    // Format date (optional, basic example)
    const postDate = post.date ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Date unknown';

    content.innerHTML = `
        <header class="blog-post-header">
          <h3 class="blog-post-title">${post.title || 'Untitled Post'}</h3>
          <div class="blog-post-meta">
            ${post.author ? `
            <span class="meta-item author">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              ${post.author}
            </span>` : ''}
            <span class="meta-item date">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>
              ${postDate}
            </span>
            ${post.category ? `
            <span class="meta-item category">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"/></svg>
                ${post.category}
            </span>` : ''}
          </div>
        </header>
        <p class="blog-post-excerpt">
          ${post.excerpt || ''}
        </p>
        <a href="${post.readMoreLink || '#'}" class="blog-post-readmore">
            Read More 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
        </a>
    `;

    // Assemble the card
    card.innerHTML = imageHtml; // Add image HTML first
    card.appendChild(content); // Append the content div

    return card;
}


// --- Optional: Filter Logic (Example if you add filter buttons) ---
/*
function setupFiltering() {
    const filterButtons = document.querySelectorAll('#blog-filter .filter-btn');
    const postCards = document.querySelectorAll('#blog-posts-container .blog-post-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button style
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.dataset.filter; // e.g., 'all', 'fieldwork', 'lab-update'

            // Filter cards
            postCards.forEach(card => {
                const cardCategory = card.dataset.category;
                if (filterValue === 'all' || !cardCategory || cardCategory === filterValue) {
                    card.style.display = 'block'; // Or 'grid', 'flex' depending on your layout needs
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Call setupFiltering() inside the DOMContentLoaded listener after fetchBlogPosts()
// Make sure fetchBlogPosts populates the cards *before* setupFiltering is called,
// or call setupFiltering within the .then() block of fetchBlogPosts after cards are added.
*/

// --- END OF FILE script_blog_fetch.js ---