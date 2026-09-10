document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Toggle for Mobile View
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Add visual-only interface details without altering the portfolio content.
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const availability = document.createElement('div');
        availability.className = 'availability-badge';
        availability.textContent = 'AVAILABLE FOR WORK';
        heroSection.appendChild(availability);
    }

    const hireButton = document.createElement('a');
    hireButton.className = 'hire-float';
    hireButton.href = '#contact';
    hireButton.textContent = 'HIRE ME ↗';
    document.body.appendChild(hireButton);

    const whatsappLink = document.querySelector('a[href="https://wa.me/254712945692"]');
    if (whatsappLink) {
        const whatsappButton = whatsappLink.cloneNode(true);
        whatsappButton.className = 'whatsapp-float';
        whatsappButton.removeAttribute('title');
        document.body.appendChild(whatsappButton);
    }

    document.querySelectorAll('section:not(.hero-section), .stat-card, .project-card, .service-card, .process-step').forEach((element, index) => {
        element.classList.add('reveal');
        element.style.transitionDelay = `${Math.min(index % 5, 4) * 60}ms`;
    });

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

    window.addEventListener('scroll', () => {
        document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 24);
    }, { passive: true });

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const isOpen = navMenu.classList.contains('open');
            navToggle.innerHTML = isOpen 
                ? '<i class="fa-solid fa-xmark"></i>' 
                : '<i class="fa-solid fa-bars"></i>';
        });
    }

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        });
    });

    // 2. Scroll Spy for Navbar Links
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // 3. Contact Form Handling & Validation
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');

            const inputs = [name, email, subject, message];

            // Reset validation states
            inputs.forEach(input => {
                input.parentElement.classList.remove('invalid');
            });

            // Name validation
            if (!name.value.trim()) {
                name.parentElement.classList.add('invalid');
                isValid = false;
            }

            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
                email.parentElement.classList.add('invalid');
                isValid = false;
            }

            // Subject validation
            if (!subject.value.trim()) {
                subject.parentElement.classList.add('invalid');
                isValid = false;
            }

            // Message validation
            if (!message.value.trim()) {
                message.parentElement.classList.add('invalid');
                isValid = false;
            }

            // Form Output Handling
            if (isValid) {
                formStatus.style.color = '#3b82f6';
                formStatus.textContent = 'Sending message...';

                // Simulate front-end submission success
                setTimeout(() => {
                    formStatus.style.color = '#22c55e';
                    formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                    contactForm.reset();
                }, 1200);
            } else {
                formStatus.style.color = '#ef4444';
                formStatus.textContent = 'Please fix the errors above and try again.';
            }
        });
    }
});