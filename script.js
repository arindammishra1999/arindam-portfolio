    function toggleMenu(){
        const menu = document.querySelector(".menu-links");
        const icon = document.querySelector(".hamburger-icon");
        menu.classList.toggle("open");
        icon.classList.toggle("open");
    }

    document.querySelectorAll('.color').forEach(el => {
        el.addEventListener('mouseover', () => {
            el.classList.add('held');
        });
        el.addEventListener('mouseout', () => {
            setTimeout(() => {
                el.classList.remove('held');
            }, 2000);
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        const colorElements = document.querySelectorAll('h1.title .color, .logo .color');
    
        colorElements.forEach(element => {
            element.classList.add('held');
        });
    
        setTimeout(() => {
            colorElements.forEach(element => {
                element.classList.remove('held');
            });
        }, 1700);
    });

    function checkScreenWidth() {
        const picContainer1 = document.querySelector('.section_pic-container_1');
        const picContainer2 = document.querySelector('.section_pic-container_2');
        if (window.innerWidth <= 1310) {
            picContainer1.style.display = 'none';
            picContainer2.style.display = 'block';
        } else {
            picContainer1.style.display = 'block';
            picContainer2.style.display = 'none';
        }
    }

    window.addEventListener('resize', checkScreenWidth);
    window.addEventListener('load', checkScreenWidth);

    // Add this to your existing scripts.js

// Create a colorful cursor trail effect
document.addEventListener('DOMContentLoaded', () => {
    const colors = ['#00FFBB', '#fd00b1', '#00B2FF', '#FF5266', '#FF993A'];
    const body = document.querySelector('body');
    let cursorTrail = [];
    const maxTrailLength = 100; // Number of particles to create
    
    // Create cursor trail container
    const trailContainer = document.createElement('div');
    trailContainer.className = 'cursor-trail-container';
    trailContainer.style.position = 'fixed';
    trailContainer.style.top = '0';
    trailContainer.style.left = '0';
    trailContainer.style.width = '100%';
    trailContainer.style.height = '100%';
    trailContainer.style.pointerEvents = 'none';
    trailContainer.style.zIndex = '9999';
    trailContainer.style.overflow = 'hidden';
    body.appendChild(trailContainer);
    
    // Create particle elements for cursor trail
    for (let i = 0; i < maxTrailLength; i++) {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        particle.style.position = 'absolute';
        particle.style.width = '20px';
        particle.style.height = '20px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.opacity = '0';
        particle.style.transform = 'translate(-50%, -50%)';
        particle.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        trailContainer.appendChild(particle);
        cursorTrail.push(particle);
    }
    
    // Track mouse movement and create trail effect
    document.addEventListener('mousemove', (e) => {
        // Create a new particle at cursor position
        const particle = cursorTrail.shift();
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        particle.style.opacity = '0.8';
        particle.style.transform = `translate(-50%, -50%) scale(${Math.random() * 1.5 + 0.5})`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Add a blast effect occasionally
        if (Math.random() > 0.9) {
            createBlast(e.clientX, e.clientY);
        }
        
        // Fade out the particle
        setTimeout(() => {
            particle.style.opacity = '0';
            particle.style.transform = 'translate(-50%, -50%) scale(0.2)';
        }, 100);
        
        // Put particle back in queue
        cursorTrail.push(particle);
    });
    
    // Create blast effect function
    function createBlast(x, y) {
        for (let i = 0; i < 8; i++) {
            const blast = document.createElement('div');
            blast.className = 'cursor-blast';
            blast.style.position = 'absolute';
            blast.style.width = '5px';
            blast.style.height = '5px';
            blast.style.borderRadius = '50%';
            blast.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            blast.style.left = `${x}px`;
            blast.style.top = `${y}px`;
            blast.style.opacity = '0.8';
            blast.style.transform = 'translate(-50%, -50%)';
            blast.style.pointerEvents = 'none';
            trailContainer.appendChild(blast);
            
            // Random direction and distance
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 50 + 20;
            const destX = Math.cos(angle) * distance;
            const destY = Math.sin(angle) * distance;
            
            // Animate the blast particle
            setTimeout(() => {
                blast.style.transition = 'all 0.8s ease-out';
                blast.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(${Math.random() + 0.5})`;
                blast.style.opacity = '0';
            }, 10);
            
            // Remove blast particle after animation
            setTimeout(() => {
                blast.remove();
            }, 800);
        }
    }
});


/* ===== Polish: scroll reveal, count-up numbers, rotating role line ===== */
(function () {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasIO = 'IntersectionObserver' in window;

    // --- 1. scroll reveal ---
    if (!reduce && hasIO) {
        const targets = document.querySelectorAll(
            'section:not(#profile) .section_text_p1, section:not(#profile) h1.title, ' +
            '.details-container, .text-container, .contact-info-upper-container'
        );
        const io = new IntersectionObserver((entries) => {
            entries.forEach((en) => {
                if (!en.isIntersecting) return;
                const el = en.target;
                io.unobserve(el);
                el.classList.add('in');
                const done = () => { el.classList.remove('reveal', 'in'); el.style.transitionDelay = ''; };
                el.addEventListener('transitionend', (e) => { if (e.propertyName === 'transform') done(); }, { once: true });
                setTimeout(done, 1800);   // safety net if transitionend never fires
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
        const seen = new Map();
        targets.forEach((el) => {
            const parent = el.parentElement, n = seen.get(parent) || 0;
            seen.set(parent, n + 1);
            el.classList.add('reveal');
            el.style.transitionDelay = Math.min(n, 4) * 90 + 'ms';   // stagger siblings
            io.observe(el);
        });
    }

    // --- 3. count-up numbers (wrapped in <strong> in the experience bullets) ---
    if (!reduce && hasIO) {
        const nums = [];
        document.querySelectorAll('.exp-bullets strong').forEach((el) => {
            const m = el.textContent.trim().match(/^(\d+(?:\.\d+)?)(\D*)$/);
            if (!m) return;
            const final = el.textContent;
            const span = document.createElement('span');
            span.className = 'count';
            span.textContent = final;
            el.textContent = '';
            el.appendChild(span);
            span.style.minWidth = span.getBoundingClientRect().width + 'px';   // stop text re-wrapping while counting
            span.dataset.final = final;
            span.dataset.n = m[1];
            span.dataset.suffix = m[2];
            span.textContent = '0' + m[2];
            nums.push(span);
        });
        const cio = new IntersectionObserver((entries) => {
            entries.forEach((en) => {
                if (!en.isIntersecting) return;
                const el = en.target; cio.unobserve(el);
                const end = parseFloat(el.dataset.n), suffix = el.dataset.suffix, t0 = performance.now(), dur = 1400;
                (function tick(now) {
                    const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
                    el.textContent = Math.round(end * e) + suffix;
                    if (k < 1) requestAnimationFrame(tick); else el.textContent = el.dataset.final;
                })(t0);
            });
        }, { threshold: 0.6 });
        nums.forEach((n) => cio.observe(n));
    }

    // --- 4. rotating role line ---
    const role = document.querySelector('.section_text_p2');
    if (role && !reduce) {
        const phrases = ['Software developer', 'AI & LLM builder', 'Full-stack engineer'];
        const order = [3, 1, 2, 4, 5];
        const hoverHold = (el) => {
            el.addEventListener('mouseover', () => el.classList.add('held'));
            el.addEventListener('mouseout', () => setTimeout(() => el.classList.remove('held'), 2000));
        };
        const render = (text) => {
            role.textContent = '';
            [...text].forEach((ch, i) => {
                const s = document.createElement('span');
                s.className = ch === ' ' ? 'color color-space' : 'color color-' + order[i % order.length];
                s.textContent = ch;
                if (ch !== ' ') hoverHold(s);
                role.appendChild(s);
            });
        };
        let i = 0;
        setInterval(() => {
            if (document.hidden) return;
            role.classList.add('swap');
            setTimeout(() => { i = (i + 1) % phrases.length; render(phrases[i]); role.classList.remove('swap'); }, 320);
        }, 3000);
    }
})();
