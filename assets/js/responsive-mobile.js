/* ============================================================================
   MOBILE MENU FUNCTIONALITY - SheRises Foundation
   ============================================================================ */

function setMobileMenuState(open) {
    const mobileMenu = document.getElementById('mobileMenu');
    const backdrop = document.querySelector('.menu-backdrop');
    const toggler = document.querySelector('.mobile-nav-toggler');

    if (!mobileMenu) {
        return;
    }

    mobileMenu.classList.toggle('active', open);
    document.body.classList.toggle('mobile-menu-visible', open);
    document.body.style.overflow = open ? 'hidden' : '';

    if (backdrop) {
        backdrop.classList.toggle('active', open);
        backdrop.hidden = !open;
    }

    if (toggler) {
        toggler.setAttribute('aria-expanded', String(open));
    }
}

/**
 * Toggle mobile menu visibility
 */
function toggleMobileMenu(event) {
    if (event) {
        event.preventDefault();
    }

    const mobileMenu = document.getElementById('mobileMenu');
    setMobileMenuState(!(mobileMenu && mobileMenu.classList.contains('active')));
}

/**
 * Close mobile menu
 */
function closeMobileMenu(event) {
    if (event) {
        event.preventDefault();
    }

    setMobileMenuState(false);
}

/**
 * Close mobile menu when clicking on a link
 */
function setupMobileMenuLinks() {
    const mobileMenuLinks = document.querySelectorAll('#menu_mobile a');
    mobileMenuLinks.forEach(link => {
        if (link.dataset.mobileMenuLinkReady === 'true') return;
        link.dataset.mobileMenuLinkReady = 'true';
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
}

/**
 * Initialize mobile menu
 */
function initMobileMenu() {
    // Get all elements needed
    const mobileMenu = document.getElementById('mobileMenu');
    const toggler = document.querySelector('.navbar-toggler');
    const backdrop = document.querySelector('.menu-backdrop');
    const closeBtn = document.querySelector('.close-btn');
    
    if (!mobileMenu) return;
    if (mobileMenu.dataset.mobileMenuReady === 'true') return;
    mobileMenu.dataset.mobileMenuReady = 'true';
    
    // Toggle menu on button click
    if (toggler) {
        toggler.addEventListener('click', toggleMobileMenu);
    }
    
    // Close menu on backdrop click
    if (backdrop) {
        backdrop.addEventListener('click', closeMobileMenu);
    }
    
    // Close menu on close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMobileMenu);
    }
    
    // Setup link clicks
    setupMobileMenuLinks();
    
    // Close menu on window resize if needed
    window.addEventListener('resize', () => {
        if (window.innerWidth > 991) {
            closeMobileMenu();
        }
    });
}

/**
 * Handle responsive navigation
 */
function handleResponsiveNav() {
    const navbar = document.querySelector('.navbar-collapse');
    const mainMenu = document.querySelector('.main-menu');
    
    if (window.innerWidth <= 991) {
        // Mobile view
        if (mainMenu && mainMenu.style.display !== 'none') {
            mainMenu.style.display = 'none';
        }
    } else {
        // Desktop view
        if (mainMenu) {
            mainMenu.style.display = 'flex';
        }
        closeMobileMenu();
    }
}

/**
 * Smooth scroll for anchor links
 */
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        if (link.dataset.smoothScrollReady === 'true') return;
        link.dataset.smoothScrollReady = 'true';
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                closeMobileMenu();
            }
        });
    });
}

/**
 * Add active class to current nav item
 */
function highlightCurrentPage() {
    const currentLocation = location.pathname;
    const menuItems = document.querySelectorAll('#menu_main a, #menu_mobile a');
    
    menuItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && currentLocation.includes(href)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

/**
 * Initialize all responsive features
 */
function initResponsiveFeatures() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initResponsiveFeatures);
        return;
    }
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Handle responsive navigation
    handleResponsiveNav();
    window.addEventListener('resize', handleResponsiveNav);
    
    // Smooth scroll
    smoothScroll();
    
    // Highlight current page
    highlightCurrentPage();
    
    // Add accessibility
    setupAccessibility();
}

/**
 * Setup accessibility features
 */
function setupAccessibility() {
    // Ensure all buttons and links are keyboard accessible
    const buttons = document.querySelectorAll('.navbar-toggler, .close-btn, a, button');
    buttons.forEach(button => {
        if (!button.hasAttribute('tabindex')) {
            button.setAttribute('tabindex', '0');
        }
    });
    
    // Add keyboard support for menu toggle
    const toggler = document.querySelector('.navbar-toggler');
    if (toggler) {
        toggler.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMobileMenu();
            }
        });
    }
    
    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

/**
 * Lazy load images
 */
function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        images.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Detect touch devices
 */
function detectTouchDevice() {
    const isTouchDevice = () => {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    };
    
    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
    } else {
        document.body.classList.add('mouse-device');
    }
}

/**
 * Add scroll effects
 */
function addScrollEffects() {
    const header = document.querySelector('.header-section');
    if (!header) return;
    
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

/**
 * Format phone numbers on mobile
 */
function setupPhoneLinks() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        const phoneNumber = link.getAttribute('href').replace('tel:', '');
        link.setAttribute('aria-label', `Call ${phoneNumber}`);
    });
}

/**
 * Initialize all features when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initResponsiveFeatures();
        detectTouchDevice();
        addScrollEffects();
        setupPhoneLinks();
    });
} else {
    initResponsiveFeatures();
    detectTouchDevice();
    addScrollEffects();
    setupPhoneLinks();
}

// Export functions for external use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleMobileMenu,
        closeMobileMenu,
        initMobileMenu,
        initResponsiveFeatures
    };
}
