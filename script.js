const navLinks =document.querySelectorAll('header nav a');
const logoLink= document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

menuIcon.addEventListener('click', () =>{
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
})

const activePage=()=>{
  navLinks.forEach(link => {
    link.classList.remove('active');
  });

  sections.forEach(section => {
    section.classList.remove('active');
  });

  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
}

navLinks.forEach((link, idx)=>{
  link.addEventListener('click',() =>{
    if(!link.classList.contains('active')){
      activePage();

      link.classList.add('active');

      setTimeout(() =>{
        sections[idx].classList.add('active');
      },0);
    }
  });
});

logoLink.addEventListener('click',() => {
  if(!navLinks[0].classList.contains('active')){
    activePage();

    navLinks[0].classList.add('active');

    setTimeout(() =>{
      sections[0].classList.add('active');
    },0);
  }
});
// Function to animate the counters
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
  
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const interval = 2000; // Total animation duration in milliseconds
      const increment = target / (interval / 50); // Increment per 50ms
      let current = 0;
  
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current); // Update the text content
          setTimeout(updateCounter, 50); // Continue the animation
        } else {
          // Add "+" only to the "code" div
          if (counter.closest('.code')) {
            counter.textContent = `${target}+`; // Add "+" for "Hours of Coding"
          } else {
            counter.textContent = target; // Stop at the exact target for others
          }
        }
      };
  
      updateCounter();
    });
  }
  
  
  // Re-trigger animation every 5 seconds
  setInterval(animateCounters, 5000);
  
  // Trigger animation initially on page load
  animateCounters();
  


  
//   // Trigger the animation on page load
//   animateCounters();
  
const resumeBtns = document.querySelectorAll('.resume-btn');

resumeBtns.forEach((btn,idx)=>{
    btn.addEventListener('click',()=>{
        const resumeDetails = document.querySelectorAll('.resume-detail')
        resumeBtns.forEach(btn =>{
            btn.classList.remove('active');
        });
        btn.classList.add('active');

        resumeDetails.forEach(detail => {
            detail.classList.remove('active')
        });
        resumeDetails[idx].classList.add('active');
    });

});

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

  if (currentIndex === slides.length - 2) {
    nextBtn.classList.add('disabled');
  } else {
    nextBtn.classList.remove('disabled');
  }
}

// Go to the next slide
function goToNextSlide() {
  if (currentIndex < slides.length - 2) {
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
