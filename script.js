//hamburger menu

// Select the hamburger button and the navigation container
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

// Listen for a click on the hamburger button
navToggle.addEventListener('click', () => {
    // Toggle the 'active' class on the nav so it slides/appears on mobile
    siteNav.classList.toggle('active');
});

//year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

//section transitions
const sections = document.querySelectorAll('main section:not(#hero)');

sections.forEach((section) => {
  section.classList.add('reveal');
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            entry.target.classList.add('is-visible');
          });
        });
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.01
  }
);

sections.forEach((section) => {
  revealObserver.observe(section);
});

//back-top top mobile fallback
const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
  backToTop.addEventListener('click', (event) => {
    event.preventDefault();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  });
}

//project card slide-in

const projectCards = document.querySelectorAll('.projects-grid .project-card');

if (projectCards.length > 0) {
  const cardObserver = new IntersectionObserver(
    (entries, observer) => {
      let stagger = 0;

      entries.forEach((entry) => {
        if (entry.isIntersecting && window.innerWidth <= 767) {
          const card = entry.target;
          card.classList.add('card-reveal');
          card.style.transitionDelay = `${stagger}ms`;
          stagger += 70;

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.classList.add('is-visible');
            });
          });

          observer.unobserve(card);
        }
      });
    },
    {
      threshold: 0.05,
      rootMargin: '0px 0px -15px 0px'
    }
  );

  projectCards.forEach((card) => {
    cardObserver.observe(card);
  });
}