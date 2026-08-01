/* aashisluitel.com - minimal vanilla JS
   1. accessible mobile menu
   2. graceful image placeholders (never a broken-image icon)
   3. writing archive filters
*/
(function () {
  'use strict';
/* ---------- Google Analytics ---------- */
  var googleTag = document.createElement('script');
  googleTag.async = true;
  googleTag.src = 'https://www.googletagmanager.com/gtag/js?id=G-YP287B6VY3';
  document.head.appendChild(googleTag);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', 'G-YP287B6VY3');

  /* ---------- 1. mobile menu ---------- */
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('primary-nav');
  /* ---------- add blog to shared navigation ---------- */
  if (nav) {
    var writingLink = nav.querySelector('a[href$="writing.html"]');
    var blogLink = nav.querySelector('a[href="/blog/"]');

    if (!blogLink && writingLink) {
      blogLink = document.createElement('a');
      blogLink.href = '/blog/';
      blogLink.textContent = 'Blog';
      writingLink.insertAdjacentElement('afterend', blogLink);
    }

    if (blogLink && window.location.pathname.indexOf('/blog/') === 0) {
      if (writingLink) writingLink.removeAttribute('aria-current');
      blogLink.setAttribute('aria-current', 'page');
    }
  }
     /* ---------- add blog to shared footer ---------- */
  var footer = document.querySelector('.site-foot');

  if (footer && !footer.querySelector('a[href="/blog/"]')) {
    var footerWritingLink = footer.querySelector('a[href$="writing.html"]');

    if (footerWritingLink) {
      var footerWritingItem = footerWritingLink.closest('li');

      if (footerWritingItem) {
        var footerBlogItem = document.createElement('li');
        var footerBlogLink = document.createElement('a');

        footerBlogLink.href = '/blog/';
        footerBlogLink.textContent = 'Blog';
        footerBlogItem.appendChild(footerBlogLink);
        footerWritingItem.insertAdjacentElement('afterend', footerBlogItem);
      }
    }
  }
  if (btn && nav) {
    var setOpen = function (open) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('open', open);
      btn.querySelector('.menu-label').textContent = open ? 'Close' : 'Menu';
    };

    btn.addEventListener('click', function () {
      setOpen(btn.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        btn.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (btn.getAttribute('aria-expanded') !== 'true') return;
      if (!nav.contains(e.target) && !btn.contains(e.target)) setOpen(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 960) setOpen(false);
    });
  }

  /* ---------- 2. image placeholders ---------- */
  var markEmpty = function (img) {
    var fig = img.closest('.ph');
    if (!fig || fig.classList.contains('is-empty')) return;

    var mode = img.getAttribute('data-fallback') || 'blank';

    /* Optional thumbnails: drop the image area entirely and let the card
       reflow as a text-only editorial card. */
    if (mode === 'remove') {
      var card = fig.closest('.card');
      if (card) card.classList.add('card--text');
      fig.parentNode.removeChild(fig);
      return;
    }

    fig.classList.add('is-empty');

    if (mode === 'monogram') {
      var mono = document.createElement('span');
      mono.className = 'ph__mono';
      mono.setAttribute('aria-hidden', 'true');
      mono.textContent = 'AL';
      fig.appendChild(mono);

      var sr = document.createElement('span');
      sr.className = 'sr-only';
      sr.textContent = 'Monogram placeholder for a portrait of Aashis Luitel';
      fig.appendChild(sr);
      return;
    }

    /* Content-aware neutral label: Speaking / Teaching / Service */
    var cap = document.createElement('span');
    cap.className = 'ph__cap';
    cap.textContent = mode;
    fig.appendChild(cap);
  };

  Array.prototype.forEach.call(document.querySelectorAll('.ph img'), function (img) {
    img.addEventListener('error', function () { markEmpty(img); });
    if (img.complete && img.naturalWidth === 0) markEmpty(img);
  });

  /* ---------- 3. writing filters ---------- */
  var filterBar = document.querySelector('.filters');
  if (filterBar) {
    var items = document.querySelectorAll('[data-cat]');
    var count = document.getElementById('filter-count');

    filterBar.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;

      Array.prototype.forEach.call(filterBar.querySelectorAll('button'), function (x) {
        x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
      });

      var want = b.getAttribute('data-filter');
      var shown = 0;

      Array.prototype.forEach.call(items, function (item) {
        var match = want === 'all' || item.getAttribute('data-cat') === want;
        item.hidden = !match;
        if (match) shown++;
      });

      if (count) {
        count.textContent = shown + (shown === 1 ? ' item' : ' items');
      }
    });
  }
})();
