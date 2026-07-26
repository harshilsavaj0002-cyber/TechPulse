# TechPulse - Computer Technology Blog

A modern, responsive computer technology blog website built with HTML, JavaScript, and Tailwind CSS.

## Features

- Responsive design that works on all devices
- Modern and clean UI with Tailwind CSS
- SEO-friendly structure with semantic HTML
- Mobile-first approach
- Interactive features with minimal JavaScript
- Google AdSense ready
- Fast loading with lazy image loading
- Accessible navigation
- Contact form with validation
- Blog post filtering and search functionality
- Newsletter subscription
- Privacy policy page

## Pages

1. **Home (index.html)**
   - Hero section with call-to-action
   - Featured articles
   - Latest posts
   - Newsletter subscription

2. **About (about.html)**
   - About the blog
   - Mission and values
   - Team information
   - Community engagement

3. **Blog (blog.html)**
   - Article listing
   - Search functionality
   - Category filtering
   - Sorting options
   - Pagination

4. **Contact (contact.html)**
   - Contact form
   - Contact information
   - Social media links
   - Location map

5. **Privacy Policy (privacy-policy.html)**
   - Privacy policy content
   - Cookie policy
   - Data protection information
   - Google AdSense compliance

## Technologies Used

- HTML5
- JavaScript (ES6+)
- Tailwind CSS
- Custom CSS for additional styling
- Responsive design principles
- Semantic HTML5 elements
- Modern JavaScript features

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/TechPulse.git
   ```

2. Navigate to the project directory:
   ```bash
   cd TechPulse
   ```

3. Open the project in your preferred code editor.

4. To view the website, simply open any of the HTML files in a web browser.

## Customization

### Adding New Blog Posts

1. Navigate to the blog section in `blog.html`
2. Add a new article card following the existing structure:
   ```html
   <article class="blog-post" data-category="category" data-date="YYYY-MM-DD" data-views="number">
       <img src="path/to/image.jpg" alt="Article title" class="img-cover">
       <div class="p-6">
           <span class="category-tag">Category</span>
           <h3 class="post-title">Article Title</h3>
           <p class="post-description">Article description...</p>
           <a href="#" class="read-more">Read More</a>
       </div>
   </article>
   ```

### Modifying Styles

1. Global styles are in `styles.css`
2. Tailwind CSS classes are used throughout the HTML files
3. Custom components can be added to `styles.css`

### JavaScript Functionality

1. All JavaScript code is in `script.js`
2. Features include:
   - Mobile menu toggle
   - Form validation
   - Search functionality
   - Category filtering
   - Image lazy loading
   - Smooth scrolling
   - Back to top button

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Performance Optimization

- Lazy loading for images
- Minified CSS and JavaScript
- Optimized images
- Efficient DOM manipulation
- Responsive images
- Minimal JavaScript usage

## SEO Features

- Semantic HTML structure
- Meta tags for description and keywords
- Proper heading hierarchy
- Alt text for images
- Mobile-friendly design
- Fast loading times
- Clean URLs
- XML sitemap ready

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - your.email@example.com
Project Link: https://github.com/yourusername/TechPulse

## Acknowledgments

- Tailwind CSS for the utility-first CSS framework
- Heroicons for the SVG icons
- Unsplash for the placeholder images
- Google Fonts for the typography 