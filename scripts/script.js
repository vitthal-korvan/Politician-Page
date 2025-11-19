// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

/* ----------------------------------
   LOCOMOTIVE SCROLL + SCROLLTRIGGER
---------------------------------- */
const scrollContainer = document.querySelector("[data-scroll-container]");

const locoScroll = new LocomotiveScroll({
  el: scrollContainer,
  smooth: true,
  smoothMobile: true,
  smartphone: { smooth: true },
  tablet: { smooth: true },
});

locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(scrollContainer, {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: scrollContainer.style.transform ? "transform" : "fixed",
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

/* ----------------------------------
   GSAP ANIMATIONS (ENTRANCE)
---------------------------------- */
const animatedElements = document.querySelectorAll("[data-animate]");

animatedElements.forEach((el) => {
  const type = el.dataset.animate || "fade-up";
  const delay = parseFloat(el.dataset.animateDelay || "0");

  const base = {
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
    delay,
  };

  if (type === "fade-up") base.y = 40;
  if (type === "fade-down") base.y = -30;
  if (type === "fade-left") base.x = 40;
  if (type === "fade-right") base.x = -40;
  if (type === "fade-scale") base.scale = 0.9;

  gsap.from(el, {
    ...base,
    scrollTrigger: {
      trigger: el,
      scroller: scrollContainer,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });
});

// Subtle hero media parallax
gsap.to(".hero-media", {
  yPercent: -6,
  scrollTrigger: {
    trigger: ".hero",
    scroller: scrollContainer,
    scrub: true,
    start: "top bottom",
    end: "bottom top",
  },
});

/* ----------------------------------
   HERO IMAGE CAROUSEL (7 IMAGES)
---------------------------------- */
const track = document.getElementById("heroCarouselTrack");
const slides = Array.from(track.querySelectorAll(".carousel-slide"));
const prevBtn = document.getElementById("carouselPrev");
const nextBtn = document.getElementById("carouselNext");
const dotsContainer = document.getElementById("carouselDots");

let currentIndex = 0;
let carouselAutoPlay;

// Create dots
slides.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.classList.add("carousel-dot");
  if (index === 0) dot.classList.add("is-active");
  dot.setAttribute("data-index", index);
  dotsContainer.appendChild(dot);
});

const dots = Array.from(dotsContainer.querySelectorAll(".carousel-dot"));

function goToSlide(newIndex, direction = 1) {
  if (newIndex === currentIndex || newIndex < 0 || newIndex >= slides.length)
    return;

  const currentSlide = slides[currentIndex];
  const nextSlide = slides[newIndex];

  // Prepare next slide position
  gsap.set(nextSlide, {
    xPercent: 100 * direction,
    opacity: 1,
    pointerEvents: "auto",
  });

  // Animate current slide out
  gsap.to(currentSlide, {
    xPercent: -100 * direction,
    opacity: 0,
    duration: 0.7,
    ease: "power3.inOut",
    onComplete: () => {
      currentSlide.classList.remove("is-active");
      gsap.set(currentSlide, { xPercent: 0, pointerEvents: "none" });
    },
  });

  // Animate next slide in
  gsap.to(nextSlide, {
    xPercent: 0,
    duration: 0.7,
    ease: "power3.inOut",
    onStart: () => {
      nextSlide.classList.add("is-active");
    },
  });

  // Update dots
  dots[currentIndex].classList.remove("is-active");
  dots[newIndex].classList.add("is-active");

  currentIndex = newIndex;
}

function nextSlide() {
  const newIndex = (currentIndex + 1) % slides.length;
  goToSlide(newIndex, 1);
}

function prevSlide() {
  const newIndex = (currentIndex - 1 + slides.length) % slides.length;
  goToSlide(newIndex, -1);
}

// Auto-play
function startAutoPlay() {
  clearInterval(carouselAutoPlay);
  carouselAutoPlay = setInterval(nextSlide, 5000);
}

function stopAutoPlay() {
  clearInterval(carouselAutoPlay);
}

startAutoPlay();

// Events
nextBtn.addEventListener("click", () => {
  stopAutoPlay();
  nextSlide();
  startAutoPlay();
});

prevBtn.addEventListener("click", () => {
  stopAutoPlay();
  prevSlide();
  startAutoPlay();
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const targetIndex = parseInt(dot.getAttribute("data-index"), 10);
    const direction = targetIndex > currentIndex ? 1 : -1;
    stopAutoPlay();
    goToSlide(targetIndex, direction);
    startAutoPlay();
  });
});

// Pause autoplay on hover (desktop)
const heroCarousel = document.querySelector(".hero-carousel");
heroCarousel.addEventListener("mouseenter", stopAutoPlay);
heroCarousel.addEventListener("mouseleave", startAutoPlay);

/* ----------------------------------
   MOBILE MENU (HAMBURGER)
---------------------------------- */
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

const menuTimeline = gsap.timeline({
  paused: true,
  defaults: { ease: "power3.out" },
});

// Initial state
gsap.set(mobileNav, { opacity: 0, pointerEvents: "none" });

menuTimeline
  .to(mobileNav, {
    opacity: 1,
    pointerEvents: "auto",
    duration: 0.4,
  })
  .from(
    ".mobile-nav-links a",
    {
      y: 40,
      opacity: 0,
      stagger: 0.06,
      duration: 0.5,
    },
    "-=0.1"
  )
  .from(
    ".mobile-nav-footer",
    {
      y: 20,
      opacity: 0,
      duration: 0.4,
    },
    "-=0.2"
  );

let menuOpen = false;

function toggleMenu() {
  menuOpen = !menuOpen;
  hamburger.classList.toggle("open", menuOpen);

  if (menuOpen) {
    menuTimeline.play();
  } else {
    menuTimeline.reverse();
  }
}

hamburger.addEventListener("click", toggleMenu);

// Close menu when clicking any mobile nav link
document.querySelectorAll(".mobile-nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (menuOpen) toggleMenu();
  });
});
