document.addEventListener('DOMContentLoaded', function() {
    const htmlRoot = document.getElementById('html-root');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const langToggle = document.getElementById('lang-toggle');
    const langFlag = langToggle.querySelector('.lang-flag');
    const langText = langToggle.querySelector('.lang-text');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('primary-navigation');
    const backToTop = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let currentLang = localStorage.getItem('language') === 'en' ? 'en' : 'id';
    let currentTheme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark';

    function updateTheme(theme) {
        currentTheme = theme;
        htmlRoot.setAttribute('data-theme', theme);
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        themeToggle.setAttribute(
            'aria-label',
            translations[currentLang][theme === 'dark' ? 'theme-light-label' : 'theme-dark-label']
        );
    }

    function updateLanguage(lang) {
        currentLang = lang;
        htmlRoot.lang = lang;
        langFlag.textContent = lang === 'en' ? '🇺🇸' : '🇮🇩';
        langText.textContent = lang.toUpperCase();
        langToggle.setAttribute(
            'aria-label',
            translations[lang][lang === 'en' ? 'language-toggle-id' : 'language-toggle-en']
        );

        document.querySelectorAll('[data-lang-key]').forEach(function(element) {
            const key = element.getAttribute('data-lang-key');
            const translatedText = translations[lang][key];

            if (translatedText) {
                element.textContent = translatedText;
            }
        });

        themeToggle.setAttribute(
            'aria-label',
            translations[lang][currentTheme === 'dark' ? 'theme-light-label' : 'theme-dark-label']
        );
        hamburger.setAttribute(
            'aria-label',
            translations[lang][hamburger.getAttribute('aria-expanded') === 'true' ? 'menu-close' : 'menu-open']
        );
        backToTop.setAttribute('aria-label', translations[lang]['back-to-top']);
    }

    function setMenuOpen(isOpen) {
        hamburger.setAttribute('aria-expanded', String(isOpen));
        hamburger.classList.toggle('active', isOpen);
        navLinks.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-label', translations[currentLang][isOpen ? 'menu-close' : 'menu-open']);
    }

    updateTheme(currentTheme);
    updateLanguage(currentLang);

    if (!reducedMotion.matches && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -48px 0px',
            threshold: 0.08
        });
        const revealTargets = document.querySelectorAll('[data-reveal]');

        if (revealTargets.length) {
            document.body.classList.add('motion-ready');
            revealTargets.forEach(function(target) {
                revealObserver.observe(target);
            });
        }
    }

    themeToggle.addEventListener('click', function() {
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', nextTheme);
        updateTheme(nextTheme);
    });

    langToggle.addEventListener('click', function() {
        const nextLanguage = currentLang === 'en' ? 'id' : 'en';
        localStorage.setItem('language', nextLanguage);
        updateLanguage(nextLanguage);
    });

    hamburger.addEventListener('click', function() {
        setMenuOpen(hamburger.getAttribute('aria-expanded') !== 'true');
    });

    navLinks.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
            setMenuOpen(false);
        });
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
            setMenuOpen(false);
            hamburger.focus();
        }
    });

    document.addEventListener('click', function(event) {
        if (
            hamburger.getAttribute('aria-expanded') === 'true' &&
            !navLinks.contains(event.target) &&
            !hamburger.contains(event.target)
        ) {
            setMenuOpen(false);
        }
    });

    const navigationItems = Array.from(navLinks.querySelectorAll('.nav-link'));
    const sections = navigationItems
        .map(function(link) {
            return document.querySelector(link.getAttribute('href'));
        })
        .filter(Boolean);

    function updateActiveNavigation() {
        const currentPosition = window.scrollY + 140;
        let currentSection = sections[0];

        sections.forEach(function(section) {
            if (section.offsetTop <= currentPosition) {
                currentSection = section;
            }
        });

        navigationItems.forEach(function(link) {
            const isCurrent = link.getAttribute('href') === '#' + currentSection.id;
            link.classList.toggle('active', isCurrent);

            if (isCurrent) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });

        backToTop.classList.toggle('show', window.scrollY > 420);
    }

    window.addEventListener('scroll', updateActiveNavigation, { passive: true });
    window.addEventListener('resize', updateActiveNavigation);
    updateActiveNavigation();

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: reducedMotion.matches ? 'auto' : 'smooth'
        });
    });

    document.getElementById('current-year').textContent = String(new Date().getFullYear());

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = String(formData.get('name')).trim();
        const email = String(formData.get('email')).trim();
        const subject = String(formData.get('subject')).trim();
        const message = String(formData.get('message')).trim();
        const body = [
            translations[currentLang]['form-name'] + ': ' + name,
            translations[currentLang]['form-email'] + ': ' + email,
            '',
            message
        ].join('\n');
        const mailtoUrl = 'mailto:ezycrdansyh@gmail.com?subject=' +
            encodeURIComponent(subject) +
            '&body=' +
            encodeURIComponent(body);

        formStatus.textContent = translations[currentLang]['form-email-note'];
        window.location.href = mailtoUrl;
    });
});
