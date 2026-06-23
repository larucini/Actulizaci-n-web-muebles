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

  /* ── Bridge scroll color-flip ─────────── */
  (function () {
    const section  = document.getElementById('bridge-section');
    const overlay  = document.getElementById('bridge-overlay');
    const p1       = document.getElementById('bridge-p1');
    const p2       = document.getElementById('bridge-p2');
    const eyebrow  = document.querySelector('.bridge-eyebrow');
    if (!section || !overlay) return;

    function lerp(a, b, t) { return a + (b - a) * t; }
    function clamp(v, lo, hi) { return Math.min(Math.max(v, lo), hi); }
    function ease(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }

    function onScroll() {
      const rect     = section.getBoundingClientRect();
      const total    = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const raw      = clamp(scrolled / total, 0, 1);

      // Phase 1: 0→0.45  — overlay scales in, p1 fades out
      // Phase 2: 0.45→1  — p2 fades in + scales to 1
      // Fade starts at 30%, dark content appears at 55%, lingers until 100%
      const phase1 = ease(clamp((raw - 0.30) / 0.25, 0, 1));
      const phase2 = ease(clamp((raw - 0.55) / 0.35, 0, 1));

      // Overlay: opacity fade 0 → 1
      overlay.style.opacity = phase1;

      // p1 + eyebrow: fade out and slight scale down together
      const p1Opacity = 1 - phase1;
      p1.style.opacity = p1Opacity;
      p1.style.transform = `translate(-50%, -50%) scale(${lerp(1, 0.94, phase1)})`;
      if (eyebrow) { eyebrow.style.opacity = p1Opacity; }

      // p2: fade in and scale from 0.92 → 1
      p2.style.opacity  = phase2;
      p2.style.transform = `translate(-50%, -50%) scale(${lerp(0.92, 1, phase2)})`;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
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
    }, { threshold: 0.4 });

    obs.observe(block);
  })();

  /* ── Sequenced texture reveal ───────── */
  (function () {
    const section = document.getElementById('servicio');
    if (!section) return;
    // Order: mesa → proporcion → cola → vetas
    const sequence = ['tex-mesa', 'tex-proporcion', 'tex-cola', 'tex-vetas'];
    let started = false;

    function reveal() {
      sequence.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el) setTimeout(() => el.classList.add('visible'), 200 + i * 450);
      });
    }

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !started) {
          started = true;
          reveal();
          obs.unobserve(section);
        }
      });
    }, { threshold: 0.25 });

    obs.observe(section);
  })();