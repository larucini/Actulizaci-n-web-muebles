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
      p2.style.transform = `translate(-50%, -15%) scale(${lerp(0.92, 1, phase2)})`;
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

  /* ── Courses carousel ────────────────── */
  (function () {
    const courses = [
      {
        title: 'Introducción a la<br>restauración de muebles',
        desc:  'Fundamentos del oficio: diagnóstico de piezas<br>y el criterio detrás de cada intervención.',
        testimonial: 'Entré sin saber nada sobre madera. Salí entendiendo por qué cada pieza tiene su propia lógica.',
        author: 'Valentina M. — Buenos Aires'
      },
      {
        title: 'Terminaciones en<br>madera maciza',
        desc:  'Aceites, ceras y lacas naturales. El resultado visual<br>como parte de la decisión de diseño.',
        testimonial: 'Aprendí a ver la madera de otra manera. Ahora entiendo que la terminación es donde el mueble cobra vida.',
        author: 'Rodrigo S. — Córdoba'
      },
      {
        title: 'Tapicería y<br>restauración textil',
        desc:  'Recuperación de asientos y respaldos con<br>materiales contemporáneos y técnicas tradicionales.',
        testimonial: 'Un sillón de mi abuela que nadie se animaba a tocar. Hoy es la pieza más querida de mi casa.',
        author: 'Lucía P. — Rosario'
      },
      {
        title: 'Diagnóstico y<br>valoración de piezas',
        desc:  'Cómo leer un mueble: materiales, técnicas<br>constructivas y su valor histórico.',
        testimonial: 'Cambió completamente cómo recorro las ferias. Ya no veo muebles viejos, veo posibilidades.',
        author: 'Martín G. — Buenos Aires'
      }
    ];

    const COUNT     = courses.length;
    const ACTIVE_W  = 420;   // px — active slide width
    const PREVIEW_W = 200;   // px — preview slide width

    const track    = document.getElementById('crsTrack');
    const slides   = Array.from({ length: COUNT }, (_, i) => document.getElementById('crsSlide' + i));
    const titleEl       = document.getElementById('crsTitle');
    const descEl        = document.getElementById('crsDesc');
    const infoEl        = document.getElementById('crsInfo');
    const infoNum       = document.getElementById('crsInfoNum');
    const testimonialQ  = document.getElementById('crsTestimonialQuote');
    const testimonialA  = document.getElementById('crsTestimonialAuthor');
    const arrowBtn      = document.getElementById('crsArrowBtn');

    if (!track || !arrowBtn) return;

    let current   = 0;
    let animating = false;

    // Apply classes based on index relative to current
    function applySlideStates(idx) {
      slides.forEach((sl, i) => {
        sl.classList.remove('is-active', 'is-preview', 'is-hidden');
        if (i === idx) {
          sl.classList.add('is-active');
        } else if (i === (idx + 1) % COUNT) {
          sl.classList.add('is-preview');
        } else {
          sl.classList.add('is-hidden');
        }
      });
    }

    // Position track so the active slide is flush-left (translateX = 0 always — slides
    // change width so no track movement needed; the visual slide is the width change)
    function advance() {
      if (animating) return;
      animating = true;

      const next = (current + 1) % COUNT;

      // 1. Fade out text
      infoEl.classList.add('fading');

      // 2. After short delay, swap slide states (CSS transition handles the width animation)
      setTimeout(() => {
        applySlideStates(next);
        current = next;

        // 3. Update text content while it's invisible
        titleEl.innerHTML  = courses[current].title;
        descEl.innerHTML   = courses[current].desc;
        if (infoNum) infoNum.textContent = '(0' + (current + 1) + ')';
        if (testimonialQ) testimonialQ.textContent = courses[current].testimonial;
        if (testimonialA) testimonialA.textContent = courses[current].author;

        // 4. Fade text back in
        setTimeout(() => {
          infoEl.classList.remove('fading');
          animating = false;
        }, 350);

      }, 250);
    }

    arrowBtn.addEventListener('click', advance);

    // Init
    applySlideStates(0);
  })();

