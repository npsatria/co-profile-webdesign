import "../css/style.css";
import { createIcons, icons } from "lucide";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TypeIt from "typeit";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";

// 1. Initialize Lucide Icons
createIcons({ icons });

// 2. Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 3. Initialize Lenis (Smooth Scroll)
const lenis = new Lenis({
  autoRaf: true, // Automatically handles requestAnimationFrame
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

// Sync Lenis with GSAP ScrollTrigger
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Run scripts after DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // 4. Initialize TypeIt (Hero Section)
  new TypeIt("#hero-typeit", {
    strings: ["PROJECT.", "STUDIO.", "AGENCY."],
    speed: 120,
    breakLines: false,
    loop: true,
    nextStringDelay: 2500,
    deleteSpeed: 80,
    waitUntilVisible: true,
  }).go();

  // 5. Initialize Swiper (Side Quests)
  const questSwiper = new Swiper(".quest-swiper", {
    modules: [Navigation],
    slidesPerView: 1,
    grabCursor: true,
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  // 6. GSAP Animations (Replaces AOS)

  // Header / Navbar animation
  gsap.from("header", {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
  });

  // Hero Section Elements
  gsap.from("#hero h1", {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out",
    delay: 0.2,
  });

  gsap.from("#hero p, #hero i", {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.2,
    delay: 0.8,
  });

  // About Section (Reveal effect)
  const revealElements = document.querySelectorAll(".gsap-reveal");
  revealElements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse", // Reverses animation when scrolling up
      },
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });
  });

  // Skills Section (Staggered Grid)
  gsap.from(".gsap-skill", {
    scrollTrigger: {
      trigger: "#skills",
      start: "top 75%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.15,
  });

  // Projects Section (Staggered List)
  const projects = document.querySelectorAll("#projects .group");
  gsap.from(projects, {
    scrollTrigger: {
      trigger: "#projects",
      start: "top 80%",
    },
    x: -30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.15,
  });
});
