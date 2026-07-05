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

  // Repeating observer — resets animation each time element leaves and re-enters view
  const observerRepeat = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      } else {
        e.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-up-repeat').forEach(el => observerRepeat.observe(el));

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


  /* ── SERVICIO: filas interactivas — manejado por accordion ─── */
  (function () {
    // Hover highlight only on desktop (accordion handles click state)
    if (window.innerWidth <= 430) return;
    const items = document.querySelectorAll('.srv2-item');
    if (!items.length) return;

    items.forEach(item => {
      item.addEventListener('mouseenter', () => {
        if (!item.classList.contains('is-open')) {
          items.forEach(i => { if (!i.classList.contains('is-open')) i.classList.remove('srv2-item--active'); });
          item.classList.add('srv2-item--active');
        }
      });
      item.addEventListener('mouseleave', () => {
        if (!item.classList.contains('is-open')) {
          item.classList.remove('srv2-item--active');
        }
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

  // ── Proyecto captions: tap to reveal on mobile ──
  (function initProjTap() {
    if (window.innerWidth > 430) return;
    const items = document.querySelectorAll('.proj-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        const isOpen = item.classList.contains('tapped');
        items.forEach(i => i.classList.remove('tapped'));
        if (!isOpen) item.classList.add('tapped');
      });
    });
  })();

  // ── Hero img crossfade: desktop only (mobile breaks marquee loop) ──
  (function initHeroCrossfade() {
    if (window.innerWidth <= 430) return;
    window.addEventListener('load', () => {
      document.querySelectorAll('.hero-swap').forEach(img => {
        const overlay = document.createElement('img');
        overlay.src = img.dataset.old;
        overlay.style.cssText = `
          position: absolute;
          top: 0; left: 0;
          height: 100%;
          width: 100%;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          display: block;
        `;

        const wrapper = document.createElement('span');
        wrapper.style.cssText = `
          position: relative;
          display: inline-block;
          flex-shrink: 0;
          height: 100%;
          width: ${img.offsetWidth}px;
        `;
        img.parentNode.insertBefore(wrapper, img);
        img.style.height = '100%';
        img.style.width = '100%';
        img.style.display = 'block';
        wrapper.appendChild(img);
        wrapper.appendChild(overlay);

        wrapper.addEventListener('mouseenter', () => {
          overlay.style.opacity = '1';
        });
        wrapper.addEventListener('mouseleave', () => {
          overlay.style.opacity = '0';
        });
      });
    });
  })();

  // ── Cursos: cards clickeables ──
  (function initCourseLinks() {
    const url = 'https://larucini.github.io/PaginaMuebleCursos/';
    document.querySelectorAll('.crs-card').forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        window.open(url, '_blank');
      });
    });
  })();

  // ── Service accordion ──
  (function initServiceAccordion() {
    const items = document.querySelectorAll('.srv2-accordion');
    if (!items.length) return;

    items.forEach(item => {
      const trigger = item.querySelector('.srv2-trigger');
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        // Close all
        items.forEach(i => {
          i.classList.remove('is-open', 'srv2-item--active');
        });
        // Open clicked if it was closed
        if (!isOpen) {
          item.classList.add('is-open', 'srv2-item--active');
        }
      });
    });
  })();

  // ── Before/After slider ──
  (function initBASliders() {
    ['ba-armario', 'ba-sillon', 'ba-comoda'].forEach(function(id) {
      const slider = document.getElementById(id);
      if (!slider) return;

      const beforeWrap = slider.querySelector('.ba-before-wrap');
      const beforeImg  = slider.querySelector('.ba-before');
      const divider    = slider.querySelector('.ba-divider');

      function syncBeforeWidth() {
        const w = slider.offsetWidth;
        beforeImg.style.width = w + 'px';
        beforeImg.style.height = slider.offsetHeight + 'px';
      }

      function setPosition(pct) {
        pct = Math.max(0, Math.min(100, pct));
        beforeWrap.style.width = pct + '%';
        divider.style.left = pct + '%';
        syncBeforeWidth();
      }

      function getPercent(clientX) {
        const rect = slider.getBoundingClientRect();
        return ((clientX - rect.left) / rect.width) * 100;
      }

      window.addEventListener('load', () => { syncBeforeWidth(); setPosition(50); });
      window.addEventListener('resize', () => { syncBeforeWidth(); });

      let dragging = false;

      // Mouse
      slider.addEventListener('mousedown', e => {
        dragging = true;
        setPosition(getPercent(e.clientX));
      });
      window.addEventListener('mousemove', e => {
        if (dragging) setPosition(getPercent(e.clientX));
      });
      window.addEventListener('mouseup', () => { dragging = false; });

      // Touch — prevent page scroll only while dragging this slider
      slider.addEventListener('touchstart', e => {
        dragging = true;
        setPosition(getPercent(e.touches[0].clientX));
      }, { passive: true });

      slider.addEventListener('touchmove', e => {
        if (!dragging) return;
        e.preventDefault(); // block page scroll
        setPosition(getPercent(e.touches[0].clientX));
      }, { passive: false }); // must be non-passive to call preventDefault

      window.addEventListener('touchend', () => { dragging = false; });
    });
  })();

  // ── Cursos: typewriter on section entry ──
  (function initTypewriter() {
    const el = document.getElementById('crs-typewriter');
    if (!el) return;
    const fullText = el.textContent;
    let animFrame = null;

    function startTypewriter() {
      // Reset
      if (animFrame) cancelAnimationFrame(animFrame);
      el.classList.remove('crs-tw-done');
      el.style.width = '0';
      el.textContent = '';

      let i = 0;
      const speed = 38; // ms per char
      let last = 0;

      function step(ts) {
        if (!last) last = ts;
        if (ts - last >= speed) {
          i++;
          el.textContent = fullText.slice(0, i);
          el.style.width = 'auto';
          last = ts;
          if (i >= fullText.length) {
            setTimeout(() => el.classList.add('crs-tw-done'), 600);
            return;
          }
        }
        animFrame = requestAnimationFrame(step);
      }
      animFrame = requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) startTypewriter();
      });
    }, { threshold: 0.5 });

    observer.observe(document.getElementById('cursos'));
  })();

  // ── Material de trabajo (tabs de especies) ──
  (function initMaterialTabs() {
    const tabs = document.querySelectorAll('.mat-tab');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('mouseenter', () => {
        const especie = tab.getAttribute('data-especie');

        tabs.forEach(t => t.classList.toggle('is-active', t === tab));

        document.querySelectorAll('.mat-image-item').forEach(img => {
          img.classList.toggle('is-active', img.getAttribute('data-especie') === especie);
        });

        document.querySelectorAll('.mat-info-item').forEach(info => {
          info.classList.toggle('is-active', info.getAttribute('data-especie') === especie);
        });
      });

      // Fallback para touch (mobile no tiene hover real)
      tab.addEventListener('click', () => {
        const especie = tab.getAttribute('data-especie');

        tabs.forEach(t => t.classList.toggle('is-active', t === tab));

        document.querySelectorAll('.mat-image-item').forEach(img => {
          img.classList.toggle('is-active', img.getAttribute('data-especie') === especie);
        });

        document.querySelectorAll('.mat-info-item').forEach(info => {
          info.classList.toggle('is-active', info.getAttribute('data-especie') === especie);
        });
      });
    });
  })();
