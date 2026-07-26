// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        // Ensure the button is clickable by setting a high z-index
        mobileMenuButton.style.zIndex = '1000';
        
        // Use mousedown and touchstart events for better mobile response
        ['click', 'mousedown', 'touchstart'].forEach(eventType => {
            mobileMenuButton.addEventListener(eventType, function(e) {
                e.preventDefault();
                e.stopPropagation();
                mobileMenu.classList.toggle('hidden');
            }, { passive: false });
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        // Check if the click target is not inside an iframe
        if (event.target.tagName !== 'IFRAME' && 
            !mobileMenuButton.contains(event.target) && 
            !mobileMenu.contains(event.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            // Track failed contact form submission
            if (window.trackEvent) {
                window.trackEvent('contact_form_failed', {
                    reason: 'missing_fields',
                    page_path: window.location.pathname
                });
            }
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            // Track failed contact form submission
            if (window.trackEvent) {
                window.trackEvent('contact_form_failed', {
                    reason: 'invalid_email',
                    page_path: window.location.pathname
                });
            }
            return;
        }
        
        // Track successful contact form submission
        if (window.trackEvent) {
            window.trackEvent('contact_form_success', {
                subject: subject,
                page_path: window.location.pathname
            });
        }
        
        // If validation passes, you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Blog page functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const sortBy = document.getElementById('sort-by');
    const blogPosts = document.querySelectorAll('.blog-post');
    const postsContainer = document.getElementById('blog-posts');

    // Search functionality
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            // Clear previous timeout
            clearTimeout(searchTimeout);
            
            // Track search after user stops typing for 1 second
            if (searchTerm.length > 2) {
                searchTimeout = setTimeout(() => {
                    if (window.trackEvent) {
                        window.trackEvent('blog_search', {
                            search_term: searchTerm,
                            page_path: window.location.pathname
                        });
                    }
                }, 1000);
            }
            
            blogPosts.forEach(post => {
                const title = post.querySelector('h3').textContent.toLowerCase();
                const description = post.querySelector('p').textContent.toLowerCase();
                const category = post.querySelector('.category-tag').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }

    // Category filter
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            const selectedCategory = this.value.toLowerCase();
            
            // Track category filter usage
            if (window.trackEvent && selectedCategory) {
                window.trackEvent('category_filter', {
                    category: selectedCategory,
                    page_path: window.location.pathname
                });
            }
            
            blogPosts.forEach(post => {
                const postCategory = post.dataset.category;
                
                if (selectedCategory === '' || postCategory === selectedCategory) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }

    // Sort functionality
    if (sortBy && postsContainer) {
        sortBy.addEventListener('change', function() {
            const sortValue = this.value;
            
            // Track sort usage
            if (window.trackEvent) {
                window.trackEvent('blog_sort', {
                    sort_by: sortValue,
                    page_path: window.location.pathname
                });
            }
            
            const postsArray = Array.from(blogPosts);
            
            postsArray.sort((a, b) => {
                if (sortValue === 'newest') {
                    return new Date(b.dataset.date) - new Date(a.dataset.date);
                } else if (sortValue === 'oldest') {
                    return new Date(a.dataset.date) - new Date(b.dataset.date);
                } else if (sortValue === 'popular') {
                    return parseInt(b.dataset.views) - parseInt(a.dataset.views);
                }
            });
            
            // Clear the container
            postsContainer.innerHTML = '';
            
            // Add sorted posts back to the container
            postsArray.forEach(post => {
                if (post.style.display !== 'none') {
                    postsContainer.appendChild(post);
                }
            });
        });
    }
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});

// Back to top button
const backToTopButton = document.getElementById('back-to-top');
if (backToTopButton) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Newsletter subscription
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('newsletter-email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email || !emailRegex.test(email)) {
            alert('Please enter a valid email address');
            // Track failed newsletter signup
            if (window.trackEvent) {
                window.trackEvent('newsletter_signup_failed', {
                    reason: 'invalid_email',
                    page_path: window.location.pathname
                });
            }
            return;
        }
        
        // Track successful newsletter signup
        if (window.trackEvent) {
            window.trackEvent('newsletter_signup_success', {
                email_domain: email.split('@')[1] || 'unknown',
                page_path: window.location.pathname
            });
        }
        
        // Here you would typically send the email to your server
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}

// Function to load blog data
async function loadBlogData() {
    try {
        const response = await fetch('blog-data.json');
        const data = await response.json();
        return data.posts;
    } catch (error) {
        console.error('Error loading blog data:', error);
        return [];
    }
}

// Function to create blog post HTML
function createBlogPostHTML(post) {
    return `
        <article class="blog-post" data-category="${post.category.toLowerCase()}" data-date="${post.date}" data-views="${post.views}">
            <div class="relative w-full h-48 bg-gray-200">
                <img src="${post.image}"
                    alt="${post.title}" 
                    class="w-full h-48 object-cover" 
                    loading="lazy"
                    onerror="this.onerror=null; this.src='https://via.placeholder.com/800x400?text=${encodeURIComponent(post.title)}'">
            </div>
            <div class="p-6">
                <div class="flex items-center gap-2 mb-2">
                    <span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">${post.category}</span>
                    <span class="text-gray-500 text-sm">${formatDate(post.date)}</span>
                </div>
                <h3 class="text-xl font-semibold mb-2">${post.title}</h3>
                <p class="text-gray-600 mb-4">${post.shortDescription}</p>
                <a href="blog-post.html?id=${post.id}" class="text-blue-600 hover:text-blue-800 font-medium">Read More →</a>
            </div>
        </article>
    `;
}

// Function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Function to initialize blog page
async function initializeBlogPage() {
    const blogPostsContainer = document.getElementById('blog-posts');
    if (!blogPostsContainer) return;

    const posts = await loadBlogData();
    
    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Display posts
    blogPostsContainer.innerHTML = posts.map(post => createBlogPostHTML(post)).join('');

    // Initialize search and filter functionality
    initializeSearchAndFilter(posts);
}

// Function to handle search and filter
function initializeSearchAndFilter(posts) {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const sortBy = document.getElementById('sort-by');
    const blogPostsContainer = document.getElementById('blog-posts');

    function filterAndSortPosts() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value.toLowerCase();
        const sortValue = sortBy.value;

        let filteredPosts = posts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchTerm) || 
                                post.shortDescription.toLowerCase().includes(searchTerm);
            const matchesCategory = !selectedCategory || post.category.toLowerCase() === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        // Sort posts
        switch(sortValue) {
            case 'newest':
                filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'oldest':
                filteredPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'popular':
                filteredPosts.sort((a, b) => b.views - a.views);
                break;
        }

        // Update display
        blogPostsContainer.innerHTML = filteredPosts.map(post => createBlogPostHTML(post)).join('');
    }

    // Add event listeners
    searchInput.addEventListener('input', filterAndSortPosts);
    categoryFilter.addEventListener('change', filterAndSortPosts);
    sortBy.addEventListener('change', filterAndSortPosts);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeBlogPage); 