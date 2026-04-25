/**
 * Assiut Robotics Blog Script
 * Handles dynamic blog loading and the "focused" (expanded) card interaction.
 */

const BLOG_API = ServerConfig.getMainAPI();

/**
 * Toggle between standard and focused (expanded) mode for a blog card.
 * @param {string} blogId 
 */
function toggleBlogFocus(blogId) {
    const blogElement = document.getElementById(blogId);
    const body = document.body;
    
    if (!blogElement) return;

    const isFocused = blogElement.classList.contains('focused');

    if (isFocused) {
        // Switch back to normal mode
        blogElement.classList.remove('focused');
        blogElement.classList.add('unfocusing');
        body.classList.remove('blog-focus-active');

        // Cleanup after animation
        setTimeout(() => {
            blogElement.classList.remove('unfocusing');
        }, 600);
    } else {
        // Close any other focused blogs first
        document.querySelectorAll('.section.focused, .pinnedBlog.focused').forEach(el => {
            if (el.id !== blogId) {
                el.classList.remove('focused');
            }
        });

        // Switch to focused mode
        blogElement.classList.add('focused');
        body.classList.add('blog-focus-active');
    }
}

/**
 * Create a blog card element from blog data.
 * @param {Object} blog 
 * @param {boolean} isPinned 
 * @returns {string} HTML string
 */
function createBlogHTML(blog, isPinned = false) {
    const headContent = blog.content.length > 200 ? blog.content.slice(0, 200) + '...' : blog.content;
    const sectionClass = isPinned ? 'pinnedBlog' : 'section';
    
    return `
        <article class="${sectionClass}" id="${blog._id}" data-aos="fade-up">
            <div class="blog-layout">
                <div class="blog-content-wrapper">
                    <header class="blog-header">
                        <h2 class="blog-title">${blog.title}</h2>
                        <div class="blog-meta">
                            <span class="meta-item">
                                <i class="far fa-calendar-alt"></i>
                                ${new Date(blog.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                    </header>
                    
                    <div class="blog-body">
                        <p class="blog-excerpt">${headContent}</p>
                        <div class="blog-full-content">
                            ${blog.content}
                        </div>
                    </div>
                    
                    <footer class="blog-footer">
                        <button class="btn-read-more" onclick="toggleBlogFocus('${blog._id}')">
                            <span>Read More</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                    </footer>
                </div>
                
                <div class="blog-image-container">
                    <img src="../all-images/blogs/${blog.avatar}" alt="${blog.title}" loading="lazy">
                </div>
            </div>
        </article>
    `;
}

/**
 * Load blogs from the server and render them.
 */
async function loadBlogs() {
    const blogsContainer = document.querySelector(".unPinnedBlogs");
    const pinnedContainer = document.querySelector(".pinned-container") || blogsContainer;

    if (!blogsContainer) return;

    try {
        const response = await fetch(`${BLOG_API}/blogs/getBlogs`);
        if (!response.ok) throw new Error('Failed to fetch blogs');

        const result = await response.json();
        const blogs = result.data || [];

        if (blogs.length === 0) {
            blogsContainer.innerHTML = '<p class="no-blogs">We are currently preparing some exciting content for you. Check back soon!</p>';
            return;
        }

        // Clear existing placeholders
        blogsContainer.innerHTML = '';
        if (pinnedContainer !== blogsContainer) pinnedContainer.innerHTML = '';

        blogs.forEach((blog, index) => {
            // First blog is pinned
            if (index === 0) {
                pinnedContainer.insertAdjacentHTML('afterbegin', createBlogHTML(blog, true));
            } else {
                blogsContainer.insertAdjacentHTML('beforeend', createBlogHTML(blog, false));
            }
        });

        // Re-initialize AOS if available
        if (window.AOS) {
            window.AOS.refresh();
        }

    } catch (error) {
        console.error('Error loading blogs:', error);
        blogsContainer.innerHTML = '<p class="error-msg">Something went wrong while loading blogs. Please try again later.</p>';
    }
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    loadBlogs();
});