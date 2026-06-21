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

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

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

  /* ── Typewriter ──────────────────────── */
  (function () {
    const phrase  = 'El tiempo deja marcas. Nosotros, posibilidades.';
    const textEl  = document.getElementById('typewriter-text');
    const cursor  = document.getElementById('typewriter-cursor');
    const block   = document.getElementById('typewriter-block');
    if (!textEl || !block) return;
    let started = false;

    function type(i) {
      if (i <= phrase.length) {
        textEl.textContent = phrase.slice(0, i);
        textEl.appendChild(cursor);
        const ch    = phrase[i - 1];
        const delay = i === 0 ? 0
          : ch === '.' ? 400
          : 36 + Math.random() * 20;
        setTimeout(() => type(i + 1), delay);
      } else {
        setTimeout(() => cursor.classList.add('done'), 500);
      }
    }

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !started) {
          started = true;
          setTimeout(() => type(0), 300);
          obs.unobserve(block);
        }
      });
    }, { threshold: 0.4 });

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
    }

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !started) {
          started = true;
          run();
          obs.unobserve(block);
        }
      });
    }, { threshold: 0.4 });

    obs.observe(block);
  })();