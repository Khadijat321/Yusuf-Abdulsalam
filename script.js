/* ========================================
   YUSUF ABDULSALAM - PROFESSIONAL PORTFOLIO JS
   Interactive, Animated, Conversion-Optimized
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // LOADING SCREEN
    // ========================================
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingBar = document.getElementById('loadingBar');
    let loadProgress = 0;

    const loadingInterval = setInterval(() => {
        loadProgress += Math.random() * 15;
        if (loadProgress >= 100) {
            loadProgress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                initAnimations();
            }, 500);
        }
        loadingBar.style.width = loadProgress + '%';
    }, 100);

    // ========================================
    // CUSTOM CURSOR
    // ========================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            cursorDot.style.left = posX + 'px';
            cursorDot.style.top = posY + 'px';
            cursorOutline.animate({
                left: posX + 'px',
                top: posY + 'px'
            }, { duration: 500, fill: 'forwards' });
        });

        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .filter-btn, .add-project-card, .service-card, .pricing-card, .testimonial-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // ========================================
    // MOBILE MENU
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ========================================
    // SMOOTH SCROLL & ACTIVE NAV LINK
    // ========================================
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ========================================
    // TYPEWRITER EFFECT
    // ========================================
    const typewriterElement = document.getElementById('typewriter');
    const words = [
        'stunning websites',
        'powerful web apps',
        'responsive designs',
        'scalable solutions',
        'amazing experiences'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeWriter() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }
        setTimeout(typeWriter, typeSpeed);
    }
    setTimeout(typeWriter, 1000);

    // ========================================
    // ANIMATED COUNTERS
    // ========================================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            observer.observe(counter);
        });
    }

    // ========================================
    // PARTICLE SYSTEM
    // ========================================
    function initParticles() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = window.innerWidth < 768 ? 30 : 60;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.color = ['#6366f1', '#06b6d4', '#f472b6', '#8b5cf6'][Math.floor(Math.random() * 4)];
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        for (let i = 0; i < particleCount; i++) particles.push(new Particle());

        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = '#6366f1';
                        ctx.globalAlpha = (1 - distance / 150) * 0.2;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => { particle.update(); particle.draw(); });
            drawConnections();
            requestAnimationFrame(animate);
        }
        animate();
    }

    // ========================================
    // SCROLL ANIMATIONS
    // ========================================
    function initAnimations() {
        const animatedElements = document.querySelectorAll('[data-aos]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-aos-delay') || 0;
                    setTimeout(() => { entry.target.classList.add('aos-animate'); }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        animatedElements.forEach(el => observer.observe(el));

        const progressBars = document.querySelectorAll('.progress-bar');
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width;
                    progressObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        progressBars.forEach(bar => progressObserver.observe(bar));
    }

    // ========================================
    // PROJECT FILTER
    // ========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ========================================
    // TESTIMONIALS SLIDER
    // ========================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            testimonialDots[i].classList.remove('active');
        });
        testimonialCards[index].classList.add('active');
        testimonialDots[index].classList.add('active');
    }

    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });

    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // ========================================
    // ADD PROJECT MODAL
    // ========================================
    const addProjectBtn = document.getElementById('addProjectBtn');
    const projectModal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const projectForm = document.getElementById('projectForm');
    const projectsGrid = document.getElementById('projectsGrid');

    function loadProjects() {
        const savedProjects = localStorage.getItem('portfolioProjects');
        if (savedProjects) {
            const projects = JSON.parse(savedProjects);
            projects.forEach(project => addProjectToGrid(project));
        }
    }

    function addProjectToGrid(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-category', project.category);
        card.setAttribute('data-aos', 'fade-up');
        const categoryLabels = {
            'web': 'Web Application',
            'ecommerce': 'E-Commerce',
            'mobile': 'Mobile App',
            'dashboard': 'Dashboard'
        };
        const techTags = project.tech.split(',').map(t => t.trim()).filter(t => t);
        card.innerHTML = `
            <div class="project-image">
                <div class="project-placeholder"><i class="fas fa-code"></i><span>Project Screenshot</span></div>
                <div class="project-overlay">
                    <div class="project-links">
                        ${project.live ? `<a href="${project.live}" target="_blank" class="project-link" title="View Live"><i class="fas fa-external-link-alt"></i></a>` : ''}
                        ${project.github ? `<a href="${project.github}" target="_blank" class="project-link" title="View Code"><i class="fab fa-github"></i></a>` : ''}
                    </div>
                </div>
            </div>
            <div class="project-info">
                <span class="project-tag">${categoryLabels[project.category] || 'Project'}</span>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">${techTags.map(tag => `<span>${tag}</span>`).join('')}</div>
            </div>
        `;
        projectsGrid.insertBefore(card, addProjectBtn);
        setTimeout(() => card.classList.add('aos-animate'), 100);
    }

    addProjectBtn.addEventListener('click', () => {
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    modalClose.addEventListener('click', () => {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const project = {
            title: document.getElementById('projectTitle').value,
            category: document.getElementById('projectCategory').value,
            description: document.getElementById('projectDescription').value,
            tech: document.getElementById('projectTech').value,
            live: document.getElementById('projectLive').value,
            github: document.getElementById('projectGithub').value,
            image: document.getElementById('projectImage').value
        };
        let savedProjects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
        savedProjects.push(project);
        localStorage.setItem('portfolioProjects', JSON.stringify(savedProjects));
        addProjectToGrid(project);
        projectForm.reset();
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
        showToast('Project added successfully!');
    });

    loadProjects();

    // ========================================
    // CONTACT FORM
    // ========================================
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        console.log('Form submitted:', formData);
        contactForm.reset();
        showToast('Message sent successfully! I will get back to you soon.');
    });

    // ========================================
    // TOAST NOTIFICATION
    // ========================================
    function showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        toastMessage.textContent = message;
        toast.classList.add('show');
        setTimeout(() => { toast.classList.remove('show'); }, 3000);
    }

    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========================================
    // PARALLAX EFFECT
    // ========================================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.2;
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ========================================
    // TILT EFFECT ON CARDS
    // ========================================
    const cards = document.querySelectorAll('.project-card, .skill-card, .service-card, .pricing-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ========================================
    // TEXT SCRAMBLE EFFECT
    // ========================================
    const navLinkElements = document.querySelectorAll('.nav-link');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    navLinkElements.forEach(link => {
        const originalText = link.getAttribute('data-text');
        link.addEventListener('mouseenter', () => {
            let iteration = 0;
            const interval = setInterval(() => {
                link.textContent = originalText
                    .split('')
                    .map((letter, index) => {
                        if (index < iteration) return originalText[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                if (iteration >= originalText.length) clearInterval(interval);
                iteration += 1 / 3;
            }, 30);
        });
    });

    // ========================================
    // MAGNETIC BUTTON EFFECT
    // ========================================
    const magneticBtns = document.querySelectorAll('.btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return;
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // ========================================
    // GLITCH EFFECT ON HERO TITLE
    // ========================================
    const heroTitle = document.querySelector('.gradient-text');
    if (heroTitle) {
        setInterval(() => {
            heroTitle.style.textShadow = `
                ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 rgba(255,0,0,0.5),
                ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 rgba(0,255,255,0.5)
            `;
            setTimeout(() => { heroTitle.style.textShadow = 'none'; }, 100);
        }, 5000);
    }

    // ========================================
    // KEYBOARD NAVIGATION
    // ========================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            projectModal.classList.remove('active');
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ========================================
    // PERFORMANCE: Pause animations when tab hidden
    // ========================================
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.body.classList.add('paused');
        } else {
            document.body.classList.remove('paused');
        }
    });

    // ========================================
    // INITIALIZE ALL FEATURES
    // ========================================
    initParticles();
    animateCounters();
});

// Add CSS animation for fade in up
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .paused * { animation-play-state: paused !important; }
`;
document.head.appendChild(style);

// Console easter egg
console.log('%c Yusuf Abdulsalam ', 'background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 10px;');
console.log('%c Full Stack Web Developer ', 'color: #6366f1; font-size: 16px;');
console.log('%c Contact: abdulsalamy564@gmail.com | 08079614529 ', 'color: #06b6d4; font-size: 14px;');
