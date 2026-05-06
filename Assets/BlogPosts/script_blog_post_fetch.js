

document.addEventListener('DOMContentLoaded', () => {
    const postElement = document.getElementById('blog-post-full');
    if (!postElement) return;

    const jsonFile = postElement.dataset.postJson;

    if (!jsonFile) {
        postElement.innerHTML = '<p>No JSON file specified for this blog post.</p>';
        return;
    }

    fetch(jsonFile)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Could not load ${jsonFile}`);
            }
            return response.json();
        })
        .then(post => {
            let html = `
                <h1>${post.title}</h1>
                <div class="meta">
                    By: ${post.author} | ${new Date(post.date).toLocaleDateString()}
                </div>
                <div class="content">
            `;

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
            });

            html += `</div>`;
            postElement.innerHTML = html;
        })
        .catch(error => {
            postElement.innerHTML = '<p>Post not found or error loading post.</p>';
            console.error(error);
        });
});