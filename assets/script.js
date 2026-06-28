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

  /* ── Line draw ───────────────────────── */
  (function () {
    const block   = document.getElementById('linedraw-block');
    const line    = document.getElementById('linedraw-line');
    const eyebrow = document.getElementById('ld-eyebrow');
    if (!block || !line) return;

    const items = [
      { text: document.getElementById('ld-w0'), sub: document.getElementById('ld-s0'), dot: document.getElementById('ld-d0'), delay: 400  },
      { text: document.getElementById('ld-w1'), sub: document.getElementById('ld-s1'), dot: document.getElementById('ld-d1'), delay: 850  },
      { text: document.getElementById('ld-w2'), sub: document.getElementById('ld-s2'), dot: document.getElementById('ld-d2'), delay: 1300 },
    ];

    let started = false;

    function run() {
      if (eyebrow) eyebrow.classList.add('visible');
      setTimeout(() => {
        line.classList.add('drawn');
        items.forEach(w => {
          setTimeout(() => {
            if (w.dot)  w.dot.classList.add('visible');
            if (w.text) w.text.classList.add('visible');
            if (w.sub)  setTimeout(() => w.sub.classList.add('visible'), 240);
          }, w.delay);
        });
      }, 400);

      // Numbers appear after line + words finish (~2000ms), in order 1 → 2 → 3
      const nums = ['num-1', 'num-2', 'num-3'];
      nums.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el) setTimeout(() => el.classList.add('visible'), 2000 + i * 450);
      });
    }

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !started) {
          started = true;
          run();
          obs.unobserve(block);
        }
      });
    }, { threshold: 0.65 });

    obs.observe(block);
  })();


  /* ── Line draw ───────────────────────── */
  (function () {
    const block   = document.getElementById('linedraw-block');
    const line    = document.getElementById('linedraw-line');
    const eyebrow = document.getElementById('ld-eyebrow');
    if (!block || !line) return;

    const items = [
      { text: document.getElementById('ld-w0'), sub: document.getElementById('ld-s0'), dot: document.getElementById('ld-d0'), delay: 400  },
      { text: document.getElementById('ld-w1'), sub: document.getElementById('ld-s1'), dot: document.getElementById('ld-d1'), delay: 850  },
      { text: document.getElementById('ld-w2'), sub: document.getElementById('ld-s2'), dot: document.getElementById('ld-d2'), delay: 1300 },
    ];

    let started = false;

    function run() {
      if (eyebrow) eyebrow.classList.add('visible');
      setTimeout(() => {
        line.classList.add('drawn');
        items.forEach(w => {
          setTimeout(() => {
            if (w.dot)  w.dot.classList.add('visible');
            if (w.text) w.text.classList.add('visible');
            if (w.sub)  setTimeout(() => w.sub.classList.add('visible'), 240);
          }, w.delay);
        });
      }, 400);

      // Numbers appear after line + words finish (~2000ms), in order 1 → 2 → 3
      const nums = ['num-1', 'num-2', 'num-3'];
      nums.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el) setTimeout(() => el.classList.add('visible'), 2000 + i * 450);
      });
    }

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !started) {
          started = true;
          run();
          obs.unobserve(block);
        }
      });
    }, { threshold: 0.65 });

    obs.observe(block);
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
