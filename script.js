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
    

