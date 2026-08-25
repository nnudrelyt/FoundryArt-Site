// ══════════════════════════════════════════════════════════
// FOUNDRY ART — shared front-end behavior
// ──────────────────────────────────────────────────────────

(function () {
  'use strict';

  // ────────────────────────────────────────────────────────
  // Nav + Mobile drawer + Footer (injected into mount points)
  // ────────────────────────────────────────────────────────
  function navHTML() {
    const section = document.body.dataset.section || 'foundry-art';
    // Foundry Art pages carry no data-section — it's the implicit default. Write
    // the resolved value back so CSS has a positive hook for it, rather than
    // styling the default via :not([data-section]) and hoping no page ever
    // sets it explicitly. Nothing currently keys off the attribute's absence.
    document.body.dataset.section = section;

    // Three bars, per client direction. Note this is the same silhouette as
    // .nav-hamburger, which appears at ≤900px — below that width the studios
    // switcher and the mobile menu are visually identical controls. They are
    // told apart only by colour (bronze vs charcoal) and position.
    const dotGrid = `
              <button class="studios-toggle" aria-label="Open Linden Workshops studios" aria-controls="studios-drawer" aria-expanded="false">
                <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
          <rect x="2" y="4" width="16" height="1.6" rx="0.4"/>
          <rect x="2" y="9.2" width="16" height="1.6" rx="0.4"/>
          <rect x="2" y="14.4" width="16" height="1.6" rx="0.4"/>
        </svg>
              </button>`;

    // Per-section nav variants
    let navInner = '';
    let mobileDrawer = '';

    if (section === 'foundry-art') {
      const link = (href, label, key) => `<a href="${href}" data-nav-key="${key}">${label}</a>`;
      navInner = `
          <div class="nav-left">${dotGrid}
            <a href="/foundry-art/" class="nav-logo" aria-label="Foundry Art home"><img src="/assets/images/linden/wordmarks/foundry-art.png" alt="Foundry Art"></a>
          </div>
          <div class="nav-links">
            ${link('/foundry-art/shop/', 'Tiles', 'shop')}
            ${link('/foundry-art/#design-ideas', 'Design Ideas', 'design')}
            ${link('/foundry-art/#story', 'Our Story', 'story')}
            ${/* "How to Buy" promised a purchasing walkthrough and delivered a
                  PDF library plus an FAQ. The section already calls itself
                  "Expert Guidance" and its anchor is #guidance — the nav label
                  was the only thing on the site describing it as a checkout
                  path. */''}
            ${link('/foundry-art/#guidance', 'Guidance', 'guide')}
            ${/* About the umbrella brand (SL 7-23: moved out of the footer). A
                  real destination, not a homepage anchor. Below 1024 .nav-links
                  is hidden for Foundry Art, so the studios drawer + injected
                  footer below carry About on tablet/mobile. */''}
            ${link('/about/', 'About', 'about')}
          </div>
          <!-- No .nav-hamburger in the Foundry Art nav. Three of the four links
               above are homepage anchors and are fine to drop on small screens;
               the two real destinations the drawer used to carry (the shop and
               sign-in) are covered by .nav-cta and the account gate instead.
               Removing it also clears the two-identical-menu-icons collision
               with .studios-toggle below 900px. Other shells keep theirs. -->
          <div class="nav-right">
            <a href="/foundry-art/account/sign-in/" class="nav-account" data-account-link>Sign in</a>
            <!-- .nav-cart-icon is a Foundry Art modifier: the bare .nav-cart
                 class is reused by the showroom-zone nav for a text "Showroom"
                 link, so the icon treatment must not ride on it. No aria-label
                 here — one would override the inner text and hide the count
                 from screen readers; the visually-hidden label plus the badge
                 give the link the accessible name "Cart, 2 items". -->
            <a href="/foundry-art/cart/" class="nav-cart nav-cart-icon">
              <span class="sr-only">Cart,</span>
              <!-- 22px, stroke 1.8: the cart's art is inset within its 24 viewBox
                   while the studios dot grid nearly fills its 20, so matching the
                   nominal sizes left the cart reading lighter than its neighbour. -->
              <svg class="nav-cart-glyph" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true">
                <path d="M2.5 3.5h2.7l2.3 10.8h10.6"/>
                <path d="M6 6.8h15.5l-1.9 5.9H7.3"/>
                <circle cx="9.6" cy="18.6" r="1.35" fill="currentColor" stroke="none"/>
                <circle cx="17.4" cy="18.6" r="1.35" fill="currentColor" stroke="none"/>
              </svg>
              <span class="nav-cart-count" data-cart-count>2</span>
              <span class="sr-only" data-cart-count-label>items</span>
            </a>
            <a href="/foundry-art/shop/" class="nav-cta">Shop Now</a>
          </div>`;
      // Intentionally empty — with no hamburger to open it, drawer markup would
      // render as unreachable DOM. initDrawer() early-returns when the trigger
      // is absent, so nothing else needs changing.
      mobileDrawer = '';
    } else if (section === 'linden') {
      navInner = `
          <div class="nav-left">${dotGrid}
            <a href="/" class="nav-logo">Linden Workshops</a>
          </div>
          <div class="nav-links">
            <a href="/#bronzework-studio">Studios</a>
            <a href="/feature-gail-drury/">Inspiration</a>
            <a href="#">Our Team</a>
            <a href="#">Where to Buy</a>
          </div>
          <button class="nav-hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-drawer">
            <span></span><span></span><span></span>
          </button>
          <div class="nav-right">
            <a href="/showroom-zone/" class="nav-cart" aria-label="Showroom Login">Showroom</a>
            <a href="#" class="nav-cta">Contact</a>
          </div>`;
      mobileDrawer = `
        <a href="/#bronzework-studio" data-drawer-link>Studios</a>
        <a href="/feature-gail-drury/" data-drawer-link>Inspiration</a>
        <a href="#" data-drawer-link>Our Team</a>
        <a href="#" data-drawer-link>Where to Buy</a>
        <a href="/showroom-zone/" data-drawer-link>Showroom Login</a>
        <a href="#" class="mobile-cta" data-drawer-link>Contact</a>`;
    } else if (section === 'bronzework-studio') {
      navInner = `
          <div class="nav-left">${dotGrid}
            <a href="/bronzework-studio/" class="nav-logo">Bronzework Studio</a>
          </div>
          <div class="nav-links">
            <a href="/bronzework-studio/#classic">Classic</a>
            <a href="/bronzework-studio/#autograph">Autograph</a>
            <a href="/bronzework-studio/#precision">Precision</a>
            <a href="/feature-gail-drury/">Inspiration</a>
          </div>
          <button class="nav-hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-drawer">
            <span></span><span></span><span></span>
          </button>
          <div class="nav-right">
            <a href="#showrooms" class="nav-cta">Find a Showroom</a>
          </div>`;
      mobileDrawer = `
        <a href="/bronzework-studio/#classic" data-drawer-link>Classic</a>
        <a href="/bronzework-studio/#autograph" data-drawer-link>Autograph</a>
        <a href="/bronzework-studio/#precision" data-drawer-link>Precision</a>
        <a href="/feature-gail-drury/" data-drawer-link>Inspiration</a>
        <a href="#showrooms" class="mobile-cta" data-drawer-link>Find a Showroom</a>`;
    } else if (section === 'talisman') {
      navInner = `
          <div class="nav-left">${dotGrid}
            <a href="/talisman/" class="nav-logo">Talisman</a>
          </div>
          <div class="nav-links">
            <a href="/talisman/#patterns">Patterns</a>
            <a href="/feature-gail-drury/">Inspiration</a>
            <a href="#">Documentation</a>
          </div>
          <button class="nav-hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-drawer">
            <span></span><span></span><span></span>
          </button>
          <div class="nav-right">
            <a href="#contact" class="nav-cta">Contact</a>
          </div>`;
      mobileDrawer = `
        <a href="/talisman/#patterns" data-drawer-link>Patterns</a>
        <a href="/feature-gail-drury/" data-drawer-link>Inspiration</a>
        <a href="#" data-drawer-link>Documentation</a>
        <a href="#contact" class="mobile-cta" data-drawer-link>Contact</a>`;
    }

    // Studios drawer — accordion structure with each sub-brand's sub-collections
    const expanded = (s) => section === s ? ' open' : '';
    const ariaExpanded = (s) => section === s ? 'true' : 'false';
    const active = (s) => section === s ? ' active' : '';

    return `
      <header>
        <nav class="nav" aria-label="Primary">${navInner}
        </nav>
      </header>

      <div class="drawer-scrim" data-drawer-scrim></div>
      <aside class="mobile-drawer" id="mobile-drawer" aria-label="Mobile menu" aria-hidden="true">${mobileDrawer}
      </aside>

${studiosMenuHTML(section)}
    `;
  }


  // ────────────────────────────────────────────────────────
  // Studios menu — FULL-SCREEN takeover
  // Layout is the Index II configuration, keyed off [data-menu-variant="e"]
  // in assets/styles.css: serif studio index left, photo pane right.
  // ────────────────────────────────────────────────────────
  function studiosMenuHTML(section) {
    const BRANDS = [
      {
        key: 'bronzework-studio',
        name: 'Bronzework Studio',
        tone: 'light',
        mark: '/assets/images/linden/wordmarks/trimmed/bronzework-studio.png',
        image: '/assets/images/linden/autograph/Autograph-Dahlia-Whiskey-1-2048.jpg',
        desc: 'Hand-carved metal tiles, liners, and trim in living bronze and zinc.',
        cta: ['/bronzework-studio/', 'Explore our collections'],
        linksTitle: 'Collections',
        note: 'Available at fine tile showrooms',
        links: [
          ['/bronzework-studio/', 'Studio overview'],
          ['/classic/', 'Classic'],
          ['/autograph/', 'Autograph'],
          ['/precision/', 'Precision'],
        ],
      },
      {
        key: 'foundry-art',
        name: 'Foundry Art',
        tone: 'dark',
        mark: '/assets/images/linden/wordmarks/trimmed/foundry-art.png',
        image: '/assets/images/foundry-art-arrays/inset-tiles-array.jpg',
        desc: 'Hand-cast bronze tiles and hardware, direct from our studio.',
        cta: ['/foundry-art/shop/', 'Shop now'],
        note: 'Shop online, direct from the studio',
        links: [
          ['/foundry-art/', 'Studio overview'],
          ['/foundry-art/shop/', 'Inset Tiles &amp; Liners'],
          ['/foundry-art/shop/', 'Cabinet Hardware'],
        ],
      },
      {
        key: 'talisman',
        name: 'Talisman',
        tone: 'light',
        mark: '/assets/images/linden/wordmarks/trimmed/talisman.png',
        image: '/assets/images/linden/talisman/Talisman-Swans-Trumpet-and-Spiral-Wave-Ancient-White-towel-crop-e1651606000674.jpg',
        desc: 'Hand-sculpted ceramic tiles in a sophisticated stony white glaze.',
        cta: ['/talisman/', 'Learn more'],
        note: 'Direct from our studio',
        links: [
          ['/talisman/', 'Studio overview'],
          ['/talisman/', 'White Ceramic Tiles &amp; Borders'],
        ],
      },
    ];
    const focus = BRANDS.some(b => b.key === section) ? section : 'bronzework-studio';

    const panel = (b) => `
        <div class="fs-brand${b.key === focus ? ' focus' : ''}" data-brand="${b.key}" data-tone="${b.tone}">
          <a class="fs-brand-media" href="${b.links[0][0]}" data-studios-link aria-label="${b.name}">
            <img src="${b.image}" alt="">
          </a>
          <div class="fs-brand-info">
            <a class="fs-brand-mark" href="${b.links[0][0]}" data-studios-link>
              <img src="${b.mark}" alt="${b.name}">
            </a>
            <a class="fs-brand-name" href="${b.links[0][0]}" data-studios-link>${b.name}</a>
            <p class="fs-brand-desc">${b.desc}</p>
            ${b.linksTitle ? `<p class="fs-brand-links-title">${b.linksTitle}</p>` : ''}
            <nav class="fs-brand-links" aria-label="${b.name}">
              ${b.links.map(([href, label]) => `<a href="${href}" data-studios-link>${label}</a>`).join('\n              ')}
            </nav>
            <a class="fs-brand-cta" href="${b.cta[0]}" data-studios-link>
              <span>${b.cta[1]}</span>
              <svg class="fs-cta-arrow" viewBox="0 0 26 10" width="26" height="10" aria-hidden="true"><path d="M0 5h22.5M18.5 1l5.5 4-5.5 4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>
            </a>
            <span class="fs-brand-chevron" aria-hidden="true">
              <svg viewBox="0 0 22 44" width="22" height="44"><path d="M2 2l17 20-17 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
            <p class="fs-brand-note">${b.note}</p>
          </div>
        </div>`;

    return `
      <div class="studios-scrim" data-studios-scrim></div>
      <aside class="studios-drawer studios-fs" id="studios-drawer" data-menu-variant="e" data-hover-style="1" aria-label="Linden Workshops studios" aria-hidden="true">
        <div class="fs-head">
          <button class="fs-menu-toggle" aria-label="Close studios menu" data-studios-close>
            <span></span><span></span><span></span>
          </button>
          <a href="/" class="fs-lw-mark" data-studios-link aria-label="Linden Workshops home">
            <img src="/assets/images/linden/wordmarks/linden-workshops.png" alt="Linden Workshops">
          </a>
          <p class="fs-lw-tag">Three Studios. One Workshop.</p>
          <button class="fs-close" aria-label="Close studios menu" data-studios-close>&times;</button>
        </div>
        <div class="fs-body">
          <div class="fs-brands">
          <p class="fs-brands-eyebrow">Our Collections</p>${BRANDS.map(panel).join('')}
          </div>
          <nav class="fs-lw-nav" aria-label="Linden Workshops">
            <p class="fs-lw-heading">Linden Workshops</p>
            <a href="/tile-collections/" data-studios-link>Tile Collections</a>
            <a href="/about/" data-studios-link>About</a>
            <a href="/feature-gail-drury/" data-studios-link>Inspiration</a>
            <a href="/our-team/" data-studios-link>Our Team</a>
            <a href="/where-to-buy/" data-studios-link>Where to Buy</a>
            <a href="/contact/" data-studios-link>Contact</a>
            <a href="/showroom-zone/" class="fs-lw-login" data-studios-link>Showroom Login</a>
          </nav>
        </div>
      </aside>
    `;
  }


  // ────────────────────────────────────────────────────────
  // Studios menu — hover focus + pane geometry
  // ?menuopen=1 opens the takeover on load (kept for screenshotting).
  // ────────────────────────────────────────────────────────
  function initMenuVariants() {
    const drawer = document.getElementById('studios-drawer');
    if (!drawer || !drawer.classList.contains('studios-fs')) return;
    const params = new URLSearchParams(location.search);

    // Index II layout + axis-shift rollover — the selected configuration.
    // body.menu-e keys the page-level rules that travel with this layout.
    drawer.dataset.menuVariant = 'e';
    drawer.dataset.hoverStyle = '1';
    document.body.classList.add('menu-e');

    // Hovering a brand row drives the right-pane image crossfade; the focused
    // brand's photo tone (light/dark) keys the top nav's contrast color.
    function setFocus(target) {
      drawer.querySelectorAll('.fs-brand').forEach(b => b.classList.toggle('focus', b === target));
      if (target) {
        drawer.dataset.photoTone = target.dataset.tone || 'light';
        document.body.dataset.photoTone = drawer.dataset.photoTone;
      }
    }
    drawer.querySelectorAll('.fs-brand').forEach(brand => {
      brand.addEventListener('mouseenter', () => setFocus(brand));
    });

    const focusBrand = params.get('focus');
    if (focusBrand) {
      setFocus(drawer.querySelector(`.fs-brand[data-brand="${focusBrand}"]`));
    } else {
      setFocus(drawer.querySelector('.fs-brand.focus'));
    }

    // Pages with the LW header keep the REAL header above the open menu
    // (nothing can shift); the photo pane's left edge tracks the nav's left
    // edge so no link ever straddles the seam.
    const lw2Nav = document.querySelector('.lw2-header .lw2-nav');
    if (document.querySelector('.lw2-header')) document.body.classList.add('lw2-shell');
    function syncPane() {
      const wide = window.innerWidth > 1680;
      let paneLeft = window.innerWidth * 0.5;
      const navEl = lw2Nav || drawer.querySelector('.fs-lw-nav');
      if (wide && navEl) paneLeft = Math.round(navEl.getBoundingClientRect().left) - 28;
      drawer.style.setProperty('--e-pane-left', paneLeft + 'px');
      const realLogo = document.querySelector('.lw2-header .lw2-logo img');
      if (realLogo) {
        const lb = realLogo.getBoundingClientRect();
        drawer.style.setProperty('--e-tag-left', Math.round(lb.left) + 'px');
        drawer.style.setProperty('--e-tag-top', Math.round(lb.bottom + 8) + 'px');
        // track the tagline out so its width locks to the wordmark's
        const tag = drawer.querySelector('.fs-lw-tag');
        if (tag && tag.textContent.trim()) {
          tag.style.letterSpacing = '0px';
          const natural = tag.getBoundingClientRect().width;
          const chars = tag.textContent.trim().length - 1;
          if (natural > 0 && chars > 0 && lb.width > natural) {
            tag.style.letterSpacing = ((lb.width - natural) / chars).toFixed(2) + 'px';
          }
        }
      }
      drawer.querySelectorAll('.fs-lw-nav a').forEach(a => {
        const box = a.getBoundingClientRect();
        a.classList.toggle('over-photo', wide && (box.left + box.width / 2) > paneLeft);
      });
    }
    syncPane();
    window.addEventListener('resize', syncPane);

    if (params.get('menuopen') === '1') {
      document.querySelector('.studios-toggle')?.click();
    }
  }

  function footerHTML() {
    return `
      <footer class="footer">
        <div class="footer-inner">
          <p class="footer-copy">© 2026 Linden Workshops · Luxury designer metal accent tile since 1990</p>
          <p class="footer-social"><a href="#">Instagram</a> &nbsp;·&nbsp; <a href="#">Houzz</a></p>
        </div>
      </footer>
    `;
  }

  function mount(selector, html) {
    const el = document.querySelector(selector);
    if (el) el.outerHTML = html;
  }

  function initLayout() {
    const navMount = document.querySelector('[data-nav]');
    const footerMount = document.querySelector('[data-footer]');
    if (navMount) navMount.outerHTML = navHTML();
    if (footerMount) footerMount.outerHTML = footerHTML();

    // Foundry footer: wrap the CTA + copyright strip into one region so the
    // tile-bowl photo covers the full footer height. Runs once; Linden has no .footer-cta.
    if (document.body.dataset.section === 'foundry-art' && !document.querySelector('.site-footer')) {
      const cta = document.querySelector('.footer-cta');
      const foot = document.querySelector('.footer');
      if (cta && foot) {
        const main = cta.closest('main');
        const wrap = document.createElement('div');
        wrap.className = 'site-footer';
        if (main && main.parentNode) main.parentNode.insertBefore(wrap, main.nextSibling);
        else cta.parentNode.insertBefore(wrap, cta);
        wrap.insertAdjacentHTML('afterbegin',
          '<div class="site-footer-bowl" aria-hidden="true"></div>');
        wrap.appendChild(cta);
        wrap.appendChild(foot);
      }
    }

    // Mark the current page's link in the studios drawer (bronze active accent)
    const curPath = (location.pathname.replace(/\/$/, '') || '/');
    document.querySelectorAll('.studios-acc-body a, .studios-links a').forEach(a => {
      const href = (a.getAttribute('href') || '').replace(/\/$/, '');
      if (href && href !== '#' && href === curPath) {
        a.classList.add('is-current');
        const acc = a.closest('.studios-acc');          // also mark + expand the parent studio group
        if (acc) acc.classList.add('active', 'open');
      }
    });

    // Highlight active nav link based on data-page attribute on body
    const pageKey = document.body.dataset.page;
    if (pageKey) {
      document.querySelectorAll('.nav-links a').forEach(a => {
        if (a.dataset.navKey === pageKey) a.classList.add('active');
      });
    }
  }

  // ────────────────────────────────────────────────────────
  // Mobile drawer toggle
  // ────────────────────────────────────────────────────────
  function initDrawer() {
    const hamburger = document.querySelector('.nav-hamburger');
    const drawer = document.getElementById('mobile-drawer');
    const scrim = document.querySelector('[data-drawer-scrim]');
    if (!hamburger || !drawer || !scrim) return;

    function setOpen(open) {
      hamburger.setAttribute('aria-expanded', String(open));
      hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      drawer.setAttribute('aria-hidden', String(!open));
      drawer.classList.toggle('open', open);
      scrim.classList.toggle('open', open);
      document.body.classList.toggle('drawer-open', open);
    }

    hamburger.addEventListener('click', () => {
      setOpen(hamburger.getAttribute('aria-expanded') !== 'true');
    });
    scrim.addEventListener('click', () => setOpen(false));
    document.querySelectorAll('[data-drawer-link]').forEach(a => {
      a.addEventListener('click', () => setOpen(false));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // ────────────────────────────────────────────────────────
  // Nav auto-hide (Foundry Art only)
  // ────────────────────────────────────────────────────────
  // The header retracts on scroll down and slides back on scroll up. CSS owns
  // the motion (body[data-section="foundry-art"] .nav / .nav-hidden); this only
  // decides when the class is on.
  function initNavAutoHide() {
    if (document.body.dataset.section !== 'foundry-art') return;
    const nav = document.querySelector('.nav');
    if (!nav) return;

    // Distance the page must travel in one direction before the nav reacts.
    // Without it, trackpad jitter and iOS rubber-banding flip the header on
    // every frame.
    const DELTA = 8;
    // Never hide inside the first screenful — an anchor jump or a short page
    // shouldn't strip the header before the user has really left the top.
    const REVEAL_ZONE = 140;

    let lastY = window.scrollY;

    // Browsers already coalesce scroll events to one per frame, and the handler
    // only toggles a class — no layout reads — so no rAF wrapper is needed.
    function update() {
      const y = Math.max(0, window.scrollY);
      const diff = y - lastY;
      if (Math.abs(diff) < DELTA) return;

      // A drawer pins the body; hiding the header under an open menu would
      // strip the control the user needs to close it.
      if (document.body.classList.contains('drawer-open')) {
        nav.classList.remove('nav-hidden');
        lastY = y;
        return;
      }

      if (y < REVEAL_ZONE || diff < 0) nav.classList.remove('nav-hidden');
      else nav.classList.add('nav-hidden');
      lastY = y;
    }

    window.addEventListener('scroll', update, { passive: true });

    // Keyboard focus moving into the header (skip link, tabbing back up) must
    // bring it back — a focused-but-offscreen control is a trap.
    nav.addEventListener('focusin', () => nav.classList.remove('nav-hidden'));
  }

  // ────────────────────────────────────────────────────────
  // Linden Workshops studios drawer (left side)
  // ────────────────────────────────────────────────────────
  function initStudiosDrawer() {
    // There may be MORE THAN ONE .studios-toggle in the DOM — one in the
    // navHTML-injected header (used by Foundry Art pages) and one in the
    // .lw2-header (used by LW / sub-brand pages). Wire all of them.
    const toggles = document.querySelectorAll('.studios-toggle');
    const drawer = document.getElementById('studios-drawer');
    const scrim = document.querySelector('[data-studios-scrim]');
    const closeBtns = document.querySelectorAll('[data-studios-close]');
    if (!toggles.length || !drawer || !scrim) return;

    function setOpen(open) {
      toggles.forEach(t => t.setAttribute('aria-expanded', String(open)));
      drawer.setAttribute('aria-hidden', String(!open));
      drawer.classList.toggle('open', open);
      scrim.classList.toggle('open', open);
      document.body.classList.toggle('drawer-open', open);
    }
    toggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        // Read state from drawer rather than from one toggle, so the two
        // buttons stay in sync.
        const isOpen = drawer.classList.contains('open');
        setOpen(!isOpen);
      });
    });
    scrim.addEventListener('click', () => setOpen(false));
    closeBtns.forEach(btn => btn.addEventListener('click', () => setOpen(false)));
    document.querySelectorAll('[data-studios-link]').forEach(a => {
      // External or active-page links close the drawer on click
      a.addEventListener('click', () => setOpen(false));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });

    // Accordion toggles inside the drawer
    document.querySelectorAll('[data-studios-acc-toggle]').forEach(head => {
      head.addEventListener('click', () => {
        const acc = head.closest('[data-studios-acc]');
        if (!acc) return;
        const willOpen = !acc.classList.contains('open');
        // Close other accordions for clean one-at-a-time UX
        document.querySelectorAll('[data-studios-acc].open').forEach(other => {
          if (other !== acc) {
            other.classList.remove('open');
            const otherHead = other.querySelector('[data-studios-acc-toggle]');
            if (otherHead) otherHead.setAttribute('aria-expanded', 'false');
          }
        });
        acc.classList.toggle('open', willOpen);
        head.setAttribute('aria-expanded', String(willOpen));
      });
    });
  }

  // ────────────────────────────────────────────────────────
  // Filter tabs (homepage product grid)
  // ────────────────────────────────────────────────────────
  function initFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab');
    const cards = document.querySelectorAll('.product-card[data-categories]');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        const filter = tab.dataset.filter;
        cards.forEach(card => {
          const cats = (card.dataset.categories || '').split(' ');
          const show = filter === 'all' || cats.includes(filter);
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  // ────────────────────────────────────────────────────────
  // Qty stepper (PDP, cart)
  // ────────────────────────────────────────────────────────
  function initQtySteppers() {
    document.querySelectorAll('.qty-stepper').forEach(stepper => {
      const input = stepper.querySelector('input');
      const dec = stepper.querySelector('[data-qty="-"]');
      const inc = stepper.querySelector('[data-qty="+"]');
      const min = parseInt(input.min || '1', 10);
      const max = parseInt(input.max || '99', 10);
      const clamp = v => Math.max(min, Math.min(max, v));

      function set(v) {
        input.value = clamp(parseInt(v, 10) || min);
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
      if (dec) dec.addEventListener('click', () => set(parseInt(input.value, 10) - 1));
      if (inc) inc.addEventListener('click', () => set(parseInt(input.value, 10) + 1));
      input.addEventListener('blur', () => set(input.value));
    });
  }

  // ════════════════════════════════════════════════════════
  // Client-side cart store (localStorage) — the shared state
  // behind browsing → cart → checkout → confirmation, standing
  // in for the WooCommerce cart on the live site.
  // ════════════════════════════════════════════════════════
  const Cart = (function () {
    const KEY = 'fa_cart_v1';
    // Seed the demo cart on the FIRST ever visit (missing key) so the
    // prototype opens populated like the live-site screenshots. A user-
    // emptied cart persists as [] and is never re-seeded.
    const SEED = [
      { slug: 'cabochon-3x3', name: 'Cabochon', sizeLabel: '3×3 inch', finish: 'Traditional Bronze', price: 92.50, qty: 2, sku: 'FA-CAB-3-TB', weight: 0.7 },
      { slug: 'lotus-3x3',    name: 'Lotus',    sizeLabel: '3×3 inch', finish: 'White Bronze',       price: 92.50, qty: 1, sku: 'FA-LOT-3-WB', weight: 0.7 },
    ];
    function read() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
    function write(items) { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {} document.dispatchEvent(new CustomEvent('fa-cart-change')); }
    try { if (localStorage.getItem(KEY) === null) localStorage.setItem(KEY, JSON.stringify(SEED)); } catch (e) {}
    const sameLine = (a, b) => a.slug === b.slug && a.finish === b.finish;
    return {
      items: read,
      count() { return read().reduce((n, i) => n + i.qty, 0); },
      add(item) {
        const items = read();
        const ex = items.find(i => sameLine(i, item));
        if (ex) ex.qty += item.qty; else items.push(item);
        write(items);
      },
      setQty(slug, finish, qty) {
        const items = read();
        const it = items.find(i => i.slug === slug && i.finish === finish);
        if (it) { it.qty = Math.max(1, (qty | 0) || 1); write(items); }
      },
      remove(slug, finish) { write(read().filter(i => !(i.slug === slug && i.finish === finish))); },
      clear() { write([]); },
    };
  })();
  window.FA = window.FA || {}; window.FA.Cart = Cart;

  // ────────────────────────────────────────────────────────
  // Account (prototype) — session flag only.
  //
  // Deliberately mirrors Cart's shape. The customer record and order history
  // are immutable and live in assets/account-data.js; the ONLY thing stored
  // here is whether someone is signed in. No passwords, no real auth — this
  // exists so the client can click through the returning-customer journey.
  // ────────────────────────────────────────────────────────
  // Order dates are authored as display strings ("2 June 2026"). Parse them
  // explicitly rather than trusting Date.parse with a non-ISO format, which is
  // implementation-defined; fall back to Date.parse, then to 0 so an
  // unparseable date sorts last instead of throwing off the whole list.
  const MONTHS = { january:0, february:1, march:2, april:3, may:4, june:5,
                   july:6, august:7, september:8, october:9, november:10, december:11 };
  function orderTime(o) {
    const raw = String((o && o.date) || '').trim();
    const m = /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/.exec(raw);
    if (m) {
      const mon = MONTHS[m[2].toLowerCase()];
      if (mon !== undefined) return new Date(+m[3], mon, +m[1]).getTime();
    }
    const t = Date.parse(raw);
    return isNaN(t) ? 0 : t;
  }

  const Account = (function () {
    const KEY = 'fa_account_v1';
    const LAST_ORDER_KEY = 'fa_last_order';
    function read() { try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch (e) { return null; } }
    function write(state) {
      try { state ? localStorage.setItem(KEY, JSON.stringify(state)) : localStorage.removeItem(KEY); } catch (e) {}
      document.dispatchEvent(new CustomEvent('fa-account-change'));
    }
    const data = () => window.FA_ACCOUNT || null;
    return {
      state: read,
      isSignedIn() { const s = read(); return !!(s && s.signedIn); },
      signIn(email) {
        const d = data();
        write({ signedIn: true, email: email || (d && d.customer.email) || 'demo@example.com', signedInAt: Date.now() });
      },
      signOut() { write(null); },
      customer() { const d = data(); return d ? d.customer : null; },
      trade() { const c = this.customer(); return c ? c.trade : null; },
      // The order the client just placed in the prototype is promoted to the
      // top of history, so checkout → "View order in account" lands on it.
      orders() {
        const d = data();
        const base = d ? d.orders.slice() : [];
        let last = null;
        try { last = JSON.parse(localStorage.getItem(LAST_ORDER_KEY)); } catch (e) {}
        if (last && last.id && !base.some(o => o.id === last.id)) base.unshift(last);
        // Newest first. The seed orders are authored in no particular order and
        // the promoted order was only unshifted, so history rendered scrambled
        // (19 July, 2 June, 28 June, 14 July, 11 April). Sorting here rather
        // than in the renderer keeps orderById and the dashboard's "latest
        // order" card agreeing with the list.
        return base.sort((a, b) => orderTime(b) - orderTime(a));
      },
      orderById(id) { return this.orders().find(o => o.id === id) || null; },
    };
  })();
  window.FA.Account = Account;

  const fmtMoney = n => '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const chipClass = f => /white/i.test(f) ? 'white' : 'traditional';
  const finishShort = f => f.replace(/\s*Bronze$/i, '');
  // Sample lines use a synthetic slug ('sample-<parent>') that has no image
  // directory, so fall back to the parent product's thumbnail. Without this,
  // samples render broken images in cart, checkout AND order-received.
  // (NB: 'swatch' elsewhere in this file means the finish-picker chip — a
  // different thing from the physical sample a customer orders.)
  // Samples pass parentSlug so they borrow the parent's photo. Hardware sets an
  // explicit `image` in the catalog because it's shot mounted, outside the
  // /products/<slug>/ convention.
  const thumbFor = (slug, parentSlug) => {
    const key = parentSlug || slug;
    const prod = (window.FA_PRODUCT_BY_SLUG || {})[key];
    return (prod && prod.image) || '/assets/images/products/' + key + '/main.jpg';
  };
  // Per-item shipping weights come from the 2026 retail pricelist and live on
  // the product; the size heuristic is only a fallback for anything without one.
  const weightForSize = s => /1×1/.test(s) ? 0.13 : (/2×2/.test(s) ? 0.4 : 0.7);
  const weightFor = p => (typeof p.weight === 'number' ? p.weight : weightForSize(p.size));
  const skuForFinish = (p, f) => /white/i.test(f) ? p.sku.replace(/-TB$/, '-WB') : p.sku.replace(/-WB$/, '-TB');
  const setText = (sel, t) => { const el = document.querySelector(sel); if (el) el.textContent = t; };

  // Nav cart badge(s) reflect the store on every page.
  function updateNavCount() {
    const n = Cart.count();
    document.querySelectorAll('[data-cart-count]').forEach(el => {
      el.textContent = n;
      // An empty cart badge reading "0" is noise on every page before the
      // customer has added anything. Hide the badge and let the icon stand
      // alone; the count returns the moment there's something to count.
      if (el.classList.contains('nav-cart-count')) el.hidden = n === 0;
    });
    document.querySelectorAll('[data-cart-count-label]').forEach(el => {
      el.textContent = n === 0 ? 'empty' : (n === 1 ? 'item' : 'items');
    });
  }

  // PDP → Add to cart
  function initAddToCart() {
    const slug = document.body.getAttribute('data-product-slug');
    if (!slug) return;
    const product = (window.FA_PRODUCTS || []).find(p => p.slug === slug);
    const btn = document.querySelector('.pdp-actions .btn-primary');
    if (!product || !btn) return;
    const label = btn.textContent;
    btn.addEventListener('click', () => {
      const sel = document.querySelector('[data-finish-target] .swatch.selected .swatch-label');
      const finish = sel ? sel.childNodes[0].textContent.trim() : product.finishes[0];
      const qtyInput = document.querySelector('.qty-row .qty-stepper input');
      const qty = Math.max(1, parseInt(qtyInput && qtyInput.value, 10) || 1);
      Cart.add({ slug, name: product.name, sizeLabel: product.sizeLabel, finish, price: product.price,
                 qty, sku: skuForFinish(product, finish), weight: weightFor(product) });
      updateNavCount();
      btn.textContent = 'Added to cart ✓'; btn.disabled = true;
      setTimeout(() => { btn.textContent = label; btn.disabled = false; }, 1600);
    });
  }

  // PDP → order samples.
  //
  // Samples are synthesized from FA_SAMPLE + the parent product rather than
  // being catalog entries, so FA_PRODUCTS stays at 13 and the shop grid, facet
  // counts and cross-sell are untouched. The 'swatch-<parent>' slug is what
  // keeps a sample a distinct cart line under Cart's existing slug+finish
  // identity — no change to sameLine/setQty/remove needed.
  function sampleLine(product, finish) {
    const spec = window.FA_SAMPLE;
    return {
      slug: 'sample-' + product.slug,
      parentSlug: product.slug,
      type: 'sample',
      // Just the product name — sizeLabel below already reads "Sample · 1×1
      // inch", so a separate tag repeated it.
      // the receipt. Appending 'sample' here renders "Sun sample [Sample]".
      name: product.name,
      sizeLabel: spec.sizeLabel,
      finish,
      price: spec.price,
      qty: 1,
      sku: spec.skuPrefix + '-' + skuForFinish(product, finish).replace(/^FA-/, ''),
      weight: spec.weight,          // a cut swatch, not the full tile's weight
    };
  }

  // Two of the same sample is never useful, so adding one already in the cart
  // is a no-op rather than a quantity bump.
  function addSample(product, finish) {
    const line = sampleLine(product, finish);
    const already = Cart.items().some(i => i.slug === line.slug && i.finish === line.finish);
    if (already) return false;
    Cart.add(line);
    return true;
  }

  function selectedFinish(product) {
    const sel = document.querySelector('[data-finish-target] .swatch.selected .swatch-label');
    return sel ? sel.childNodes[0].textContent.trim() : product.finishes[0];
  }

  function initSampleOrder() {
    const slug = document.body.getAttribute('data-product-slug');
    if (!slug) return;
    const product = (window.FA_PRODUCTS || []).find(p => p.slug === slug);
    const spec = window.FA_SAMPLE;
    if (!product || !spec) return;

    // Samples exist to compare finishes, so every finish goes in by default —
    // the customer removes what they don't want from the cart rather than
    // having to guess up front. Single-finish products just add the one.
    // The confirmation persists rather than flashing back: the samples really
    // are in the cart, so reverting to "Order a sample" would misreport state
    // and invite a second click. A page load resets it.
    const btn = document.querySelector('.pdp-actions .btn-sample');
    if (btn) btn.addEventListener('click', () => {
      const added = product.finishes.reduce((n, f) => n + (addSample(product, f) ? 1 : 0), 0);
      updateNavCount();
      const msg = added === 0 ? 'Already in cart'
                : added === 1 ? 'Sample added ✓'
                : `${added} samples added ✓`;
      btn.textContent = msg;
      btn.disabled = true;
      btn.classList.add('is-added');
    });
  }

  // Cart page — render line items from the store
  function renderCartRows() {
    const tbody = document.querySelector('body[data-page="cart"] .cart-table tbody');
    if (!tbody) return;
    // `i.type || 'product'` matters: the SEED array and any cart saved before
    // swatches existed have no type. Absence must always mean product.
    tbody.innerHTML = Cart.items().map(i => `
            <tr data-cart-row data-slug="${i.slug}" data-finish="${i.finish}" data-weight="${i.weight}" data-line-type="${i.type || 'product'}">
              <td class="cart-item-cell" data-label="Product">
                <div class="cart-item">
                  <div class="cart-thumb"><img src="${thumbFor(i.slug, i.parentSlug)}" alt="${i.name} ${i.sizeLabel}" loading="lazy"></div>
                  <div class="cart-item-info"><strong>${i.name}</strong><span>${i.sizeLabel} · SKU: ${i.sku}</span></div>
                </div>
              </td>
              <td data-label="Material">
                <span class="cart-finish" data-finish="${chipClass(i.finish)}">${finishShort(i.finish)}</span>
              </td>
              <td class="num" data-label="Price" data-unit-price="${i.price}">${fmtMoney(i.price)}</td>
              <td data-label="Qty">
                ${i.type === 'sample' ? '<span class="qty-fixed">1</span>' : `<div class="qty-stepper" aria-label="Quantity">
                  <button type="button" data-qty="-" aria-label="Decrease">−</button>
                  <input type="number" value="${i.qty}" min="1" max="99">
                  <button type="button" data-qty="+" aria-label="Increase">+</button>
                </div>`}
              </td>
              <td class="num" data-label="Subtotal" data-line-subtotal>${fmtMoney(i.price * i.qty)}</td>
              <td data-label="Remove"><button type="button" class="cart-remove" aria-label="Remove ${i.name}"><svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3.5 3.5 12.5 12.5M12.5 3.5 3.5 12.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button></td>
            </tr>`).join('');
  }

  // Checkout — render the "Your order" summary from the store + live totals
  function renderCheckoutSummary() {
    const wrap = document.querySelector('[data-order-items]');
    if (!wrap) return;
    wrap.innerHTML = Cart.items().map(i => `
        <div class="summary-item">
          <div class="summary-item-thumb"><img src="${thumbFor(i.slug, i.parentSlug)}" alt="${i.name}" loading="lazy"></div>
          <div class="summary-item-info"><strong>${i.name} × ${i.qty}</strong><span>${i.sizeLabel.replace(' inch', '')} · ${i.finish}</span></div>
          <div class="summary-item-price">${fmtMoney(i.price * i.qty)}</div>
        </div>`).join('');
    updateCheckoutTotals();
  }
  function selectedShipping() {
    const r = document.querySelector('input[name="shipping"]:checked');
    if (!r) return { label: 'UPS Ground', cost: 12 };
    const row = r.closest('.option-row');
    const priceEl = row.querySelector('.opt-main > span');
    const cost = priceEl ? (parseFloat(priceEl.textContent.replace(/[^0-9.]/g, '')) || 0) : 0;
    return { label: row.querySelector('strong').textContent, cost };
  }
  function tradeActive() {
    // Honor system (SL 7-23): self-identify + either a company name or a
    // website/trade ID. Must match initTradeToggle()'s reveal condition, or a
    // company-only trade pro sees the discount line but not the discounted total.
    const t = document.querySelector('[data-trade-toggle]');
    const company = document.querySelector('[data-trade-company]');
    const id = document.querySelector('[data-trade-id]');
    const filled = el => !!(el && el.value.trim() !== '');
    return !!(t && t.checked && (filled(company) || filled(id)));
  }
  // A cart of nothing but swatches ships free — must match the cart page, or a
  // "ships free" cart silently becomes a $12 UPS Ground order one screen later.
  function isSampleOnlyCart() {
    const items = Cart.items();
    return items.length > 0 && items.every(i => i.type === 'sample');
  }
  // Demo coupon codes (prototype). A real store validates server-side.
  const COUPONS = {
    'WELCOME10': { label: 'Coupon (WELCOME10)', rate: 0.10 },
    'FOUNDRY15': { label: 'Coupon (FOUNDRY15)', rate: 0.15 },
  };
  let appliedCoupon = null;   // { label, rate } once a valid code is applied

  function updateCheckoutTotals() {
    if (!document.querySelector('[data-order-items]')) return;
    const items = Cart.items();
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const discount = tradeActive() ? subtotal * 0.20 : 0;
    const couponAmt = appliedCoupon ? subtotal * appliedCoupon.rate : 0;
    const ship = isSampleOnlyCart()
      ? { label: 'Free (sample order)', cost: 0 }
      : selectedShipping();
    const tax = 0;
    const total = subtotal - discount - couponAmt + ship.cost + tax;
    setText('[data-co-subtotal]', fmtMoney(subtotal));
    const dl = document.querySelector('.trade-discount-line'); if (dl) dl.textContent = '−' + fmtMoney(discount);
    const couponRow = document.querySelector('[data-coupon-row]');
    if (couponRow) {
      couponRow.hidden = !appliedCoupon;
      if (appliedCoupon) {
        setText('[data-coupon-label]', appliedCoupon.label);
        setText('[data-coupon-amount]', '−' + fmtMoney(couponAmt));
      }
    }
    setText('[data-co-shipping-label]', ship.cost === 0 && isSampleOnlyCart() ? 'Shipping' : 'Shipping (' + ship.label + ')');
    setText('[data-co-shipping]', fmtMoney(ship.cost));
    setText('[data-co-tax]', fmtMoney(tax));
    setText('[data-co-total]', fmtMoney(total));
    const btn = document.querySelector('[data-place-order]'); if (btn) btn.textContent = 'Place Order — ' + fmtMoney(total);
  }
  // ────────────────────────────────────────────────────────
  // Checkout validation
  //
  // The form is `novalidate` so we own the messaging: native bubbles show one
  // error at a time, vanish on blur, and can't be styled. These are inline,
  // persistent, and announced.
  // ────────────────────────────────────────────────────────
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const ZIP_RE   = /^\d{5}(-\d{4})?$/;
  // Deliberately loose: 10+ digits after stripping punctuation. Strict phone
  // patterns reject valid international and extension formats.
  const digitsOf = s => (s || '').replace(/\D/g, '');

  function fieldError(field) {
    const label = field.closest('.form-group')
      ? (field.closest('.form-group').querySelector('label') || {}).textContent || 'This field'
      : 'This field';
    const name = label.replace(/\*/g, '').replace(/\(optional\)/i, '').trim() || 'This field';
    const val = (field.value || '').trim();

    if (!val) return name + ' is required.';
    if (field.type === 'email' && !EMAIL_RE.test(val)) return 'Enter a valid email address, e.g. name@studio.com.';
    if (/^(bz|sz)$/.test(field.id) && !ZIP_RE.test(val)) return 'Enter a 5-digit ZIP, e.g. 60622.';
    if (field.type === 'tel' && digitsOf(val).length < 10) return 'Enter a phone number including area code.';
    return null;
  }

  function showFieldError(field, msg) {
    const group = field.closest('.form-group');
    if (!group) return;
    group.classList.add('has-error');
    field.setAttribute('aria-invalid', 'true');
    let err = group.querySelector('.field-error');
    if (!err) {
      err = document.createElement('p');
      err.className = 'field-error';
      if (!field.id) field.id = 'fld-' + Math.random().toString(36).slice(2, 8);
      err.id = field.id + '-error';
      err.setAttribute('role', 'alert');
      group.appendChild(err);
    }
    err.textContent = msg;
    field.setAttribute('aria-describedby', err.id);
  }

  function clearFieldError(field) {
    const group = field.closest('.form-group');
    if (!group) return;
    group.classList.remove('has-error');
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
    const err = group.querySelector('.field-error');
    if (err) err.remove();
  }

  function validateCheckout(form) {
    const fields = Array.from(form.querySelectorAll('input[required], textarea[required], select[required]'))
      // Never validate a field the user can't see (e.g. the hidden Projects
      // block, or ship-to fields while the toggle is off).
      .filter(f => f.offsetParent !== null);

    let firstBad = null;
    fields.forEach(f => {
      const msg = fieldError(f);
      if (msg) { showFieldError(f, msg); if (!firstBad) firstBad = f; }
      else clearFieldError(f);
    });

    const summary = document.querySelector('[data-checkout-errors]');
    if (summary) {
      const n = form.querySelectorAll('.form-group.has-error').length;
      if (n) {
        summary.textContent = n === 1
          ? 'One field needs your attention before we can place the order.'
          : n + ' fields need your attention before we can place the order.';
        summary.hidden = false;
      } else {
        summary.hidden = true;
      }
    }

    if (firstBad) {
      firstBad.focus();
      firstBad.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return false;
    }
    return true;
  }

  // Clear a field's error as soon as it becomes valid — errors that linger
  // after the user has fixed them read as broken.
  function initCheckoutValidation() {
    const form = document.querySelector('[data-checkout-form]');
    if (!form) return;
    form.addEventListener('input', e => {
      const f = e.target;
      if (!f.matches('input, textarea, select')) return;
      if (f.closest('.form-group.has-error') && !fieldError(f)) clearFieldError(f);
    });
    // Validate on blur only once the field has been touched and left empty/bad,
    // so we don't scold someone mid-typing on their first pass.
    form.addEventListener('blur', e => {
      const f = e.target;
      if (!f.matches('input[required], textarea[required], select[required]')) return;
      if (!(f.value || '').trim()) return;          // empty-on-first-visit is not an error yet
      const msg = fieldError(f);
      if (msg) showFieldError(f, msg); else clearFieldError(f);
    }, true);
  }

  function initCheckout() {
    if (!document.querySelector('[data-order-items]')) return;
    renderCheckoutSummary();
    document.querySelectorAll('input[name="shipping"]').forEach(r => r.addEventListener('change', updateCheckoutTotals));
    const tt = document.querySelector('[data-trade-toggle]'); if (tt) tt.addEventListener('change', updateCheckoutTotals);
    // Both trade fields drive the total — either can unlock pricing (SL 7-23).
    document.querySelectorAll('[data-trade-company], [data-trade-id]').forEach(f => {
      f.addEventListener('input', updateCheckoutTotals);
      f.addEventListener('blur', updateCheckoutTotals);
    });

    // Coupon apply (demo codes)
    const couponBtn = document.querySelector('[data-coupon-apply]');
    const couponInput = document.querySelector('[data-coupon-input]');
    const couponMsg = document.querySelector('[data-coupon-msg]');
    function showCouponMsg(text, ok) {
      if (!couponMsg) return;
      couponMsg.textContent = text;
      couponMsg.classList.toggle('is-ok', !!ok);
      couponMsg.classList.toggle('is-error', !ok);
      couponMsg.hidden = !text;
    }
    function applyCoupon() {
      const code = (couponInput && couponInput.value.trim().toUpperCase()) || '';
      if (!code) { showCouponMsg('Enter a code first.', false); return; }
      const match = COUPONS[code];
      if (match) {
        appliedCoupon = match;
        showCouponMsg(Math.round(match.rate * 100) + '% off applied.', true);
      } else {
        appliedCoupon = null;
        showCouponMsg('That code isn\u2019t valid.', false);
      }
      updateCheckoutTotals();
    }
    if (couponBtn) couponBtn.addEventListener('click', applyCoupon);
    if (couponInput) couponInput.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); applyCoupon(); } });
    // Single submit owner: validate first, and only snapshot + redirect when
    // the form is clean. A second listener wouldn't work — listeners fire in
    // registration order, so this one would clear the cart before validation
    // ever ran.
    const form = document.querySelector('[data-checkout-form]');
    if (form) form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateCheckout(form)) return;

      const items = Cart.items();
      const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
      const discount = tradeActive() ? subtotal * 0.20 : 0;
      const couponAmt = appliedCoupon ? subtotal * appliedCoupon.rate : 0;
      const ship = isSampleOnlyCart() ? { label: 'Free (sample order)', cost: 0 } : selectedShipping();
      const total = subtotal - discount - couponAmt + ship.cost;
      // id/date/status are stamped here so this order can be promoted to the
      // top of the account order history (see Account.orders()).
      const now = new Date();
      const id = 'FA-' + now.getFullYear() + '-' + String(Math.floor(now.getTime() / 1000) % 100000).padStart(5, '0');
      const date = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      try {
        localStorage.setItem('fa_last_order', JSON.stringify({
          id, date, status: 'Processing', items, subtotal, discount,
          shipping: ship, tax: 0, total,
          payment: (document.querySelector('input[name="payment"]:checked') ? 'Card' : 'Card'),
          tracking: null,
        }));
      } catch (e) {}
      Cart.clear();
      window.location.href = '/foundry-art/checkout/order-received/';
    });
  }

  // Order-received — reflect the placed order if we have a snapshot
  function initOrderReceived() {
    if (document.body.getAttribute('data-page') !== 'order-received') return;
    let order; try { order = JSON.parse(localStorage.getItem('fa_last_order')); } catch (e) {}
    if (!order || !order.items || !order.items.length) return;
    const body = document.querySelector('[data-order-details]');
    if (body) {
      body.innerHTML = order.items.map(i => `
          <tr>
            <td>
              <div class="cart-item">
                <div class="cart-thumb"><img src="${thumbFor(i.slug, i.parentSlug)}" alt="${i.name} ${i.sizeLabel}" loading="lazy"></div>
                <div class="cart-item-info"><strong>${i.name} × ${i.qty}</strong><span>${i.sizeLabel.replace(' inch', '')} · ${i.finish} · SKU: ${i.sku}</span></div>
              </div>
            </td>
            <td class="num">${fmtMoney(i.price * i.qty)}</td>
          </tr>
          `).join('') +
        // .confirm-total drops the heavy per-row rule the product rows carry —
        // the totals read as one quiet block, matching the checkout summary.
        `<tr class="confirm-total confirm-total-first"><td>Subtotal</td><td class="num">${fmtMoney(order.subtotal)}</td></tr>` +
        (order.discount ? `<tr class="confirm-total"><td>Trade discount (20%)</td><td class="num">−${fmtMoney(order.discount)}</td></tr>` : '') +
        `<tr class="confirm-total"><td>${order.shipping.label}</td><td class="num">${fmtMoney(order.shipping.cost)}</td></tr>` +
        `<tr class="confirm-total confirm-total-final"><td>Total</td><td class="num">${fmtMoney(order.total)}</td></tr>`;
    }
    setText('[data-or-total]', fmtMoney(order.total));
    if (order.id) setText('[data-or-id]', '#' + order.id);
  }

  // ────────────────────────────────────────────────────────
  // Cart — live line subtotals + order totals
  // Reads the rendered rows (renderCartRows) and reacts to the
  // 'change'/'input' events initQtySteppers fires, plus Remove;
  // syncs qty/remove back to the Cart store.
  // ────────────────────────────────────────────────────────
  function initCart() {
    if (!document.body.matches('[data-page="cart"]')) return;
    const tbody = document.querySelector('.cart-table tbody');
    if (!tbody) return;

    const money = n => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const parseMoney = s => parseFloat(String(s).replace(/[^0-9.]/g, '')) || 0;

    const els = {
      subtotal: document.querySelector('[data-summary-subtotal]'),
      total:    document.querySelector('[data-summary-total]'),
      count:    document.querySelector('[data-summary-count]'),
      lines:    document.querySelector('[data-cart-lines]'),
      nav:      document.querySelector('[data-cart-count]'),
      shipping: document.querySelector('[data-cart-shipping]'),
    };

    // ── Shipping estimator (weight + UPS zone) ──
    // Approximate UPS Ground estimate from the ship-to state (zone off
    // the Chicago studio, 606xx) + total billable weight (per-tile
    // data-weight + ~1 lb packaging). Live, authenticated rating happens
    // in the WooCommerce UPS plugin — this is a believable stand-in.
    const shipState  = document.querySelector('[data-ship-state]');
    const shipUpdate = document.querySelector('[data-ship-update]');
    const shipResult = document.querySelector('[data-ship-result]');
    // "Is this a sample order" is derived from the lines themselves rather than
    // asserted by a manual toggle, so the shipping note can never contradict
    // the cart. `!== 'sample'` (not `=== 'product'`) because legacy carts have
    // no type attribute at all.
    function isSampleOrder() {
      const rows = tbody.querySelectorAll('[data-cart-row]');
      return rows.length > 0 &&
        Array.from(rows).every(r => r.getAttribute('data-line-type') === 'sample');
    }
    const UPS_ZONE = { 'Illinois': 2, 'New York': 5, 'California': 7 };
    let shipEstimate = null; // dollars, or null until estimated

    function billableWeight() {
      let w = 0;
      tbody.querySelectorAll('[data-cart-row]').forEach(row => {
        const unit = parseFloat(row.getAttribute('data-weight')) || 0;
        const input = row.querySelector('.qty-stepper input');
        const qty = input ? Math.max(1, parseInt(input.value, 10) || 1) : 1;
        w += unit * qty;
      });
      return w + 1; // + ~1 lb packaging
    }
    function estimateShipping() {
      const zone = UPS_ZONE[shipState && shipState.value] || 5;
      const est = 9.5 + (zone - 2) * 1.75 + billableWeight() * 1.2;
      return Math.round(est * 100) / 100;
    }
    function showShipResult() {
      if (!shipResult) return;
      shipResult.textContent = 'UPS Ground to ' + (shipState ? shipState.value : '') +
        ' — ' + money(shipEstimate) + ' · 5–7 business days · estimate';
      shipResult.hidden = false;
    }

    function recompute() {
      const rows = Array.from(tbody.querySelectorAll('[data-cart-row]'));
      let subtotal = 0, qtyTotal = 0;
      rows.forEach(row => {
        const priceCell = row.querySelector('[data-unit-price]');
        if (!priceCell) return;
        // Samples render a fixed "1" with no stepper, so a missing input
        // means quantity 1 — not a row to skip. Skipping it would drop the
        // line from the item count.
        const input = row.querySelector('.qty-stepper input');
        const unit = parseFloat(priceCell.getAttribute('data-unit-price')) || parseMoney(priceCell.textContent);
        const qty = input ? Math.max(1, parseInt(input.value, 10) || 1) : 1;
        const line = unit * qty;
        const lineCell = row.querySelector('[data-line-subtotal]');
        if (lineCell) lineCell.textContent = money(line);
        subtotal += line;
        qtyTotal += qty;
      });
      // Once an estimate exists, keep it in sync with qty changes.
      if (shipEstimate != null) { shipEstimate = estimateShipping(); showShipResult(); }
      // Shipping: a swatch-only order ships free; otherwise use the estimate
      // if one was run, else "calculated at checkout".
      const sample = isSampleOrder();
      let shipCost = 0, shipText;
      if (sample)                  { shipText = 'Free'; shipCost = 0; }
      else if (shipEstimate != null) { shipText = money(shipEstimate); shipCost = shipEstimate; }
      else                         { shipText = 'Calculated at checkout'; shipCost = 0; }
      if (els.shipping) els.shipping.textContent = shipText;
      if (els.subtotal) els.subtotal.textContent = money(subtotal);
      if (els.total)    els.total.textContent = money(subtotal + shipCost);
      if (els.count)    els.count.textContent = qtyTotal;
      if (els.lines)    els.lines.textContent = rows.length;
      if (els.nav)      els.nav.textContent = qtyTotal;
      if (!rows.length) showEmpty();
    }

    function showEmpty() {
      if (document.querySelector('.empty-cart-message')) return;
      const table = document.querySelector('.cart-table');
      if (!table) return;
      const msg = document.createElement('p');
      msg.className = 'empty-cart-message';
      msg.innerHTML = 'Your cart is empty. <a href="/foundry-art/shop/" style="color:var(--bronze);border-bottom:1px solid var(--bronze-l)">Continue shopping →</a>';
      table.replaceWith(msg);
    }

    function syncQty(input) {
      const row = input.closest('[data-cart-row]');
      if (row && row.dataset.slug) Cart.setQty(row.dataset.slug, row.dataset.finish, parseInt(input.value, 10) || 1);
    }
    tbody.addEventListener('change', e => { if (e.target.matches('.qty-stepper input')) { syncQty(e.target); recompute(); } });
    tbody.addEventListener('input',  e => { if (e.target.matches('.qty-stepper input')) { syncQty(e.target); recompute(); } });
    tbody.addEventListener('click', e => {
      const btn = e.target.closest('.cart-remove');
      if (!btn) return;
      const row = btn.closest('[data-cart-row]');
      if (row) {
        if (row.dataset.slug) Cart.remove(row.dataset.slug, row.dataset.finish);
        row.remove();
      }
      updateNavCount();
      recompute();
    });

    if (shipUpdate) shipUpdate.addEventListener('click', () => {
      shipEstimate = estimateShipping();
      showShipResult();
      recompute();
    });
    // (No sample-toggle listener — sample state is derived in recompute().)

    recompute();
  }

  // ────────────────────────────────────────────────────────
  // Account (prototype)
  // ────────────────────────────────────────────────────────

  // Shared order line renderer — one template for order-received AND the
  // account order detail page, since both read the same line shape.
  function orderRowsHTML(order) {
    return (order.items || []).map(i => `
          <tr>
            <td>
              <div class="cart-item">
                <div class="cart-thumb"><img src="${thumbFor(i.slug, i.parentSlug)}" alt="${i.name} ${i.sizeLabel}" loading="lazy"></div>
                <div class="cart-item-info"><strong>${i.name} × ${i.qty}</strong><span>${String(i.sizeLabel).replace(' inch', '')} · ${i.finish} · SKU: ${i.sku}</span></div>
              </div>
            </td>
            <td class="num">${fmtMoney(i.price * i.qty)}</td>
          </tr>`).join('');
  }

  const statusPill = s => `<span class="status-pill status-${String(s).toLowerCase()}">${s}</span>`;

  // ?signin=1 / ?signout=1 on any FA page, plus the signed-out redirect guard.
  // Runs before the nav paints so the header never flashes the wrong state.
  function initAccountGate() {
    const params = new URLSearchParams(location.search);
    let changed = false;
    if (params.get('signin') === '1')  { Account.signIn(); params.delete('signin');  changed = true; }
    if (params.get('signout') === '1') { Account.signOut(); params.delete('signout'); changed = true; }
    if (changed) {
      const qs = params.toString();
      history.replaceState({}, '', location.pathname + (qs ? '?' + qs : ''));
    }
    // Guard the account pages — never render a blank signed-out shell.
    const page = document.body.getAttribute('data-page') || '';
    const isAccountPage = document.body.hasAttribute('data-account') && page !== 'account-sign-in';
    if (isAccountPage && !Account.isSignedIn()) {
      location.replace('/foundry-art/account/sign-in/?next=' + encodeURIComponent(location.pathname));
    }
  }

  function initAccountNav() {
    function paint() {
      document.querySelectorAll('[data-account-link]').forEach(a => {
        if (Account.isSignedIn()) {
          const c = Account.customer();
          a.textContent = c ? c.firstName : 'Account';
          a.setAttribute('href', '/foundry-art/account/');
        } else {
          a.textContent = 'Sign in';
          a.setAttribute('href', '/foundry-art/account/sign-in/');
        }
      });
      document.querySelectorAll('[data-sign-out]').forEach(b => {
        b.addEventListener('click', e => { e.preventDefault(); Account.signOut(); location.href = '/foundry-art/'; });
      });
    }
    paint();
    document.addEventListener('fa-account-change', paint);
  }

  function initSignIn() {
    if (document.body.getAttribute('data-page') !== 'account-sign-in') return;
    const next = new URLSearchParams(location.search).get('next') || '/foundry-art/account/';
    document.querySelectorAll('[data-signin-form]').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]');
        Account.signIn(email && email.value ? email.value.trim() : null);
        location.href = next;
      });
    });

    // Sign-in / register are one panel swapped in place; the heading follows.
    const title = document.querySelector('[data-auth-title]');
    const sub = document.querySelector('[data-auth-sub]');
    const COPY = {
      signin:   { title: 'Sign in', sub: 'Access your orders, addresses and trade pricing.' },
      register: { title: 'Create an account', sub: 'Save your details, track orders, and apply for trade pricing.' },
    };
    function showView(v) {
      document.querySelectorAll('[data-auth-view]').forEach(p =>
        p.hidden = p.getAttribute('data-auth-view') !== v);
      if (title && COPY[v]) title.textContent = COPY[v].title;
      if (sub && COPY[v]) sub.textContent = COPY[v].sub;
      // Keep the view in the URL (and preserve ?next) so a refresh or a shared
      // link lands on the same panel.
      const params = new URLSearchParams(location.search);
      if (v === 'register') params.set('view', 'register'); else params.delete('view');
      history.replaceState(null, '', location.pathname + (params.toString() ? '?' + params : ''));
      if (v === 'register') { const f = document.querySelector('#rg-first'); if (f) f.focus(); }
    }
    document.querySelectorAll('[data-auth-to]').forEach(btn =>
      btn.addEventListener('click', () => showView(btn.getAttribute('data-auth-to'))));
    if (new URLSearchParams(location.search).get('view') === 'register') showView('register');
  }

  function renderAccountDashboard() {
    if (document.body.getAttribute('data-page') !== 'account-dashboard') return;
    const c = Account.customer(); if (!c) return;
    setText('[data-account-hello]', 'Hello, ' + c.firstName);
    setText('[data-account-email]', c.email);

    const orders = Account.orders();
    const latest = orders[0];
    const wrap = document.querySelector('[data-latest-order]');
    if (wrap && latest) {
      wrap.innerHTML = `
        <div class="summary-row"><span>Order</span><strong>${latest.id}</strong></div>
        <div class="summary-row"><span>Placed</span><span>${latest.date}</span></div>
        <div class="summary-row"><span>Status</span>${statusPill(latest.status)}</div>
        <div class="summary-row total"><span>Total</span><span>${fmtMoney(latest.total)}</span></div>
        <a class="btn-secondary" href="/foundry-art/account/orders/detail/?order=${encodeURIComponent(latest.id)}">View order</a>`;
    }

    const t = c.trade;
    const tw = document.querySelector('[data-trade-status]');
    if (tw && t) {
      if (t.status === 'approved') {
        tw.innerHTML = `<h4>Trade account</h4>
          <p><strong>${Math.round(t.discount * 100)}% trade pricing</strong> is applied automatically at checkout.</p>
          <div class="summary-row"><span>Trade ID</span><strong>${t.tradeId}</strong></div>
          <div class="summary-row"><span>Firm</span><span>${t.firm}</span></div>
          <div class="summary-row"><span>Verified</span><span>${t.verifiedOn}</span></div>`;
      } else if (t.status === 'pending') {
        tw.innerHTML = `<h4>Trade account</h4><p>Trade pricing is active on your account. Add your company details anytime to keep them on file.</p>`;
      } else {
        tw.innerHTML = `<h4>Trade account</h4><p>Designers, architects and contractors get trade pricing &mdash; tell us who you work with to activate it.</p>
          <a class="btn-secondary" href="/foundry-art/account/details/">Activate trade pricing</a>`;
      }
    }

    const ad = document.querySelector('[data-address-summary]');
    if (ad) ad.innerHTML = `<p>${c.billing.line1}${c.billing.line2 ? ', ' + c.billing.line2 : ''}<br>${c.billing.city}, ${c.billing.state} ${c.billing.zip}</p>`;
  }

  function renderAccountOrders() {
    if (document.body.getAttribute('data-page') !== 'account-orders') return;
    const tbody = document.querySelector('[data-orders-list]');
    if (!tbody) return;
    const orders = Account.orders();
    // A signed-in customer with no history got a header row over blank space.
    // Say so, and point at the one action that resolves it.
    const empty = document.querySelector('[data-orders-empty]');
    // The card, not the table — the table is wrapped now, and hiding only the
    // table would leave an empty bordered card above the empty state.
    const shell = document.querySelector('[data-orders-card]') || tbody.closest('table');
    if (!orders.length) {
      if (shell) shell.hidden = true;
      if (empty) empty.hidden = false;
      return;
    }
    if (shell) shell.hidden = false;
    if (empty) empty.hidden = true;
    tbody.innerHTML = orders.map(o => `
          <tr>
            <td data-label="Order"><a href="/foundry-art/account/orders/detail/?order=${encodeURIComponent(o.id)}"><strong>${o.id}</strong></a>
              ${o.discount > 0 ? '<span class="line-tag">Trade</span>' : ''}</td>
            <td data-label="Date">${o.date}</td>
            <td data-label="Status">${statusPill(o.status)}</td>
            <td data-label="Items">${o.items.reduce((n, i) => n + i.qty, 0)}</td>
            <td class="num" data-label="Total">${fmtMoney(o.total)}</td>
          </tr>`).join('');
  }

  function renderAccountOrderDetail() {
    if (document.body.getAttribute('data-page') !== 'account-order') return;
    const id = new URLSearchParams(location.search).get('order');
    const order = id ? Account.orderById(id) : Account.orders()[0];
    const root = document.querySelector('[data-order-detail]');
    if (!root) return;
    if (!order) {
      root.innerHTML = '<p>That order could not be found. <a href="/foundry-art/account/orders/">Back to order history</a></p>';
      return;
    }
    setText('[data-order-id]', order.id);
    setText('[data-order-date]', order.date);
    const st = document.querySelector('[data-order-status]');
    if (st) st.innerHTML = statusPill(order.status);
    const rows = document.querySelector('[data-order-rows]');
    if (rows) rows.innerHTML = orderRowsHTML(order);
    setText('[data-order-subtotal]', fmtMoney(order.subtotal));
    setText('[data-order-shipping]', fmtMoney(order.shipping.cost));
    setText('[data-order-shipping-label]', order.shipping.cost === 0 ? 'Shipping' : 'Shipping (' + order.shipping.label + ')');
    setText('[data-order-total]', fmtMoney(order.total));
    setText('[data-order-payment]', order.payment || '—');
    const disc = document.querySelector('[data-order-discount-row]');
    if (disc) {
      disc.hidden = !(order.discount > 0);
      setText('[data-order-discount]', '−' + fmtMoney(order.discount));
    }
    const track = document.querySelector('[data-order-tracking]');
    if (track) {
      track.hidden = !order.tracking;
      setText('[data-order-tracking-no]', order.tracking || '');
    }
  }

  function initAccountDetails() {
    if (document.body.getAttribute('data-page') !== 'account-details') return;
    const c = Account.customer(); if (!c) return;
    const set = (sel, v) => { const el = document.querySelector(sel); if (el) el.value = v; };
    set('#acc-first', c.firstName); set('#acc-last', c.lastName);
    set('#acc-email', c.email);     set('#acc-phone', c.phone);

    const t = c.trade;
    const panel = document.querySelector('[data-trade-panel]');
    if (panel && t) {
      panel.innerHTML = t.status === 'approved'
        ? `<div class="summary-row"><span>Status</span>${statusPill('Approved')}</div>
           <div class="summary-row"><span>Trade ID</span><strong>${t.tradeId}</strong></div>
           <div class="summary-row"><span>Firm</span><span>${t.firm}</span></div>
           <div class="summary-row"><span>Website</span><span>${t.website}</span></div>
           <div class="summary-row"><span>Verified</span><span>${t.verifiedOn}</span></div>
           <p class="form-hint">${Math.round(t.discount * 100)}% is applied automatically at checkout. To update your firm details, contact the studio.</p>`
        : `<div class="field-grid">
             <div class="form-group"><label for="trade-firm">Company or firm name *</label><input id="trade-firm" type="text"></div>
             <div class="form-group"><label for="trade-site">Professional website <span class="opt">(optional)</span></label><input id="trade-site" type="text"></div>
           </div>
           <button type="button" class="btn-primary" data-trade-apply>Activate trade pricing</button>
           <p class="form-hint">Trade pricing applies right away &mdash; tell us who you work with and we&rsquo;ll take it from there. Designers, architects, and contractors welcome.</p>`;
      const apply = panel.querySelector('[data-trade-apply]');
      if (apply) apply.addEventListener('click', () => {
        const label = apply.textContent;
        apply.textContent = 'Application sent ✓'; apply.disabled = true;
        setTimeout(() => { apply.textContent = label; apply.disabled = false; }, 1600);
      });
    }
  }

  function renderAccountAddresses() {
    if (document.body.getAttribute('data-page') !== 'account-addresses') return;
    const c = Account.customer(); if (!c) return;
    const esc = v => String(v == null ? '' : v).replace(/[&<>"]/g, ch =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
    const fmt = a => `${c.firstName} ${c.lastName}<br>${c.company ? c.company + '<br>' : ''}${a.line1}<br>${a.line2 ? a.line2 + '<br>' : ''}${a.city}, ${a.state} ${a.zip}<br>${a.country}`;

    // The dashboard's "Manage addresses" button pointed here, and here was two
    // blocks of read-only text — the CTA promised an action the page couldn't
    // perform. Each card now carries an inline edit form (progressive
    // disclosure rather than a modal, per the funnel's existing form vocabulary).
    const FIELDS = [
      { key: 'line1',   label: 'Street address',  half: false },
      { key: 'line2',   label: 'Apt, suite, unit', half: false },
      { key: 'city',    label: 'Town / City',     half: true  },
      { key: 'state',   label: 'State',           half: true  },
      { key: 'zip',     label: 'ZIP Code',        half: true  },
      { key: 'country', label: 'Country',         half: true  },
    ];

    ['billing', 'shipping'].forEach(kind => {
      const view = document.querySelector('[data-address-' + kind + ']');
      const card = view && view.closest('[data-address-card]');
      if (!view || !card) return;
      view.innerHTML = fmt(c[kind]);

      const form = card.querySelector('[data-address-form]');
      const editBtn = card.querySelector('[data-address-edit]');
      if (!form || !editBtn) return;

      form.innerHTML = `<div class="field-grid">` + FIELDS.map(f =>
        `<div class="form-group${f.half ? '' : ' full'}">
           <label for="${kind}-${f.key}">${f.label}</label>
           <input id="${kind}-${f.key}" name="${f.key}" type="text" value="${esc(c[kind][f.key])}">
         </div>`).join('') + `</div>
        <div class="address-actions">
          <button type="submit" class="btn-primary">Save address</button>
          <button type="button" class="btn-secondary" data-address-cancel>Cancel</button>
        </div>`;

      const open = on => {
        form.hidden = !on;
        view.hidden = on;
        editBtn.hidden = on;
        editBtn.setAttribute('aria-expanded', String(on));
        if (on) { const first = form.querySelector('input'); if (first) first.focus(); }
        else editBtn.focus();
      };
      editBtn.setAttribute('aria-expanded', 'false');
      editBtn.addEventListener('click', () => open(true));
      form.querySelector('[data-address-cancel]').addEventListener('click', () => {
        form.reset();
        open(false);
      });
      form.addEventListener('submit', e => {
        e.preventDefault();
        // Prototype: the customer record is a static file, so this updates the
        // in-memory copy and repaints. A refresh restores the seed data, which
        // is the documented behaviour of the whole account area.
        FIELDS.forEach(f => {
          const input = form.querySelector('#' + kind + '-' + f.key);
          if (input) c[kind][f.key] = input.value.trim();
        });
        view.innerHTML = fmt(c[kind]);
        open(false);
        const label = editBtn.textContent;
        editBtn.textContent = 'Saved ✓';
        editBtn.disabled = true;
        setTimeout(() => { editBtn.textContent = label; editBtn.disabled = false; }, 1600);
      });
    });
  }

  // Checkout reflects signed-in state. MUST run after initCheckout() and
  // initTradeToggle() — both bind the same trade elements, so this dispatches
  // synthetic events rather than calling their internals.
  function initCheckoutAccount() {
    if (document.body.getAttribute('data-page') !== 'checkout') return;
    const link = document.querySelector('[data-signin-link]');
    if (link) link.setAttribute('href', '/foundry-art/account/sign-in/?next=' + encodeURIComponent('/foundry-art/checkout/'));
    if (!Account.isSignedIn()) return;

    const c = Account.customer(); if (!c) return;
    const sub = document.querySelector('.page-sub');
    if (sub) sub.innerHTML = `Signed in as <strong>${c.email}</strong> · <a href="#" data-sign-out style="color:var(--bronze);border-bottom:1px solid var(--bronze-l)">Sign out</a>`;
    document.querySelectorAll('[data-sign-out]').forEach(b => {
      b.addEventListener('click', e => { e.preventDefault(); Account.signOut(); location.reload(); });
    });

    const fill = (sel, v) => { const el = document.querySelector(sel); if (el && !el.value) el.value = v; };
    fill('#bf', c.firstName);  fill('#bl', c.lastName);
    fill('#be', c.email);      fill('#bp', c.phone);
    fill('#bc', c.company);                        // bc is Company — NOT city
    fill('#ba1', c.billing.line1); fill('#ba2', c.billing.line2);
    fill('#bci', c.billing.city);                  // bci is Town / City
    fill('#bz', c.billing.zip);

    const t = c.trade;
    if (t && t.status === 'approved') {
      const toggle = document.querySelector('[data-trade-toggle]');
      const companyField = document.querySelector('[data-trade-company]');
      const idField = document.querySelector('[data-trade-id]');
      if (toggle && !toggle.checked) { toggle.checked = true; toggle.dispatchEvent(new Event('change')); }
      if (companyField && !companyField.value) { companyField.value = t.firm || c.company || ''; companyField.dispatchEvent(new Event('input')); }
      if (idField && !idField.value) { idField.value = t.tradeId; idField.dispatchEvent(new Event('input')); }
    }
  }

  // Deep-link "View order in account" to the order just placed.
  function initViewOrderLink() {
    const link = document.querySelector('[data-view-order]');
    if (!link) return;
    let last = null;
    try { last = JSON.parse(localStorage.getItem('fa_last_order')); } catch (e) {}
    if (last && last.id) {
      link.setAttribute('href', '/foundry-art/account/orders/detail/?order=' + encodeURIComponent(last.id));
    }
    if (!Account.isSignedIn()) {
      link.setAttribute('href', '/foundry-art/account/sign-in/?next=' + encodeURIComponent(link.getAttribute('href')));
    }
  }

  function initPrintReceipt() {
    document.querySelectorAll('[data-print-receipt]').forEach(b => {
      b.addEventListener('click', e => { e.preventDefault(); window.print(); });
    });
  }

  // ────────────────────────────────────────────────────────
  // PDP tab switcher
  // ────────────────────────────────────────────────────────
  function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = document.querySelector(`.tab-panel[data-tab="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  }

  // ────────────────────────────────────────────────────────
  // Mobile gallery carousel
  //
  // Below 560px the thumb grid becomes a swipeable scroll-snap track and the
  // main image is hidden. No slides are cloned — the thumb buttons already
  // hold the full-size images, so the same markup serves both layouts and
  // there is no second copy to keep in sync.
  //
  // Position dots are built here rather than in markup because they only
  // exist in the mobile layout; they're torn down above the breakpoint so a
  // desktop DOM stays clean.
  function initGalleryCarousel() {
    const track = document.querySelector('.pdp-gallery .thumbs');
    if (!track) return;
    const slides = Array.from(track.querySelectorAll('.thumb'));
    if (slides.length < 2) return;

    const mq = window.matchMedia('(max-width: 560px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let dots = null;
    let firstBuild = true;
    let timer = null;
    let userTook = false;   // once they swipe or tap, autoplay is done for good

    // Rect math, not offsetLeft: .thumb is position:relative while .thumbs is
    // not, so offsetLeft resolves against a further ancestor and wouldn't be
    // comparable to the track's own scrollLeft.
    const deltaFor = i => slides[i].getBoundingClientRect().left - track.getBoundingClientRect().left;
    const currentIndex = () => {
      let best = 0, bestD = Infinity;
      slides.forEach((s, i) => {
        const d = Math.abs(deltaFor(i));
        if (d < bestD) { bestD = d; best = i; }
      });
      return best;
    };

    function sync() {
      if (!dots) return;
      const i = currentIndex();
      Array.from(dots.children).forEach((d, n) => {
        const on = n === i;
        d.classList.toggle('active', on);
        d.setAttribute('aria-current', on ? 'true' : 'false');
      });
    }

    function build() {
      if (dots) return;
      // Browsers restore a scroll container's offset across loads, which would
      // otherwise drop a returning visitor onto whichever photo they left on.
      // Only on first build — a rotation that crosses the breakpoint shouldn't
      // yank them back to the start.
      if (firstBuild) { track.scrollLeft = 0; firstBuild = false; }
      dots = document.createElement('div');
      dots.className = 'gallery-dots';
      slides.forEach((_, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'gallery-dot';
        b.setAttribute('aria-label', 'Show image ' + (i + 1) + ' of ' + slides.length);
        // Instant, not smooth: `scroll-snap-stop: always` makes the track halt
        // at every snap point, so a smooth programmatic scroll advances only
        // one slide no matter how far you asked it to go — tapping the last
        // dot would step forward by one. Snap-stop is kept because it's what
        // stops a fast swipe from flinging past three photos; a direct jump
        // is the right behaviour for a "take me to photo 5" control anyway.
        b.addEventListener('click', () => { surrender(); track.scrollLeft += deltaFor(i); });
        dots.appendChild(b);
      });
      track.insertAdjacentElement('afterend', dots);
      sync();
      play();
    }

    function destroy() {
      if (!dots) return;
      pause();
      dots.remove();
      dots = null;
      track.scrollLeft = 0;   // leave the row at its start for the grid layout
    }

    // Autoplay. Three guards, all of them load-bearing:
    //   · never starts under prefers-reduced-motion
    //   · stops permanently at the first swipe or dot tap — auto-advancing
    //     under someone who is actively browsing is the thing everyone hates
    //   · pauses on a hidden tab rather than animating into the void
    const DWELL = 4000;
    function advance() {
      const i = currentIndex();
      const next = (i + 1) % slides.length;
      // Wrapping back to the start is a multi-slide move, which smooth
      // scrolling can't do here — `scroll-snap-stop: always` would stop it at
      // the next snap point. Instant for the wrap, smooth for single steps.
      if (next === 0) track.scrollLeft = 0;
      else track.scrollBy({ left: deltaFor(next), behavior: 'smooth' });
    }
    function play() {
      if (timer || userTook || reduced.matches || !mq.matches) return;
      timer = setInterval(advance, DWELL);
    }
    function pause() { clearInterval(timer); timer = null; }
    function surrender() { userTook = true; pause(); }

    ['pointerdown', 'touchstart', 'wheel', 'keydown'].forEach(evt =>
      track.addEventListener(evt, surrender, { passive: true }));
    document.addEventListener('visibilitychange', () => document.hidden ? pause() : play());
    reduced.addEventListener('change', () => reduced.matches ? pause() : play());

    let ticking = false;
    track.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { sync(); ticking = false; });
    }, { passive: true });

    const apply = () => (mq.matches ? build() : destroy());
    apply();
    mq.addEventListener('change', apply);
  }

  // PDP image gallery (thumb → main swap)
  // ────────────────────────────────────────────────────────
  function initGallery() {
    const main = document.querySelector('.pdp-gallery .main-image');
    const mainImg = main ? main.querySelector('img') : null;
    const mainLabel = main ? main.querySelector('span') : null;
    const thumbs = document.querySelectorAll('.pdp-gallery .thumb');
    if (!main || !thumbs.length) return;

    thumbs.forEach(t => {
      t.addEventListener('click', () => {
        thumbs.forEach(x => x.classList.remove('active'));
        t.classList.add('active');

        const src = t.dataset.src;
        const label = t.dataset.label || t.textContent.trim();

        if (mainImg && src) {
          // Quick fade then swap
          mainImg.style.opacity = '0';
          setTimeout(() => {
            mainImg.src = src;
            mainImg.alt = label;
            mainImg.style.opacity = '';
          }, 120);
        }
        if (mainLabel) mainLabel.textContent = label;

        // If this thumb's src matches a finish swatch, sync the swatch state
        // (so clicking the Traditional / White Bronze thumb also updates which
        // finish the user is buying)
        const matchingSwatch = document.querySelector(`.swatch-row .swatch[data-finish-src="${src}"]`);
        if (matchingSwatch && !matchingSwatch.classList.contains('selected')) {
          document.querySelectorAll('.swatch-row .swatch').forEach(s => {
            s.classList.remove('selected');
            s.setAttribute('aria-checked', 'false');
          });
          matchingSwatch.classList.add('selected');
          matchingSwatch.setAttribute('aria-checked', 'true');
        }
      });
    });
  }

  // ────────────────────────────────────────────────────────
  // Swatch picker (PDP material chooser) — swaps main image
  // ────────────────────────────────────────────────────────
  function initSwatches() {
    const swatches = document.querySelectorAll('.swatch-row .swatch');
    if (!swatches.length) return;

    const mainImage = document.querySelector('.pdp-gallery .main-image img');
    const mainLabel = document.querySelector('.pdp-gallery .main-image span');
    const thumbs = Array.from(document.querySelectorAll('.pdp-gallery .thumb'));

    swatches.forEach(s => {
      s.addEventListener('click', () => {
        swatches.forEach(x => {
          x.classList.remove('selected');
          x.setAttribute('aria-checked', 'false');
        });
        s.classList.add('selected');
        s.setAttribute('aria-checked', 'true');

        const newSrc = s.dataset.finishSrc;
        if (!newSrc || !mainImage) return;

        // Derive finish label from the swatch chip class
        const chip = s.querySelector('.swatch-chip');
        const finishLabel = chip && chip.classList.contains('white') ? 'White Bronze' : 'Traditional';

        // Quick fade-swap on main image
        mainImage.style.opacity = '0';
        setTimeout(() => {
          mainImage.src = newSrc;
          mainImage.alt = mainImage.alt.replace(/Traditional Bronze finish|White Bronze finish/, finishLabel + (finishLabel === 'White Bronze' ? ' finish' : ' Bronze finish'));
          mainImage.style.opacity = '';
        }, 130);

        // Update label overlay
        if (mainLabel) {
          mainLabel.textContent = mainLabel.textContent.replace(/Traditional|White Bronze/, finishLabel);
        }

        // Sync the corresponding thumb to the active state
        thumbs.forEach(t => {
          if (t.dataset.src === newSrc) {
            thumbs.forEach(x => x.classList.remove('active'));
            t.classList.add('active');
          }
        });
      });
    });
  }



  // ────────────────────────────────────────────────────────
  // Shop faceted filtering, sorting and counts
  //
  // One predicate per checkbox id. Facet GROUPS are read from the DOM
  // (input.closest('.facet-group')), never a table here — so adding a facet is
  // one <li> plus one entry below, and nothing else.
  // ────────────────────────────────────────────────────────
  const FACET_DEFS = {
    'cat-insets': p => p.subcategory === 'insets',
    'cat-liners': p => p.subcategory === 'liners',
    'cat-knobs':  p => p.category === 'Knobs & Pulls',
    'cat-sale':   p => !!p.salePrice,
    'size-3':     p => p.size === '3×3',
    'size-2':     p => p.size === '2×2',
    'size-1':     p => p.size === '1×1',
    'size-5':     p => p.size === '5in',
    'pat-cab':    p => p.pattern === 'Cabochon',
    'pat-lot':    p => p.pattern === 'Lotus',
    'pat-mb':     p => p.pattern === 'Moon Blossom',
    'pat-sun':    p => p.pattern === 'Sun',
    'pat-grd':    p => p.pattern === 'Grid',
    'pat-pin':    p => p.pattern === 'Pinwheel',
  };

  // Sale items must sort by what the customer actually pays, or the four
  // discounted pieces sort by their struck-through number.
  const effectivePrice = p => (p.salePrice != null ? p.salePrice : p.price);

  const shopState = { sort: 'best' };

  function allFacetInputs() {
    return Array.from(document.querySelectorAll('.facet-group input[type="checkbox"]'));
  }

  function filteredProducts() {
    const all = window.FA_PRODUCTS || [];
    const checked = allFacetInputs().filter(i => i.checked && FACET_DEFS[i.id]);

    // OR within a group, AND across groups.
    const byGroup = new Map();
    checked.forEach(i => {
      const g = i.closest('.facet-group') || document.body;
      if (!byGroup.has(g)) byGroup.set(g, []);
      byGroup.get(g).push(FACET_DEFS[i.id]);
    });

    return all.filter(p => {
      for (const preds of byGroup.values()) {
        if (!preds.some(fn => fn(p))) return false;
      }
      return true;
    });
  }

  function sortProducts(list) {
    const out = list.slice();
    switch (shopState.sort) {
      // "Best match" with no search query is the merchandised catalog order.
      case 'popularity': return out.sort((a, b) => a.popularity - b.popularity);
      case 'newest':     return out.sort((a, b) => b.released - a.released);
      case 'price-asc':  return out.sort((a, b) => effectivePrice(a) - effectivePrice(b));
      case 'price-desc': return out.sort((a, b) => effectivePrice(b) - effectivePrice(a));
      default:           return out;
    }
  }

  // Counts are computed against the FULL catalog, not "given other active
  // filters" — dynamic counts jitter under the cursor and buy nothing at this
  // catalog size.
  function computeFacetCounts() {
    const all = window.FA_PRODUCTS || [];
    allFacetInputs().forEach(input => {
      const fn = FACET_DEFS[input.id];
      if (!fn) return;
      const n = all.filter(fn).length;
      const label = input.closest('label');
      const span = label && label.querySelector('.count');
      if (span) span.textContent = n;
      // A checkbox that guarantees an empty grid is a trap.
      if (label) label.classList.toggle('is-empty', n === 0);
    });
  }

  function updateResultCount(shown, total) {
    const el = document.querySelector('[data-result-count]');
    if (!el) return;
    el.innerHTML = shown === total
      ? `Showing all <strong>${total}</strong> pieces`
      : `Showing <strong>${shown}</strong> of ${total} pieces`;
  }

  // Single entry point: filter → sort → render → count → empty state → chips.
  function applyShop() {
    const grid = document.querySelector('[data-shop-grid]');
    if (!grid) return;
    const list = sortProducts(filteredProducts());
    const total = (window.FA_PRODUCTS || []).length;
    renderShopGrid(list);
    updateResultCount(list.length, total);
    const empty = document.querySelector('[data-shop-empty]');
    if (empty) empty.hidden = list.length !== 0;
  }

  // Still used by the empty state's "Clear all filters" recovery button.
  function clearAllFacets() {
    allFacetInputs().forEach(i => { i.checked = false; });
    applyShop();
  }

  function initFacets() {
    const grid = document.querySelector('[data-shop-grid]');
    if (!grid) return;

    computeFacetCounts();

    allFacetInputs().forEach(i => i.addEventListener('change', applyShop));

    const sort = document.getElementById('sort');
    if (sort) {
      shopState.sort = sort.value || 'best';   // honour a browser-restored value
      sort.addEventListener('change', () => {
        shopState.sort = sort.value;
        applyShop();
      });
    }

    const emptyClear = document.querySelector('[data-shop-clear]');
    if (emptyClear) emptyClear.addEventListener('click', clearAllFacets);

    initFilterBar();   // must run before the first render so the bar has counts

    applyShop();   // first render happens here, not via a standalone call
  }

  // ────────────────────────────────────────────────────────
  // Shop filter bar (≤1024px)
  //
  // The sidebar rail stacks to 844px below 1024px, pushing the first product
  // past the fold. Each facet group gets a button; opening one turns the rail
  // itself into a popover anchored under that button.
  //
  // The groups are never moved out of .shop-sidebar. Relocating them made
  // correctness depend on a matchMedia/resize event actually firing, and a
  // missed event left the page with no filters at all. Everything below is
  // driven by CSS state, so any width is correct as soon as it paints and
  // this function only handles opening, closing and badge counts.
  // ────────────────────────────────────────────────────────
  function initFilterBar() {
    const sidebar = document.querySelector('.shop-sidebar');
    const shopMain = document.querySelector('.shop-main');
    const toolbar = document.querySelector('.shop-toolbar');
    const groups = Array.from(document.querySelectorAll('.facet-group'));
    if (!sidebar || !shopMain || !toolbar || !groups.length) return;

    const bar = document.createElement('div');
    bar.className = 'fa-filterbar';
    shopMain.insertBefore(bar, toolbar);

    const entries = groups.map(group => {
      const heading = group.querySelector('h5');
      const label = heading ? heading.textContent.trim() : 'Filter';

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'fa-filter-btn';
      btn.setAttribute('aria-expanded', 'false');
      btn.innerHTML = label +
        ' <span class="fa-filter-count" hidden>0</span>' +
        '<span class="fa-filter-caret" aria-hidden="true">▾</span>';

      btn.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = group.classList.contains('is-open') && sidebar.hasAttribute('data-fa-open');
        closeAll();
        if (isOpen) return;
        open(btn, group);
      });

      bar.appendChild(btn);
      return { group, btn };
    });

    const clear = document.createElement('button');
    clear.type = 'button';
    clear.className = 'fa-filter-clear';
    clear.textContent = 'Clear all';
    clear.hidden = true;
    bar.appendChild(clear);

    // Anchor the panel under its button, measured at open time so it stays
    // right through rotation, zoom and font scaling without a resize handler.
    function open(btn, group) {
      const anchor = btn.getBoundingClientRect();
      // Measure against .shop-layout, the positioned ancestor the panel offsets
      // from. offsetParent is null while the panel is still display:none, which
      // silently zeroes the origin and drops the panel a layout-inset away.
      const layout = sidebar.closest('.shop-layout');
      const origin = layout ? layout.getBoundingClientRect() : { left: 0, top: 0 };
      const width = Math.min(262, window.innerWidth * 0.88);
      // Keep the panel on screen: nudge left if it would overflow the right edge.
      const left = Math.max(0, Math.min(anchor.left - origin.left,
                                        window.innerWidth - width - 12));

      sidebar.style.setProperty('--fa-pop-x', left + 'px');
      sidebar.style.setProperty('--fa-pop-y', (anchor.bottom - origin.top + 8) + 'px');
      sidebar.setAttribute('data-fa-open', '');
      group.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }

    function closeAll() {
      sidebar.removeAttribute('data-fa-open');
      entries.forEach(e => {
        e.group.classList.remove('is-open');
        e.btn.setAttribute('aria-expanded', 'false');
      });
    }

    function syncCounts() {
      let total = 0;
      entries.forEach(e => {
        const n = e.group.querySelectorAll('input[type="checkbox"]:checked').length;
        const badge = e.btn.querySelector('.fa-filter-count');
        badge.textContent = n;
        badge.hidden = n === 0;
        total += n;
      });
      clear.hidden = total === 0;
    }

    clear.addEventListener('click', () => {
      clearAllFacets();
      syncCounts();
      closeAll();
    });

    // Checkbox changes happen inside the sidebar, which is not a descendant of
    // the bar — listen on the document so both the rail and the panel report.
    document.addEventListener('change', e => {
      if (e.target.closest && e.target.closest('.facet-group')) syncCounts();
    });

    document.addEventListener('click', e => {
      if (!sidebar.contains(e.target)) closeAll();
    });
    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape' || !sidebar.hasAttribute('data-fa-open')) return;
      const open = entries.find(x => x.group.classList.contains('is-open'));
      closeAll();
      if (open) open.btn.focus();   // Esc returns focus to the button that opened it
    });

    // Tidiness only, never correctness: a panel left open while the viewport
    // crosses into desktop would reappear as an orphan on the way back. The
    // layout itself is CSS-driven and stays right whether or not this fires.
    window.addEventListener('resize', closeAll);
    window.addEventListener('orientationchange', closeAll);

    syncCounts();
  }

  // ────────────────────────────────────────────────────────
  // Shipping option / payment option selection (checkout)
  // ────────────────────────────────────────────────────────
  function initOptionRows() {
    document.querySelectorAll('.option-group').forEach(group => {
      const rows = group.querySelectorAll('.option-row');
      rows.forEach(row => {
        row.addEventListener('click', () => {
          rows.forEach(r => r.classList.remove('selected'));
          row.classList.add('selected');
          const input = row.querySelector('input[type="radio"]');
          // Setting .checked here pre-empts the label's native activation, so
          // the browser never fires `change` — which is what the checkout
          // totals listen on. Dispatch it ourselves. (Clicking the radio
          // directly still worked, which is what hid this.)
          if (input && !input.checked) {
            input.checked = true;
            input.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });
      });
      // initialize selected
      const checked = group.querySelector('input[type="radio"]:checked');
      if (checked) checked.closest('.option-row').classList.add('selected');
    });
  }

  // ────────────────────────────────────────────────────────
  // Ship-to-different toggle (checkout)
  // ────────────────────────────────────────────────────────
  function initShipToggle() {
    const toggle = document.querySelector('[data-ship-toggle]');
    const target = document.querySelector('[data-shipping-fields]');
    if (!toggle || !target) return;
    function sync() {
      target.style.display = toggle.checked ? '' : 'none';
    }
    toggle.addEventListener('change', sync);
    sync();
  }

  // ────────────────────────────────────────────────────────
  // Two-step checkout accordion
  //
  // Step 1 (Billing) is open first; Continue validates it and collapses it to
  // a one-line summary, then opens Step 2 (Shipping & payment). Because
  // validateCheckout() skips fields whose offsetParent is null, validating
  // while Step 2 is collapsed naturally checks only Step 1 — no scoping needed.
  // ────────────────────────────────────────────────────────
  function initCheckoutSteps() {
    const steps = Array.from(document.querySelectorAll('.checkout-step'));
    if (steps.length < 2) return;
    const form = document.querySelector('[data-checkout-form]');

    function open(n) {
      steps.forEach(step => {
        const isN = step.getAttribute('data-step') === String(n);
        step.classList.toggle('is-open', isN);
        // A step is "complete" once we've moved past it (its summary is filled).
        const done = !isN && step.querySelector('[data-step-summary]') &&
                     step.querySelector('[data-step-summary]').textContent.trim() !== '';
        step.classList.toggle('is-complete', !!done);
        step.classList.toggle('is-locked', !isN && !done);
        const head = step.querySelector('.step-head');
        if (head) head.setAttribute('aria-expanded', String(isN));
      });
    }

    function billingSummary() {
      const v = id => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
      const name = [v('bf'), v('bl')].filter(Boolean).join(' ');
      const where = [v('ba1'), v('bci'), [v('bst'), v('bz')].filter(Boolean).join(' ')]
        .filter(Boolean).join(', ');
      return [name, where].filter(Boolean).join(' · ');
    }

    const continueBtn = document.querySelector('[data-step-continue]');
    if (continueBtn) continueBtn.addEventListener('click', () => {
      // Step 2 is still collapsed here, so this validates Step 1 only.
      if (form && !validateCheckout(form)) return;
      const summary = document.querySelector('[data-step-summary]');
      if (summary) summary.textContent = billingSummary();
      open(2);
      const s2 = document.querySelector('.checkout-step[data-step="2"]');
      if (s2) s2.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });

    // A completed step head reopens that step for editing.
    steps.forEach(step => {
      const head = step.querySelector('.step-head');
      const n = step.getAttribute('data-step');
      if (head) head.addEventListener('click', () => {
        if (step.classList.contains('is-complete') || step.classList.contains('is-open')) open(n);
      });
    });

    open(1);
  }

  // ────────────────────────────────────────────────────────
  // Card-details reveal (checkout) — show the card fields only when
  // "Credit / debit card" is the selected payment method.
  // ────────────────────────────────────────────────────────
  function initCardFields() {
    const panel = document.querySelector('[data-card-fields]');
    if (!panel) return;
    const cardRadio = document.querySelector('input[name="payment"][value="card"]');
    function sync() { panel.style.display = (cardRadio && cardRadio.checked) ? '' : 'none'; }
    // The option rows flip radio.checked on click without firing `change`, so
    // sync on the click (after that handler) as well as on real change events.
    document.querySelectorAll('.payment-options .option-row').forEach(row =>
      row.addEventListener('click', () => Promise.resolve().then(sync)));
    document.querySelectorAll('input[name="payment"]').forEach(r => r.addEventListener('change', sync));
    sync();
  }

  // ────────────────────────────────────────────────────────
  // Track B: trade-pro toggle (checkout)
  // ────────────────────────────────────────────────────────
  function initTradeToggle() {
    const toggle = document.querySelector('[data-trade-toggle]');
    const fields = document.querySelector('[data-trade-fields]');
    const companyInput = document.querySelector('[data-trade-company]');
    const idInput = document.querySelector('[data-trade-id]');
    const discountLine = document.querySelector('[data-trade-discount]');
    if (!toggle) return;
    const filled = el => el && el.value.trim() !== '';
    function sync() {
      const on = toggle.checked;
      // Checking the box reveals the capture fields. Trade pricing unlocks on
      // the honor system once they self-identify — a company name OR a website/
      // trade ID is enough (SL 7-23: no verification gate). The discount is
      // never advertised up front; capturing company/website builds the segment.
      if (fields) fields.style.display = on ? '' : 'none';
      const unlocked = on && (filled(companyInput) || filled(idInput));
      if (discountLine) discountLine.style.display = unlocked ? '' : 'none';
    }
    toggle.addEventListener('change', sync);
    [companyInput, idInput].forEach(el => {
      if (!el) return;
      el.addEventListener('input', sync);
      el.addEventListener('blur', sync);
    });
    sync();
  }

  // ────────────────────────────────────────────────────────
  // Render helpers (shop grid + cross-sell)
  // ────────────────────────────────────────────────────────
  function productCardHTML(p) {
    const onSale = !!p.salePrice;
    const priceBlock = onSale
      ? `<div class="product-price"><span class="was">${window.FA_FMT.price(p.wasPrice)}</span><span class="sale">${window.FA_FMT.price(p.salePrice)}</span></div>`
      : `<div class="product-price">${window.FA_FMT.price(p.price)}</div>`;
    const badge = onSale ? `<span class="product-badge">Sale</span>` : '';
    // Most products live at /products/<slug>/main.jpg; hardware overrides it.
    const imgSrc = p.image || `/assets/images/products/${p.slug}/main.jpg`;
    const imgAlt = `${p.name} ${p.sizeLabel} ${p.pattern} accent tile`;
    return `
      <a href="/foundry-art/product/${p.slug}/" class="product-card">
        <div class="img-wrap">
          ${badge}
          <div class="wire-img" role="img" aria-label="${p.name} ${p.sizeLabel}">
            <span>${p.pattern} ${p.size}</span>
            <img src="${imgSrc}" alt="${imgAlt}" loading="lazy">
          </div>
        </div>
        <div class="product-name">${p.name}</div>
        <div class="product-meta">${p.sizeLabel} · ${p.finishes.length} color${p.finishes.length === 1 ? '' : 's'}</div>
        ${priceBlock}
        <span class="product-card-cta">Shop Now <span aria-hidden="true">&rarr;</span></span>
      </a>
    `;
  }

  // Takes an optional pre-filtered/sorted list; defaults to the whole catalog.
  // productCardHTML is deliberately untouched so renderCrossSell() and
  // renderShopSidebar() cannot regress.
  function renderShopGrid(list) {
    const grid = document.querySelector('[data-shop-grid]');
    if (!grid || !window.FA_PRODUCTS) return;
    const items = list || window.FA_PRODUCTS;
    grid.innerHTML = items.map(p => productCardHTML(p)).join('');
  }

  function renderCrossSell() {
    const wrap = document.querySelector('[data-cross-sell]');
    if (!wrap || !window.FA_PRODUCTS) return;
    const exclude = wrap.dataset.exclude || '';
    const picks = window.FA_PRODUCTS.filter(p => p.slug !== exclude).slice(0, 3);
    wrap.innerHTML = picks.map(p => productCardHTML(p)).join('');
  }

  function renderShopSidebar() {
    const sidebar = document.querySelector('[data-shop-categories]');
    if (!sidebar || !window.FA_CATEGORIES) return;
    sidebar.innerHTML = window.FA_CATEGORIES.map((c, i) =>
      `<li><a href="#" class="${i === 0 ? 'active' : ''}">${c.label} <span class="count">${c.count}</span></a></li>`
    ).join('');
  }

  // ────────────────────────────────────────────────────────
  // Bootstrap
  // ────────────────────────────────────────────────────────
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  /* Where-to-Buy: brand region tab switching.
     Each brand column has its own group of tabs (data-region values
     are prefixed bws- / fa-). Clicking a tab activates its panel and
     deactivates the panel that shares the same brand prefix. */
  function initWtbTabs() {
    const tabs = document.querySelectorAll('.lw2-wtb-tab[data-region]');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const region = tab.getAttribute('data-region');
        if (!region) return;
        const brandPrefix = region.split('-')[0]; // 'bws' or 'fa'

        // Deactivate sibling tabs in the same brand group
        document.querySelectorAll('.lw2-wtb-tab[data-region^="' + brandPrefix + '-"]').forEach(t => {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');

        // Swap panels in the same brand group
        document.querySelectorAll('.lw2-wtb-panel[data-region^="' + brandPrefix + '-"]').forEach(p => {
          p.classList.remove('is-active');
        });
        const panel = document.getElementById(region);
        if (panel) panel.classList.add('is-active');
      });
    });

    // Map mode toggle (Map / Satellite) — visual-only since map is stubbed
    document.querySelectorAll('.lw2-wtb-map-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.lw2-wtb-map-tab').forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
      });
    });
  }

  // Where-to-Buy map — Leaflet + CartoDB Positron tiles + custom diamond
  // markers. Loads showrooms.json (full directory), renders ~120 pins,
  // populates the region accordion below the map.
  function decodeEntities(s) {
    const t = document.createElement('textarea'); t.innerHTML = s; return t.value;
  }
  function initWtbMap() {
    const canvas = document.getElementById('wtb-leaflet-map');
    if (!canvas || typeof L === 'undefined') return;

    // Center on continental US, zoom out enough to see all CONUS pins.
    const map = L.map(canvas, {
      zoomControl: true,
      scrollWheelZoom: false,    // avoid hijacking page scroll
      worldCopyJump: false,
    }).setView([39.5, -98.5], 4);

    // CartoDB Voyager — full color (greens/blues/beige) matching the
    // live Google Maps Standard look.
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 18,
    }).addTo(map);

    // Custom diamond marker via L.divIcon.
    function diamondIcon() {
      return L.divIcon({
        className: 'lw2-wtb-diamond-wrap',
        html: '<div class="lw2-wtb-diamond"></div>',
        iconSize:   [14, 14],
        iconAnchor: [7, 7],
        popupAnchor:[0, -8],
      });
    }

    fetch('/assets/data/showrooms.json')
      .then(r => r.json())
      .then(showrooms => {
        showrooms.forEach(s => {
          const name = decodeEntities(s.name);
          const addr = decodeEntities(s.address || '');
          const phone = s.phone || '';
          const html =
            '<p class="lw2-wtb-popup-name">' + name + '</p>' +
            '<p class="lw2-wtb-popup-meta">' + (addr ? addr + '<br>' : '') + s.city + ', ' + s.state + (s.zip ? ' ' + s.zip : '') + '</p>' +
            (phone ? '<p class="lw2-wtb-popup-phone"><a href="tel:' + phone.replace(/\D/g,'') + '">' + phone + '</a></p>' : '');
          L.marker([s.lat, s.lng], { icon: diamondIcon(), title: name + ' — ' + s.city + ', ' + s.state })
            .addTo(map)
            .bindPopup(html, { closeButton: true });
        });
        // After pins render, fit to CONUS bounds (ignoring Vancouver outlier).
        map.fitBounds([[25.5, -124], [49, -67]], { padding: [20, 20] });
        initWtbAccordion(showrooms);
        wireSearch(map, showrooms);
      })
      .catch(() => {});
  }

  function wireSearch(map, showrooms) {
    const form = document.querySelector('.lw2-wtb-map-search');
    if (!form) return;
    form.addEventListener('submit', () => {
      const q = form.querySelector('input[name="zip"]').value.trim().toLowerCase();
      if (!q) return;
      // Try city match first
      let match = showrooms.find(s => s.city.toLowerCase() === q);
      // Then state abbreviation
      if (!match && q.length === 2) match = showrooms.find(s => s.state.toLowerCase() === q);
      // Then ZIP prefix match
      if (!match && /^\d{3,5}/.test(q)) {
        const prefix = q.slice(0, 3);
        match = showrooms.find(s => s.zip && s.zip.startsWith(prefix));
      }
      if (match) {
        map.setView([match.lat, match.lng], 8);
      }
    });
  }

  // Region accordion — populated from showrooms.json grouped by region → state.
  // Targets only the Bronzework column; FA accordions are static markup
  // wired up by initWtbStaticAccordions().
  function initWtbAccordion(showrooms) {
    const root = document.querySelector('[data-wtb-accordion="bws"]');
    initWtbStaticAccordions();
    if (!root) return;
    const REGION_ORDER = ['Central US', 'Eastern US', 'Western US', 'Canada'];
    const byRegion = {};
    showrooms.forEach(s => {
      const r = s.region || 'Other';
      if (!byRegion[r]) byRegion[r] = {};
      const st = s.state;
      if (!byRegion[r][st]) byRegion[r][st] = [];
      byRegion[r][st].push(s);
    });

    const STATE_NAME = {
      AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',CO:'Colorado',CT:'Connecticut',DE:'Delaware',DC:'Washington, DC',FL:'Florida',GA:'Georgia',HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',KS:'Kansas',KY:'Kentucky',LA:'Louisiana',ME:'Maine',MD:'Maryland',MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',MS:'Mississippi',MO:'Missouri',MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',NM:'New Mexico',NY:'New York',NC:'North Carolina',ND:'North Dakota',OH:'Ohio',OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',SC:'South Carolina',SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',VA:'Virginia',WA:'Washington',WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming',BC:'British Columbia',
    };

    const frag = document.createDocumentFragment();
    REGION_ORDER.forEach(region => {
      if (!byRegion[region]) return;
      const li = document.createElement('li');
      li.className = 'lw2-wtb-accordion-item';

      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'lw2-wtb-accordion-trigger';
      trigger.setAttribute('aria-expanded', 'false');
      trigger.innerHTML = '<span>' + region + '</span><span class="lw2-wtb-accordion-icon" aria-hidden="true">+</span>';
      trigger.addEventListener('click', () => {
        const open = li.classList.toggle('is-open');
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      li.appendChild(trigger);

      const panel = document.createElement('div');
      panel.className = 'lw2-wtb-accordion-panel';

      const states = Object.keys(byRegion[region]).sort((a, b) =>
        (STATE_NAME[a] || a).localeCompare(STATE_NAME[b] || b)
      );
      states.forEach(st => {
        const stateBlock = document.createElement('div');
        stateBlock.className = 'lw2-wtb-state';
        const h = document.createElement('h4');
        h.className = 'lw2-wtb-state-name';
        h.textContent = STATE_NAME[st] || st;
        stateBlock.appendChild(h);

        byRegion[region][st].forEach(s => {
          const p = document.createElement('p');
          p.className = 'lw2-wtb-listing';
          const name = decodeEntities(s.name);
          const addr = decodeEntities(s.address || '');
          p.innerHTML =
            '<span class="lw2-wtb-listing-name">' + name + '</span>' +
            (addr ? addr + '<br>' : '') +
            '<span class="lw2-wtb-listing-city">' + s.city + '</span>' +
            ' ' + s.state + (s.zip ? ' ' + s.zip : '') +
            (s.phone ? '<br><span class="lw2-wtb-listing-phone">' + s.phone + '</span>' : '');
          stateBlock.appendChild(p);
        });
        panel.appendChild(stateBlock);
      });

      li.appendChild(panel);
      frag.appendChild(li);
    });
    root.innerHTML = '';
    root.appendChild(frag);
  }

  // Wire click toggles for static accordion items (Foundry Art column).
  function initWtbStaticAccordions() {
    document.querySelectorAll('[data-wtb-accordion="fa"] .lw2-wtb-accordion-item').forEach(item => {
      const trigger = item.querySelector('.lw2-wtb-accordion-trigger');
      if (!trigger || trigger.dataset.wired) return;
      trigger.dataset.wired = '1';
      trigger.addEventListener('click', () => {
        const open = item.classList.toggle('is-open');
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  }

  // .lw2-media-carousel — reusable image-set component.
  // Single image: just shows the slide, no thumbs/arrows.
  // Multi: cross-fade between slides via thumb click, prev/next arrows, or keyboard.
  function initMediaCarousels() {
    document.querySelectorAll('.lw2-media-carousel').forEach(carousel => {
      const slides = carousel.querySelectorAll('.lw2-media-slide');
      const thumbs = carousel.querySelectorAll('.lw2-media-thumb');
      const prevBtn = carousel.querySelector('.lw2-media-prev');
      const nextBtn = carousel.querySelector('.lw2-media-next');
      const count = slides.length;
      carousel.dataset.slides = String(count);
      if (count <= 1) return;

      let active = 0;
      function setActive(i) {
        active = ((i % count) + count) % count;
        slides.forEach((s, idx) => s.setAttribute('data-active', idx === active ? 'true' : 'false'));
        thumbs.forEach((t, idx) => t.setAttribute('aria-selected', idx === active ? 'true' : 'false'));
      }
      setActive(0);

      thumbs.forEach((t, idx) => {
        t.addEventListener('click', () => setActive(idx));
      });
      if (prevBtn) prevBtn.addEventListener('click', () => setActive(active - 1));
      if (nextBtn) nextBtn.addEventListener('click', () => setActive(active + 1));

      // Keyboard arrows when the carousel (or anything inside it) is focused
      carousel.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft')  { e.preventDefault(); setActive(active - 1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); setActive(active + 1); }
      });
    });
  }

  ready(() => {
    // Resolve session state (and any ?signin=/?signout= flag) before the nav
    // paints, so the header never flashes the wrong state.
    initAccountGate();
    initLayout();
    updateNavCount();
    // Cart.write() has always dispatched fa-cart-change, but nothing listened —
    // the badge only refreshed from the four places that called updateNavCount
    // by hand, so any other write left it stale. Subscribing once covers every
    // path, present and future; the call above still does the first paint.
    document.addEventListener('fa-cart-change', updateNavCount);
    initDrawer();
    initNavAutoHide();
    initStudiosDrawer();
    initMenuVariants();
    initFilterTabs();
    renderCartRows();      // build cart line items from the store BEFORE steppers bind
    initQtySteppers();
    initCart();
    initAddToCart();
    initSampleOrder();
    initCheckout();
    initCheckoutValidation();
    initOrderReceived();
    initTabs();
    initGallery();
    initGalleryCarousel();
    initSwatches();
    initFacets();
    initOptionRows();
    initShipToggle();
    initCardFields();
    initCheckoutSteps();
    initTradeToggle();
    initWtbTabs();
    initMediaCarousels();
    initWtbMap();
    initTaglineVariants();
    initCraftMarkerVariants();
    initHardwareGallery();
    initIntroAnimations();
    initInsituAutoscroll();
    initInsituScrollIndicator();
    initFaqAccordion();
    initPatinaScrub();
    initAlloySwitch();
    initPatinaAutoplay();
    // No standalone renderShopGrid() — initFacets() performs the first render
    // via applyShop(). Calling it here too would double-render, and the second
    // pass would ignore the active filters.
    renderCrossSell();
    renderShopSidebar();

    // Account. initCheckoutAccount() must come after initCheckout() and
    // initTradeToggle() above — all three touch the same trade fields.
    initAccountNav();
    initSignIn();
    renderAccountDashboard();
    renderAccountOrders();
    renderAccountOrderDetail();
    initAccountDetails();
    renderAccountAddresses();
    initCheckoutAccount();
    initViewOrderLink();
    initPrintReceipt();
  });

  // FA hero tagline A/B toggle for client review:
  // /foundry-art/?tagline=<key> swaps the .hero-headline copy on load.
  // Keys map to copy variants Stacia listed; "current" leaves the markup.
  // Custom always-visible scroll indicator for the FA inspiration
  // strip. macOS auto-hides native scrollbars based on system pref;
  // this overlays a bronze thumb-and-track below the grid that's
  // always present and mirrors scroll progress.
  function initInsituScrollIndicator() {
    const grid = document.querySelector('.insitu-grid');
    const indicator = document.querySelector('[data-insitu-indicator]');
    if (!grid || !indicator) return;
    const thumb = indicator.querySelector('.insitu-scroll-thumb');
    const update = () => {
      const sw = grid.scrollWidth;
      const cw = grid.clientWidth;
      const scrollMax = sw - cw;
      if (scrollMax <= 0) { indicator.style.display = 'none'; return; }
      indicator.style.display = '';
      const visibleRatio = cw / sw;
      const scrollRatio = grid.scrollLeft / scrollMax;
      thumb.style.width = (visibleRatio * 100) + '%';
      thumb.style.left = (scrollRatio * (1 - visibleRatio) * 100) + '%';
    };
    grid.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    // Image loads can shift scrollWidth — re-measure after images decode.
    grid.querySelectorAll('img').forEach(img => {
      if (img.complete) return;
      img.addEventListener('load', update, { once: true });
    });
    update();
  }


  // FA hardware section gallery — hover/focus a thumbnail to swap the
  // large image at left; clicking takes the user to that product's PDP.
  // Thumbnail's large-image source comes from data-large; alt text from
  // data-large-alt. Items without data-large leave the large image as-is
  // on hover (e.g. Wall Hook, which has no photography yet).
  // FA homepage intro motion (FORGE vocabulary, locked in default).
  // Runs on body[data-page="home"] only. Reduced-motion users skip
  // automatically because the CSS itself opts out.
  function initIntroAnimations() {
    if (document.body.dataset.page !== 'home') return;

    // Scroll-reveal observer for major sections
    const targets = document.querySelectorAll(
      '.brand-band, .craft-content, .craft-images, .products-header, .design-ideas-header, .insitu-grid > .insitu-tile, .hardware-content, .guidance-grid > *'
    );
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-revealed');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(t => io.observe(t));

  }


  // FAQ accordion — click to toggle, multiple can be open simultaneously.
  // Uses grid-template-rows 0fr → 1fr for smooth height animation without
  // needing to measure element height in JS.
  function initFaqAccordion() {
    document.querySelectorAll('.fa-faq-item').forEach(item => {
      const trigger = item.querySelector('.fa-faq-trigger');
      if (!trigger) return;
      trigger.addEventListener('click', () => {
        const open = item.classList.toggle('is-open');
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  }

  // Patina scrub autoplay (care page) — the slider drifts through the
  // timeline on its own once the section is in view, reversing at the ends
  // with a short hold, so the component advertises its interactivity.
  // Stops for good on any real interaction and skips under
  // prefers-reduced-motion. Deliberately no hover-pause: the unit spans
  // most of the viewport, so a resting cursor would hide the motion.
  function initPatinaAutoplay() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const units = Array.from(document.querySelectorAll('[data-scrub]'));
    if (!units.length) return;

    const DURATION = 11000;   // ms for a full New -> buffed sweep
    const HOLD = 1600;        // pause at each end of the timeline
    let stopped = false;      // a real interaction ends autoplay permanently
    let dir = 1, raf = null, lastT = 0, holdUntil = 0;
    // Track position in a float: the range input's step="1" quantizes its
    // value, so reading it back each frame would round away the sub-unit
    // per-frame increments and the drift would never accumulate.
    let pos = 0;

    function activeRange() {
      const unit = units.find(u => !u.hidden);
      return unit ? unit.querySelector('.fa-scrub-range') : null;
    }
    function frame(t) {
      raf = requestAnimationFrame(frame);
      if (!lastT) { lastT = t; return; }
      const dt = Math.min(t - lastT, 100); lastT = t;
      if (t < holdUntil) return;
      const range = activeRange();
      if (!range) return;
      pos += dir * (200 / DURATION) * dt;
      if (pos >= 200) { pos = 200; dir = -1; holdUntil = t + HOLD; }
      else if (pos <= 0) { pos = 0; dir = 1; holdUntil = t + HOLD; }
      range.value = pos;
      range.dispatchEvent(new Event('input'));
    }
    function start() {
      if (raf || stopped) return;
      const r = activeRange();
      pos = r ? Number(r.value) : 0;
      lastT = 0;
      raf = requestAnimationFrame(frame);
    }
    function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }
    function kill() { stopped = true; stop(); }

    // Hand control to the user the moment they engage the component.
    units.forEach(u => {
      const range = u.querySelector('.fa-scrub-range');
      ['pointerdown', 'keydown', 'touchstart'].forEach(ev => range.addEventListener(ev, kill, { passive: true }));
      u.querySelectorAll('.fa-scrub-labels button, [data-alloy-switch] button')
        .forEach(b => b.addEventListener('click', kill));
    });

    const target = document.querySelector('.fa-alloy--patina') || units[0];
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) start(); else stop(); });
    }, { threshold: 0.2 });
    io.observe(target);
  }

  // Alloy switch (care page) — segmented control that swaps which alloy's
  // scrub panel is shown. The control is duplicated inside each panel (so it
  // can sit above the scrubber), so state is written to every switch button
  // in the section, not just the one that was clicked. Each panel keeps its
  // own slider state, so toggling back returns to where the user left it.
  function initAlloySwitch() {
    document.querySelectorAll('.fa-alloy').forEach(scope => {
      const btns = scope.querySelectorAll('[data-alloy-switch] button[data-alloy]');
      if (!btns.length) return;
      btns.forEach(b => b.addEventListener('click', () => {
        const key = b.dataset.alloy;
        btns.forEach(x => {
          const on = x.dataset.alloy === key;
          x.classList.toggle('active', on);
          x.setAttribute('aria-pressed', String(on));
        });
        scope.querySelectorAll('[data-alloy-panel]').forEach(p => { p.hidden = p.dataset.alloyPanel !== key; });
        scope.querySelectorAll('[data-alloy-note]').forEach(n => { n.hidden = n.dataset.alloyNote !== key; });
      }));
    });
  }

  // Patina age scrub (care page) — one photo per alloy, slider crossfades
  // New → aged → buffed. Range 0–200: 0–100 fades the aged layer in over the
  // new tile, 100–200 fades the buffed layer over that. Stage labels animate
  // the slider to their position so the ageing always reads as motion.
  function initPatinaScrub() {
    document.querySelectorAll('[data-scrub]').forEach(unit => {
      const range = unit.querySelector('.fa-scrub-range');
      const mid = unit.querySelector('[data-scrub-mid]');
      const end = unit.querySelector('[data-scrub-end]');
      if (!range || !mid || !end) return;
      const labels = unit.querySelectorAll('.fa-scrub-labels button');
      const caps = unit.querySelectorAll('.fa-scrub-cap');

      function render(v) {
        mid.style.opacity = Math.min(v / 100, 1);
        end.style.opacity = Math.max((v - 100) / 100, 0);
        const stage = v < 50 ? 0 : v < 150 ? 1 : 2;
        labels.forEach((b, i) => b.classList.toggle('active', i === stage));
        caps.forEach((c, i) => c.classList.toggle('active', i === stage));
      }
      range.addEventListener('input', () => render(+range.value));

      labels.forEach(b => b.addEventListener('click', () => {
        const target = +b.dataset.jump;
        const start = +range.value;
        const t0 = performance.now();
        (function step(t) {
          const p = Math.min((t - t0) / 450, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          range.value = start + (target - start) * eased;
          render(+range.value);
          if (p < 1) requestAnimationFrame(step);
        })(t0);
      }));
    });
  }

  // Inspiration carousel autoscroll — slow drift, pauses on hover
  // or user interaction, reverses at the edges. Starts only after
  // the section enters viewport so initial reveal animations finish
  // before motion begins.
  function initInsituAutoscroll() {
    const grid = document.querySelector('.insitu-grid');
    if (!grid) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const SPEED = 1.5;       // px per frame at 60fps ≈ 90px/s
    const PAUSE_AFTER_INTERACT_MS = 2500;
    let dir = 1;
    let paused = true;       // start paused until section enters viewport
    let interactionTimer = null;
    let started = false;

    const interactPause = () => {
      paused = true;
      clearTimeout(interactionTimer);
      interactionTimer = setTimeout(() => { paused = false; }, PAUSE_AFTER_INTERACT_MS);
    };
    grid.addEventListener('mouseenter', () => { paused = true; });
    grid.addEventListener('mouseleave', () => {
      if (!interactionTimer) paused = false;
    });
    ['wheel', 'touchstart', 'pointerdown'].forEach(ev =>
      grid.addEventListener(ev, interactPause, { passive: true })
    );

    function tick() {
      if (!paused) {
        grid.scrollLeft += SPEED * dir;
        const max = grid.scrollWidth - grid.clientWidth;
        if (grid.scrollLeft >= max - 1) dir = -1;
        else if (grid.scrollLeft <= 1) dir = 1;
      }
      requestAnimationFrame(tick);
    }

    const section = document.querySelector('.design-ideas');
    if (!section) return;
    const startObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !started) {
          started = true;
          // Wait for tile reveal cascade to finish (~1s) before drifting
          setTimeout(() => { paused = false; }, 500);
          tick();
          startObs.disconnect();
        }
      });
    }, { threshold: 0.2 });
    startObs.observe(section);
  }

  // Hero video needs no JS loop masking: carving-wax-loop-v3.mp4 has its tail
  // crossfaded over its head, so the last frame already matches the first
  // (seam MSE 2868 -> 31). The previous build dipped the video to opacity 0
  // against the black backdrop, which read as a flash to black — SL 7-22-26.

  function initHardwareGallery() {
    const grid = document.querySelector('[data-hardware-grid]');
    if (!grid) return;
    const largeImg = document.querySelector('[data-hardware-large] > img');
    if (!largeImg) return;
    // Preload alt large views so the first hover swap is instant
    // (without this, the first hover would show the old image while
    // the new file is fetched).
    grid.querySelectorAll('.hardware-item[data-large]').forEach(item => {
      const pre = new Image();
      pre.src = item.dataset.large;
    });
    grid.querySelectorAll('.hardware-item').forEach(item => {
      const src = item.dataset.large;
      if (!src) return;
      const alt = item.dataset.largeAlt || '';
      const swap = () => {
        if (largeImg.src.endsWith(src)) return;
        largeImg.src = src;
        if (alt) largeImg.alt = alt;
        // Re-trigger the swap-in animation by removing the class,
        // forcing reflow, then re-adding. CSS handles the fade.
        largeImg.classList.remove('is-swapping');
        void largeImg.offsetWidth;
        largeImg.classList.add('is-swapping');
      };
      item.addEventListener('mouseenter', swap);
      item.addEventListener('focus', swap);
    });
  }

  // FA craft bullet-marker variants for client review:
  //   /foundry-art/?marker=dot       — filled bronze circle
  //   /foundry-art/?marker=ring      — hollow bronze circle
  //   /foundry-art/?marker=rule      — short bronze hairline rule
  //   /foundry-art/?marker=numeral   — italic Cormorant 1/2/3 in bronze
  // Default (no query) is the existing rotated bronze diamond.
  function initCraftMarkerVariants() {
    const craft = document.querySelector('[data-craft]');
    if (!craft) return;
    const params = new URLSearchParams(window.location.search);
    const variant = (params.get('marker') || '').toLowerCase();
    const variants = ['dot', 'ring', 'rule', 'numeral'];
    if (variants.includes(variant)) craft.classList.add('craft--marker-' + variant);
  }

  function initTaglineVariants() {
    const el = document.querySelector('.hero-headline[data-tagline]');
    if (!el) return;
    const params = new URLSearchParams(window.location.search);
    const key = (params.get('tagline') || '').toLowerCase();
    const variants = {
      'elegance-unsurpassed':  'Small details.<br>Unsurpassed elegance.',
      'elegance-unmistakable': 'Small details.<br>Unmistakable elegance.',
      'elegance-understated':  'Small details.<br>Understated elegance.',
      'artistry-unmatched':    'Small details.<br>Unmatched artistry.',
      'impact-unmistakable':   'Small details.<br>Unmistakable impact.',
    };
    if (variants[key]) el.innerHTML = variants[key];
  }
})();
