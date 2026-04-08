// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Change icon based on menu state
        const icon = menuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close menu when clicking on a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Typing Animation for Home Page
const typedTextElement = document.getElementById('typed-text');
if (typedTextElement) {
    const roles = ['Java Developer', 'Spring Boot Expert', 'Full Stack Developer', 'Problem Solver'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            currentText = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        typedTextElement.textContent = currentText;
        
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeEffect, 500);
            return;
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeEffect, speed);
    }
    
    typeEffect();
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add Active Class to Current Page Navigation
const currentLocation = window.location.pathname;
const navLinksAll = document.querySelectorAll('.nav-links a');

navLinksAll.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentLocation.includes(linkPath) && linkPath !== 'index.html') {
        link.classList.add('active');
    } else if (currentLocation === '/' || currentLocation === '/index.html') {
        if (linkPath === 'index.html') {
            link.classList.add('active');
        }
    }
});

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to cards and sections
document.querySelectorAll('.stat-card, .skill-category-card, .cert-card, .feature-card, .internship-card, .education-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form Validation for Contact Page
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name')?.value;
        const email = document.getElementById('email')?.value;
        const message = document.getElementById('message')?.value;
        
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
    });
}

// Email Validation Function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add Notification Animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Project Filter Functionality (if needed)
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Dark Mode Toggle (Optional)
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
}

// Add Dark Mode Styles (Optional)
const darkModeStyles = `
    body.dark-mode {
        background: linear-gradient(135deg, #1e293b, #0f172a);
    }
    
    body.dark-mode .page,
    body.dark-mode #home,
    body.dark-mode .page-section,
    body.dark-mode .stat-card,
    body.dark-mode .skill-category-card,
    body.dark-mode .cert-card,
    body.dark-mode .feature-card,
    body.dark-mode .internship-card,
    body.dark-mode .education-card {
        background: #1e293b;
        color: #e2e8f0;
    }
    
    body.dark-mode .home-text h1,
    body.dark-mode .section-title,
    body.dark-mode .page h1 {
        color: #e2e8f0;
    }
    
    body.dark-mode .home-text p,
    body.dark-mode .page p {
        color: #94a3b8;
    }
`;

// Add dark mode styles
const darkStyle = document.createElement('style');
darkStyle.textContent = darkModeStyles;
document.head.appendChild(darkStyle);

// Initialize dark mode
initDarkMode();

// Console log for debugging
console.log('Portfolio website loaded successfully!');
console.log('Created by Seema Patel - Java Full Stack Developer');