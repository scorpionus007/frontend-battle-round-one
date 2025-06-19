// Animation Utilities
class AnimationSystem {
    constructor() {
        this.initCursor();
        this.initMagneticButtons();
        this.initScrollAnimations();
        this.initParticles();
        this.setupEventListeners();
    }

    initCursor() {
        this.cursor = document.createElement('div');
        this.cursor.classList.add('custom-cursor');
        document.body.appendChild(this.cursor);

        // Initial cursor position
        this.cursorPos = { x: 0, y: 0 };
        this.cursorTarget = { x: 0, y: 0 };
    }

    initMagneticButtons() {
        this.buttons = document.querySelectorAll('button, .btn');
        this.buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => this.handleMagneticEffect(e, btn));
            btn.addEventListener('mouseleave', () => this.resetButtonPosition(btn));
        });
    }

    initScrollAnimations() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe elements
        document.querySelectorAll('.feature-card, .section-header, .hero-content').forEach(el => {
            this.observer.observe(el);
        });
    }

    initParticles() {
        this.particles = [];
        const particleCount = 50;
        const particleContainer = document.createElement('div');
        particleContainer.classList.add('particle-container');
        document.querySelector('.hero').appendChild(particleContainer);

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particleContainer.appendChild(particle);
            this.particles.push({
                element: particle,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2
            });
        }

        this.animateParticles();
    }

    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.cursorTarget.x = e.clientX;
            this.cursorTarget.y = e.clientY;
            this.updateCursor();
            this.updateParticles(e);
        });

        // Handle hover states
        document.querySelectorAll('a, button, .btn, .feature-card').forEach(el => {
            el.addEventListener('mouseenter', () => this.cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => this.cursor.classList.remove('hover'));
        });
    }

    handleMagneticEffect(e, button) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.transform = `translate(${(x - rect.width/2) * 0.2}px, ${(y - rect.height/2) * 0.2}px)`;
    }

    resetButtonPosition(button) {
        button.style.transform = 'translate(0, 0)';
    }

    updateCursor() {
        this.cursorPos.x += (this.cursorTarget.x - this.cursorPos.x) * 0.1;
        this.cursorPos.y += (this.cursorTarget.y - this.cursorPos.y) * 0.1;
        
        this.cursor.style.transform = `translate(${this.cursorPos.x}px, ${this.cursorPos.y}px)`;
        requestAnimationFrame(() => this.updateCursor());
    }

    updateParticles(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        this.particles.forEach(particle => {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 100) {
                const angle = Math.atan2(dy, dx);
                particle.vx -= Math.cos(angle) * 0.5;
                particle.vy -= Math.sin(angle) * 0.5;
            }
        });
    }

    animateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary check
            if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
            if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
            
            // Apply friction
            particle.vx *= 0.99;
            particle.vy *= 0.99;
            
            particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
        });
        
        requestAnimationFrame(() => this.animateParticles());
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationSystem();
}); 