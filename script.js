// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initLoader();
    initThemeToggle();
    initMobileMenu();
    initSmoothScrolling();
    initAnimations();
    initTestimonialsSlider();
    initStatsCounter();
    initFormHandling();
    initParallaxEffects();
    initRippleEffects();
    initCarousel();
    initBackToTop();
    initScrollIndicator();
    initCustomerInteractions();
    initEnhancedAnimations();
    initInteractiveCards();
    initParallaxScrolling();
    initGraph();
    initStatsAnimation();
    initBrandCards();
});

// Loader Functionality
function initLoader() {
    const loader = document.getElementById('loader');
    const counter = document.querySelector('.counter-number');
    const loaderBar = document.querySelector('.loader-bar');
    const duration = 2000; // 2 seconds total

    const updateLoader = (progress) => {
        // Update counter
        counter.textContent = Math.floor(progress);
        
        // Update loading bar width
        loaderBar.style.width = `${progress}%`;
    };

    const startLoading = () => {
        const startTime = Date.now();
        
        const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min((elapsed / duration) * 100, 100);
            
            updateLoader(progress);

            if (progress < 100) {
                requestAnimationFrame(animate);
            } else {
                setTimeout(() => {
                    loader.classList.add('hidden');
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 500);
                }, 300);
            }
        };

        requestAnimationFrame(animate);
    };

    // Start loading animation when the page loads
    window.addEventListener('load', () => {
        setTimeout(startLoading, 500);
    });
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(icon, savedTheme);
    updateThemeElements();
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(icon, newTheme);
        updateThemeElements();
        
        // Add ripple effect
        createRippleEffect(this);
    });
}

function updateThemeIcon(icon, theme) {
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

function updateThemeElements() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navLogo = document.querySelector('.nav-logo h2');
    const theme = document.body.getAttribute('data-theme');
    
    // Update navbar background
    navbar.style.background = `var(--bg-primary)`;
    
    // Update nav links color
    navLinks.forEach(link => {
        link.style.color = `var(--text-primary)`;
    });
    
    // Update logo color
    if (navLogo) {
        navLogo.style.color = `var(--primary-color)`;
    }
}

// Mobile Menu Functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (hamburger.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate', 'in-view');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos], .feature-card, .section-header, .hero-content');
    animatedElements.forEach(el => observer.observe(el));
    
    // Navbar scroll effect with improved performance
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > 100) {
                    navbar.style.background = document.body.getAttribute('data-theme') === 'dark' 
                        ? 'rgba(17, 24, 39, 0.98)' 
                        : 'rgba(255, 255, 255, 0.98)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                } else {
                    navbar.style.background = document.body.getAttribute('data-theme') === 'dark'
                        ? 'rgba(17, 24, 39, 0.95)'
                        : 'rgba(255, 255, 255, 0.95)';
                    navbar.style.boxShadow = 'none';
                }
                
                lastScrollTop = scrollTop;
                ticking = false;
            });
            
            ticking = true;
        }
    }, { passive: true });
}

// Carousel Functionality
function initCarousel() {
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselItems = document.querySelectorAll('.showcase-item');
    const prevBtn = document.querySelector('.prev-carousel-btn');
    const nextBtn = document.querySelector('.next-carousel-btn');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const totalSlides = carouselItems.length;
    
    function updateCarousel(direction = null) {
        const translateX = -currentSlide * 100;
        carouselTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update active states
        carouselItems.forEach((item, index) => {
            item.classList.toggle('active', index === currentSlide);
            if (direction === 'next') {
                item.style.transform = index === currentSlide ? 'scale(1)' : 'scale(0.9)';
            } else if (direction === 'prev') {
                item.style.transform = index === currentSlide ? 'scale(1)' : 'scale(0.9)';
            }
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel('next');
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel('prev');
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            createRippleEffect(nextBtn);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            createRippleEffect(prevBtn);
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });
    
    // Touch/swipe support
    let startX = 0;
    let endX = 0;
    
    carouselTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    carouselTrack.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });
    
    // Initial state
    updateCarousel();
    
    // Auto-advance carousel
    setInterval(nextSlide, 5000);
}

// Testimonials Slider
function initTestimonialsSlider() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            if (i === index) {
                testimonial.classList.add('active');
            }
        });
    }
    
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }
    
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevTestimonial();
            createRippleEffect(prevBtn);
        });
        
        nextBtn.addEventListener('click', () => {
            nextTestimonial();
            createRippleEffect(nextBtn);
        });
    }
    
    // Auto-advance testimonials
    setInterval(nextTestimonial, 5000);
}

// Stats Counter Animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Form Handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<div class="loading-spinner"></div>';
            submitBtn.disabled = true;
            
            try {
                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 1500));
                showNotification('Message sent successfully!', 'success');
                this.reset();
            } catch (error) {
                showNotification('Error sending message. Please try again.', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<div class="loading-spinner"></div>';
            submitBtn.disabled = true;
            
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                showNotification('Subscribed successfully!', 'success');
                this.reset();
            } catch (error) {
                showNotification('Error subscribing. Please try again.', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        default:
            notification.style.background = '#3b82f6';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Enhanced Parallax Effects
function initParallaxEffects() {
    const parallaxSection = document.querySelector('.parallax-section');
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    if (!parallaxSection || !parallaxLayers.length) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const rect = parallaxSection.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                
                if (rect.top < viewportHeight && rect.bottom > 0) {
                    const sectionProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
                    
                    parallaxLayers.forEach(layer => {
                        const speed = parseFloat(layer.dataset.speed) || 0.5;
                        const yPos = (sectionProgress * 100 * speed);
                        layer.style.transform = `translate3d(0, ${yPos}px, ${layer.dataset.z || 0}px) scale(${layer.dataset.scale || 1})`;
                    });
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    }, { passive: true });
}

// Ripple Effect
function initRippleEffects() {
    const buttons = document.querySelectorAll('.btn, .theme-btn, .prev-btn, .next-btn, .carousel-btn, .view-project-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(this, e);
        });
    });
}

function createRippleEffect(element, event = null) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    
    let x, y;
    if (event) {
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
    } else {
        x = rect.width / 2;
        y = rect.height / 2;
    }
    
    ripple.style.cssText = `
        position: absolute;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        animation: ripple 0.6s ease-out;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    // Add ripple animation CSS if not already present
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    width: 300px;
                    height: 300px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        createRippleEffect(backToTopBtn);
    });
}

// Scroll Indicator
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const featuresSection = document.querySelector('#features');
            if (featuresSection) {
                const offsetTop = featuresSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Customer Interactions
function initCustomerInteractions() {
    const customerItems = document.querySelectorAll('.customer-item');
    
    customerItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        item.addEventListener('click', function() {
            createRippleEffect(this);
            showNotification('Customer details coming soon!', 'info');
        });
    });
}

// Enhanced Animations
function initEnhancedAnimations() {
    // Stagger animations for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Pulse animation for stats
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 1s ease-in-out';
        });
        
        item.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Floating animation for showcase items
    const showcaseItems = document.querySelectorAll('.showcase-item');
    showcaseItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Initialize floating elements
    initFloatingElements();
    
    // Parallax feature hover effects
    const parallaxFeatures = document.querySelectorAll('.parallax-feature');
    parallaxFeatures.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Interactive Cards Functionality
function initInteractiveCards() {
    const interactiveCards = document.querySelectorAll('.interactive-card');
    
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        card.addEventListener('click', function() {
            createRippleEffect(this);
            showNotification('Interactive feature coming soon!', 'info');
        });
    });
    
    // Card button interactions
    const cardBtns = document.querySelectorAll('.card-btn');
    cardBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            createRippleEffect(this);
            showNotification('Feature details loading...', 'info');
        });
    });
}

// Enhanced Parallax Scrolling Function
function initParallaxScrolling() {
    const parallaxSection = document.querySelector('.parallax-section');
    const layers = document.querySelectorAll('.parallax-layer');
    let ticking = false;
    
    if (!parallaxSection || !layers.length) return;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const sectionRect = parallaxSection.getBoundingClientRect();
        
        if (sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {
            layers.forEach(layer => {
                const speed = parseFloat(layer.dataset.speed) || 0;
                const yPos = scrolled * speed;
                layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // Initial update
    updateParallax();
}

// Enhanced Floating Elements Animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
        
        // Add random movement
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'float 2s ease-in-out infinite';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animation = `float 6s ease-in-out infinite`;
        });
    });
}

// Enhanced Button Interactions
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // View project button interactions
    const viewProjectBtns = document.querySelectorAll('.view-project-btn');
    viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Project details coming soon!', 'info');
        });
    });
});

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
    
    // Arrow keys for testimonials
    if (e.key === 'ArrowLeft') {
        const prevBtn = document.querySelector('.prev-btn');
        if (prevBtn) prevBtn.click();
    }
    
    if (e.key === 'ArrowRight') {
        const nextBtn = document.querySelector('.next-btn');
        if (nextBtn) nextBtn.click();
    }
    
    // Arrow keys for carousel
    if (e.key === 'ArrowLeft') {
        const prevCarouselBtn = document.querySelector('.prev-carousel-btn');
        if (prevCarouselBtn) prevCarouselBtn.click();
    }
    
    if (e.key === 'ArrowRight') {
        const nextCarouselBtn = document.querySelector('.next-carousel-btn');
        if (nextCarouselBtn) nextCarouselBtn.click();
    }
});

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Accessibility Enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels to interactive elements
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    }
    
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const mainContent = document.querySelector('.hero');
    if (mainContent) {
        mainContent.id = 'main-content';
        mainContent.setAttribute('role', 'main');
    }
    
    // Add ARIA labels to carousel controls
    const carouselBtns = document.querySelectorAll('.carousel-btn');
    carouselBtns.forEach((btn, index) => {
        const direction = index === 0 ? 'previous' : 'next';
        btn.setAttribute('aria-label', `Go to ${direction} slide`);
    });
    
    // Add ARIA labels to dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    });
});

// Console welcome message
console.log(`
🎨 Frontend Battle 2.0 - Replicate & Innovate
✨ Built with modern web technologies
🚀 Features implemented:
   - Responsive design
   - Light/Dark theme toggle
   - Smooth animations
   - Interactive components
   - Accessibility features
   - Performance optimizations
   - Carousel functionality
   - Customer section
   - Enhanced testimonials
   - Back to top button
   - Scroll indicators
   - Form validation
   - Notification system
   
Made with ❤️ for the Frontend Battle competition
`);

// Graph Data
const graphData = [
    { label: 'Project 1', value: 549, type: 'refurbishment', status: 'complete' },
    { label: 'Project 2', value: 278, type: 'refurbishment', status: 'complete' },
    { label: 'Project 3', value: 875, type: 'new-build', status: 'complete' },
    { label: 'Project 4', value: 617, type: 'new-build', status: 'complete' },
    { label: 'Project 5', value: 506, type: 'new-build', status: 'complete' },
    { label: 'Project 6', value: 36, type: 'refurbishment', status: 'estimate' },
    { label: 'Project 7', value: 185, type: 'refurbishment', status: 'estimate' },
    { label: 'Project 8', value: 191, type: 'refurbishment', status: 'estimate' },
    { label: 'Project 9', value: 122, type: 'refurbishment', status: 'estimate' },
    { label: 'Project 10', value: 550, type: 'new-build', status: 'complete' },
    { label: 'Project 11', value: 881, type: 'new-build', status: 'complete' },
    { label: 'Project 12', value: 539, type: 'refurbishment', status: 'complete' },
    { label: 'Project 13', value: 269, type: 'refurbishment', status: 'complete' },
    { label: 'Project 14', value: 29, type: 'refurbishment', status: 'estimate' }
];

// Initialize Graph
function initGraph() {
    const graphContainer = document.querySelector('.graph-bars');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Sample data (you can adjust these values)
    const graphData = [
        { value: 875, type: 'new-build', status: 'complete' },
        { value: 278, type: 'refurbishment', status: 'complete' },
        { value: 549, type: 'refurbishment', status: 'complete' },
        { value: 617, type: 'new-build', status: 'complete' },
        { value: 506, type: 'new-build', status: 'complete' },
        { value: 185, type: 'refurbishment', status: 'estimate' },
        { value: 191, type: 'refurbishment', status: 'estimate' },
        { value: 122, type: 'refurbishment', status: 'estimate' },
        { value: 550, type: 'new-build', status: 'complete' },
        { value: 450, type: 'new-build', status: 'estimate' },
        { value: 320, type: 'refurbishment', status: 'estimate' },
        { value: 280, type: 'refurbishment', status: 'estimate' },
        { value: 410, type: 'new-build', status: 'estimate' },
        { value: 380, type: 'new-build', status: 'estimate' }
    ];

    const maxValue = Math.max(...graphData.map(item => item.value));
    const scale = 240 / maxValue; // 240px is the usable height

    function createBars(filteredData) {
        graphContainer.innerHTML = '';

        // Add target lines
        const target2025 = document.createElement('div');
        target2025.className = 'target-line';
        target2025.style.bottom = `${600 * scale}px`;
        target2025.setAttribute('data-value', '600 kgCO2e/m2');
        graphContainer.appendChild(target2025);

        const target2030 = document.createElement('div');
        target2030.className = 'target-line';
        target2030.style.bottom = `${500 * scale}px`;
        target2030.setAttribute('data-value', '500 kgCO2e/m2');
        graphContainer.appendChild(target2030);

        // Create bars
        filteredData.forEach((item, index) => {
            const barGroup = document.createElement('div');
            barGroup.className = 'bar-group';

            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${item.value * scale}px`;
            bar.setAttribute('data-value', item.value);

            barGroup.appendChild(bar);
            graphContainer.appendChild(barGroup);
        });
    }

    function filterData() {
        const activeType = document.querySelector('.filter-btn[data-type].active')?.dataset.type;
        const activeStatus = document.querySelector('.filter-btn[data-status].active')?.dataset.status;

        let filteredData = graphData;
        if (activeType && activeType !== 'all') {
            filteredData = filteredData.filter(item => item.type === activeType);
        }
        if (activeStatus && activeStatus !== 'all') {
            filteredData = filteredData.filter(item => item.status === activeStatus);
        }

        createBars(filteredData);
    }

    // Event listeners for filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = e.target.dataset.type;
            const status = e.target.dataset.status;

            if (type) {
                document.querySelectorAll('.filter-btn[data-type]').forEach(b => b.classList.remove('active'));
            }
            if (status) {
                document.querySelectorAll('.filter-btn[data-status]').forEach(b => b.classList.remove('active'));
            }
            
            e.target.classList.add('active');
            filterData();
        });
    });

    // Initial render
    filterData();
}

// Stats Animation
function initStatsAnimation() {
    const statCards = document.querySelectorAll('.stat-card');
    const bars = document.querySelectorAll('.bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stat-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                } else if (entry.target.classList.contains('bar')) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 100);
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    statCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
    
    bars.forEach(bar => {
        observer.observe(bar);
    });
}

// Brand Cards Animation
function initBrandCards() {
    const brandCards = document.querySelectorAll('.brand-card');
    
    brandCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards
            brandCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            card.classList.add('active');
            
            // Add checkbox if not exists
            if (!card.querySelector('.card-checkbox')) {
                const checkbox = document.createElement('div');
                checkbox.className = 'card-checkbox';
                checkbox.innerHTML = `
                    <input type="checkbox" checked>
                    <span class="checkmark"></span>
                `;
                card.appendChild(checkbox);
            }
        });
        
        // Settings button interaction
        const settingsBtn = card.querySelector('.settings-btn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                createRippleEffect(settingsBtn);
                showNotification('Settings panel coming soon!', 'info');
            });
        }
    });
} 