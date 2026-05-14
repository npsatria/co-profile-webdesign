import gsap from 'gsap';
import Lenis from 'lenis';
import TypeIt from 'typeit';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        wrapper: document.querySelector('.view-container'),
        content: document.querySelector('#data-wrapper')
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
    
    function resetViews() {
        dataWrapper.className = ''; 
        cards.forEach(card => {
            gsap.killTweensOf(card);
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
            dataWrapper.classList.add('view-mode-feed');
        } 
        else if (viewName === 'slideshow') {
            dataWrapper.classList.add('view-mode-slideshow');
        } 
        else if (viewName === 'freeform') {
            dataWrapper.classList.add('view-mode-freeform');
            
            const containerEl = document.querySelector('.view-container');
            const containerWidth = containerEl.clientWidth;
            const containerHeight = Math.max(window.innerHeight, 800); // Minimum height to scatter

            cards.forEach((card, index) => {
                // Calculate safe random boundaries
                const cardWidth = window.innerWidth < 768 ? (window.innerWidth * 0.7) : 384; 
                const maxX = Math.max(20, containerWidth - cardWidth - 40);
                const randomX = gsap.utils.random(20, maxX);
                const randomY = gsap.utils.random(50, containerHeight - 300);
                const randomRot = gsap.utils.random(-15, 15);
                
                gsap.set(card, {
                    left: `${randomX}px`,
                    top: `${randomY}px`,
                    rotation: randomRot,
                    zIndex: index
                });

                card.addEventListener('mouseenter', () => {
                    if(dataWrapper.classList.contains('view-mode-freeform')) {
                        gsap.to(card, { zIndex: 100, scale: 1.05, duration: 0.3 });
                    }
                });
                card.addEventListener('mouseleave', () => {
                    if(dataWrapper.classList.contains('view-mode-freeform')) {
                        gsap.to(card, { zIndex: index, scale: 1, duration: 0.3 });
                    }
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
