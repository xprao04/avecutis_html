# Avecutis Dermatology Website

A modern, responsive website for Dermatologie Avecutis - a dermatology clinic in Prague, Czech Republic.

## Overview

This is a professional, single-page marketing website built with pure HTML, CSS, and vanilla JavaScript. The site provides comprehensive information about the clinic's services, team, pricing, and contact details.

## Features

- **Responsive Design**: Mobile-first approach with breakpoints for tablets, desktops, and large screens
- **Modern CSS**: Uses CSS custom properties (variables) for easy theming and maintenance
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation support, and reduced-motion preferences
- **Performance Optimized**: Lightweight (60KB total), debounced scroll handlers, Intersection Observer API
- **Interactive Elements**: Smooth scrolling, mobile navigation, scroll-triggered animations, active link highlighting
- **No Dependencies**: Pure vanilla JavaScript - no frameworks or build tools required

## Project Structure

```
avecutis_html/
├── index.html          # Main HTML file with all content
├── styles.css          # All styling with CSS variables
├── script.js           # JavaScript interactions and animations
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern CSS with flexbox, grid, custom properties, and media queries
- **JavaScript (ES6+)**: Vanilla JS with modern APIs (Intersection Observer, classList, etc.)
- **Google Fonts**: Inter font family

## Content Sections

1. **Navigation**: Fixed header with mobile hamburger menu
2. **Hero**: Welcome section with call-to-action
3. **About**: Clinic introduction
4. **Services**: Medical dermatology services
5. **Aesthetic Dermatology**: Cosmetic treatments
6. **Team**: Medical staff profiles
7. **Pricing**: Detailed service pricing
8. **Contact**: Contact form, location map, and business hours
9. **Footer**: Copyright and additional links

## How to Use

### Local Development

Simply open `index.html` in a web browser:

```bash
open index.html
```

Or use a local development server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server
```

### Deployment

This is a static website and can be deployed to any static hosting service:

- **GitHub Pages**: Push to GitHub and enable Pages in repository settings
- **Netlify**: Drag and drop the folder or connect to your repository
- **Vercel**: Deploy with `vercel` CLI or GitHub integration
- **Traditional Hosting**: Upload files via FTP to any web host

No build process required - just upload the files as-is.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contact Information

**Dermatologie Avecutis**
- Address: Krkonošská 2001/16, 120 00 Praha 2, Czech Republic
- Phone: +420 222 721 478
- Email: info@avecutis.cz
- Website: https://avecutis.cz

## License

All rights reserved. This is proprietary code for Dermatologie Avecutis.
