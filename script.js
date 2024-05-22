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
    

