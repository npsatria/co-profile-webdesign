import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
    const lenis = new Lenis({
        duration: 1,
        smoothWheel: true,
        easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    gsap.from("[data-hero]", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
    });

    gsap.utils.toArray("[data-reveal]").forEach((element) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 84%",
            },
            y: 36,
            opacity: 0,
            duration: 0.75,
            ease: "power3.out",
        });
    });
}

const navToggle = document.querySelector("[data-nav-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");

if (navToggle && navPanel) {
    navToggle.addEventListener("click", () => {
        const isOpen = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", String(!isOpen));
        navPanel.classList.toggle("is-visible", !isOpen);
    });
}

initFooterPeeps();

function initFooterPeeps() {
    const canvas = document.querySelector("[data-peeps-canvas]");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const sprite = new Image();
    const stage = { width: 0, height: 0, ratio: 1, visibleLeft: 0, visibleRight: 0 };
    const config = {
        src: canvas.dataset.peepsSrc || "/assets/images/open-peeps-sheet.avif",
        columns: 15,
        rows: 7,
    };
    const peeps = [];
    const activePeeps = [];
    const teamPeepIndexes = [
        1, 2, 3, 4, 7, 8, 9,
        11, 12, 14, 18, 20,
        22, 24, 27, 31, 34, 38, 43, 48
    ];
    let resizeFrame = 0;
    let isReady = false;
    let resizeObserver = null;

    class Peep {
        constructor({ image, rect }) {
            this.image = image;
            this.setRect(rect);
            this.x = 0;
            this.y = 0;
            this.baseY = 0;
            this.scale = 1;
            this.direction = 1;
            this.walk = null;
            this.dialogue = null;
        }

        setRect(rect) {
            this.rect = rect;
            this.width = rect[2];
            this.height = rect[3];
            this.drawArgs = [this.image, ...rect, 0, 0, this.width, this.height];
        }

        render(context) {
            context.save();
            context.translate(this.x, this.y);
            context.scale(this.direction * this.scale, this.scale);
            context.drawImage(...this.drawArgs);
            context.restore();
        }
    }

    sprite.onload = () => {
        createPeeps();
        resizeCrowd();
        isReady = true;

        window.addEventListener("resize", scheduleResize);
        observeCanvasSize();

        if (prefersReducedMotion) {
            drawCrowd();
            return;
        }

        gsap.ticker.add(drawCrowd);
    };

    sprite.src = config.src;

    function createPeeps() {
        const frameWidth = sprite.naturalWidth / config.columns;
        const frameHeight = sprite.naturalHeight / config.rows;

        for (let row = 0; row < config.rows; row += 1) {
            for (let column = 0; column < config.columns; column += 1) {
                peeps.push(
                    new Peep({
                        image: sprite,
                        rect: [column * frameWidth, row * frameHeight, frameWidth, frameHeight],
                    }),
                );
            }
        }
    }

    function observeCanvasSize() {
        if (!("ResizeObserver" in window)) return;

        resizeObserver?.disconnect();
        resizeObserver = new ResizeObserver(() => {
            scheduleResize();
        });

        resizeObserver.observe(canvas);
    }

    function scheduleResize() {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(resizeCrowd);
    }

    function resizeCrowd() {
        stage.width = canvas.clientWidth;
        stage.height = canvas.clientHeight;
        stage.ratio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(stage.width * stage.ratio);
        canvas.height = Math.round(stage.height * stage.ratio);

        const rect = canvas.getBoundingClientRect();
        const viewportWidth = document.documentElement.clientWidth;
        stage.visibleLeft = rect.left < 0 ? Math.round(-rect.left) : 0;
        stage.visibleRight = rect.right > viewportWidth ? Math.round(stage.width - (rect.right - viewportWidth)) : stage.width;

        activePeeps.forEach((peep) => peep.walk?.kill());
        activePeeps.length = 0;

        const teamPeeps = getTeamPeeps();
        const crowdCount = Math.min(getCrowdCount(), teamPeeps.length);
        const selectedPeeps = teamPeeps.slice(0, crowdCount);

        selectedPeeps.forEach((peep, index) => {
            resetPeep(peep, index);
            if (prefersReducedMotion) {
                peep.direction = 1;
                peep.x = stage.width * (index / Math.max(crowdCount - 1, 1)) - (peep.width * peep.scale) / 2;
            }
            activePeeps.push(peep);

            if (!prefersReducedMotion) {
                startWalk(peep).progress(Math.random());
            }
        });

        activePeeps.sort((a, b) => a.baseY - b.baseY);

        if (isReady && prefersReducedMotion) {
            drawCrowd();
        }
    }

    function getTeamPeeps() {
        return teamPeepIndexes.map((index) => peeps[index]).filter(Boolean);
    }

    function getCrowdCount() {
        if (stage.width < 480) return 12;
        if (stage.width < 900) return 16;
        if (stage.width < 1280) return 20;
        return 24;
    }

    function getPeepHeight() {
        const cssHeight = Number.parseFloat(getComputedStyle(canvas).getPropertyValue("--peep-height"));

        if (Number.isFinite(cssHeight) && cssHeight > 0) return cssHeight;
        if (stage.width < 480) return 118;
        if (stage.width < 900) return 140;
        return 166;
    }

    function resetPeep(peep, index = null) {
        const depth = gsap.parseEase("power2.in")(Math.random());
        const scale = (getPeepHeight() / peep.height) * random(0.98, 1.04);
        const direction = Number.isFinite(index) ? (index % 2 === 0 ? 1 : -1) : Math.random() > 0.5 ? 1 : -1;
        const width = peep.width * scale;
        const floorCrop = random(52, 76);
        const stackLift = Math.min(getPeepHeight() * 0.025, stage.height * 0.035) * (1 - depth);
        const y = stage.height - peep.height * scale + floorCrop - stackLift;

        peep.direction = direction;
        peep.scale = scale;
        peep.x = direction === 1 ? -width : stage.width + width;
        peep.y = y;
        peep.baseY = y;
        peep.dialogue = null;
    }

    function startWalk(peep) {
        const width = peep.width * peep.scale;
        const targetX = peep.direction === 1 ? stage.width + width : -width;
        const distance = stage.width + width * 2;
        const duration = gsap.utils.clamp(5.5, 13, distance / random(84, 126));

        peep.walk = gsap.timeline({
            onComplete: () => {
                resetPeep(peep);
                startWalk(peep);
            },
        });

        peep.walk.to(peep, { x: targetX, duration, ease: "none" }, 0);
        peep.walk.to(
            peep,
            {
                y: peep.baseY - random(5, 12),
                duration: random(0.16, 0.26),
                repeat: Math.ceil(duration / 0.22),
                yoyo: true,
                ease: "sine.inOut",
            },
            0,
        );

        return peep.walk;
    }

    const chatMessages = [
        // === Bahasa Indonesia (Gen Z Style) ===
        "Magang di Atrem seru parah 🙌",
        "Mentor Atrem baik bgt, no debat",
        "Jujurly capek tp seru bgt magang di Atrem",
        "Dapet real project pas magang di Atrem",
        "Side quest Atrem bikin makin ambis",
        "Slicing-an code Atrem clean parah",
        "UI/UX Atrem fokus ke user experience",
        "Atrem bisa optimasi SEO & web speed jg",
        "Sistem laundry Atrem smooth parah",
        "Kantor Atrem Project adem & estetik bgt",
        "Review Maps Atrem bintang 5 no counter",
        "Vibes kantor Atrem asri bikin betah pol",
        "Lokasi kantor Atrem pas buat fokus coding",
        "Desain 28UI kit Atrem se-unik itu",
        "Web company profile Atrem kece parah",
        "Bimbingan mentor Atrem ngebantu bgt sumpah",
        "Design UI/UX Atrem beneran modern",
        "Belajar bikin reusable component di Tailwind bikin hemat waktu koding pol!",
        "Slicing UI di Atrem beneran diajarin detail dari nol, dari mainan padding-margin sampe responsif layout",
        "Gak cuma FE, sempet dapet task nyoba basic Laravel & bikin simple Point of Sales (POS), gokil!",
        "Mekanisme input data di Laravel ternyata seru juga pas dipelajari di Atrem",
        "Dapet side-quest nyari 50 data agency domestik & luar negeri, puyeng tp nambah insight industri bgt!",

        // === Bahasa Bali (Kasual Anak Muda) ===
        "Saje, magang di Atrem liu maan ilmu",
        "Mentor Atrem ditu ajer lan ramah parah",
        "Melah pesan kantor Atrem-e, adem",
        "Mantap Merta Yoga uling SMK suba gokil 🚀",
        "Jeg jos sistem laundry Atrem-e, sing maen-maen",
        "Desain Porto Atrem simple tp estetik parah",
        "Atrem Project emang patut dadi opsi utama",
        "Nge-slicing sambilang ngopi gen di Atrem",
        "Nge-slicing ngangge Tailwind di Atrem jeg canggih gati, kode-ne dadi reusable component",
        "Sing ja FE dogen, sempet masi mlajah dasar Laravel baang ngae sistem POS, joss bgt",
        "Maan tugas side-quest ngalih 50 data agency, ngedig bayu nanging liu maan relasi anyar",
        "Mlajah ngatur padding ngajak margin ring Atrem, asline puyeng nanging asale pas ring makejang layar HP",

        // === Bahasa Inggris (Gen Z Style) ===
        "Such a friendly mentor at Atrem, love it",
        "Learning UI prototyping at Atrem is a total game changer",
        "Slicing Figma to code at Atrem is so satisfying",
        "Chill but productive vibes at Atrem",
        "Atrem's web build is super fast and responsive",
        "Stunning UI/UX design by Atrem, hands down",
        "5-star rating on Google Maps for Atrem ✨",
        "Such a peaceful office vibe at Atrem Project",
        "Atrem's laundry app flow is so intuitive",
        "Atrem's clean code and fast load, love it",
        "Mastering Tailwind's reusable components here is such a huge flex",
        "Slicing complex responsive layouts here really leveled up my layouting skills",
        "Got a taste of backend with PHP Laravel and built a simple POS app, absolute core memory",
        "Faced a wild side quest tracking down 50 tech agencies, exhausting but high-key rewarding"
    ];

    let globalDialogueTimer = 0;
    const globalDialogueDelay = 90; // Wait 1.5 seconds (90 frames) after a dialogue finishes before triggering the next one

        function drawBubble(context, text, headX, y, direction, opacity) {
        context.save();
        context.globalAlpha = opacity;
        
        context.font = "bold 11px 'Space Mono', 'Urbanist', monospace";
        
        const padX = 10;
        const padY = 6;
        const lineHeight = 14;
        
        // Dynamic max width based on visible screen width (prevent wide bubbles on small screens)
        const visibleWidth = stage.visibleRight - stage.visibleLeft;
        const maxWidth = visibleWidth < 480 ? Math.min(220, visibleWidth - 40) : 260;
        
        // Wrap text
        const words = text.split(" ");
        const lines = [];
        let currentLine = words[0] || "";

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const width = context.measureText(currentLine + " " + word).width;
            if (width < maxWidth) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        if (currentLine) {
            lines.push(currentLine);
        }
        
        // Measure bubble dimensions based on wrapped lines
        let maxLineWidth = 0;
        lines.forEach(line => {
            const w = context.measureText(line).width;
            if (w > maxLineWidth) maxLineWidth = w;
        });
        
        const bubbleW = maxLineWidth + padX * 2;
        const bubbleH = lines.length * lineHeight + padY * 2;
        
        // Clamp bx position to prevent bubbles drawing off visible screen edges
        let bx = headX - bubbleW / 2;
        const minX = stage.visibleLeft + 8;
        const maxX = stage.visibleRight - 8 - bubbleW;
        
        if (bx < minX) {
            bx = minX;
        } else if (bx > maxX) {
            bx = maxX;
        }
        if (maxX < minX) {
            bx = minX + (visibleWidth - bubbleW) / 2;
        }
        
        // The arrow should point directly at headX, but remain connected to the bubble box
        const arrowX = Math.max(bx + 12, Math.min(bx + bubbleW - 12, headX));
        
        let by = y - bubbleH - 12;
        if (by < 6) {
            by = 6; // Clamp to top of canvas to prevent text clipping
        }
        
        // Draw bubble background (rounded rect)
        context.fillStyle = "#ffffff";
        context.strokeStyle = "#25252B";
        context.lineWidth = 1.5;
        
        context.beginPath();
        const radius = 6;
        context.moveTo(bx + radius, by);
        context.lineTo(bx + bubbleW - radius, by);
        context.quadraticCurveTo(bx + bubbleW, by, bx + bubbleW, by + radius);
        context.lineTo(bx + bubbleW, by + bubbleH - radius);
        context.quadraticCurveTo(bx + bubbleW, by + bubbleH, bx + bubbleW - radius, by + bubbleH);
        
        // Draw indicator arrow pointing down at arrowX
        context.lineTo(arrowX + 5, by + bubbleH);
        context.lineTo(arrowX, by + bubbleH + 6);
        context.lineTo(arrowX - 5, by + bubbleH);
        
        context.lineTo(bx + radius, by + bubbleH);
        context.quadraticCurveTo(bx, by + bubbleH, bx, by + bubbleH - radius);
        context.lineTo(bx, by + radius);
        context.quadraticCurveTo(bx, by, bx + radius, by);
        context.closePath();
        
        context.fill();
        context.stroke();
        
        // Draw text lines relative to the clamped bubble box center
        context.fillStyle = "#25252B";
        context.textAlign = "center";
        context.textBaseline = "middle";
        
        const centerX = bx + bubbleW / 2;
        lines.forEach((line, index) => {
            context.fillText(line, centerX, by + padY + index * lineHeight + lineHeight / 2);
        });
        
        context.restore();
    }

    function drawCrowd() {
        ctx.setTransform(stage.ratio, 0, 0, stage.ratio, 0, 0);
        ctx.clearRect(0, 0, stage.width, stage.height);

        // Render all peeps
        activePeeps.forEach((peep) => {
            peep.render(ctx);
        });

        // Manage sequential dialogue spawning (stable sequential trigger)
        const anyoneTalking = activePeeps.some(peep => peep.dialogue);

        if (!anyoneTalking) {
            globalDialogueTimer++;
            if (globalDialogueTimer >= globalDialogueDelay) {
                const visibleWidth = stage.visibleRight - stage.visibleLeft;
                const minFrontDist = Math.min(340, visibleWidth * 0.5);
                const minBackDist = Math.min(120, visibleWidth * 0.25);

                // Find peeps that are currently on screen and have enough space ahead to complete dialogue
                const eligiblePeeps = activePeeps.filter(peep => {
                    const width = peep.width * peep.scale;
                    const headX = peep.x + (peep.direction * width) / 2;
                    
                    const distToFront = peep.direction === 1 ? (stage.visibleRight - headX) : (headX - stage.visibleLeft);
                    const distToBack = peep.direction === 1 ? (headX - stage.visibleLeft) : (stage.visibleRight - headX);
                    
                    return distToFront > minFrontDist && distToBack > minBackDist;
                });

                if (eligiblePeeps.length > 0) {
                    // Choose a random eligible peep
                    const luckyPeep = eligiblePeeps[Math.floor(Math.random() * eligiblePeeps.length)];
                    
                    // Double check proximity to other active dialogue bubbles (safety measure)
                    const hasNearbyDialogue = activePeeps.some(other => 
                        other.dialogue && Math.abs(other.x - luckyPeep.x) < 180
                    );

                    if (!hasNearbyDialogue) {
                        luckyPeep.dialogue = {
                            text: chatMessages[Math.floor(Math.random() * chatMessages.length)],
                            age: 0,
                            duration: 240 // Increased duration: lasts 4 seconds (240 frames)
                        };
                        globalDialogueTimer = 0; // reset delay timer
                    }
                }
            }
        } else {
            // Reset timer while someone is talking so the delay starts *after* they finish
            globalDialogueTimer = 0;
        }

        // Draw active dialogue bubbles
        activePeeps.forEach((peep) => {
            if (peep.dialogue) {
                peep.dialogue.age += 1;

                const width = peep.width * peep.scale;
                const headX = peep.x + (peep.direction * width) / 2;
                const distToEdge = peep.direction === 1 ? (stage.visibleRight - headX) : (headX - stage.visibleLeft);
                
                // Calculate opacity based on age and distance to visible screen edge
                let opacity = 1;
                
                // Fade in at the start
                if (peep.dialogue.age < 15) {
                    opacity = peep.dialogue.age / 15;
                }
                
                // Fade out at the end of duration
                const remainingFrames = peep.dialogue.duration - peep.dialogue.age;
                if (remainingFrames < 15) {
                    opacity = Math.min(opacity, remainingFrames / 15);
                }
                
                // Fade out when getting close to the visible screen edge
                if (distToEdge < 110) {
                    const edgeOpacity = Math.max(0, (distToEdge - 60) / 50);
                    opacity = Math.min(opacity, edgeOpacity);
                }

                if (opacity <= 0 || peep.dialogue.age >= peep.dialogue.duration) {
                    peep.dialogue = null;
                    return;
                }
                
                if (opacity > 0) {
                    const headY = peep.y;
                    drawBubble(ctx, peep.dialogue.text, headX, headY, peep.direction, opacity);
                }
            }
        });
    }



    function random(min, max) {
        return min + Math.random() * (max - min);
    }
}
