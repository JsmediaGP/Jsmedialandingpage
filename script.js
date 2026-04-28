 /* ── Navbar scroll ── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => nav.classList.toggle('solid', window.scrollY > 60));

  /* ── Hero Carousel ── */
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const counter = document.getElementById('heroCounter');
  let heroTimer;

  function goSlide(n) {
    slides[currentSlide].classList.remove('active');
    slides[currentSlide].classList.add('prev');
    setTimeout(() => slides[currentSlide].classList.remove('prev'), 1500);
    dots[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    counter.innerHTML = `<span>0${currentSlide + 1}</span> / 0${slides.length}`;
    resetTimer();
  }

  function nextSlide() { goSlide(currentSlide + 1); }
  function prevSlide() { goSlide(currentSlide - 1); }

  function resetTimer() {
    clearInterval(heroTimer);
    heroTimer = setInterval(nextSlide, 6000);
  }

  resetTimer();

  /* ── Portfolio Carousel ── */
  const portTrack = document.getElementById('portTrack');
  let allPortItems = Array.from(portTrack.querySelectorAll('.port-item'));
  let visiblePortItems = [...allPortItems];
  let portIdx = 0;

  function getPortVisible() {
    return window.innerWidth <= 640 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
  }

  function updatePortCarousel() {
    const vis = getPortVisible();
    const max = Math.max(0, visiblePortItems.length - vis);
    portIdx = Math.min(portIdx, max);
    const w = portTrack.parentElement.offsetWidth;
    const gap = 16;
    const itemW = (w - (vis - 1) * gap) / vis;
    visiblePortItems.forEach(item => { item.style.flex = `0 0 ${itemW}px`; });
    portTrack.style.transform = `translateX(-${portIdx * (itemW + gap)}px)`;
  }

  document.getElementById('portNext').addEventListener('click', () => {
    const vis = getPortVisible();
    if (portIdx < visiblePortItems.length - vis) { portIdx++; updatePortCarousel(); }
  });

  document.getElementById('portPrev').addEventListener('click', () => {
    if (portIdx > 0) { portIdx--; updatePortCarousel(); }
  });

  window.addEventListener('resize', updatePortCarousel);
  setTimeout(updatePortCarousel, 50);

  /* ── Portfolio Filters ── */
  document.querySelectorAll('.pf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      allPortItems.forEach(item => {
        item.style.display = (f === 'all' || item.dataset.cat === f) ? 'block' : 'none';
      });
      visiblePortItems = allPortItems.filter(item => item.style.display !== 'none');
      portIdx = 0;
      updatePortCarousel();
    });
  });

  /* ── Testimonial Carousel ── */
  const testiTrack = document.getElementById('testiTrack');
  const testiCards = testiTrack.querySelectorAll('.testi-card');
  let testiIdx = 0;

  function getTestiVisible() {
    return window.innerWidth <= 640 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
  }

  function updateTesti() {
    const vis = getTestiVisible();
    const max = Math.max(0, testiCards.length - vis);
    testiIdx = Math.min(testiIdx, max);
    const w = testiTrack.parentElement.offsetWidth;
    const cardW = (w - (vis - 1) * 24) / vis;
    testiTrack.style.transform = `translateX(-${testiIdx * (cardW + 24)}px)`;
  }

  document.getElementById('testiNext').addEventListener('click', () => {
    const vis = getTestiVisible();
    if (testiIdx < testiCards.length - vis) { testiIdx++; updateTesti(); }
  });

  document.getElementById('testiPrev').addEventListener('click', () => {
    if (testiIdx > 0) { testiIdx--; updateTesti(); }
  });

  window.addEventListener('resize', updateTesti);

  /* ── Scroll Reveal ── */
  const rvObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rvObs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin:'0px 0px -40px 0px' });

  document.querySelectorAll('.rv').forEach(el => rvObs.observe(el));

  /* ── Smooth anchor scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior:'smooth' }); }
    });
  });

  /* ── CTA Form ── */
  function ctaSubmit() {
    const email = document.getElementById('ctaEmail').value.trim();
    if (!email || !email.includes('@')) {
      document.getElementById('ctaEmail').style.outline = '2px solid #e24b4a';
      return;
    }
    const btn = document.querySelector('.cta-go');
    btn.textContent = 'Sent ✓';
    btn.style.background = '#3b6d11';
    document.getElementById('ctaEmail').value = '';
    setTimeout(() => { btn.textContent = 'Get in Touch'; btn.style.background = ''; }, 4000);
  }