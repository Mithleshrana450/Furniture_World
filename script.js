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

// Form submit handling
const enquiryForm = document.getElementById('enquiry-form');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = enquiryForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';
    
    const formData = new FormData(enquiryForm);
    
    try {
      const response = await fetch('https://formspree.io/f/xeenlbky', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Show success toast
        const toast = document.getElementById('toast');
        if (toast) {
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 4000);
        }
        enquiryForm.reset();
      } else {
        alert('Oops! There was a problem submitting your form. Please try again.');
      }
    } catch (error) {
      alert('Oops! There was a problem connecting to the server. Please check your internet and try again.');
    } finally {
      // Re-enable button and restore text
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
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

// ─── CATEGORY FILTER ──────────────────────────────────────
(function () {
  const buttons = document.querySelectorAll('.cat-btn');
  const cards   = document.querySelectorAll('.product-card');
  const grid    = document.querySelector('.products-grid');

  function removeEmptyMsg() {
    const msg = grid.querySelector('.no-products-msg');
    if (msg) msg.remove();
  }

  function showEmptyMsg() {
    removeEmptyMsg();
    const div = document.createElement('div');
    div.className = 'no-products-msg';
    div.innerHTML = '<span>🚧</span>Coming soon — check back shortly!';
    grid.appendChild(div);
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let visibleCount = 0;

      removeEmptyMsg();

      cards.forEach(card => {
        const cat = card.dataset.category || '';
        const matches = filter === 'all' || cat === filter;

        if (matches) {
          card.classList.remove('hidden');
          card.classList.add('fade-in');
          card.addEventListener('animationend', () => {
            card.classList.remove('fade-in');
          }, { once: true });
          visibleCount++;
        } else {
          card.classList.add('hidden');
          card.classList.remove('fade-in');
        }
      });

      if (visibleCount === 0) showEmptyMsg();
    });
  });
})();