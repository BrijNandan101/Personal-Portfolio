// =====================
// 1. Navigation & Section Switching
// =====================
const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

function isMobileView() {
  return window.innerWidth <= 992;
}

function showSection(idx) {
  sections.forEach((section, i) => {
    if (i === idx) {
      section.classList.add('active');
      section.style.visibility = 'visible';
      section.style.opacity = '1';
    } else {
      section.classList.remove('active');
      section.style.visibility = 'hidden';
      section.style.opacity = '0';
    }
  });
  document.body.style.overflow = 'auto';
  document.documentElement.style.overflow = 'auto';
  if (isMobileView()) {
    navbar.classList.remove('active');
    menuIcon.classList.remove('bx-x');
  }
}

menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
});

navLinks.forEach((link, idx) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(idx);
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

logoLink.addEventListener('click', () => {
  if (!navLinks[0].classList.contains('active')) {
    navLinks.forEach(l => l.classList.remove('active'));
    navLinks[0].classList.add('active');
    showSection(0);
  }
});

window.addEventListener('resize', () => {
  const activeIdx = Array.from(navLinks).findIndex(link => link.classList.contains('active'));
  showSection(activeIdx >= 0 ? activeIdx : 0);
});
window.addEventListener('DOMContentLoaded', () => {
  const activeIdx = Array.from(navLinks).findIndex(link => link.classList.contains('active'));
  showSection(activeIdx >= 0 ? activeIdx : 0);
});

// =====================
// 2. Animated Counters
// =====================
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const interval = 2000;
    const increment = target / (interval / 50);
    let current = 0;
    // Remove .counter-animate toggling
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 50);
      } else {
        if (counter.closest('.code')) {
          counter.textContent = `${target}+`;
        } else {
          counter.textContent = target;
        }
      }
    };
    updateCounter();
  });
}
setInterval(animateCounters, 5000);
animateCounters();

// =====================
// 3. Skills Progress Bars
// =====================
function renderCircularProgress() {
  document.querySelectorAll('.circular-progress').forEach(el => {
    const percent = parseInt(el.getAttribute('data-skill'), 10) || 0;
    el.innerHTML = `
      <svg width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="20" fill="none" stroke="#222" stroke-width="6" />
        <circle cx="24" cy="24" r="20" fill="none" stroke="var(--main-color)" stroke-width="6" stroke-dasharray="${Math.PI*2*20}" stroke-dashoffset="${Math.PI*2*20*(1-percent/100)}" style="transition: stroke-dashoffset 1s;" />
      </svg>
      <span class="progress-text">${percent}%</span>
    `;
    el.style.setProperty('--percent', percent);
  });
}
window.addEventListener('DOMContentLoaded', renderCircularProgress);

function renderSkillProgress() {
  document.querySelectorAll('.skill-progress').forEach(el => {
    const percent = parseInt(el.getAttribute('data-skill'), 10) || 0;
    let fill = el.querySelector('.progress-fill');
    if (!fill) {
      fill = document.createElement('div');
      fill.className = 'progress-fill';
      el.appendChild(fill);
    }
    fill.style.width = percent + '%';
    const text = el.querySelector('.progress-text');
    if (text) text.remove();
  });
}
window.addEventListener('DOMContentLoaded', () => {
  renderSkillProgress();
  const skillSection = document.querySelector('.resume-detail.skills.active');
  if (skillSection) renderSkillProgress();
});

// =====================
// 4. Resume Tab Switching
// =====================
const resumeBtns = document.querySelectorAll('.resume-btn');
resumeBtns.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    const resumeDetails = document.querySelectorAll('.resume-detail');
    resumeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    resumeDetails.forEach(detail => detail.classList.remove('active'));
    resumeDetails[idx].classList.add('active');
    if (resumeDetails[idx].classList.contains('skills')) {
      renderSkillProgress();
    }
  });
});

// =====================
// 5. Project Carousel & Details Sync
// =====================
const slides = document.querySelectorAll('.img-item'); // Images in the carousel
const projectDetails = document.querySelectorAll('.projects-details'); // Project details
const slidesContainer = document.querySelector('.img-slide'); // Container for the slides
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;

// Function to update the visible slide and project details
function updateSlider() {
  // Move the slides container
  slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Update project details
  projectDetails.forEach((detail, index) => {
    if (index === currentIndex) {
      detail.classList.add('active');
    } else {
      detail.classList.remove('active');
    }
  });

  // Update navigation buttons
  if (currentIndex === 0) {
    prevBtn.classList.add('disabled');
  } else {
    prevBtn.classList.remove('disabled');
  }

  if (currentIndex === slides.length - 1) {
    nextBtn.classList.add('disabled');
  } else {
    nextBtn.classList.remove('disabled');
  }
}

// Go to the next slide
function goToNextSlide() {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    updateSlider();
  }
}

// Go to the previous slide
function goToPreviousSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
}

// Add event listeners to buttons
nextBtn.addEventListener('click', goToNextSlide);
prevBtn.addEventListener('click', goToPreviousSlide);

// Initialize the slider
updateSlider();
// =====================
// 6. Scroll Reveal Animation
// =====================
// Only observe .reveal elements that are not inside .img-slide or do not have .img-item class
const revealElements = Array.from(document.querySelectorAll('.reveal')).filter(el => {
  // Exclude .img-slide and .img-item
  if (el.classList.contains('img-item') || el.classList.contains('img-slide')) return false;
  // Exclude children of .img-slide
  let parent = el.parentElement;
  while (parent) {
    if (parent.classList && parent.classList.contains('img-slide')) return false;
    parent = parent.parentElement;
  }
  return true;
});
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealElements.forEach(el => {
  revealObserver.observe(el);
});

// =====================
// 7. Typewriter Effect
// =====================
const typewriterTitles = ["Coder", "Frontend Developer", "UI/UX Designer"];
const typewriterSpan = document.getElementById('typewriter');
let typewriterIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterDelay = 120;
function typewriterTick() {
  if (!typewriterSpan) return;
  const current = typewriterTitles[typewriterIndex];
  if (isDeleting) {
    typewriterSpan.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      typewriterIndex = (typewriterIndex + 1) % typewriterTitles.length;
      charIndex = 0;
      setTimeout(typewriterTick, 500);
    } else {
      setTimeout(typewriterTick, 40);
    }
  } else {
    typewriterSpan.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(typewriterTick, 1000);
    } else {
      setTimeout(typewriterTick, typewriterDelay);
    }
  }
}
if (typewriterSpan) {
  typewriterSpan.style.visibility = 'visible';
  typewriterSpan.style.opacity = '1';
  typewriterTick();
}

// =====================
// 8. Parallax Home Image
// =====================
const homeImgBox = document.querySelector('.home-img .img-box');
window.addEventListener('scroll', () => {
  if (homeImgBox) {
    const scrollY = window.scrollY;
    homeImgBox.style.setProperty('--parallax-y', `${scrollY * 0.15}px`);
  }
});

// =====================
// 9. Theme Toggle
// =====================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
function setTheme(light) {
  document.body.classList.toggle('light-theme', light);
  if (themeIcon) {
    themeIcon.className = light ? 'bx bx-sun' : 'bx bx-moon';
  }
}
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = !document.body.classList.contains('light-theme');
    setTheme(isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggle.classList.toggle('active', isLight);
  });
  // On load, set theme from localStorage
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    setTheme(true);
    themeToggle.classList.add('active');
  }
}

// =====================
// 10. Gradient Logic (Light Mode Only)
// =====================
const darkGradients = [];
const lightGradients = [
  'linear-gradient(var(--gradient-angle), #f9fafb 60%, #e3eafc 100%)', // white to very light blue
  'linear-gradient(var(--gradient-angle), #f9fafb 0%, #e3eafc 100%)', // white to very light blue
  'linear-gradient(var(--gradient-angle), #f9fafb 0%, #e3eafc 60%, #f9fafb 100%)', // white to blue and back
  'linear-gradient(var(--gradient-angle), #f9fafb 0%, #e3eafc 40%, #dbeafe 100%)', // white to blue
  'linear-gradient(var(--gradient-angle), #f9fafb 0%, #dbeafe 50%, #e3eafc 100%)' // white to blue to white
];
const interactiveSelectors = [
  '.btn', '.profile-btn', '.cert-card', '.projects-box', '.resume-item', '.resume-box', 'nav a', '.sci a', '.projects-details', '.contact-box', '.resume-detail', '.projects-carousel', '.img-item', '.img-slide'
];
function getCurrentGradientSet() {
  return document.body.classList.contains('light-theme') ? lightGradients : darkGradients;
}
function setGradientByIndex(idx) {
  if (document.body.classList.contains('light-theme')) {
    const gradients = getCurrentGradientSet();
    document.documentElement.style.setProperty('--section-gradient', gradients[idx % gradients.length]);
  } else {
    document.documentElement.style.setProperty('--section-gradient', darkGradients[0]);
  }
}
function setDefaultGradient() {
  if (document.body.classList.contains('light-theme')) {
    setGradientByIndex(0);
  } else {
    document.documentElement.style.setProperty('--section-gradient', darkGradients[0]);
  }
}
interactiveSelectors.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.addEventListener('mouseenter', () => {
      if (document.body.classList.contains('light-theme')) setGradientByIndex(i);
    });
    el.addEventListener('mouseleave', setDefaultGradient);
  });
});
setDefaultGradient();
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    setTimeout(setDefaultGradient, 10);
  });
}

// =====================
// 11. Mobile Hover
// =====================
function enableMobileHover(selector, hoverClass) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(el => {
    el.addEventListener('touchstart', function() {
      el.classList.add(hoverClass);
    }, {passive: true});
    el.addEventListener('touchend', function() {
      el.classList.remove(hoverClass);
    });
    el.addEventListener('touchcancel', function() {
      el.classList.remove(hoverClass);
    });
  });
}
window.addEventListener('DOMContentLoaded', () => {
  enableMobileHover('.btn', 'hover');
  enableMobileHover('.cert-card', 'hover');
  enableMobileHover('.resume-list .resume-item', 'hover');
  enableMobileHover('.projects-box', 'hover');
  enableMobileHover('.sci a', 'hover');
});

// =====================
// 12. Contact Form Success Message
// =====================
const contactForm = document.getElementById('contact-form');
const successMsg = document.querySelector('.form-success-message');
if (contactForm && successMsg) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(contactForm);
    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        contactForm.style.display = 'none';
        successMsg.style.display = 'block';
      } else {
        response.json().then(data => {
          alert(data.error || 'There was a problem submitting your form.');
        });
      }
    })
    .catch(() => {
      alert('There was a problem submitting your form.');
    });
  });
}
