document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const bar = document.querySelectorAll('.bar');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');

        // Animate hamburger
        if (mobileMenu.classList.contains('active')) {
            bar[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bar[1].style.opacity = '0';
            bar[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bar[0].style.transform = 'none';
            bar[1].style.opacity = '1';
            bar[2].style.transform = 'none';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            bar[0].style.transform = 'none';
            bar[1].style.opacity = '1';
            bar[2].style.transform = 'none';
        });
    });

    // 2. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Observe sections for general fade-in
    const sections = document.querySelectorAll('.section-title, .about-grid, .service-card, .portfolio-item, .testimonial-card, .contact-box');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // 3. Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });

    // 4. Modal Logic
    const modal = document.getElementById('projectModal');
    const closeModal = document.querySelector('.close-modal');
    const viewBtns = document.querySelectorAll('.view-btn');

    // Modal Content Elements
    const modalTitle = document.querySelector('.modal-title');
    const modalDesc = document.querySelector('.modal-desc');
    const modalImage = document.querySelector('.modal-image');
    const modalTools = document.querySelector('.modal-tools');
    const modalClient = document.querySelector('.modal-client');

    // Mock Data for Projects
    const projectData = {
        1: {
            title: "Minimalist Coffee Brand",
            desc: "A complete brand identity for a new specialty coffee shop in Melbourne. The goal was to create a clean, modern, and inviting visual language that reflects the premium quality of the beans.",
            tools: "Illustrator, Photoshop",
            client: "Brew & Co.",
            color: "#ff9a9e"
        },
        2: {
            title: "Fashion Sale Campaign",
            desc: "Social media creative suite for a summer fashion sale. Focused on vibrant colors and bold typography to drive engagement and clicks.",
            tools: "Photoshop, Figma",
            client: "Urban Style",
            color: "#a18cd1"
        },
        3: {
            title: "Music Festival Poster",
            desc: "Poster design for an indie music festival. Used abstract shapes and retro textures to capture the vibe of the event.",
            tools: "Illustrator, InDesign",
            client: "Indie Fest 2024",
            color: "#fad0c4"
        },
        4: {
            title: "Tech Startup Logo",
            desc: "Logo and brand guidelines for a fintech startup. The symbol represents growth and security, using a modern geometric approach.",
            tools: "Illustrator",
            client: "FinGrow",
            color: "#84fab0"
        },
        5: {
            title: "Fitness App Promo",
            desc: "Instagram stories and post templates for a fitness application launch. High energy visuals with clear call-to-actions.",
            tools: "Figma, Photoshop",
            client: "FitLife App",
            color: "#fccb90"
        },
        6: {
            title: "Art Exhibition Flyer",
            desc: "Promotional flyer for a modern art gallery opening. Minimalist layout with focus on typography and negative space.",
            tools: "InDesign",
            client: "Modern Art Gallery",
            color: "#e0c3fc"
        }
    };

    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling to item click
            const item = btn.closest('.portfolio-item');
            const id = item.getAttribute('data-id');
            const data = projectData[id];

            if (data) {
                modalTitle.textContent = data.title;
                modalDesc.textContent = data.desc;
                modalTools.textContent = data.tools;
                modalClient.textContent = data.client;
                modalImage.style.backgroundColor = data.color;

                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Disable scroll
            }
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Enable scroll
    });

    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});
