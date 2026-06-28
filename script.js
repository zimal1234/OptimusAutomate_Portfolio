// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// ===== TYPING EFFECT =====
const roles = [
  'Frontend Developer',
  'CS Student @ HITEC',
  'AI/ML Enthusiast',
  'Problem Solver'
];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const roleText = document.getElementById('roleText');

function typeRole() {
  const current = roles[roleIndex];
  if (isDeleting) {
    roleText.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    roleText.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }
  let speed = isDeleting ? 60 : 100;
  if (!isDeleting && charIndex === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }
  setTimeout(typeRole, speed);
}
typeRole();

// ===== REVEAL ON SCROLL (Intersection Observer) =====
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

// ===== SKILL BARS ANIMATION =====
const barFills = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      fill.style.width = fill.dataset.width + '%';
      barObserver.unobserve(fill);
    }
  });
}, { threshold: 0.5 });
barFills.forEach(bar => barObserver.observe(bar));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
const btnText = document.getElementById('btnText');
const btnIcon = document.getElementById('btnIcon');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  btnText.textContent = 'Sending...';
  btnIcon.textContent = '⏳';
  setTimeout(() => {
    btnText.textContent = 'Message Sent!';
    btnIcon.textContent = '✓';
    formSuccess.classList.add('show');
    form.reset();
    setTimeout(() => {
      btnText.textContent = 'Send Message';
      btnIcon.textContent = '➤';
      formSuccess.classList.remove('show');
    }, 4000);
  }, 1500);
});

// ===== PROJECT CARD TILT EFFECT =====
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `translateY(-6px) rotateX(${-y / 30}deg) rotateY(${x / 30}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== CURSOR GLOW EFFECT =====
const glow = document.createElement('div');
glow.style.cssText = `
  position:fixed; pointer-events:none; z-index:9999;
  width:300px; height:300px; border-radius:50%;
  background:radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%);
  transform:translate(-50%,-50%);
  transition:left 0.15s ease, top 0.15s ease;
`;
document.body.appendChild(glow);
document.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});
