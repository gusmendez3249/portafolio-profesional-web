/* ==================== SCROLL HEADER STYLING ==================== */
function scrollHeader() {
  const header = document.getElementById('header');
  // When the scroll is greater than 50 viewport height, add the header-active class
  if (this.scrollY >= 50) {
    header.classList.add('header-active');
  } else {
    header.classList.remove('header-active');
  }
}
window.addEventListener('scroll', scrollHeader);

/* ==================== ACTIVE LINK ON SCROLL ==================== */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 150; // Offset for header/dock triggers
    const sectionId = current.getAttribute('id');

    // Update desktop nav links
    const desktopLink = document.querySelector(`.nav__menu a[href*=${sectionId}]`);
    // Update mobile dock links
    const mobileLink = document.querySelector(`.mobile-dock a[href*=${sectionId}]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      if (desktopLink) desktopLink.classList.add('active-link');
      if (mobileLink) mobileLink.classList.add('active-link');
    } else {
      if (desktopLink) desktopLink.classList.remove('active-link');
      if (mobileLink) mobileLink.classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', scrollActive);

/* ==================== QUALIFICATION SLIDING TABS ==================== */
const educationBtn = document.getElementById('education-btn');
const workBtn = document.getElementById('work-btn');
const educationDiv = document.getElementById('education');
const workDiv = document.getElementById('work');
const pillSlider = document.getElementById('pill-slider');

function updateSlider() {
  const activeBtn = document.querySelector('.pill-toggle__btn.active');
  if (activeBtn && pillSlider) {
    pillSlider.style.width = `${activeBtn.offsetWidth}px`;
    pillSlider.style.left = `${activeBtn.offsetLeft}px`;
  }
}

if (educationBtn && workBtn) {
  educationBtn.addEventListener('click', () => {
    educationBtn.classList.add('active');
    workBtn.classList.remove('active');
    educationDiv.classList.add('qualification__active');
    workDiv.classList.remove('qualification__active');
    updateSlider();
  });

  workBtn.addEventListener('click', () => {
    workBtn.classList.add('active');
    educationBtn.classList.remove('active');
    workDiv.classList.add('qualification__active');
    educationDiv.classList.remove('qualification__active');
    updateSlider();
  });

  // Initialize the pill slider position
  window.addEventListener('load', updateSlider);
  window.addEventListener('resize', updateSlider);
  // Run once immediately to ensure correct initial values
  setTimeout(updateSlider, 100);
}

/* ==================== SERVICES MODAL POPUPS ==================== */
const modalViews = document.querySelectorAll('.services__modal');
const modalBtns = document.querySelectorAll('.services__btn');
const modalCloses = document.querySelectorAll('.services__modal-close');

let openModal = function (modalClick) {
  modalViews[modalClick].classList.add('active-modal');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling when modal is open
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener('click', () => {
    openModal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener('click', () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove('active-modal');
    });
    document.body.style.overflow = ''; // Restore scroll
  });
});

// Close modal when clicking outside of the content box
modalViews.forEach((modalView) => {
  modalView.addEventListener('click', (e) => {
    if (e.target === modalView) {
      modalView.classList.remove('active-modal');
      document.body.style.overflow = '';
    }
  });
});



/* ==================== SHOW SCROLL UP ==================== */
function scrollUp() {
  const scrollUp = document.getElementById('scroll-up');
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scrollup class
  if (this.scrollY >= 560) {
    scrollUp.classList.add('show-scroll');
  } else {
    scrollUp.classList.remove('show-scroll');
  }
}
window.addEventListener('scroll', scrollUp);

/* ==================== DARK / LIGHT THEME TOGGLE ==================== */
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

// We validate if the user previously chose a theme
if (selectedTheme) {
  // If the validation is fulfilled, we set the theme and icon states
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});

/* ==================== TYPEWRITER EFFECT ==================== */
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.addEventListener('load', () => {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // Inject custom CSS styling for caret blinking
  var css = document.createElement('style');
  css.type = 'text/css';
  css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid var(--accent-base); animation: caret 1s steps(1) infinite; }';
  document.body.appendChild(css);
});
