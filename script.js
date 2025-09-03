document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const body = document.body;
    
    if (loadingScreen) {
        body.classList.add('loading');
        
        // Simulate loading progress
        const progress = document.querySelector('.loading-progress');
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    body.classList.remove('loading');
                    setTimeout(() => {
                        if (loadingScreen.parentNode) {
                            loadingScreen.remove();
                            console.log('Loading screen removed successfully.');
                        }
                    }, 500);
                }, 500);
            } else {
                width += 10;
                progress.style.width = `${width}%`;
            }
        }, 200);
    } else {
        console.error('Loading screen element not found!');
    }

    // Initialize all functionality after loading
    setTimeout(() => {
        initProductFilters();
        initSmoothScrolling();
        initHeaderScroll();
        initProductAnimations();
        initParallaxEffect();
        initMobileMenuToggle();
        initFloatingElements();
        initParticleSystem();
        initStatusUpdate();
        initContactForms();
        initDynamicEffects();
        console.log('All initializations completed.');
    }, 2500);
});

// Global function for smooth scrolling to sections
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        const targetPosition = target.offsetTop - 100;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;
        
        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function easeInOutCubic(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }
        
        requestAnimationFrame(animation);
    }
}

// Product filtering functionality
function initProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.transition = 'all 0.3s ease';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-30px)';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

// Smooth scrolling with easing
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                const targetPosition = target.offsetTop - 100;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                function easeInOutCubic(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t * t + b;
                    t -= 2;
                    return c / 2 * (t * t * t + 2) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(13, 13, 13, 0.98)';
            header.style.backdropFilter = 'blur(40px)';
            header.style.boxShadow = '0 15px 25px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.background = 'rgba(13, 13, 13, 0.95)';
            header.style.backdropFilter = 'blur(30px)';
            header.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
    });
}

// Product card animations
function initProductAnimations() {
    const cards = document.querySelectorAll('.product-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const particles = document.querySelector('.particles');
    const heroBackground = document.querySelector('.hero-background');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.2;
        if (particles) particles.style.transform = `translateY(${rate}px)`;
        if (heroBackground) heroBackground.style.transform = `translateY(${rate * 0.5}px)`;
    });
}

// Floating elements animation
function initFloatingElements() {
    const elements = document.querySelectorAll('.floating-element');
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 1.5}s`;
        element.style.animationDuration = `${10 + index * 2}s`;
    });
}

// Particle system animation
function initParticleSystem() {
    const particlesContainer = document.querySelector('.particles');
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${10 + Math.random() * 10}s`;
        particlesContainer.appendChild(particle);
    }
}

// Initialize mobile menu toggle
function initMobileMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// Real-time status update simulation
function initStatusUpdate() {
    const statusCards = document.querySelectorAll('.status-card');
    setInterval(() => {
        statusCards.forEach(card => {
            const indicator = card.querySelector('.status-indicator');
            if (Math.random() > 0.2) {
                indicator.textContent = 'Undetected';
                indicator.className = 'status-indicator undetected';
            } else {
                indicator.textContent = 'Detected';
                indicator.className = 'status-indicator detected';
            }
        });
    }, 10000);
}

// Contact form handling
function initContactForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = form.querySelectorAll('input, textarea');
            let valid = true;
            inputs.forEach(input => {
                if (!input.value.trim()) valid = false;
            });
            if (valid) alert('Mesajınız gönderildi! En kısa sürede dönüş yapacağız.');
            else alert('Lütfen tüm alanları doldurun.');
            form.reset();
        });
    });
}

// Dynamic effects for visual richness
function initDynamicEffects() {
    const ornaments = document.querySelectorAll('.hero-ornament, .section-ornament, .status-ornament, .about-ornament, .contact-ornament');
    ornaments.forEach(ornament => {
        ornament.style.opacity = Math.random() * 0.3 + 0.2;
        setInterval(() => {
            ornament.style.transform = `scale(${1 + Math.random() * 0.1})`;
        }, 5000);
    });

    const body = document.body;
    body.style.background = `linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #121212 100%)`;
    setInterval(() => {
        body.style.background = `linear-gradient(135deg, #1a1a1a ${Math.random() * 20}%, #0d0d0d 50%, #121212 ${100 - Math.random() * 20}%)`;
    }, 15000);
}