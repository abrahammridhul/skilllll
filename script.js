document.addEventListener('DOMContentLoaded', () => {

    // --- Loading Screen ---
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);

    // --- Theme Toggle (Dark Mode) ---
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'light';

    html.setAttribute('data-theme', savedTheme);
    themeToggle.innerText = savedTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.innerText = newTheme === 'dark' ? '☀️' : '🌙';
    });

    // --- Mobile Navigation ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Countdown Timer ---
    const countDownDate = new Date("Jan 23, 2026 09:00:00").getTime();

    const updateCountdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days < 10 ? '0' + days : days;
        document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;

        if (distance < 0) {
            clearInterval(updateCountdown);
            document.querySelector(".countdown-container").innerHTML = "<h3>Event Started!</h3>";
        }
    }, 1000);

    // --- Schedule Tabs ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const scheduleContents = document.querySelectorAll('.schedule-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            scheduleContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const target = btn.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });

    // --- Lightbox for Gallery ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryItems.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.classList.add('active');
            lightboxImg.src = img.src;
        });
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove('active');
        }
    });

    // --- Form Validation & Submit ---
    const regForm = document.getElementById('regForm');
    const inputs = regForm.querySelectorAll('input, select');
    const successMessage = document.getElementById('successMessage');

    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });
        input.addEventListener('input', () => {
            if (input.parentElement.classList.contains('error')) {
                validateInput(input);
            }
        });
    });

    function validateInput(input) {
        const formGroup = input.parentElement;
        const value = input.value.trim();
        let isValid = true;

        if (input.hasAttribute('required') && value === '') {
            isValid = false;
        } else if (input.type === 'email' && value !== '') {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!re.test(value)) isValid = false;
        } else if (input.type === 'tel' && value !== '') {
            if (value.length < 10) isValid = false;
        }

        if (!isValid) {
            formGroup.classList.add('error');
        } else {
            formGroup.classList.remove('error');
        }
        return isValid;
    }

    regForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) isFormValid = false;
        });

        if (isFormValid) {
            const submitBtn = regForm.querySelector('button');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Submitting...';
            submitBtn.disabled = true;

            setTimeout(() => {
                regForm.style.display = 'none';
                successMessage.style.display = 'block';
                successMessage.classList.add('active'); // Trigger reveal if needed
            }, 1500);
        }
    });

    // --- Back to Top ---
    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});
