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

    const dotGrid = `
              <button class="studios-toggle" aria-label="Open Linden Workshops studios" aria-controls="studios-drawer" aria-expanded="false">
                <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
          <rect x="2" y="6" width="16" height="1.6" rx="0.4"/>
          <rect x="2" y="12.4" width="16" height="1.6" rx="0.4"/>
        </svg>
              </button>`;

    // Per-section nav variants
    let navInner = '';
    let mobileDrawer = '';

    if (section === 'foundry-art') {
      const link = (href, label, key) => `<a href="${href}" data-nav-key="${key}">${label}</a>`;
      navInner = `
          <div class="nav-left">${dotGrid}
            <a href="/foundry-art/" class="nav-logo">Foundry Art</a>
          </div>
          <div class="nav-links">
            ${link('/foundry-art/shop/', 'Tiles', 'shop')}
            ${link('/foundry-art/#design-ideas', 'Design Ideas', 'design')}
            ${link('/foundry-art/#story', 'Our Story', 'story')}
            ${link('/foundry-art/#guidance', 'How to Buy', 'guide')}
          </div>
          <button class="nav-hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-drawer">
            <span></span><span></span><span></span>
          </button>
          <div class="nav-right">
            <a href="/foundry-art/cart/" class="nav-cart" aria-label="Cart">Cart<span class="nav-cart-count" data-cart-count>2</span></a>
            <a href="/foundry-art/shop/" class="nav-cta">Shop Now</a>
          </div>`;
      mobileDrawer = `
        <a href="/foundry-art/shop/" data-drawer-link>Tiles</a>
        <a href="/foundry-art/#design-ideas" data-drawer-link>Design Ideas</a>
        <a href="/foundry-art/#story" data-drawer-link>Our Story</a>
        <a href="/foundry-art/#guidance" data-drawer-link>How to Buy</a>
        <a href="/foundry-art/cart/" data-drawer-link>Cart</a>
        <a href="/foundry-art/shop/" class="mobile-cta" data-drawer-link>Shop Now</a>`;
    } else if (section === 'linden') {
      navInner = `
          <div class="nav-left">${dotGrid}
            <a href="/" class="nav-logo">Linden Workshops</a>
          </div>
          <div class="nav-links">
            <a href="/#bronzework-studio">Studios</a>
            <a href="#">Inspiration</a>
            <a href="#">Our Team</a>
            <a href="#">Where to Buy</a>
          </div>
          <button class="nav-hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-drawer">
            <span></span><span></span><span></span>
          </button>
          <div class="nav-right">
            <a href="#" class="nav-cart" aria-label="Showroom Login">Showroom</a>
            <a href="#" class="nav-cta">Contact</a>
          </div>`;
      mobileDrawer = `
        <a href="/#bronzework-studio" data-drawer-link>Studios</a>
        <a href="#" data-drawer-link>Inspiration</a>
        <a href="#" data-drawer-link>Our Team</a>
        <a href="#" data-drawer-link>Where to Buy</a>
        <a href="#" data-drawer-link>Showroom Login</a>
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
            <a href="#">Inspiration</a>
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
        <a href="#" data-drawer-link>Inspiration</a>
        <a href="#showrooms" class="mobile-cta" data-drawer-link>Find a Showroom</a>`;
    } else if (section === 'talisman') {
      navInner = `
          <div class="nav-left">${dotGrid}
            <a href="/talisman/" class="nav-logo">Talisman</a>
          </div>
          <div class="nav-links">
            <a href="/talisman/#patterns">Patterns</a>
            <a href="#">Inspiration</a>
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
        <a href="#" data-drawer-link>Inspiration</a>
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

      <div class="studios-scrim" data-studios-scrim></div>
      <aside class="studios-drawer" id="studios-drawer" aria-label="Linden Workshops studios" aria-hidden="true">
        <button class="studios-close" aria-label="Close studios menu" data-studios-close>×</button>
        <a href="/" class="studios-eyebrow" data-studios-link aria-label="Linden Workshops home">
          <img src="/assets/images/linden/wordmarks/linden-workshops.png" alt="Linden Workshops" class="studios-eyebrow-mark">
        </a>

        <div class="studios-acc${expanded('bronzework-studio')}${active('bronzework-studio')}" data-studios-acc>
          <button class="studios-acc-head" data-studios-acc-toggle aria-expanded="${ariaExpanded('bronzework-studio')}">
            <span class="studios-acc-name">Bronzework Studio</span>
            <span class="studios-acc-chevron" aria-hidden="true">▾</span>
          </button>
          <div class="studios-acc-body">
            <a href="/bronzework-studio/" data-studios-link><strong>Studio overview</strong></a>
            <a href="/classic/" data-studios-link>Classic <small>Hand-Carved Bronze &amp; Zinc</small></a>
            <a href="/autograph/" data-studios-link>Autograph <small>Graphic Bronze Borders &amp; Insets</small></a>
            <a href="/precision/" data-studios-link>Precision <small>Extra Long Metal Liners &amp; Trim</small></a>
          </div>
        </div>

        <div class="studios-acc${expanded('foundry-art')}${active('foundry-art')}" data-studios-acc>
          <button class="studios-acc-head" data-studios-acc-toggle aria-expanded="${ariaExpanded('foundry-art')}">
            <span class="studios-acc-name">Foundry Art</span>
            <span class="studios-acc-chevron" aria-hidden="true">▾</span>
          </button>
          <div class="studios-acc-body">
            <a href="/foundry-art/" data-studios-link><strong>Studio overview</strong></a>
            <a href="/foundry-art/shop/" data-studios-link>Bronze Inset Tiles &amp; Liners <small>Shop the collection</small></a>
            <a href="/foundry-art/shop/" data-studios-link>Cabinet Hardware <small>Knobs &amp; Pulls</small></a>
          </div>
        </div>

        <div class="studios-acc${expanded('talisman')}${active('talisman')}" data-studios-acc>
          <button class="studios-acc-head" data-studios-acc-toggle aria-expanded="${ariaExpanded('talisman')}">
            <span class="studios-acc-name">Talisman</span>
            <span class="studios-acc-chevron" aria-hidden="true">▾</span>
          </button>
          <div class="studios-acc-body">
            <a href="/talisman/" data-studios-link><strong>Studio overview</strong></a>
            <a href="/talisman/" data-studios-link>White Ceramic Tiles &amp; Borders <small>Legacy reorders</small></a>
          </div>
        </div>
      </aside>
    `;
  }

  function footerHTML() {
    return `
      <footer class="footer">
        <p>© 2026 Linden Workshops · Luxury designer metal accent tile since 1990</p>
        <p><a href="tel:7737842628">773 784-2628</a> &nbsp;·&nbsp; <a href="#">Instagram</a> &nbsp;·&nbsp; <a href="#">Houzz</a></p>
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
  // Linden Workshops studios drawer (left side)
  // ────────────────────────────────────────────────────────
  function initStudiosDrawer() {
    // There may be MORE THAN ONE .studios-toggle in the DOM — one in the
    // navHTML-injected header (used by Foundry Art pages) and one in the
    // .lw2-header (used by LW / sub-brand pages). Wire all of them.
    const toggles = document.querySelectorAll('.studios-toggle');
    const drawer = document.getElementById('studios-drawer');
    const scrim = document.querySelector('[data-studios-scrim]');
    const closeBtn = document.querySelector('[data-studios-close]');
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
    if (closeBtn) closeBtn.addEventListener('click', () => setOpen(false));
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
  // Coverage calculator (Track B PDP)
  // ────────────────────────────────────────────────────────
  function initCoverageCalc() {
    const calc = document.querySelector('.coverage-calc');
    if (!calc) return;
    const sqftInput = calc.querySelector('[data-sqft]');
    const densityInput = calc.querySelector('[data-density]');
    const tileCountOut = calc.querySelector('[data-tile-count]');
    const costOut = calc.querySelector('[data-cost]');
    const price = parseFloat(calc.dataset.price || '0');

    function recompute() {
      const sqft = parseFloat(sqftInput.value) || 0;
      const density = parseFloat(densityInput.value) || 1;
      const count = Math.ceil(sqft * density);
      tileCountOut.textContent = count.toString();
      costOut.textContent = '$' + (count * price).toFixed(2).replace(/\.00$/, '');
    }
    sqftInput.addEventListener('input', recompute);
    densityInput.addEventListener('change', recompute);
    recompute();
  }

  // ────────────────────────────────────────────────────────
  // Track B in-room visualizer (tab → swap photo)
  // ────────────────────────────────────────────────────────
  function initVisualizer() {
    const slot = document.querySelector('[data-visualizer]');
    if (!slot) return;
    const img = slot.querySelector('.visualizer-image img');
    const buttons = slot.querySelectorAll('.visualizer-tabs button[data-vis]');
    if (!img || !buttons.length) return;

    const SCENES = {
      bath:      { src: '/assets/images/lifestyle/bath-cabochon-glass-mosaic.jpg', label: 'in a bath' },
      kitchen:   { src: '/assets/images/lifestyle/kitchen-moon-blossom-beige.jpg', label: 'in a kitchen' },
      fireplace: { src: '/assets/images/lifestyle/fireplace-sun-travertine.jpg',   label: 'in a fireplace surround' },
    };

    buttons.forEach(b => {
      b.addEventListener('click', () => {
        const key = b.dataset.vis;
        const scene = SCENES[key];
        if (!scene) return;
        buttons.forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        img.style.opacity = '0';
        setTimeout(() => {
          img.src = scene.src;
          img.alt = `See the tile ${scene.label}`;
          img.style.opacity = '';
        }, 140);
      });
    });
  }

  // ────────────────────────────────────────────────────────
  // Track B faceted filters (visual toggle)
  // ────────────────────────────────────────────────────────
  function initFacets() {
    const facetInputs = document.querySelectorAll('.facet-list input[type="checkbox"]');
    if (!facetInputs.length) return;

    const chipBar = document.querySelector('.active-filter-chips');
    function refreshChips() {
      if (!chipBar) return;
      const active = Array.from(facetInputs).filter(i => i.checked);
      chipBar.innerHTML = active.map(i =>
        `<span class="active-chip" data-target="${i.id}">${i.dataset.label || i.value} <span class="x">×</span></span>`
      ).join('') + (active.length ? `<span class="clear-filters" data-clear>Clear all</span>` : '');

      chipBar.querySelectorAll('.active-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const target = document.getElementById(chip.dataset.target);
          if (target) {
            target.checked = false;
            target.dispatchEvent(new Event('change'));
          }
        });
      });
      const clear = chipBar.querySelector('[data-clear]');
      if (clear) clear.addEventListener('click', () => {
        facetInputs.forEach(i => { i.checked = false; });
        refreshChips();
      });
    }
    facetInputs.forEach(i => i.addEventListener('change', refreshChips));
    refreshChips();

    // Swatch facets behave like checkboxes
    document.querySelectorAll('.facet-swatch').forEach(s => {
      s.addEventListener('click', () => {
        s.classList.toggle('selected');
        const hidden = s.querySelector('input');
        if (hidden) {
          hidden.checked = s.classList.contains('selected');
          hidden.dispatchEvent(new Event('change'));
        }
      });
    });
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
          if (input) input.checked = true;
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
  // Track B: trade-pro toggle (checkout)
  // ────────────────────────────────────────────────────────
  function initTradeToggle() {
    const toggle = document.querySelector('[data-trade-toggle]');
    const idInput = document.querySelector('[data-trade-id]');
    const discountLine = document.querySelector('[data-trade-discount]');
    if (!toggle) return;
    function sync() {
      const on = toggle.checked;
      if (idInput) idInput.style.display = on ? '' : 'none';
      if (discountLine) discountLine.style.display = on ? '' : 'none';
    }
    toggle.addEventListener('change', sync);
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
    const imgSrc = `/assets/images/products/${p.slug}/main.jpg`;
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
        <div class="product-meta">${p.sizeLabel} · ${p.finishes.length} finish${p.finishes.length === 1 ? '' : 'es'}</div>
        ${priceBlock}
      </a>
    `;
  }

  function renderShopGrid() {
    const grid = document.querySelector('[data-shop-grid]');
    if (!grid || !window.FA_PRODUCTS) return;
    grid.innerHTML = window.FA_PRODUCTS.map(p => productCardHTML(p)).join('');
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

  ready(() => {
    initLayout();
    initDrawer();
    initStudiosDrawer();
    initFilterTabs();
    initQtySteppers();
    initTabs();
    initGallery();
    initSwatches();
    initCoverageCalc();
    initVisualizer();
    initFacets();
    initOptionRows();
    initShipToggle();
    initTradeToggle();
    initWtbTabs();
    renderShopGrid();
    renderCrossSell();
    renderShopSidebar();
  });
})();
