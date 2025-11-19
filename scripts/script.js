// 1. Initialize Lenis for Smooth Scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Connect GSAP ScrollTrigger to Lenis
gsap.registerPlugin(ScrollTrigger);

// 2. Hero Carousel Logic
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
const totalSlides = slides.length;

// Automatically change slide every 5 seconds
setInterval(() => {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % totalSlides;
  slides[currentSlide].classList.add("active");
}, 5000);

// 3. Hamburger Menu Animation
const hamburger = document.querySelector(".hamburger-menu");
const mobileNav = document.querySelector(".mobile-nav-overlay");
const mobileLinks = document.querySelectorAll(".mobile-links a");

let isMenuOpen = false;
const menuTimeline = gsap.timeline({ paused: true });

menuTimeline
  .to(mobileNav, {
    opacity: 1,
    pointerEvents: "all",
    duration: 0.4,
    ease: "power2.out",
  })
  .to(
    mobileLinks,
    {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.4,
      ease: "power2.out",
    },
    "-=0.2"
  );

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active"); // Animates the X via CSS

  // if (!isMenuOpen) {
  //   menuTimeline.play();
  //   lenis.stop(); // Stop scrolling when menu is open
  // } else {
  //   menuTimeline.reverse();
  //   lenis.start();
  // }
  // isMenuOpen = !isMenuOpen;

  if (hamburger.classList.contains("active")) {
    menuTimeline.play(); // Open
    lenis.stop(); // Disable Page Scroll
  } else {
    menuTimeline.reverse(); // Close
    lenis.start(); // Enable Page Scroll
  }
});

// Close menu when a link is clicked
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    menuTimeline.reverse();
    // isMenuOpen = false;
    lenis.start();
  });
});

// 4. Page Animations (ScrollTrigger)

// Hero Text Reveal
gsap.from(".reveal-text", {
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
  delay: 0.5,
});

// Stats Counter Animation
const stats = document.querySelectorAll(".counter");
stats.forEach((stat) => {
  const target = +stat.getAttribute("data-target");

  ScrollTrigger.create({
    trigger: stat,
    start: "top 85%",
    once: true,
    onEnter: () => {
      gsap.to(stat, {
        innerHTML: target,
        duration: 2,
        snap: { innerHTML: 1 },
        ease: "power1.inOut",
      });
    },
  });
});

// About Section: Image moves left, Text moves right
gsap.from(".gs-reveal-left", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 80%",
  },
  x: -100,
  opacity: 0,
  duration: 1,
  ease: "power2.out",
});

gsap.from(".gs-reveal-right", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 80%",
  },
  x: 100,
  opacity: 0,
  duration: 1,
  delay: 0.2,
  ease: "power2.out",
});

// Project Cards Staggered Fade Up
gsap.utils.toArray(".gs-fade-up").forEach((elem, i) => {
  gsap.from(elem, {
    scrollTrigger: {
      trigger: elem,
      start: "top 90%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });
});

// Gallery Items Pop In
gsap.from(".gallery-item", {
  scrollTrigger: {
    trigger: "#gallery",
    start: "top 75%",
  },
  scale: 0.8,
  opacity: 0,
  stagger: 0.1,
  duration: 0.6,
  ease: "back.out(1.7)",
});

// Refresh ScrollTrigger when Lenis updates (ensures sync)
lenis.on("scroll", ScrollTrigger.update);
