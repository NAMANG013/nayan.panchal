document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover effects for cursor
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card, .blog-card');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            });

            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.backgroundColor = 'transparent';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = navLinks.style.display === 'none' || navLinks.style.display === '';
            navLinks.style.display = isHidden ? 'flex' : 'none';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = '#0a0a0a';
            navLinks.style.padding = '2rem';
            navLinks.style.textAlign = 'center';
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close mobile menu if open
                if (window.innerWidth <= 768 && navLinks) {
                    navLinks.style.display = 'none';
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.project-card, .service-card, .blog-card, .about-text, .about-image, .contact-info, .contact-form, .timeline-item');

    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulate form submission
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;

            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = originalText;
                btn.disabled = false;

                // Success simulation
                formMessage.textContent = "Thank you! Your message has been sent successfully.";
                formMessage.className = "form-message success";
                contactForm.reset();

                // Clear message after 5 seconds
                setTimeout(() => {
                    formMessage.textContent = "";
                    formMessage.className = "form-message";
                }, 5000);
            }, 1500);
        });
    }
    // Blog Load More
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const originalText = loadMoreBtn.innerText;
            loadMoreBtn.innerText = 'Loading...';
            loadMoreBtn.disabled = true;

            setTimeout(() => {
                loadMoreBtn.innerText = 'No more articles';
                loadMoreBtn.style.backgroundColor = '#333';
                loadMoreBtn.style.borderColor = '#333';
                loadMoreBtn.style.color = '#888';
                loadMoreBtn.style.cursor = 'not-allowed';
            }, 1000);
        });
    }
});
