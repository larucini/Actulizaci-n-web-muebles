const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up:not(.fade-up-proj)').forEach(el => observer.observe(el));

  const observerProj = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observerProj.unobserve(e.target);
      }
    });
  }, { threshold: 0.20 });

  document.querySelectorAll('.fade-up-proj').forEach(el => observerProj.observe(el));

  /* ── Flip cards ─────────────────────── */
  const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

  document.querySelectorAll('.stat-item').forEach(card => {
    if (isTouchDevice()) {
      card.addEventListener('click', () => {
        const isFlipped = card.classList.contains('flipped');
        document.querySelectorAll('.stat-item').forEach(c => c.classList.remove('flipped'));
        if (!isFlipped) card.classList.add('flipped');
      });
    } else {
      card.addEventListener('mouseenter', () => card.classList.add('flipped'));
      card.addEventListener('mouseleave', () => card.classList.remove('flipped'));
    }
  });

  /* ── PROCESO: scroll-driven ────────────── */
  (function () {
    const section = document.getElementById('proceso');
    const imgs    = document.querySelectorAll('.proc-img');
    const frases  = document.querySelectorAll('.proc-frase');
    const dots    = document.querySelectorAll('.proc-dot');
    const words   = document.querySelectorAll('.proc-word');
    const bar     = document.getElementById('proc-bar');
    if (!section || !bar) return;

    const TOTAL  = imgs.length;
    let lastIdx  = 0;

    function setSlide(idx) {
      if (idx === lastIdx) return;

      // Imágenes
      imgs[lastIdx].classList.remove('proc-img--active');
      imgs[lastIdx].classList.add('proc-img--exit');
      setTimeout(() => imgs[lastIdx] && imgs[lastIdx].classList.remove('proc-img--exit'), 900);
      imgs[idx].classList.add('proc-img--active');

      // Frases
      frases[lastIdx].classList.remove('proc-frase--active');
      frases[lastIdx].classList.add('proc-frase--exit');
      setTimeout(() => frases[lastIdx] && frases[lastIdx].classList.remove('proc-frase--exit'), 600);
      frases[idx].classList.add('proc-frase--active');

      // Dots y palabras
      dots.forEach((d, i)  => d.classList.toggle('proc-dot--active',  i === idx));
      words.forEach((w, i) => w.classList.toggle('proc-word--active', i === idx));

      lastIdx = idx;
    }

    // Inicializar
    imgs[0].classList.add('proc-img--active');
    frases[0].classList.add('proc-frase--active');
    dots[0].classList.add('proc-dot--active');
    words[0].classList.add('proc-word--active');

    function onScroll() {
      const rect       = section.getBoundingClientRect();
      const scrollZone = (section.offsetHeight - window.innerHeight) * 0.6;
      if (scrollZone <= 0) return;

      const traveled = -rect.top;
      const progress = Math.max(0, Math.min(1, traveled / scrollZone));

      bar.style.width = (progress * 100) + '%';

      const idx = Math.min(Math.floor(progress * TOTAL), TOTAL - 1);
      setSlide(idx);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();


  /* ── SERVICIO: filas interactivas ─────── */
  (function () {
    const items = document.querySelectorAll('.srv2-item');
    if (!items.length) return;

    items.forEach(item => {
      item.addEventListener('mouseenter', () => {
        items.forEach(i => i.classList.remove('srv2-item--active'));
        item.classList.add('srv2-item--active');
      });
      item.addEventListener('mouseleave', () => {
        item.classList.remove('srv2-item--active');
      });
    });
  })();




  /* ── FRASE ATADA AL SCROLL ───────────── */
  (function () {
    const words = document.querySelectorAll('.pw');
    const header = document.querySelector('.proy-header');
    if (!words.length || !header) return;

    let twInterval = null;

    function resetAll() {
      words.forEach(w => w.classList.remove('pw-visible'));
      const tw = document.querySelector('.pw-typewriter');
      if (tw) tw.textContent = '';
      if (twInterval) { clearInterval(twInterval); twInterval = null; }
    }

    function triggerAnimation() {
      resetAll();

      // Fade-up para todas las palabras excepto posibilidades
      words.forEach(w => {
        if (w.classList.contains('pw-typewriter')) return;
        const delay = parseInt(w.dataset.delay || 0);
        setTimeout(() => w.classList.add('pw-visible'), delay);
      });

      // Typewriter para "posibilidades."
      const tw = document.querySelector('.pw-typewriter');
      if (tw) {
        const fullText = tw.dataset.text;
        const delay = parseInt(tw.dataset.delay || 0);
        tw.classList.add('pw-visible');
        setTimeout(() => {
          let i = 0;
          twInterval = setInterval(() => {
            tw.textContent = fullText.slice(0, i + 1);
            i++;
            if (i >= fullText.length) { clearInterval(twInterval); twInterval = null; }
          }, 65);
        }, delay);
      }
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          triggerAnimation();
        } else {
          resetAll();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(header);
  })();

  /* ── CÁPSULA SPOTLIGHT ───────────────── */
  (function () {
    const targets = document.querySelectorAll('.cap-img-top, .cap-img-v');
    const titulo = document.querySelector('.cap-titulo');
    const proximo = document.querySelector('.cap-proximo');
    if (!targets.length) return;

    let activeCount = 0;

    targets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        el.classList.add('cap-hovered');
        activeCount++;
        if (titulo) {
          titulo.style.color = '#ffffff';
          titulo.style.textShadow = '0 0 40px rgba(252,239,220,0.35)';
        }
        if (proximo) {
          proximo.style.color = 'rgba(252,239,220,0.95)';
        }
      });

      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
        el.style.setProperty('--my', (e.clientY - rect.top) + 'px');
      });

      el.addEventListener('mouseleave', () => {
        el.classList.remove('cap-hovered');
        activeCount--;
        if (activeCount <= 0) {
          activeCount = 0;
          if (titulo) {
            titulo.style.color = '';
            titulo.style.textShadow = '';
          }
          if (proximo) {
            proximo.style.color = '';
          }
        }
      });
    });
  })();

  // ── Veta hotspots (toggle on click for mobile) ──
  (function initVetaDots() {
    const dots = document.querySelectorAll('.veta-dot');
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const isOpen = dot.classList.contains('is-open');
        // Close all
        dots.forEach(d => d.classList.remove('is-open'));
        // Toggle current
        if (!isOpen) dot.classList.add('is-open');
      });
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!e.target.closest('.veta-dot')) {
        dots.forEach(d => d.classList.remove('is-open'));
      }
    });
  })();
