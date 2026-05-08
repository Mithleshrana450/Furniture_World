// Navbar scroll effect
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));

// Form submit
function submitForm() {
  const name = document.getElementById('f-name').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const product = document.getElementById('f-product').value;
  const message = document.getElementById('f-msg').value.trim();

  if (!name || !phone) {
    alert('Please fill in your name and phone number.');
    return;
  }

  // Construct email body
  const subject = encodeURIComponent(`New Enquiry from ${name} - Furniture World`);
  const body = encodeURIComponent(
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `Email: ${email || 'Not provided'}\n` +
    `Product: ${product || 'Not selected'}\n\n` +
    `Message:\n${message || 'No message provided'}`
  );

  // Send email using mailto
  const recipient = 'furnitureworldsgiridih@gmail.com';
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

  const toast = document.getElementById('toast');
  if (toast) {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  // Reset form
  ['f-name', 'f-phone', 'f-email', 'f-product', 'f-msg'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.tagName === 'SELECT' ? el.selectedIndex = 0 : (el.value = '');
    }
  });
}

// Scroll to contact
function scrollToContact() {
  const contactEl = document.getElementById('contact');
  if (contactEl) {
    contactEl.scrollIntoView({ behavior: 'smooth' });
  }
}
