// ===================== INITIALIZATION =====================

// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  multiplier: 1.0,
  class: "is-reveal",
});

// Sync ScrollTrigger with Locomotive Scroll
scroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("[data-scroll-container]", {
  scrollTop(value) {
    return arguments.length
      ? scroll.scrollTo(value, 0, 0)
      : scroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.querySelector("[data-scroll-container]").style.transform
    ? "transform"
    : "fixed",
});

ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();

// ===================== NAVIGATION =====================

const hamburger = document.getElementById("hamburger");
const mobileNavMenu = document.getElementById("mobileNavMenu");
const mobileLinks = document.querySelectorAll(".mobile-nav-link");
let menuOpen = false;

function toggleMenu() {
  menuOpen = !menuOpen;
  hamburger.classList.toggle("active");

  if (menuOpen) {
    mobileNavMenu.classList.add("active");
    gsap.fromTo(
      ".mobile-nav-link",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: "power2.out" }
    );
  } else {
    gsap.to(".mobile-nav-link", {
      x: -20,
      opacity: 0,
      stagger: 0.04,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        mobileNavMenu.classList.remove("active");
      },
    });
  }
}

hamburger.addEventListener("click", toggleMenu);

// Close menu when link is clicked
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (menuOpen) toggleMenu();
  });
});

// Close menu when clicking on nav links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (menuOpen) toggleMenu();
  });
});

// ===================== IMAGE SLIDER =====================

const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("dotsContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentSlide = 0;
let autoplayInterval;

// Create dots
slides.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.className = "dot";
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function goToSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");

  currentSlide = index;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  goToSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  goToSlide(currentSlide);
}

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetAutoplay();
});

nextBtn.addEventListener("click", () => {
  nextSlide();
  resetAutoplay();
});

// Autoplay slider
function startAutoplay() {
  autoplayInterval = setInterval(nextSlide, 5000);
}

function resetAutoplay() {
  clearInterval(autoplayInterval);
  startAutoplay();
}

slider.addEventListener("mouseenter", () => clearInterval(autoplayInterval));
slider.addEventListener("mouseleave", startAutoplay);

startAutoplay();

// ===================== LAZY LOADING =====================

const lazyImages = document.querySelectorAll('img[loading="lazy"]');

if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: "200px",
    }
  );

  lazyImages.forEach((img) => imageObserver.observe(img));
}

// ===================== SCROLL ANIMATIONS =====================

gsap.registerPlugin(ScrollTrigger);

// Animate sections on scroll
const sections = document.querySelectorAll("section");
sections.forEach((section) => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      scroller: "[data-scroll-container]",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out",
  });
});

// Gallery item animations
const galleryItems = document.querySelectorAll(".gallery-item");
galleryItems.forEach((item, index) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      scroller: "[data-scroll-container]",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    scale: 0.9,
    duration: 0.6,
    delay: index * 0.1,
    ease: "back.out",
  });
});

// Video card animations
const videoCards = document.querySelectorAll(".video-card");
videoCards.forEach((card, index) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      scroller: "[data-scroll-container]",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay: index * 0.1,
    ease: "power2.out",
  });
});

// ===================== BUTTON ANIMATIONS =====================

const buttons = document.querySelectorAll(".cta-button");
buttons.forEach((button) => {
  button.addEventListener("mouseenter", function () {
    gsap.to(this, { scale: 1.05, duration: 0.2, ease: "power2.out" });
  });

  button.addEventListener("mouseleave", function () {
    gsap.to(this, { scale: 1, duration: 0.2, ease: "power2.out" });
  });

  button.addEventListener("mousedown", function () {
    gsap.to(this, { scale: 0.98, duration: 0.1 });
  });

  button.addEventListener("mouseup", function () {
    gsap.to(this, { scale: 1.05, duration: 0.1 });
  });
});

// ===================== FORM SUBMISSION =====================

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    gsap.to(this, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => {
        alert("Thank you for reaching out! We will get back to you soon.");
        this.reset();
        gsap.fromTo(
          this,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3 }
        );
      },
    });
  });
}

// ===================== PARALLAX ANIMATIONS =====================

// Parallax for about image
const aboutImage = document.querySelector(".about-image");
if (aboutImage) {
  gsap.to(aboutImage, {
    scrollTrigger: {
      trigger: aboutImage,
      scroller: "[data-scroll-container]",
      start: "top center",
      end: "bottom center",
      scrub: 1,
    },
    y: -50,
    ease: "none",
  });
}

// Parallax for campaign image
const campaignImage = document.querySelector(".campaign-image");
if (campaignImage) {
  gsap.to(campaignImage, {
    scrollTrigger: {
      trigger: campaignImage,
      scroller: "[data-scroll-container]",
      start: "top center",
      end: "bottom center",
      scrub: 1,
    },
    y: -40,
    ease: "none",
  });
}
