/* =============================================================
   includes.js — SheRises Foundation
   Fetches header.html and footer.html and injects them into
   the placeholder divs on every page.

   Usage — add these two divs to any page and load this script:

     <!-- In the <body>, before your main content: -->
     <div id="site-header"></div>

     <!-- After your main content, before </body>: -->
     <div id="site-footer"></div>

     <!-- Load this script near the end of the body: -->
     <script src="includes.js"></script>

   The script highlights the active nav link automatically by
   comparing each link's href to the current page filename.
   ============================================================= */

(function () {
  'use strict';

  /* ── Helper: fetch an HTML file and inject it into a target element ── */
  function loadInclude(targetId, filePath, callback) {
    var el = document.getElementById(targetId);
    if (!el) return; /* placeholder div not present on this page — skip */

    fetch(filePath)
      .then(function (res) {
        if (!res.ok) throw new Error('Could not load ' + filePath + ' (' + res.status + ')');
        return res.text();
      })
      .then(function (html) {
        el.innerHTML = html;
        if (typeof callback === 'function') callback();
      })
      .catch(function (err) {
        console.warn('includes.js:', err.message);
      });
  }

  /* ── Highlight the nav link that matches the current page ── */
  function setActiveNavLink() {
    var current = window.location.pathname.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('#menu_main a, #menu_mobile a');
    links.forEach(function (link) {
      var href = (link.getAttribute('href') || '').split('#')[0]; /* ignore hash fragments */
      if (href === current) {
        link.classList.add('active');
      }
    });
  }

  /* ── Mobile menu: open/close drawer ── */
  function initMobileMenu() {
    var toggler  = document.querySelector('.mobile-nav-toggler');
    var menu     = document.getElementById('mobileMenu');
    var backdrop = document.querySelector('.menu-backdrop');
    var closeBtn = document.querySelector('.close-btn');

    function openMenu() {
      if (menu)     menu.classList.add('active');
      if (backdrop) { backdrop.removeAttribute('hidden'); backdrop.classList.add('active'); }
      document.body.style.overflow = 'hidden'; /* prevent page scroll while drawer is open */
    }

    function closeMenu() {
      if (menu)     menu.classList.remove('active');
      if (backdrop) { backdrop.classList.remove('active'); backdrop.setAttribute('hidden', ''); }
      document.body.style.overflow = '';
    }

    if (toggler)  toggler.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (backdrop) backdrop.addEventListener('click', closeMenu);
  }

  /* ── Load header then footer ── */
  document.addEventListener('DOMContentLoaded', function () {
    loadInclude('site-header', 'header.html', function () {
      setActiveNavLink();
      initMobileMenu();
    });

    loadInclude('site-footer', 'footer.html');
  });

}());
