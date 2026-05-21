// ══════════════════════════════════════════════════════════
// FOUNDRY ART — shared front-end behavior
// ──────────────────────────────────────────────────────────

(function () {
  'use strict';

  // ────────────────────────────────────────────────────────
  // Track detection (Standard vs Plus)
  // ────────────────────────────────────────────────────────
  const path = window.location.pathname;
  const isAlt = path.startsWith('/alt/') || path === '/alt' || path === '/alt/index.html';
  const altPrefix = isAlt ? '/alt' : '';

  // Map current path to its sibling track URL
  function siblingTrack() {
    let p = path;
    if (p.endsWith('index.html')) p = p.slice(0, -'index.html'.length);
    if (isAlt) {
      // strip /alt
      let rest = p.replace(/^\/alt/, '');
      if (rest === '') rest = '/';
      return rest;
    } else {
      if (p === '/') return '/alt/';
      return '/alt' + p;
    }
  }

  // ────────────────────────────────────────────────────────
  // Nav + Mobile drawer + Footer (injected into mount points)
  // ────────────────────────────────────────────────────────
  function navHTML() {
    const link = (href, label, key) => `<a href="${altPrefix}${href}" data-nav-key="${key}">${label}</a>`;
    const sibling = siblingTrack();
    return `
      <header>
        <nav class="nav" aria-label="Primary">
          <a href="${altPrefix}/" class="nav-logo">Foundry Art</a>
          <div class="nav-links">
            ${link('/shop/', 'Tiles', 'shop')}
            ${link('/shop/', 'Hardware', 'hardware')}
            ${link('/#design-ideas', 'Design Ideas', 'design')}
            ${link('/#story', 'Our Story', 'story')}
            ${link('/#guidance', 'How to Buy', 'guide')}
          </div>
          <button class="nav-hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-drawer">
            <span></span><span></span><span></span>
          </button>
          <div class="nav-right">
            <span class="version-pill" role="tablist" aria-label="Site version">
              <a href="${isAlt ? sibling : path}" class="${isAlt ? '' : 'active'}" data-version="standard">Standard</a>
              <a href="${isAlt ? path : sibling}" class="${isAlt ? 'active' : ''}" data-version="plus">Plus</a>
            </span>
            <a href="${altPrefix}/cart/" class="nav-cart" aria-label="Cart">
              Cart<span class="nav-cart-count" data-cart-count>2</span>
            </a>
            <a href="${altPrefix}/shop/" class="nav-cta">Shop Now</a>
          </div>
        </nav>
      </header>

      <div class="drawer-scrim" data-drawer-scrim></div>
      <aside class="mobile-drawer" id="mobile-drawer" aria-label="Mobile menu" aria-hidden="true">
        <a href="${altPrefix}/shop/" data-drawer-link>Tiles</a>
        <a href="${altPrefix}/shop/" data-drawer-link>Hardware</a>
        <a href="${altPrefix}/#design-ideas" data-drawer-link>Design Ideas</a>
        <a href="${altPrefix}/#story" data-drawer-link>Our Story</a>
        <a href="${altPrefix}/#guidance" data-drawer-link>How to Buy</a>
        <a href="${altPrefix}/cart/" data-drawer-link>Cart</a>
        <a href="${altPrefix}/shop/" class="mobile-cta" data-drawer-link>Shop Now</a>
        <div class="mobile-version-row">
          <span class="version-pill">
            <a href="${isAlt ? sibling : path}" class="${isAlt ? '' : 'active'}">Standard</a>
            <a href="${isAlt ? path : sibling}" class="${isAlt ? 'active' : ''}">Plus</a>
          </span>
        </div>
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
    const thumbs = document.querySelectorAll('.pdp-gallery .thumb');
    if (!main || !thumbs.length) return;

    thumbs.forEach(t => {
      t.addEventListener('click', () => {
        thumbs.forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        main.textContent = t.dataset.label || t.textContent;
      });
    });
  }

  // ────────────────────────────────────────────────────────
  // Swatch picker (Track B PDP material chooser)
  // ────────────────────────────────────────────────────────
  function initSwatches() {
    const swatches = document.querySelectorAll('.swatch-row .swatch');
    if (!swatches.length) return;
    swatches.forEach(s => {
      s.addEventListener('click', () => {
        swatches.forEach(x => x.classList.remove('selected'));
        s.classList.add('selected');
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
  function productCardHTML(p, prefix) {
    const onSale = !!p.salePrice;
    const priceBlock = onSale
      ? `<div class="product-price"><span class="was">${window.FA_FMT.price(p.wasPrice)}</span><span class="sale">${window.FA_FMT.price(p.salePrice)}</span></div>`
      : `<div class="product-price">${window.FA_FMT.price(p.price)}</div>`;
    const badge = onSale ? `<span class="product-badge">Sale</span>` : '';
    return `
      <a href="${prefix}/product/${p.slug}/" class="product-card">
        <div class="img-wrap">
          ${badge}
          <div class="wire-img" role="img" aria-label="${p.name} ${p.sizeLabel}">${p.pattern} ${p.size}</div>
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
    grid.innerHTML = window.FA_PRODUCTS.map(p => productCardHTML(p, altPrefix)).join('');
  }

  function renderCrossSell() {
    const wrap = document.querySelector('[data-cross-sell]');
    if (!wrap || !window.FA_PRODUCTS) return;
    const exclude = wrap.dataset.exclude || '';
    const picks = window.FA_PRODUCTS.filter(p => p.slug !== exclude).slice(0, 3);
    wrap.innerHTML = picks.map(p => productCardHTML(p, altPrefix)).join('');
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
    initFilterTabs();
    initQtySteppers();
    initTabs();
    initGallery();
    initSwatches();
    initCoverageCalc();
    initFacets();
    initOptionRows();
    initShipToggle();
    initTradeToggle();
    renderShopGrid();
    renderCrossSell();
    renderShopSidebar();
  });
})();
