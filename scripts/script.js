/**
 * Main Script File
 * @author Kunal Yadav
 */

// Unified animation observer
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            // Handle fade-in animation
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            // Handle skill animations
            if (element.classList.contains('skill-item')) {
                element.style.animationPlayState = 'running';
            }
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

// Function to setup fade-in elements
function setupFadeInElement(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
    animationObserver.observe(element);
}

// Setup hover effects for nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        e.target.style.color = 'var(--secondary-color) !important';
        e.target.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', (e) => {
        e.target.style.color = '';
        e.target.style.transform = '';
    });
});

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Setup fade-in animations for all elements
    document.querySelectorAll('.skill-item, .project-card, .education-card, .contact-method').forEach(setupFadeInElement);
    
    // Setup skill items specific properties
    document.querySelectorAll('.skill-item').forEach((item, index) => {
        item.style.setProperty('--i', index + 1);
        item.style.animationPlayState = 'paused';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight/3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}); 
// ObserverOptions/observer (for scroll animations)
const scrollAnimationOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "-50px"
};

const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        } else {
            entry.target.classList.remove('animate-in');
        }
    });
}, scrollAnimationOptions);

// Elements to animate
const animateElements = [
    '.section-title',
    '.skill-item',
    '.project-card',
    '.education-card',
    '.contact-card'
];

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add animate-hidden class to all elements we want to animate
    animateElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('animate-hidden');
            scrollAnimationObserver.observe(element);
        });
    });
});

// Add hover animation for skill items
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.transform = `translateY(-10px) scale(1.05) rotate(${Math.random() * 5 - 2.5}deg)`;
    });
    
    item.addEventListener('mouseout', () => {
        item.style.transform = '';
    });
});


// Cleanup interval when window loses focus
window.addEventListener('blur', () => {
    if (trailInterval) {
        clearInterval(trailInterval);
        trailInterval = null;
    }
});

// Add this code to handle page reload scrolling
window.onload = function() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    
    if (window.location.hash) {
        history.replaceState(null, null, ' ');
    }
};

// Initialize EmailJS with your user ID
emailjs.init("PV-1dMffQ_fHCe7EE");

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    const thankYouMessage = document.getElementById('thank-you-message');
    emailjs.sendForm('service_u6hktph', 'template_10e5x2v', this)
        .then(() => {
            thankYouMessage.innerHTML = '👍 Thank you for reaching out! I will get back to you as soon as possible. 😊';
            thankYouMessage.style.display = 'block'; // Show the thank you message
            this.reset(); // Clear the form fields
        })
        .catch(() => {
            thankYouMessage.innerHTML = '❌ Failed to send message. Please try again.'; // Set error message
            thankYouMessage.style.display = 'block'; // Show the error message
        });
});

// Add this code to hide the thank you message when user interacts with the form fields
document.querySelectorAll('#contact-form input, #contact-form textarea').forEach(field => {
    field.addEventListener('focus', () => {
        const thankYouMessage = document.getElementById('thank-you-message');
        thankYouMessage.style.display = 'none'; // Hide the thank you message
    });
}); 

