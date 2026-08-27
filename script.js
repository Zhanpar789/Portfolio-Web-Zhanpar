document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        lucide.createIcons();
    }

    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const nav = document.getElementById('site-nav');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (btn && menu) {
        const setMenuState = (isOpen) => {
            menu.classList.toggle('open', isOpen);
            btn.classList.toggle('active', isOpen);
            btn.setAttribute('aria-expanded', String(isOpen));
            btn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
            menu.setAttribute('aria-hidden', String(!isOpen));
        };

        btn.addEventListener('click', () => {
            setMenuState(!menu.classList.contains('open'));
        });

        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                setMenuState(false);
            });
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menu.classList.contains('open')) {
                setMenuState(false);
                btn.focus();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && menu.classList.contains('open')) {
                setMenuState(false);
            }
        });
    }

    const revealElements = document.querySelectorAll('.skill-card, .experience-card, .project-card, .stat-card, .info-card, .section-heading, .contact-card');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    const navLinks = document.querySelectorAll('.nav-link');
    const trackedSections = document.querySelectorAll('section[id]:not(#home)');

    const updateNavigation = () => {
        if (nav) {
            nav.classList.toggle('is-scrolled', window.scrollY > 12);
        }

        let activeId = '';
        trackedSections.forEach(section => {
            if (section.getBoundingClientRect().top <= 160) {
                activeId = section.id;
            }
        });

        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${activeId}`;
            link.classList.toggle('active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                updateNavigation();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });
    updateNavigation();

    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    const statObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }

            const number = entry.target;
            const target = Number(number.dataset.count);
            const suffix = number.dataset.suffix || '';

            if (reducedMotion) {
                number.textContent = `${target}${suffix}`;
            } else {
                const duration = 900;
                const startedAt = performance.now();
                const count = (now) => {
                    const progress = Math.min((now - startedAt) / duration, 1);
                    const easedProgress = 1 - Math.pow(1 - progress, 3);
                    number.textContent = `${Math.round(target * easedProgress)}${suffix}`;
                    if (progress < 1) {
                        window.requestAnimationFrame(count);
                    }
                };
                window.requestAnimationFrame(count);
            }

            observer.unobserve(number);
        });
    }, { threshold: 0.7 });

    statNumbers.forEach(number => statObserver.observe(number));

    const terminal = document.querySelector('.qa-terminal');
    const terminalStatus = document.querySelector('.terminal-status');
    if (terminal && terminalStatus) {
        const completeTerminal = () => {
            terminal.classList.add('is-complete');
            terminalStatus.textContent = 'Passed';
        };

        if (reducedMotion) {
            completeTerminal();
        } else {
            window.setTimeout(completeTerminal, 2400);
        }
    }

    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
});
