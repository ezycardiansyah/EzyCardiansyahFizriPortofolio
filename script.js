// Main JavaScript file for portfolio website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Tambahkan kode ini di bagian akhir file script.js setelah DOMContentLoaded:

// Enhanced timeline hover effects
document.querySelectorAll('.timeline-content').forEach(content => {
    content.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px)';
        this.querySelector('.timeline-icon').style.transform = 'scale(1.2)';
        this.querySelector('.timeline-icon').style.color = 'var(--secondary-color)';
    });
    
    content.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
        this.querySelector('.timeline-icon').style.transform = 'scale(1)';
        this.querySelector('.timeline-icon').style.color = 'var(--primary-color)';
    });
});

// Animate timeline items on scroll
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    if (item.classList.contains('fade-right')) {
        item.style.transform = 'translateX(-50px)';
    } else if (item.classList.contains('fade-left')) {
        item.style.transform = 'translateX(50px)';
    }
    
    timelineObserver.observe(item);
});

// Animate summary cards
const summaryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll('.summary-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    summaryObserver.observe(card);
});
    
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const htmlRoot = document.getElementById('html-root');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme or prefered color scheme
    const savedTheme = localStorage.getItem('theme') || 'light';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (savedTheme === 'light' && prefersDark)) {
        htmlRoot.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', function() {
        if (htmlRoot.getAttribute('data-theme') === 'dark') {
            htmlRoot.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            htmlRoot.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });
    
    // Language Toggle
    const langToggle = document.getElementById('lang-toggle');
    const langFlag = langToggle.querySelector('.lang-flag');
    const langText = langToggle.querySelector('.lang-text');
    
    // Check for saved language
    let currentLang = localStorage.getItem('language') || 'id';
    
    // Set initial language
    updateLanguage(currentLang);
    
    langToggle.addEventListener('click', function() {
        currentLang = currentLang === 'en' ? 'id' : 'en';
        localStorage.setItem('language', currentLang);
        updateLanguage(currentLang);
    });
    
    function updateLanguage(lang) {
        // Update flag and text
        if (lang === 'en') {
            langFlag.textContent = '🇺🇸';
            langText.textContent = 'EN';
        } else {
            langFlag.textContent = '🇮🇩';
            langText.textContent = 'ID';
        }
        
        // Update all elements with data-lang-key attribute
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.setAttribute('placeholder', translations[lang][key]);
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
    }
    
    // Loading Animation
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
        }, 1000);
    });
    
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (barPosition < screenPosition) {
            bar.style.width = width + '%';
            
            // Add animation class
            bar.classList.add('animated');
            
            // Animate percentage counter if you want
            const percentElement = bar.closest('.skill-item').querySelector('.skill-percent');
            if (percentElement && !percentElement.classList.contains('animated')) {
                percentElement.classList.add('animated');
                let current = 0;
                const target = parseInt(width);
                const increment = target / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    percentElement.textContent = Math.floor(current) + '%';
                }, 20);
            }
        }
    });
};

// Initialize skill bars on page load if already in view
window.addEventListener('load', animateSkillBars);
window.addEventListener('scroll', animateSkillBars);
    
    window.addEventListener('scroll', animateSkillBars);
    
    // Initialize skill bars on page load if already in view
    animateSkillBars();
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // In a real application, you would send this data to a server
        // For this demo, we'll just show an alert
        alert(`Thank you for your message, ${name}! I'll get back to you soon at ${email}.`);
        
        // Reset form
        contactForm.reset();
    });
    
    // Parallax effect for background elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const circles = document.querySelectorAll('.bg-circle');
        
        circles.forEach((circle, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            circle.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Add hover effect to glass cards
    const glassCards = document.querySelectorAll('.glass-card');
    
    glassCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Initialize floating elements animation
    const floatElements = document.querySelectorAll('.float-element');
    
    floatElements.forEach((element, index) => {
        // Set random initial delay for each element
        element.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Add scroll animation to sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Form input focus effects
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });

});

function checkFontAwesome() {
    console.log('=== FONT AWESOME DEBUG ===');
    
    // Cek apakah Font Awesome sudah loaded
    const styleSheets = Array.from(document.styleSheets);
    const hasFontAwesome = styleSheets.some(sheet => {
        try {
            return sheet.href && sheet.href.includes('fontawesome');
        } catch (e) {
            return false;
        }
    });
    
    console.log('Font Awesome loaded:', hasFontAwesome);
    
    // Cek icon elements
    const icons = document.querySelectorAll('.fa, .fab, .fas, .far');
    console.log('Total Font Awesome icons found:', icons.length);
    
    if (icons.length === 0) {
        console.error('❌ Tidak ada icon Font Awesome yang ditemukan!');
        console.log('Mencoba load Font Awesome secara manual...');
        
        // Load Font Awesome secara dinamis
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(link);
        
        console.log('✅ Font Awesome dimuat ulang');
    } else {
        console.log('✅ Font Awesome icons ditemukan');
        
        // Cek style setiap icon
        icons.forEach((icon, index) => {
            const style = window.getComputedStyle(icon, '::before');
            const content = style.content;
            console.log(`Icon ${index + 1} (${icon.className}):`, {
                content: content,
                fontFamily: style.fontFamily,
                display: style.display
            });
            
            // Jika content kosong, berarti font tidak loaded
            if (content === 'none' || content === '""') {
                console.warn(`⚠️ Icon ${icon.className} tidak memiliki content!`);
            }
        });
    }
}

// Run check setelah page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkFontAwesome, 1000); // Tunggu 1 detik
});
