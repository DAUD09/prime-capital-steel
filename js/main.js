/* =============================================
   PRIME CAPITAL STEEL FABRICATORS
   Main JavaScript
   ============================================= */


/* ---------------------------------------------
   1. MOBILE NAV TOGGLE
   Clicking the hamburger opens/closes the menu
   --------------------------------------------- */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');

    // Animate the 3 hamburger lines into an X when open
    const spans = navToggle.querySelectorAll('span');
    const isOpen = navLinks.classList.contains('open');

    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu if user clicks any nav link (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity   = '';
      });
    });
  });
}


/* ---------------------------------------------
   2. ACTIVE NAV LINK
   Highlights the correct nav link on each page
   --------------------------------------------- */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.nav-links a').forEach(link => {
  // Remove any active class set in HTML first
  link.classList.remove('active');

  const linkPage = link.getAttribute('href');
  if (linkPage === currentPage) {
    link.classList.add('active');
  }

  // Special case: root URL should highlight Home
  if (currentPage === '' && linkPage === 'index.html') {
    link.classList.add('active');
  }
});


/* ---------------------------------------------
   3. SCROLL REVEAL ANIMATION
   Elements fade + slide up when they enter the
   viewport as the user scrolls down the page.
   --------------------------------------------- */

// Respect user's "reduce motion" system setting
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!prefersReducedMotion) {

  // Watch every element with class "reveal" or "reveal-group"
  const revealEls = document.querySelectorAll('.reveal, .reveal-group');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Stop watching once it has appeared — no re-play
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,   // trigger when 12% of element is in view
      rootMargin: '0px 0px -40px 0px' // trigger slightly before bottom edge
    }
  );

  revealEls.forEach(el => observer.observe(el));

} else {
  // If user prefers no motion: just make everything visible immediately
  document.querySelectorAll('.reveal, .reveal-group').forEach(el => {
    el.classList.add('visible');
  });
}


/* ---------------------------------------------
   4. STICKY NAV SHADOW
   Adds a slightly stronger shadow to the navbar
   when the user has scrolled down even a little
   --------------------------------------------- */
const navbar = document.querySelector('.navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
    } else {
      navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    }
  }, { passive: true }); // passive = better scroll performance
}


/* ---------------------------------------------
   5. CLOSE NAV ON OUTSIDE CLICK (mobile)
   If user taps anywhere outside the menu, it closes
   --------------------------------------------- */
document.addEventListener('click', (e) => {
  if (!navToggle || !navLinks) return;
  const clickedInsideNav = navToggle.contains(e.target) || navLinks.contains(e.target);
  if (!clickedInsideNav && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity   = '';
    });
  }
});