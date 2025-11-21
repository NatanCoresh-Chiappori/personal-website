// Theme Toggle - Simple and working
(function() {
    'use strict';
    
    const html = document.documentElement;
    let initialized = false;
    
    // Set initial theme immediately
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    
    // Toggle function
    function toggleTheme(event) {
        const current = html.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';

        // Figure out where the click happened (center of the toggle button)
        const btn = document.getElementById('themeToggle');
        if (btn) {
            const rect = btn.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            // Store position & color for the radial "sunrise/sunset" flash
            html.style.setProperty('--theme-flash-x', `${cx}px`);
            html.style.setProperty('--theme-flash-y', `${cy}px`);
            html.style.setProperty('--theme-flash-color', next === 'light' ? '#ffb347' : '#0b1020');

            // Trigger flash animation
            html.classList.add('theme-flash');
            setTimeout(() => {
                html.classList.remove('theme-flash');
            }, 600);
        }
        
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        
        // Update icon
        if (btn) {
            const icon = btn.querySelector('.theme-icon');
            if (icon) {
                icon.textContent = next === 'light' ? '🌙' : '☀️';
            }
        }
    }
    
    // Setup function
    function init() {
        if (initialized) return;
        
        const btn = document.getElementById('themeToggle');
        if (!btn) {
            setTimeout(init, 100);
            return;
        }
        
        initialized = true;
        
        // Update icon on load
        const icon = btn.querySelector('.theme-icon');
        if (icon) {
            const isLight = html.getAttribute('data-theme') === 'light';
            icon.textContent = isLight ? '🌙' : '☀️';
        }
        
        // Add click handler
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            toggleTheme(e);
        }, true);
    }
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    window.addEventListener('load', init);
})();

// Mobile Navigation Toggle (Sidebar)
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');

if (hamburger && navbar) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
            }
        });
    });

    // Close menu when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && navbar.classList.contains('active')) {
            if (!navbar.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
            }
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations (reduced on mobile)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // On mobile, immediately show without animation
            if (window.innerWidth <= 768) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'none';
            }
        }
    });
}, observerOptions);

// Function to initialize animations based on screen size
function initializeAnimations() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // On mobile, just make everything visible immediately
        document.querySelectorAll('section, .work-item, .contact-item').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.classList.remove('fade-in');
        });
    } else {
        // On desktop, enable fade-in animations
        document.querySelectorAll('section, .work-item, .contact-item').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
            // Remove inline styles that might have been set on mobile
            el.style.opacity = '';
            el.style.transform = '';
        });
    }
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnimations);
} else {
    initializeAnimations();
}

// Re-check on resize (debounced)
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initializeAnimations, 250);
});

// Animate skill bars when they come into view (disabled on mobile)
function initializeSkillBars() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // On mobile, show skill bars immediately at their final width
        document.querySelectorAll('.skill-progress').forEach(bar => {
            bar.style.transition = 'none';
        });
    } else {
        // On desktop, enable skill bar animations
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            bar.style.transition = ''; // Reset transition
        });
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.style.width;
                    progressBar.style.width = '0';
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 100);
                    skillObserver.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }
}

// Initialize skill bars
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSkillBars);
} else {
    initializeSkillBars();
}

// Parallax effect for hero section (disabled on mobile)
let parallaxEnabled = window.innerWidth > 768;

window.addEventListener('scroll', () => {
    // Disable parallax on mobile devices
    if (!parallaxEnabled || window.innerWidth <= 768) {
        parallaxEnabled = false;
        return;
    }
    
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// Update parallax enabled state on resize
window.addEventListener('resize', () => {
    parallaxEnabled = window.innerWidth > 768;
    if (!parallaxEnabled) {
        const hero = document.querySelector('.hero-content');
        if (hero) {
            hero.style.transform = '';
            hero.style.opacity = '';
        }
    }
});

// Section names mapping
const sectionNames = {
    'home': 'Natan Coresh-Chiappori',
    'about': 'About',
    'work': 'Work',
    'blog': 'Blog',
    'contact': 'Contact'
};

// Section Indicator Pill
const sectionIndicator = document.getElementById('sectionIndicator');
let indicatorText = null;
let currentSectionName = 'Natan Coresh-Chiappori';

if (sectionIndicator) {
    indicatorText = sectionIndicator.querySelector('.indicator-text');
}

// Update section indicator
function updateSectionIndicator(sectionId) {
    if (!sectionIndicator || !indicatorText) return;
    
    const newName = sectionNames[sectionId] || 'Natan Coresh-Chiappori';
    
    if (newName !== currentSectionName) {
        // Add updating class for animation
        sectionIndicator.classList.add('updating');
        
        setTimeout(() => {
            indicatorText.textContent = newName;
            currentSectionName = newName;
            sectionIndicator.classList.remove('updating');
        }, 150);
    }
}

// Show indicator on scroll
if (sectionIndicator) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            sectionIndicator.classList.add('visible');
        } else {
            sectionIndicator.classList.remove('visible');
        }
    });
}

// Scroll-based menu underline animations
(function() {
    'use strict';
    
    let sectionLinkMap = {};
    let sections = [];
    let navLinks = [];
    let scrollListenerAttached = false;
    
    function initScrollAnimations() {
        console.log('=== INIT SCROLL ANIMATIONS ===');
        
        // Get sections and links
        sections = Array.from(document.querySelectorAll('section[id]'));
        navLinks = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
        
        console.log('Sections found:', sections.length);
        console.log('Nav links found:', navLinks.length);
        console.log('Sections:', sections.map(s => s.getAttribute('id')));
        console.log('Links:', navLinks.map(l => l.getAttribute('href')));
        
        if (sections.length === 0 || navLinks.length === 0) {
            console.log('⚠️ Retrying scroll init in 100ms...');
            setTimeout(initScrollAnimations, 100);
            return;
        }
        
        console.log('✓ Sections and links found, continuing...');
        
        // Map section IDs to nav links
        sectionLinkMap = {};
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const sectionId = href.substring(1);
                sectionLinkMap[sectionId] = link;
                console.log('Mapped section:', sectionId, 'to link:', link);
            }
        });
        
        console.log('Section link map:', sectionLinkMap);
        
        // Track which sections we've passed
        let sectionPassedStates = {};
        
        // Simple scroll-based detection - optimized for performance
        function checkSectionsForPopOut() {
            const scrollPos = window.pageYOffset || window.scrollY || document.documentElement.scrollTop || 0;
            const viewportHeight = window.innerHeight;
            
            sections.forEach(section => {
                const sectionId = section.getAttribute('id');
                const link = sectionLinkMap[sectionId];
                
                if (!link) return;
                
                const wasPastSection = sectionPassedStates[sectionId] || false;
                
                // Get section position - cache rect for performance
                const rect = section.getBoundingClientRect();
                
                // For contact section, trigger when section enters viewport
                // For blog section, also trigger when it becomes clearly visible
                // For other sections, trigger when section top is above viewport center
                let isPastSection;
                if (sectionId === 'contact') {
                    // Contact: trigger when section top is less than 70% of viewport (section is becoming visible)
                    isPastSection = rect.top < viewportHeight * 0.7 && rect.bottom > 0;
                } else if (sectionId === 'blog') {
                    // Blog: trigger when section is within ~80% of viewport height
                    isPastSection = rect.top < viewportHeight * 0.8 && rect.bottom > 0;
                } else {
                    const sectionTop = rect.top + scrollPos;
                    const triggerPoint = sectionTop - (viewportHeight * 0.2);
                    isPastSection = scrollPos >= triggerPoint;
                }
                
                // If we just crossed the threshold (entered the section)
                if (isPastSection && !wasPastSection) {
                    sectionPassedStates[sectionId] = true;
                    
                    // Make visible
                    if (!link.classList.contains('visible')) {
                        link.classList.add('visible');
                    }
                    
                    // Trigger animation
                    link.classList.remove('pop-out');
                    requestAnimationFrame(() => {
                        link.classList.add('pop-out');
                        setTimeout(() => {
                            link.classList.remove('pop-out');
                        }, 300);
                    });
                }
                // Reset when scrolling back up past the section (allow re-triggering)
                else if (!isPastSection && wasPastSection) {
                    sectionPassedStates[sectionId] = false;
                }
            });
        }
        
        // No home link anymore - removed from navigation
        
        // Attach scroll listener for active section and underline animation
        if (!scrollListenerAttached) {
            console.log('Setting up scroll listener...');
            
            let ticking = false;
            
            function onScroll() {
                if (!ticking) {
                    window.requestAnimationFrame(function() {
                        checkSectionsForPopOut(); // Check for pop-out animations
                        handleScroll(); // Handle active state
                        ticking = false;
                    });
                    ticking = true;
                }
            }
            
            window.addEventListener('scroll', onScroll, { passive: true });
            scrollListenerAttached = true;
            console.log('✓ Scroll listener attached');
            
            // Test scroll immediately
            console.log('Testing scroll detection...');
            setTimeout(() => {
                onScroll();
            }, 100);
            
            // Also handle resize
            window.addEventListener('resize', function() {
                checkSectionsForPopOut();
                handleScroll();
            }, { passive: true });
        }
        
        // Initial check
        setTimeout(() => {
            console.log('=== Initial check ===');
            checkSectionsForPopOut();
        }, 500);
        
        // Also expose the function for manual testing
        window.checkPopOut = checkSectionsForPopOut;
        
        // Initial call
        setTimeout(() => {
            console.log('Calling handleScroll initially');
            handleScroll();
            
            // No home link to activate
        }, 300);
    }
    
    let lastActiveSection = '';
    
    function handleScroll() {
        if (sections.length === 0) return;
        
        const scrollPos = window.pageYOffset || window.scrollY || document.documentElement.scrollTop || 0;
        const viewportHeight = window.innerHeight;
        let activeSection = 'about'; // Default to about since home is removed
        
        // At top = home (if we have a home section)
        if (scrollPos < 50) {
            const homeSection = sections.find(s => s.getAttribute('id') === 'home');
            if (homeSection) {
                activeSection = 'home';
                lastActiveSection = activeSection;
                updateActiveLink(activeSection);
                return;
            } else {
                activeSection = 'about';
            }
        }
        
        // Find active section - check from top to bottom to find the last section we've scrolled past
        // This ensures we don't skip any sections
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const sectionId = section.getAttribute('id');
            
            // Skip home section (handled above)
            if (sectionId === 'home') continue;
            
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + scrollPos;
            
            // Special handling for contact and blog sections
            if (sectionId === 'contact') {
                if (rect.top < viewportHeight * 0.7 && rect.bottom > 0) {
                    activeSection = sectionId;
                    break;
                }
                continue;
            }
            if (sectionId === 'blog') {
                // Blog becomes active when it's comfortably in view
                if (rect.top < viewportHeight * 0.6 && rect.bottom > 0) {
                    activeSection = sectionId;
                }
                continue;
            }
            
            // For other sections (about, work):
            // Section is active if we've scrolled past its top (with offset)
            // We check from top to bottom, so the last matching section wins
            if (scrollPos >= sectionTop - 200) {
                activeSection = sectionId;
            } else {
                // Once we hit a section we haven't scrolled past, stop
                // (since sections are in order)
                break;
            }
        }
        
        // Only update if active section changed
        if (activeSection === lastActiveSection) {
            return;
        }
        
        lastActiveSection = activeSection;
        updateActiveLink(activeSection);
    }
    
    function updateActiveLink(activeSection) {
        // Update nav links immediately (only when active section changes)
        sections.forEach(section => {
            const sectionId = section.getAttribute('id');
            const link = sectionLinkMap[sectionId];
            
            if (!link) return;
            
            const isActive = sectionId === activeSection;
            
            if (isActive) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Update section indicator
        if (activeSection && typeof updateSectionIndicator === 'function') {
            updateSectionIndicator(activeSection);
        }
    }
    
    // Expose for manual testing
    window.testScrollHandler = function() {
        console.log('=== MANUAL TEST ===');
        console.log('Sections:', sections);
        console.log('Nav links:', navLinks);
        console.log('Section link map:', sectionLinkMap);
        handleScroll();
    };
    
    // Manual test function to trigger pop-out animation
    window.testPopOut = function(sectionId) {
        const link = sectionLinkMap[sectionId];
        if (link) {
            console.log(`Manually triggering pop-out for: ${sectionId}`);
            link.classList.add('visible');
            link.classList.add('pop-out');
            setTimeout(() => {
                link.classList.remove('pop-out');
            }, 600);
        } else {
            console.log(`No link found for section: ${sectionId}`);
        }
    };
    
    // Initialize
    function start() {
        initScrollAnimations();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
    
    window.addEventListener('load', start);
    setTimeout(start, 500);
})();

// On non-reload navigations, allow auto-scroll via ?section=... (e.g. from another page)
window.addEventListener('load', () => {
    try {
        let isReload = false;
        if (window.performance && performance.getEntriesByType) {
            const navEntries = performance.getEntriesByType('navigation');
            if (navEntries && navEntries.length > 0) {
                isReload = navEntries[0].type === 'reload';
            }
        } else if (window.performance && performance.navigation) {
            // Fallback for older browsers
            isReload = performance.navigation.type === 1; // TYPE_RELOAD
        }

        // Only auto-scroll when this is NOT a reload
        if (!isReload) {
            const params = new URLSearchParams(window.location.search);
            const sectionId = params.get('section');
            if (sectionId) {
                const target = document.getElementById(sectionId);
                if (target) {
                    target.scrollIntoView({ behavior: 'auto', block: 'start' });
                }
            }
        }
    } catch (e) {
        console.error('Error handling section query param', e);
    }
});
// Add hover effect to work items
document.querySelectorAll('.work-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Smooth reveal for work items with stagger effect (disabled on mobile)
function initializeWorkItemStagger() {
    const isMobile = window.innerWidth <= 768;
    const workItems = document.querySelectorAll('.work-item');
    
    if (isMobile) {
        // On mobile, remove all delays
        workItems.forEach(item => {
            item.style.transitionDelay = '0s';
        });
    } else {
        // On desktop, add stagger effect
        workItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    }
}

// Initialize work item stagger
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWorkItemStagger);
} else {
    initializeWorkItemStagger();
}

// Add click effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Initialize on page load (reduced animation on mobile)
function initializePageLoad() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // On mobile, show immediately
        document.body.style.opacity = '1';
    } else {
        // On desktop, enable fade-in
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    }
}

window.addEventListener('load', initializePageLoad);


