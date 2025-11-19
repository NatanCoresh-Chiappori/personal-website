# Personal Website

A beautiful, Apple-inspired personal website with dark mode design. Built with modern HTML, CSS, and JavaScript.

## Features

- **Apple-like Design**: Clean, minimal, and elegant interface
- **Dark Mode**: Beautiful dark theme optimized for readability
- **Fully Responsive**: Works seamlessly on all devices
- **Smooth Animations**: Elegant transitions and scroll effects
- **Fast & Lightweight**: No heavy frameworks, pure vanilla code
- **Accessible**: Semantic HTML and proper ARIA labels

## Sections

1. **Hero Section**: Eye-catching introduction with call-to-action buttons
2. **About Section**: Personal information and skills showcase
3. **Work Section**: Portfolio grid to display your projects
4. **Contact Section**: Multiple ways to get in touch

## Getting Started

1. **Clone or download** this repository
2. **Open `index.html`** in your web browser
3. **Customize** the content to match your personal information

## 🚀 Pushing Changes to Live Website

Your website is connected to GitHub and Netlify for automatic deployment!

### Quick Method (Easiest)
1. **Double-click** `push-changes.ps1` 
2. Follow the prompts to enter a commit message
3. Done! Netlify will auto-deploy in ~30 seconds

### Manual Method

After making changes to your files:

```bash
# 1. Stage all changes
git add .

# 2. Commit with a message
git commit -m "Update: your changes here"

# 3. Push to GitHub
git push
```

Netlify automatically detects the push and redeploys your site!

### Check Deployment Status
- Visit your Netlify dashboard to see deployment status
- Your site URL: Check your Netlify site settings

## Customization

### Personal Information

Edit `index.html` to update:
- Your name (replace "Your Name" throughout the file)
- Job title/description
- About section content
- Skills and expertise
- Project information in the work section
- Contact information (email, LinkedIn, GitHub)

### Styling

Modify `styles.css` to customize:
- Colors: Update CSS variables in `:root` selector
- Fonts: Change the Google Fonts import in `index.html`
- Spacing and layout
- Animation timings

### Adding Your Work

1. Replace the placeholder project items in the work section
2. Add your project images (replace the placeholder divs)
3. Update project titles, descriptions, and tags
4. Add links to your actual projects

### Adding Project Images

Replace the `.work-placeholder` divs with actual images:

```html
<div class="work-image">
    <img src="path/to/your/image.jpg" alt="Project Name">
</div>
```

Then add CSS for the images:

```css
.work-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
}

.work-item:hover .work-image img {
    transform: scale(1.1);
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- HTML5
- CSS3 (with CSS Variables)
- Vanilla JavaScript
- Google Fonts (Inter)

## License

Feel free to use this template for your personal website!

## Credits

Design inspired by Apple's website aesthetic.

