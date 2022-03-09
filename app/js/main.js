const slidersOptions = {
  centerMode: true,
  variableWidth: true,
  initialSlide: 2,
  arrows: false,
  infinite: false,
  draggable: false,
  speed: 750,
};

$('.projects__photos').slick({
  ...slidersOptions,
  asNavFor: '.projects__names',
});

$('.projects__names').slick({
  ...slidersOptions,
  asNavFor: '.projects__photos',
  focusOnSelect: true,
});

// color schemes
const lightStyle = document.querySelector('link[rel=stylesheet][media*=prefers-color-scheme][media*=light]');
const darkStyle = document.querySelector('link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]');
const switcherRadios = document.querySelectorAll('.switcher__radio');

function setupSwitcher() {
  const savedScheme = getSavedScheme();
  if (savedScheme !== null) {
    const currentRadio = document.querySelector(`.switcher__radio[value=${savedScheme}]`);
    currentRadio.checked = true;
  }

  [...switcherRadios].forEach(radio =>
    radio.addEventListener('change', e => setScheme(e.target.value))
  );
}

function setupScheme() {
  const savedScheme = getSavedScheme();

  if (savedScheme === null) return;

  setScheme(savedScheme);
}

function setScheme(scheme) {
  switchMedia(scheme);
  saveScheme(scheme);
}

function switchMedia(scheme) {
  lightStyle.media = (scheme === 'light') ? 'all' : 'not all';
  darkStyle.media = (scheme === 'dark') ? 'all' : 'not all';
}

function getSavedScheme() {
  return localStorage.getItem('color-scheme');
}

function saveScheme(scheme) {
  localStorage.setItem('color-scheme', scheme);
}

setupSwitcher();
setupScheme();

// anim on scroll
const animItems = document.querySelectorAll(".anim-parent");

const animOptions = {
  threshold: .75,
  rootMargin: "10000px 0px 0px 0px"
};

const animObserver = new IntersectionObserver((entries, animObserver) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    animStart(entry.target);
    animObserver.unobserve(entry.target);
  });
}, animOptions)

function animStart(e) {
  const fillAnim = e.querySelectorAll(".fill-anim");
  fillAnim.forEach(item => item.classList.add("carousel-text--fill"));
}

animItems.forEach(item => animObserver.observe(item));