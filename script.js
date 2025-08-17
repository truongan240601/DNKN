/*==================== VSEC WEBSITE JAVASCRIPT ====================*/
/*==================== Developed for Bootstrap 5 Framework ====================*/

// Ensure the script runs after DOM is loaded
(function () {
    'use strict';

    // Wait for both DOM and all resources to be loaded
    function initializeWhenReady() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            // DOM is already loaded
            init();
        }
    }

    /*==================== PAGE LOADER ====================*/
    function hidePageLoader() {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 1000); // Show loader for at least 1 second
        }
    }

    /*==================== VARIABLES ====================*/
    let header, navLinks, scrollTopBtn, heroSection;

    function initializeElements() {
        header = document.querySelector('.header');
        navLinks = document.querySelectorAll('.nav-link');
        scrollTopBtn = document.querySelector('.scroll-top');
        heroSection = document.querySelector('.hero');
    }

    /*==================== HEADER SCROLL EFFECT ====================*/
    function handleHeaderScroll() {
        if (header && window.scrollY >= 50) {
            header.classList.add('scrolled');
        } else if (header) {
            header.classList.remove('scrolled');
        }
    }

    /*==================== SMOOTH SCROLLING FOR NAVIGATION ====================*/
    function initSmoothScrolling() {
        if (!navLinks || navLinks.length === 0) return;

        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                // Check if it's an internal link
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetSection = document.getElementById(targetId);

                    if (targetSection && header) {
                        const headerHeight = header.offsetHeight || 80;
                        const targetPosition = targetSection.offsetTop - headerHeight - 20;

                        window.scrollTo({
                            top: Math.max(0, targetPosition),
                            behavior: 'smooth'
                        });

                        // Close mobile menu if open
                        const navbarCollapse = document.querySelector('.navbar-collapse');
                        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                            try {
                                if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                                    bsCollapse.hide();
                                } else {
                                    // Fallback for when Bootstrap JS is not loaded
                                    navbarCollapse.classList.remove('show');
                                }
                            } catch (error) {
                                console.warn('Bootstrap Collapse not available:', error);
                                navbarCollapse.classList.remove('show');
                            }
                        }
                    }
                }
            });
        });
    }

    /*==================== ACTIVE NAVIGATION LINK ====================*/
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + header.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    /*==================== SCROLL TO TOP BUTTON ====================*/
    function handleScrollTopButton() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }

    function initScrollToTop() {
        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', function (e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    /*==================== SCROLL REVEAL ANIMATIONS ====================*/
    function initScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // Add animate class for section titles
                    if (entry.target.classList.contains('section-title')) {
                        entry.target.classList.add('animate');
                    }

                    // Add animate class for elements with animate-on-scroll
                    if (entry.target.classList.contains('animate-on-scroll')) {
                        entry.target.classList.add('animate');
                    }

                    // Add animate class for section reveals
                    if (entry.target.classList.contains('section-reveal')) {
                        entry.target.classList.add('animate');

                        // Animate child content with delay
                        const sectionContent = entry.target.querySelectorAll('.section-content');
                        sectionContent.forEach((content, index) => {
                            setTimeout(() => {
                                content.classList.add('animate');
                            }, (index + 1) * 200);
                        });
                    }

                    // Add animate class for section content
                    if (entry.target.classList.contains('section-content')) {
                        entry.target.classList.add('animate');

                        // Staggered animation for cards within this content
                        const cards = entry.target.querySelectorAll('.card-reveal');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('animate');
                            }, index * 150);
                        });

                        // Staggered animation for stagger items
                        const staggerItems = entry.target.querySelectorAll('.stagger-item');
                        staggerItems.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('animate');
                            }, index * 100);
                        });
                    }

                    // Add animate class for individual card reveals
                    if (entry.target.classList.contains('card-reveal')) {
                        entry.target.classList.add('animate');
                    }

                    // Add animate class for stagger items
                    if (entry.target.classList.contains('stagger-item')) {
                        entry.target.classList.add('animate');
                    }

                    // Animate counters if this is a stat item
                    if (entry.target.classList.contains('stat-item')) {
                        animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Elements to animate
        const animatedElements = document.querySelectorAll(
            '.fade-in, .slide-in-left, .slide-in-right, .scale-in, .stat-item, .section-title, .animate-on-scroll, .section-reveal, .section-content, .card-reveal, .stagger-item, .service-card, .advantage-card, .customer-card, .vision-card'
        );

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    /*==================== COUNTER ANIMATION ====================*/
    function animateCounter(statItem) {
        const numberElement = statItem.querySelector('.stat-number');
        if (!numberElement || numberElement.classList.contains('animated')) return;

        const targetNumber = parseInt(numberElement.textContent.replace(/\D/g, ''));
        const suffix = numberElement.textContent.replace(/[\d\s]/g, '');
        const duration = 2000;
        const startTime = Date.now();

        numberElement.classList.add('animated');

        function updateCounter() {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentNumber = Math.floor(targetNumber * easeOut);

            numberElement.textContent = currentNumber + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                numberElement.textContent = targetNumber + suffix;
            }
        }

        updateCounter();
    }

    /*==================== PARALLAX EFFECT ====================*/
    function initParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.hero');

        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        }

        // Throttle the parallax function
        let ticking = false;
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }

        window.addEventListener('scroll', function () {
            requestTick();
            ticking = false;
        });
    }

    /*==================== SCROLL INDICATOR ====================*/
    function initScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');

        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', function (e) {
                e.preventDefault();
                const aboutSection = document.querySelector('#about');
                if (aboutSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = aboutSection.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }

    /*==================== TYPING EFFECT ====================*/
    function initTypingEffect() {
        const typingElement = document.querySelector('.hero-title');
        if (!typingElement) return;

        const originalText = typingElement.textContent;
        typingElement.textContent = '';

        let index = 0;
        function typeWriter() {
            if (index < originalText.length) {
                typingElement.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }

        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    /*==================== CARD TILT EFFECT ====================*/
    function initCardTiltEffect() {
        const cards = document.querySelectorAll('.service-card, .advantage-card, .customer-card, .vision-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(5deg) translateY(-10px)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });

            card.addEventListener('mousemove', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
        });
    }

    /*==================== LAZY LOADING IMAGES ====================*/
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    /*==================== PERFORMANCE OPTIMIZATION ====================*/
    function throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /*==================== SCROLL EVENT HANDLER ====================*/
    const optimizedScrollHandler = throttle(function () {
        handleHeaderScroll();
        updateActiveNavLink();
        handleScrollTopButton();
    }, 16); // ~60fps

    /*==================== NAVBAR BRAND ANIMATION ====================*/
    function initNavbarBrandAnimation() {
        const navbarBrand = document.querySelector('.navbar-brand img');
        if (navbarBrand) {
            navbarBrand.addEventListener('click', function (e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    /*==================== MOUSE CURSOR EFFECT ====================*/
    function initMouseCursorEffect() {
        const cursor = document.createElement('div');
        cursor.classList.add('cursor');
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', function (e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Add cursor styles
        const cursorStyles = `
            .cursor {
                position: fixed;
                width: 20px;
                height: 20px;
                background: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                mix-blend-mode: difference;
                transition: transform 0.1s ease;
            }
            
            .cursor.click {
                transform: scale(1.5);
            }
        `;

        const style = document.createElement('style');
        style.textContent = cursorStyles;
        document.head.appendChild(style);

        document.addEventListener('mousedown', () => cursor.classList.add('click'));
        document.addEventListener('mouseup', () => cursor.classList.remove('click'));
    }

    /*==================== LOADING ANIMATION ====================*/
    function initLoadingAnimation() {
        const loader = document.createElement('div');
        loader.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;
        loader.className = 'loading-overlay';

        const loaderStyles = `
            .loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: white;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            }
            
            .loading-spinner {
                text-align: center;
            }
        `;

        const style = document.createElement('style');
        style.textContent = loaderStyles;
        document.head.appendChild(style);
        document.body.appendChild(loader);

        // Hide loader when page is fully loaded
        window.addEventListener('load', function () {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }, 1000);
        });
    }

    /*==================== FORM VALIDATION ====================*/
    function initFormValidation() {
        const forms = document.querySelectorAll('.needs-validation');

        forms.forEach(form => {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add('was-validated');
            });
        });
    }

    /*==================== NOTIFICATION SYSTEM ====================*/
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    /*==================== SCROLL PROGRESS BAR ====================*/
    function initScrollProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';

        const progressBarStyles = `
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: var(--gradient-primary);
                z-index: 9999;
                transition: width 0.1s ease;
            }
        `;

        const style = document.createElement('style');
        style.textContent = progressBarStyles;
        document.head.appendChild(style);
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', function () {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    /*==================== ACCESSIBILITY IMPROVEMENTS ====================*/
    function initAccessibility() {
        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link visually-hidden-focusable';

        const skipLinkStyles = `
            .skip-link {
                position: absolute;
                top: -40px;
                left: 6px;
                background: var(--primary-color);
                color: white;
                padding: 8px;
                text-decoration: none;
                z-index: 10000;
                border-radius: 4px;
            }
            
            .skip-link:focus {
                top: 6px;
            }
        `;

        const style = document.createElement('style');
        style.textContent = skipLinkStyles;
        document.head.appendChild(style);
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add focus management for mobile menu
        const navToggler = document.querySelector('.navbar-toggler');
        const navCollapse = document.querySelector('.navbar-collapse');

        if (navToggler && navCollapse) {
            navToggler.addEventListener('click', function () {
                // Focus first nav link when menu opens
                setTimeout(() => {
                    const firstNavLink = navCollapse.querySelector('.nav-link');
                    if (firstNavLink && navCollapse.classList.contains('show')) {
                        firstNavLink.focus();
                    }
                }, 100);
            });
        }
    }

    /*==================== ERROR HANDLING ====================*/
    function initErrorHandling() {
        window.addEventListener('error', function (e) {
            console.error('JavaScript Error:', e.error);
            // You can implement error reporting here
        });

        window.addEventListener('unhandledrejection', function (e) {
            console.error('Unhandled Promise Rejection:', e.reason);
            // You can implement error reporting here
        });
    }

    /*==================== INITIALIZATION ====================*/
    function init() {
        try {
            // Initialize elements first
            initializeElements();

            // Check if required elements exist
            if (!header) {
                console.warn('Header element not found');
            }

            // Initialize all features with error handling
            initSmoothScrolling();
            initScrollToTop();
            initScrollReveal();
            initScrollIndicator();

            // Initialize optional features
            try {
                initNavbarBrandAnimation();
                initFormValidation();
                initScrollProgressBar();
                initAccessibility();
                initErrorHandling();
                initAdditionalAnimations();
            } catch (error) {
                console.warn('Some optional features failed to initialize:', error);
            }

            // Initialize performance-friendly features
            if (!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                try {
                    initParallaxEffect();
                    initCardTiltEffect();
                    initTypingEffect();
                    initSmoothReveal();
                } catch (error) {
                    console.warn('Animation features failed to initialize:', error);
                }
            }

            // Initialize lazy loading
            if ('IntersectionObserver' in window) {
                try {
                    initLazyLoading();
                } catch (error) {
                    console.warn('Lazy loading failed to initialize:', error);
                }
            }

            // Initialize mouse cursor effect for desktop only
            if (window.innerWidth > 768) {
                try {
                    initMouseCursorEffect();
                } catch (error) {
                    console.warn('Mouse cursor effect failed to initialize:', error);
                }
            }

            // Add event listeners with error handling
            try {
                window.addEventListener('scroll', optimizedScrollHandler);
                window.addEventListener('resize', throttle(function () {
                    updateActiveNavLink();
                }, 250));
            } catch (error) {
                console.warn('Event listeners failed to initialize:', error);
            }

            // Initialize loading animation
            try {
                initLoadingAnimation();
            } catch (error) {
                console.warn('Loading animation failed to initialize:', error);
            }

            // Hide page loader
            hidePageLoader();

            console.log('VSEC Website initialized successfully!');
        } catch (error) {
            console.error('Website initialization failed:', error);
            // Still hide the loader even if initialization fails
            hidePageLoader();
        }
    }

    /*==================== START INITIALIZATION ====================*/
    // Initialize when ready
    initializeWhenReady();

    /*==================== EXPOSE PUBLIC METHODS ====================*/
    window.VSECWebsite = {
        init: init,
        scrollToTop: function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        scrollToSection: function (sectionId) {
            const section = document.getElementById(sectionId);
            if (section && header) {
                const headerHeight = header.offsetHeight || 80;
                const targetPosition = section.offsetTop - headerHeight - 20;
                window.scrollTo({ top: Math.max(0, targetPosition), behavior: 'smooth' });
            }
        }
    };

})(); // End of IIFE

/*==================== ADDITIONAL UTILITIES ====================*/

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/*==================== ADDITIONAL ANIMATIONS ====================*/
function initAdditionalAnimations() {
    // Navbar hover effect
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'all 0.3s ease';
        });

        link.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Button hover animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });

        btn.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Image hover effects
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });

        img.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });

    // Floating animation for hero elements
    const floatingElements = document.querySelectorAll('.service-icon, .advantage-icon, .customer-icon, .vision-icon');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
        element.style.animation = 'float 3s ease-in-out infinite';
    });
}

/*==================== TYPING EFFECT FOR HERO TITLE ====================*/
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';

    let index = 0;
    function typeWriter() {
        if (index < originalText.length) {
            heroTitle.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing effect after hero animation
    setTimeout(typeWriter, 500);
}

/*==================== SMOOTH REVEAL FOR SECTIONS ====================*/
function initSmoothReveal() {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const elements = section.querySelectorAll('h2, h3, p, .card, .btn');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `all 0.6s ease ${index * 0.1}s`;
        });
    });
}

// Utility function to get element offset from top
function getOffsetTop(element) {
    let offsetTop = 0;
    while (element) {
        offsetTop += element.offsetTop;
        element = element.offsetParent;
    }
    return offsetTop;
}

// Utility function to debounce events
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/*==================== CONSOLE BRANDING ====================*/
console.log(`
%c
 ╭─────────────────────────────────────────────╮
 │                                             │
 │     VSEC - Logistics Solutions Website     │
 │     Powered by Bootstrap 5 & Vanilla JS    │
 │     © 2025 All Rights Reserved              │
 │                                             │
 ╰─────────────────────────────────────────────╯

%c🚀 Website loaded successfully!
%c📧 Contact: info@vsec.vn
%c🌐 Website: www.vsec.vn
`,
    'color: #003366; font-family: monospace;',
    'color: #1A73E8; font-weight: bold;',
    'color: #CC0000;',
    'color: #28a745;'
);
