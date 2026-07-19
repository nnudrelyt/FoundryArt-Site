// Foundry Art — demo account data (prototype only).
//
// This file is the immutable source of truth for the signed-in demo customer
// and their order history. Nothing here is ever written to. The ONLY mutable
// account state is a session flag in localStorage (see the Account module in
// app.js), so a client clicking around the prototype can never corrupt the
// demo data — a refresh always restores a clean account.
//
// Line-item shape below is deliberately identical to the Cart line shape, so
// the same row renderer serves order-received and account order detail.
//
// Real auth and order history come from WooCommerce at launch.

window.FA_ACCOUNT = {

  customer: {
    firstName: 'Avery',
    lastName:  'Kessler',
    email:     'avery@studioyarrow.com',
    phone:     '(312) 555-0148',
    company:   'Studio Yarrow',

    billing: {
      line1: '1908 W Superior St', line2: 'Studio 4',
      city: 'Chicago', state: 'Illinois', zip: '60622', country: 'USA',
    },
    shipping: {
      line1: '1908 W Superior St', line2: 'Studio 4',
      city: 'Chicago', state: 'Illinois', zip: '60622', country: 'USA',
    },

    // Flip status to 'pending' or 'none' to demo the other two states —
    // 'pending' is the manual-verification path the studio runs today.
    trade: {
      status: 'approved',              // 'approved' | 'pending' | 'none'
      tradeId: 'FA-TRADE-2291',
      firm: 'Studio Yarrow',
      website: 'studioyarrow.com',
      discount: 0.20,
      verifiedOn: '3 March 2026',
    },
  },

  orders: [
    {
      id: 'FA-2026-04612',
      date: '2 June 2026',
      status: 'Delivered',
      items: [
        { slug: 'cabochon-3x3', name: 'Cabochon', sizeLabel: '3×3 inch', finish: 'Traditional Bronze', price: 92.50, qty: 8, sku: 'FA-CAB-3-TB', weight: 0.8 },
        { slug: 'lotus-3x3',    name: 'Lotus',    sizeLabel: '3×3 inch', finish: 'Traditional Bronze', price: 92.50, qty: 4, sku: 'FA-LOT-3-TB', weight: 0.8 },
      ],
      subtotal: 1110.00,
      discount: 222.00,                // 20% trade
      shipping: { label: 'UPS Ground', cost: 0 },   // free over $250
      tax: 0,
      total: 888.00,
      payment: 'Visa ending 4471',
      tracking: '1Z999AA10123456784',
    },
    {
      id: 'FA-2026-04788',
      date: '28 June 2026',
      status: 'Shipped',
      items: [
        { slug: 'moon-blossom-3x3', name: 'Moon Blossom', sizeLabel: '3×3 inch', finish: 'White Bronze', price: 92.50, qty: 3, sku: 'FA-MBL-3-WB', weight: 0.8 },
        { slug: 'cabochon-1x1-knob', name: 'Cabochon Knob', sizeLabel: '1×1 inch', finish: 'Traditional Bronze', price: 42.00, qty: 6, sku: 'FA-CAB-KNB', weight: 0.2 },
      ],
      subtotal: 529.50,
      discount: 105.90,
      shipping: { label: 'UPS 2nd Day Air', cost: 24.00 },
      tax: 0,
      total: 447.60,
      payment: 'Visa ending 4471',
      tracking: '1Z999AA10987654321',
    },
    {
      id: 'FA-2026-04827',
      date: '14 July 2026',
      status: 'Processing',
      items: [
        { slug: 'center-square-2x2', name: 'Center Square', sizeLabel: '2×2 inch', finish: 'Traditional Bronze', price: 52.00, qty: 10, sku: 'FA-CSQ-2-TB', weight: 0.4 },
      ],
      subtotal: 520.00,
      discount: 104.00,
      shipping: { label: 'UPS Ground', cost: 0 },
      tax: 0,
      total: 416.00,
      payment: 'PayPal',
      tracking: null,
    },
    {
      id: 'FA-2026-04455',
      date: '11 April 2026',
      status: 'Delivered',
      items: [
        { slug: 'swatch-water-3x3', parentSlug: 'water-3x3', type: 'sample', name: 'Water swatch', sizeLabel: 'Swatch · 1×1 inch', finish: 'White Bronze', price: 0, qty: 1, sku: 'FA-SWATCH-WAT-3-WB', weight: 0.05 },
        { slug: 'swatch-sun-3x3',   parentSlug: 'sun-3x3',   type: 'sample', name: 'Sun swatch',   sizeLabel: 'Swatch · 1×1 inch', finish: 'Traditional Bronze', price: 0, qty: 1, sku: 'FA-SWATCH-SUN-3-TB', weight: 0.05 },
      ],
      subtotal: 0,
      discount: 0,
      shipping: { label: 'Free (swatch order)', cost: 0 },
      tax: 0,
      total: 0,
      payment: '—',
      tracking: null,
    },
  ],
};
