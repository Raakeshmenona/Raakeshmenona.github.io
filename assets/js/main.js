/* ==========================================================================
   Raakesh Menon — Portfolio interactions
   Vanilla JS, no dependencies. Every animation respects prefers-reduced-motion.
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ----------------------------------------------------------------------
     1. THEME
     ---------------------------------------------------------------------- */
  var root = document.documentElement;
  var toggle = $('#themeToggle');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#070d14' : '#ffffff');
    try { localStorage.setItem('rm-theme', theme); } catch (e) {}
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  // Follow the OS only while the visitor has made no explicit choice.
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  var onSchemeChange = function (e) {
    var stored = null;
    try { stored = localStorage.getItem('rm-theme'); } catch (err) {}
    if (!stored) root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  };
  if (mq.addEventListener) mq.addEventListener('change', onSchemeChange);
  else if (mq.addListener) mq.addListener(onSchemeChange);

  /* ----------------------------------------------------------------------
     2. NAV — sticky state, mobile menu, scrollspy
     ---------------------------------------------------------------------- */
  var nav = $('#nav');
  var navLinks = $('#navLinks');
  var burger = $('#navBurger');
  var progress = $('#scrollProgress');
  var toTop = $('#toTop');

  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        navLinks.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Open menu');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('is-open')) burger.click();
    });
  }

  var sections = $$('main section[id]');
  var linkFor = {};
  $$('#navLinks a').forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    if (id) linkFor[id] = a;
  });

  var rail = $('#railFill');
  var timeline = $('.timeline');

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    var docH = document.documentElement.scrollHeight - window.innerHeight;

    if (nav) nav.classList.toggle('is-stuck', y > 12);
    if (progress) progress.style.width = (docH > 0 ? (y / docH) * 100 : 0) + '%';
    if (toTop) toTop.classList.toggle('is-visible', y > 600);

    // scrollspy — the section occupying the upper third of the viewport wins
    var marker = y + window.innerHeight * 0.32;
    var current = null;
    for (var i = 0; i < sections.length; i++) {
      var s = sections[i];
      if (s.offsetTop <= marker) current = s.id;
    }
    Object.keys(linkFor).forEach(function (id) {
      linkFor[id].classList.toggle('is-active', id === current);
    });

    // timeline rail fill
    if (rail && timeline) {
      var box = timeline.getBoundingClientRect();
      var pct = (window.innerHeight * 0.62 - box.top) / box.height;
      rail.style.height = Math.max(0, Math.min(1, pct)) * 100 + '%';
    }
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { onScroll(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  /* ----------------------------------------------------------------------
     3. REVEAL ON SCROLL
     ---------------------------------------------------------------------- */
  var revealItems = $$('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    revealItems.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.style.setProperty('--rd', (el.dataset.revealDelay || 0) + 'ms');
        el.classList.add('is-in');
        revealObserver.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealItems.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ----------------------------------------------------------------------
     4. COUNT-UP METRICS
     ---------------------------------------------------------------------- */
  function countUp(el) {
    var target = parseFloat(el.dataset.count);
    var suffix = el.dataset.suffix || '';
    if (reduced) { el.textContent = target + suffix; return; }

    var duration = 1500;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);           // easeOutCubic
      var value = target * eased;
      el.textContent = (target % 1 === 0 ? Math.round(value).toLocaleString('en-US') : value.toFixed(2)) + suffix;
      if (p < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  var counters = $$('.metric__num');
  if (!('IntersectionObserver' in window)) {
    counters.forEach(countUp);
  } else {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        countUp(entry.target);
        counterObserver.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  /* ----------------------------------------------------------------------
     5. ROLE ROTATOR (typewriter)
     ---------------------------------------------------------------------- */
  var phrases = [
    'Snowflake & PySpark at Scale',
    'Legacy ETL Modernisation',
    'Azure Data Factory & Databricks',
    'Microsoft Fabric & OneLake',
    'Data Quality You Can Prove',
    'LLM-Assisted Data Engineering'
  ];
  var rotator = $('#rotator');
  var rotatorText = rotator && $('.rotator__text', rotator);

  if (rotatorText) {
    if (reduced) {
      rotatorText.textContent = phrases[0];
    } else {
      var pi = 0, ci = 0, deleting = false;

      (function type() {
        var word = phrases[pi];
        ci += deleting ? -1 : 1;
        rotatorText.textContent = word.slice(0, ci);

        var delay = deleting ? 32 : 62;
        if (!deleting && ci === word.length) { deleting = true; delay = 1900; }
        else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 380; }

        window.setTimeout(type, delay);
      })();
    }
  }

  /* ----------------------------------------------------------------------
     6. SKILL FILTERS
     ---------------------------------------------------------------------- */
  var filters = $$('.filter');
  var skillCards = $$('.skill-card');

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.dataset.filter;
      filters.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      skillCards.forEach(function (card) {
        card.classList.toggle('is-hidden', cat !== 'all' && card.dataset.cat !== cat);
      });
    });
  });

  /* ----------------------------------------------------------------------
     7. CURSOR SPOTLIGHT ON SKILL CARDS
     ---------------------------------------------------------------------- */
  if (!reduced && window.matchMedia('(hover: hover)').matches) {
    skillCards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ----------------------------------------------------------------------
     8. EXPERIENCE — expand / collapse every engagement
     ---------------------------------------------------------------------- */
  var expandAll = $('#expandAll');
  var engDetails = $$('.eng__more');

  function syncExpandButton() {
    var allOpen = engDetails.length > 0 && engDetails.every(function (d) { return d.open; });
    expandAll.textContent = allOpen ? 'Collapse all' : 'Expand all';
    expandAll.setAttribute('aria-pressed', String(allOpen));
  }

  if (expandAll && engDetails.length) {
    expandAll.addEventListener('click', function () {
      var open = expandAll.getAttribute('aria-pressed') !== 'true';
      engDetails.forEach(function (d) { d.open = open; });
      syncExpandButton();
    });
    // keep the label honest when cards are toggled one at a time
    engDetails.forEach(function (d) { d.addEventListener('toggle', syncExpandButton); });
  }

  /* ----------------------------------------------------------------------
     9. FOOTER YEAR
     ---------------------------------------------------------------------- */
  var year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
