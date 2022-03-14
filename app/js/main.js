// slider
const slidersOptions = {
  centerMode: true,
  variableWidth: true,
  initialSlide: 2,
  arrows: false,
  infinite: false,
  draggable: false,
  speed: 770,
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
  threshold: 0.3,
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

// media
const menuLeft = document.querySelector(".menu__left");
const menuRight = document.querySelector(".menu__right");
const transferItems = document.querySelectorAll(".menu__item-transfer");
const switcher = document.querySelector(".menu__item--switcher");

let flags = { "1366": false, "660": false };
let currentWidth = document.documentElement.clientWidth;

if (currentWidth <= 1366)
  itemsToLeft();
if (currentWidth <= 660)
  switcherToLeft();

window.addEventListener("resize", () => {
  currentWidth = document.documentElement.clientWidth;
  if (currentWidth <= 1366 && flags[1366] === false)
    itemsToLeft();
  else if (currentWidth > 1366 && flags[1366] === true)
    itemsToRight();

  if (currentWidth <= 660 && flags[660] === false)
    switcherToLeft();
  else if (currentWidth > 660 && flags[660] === true)
    switcherToRight();
});

function itemsToLeft() {
  transferItems.forEach(elem => menuLeft.insertAdjacentElement("beforeend", elem));
  flags[1366] = true;
}

function itemsToRight() {
  transferItems.forEach(elem => menuRight.insertAdjacentElement("afterbegin", elem));
  flags[1366] = false;
}

function switcherToLeft() {
  menuLeft.insertAdjacentElement("afterbegin", switcher);
  flags[660] = true;
}

function switcherToRight() {
  menuRight.insertAdjacentElement("afterbegin", switcher);
  flags[660] = false;
}

// menu
const menuBtn = document.querySelector(".menu__btn");

menuBtn.addEventListener("click", menuToggle);

function menuToggle() {
  menuBtn.classList.toggle("menu__btn--active");
  menuLeft.classList.toggle("menu__left--active");
  document.body.classList.toggle("hide-overflow");
}

window.addEventListener("click", e => {
  if (menuLeft.classList.contains("menu__left--active") &&
    !menuLeft.contains(e.target) &&
    !menuBtn.contains(e.target)
  ) menuToggle();
});