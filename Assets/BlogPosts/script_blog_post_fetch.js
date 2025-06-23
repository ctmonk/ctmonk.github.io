document.addEventListener('DOMContentLoaded', () => {
    fetch('post1.json')
        .then(response => response.json())
        .then(post => {
            const postElement = document.getElementById('blog-post-full');
            if (!postElement) return;

            // Build the meta/header
            let html = `
                <h1>${post.title}</h1>
                <div class="meta">
                    By: ${post.author} | ${new Date(post.date).toLocaleDateString()}
                </div>
            `;

            // Render content blocks
            html += `<div class="content">`;
            post.content.forEach(block => {
                if (block.type === 'paragraph') {
                    html += `<p>${block.text}</p>`;
                  } else if (block.type === 'image') {
                    html += `
                        <figure>
                            <img src="${block.src}" alt="${block.alt || ''}">
                            ${block.caption ? `<figcaption>${block.caption}</figcaption>` : ''}
                        </figure>
                    `;
                } else if (block.type === 'video') {
                    html += `
                        <figure>
                            <video controls src="${block.src}"></video>
                            ${block.caption ? `<figcaption>${block.caption}</figcaption>` : ''}
                        </figure>
                    `;
                }
                // Add more types as needed
            });
            html += `</div>`;

            postElement.innerHTML = html;
        })
        .catch(error => {
            document.getElementById('blog-post-full').innerHTML = '<p>Post not found or error loading post.</p>';
            console.error(error);
        });
});