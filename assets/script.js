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


  /* ── SERVICE ACCORDION + IMAGE SYNC ─── */
  (function () {
    const items   = document.querySelectorAll('.srv-item');
    const imgWrap = document.querySelector('.srv-left-imgs');
    const imgs    = imgWrap ? imgWrap.querySelectorAll('img') : [];

    function activateImg(idx) {
      imgWrap.classList.add('has-hover');
      imgs.forEach((img, i) => {
        img.classList.toggle('img-active', i === idx);
      });
    }
    function resetImgs() {
      imgWrap.classList.remove('has-hover');
      imgs.forEach(img => img.classList.remove('img-active'));
    }

    items.forEach((item, idx) => {
      const row = item.querySelector('.srv-row');

      // Hover
      item.addEventListener('mouseenter', () => activateImg(idx));
      item.addEventListener('mouseleave', () => {
        // If an item is open, keep its image active
        const openItem = document.querySelector('.srv-item.open');
        if (openItem) {
          const openIdx = Array.from(items).indexOf(openItem);
          activateImg(openIdx);
        } else {
          resetImgs();
        }
      });

      // Click
      row.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
          activateImg(idx);
        } else {
          resetImgs();
        }
      });
    });
  })();


  /* ── FRASE LINES SIZING ─────────────── */
  (function () {
    function sizeFraseLines() {
      const row1    = document.querySelector('.frase-row-1');
      const topLine = document.querySelector('.frase-top-line');
      if (!row1 || !topLine) return;

      const containerLeft = row1.getBoundingClientRect().left;
      const lineW = row1.offsetWidth + containerLeft;

      topLine.style.width = lineW + 'px';
      topLine.style.marginLeft = -containerLeft + 'px';
    }

    sizeFraseLines();
    window.addEventListener('resize', sizeFraseLines);
  })();

  /* ── FRASE WORD ANIMATION ───────────── */
  (function () {
    const section = document.getElementById('frase-scroll');
    if (!section) return;

    const words = section.querySelectorAll('.frase-anim');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          words.forEach(word => {
            const delay = parseInt(word.dataset.delay || 0);
            setTimeout(() => word.classList.add('visible'), delay);
          });
        } else {
          // Reversible: reset when section leaves viewport
          words.forEach(word => word.classList.remove('visible'));
        }
      });
    }, { threshold: 0.2 });

    observer.observe(section);
  })();
