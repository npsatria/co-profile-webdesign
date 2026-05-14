import gsap from 'gsap';
import Lenis from 'lenis';
import Swiper from 'swiper';
import TypeIt from 'typeit';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. TypeIt Animation for Background Text
    new TypeIt("#bg-text-anim", {
        strings: ["ATREM PROJECT", "DIGITALISASI", "TANPA HENTI"],
        speed: 50,
        waitUntilVisible: true,
        loop: true,
        breakLines: false,
        nextStringDelay: 2000,
        deleteSpeed: 30
    }).go();

    // 3. View Management
    const navBtns = document.querySelectorAll('.nav-btn[data-view]');
    const dataWrapper = document.getElementById('data-wrapper');
    const cards = document.querySelectorAll('.card-wrapper');
    const dataCards = document.querySelectorAll('.data-card');
    
    let swiperInstance = null;

    function resetViews() {
        // Destroy swiper if exists
        if (swiperInstance) {
            swiperInstance.destroy(true, true);
            swiperInstance = null;
        }

        // Remove all view classes
        dataWrapper.className = 'swiper-wrapper'; 
        
        // Reset card inline styles from freeform/gsap
        cards.forEach(card => {
            gsap.set(card, { clearProps: "all" });
        });
        dataCards.forEach(card => {
            gsap.set(card, { clearProps: "all" });
        });
    }

    function initView(viewName) {
        resetViews();

        navBtns.forEach(btn => {
            if (btn.dataset.view === viewName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        if (viewName === 'grid') {
            dataWrapper.classList.add('view-mode-grid');
        } 
        else if (viewName === 'feed') {
            // Feed is just a single column centered
            dataWrapper.classList.add('flex', 'flex-col', 'gap-12', 'items-center', 'max-w-4xl', 'mx-auto');
            cards.forEach(card => {
                card.classList.add('w-full', 'aspect-video');
                card.querySelector('.data-card').classList.add('w-full', 'h-full', 'rounded-sm');
            });
        } 
        else if (viewName === 'slideshow') {
            dataWrapper.classList.add('view-mode-slideshow');
            // Initialize Swiper
            swiperInstance = new Swiper('.mySwiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                grabCursor: true,
                loop: true,
                centeredSlides: true,
            });
        } 
        else if (viewName === 'freeform') {
            dataWrapper.classList.add('view-mode-freeform');
            
            // Scatter cards randomly
            const containerWidth = window.innerWidth;
            const containerHeight = window.innerHeight;

            cards.forEach((card, index) => {
                const cardEl = card.querySelector('.data-card');
                // Random position within 10% to 70% of screen to keep them mostly visible
                const randomX = gsap.utils.random(10, 60);
                const randomY = gsap.utils.random(15, 60);
                const randomRot = gsap.utils.random(-15, 15);
                
                gsap.set(card, {
                    position: 'absolute',
                    left: `${randomX}%`,
                    top: `${randomY}%`,
                    rotation: randomRot,
                    zIndex: index
                });

                // Simple drag-to-front interaction
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, { zIndex: 100, scale: 1.05, duration: 0.3 });
                });
                card.addEventListener('mouseleave', () => {
                    gsap.to(card, { zIndex: index, scale: 1, duration: 0.3 });
                });
            });
        }
    }

    // Event Listeners for Nav Buttons
    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const view = e.target.dataset.view;
            if (view) initView(view);
        });
    });

    // Initial View
    initView('grid');
});
