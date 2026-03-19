# Ceedd Portfolio Website

A modern, responsive portfolio website for Ceedd - a web & app development studio featuring a white & gold luxury theme with robotic AI animations.

## 🚀 Features

- **Modern Design**: White & gold luxury theme with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Elements**: 
  - Custom cursor with lagging ring effect
  - Robotic AI figure animations using Three.js
  - Infinite scrolling services loop
  - Scroll reveal animations
  - Animated counters
  - Parallax effects
- **Contact Page**: Full-featured contact form with validation
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Performance**: Optimized assets and lazy loading

## 📁 Project Structure

```
STIRE-v2/
├── STIRE2/                 # Publish directory
│   ├── index.html         # Main homepage
│   ├── contact.html       # Contact page
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   └── js/
│       ├── main.js        # Main functionality
│       ├── contact-main.js # Contact page functionality
│       ├── contact.js     # Contact form scripts
│       └── robot.js       # Three.js robot animations
├── netlify.toml           # Netlify configuration
└── README.md             # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern CSS with animations and transitions
- **JavaScript**: Vanilla JS for interactions
- **Three.js**: 3D robot animations
- **Google Fonts**: Cinzel, Cormorant Garamond, Jost

## 🚀 Deployment

### Netlify Deployment

1. **Connect Repository**
   - Push your code to GitHub/GitLab/Bitbucket
   - Connect your repository to Netlify

2. **Build Settings**
   - **Publish directory**: `STIRE2`
   - **Build command**: Leave blank (static site)
   - **Environment variables**: Not needed

3. **Domain Settings**
   - Netlify will automatically assign a domain
   - You can add a custom domain in settings

### Manual Deployment

1. **Build the site** (no build process needed for static sites)
2. **Upload the `STIRE2` folder** to your hosting provider
3. **Ensure your server serves `index.html` as the default**

## ⚙️ Configuration

The `netlify.toml` file includes:
- Build settings (publish directory)
- Security headers
- Caching strategies for static assets
- URL redirects for clean URLs

## 🎨 Customization

### Brand Colors
Edit the CSS variables in `css/style.css`:
```css
:root {
  --gold:      #c9a84c;   /* Primary gold */
  --gold2:     #e8c96a;   /* Lighter gold */
  --bg:        #fafaf8;   /* Off-white background */
  --ink:       #1a1a14;   /* Primary text */
  --dark:      #0a0a08;   /* Dark sections */
}
```

### Contact Information
Update contact details in:
- `index.html` (footer and CTA section)
- `contact.html` (contact information)
- Email links and social media URLs

### Content
Edit HTML files directly to update:
- Hero section text
- Service descriptions
- Project showcases
- Testimonials
- About section content

## 📱 Mobile Optimization

- Responsive breakpoints at 768px and 968px
- Touch-friendly navigation
- Optimized animations for mobile performance
- Proper viewport meta tags

## 🚀 Performance Features

- Lazy loading for images
- Optimized animations using CSS transforms
- Efficient JavaScript with event delegation
- Proper asset caching headers
- Minimal external dependencies

## 🔧 Development

### Local Development
1. Clone the repository
2. Run a local server:
   ```bash
   python -m http.server 8000
   ```
3. Open `http://localhost:8000/STIRE2/` in your browser

### Git Workflow
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

## 📄 License

© 2025 Ceedd. All rights reserved.

## 🤝 Support

For support or inquiries:
- Email: hello@ceedd.dev
- Phone: +1 (234) 567-890
- Website: [Your Netlify URL]
