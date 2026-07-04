// ============================================================
// Abdul Qadoos Portfolio — main.js
// ============================================================

(function () {
  'use strict';

  /* ---- NAV: scroll class + mobile toggle ---- */
  const nav = document.querySelector('nav');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  toggle?.addEventListener('click', () => {
    nav.classList.toggle('open');
    const isOpen = nav.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen);
    // Animate hamburger lines
    const spans = toggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close mobile nav on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle?.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  /* ---- SCROLL-TRIGGERED FADE-IN ---- */
  const fadeEls = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger children inside a parent
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach((el, i) => {
      // Auto-stagger siblings
      const parent = el.parentElement;
      const siblings = Array.from(parent.children).filter(c => c.classList.contains('fade-up'));
      const idx = siblings.indexOf(el);
      el.dataset.delay = idx * 80;
      io.observe(el);
    });
  } else {
    // Fallback: show everything
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ---- SMOOTH SCROLL for hash links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 70; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- ACTIVE NAV LINK on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveLink() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });
    navAnchors.forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href') === '#' + current) {
        a.style.color = 'var(--accent)';
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* ---- TYPEWRITER effect for hero title ---- */
  const typeTarget = document.getElementById('typewriter');
  if (typeTarget) {
    const roles = [
      'DevOps Engineer',
      'Cloud Engineer · Azure',
      'CI/CD & Automation',
      'AI / ML Researcher',
      'Linux & Infrastructure',
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let paused = false;

    function type() {
      if (paused) return;
      const current = roles[roleIdx];

      if (deleting) {
        typeTarget.textContent = current.substring(0, charIdx--);
        if (charIdx < 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          setTimeout(type, 400);
          return;
        }
        setTimeout(type, 45);
      } else {
        typeTarget.textContent = current.substring(0, charIdx++);
        if (charIdx > current.length) {
          paused = true;
          setTimeout(() => { paused = false; deleting = true; type(); }, 2200);
          return;
        }
        setTimeout(type, 80);
      }
    }

    setTimeout(type, 800);
  }

  /* ---- CURSOR blink for typewriter ---- */
  const cursor = document.getElementById('cursor');
  if (cursor) {
    setInterval(() => cursor.classList.toggle('hidden'), 530);
  }

  /* ---- Respect reduced motion ---- */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.documentElement.style.setProperty('--transition', '0s');
    fadeEls.forEach(el => el.classList.add('visible'));
  }

})();
