# Politician Portfolio Website

A modern, responsive politician portfolio website built with HTML, CSS, and JavaScript featuring smooth scrolling animations, image sliders, and fully responsive design.

## Features

### 🎨 Design & Styling

- **Color Scheme**: Dark (#151F26) and White (#FFFFFF)
- **Modern UI**: Gradient accents, smooth transitions, and polished interactions
- **Professional Layout**: Clean, organized sections with proper spacing

### 📱 Responsive Design

- **Desktop (1200px)**: Full layout with all navigation visible
- **Tablet (720px)**: Hamburger menu activation with slide animations
- **Mobile (420px)**: Optimized touch-friendly interface

### ✨ Key Features

#### 1. **Header & Navigation**

- Logo with gradient background on the left side
- Navigation menu on the right (About, Photos, Videos, Campaign, Contact)
- Hamburger menu for screens under 720px
- Smooth hamburger animation with menu slide-in effect
- Sticky header with blur backdrop effect

#### 2. **Hero Section with Image Slider**

- Full-screen image carousel with 5 images
- Smooth fade-in/fade-out transitions
- Previous/Next navigation buttons
- Interactive dot indicators
- Auto-play with 5-second intervals (pause on hover)
- Animated slide titles and descriptions

#### 3. **Additional Sections**

**About Section**

- Two-column layout with text and image
- Hover effects on images
- CTA button with animations

**Photo Gallery**

- 4-column grid (responsive)
- Gallery overlays with hover animations
- Lazy image loading

**Videos Section**

- 3-column grid with video thumbnails
- Play button overlays with hover effects
- Card hover animations

**Campaign Section**

- 5 key promises with numbered badges
- Campaign imagery with parallax effects
- Campaign support CTA

**Contact Section**

- Contact information with icons
- Fully functional contact form
- Social media links with hover effects
- Form validation and submission handling

### 🎬 Animation & Interactions

#### GSAP Animations

- Scroll-triggered fade-in animations for sections
- Parallax effects on images
- Smooth button hover and click animations
- Staggered gallery item animations
- Form submission animations

#### Locomotive Scroll Integration

- Smooth scrolling across all devices
- Scroll-speed variations for parallax effects
- ScrollTrigger synchronization for precise animations

#### Button Interactions

- Scale up on hover
- Scale down on click
- Smooth transitions with ease functions

#### Hamburger Menu

- Smooth transform animation
- Slide-down menu animation
- Staggered link animations

### ⚡ Performance Optimizations

#### Lazy Loading

- Native HTML `loading="lazy"` attribute
- IntersectionObserver API for progressive image loading
- 200px margin for pre-loading images on scroll

#### Code Optimization

- Minified CDN resources
- Efficient event listeners
- RequestAnimationFrame for smooth animations
- No unnecessary DOM manipulation

### 🔧 Technical Stack

**Frontend Technologies:**

- HTML5
- CSS3 (with custom properties, gradients, animations)
- Vanilla JavaScript (ES6+)

**Libraries:**

- **GSAP 3.12.2** - Advanced animations and scroll effects
- **ScrollTrigger** - Scroll-based animations
- **Locomotive Scroll 4.1.4** - Smooth scrolling engine

### 📦 File Structure

```
Politician-Page/
├── index.html          # Main website (all-in-one file)
├── README.md          # Documentation
└── .git/             # Git repository
```

### 🚀 How to Use

1. **Open the Website**

   - Open `index.html` in any modern web browser
   - Works on Chrome, Firefox, Safari, and Edge

2. **Navigation**

   - Click on menu items to navigate to sections
   - Use the hamburger menu on mobile devices
   - Mobile menu closes automatically after selection

3. **Image Slider**

   - Navigate with Previous/Next buttons
   - Click on dot indicators to jump to specific slides
   - Autoplay pauses on hover

4. **Contact Form**
   - Fill in your name, email, and message
   - Click "Send Message" to submit
   - Form validates required fields automatically

### 🎯 Sections Breakdown

| Section  | Type        | Features                       |
| -------- | ----------- | ------------------------------ |
| Header   | Navigation  | Logo, Menu, Hamburger (mobile) |
| Hero     | Slider      | 5 images, auto-play, controls  |
| About    | Content     | Two-column layout, CTA         |
| Photos   | Gallery     | 4-item grid, overlays          |
| Videos   | Grid        | 3 video cards, play buttons    |
| Campaign | Content     | 5 promises, numbered badges    |
| Contact  | Form & Info | Contact details, form, social  |
| Footer   | Footer      | Copyright info                 |

### 📱 Responsive Breakpoints

```css
/* Desktop (1200px+) */
- Full navigation visible
- Multi-column layouts
- All animations active

/* Tablet (720px - 1199px) */
- Hamburger menu active
- 2-3 column grids
- Adjusted spacing

/* Mobile (420px - 719px) */
- Single column layouts
- Hamburger menu
- Touch-optimized buttons

/* Small Mobile (< 420px) */
- Extreme spacing optimization
- Single column everything
- Extra-large touch targets
```

### 🎨 Customization

#### Colors

Modify the CSS variables in the `<style>` section:

```css
:root {
  --bg: #151f26; /* Dark background */
  --fg: #ffffff; /* White text */
  --accent: #2e7ba7; /* Blue accent */
}
```

#### Images

Replace image URLs in the HTML with your own:

- Hero slider images (5 images)
- About section image
- Gallery images (4 images)
- Video thumbnails (3 images)
- Campaign section image

#### Content

Edit text content directly in the HTML:

- Section titles and descriptions
- Campaign promises
- Contact information
- Form placeholder text

### ⚙️ Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

### 📝 Notes

- All images load lazily for better performance
- Smooth scrolling works seamlessly across devices
- Animations use GPU acceleration for better performance
- Form submission is currently a demo (shows alert)
- To use real form submission, integrate with a backend service or email service (Formspree, Netlify Forms, etc.)

### 🔐 Security

- All external resources loaded from CDNs
- No sensitive data stored client-side
- Form inputs validated before submission

### 📧 Support & Contact

For modifications or support with the website, contact the developer.

---

**Last Updated**: November 13, 2025
**Version**: 1.0
