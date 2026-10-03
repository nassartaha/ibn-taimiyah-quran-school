const links = [...document.querySelectorAll('.nav a[href^="#"]')];
const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const mobileNav = document.querySelector('#mobile-nav');
const menuToggle = document.querySelector('.menu-toggle');

const setActive = () => {
  const y = window.scrollY + 140;
  let current = sections[0];
  sections.forEach(section => { if (section.offsetTop <= y) current = section; });
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current.id}`));
  mobileNav?.querySelectorAll('a[href^="#"]').forEach(a =>
    a.classList.toggle('active', a.getAttribute('href') === `#${current.id}`)
  );
};

const closeMobileNav = () => {
  if (!mobileNav || !menuToggle) return;
  mobileNav.classList.remove('is-open');
  mobileNav.setAttribute('aria-hidden', 'true');
  menuToggle.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'فتح قائمة التنقل');
};

const toggleMobileNav = () => {
  if (!mobileNav || !menuToggle) return;
  const isOpen = mobileNav.classList.toggle('is-open');
  menuToggle.classList.toggle('is-open', isOpen);
  mobileNav.setAttribute('aria-hidden', String(!isOpen));
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'إغلاق قائمة التنقل' : 'فتح قائمة التنقل');
};

menuToggle?.addEventListener('click', toggleMobileNav);
mobileNav?.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', closeMobileNav));

document.querySelectorAll('.disabled-link').forEach(link => {
  link.addEventListener('click', e => e.preventDefault());
});

window.addEventListener('scroll', setActive, {passive:true});
window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMobileNav(); });
setActive();
