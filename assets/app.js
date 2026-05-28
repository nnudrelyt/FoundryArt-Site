// ══════════════════════════════════════════════════════════
// FOUNDRY ART — shared front-end behavior
// ──────────────────────────────────────────────────────────

(function () {
  'use strict';

  // ────────────────────────────────────────────────────────
  // Nav + Mobile drawer + Footer (injected into mount points)
  // ────────────────────────────────────────────────────────
  function navHTML() {
    const link = (href, label, key) => `<a href="${href}" data-nav-key="${key}">${label}</a>`;
    return `
      <header>
        <nav class="nav" aria-label="Primary">
          <div class="nav-left">
            <button class="studios-toggle" aria-label="Open Linden Workshops studios" aria-controls="studios-drawer" aria-expanded="false">
              <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
                <circle cx="3"  cy="3"  r="1.4"/>
                <circle cx="10" cy="3"  r="1.4"/>
                <circle cx="17" cy="3"  r="1.4"/>
                <circle cx="3"  cy="10" r="1.4"/>
                <circle cx="10" cy="10" r="1.4"/>
                <circle cx="17" cy="10" r="1.4"/>
                <circle cx="3"  cy="17" r="1.4"/>
                <circle cx="10" cy="17" r="1.4"/>
                <circle cx="17" cy="17" r="1.4"/>
              </svg>
            </button>
            <a href="/" class="nav-logo">Foundry Art</a>
          </div>
          <div class="nav-links">
            ${link('/shop/', 'Tiles', 'shop')}
            ${link('/#design-ideas', 'Design Ideas', 'design')}
            ${link('/#story', 'Our Story', 'story')}
            ${link('/#guidance', 'How to Buy', 'guide')}
          </div>
          <button class="nav-hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-drawer">
            <span></span><span></span><span></span>
          </button>
          <div class="nav-right">
            <a href="/cart/" class="nav-cart" aria-label="Cart">
              Cart<span class="nav-cart-count" data-cart-count>2</span>
            </a>
            <a href="/shop/" class="nav-cta">Shop Now</a>
          </div>
        </nav>
      </header>

      <div class="drawer-scrim" data-drawer-scrim></div>
      <aside class="mobile-drawer" id="mobile-drawer" aria-label="Mobile menu" aria-hidden="true">
        <a href="/shop/" data-drawer-link>Tiles</a>
        <a href="/#design-ideas" data-drawer-link>Design Ideas</a>
        <a href="/#story" data-drawer-link>Our Story</a>
        <a href="/#guidance" data-drawer-link>How to Buy</a>
        <a href="/cart/" data-drawer-link>Cart</a>
        <a href="/shop/" class="mobile-cta" data-drawer-link>Shop Now</a>
      </aside>

      <div class="studios-scrim" data-studios-scrim></div>
      <aside class="studios-drawer" id="studios-drawer" aria-label="Linden Workshops studios" aria-hidden="true">
        <div class="studios-header">
          <a href="https://lindenworkshops.com/" target="_blank" rel="noopener" class="studios-parent" data-studios-link>Linden Workshops</a>
          <button class="studios-close" aria-label="Close studios menu" data-studios-close>×</button>
        </div>
        <p class="studios-eyebrow">Studios</p>
        <a href="/" class="active" aria-current="page" data-studios-link>Foundry Art</a>
        <a href="https://lindenworkshops.com/bronzeworks-studio/" target="_blank" rel="noopener" data-studios-link>Bronzeworks Studio</a>
        <a href="https://lindenworkshops.com/talisman/" target="_blank" rel="noopener" data-studios-link>Talisman</a>
        <a href="https://lindenworkshops.com/" target="_blank" rel="noopener" class="studios-parent-link" data-studios-link>Visit Linden Workshops →</a>
      </aside>
    `;
  }

  function footerHTML() {
    return `
      <footer class="footer">
        <p>© 2026 Linden Workshops · Foundry Art is a Linden Workshops brand</p>
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
    const toggle = document.querySelector('.studios-toggle');
    const drawer = document.getElementById('studios-drawer');
    const scrim = document.querySelector('[data-studios-scrim]');
    const closeBtn = document.querySelector('[data-studios-close]');
    if (!toggle || !drawer || !scrim) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      drawer.setAttribute('aria-hidden', String(!open));
      drawer.classList.toggle('open', open);
      scrim.classList.toggle('open', open);
      document.body.classList.toggle('drawer-open', open);
    }
    toggle.addEventListener('click', () => {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
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
      <a href="/product/${p.slug}/" class="product-card">
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
    renderShopGrid();
    renderCrossSell();
    renderShopSidebar();
  });
})();
