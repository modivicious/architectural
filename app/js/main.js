$('.projects__photos').slick({
  centerMode: true,
  variableWidth: true,
  initialSlide: 1,
  arrows: false,
  infinite: false,
  draggable: false,
  asNavFor: '.projects__names',
});

$('.projects__names').slick({
  asNavFor: '.projects__photos',
  focusOnSelect: true,
  centerMode: true,
  variableWidth: true,
  initialSlide: 1,
  arrows: false,  
  infinite: false,
  draggable: false,
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