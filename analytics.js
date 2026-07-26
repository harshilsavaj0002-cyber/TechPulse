// Firebase Analytics Integration for TechPulse
// This script provides analytics tracking for all pages

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVrIS3sP0FJoUY2Ci_DA9KPbjE3p4TqZM",
    authDomain: "tech-pulse-e5f87.firebaseapp.com",
    projectId: "tech-pulse-e5f87",
    storageBucket: "tech-pulse-e5f87.firebasestorage.app",
    messagingSenderId: "168725306636",
    appId: "1:168725306636:web:a44b288d188309a9927d29",
    measurementId: "G-0FVC6L2Y5K"
};

// Initialize Firebase Analytics
let analytics = null;
let logEvent = null;

// Initialize analytics when Firebase is loaded
async function initializeAnalytics() {
    try {
        // Import Firebase modules
        const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js");
        const { getAnalytics, logEvent: firebaseLogEvent } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js");

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        analytics = getAnalytics(app);
        logEvent = firebaseLogEvent;

        // Log page view
        logEvent(analytics, 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname
        });

        // Make analytics available globally
        window.analytics = analytics;
        window.logEvent = logEvent;

        console.log('Firebase Analytics initialized successfully');
    } catch (error) {
        console.error('Error initializing Firebase Analytics:', error);
    }
}

// Track custom events
function trackEvent(eventName, parameters = {}) {
    if (logEvent && analytics) {
        logEvent(analytics, eventName, parameters);
    } else {
        console.log('Analytics not initialized, event not tracked:', eventName, parameters);
    }
}

// Track user interactions
function setupEventTracking() {
    // Track newsletter signups
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('newsletter-email')?.value?.trim();
            if (email) {
                trackEvent('newsletter_signup', {
                    email_domain: email.split('@')[1] || 'unknown',
                    page_path: window.location.pathname
                });
            }
        });
    }

    // Track contact form submissions
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            trackEvent('contact_form_submit', {
                page_path: window.location.pathname,
                form_type: 'contact'
            });
        });
    }

    // Track article clicks
    document.querySelectorAll('a[href*="blog-post.html"]').forEach(link => {
        link.addEventListener('click', function() {
            const articleId = this.href.split('id=')[1] || 'unknown';
            trackEvent('article_click', {
                article_id: articleId,
                article_title: this.textContent.trim(),
                page_path: window.location.pathname
            });
        });
    });

    // Track category clicks
    document.querySelectorAll('a[href*="category="]').forEach(link => {
        link.addEventListener('click', function() {
            const category = this.href.split('category=')[1] || 'unknown';
            trackEvent('category_click', {
                category: category,
                page_path: window.location.pathname
            });
        });
    });

    // Track navigation clicks
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('navigation_click', {
                link_text: this.textContent.trim(),
                link_href: this.href,
                page_path: window.location.pathname
            });
        });
    });

    // Track external link clicks
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.addEventListener('click', function() {
                trackEvent('external_link_click', {
                    link_url: this.href,
                    link_text: this.textContent.trim(),
                    page_path: window.location.pathname
                });
            });
        }
    });

    // Track search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (this.value.trim().length > 2) {
                    trackEvent('search', {
                        search_term: this.value.trim(),
                        page_path: window.location.pathname
                    });
                }
            }, 1000);
        });
    }

    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', function() {
        const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollDepth > maxScrollDepth && scrollDepth % 25 === 0) {
            maxScrollDepth = scrollDepth;
            trackEvent('scroll_depth', {
                scroll_depth: scrollDepth,
                page_path: window.location.pathname
            });
        }
    });

    // Track time on page
    const startTime = Date.now();
    window.addEventListener('beforeunload', function() {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        trackEvent('time_on_page', {
            time_seconds: timeOnPage,
            page_path: window.location.pathname
        });
    });
}

// Initialize analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnalytics().then(() => {
        setupEventTracking();
    });
});

// Export functions for use in other scripts
window.trackEvent = trackEvent;
