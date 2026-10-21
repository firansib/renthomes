/**
 * RentHome – script.js
 * Features: mobile nav toggle, sticky nav shadow, scroll-spy, scroll reveal
 * Codveda Level 1 Task 1 – Vanilla JS only, no external libraries
 */

/* ============================================================
   1. MOBILE NAVIGATION TOGGLE
============================================================ */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {

  /* Toggle open/close on button click */
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  /* Close nav when any nav link is clicked (smooth-scroll target) */
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  /* Close nav when user clicks outside the nav area */
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      closeNav();
    }
  });

  function closeNav() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
}

/* ============================================================
   2. STICKY NAVBAR SHADOW ON SCROLL
============================================================ */
const navbar = document.getElementById('navbar');

function handleNavShadow() {
  if (!navbar) return;
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavShadow, { passive: true });
handleNavShadow(); // run once on load in case page starts scrolled

/* ============================================================
   3. ACTIVE NAV LINK HIGHLIGHT (scroll-spy)
============================================================ */
const spySections = document.querySelectorAll('section[id], footer[id]');
const navLinkEls  = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  let currentId = '';
  const offset = 80; // navbar height offset

  spySections.forEach(section => {
    if (window.scrollY >= section.offsetTop - offset) {
      currentId = section.getAttribute('id');
    }
  });

  navLinkEls.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

/* ============================================================
   4. SCROLL REVEAL – IntersectionObserver
============================================================ */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // stop watching after reveal
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -24px 0px'
      }
    );

    revealEls.forEach(el => observer.observe(el));

  } else {
    /* Fallback for very old browsers – show everything immediately */
    revealEls.forEach(el => el.classList.add('visible'));
  }
}

/* Initialise after DOM is fully parsed */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}
