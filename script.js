'use strict';

const site = {
  name: 'Driftwear Clo.',
  tagline: 'Wear Your Vibe',
  phone: '078 385 0769',
  whatsapp: '94783850769',
  email: 'nipunsathsara203@gmail.com',
  address: 'Galle, Galle, Sri Lanka, 80090',
  website: 'https://driftware.netlify.app'
};

const asset = (path) => path;

const shirtColors = [
  { name: 'Black', value: '#080808', image: 'assets/tshirt_black_oversized.jpg', glow: 'rgba(255,122,0,.28)' },
  { name: 'White', value: '#f4f1ea', image: 'assets/tshirt_white_regular.jpg', glow: 'rgba(244,241,234,.22)' },
  { name: 'Orange', value: '#ff7a00', image: 'assets/tshirt_grey_flatlay.jpg', glow: 'rgba(255,122,0,.32)' },
  { name: 'Cream', value: '#eadfc8', image: 'assets/tshirt_white_flatlay.jpg', glow: 'rgba(234,223,200,.24)' },
  { name: 'Dark green', value: '#173d2a', image: 'assets/tshirt_model_urban_black.jpg', glow: 'rgba(23,61,42,.32)' },
  { name: 'Navy', value: '#0d1d33', image: 'assets/tshirt_model_studio_white.jpg', glow: 'rgba(47,128,255,.20)' },
  { name: 'Maroon', value: '#5f1218', image: 'assets/tshirt_black_flatlay.jpg', glow: 'rgba(173,31,34,.28)' }
];

const products = [
  {
    id: 'p-001', slug: 'drift-flame-oversized-tee', name: 'Drift Flame Oversized Tee', category: 'Oversized Collection',
    shortDescription: 'Bold orange motion graphic on a premium oversized fit.',
    description: 'Editable demo product for a Driftwear-style oversized T-shirt. Replace fabric, GSM and final price after supplier confirmation.',
    price: 3900, originalPrice: 4500, colors: ['Black', 'Orange', 'Cream'], sizes: ['S','M','L','XL','XXL'], fit: 'Oversized', fabric: 'Editable cotton placeholder', gsm: 'Editable GSM placeholder',
    images: ['assets/tshirt_black_oversized.jpg','assets/tshirt_black_flatlay.jpg'], video: 'assets/video.mp4', customizable: true, printLocations: ['Front center','Back center','Sleeves'], featured: true, newArrival: true, bestSeller: true, stock: 'Mock stock', rating: 4.8, reviewCount: 0, careInstructions: 'Wash inside out in cold water. Do not iron directly on print.'
  },
  { id: 'p-002', slug: 'urban-motion-black-tee', name: 'Urban Motion Black Tee', category: 'Streetwear Collection', shortDescription: 'Dark streetwear tee with abstract speed artwork.', description: 'Demo product for streetwear drops and custom print edits.', price: 3600, originalPrice: 4100, colors: ['Black','White'], sizes: ['S','M','L','XL'], fit: 'Regular', fabric: 'Editable cotton placeholder', gsm: 'Editable GSM placeholder', images: ['assets/tshirt_model_urban_black.jpg','assets/Gallery/streetwear_look_01.jpg'], video: 'assets/video.mp4', customizable: true, printLocations: ['Front center','Back center'], featured: true, newArrival: true, bestSeller: false, stock: 'Mock stock', rating: 4.7, reviewCount: 0, careInstructions: 'Use mild detergent and dry in shade.' },
  { id: 'p-003', slug: 'orange-velocity-tee', name: 'Orange Velocity Tee', category: 'Streetwear Collection', shortDescription: 'High-energy orange apparel for events and teams.', description: 'Editable product data. Confirm garment cost and print cost before public launch.', price: 3400, originalPrice: 3900, colors: ['Orange','Black'], sizes: ['S','M','L','XL'], fit: 'Regular', fabric: 'Editable fabric placeholder', gsm: 'Editable GSM placeholder', images: ['assets/tshirt_grey_regular.jpg','assets/tshirt_grey_flatlay.jpg'], video: 'assets/video.mp4', customizable: true, printLocations: ['Front center','Left chest','Back center'], featured: true, newArrival: false, bestSeller: true, stock: 'Mock stock', rating: 4.6, reviewCount: 0, careInstructions: 'Avoid bleach and tumble drying.' },
  { id: 'p-004', slug: 'midnight-rider-tee', name: 'Midnight Rider Tee', category: 'Minimal Collection', shortDescription: 'Clean black tee with subtle logo placement.', description: 'Minimal editable demo product for custom logo printing.', price: 3200, originalPrice: 3800, colors: ['Black','Navy'], sizes: ['M','L','XL','XXL'], fit: 'Regular', fabric: 'Editable cotton placeholder', gsm: 'Editable GSM placeholder', images: ['assets/tshirt_black_flatlay.jpg','assets/tshirt_black_oversized.jpg'], video: 'assets/video.mp4', customizable: true, printLocations: ['Left chest','Back center'], featured: false, newArrival: false, bestSeller: true, stock: 'Mock stock', rating: 4.5, reviewCount: 0, careInstructions: 'Iron inside out only.' },
  { id: 'p-005', slug: 'classic-drift-logo-tee', name: 'Classic Drift Logo Tee', category: 'Minimal Collection', shortDescription: 'Simple Driftwear logo-ready shirt.', description: 'Use for logo, text and small-batch personalized apparel.', price: 3000, originalPrice: 3500, colors: ['White','Black','Cream'], sizes: ['S','M','L','XL','XXL'], fit: 'Regular', fabric: 'Editable fabric placeholder', gsm: 'Editable GSM placeholder', images: ['assets/tshirt_white_regular.jpg','assets/tshirt_white_flatlay.jpg'], video: 'assets/video.mp4', customizable: true, printLocations: ['Front center','Left chest','Sleeves'], featured: false, newArrival: true, bestSeller: false, stock: 'Mock stock', rating: 4.4, reviewCount: 0, careInstructions: 'Dry in shade to protect print color.' },
  { id: 'p-006', slug: 'street-culture-tee', name: 'Street Culture Tee', category: 'Streetwear Collection', shortDescription: 'Graphic-heavy style for streetwear edits.', description: 'Designed for bold front and back artwork layouts.', price: 3700, originalPrice: 4200, colors: ['Black','Maroon','Navy'], sizes: ['S','M','L','XL'], fit: 'Oversized', fabric: 'Editable cotton placeholder', gsm: 'Editable GSM placeholder', images: ['assets/Gallery/streetwear_look_02.jpg','assets/Gallery/streetwear_look_03.jpg'], video: 'assets/video.mp4', customizable: true, printLocations: ['Full front','Full back','Sleeves'], featured: true, newArrival: false, bestSeller: false, stock: 'Mock stock', rating: 4.6, reviewCount: 0, careInstructions: 'Do not iron on printed area.' },
  { id: 'p-007', slug: 'minimal-signature-tee', name: 'Minimal Signature Tee', category: 'Minimal Collection', shortDescription: 'Small chest print, refined everyday profile.', description: 'Best for initials, logo marks and clean custom typography.', price: 2900, originalPrice: 3300, colors: ['Cream','White','Grey'], sizes: ['S','M','L','XL'], fit: 'Regular', fabric: 'Editable cotton placeholder', gsm: 'Editable GSM placeholder', images: ['assets/tshirt_white_flatlay.jpg','assets/tshirt_grey_regular.jpg'], video: 'assets/video.mp4', customizable: true, printLocations: ['Left chest','Right sleeve'], featured: false, newArrival: false, bestSeller: false, stock: 'Mock stock', rating: 4.3, reviewCount: 0, careInstructions: 'Machine wash gentle cycle.' },
  { id: 'p-008', slug: 'galle-edition-tee', name: 'Galle Edition Tee', category: 'Custom Prints', shortDescription: 'Location-inspired custom shirt concept.', description: 'Editable Galle-themed shirt concept. Replace artwork with original final design.', price: 3500, originalPrice: 4000, colors: ['Black','Cream','Orange'], sizes: ['S','M','L','XL','XXL'], fit: 'Oversized', fabric: 'Editable cotton placeholder', gsm: 'Editable GSM placeholder', images: ['assets/Gallery/streetwear_look_04.jpg','assets/tshirt_black_oversized.jpg'], video: 'assets/video.mp4', customizable: true, printLocations: ['Front center','Back center'], featured: true, newArrival: true, bestSeller: false, stock: 'Mock stock', rating: 4.8, reviewCount: 0, careInstructions: 'Wash inside out.' },
  { id: 'p-009', slug: 'neon-drift-tee', name: 'Neon Drift Tee', category: 'Custom Prints', shortDescription: 'Electric accent tee for youth campaigns.', description: 'Demo product for bright color DTF artwork.', price: 3700, originalPrice: 4300, colors: ['Black','Navy'], sizes: ['S','M','L','XL'], fit: 'Regular', fabric: 'Editable fabric placeholder', gsm: 'Editable GSM placeholder', images: ['assets/Gallery/k.jpg','assets/Gallery/l.jpg'], video: 'assets/video.mp4', customizable: true, printLocations: ['Front center','Full front'], featured: false, newArrival: true, bestSeller: true, stock: 'Mock stock', rating: 4.5, reviewCount: 0, careInstructions: 'Dry flat when possible.' },
  { id: 'p-010', slug: 'vintage-racing-tee', name: 'Vintage Racing Tee', category: 'Streetwear Collection', shortDescription: 'Racing-inspired typography and line work.', description: 'Original racing-style demo concept without copied brands or logos.', price: 3800, originalPrice: 4400, colors: ['Orange','Black','Maroon'], sizes: ['M','L','XL','XXL'], fit: 'Oversized', fabric: 'Editable cotton placeholder', gsm: 'Editable GSM placeholder', images: ['assets/Gallery/m.jpg','assets/Gallery/n.jpg'], video: 'assets/video.mp4', customizable: true, printLocations: ['Full front','Back center'], featured: false, newArrival: false, bestSeller: true, stock: 'Mock stock', rating: 4.7, reviewCount: 0, careInstructions: 'Wash cold and inside out.' },
  { id: 'p-011', slug: 'custom-name-tee', name: 'Custom Name Tee', category: 'Custom Prints', shortDescription: 'Personalized name, number or phrase tee.', description: 'Built for birthdays, schools, classes and event shirts.', price: 2800, originalPrice: 3400, colors: ['Black','White','Cream','Navy'], sizes: ['Kids','S','M','L','XL'], fit: 'Regular', fabric: 'Editable fabric placeholder', gsm: 'Editable GSM placeholder', images: ['assets/Gallery/o.jpg','assets/Gallery/p.jpg'], video: 'assets/video.mp4', customizable: true, printLocations: ['Front center','Back center','Sleeves'], featured: false, newArrival: true, bestSeller: false, stock: 'Mock stock', rating: 4.4, reviewCount: 0, careInstructions: 'Do not bleach.' },
  { id: 'p-012', slug: 'couple-vibe-tee', name: 'Couple Vibe Tee', category: 'Couple Collection', shortDescription: 'Coordinated custom couple T-shirts.', description: 'Editable demo product for complementary pair artwork.', price: 6200, originalPrice: 7000, colors: ['Black','Cream','White'], sizes: ['S','M','L','XL'], fit: 'Regular pair', fabric: 'Editable cotton placeholder', gsm: 'Editable GSM placeholder', images: ['assets/tshirt_model_studio_white.jpg','assets/Gallery/streetwear_look_03.jpg'], video: 'assets/video.mp4', customizable: true, printLocations: ['Front center','Back center'], featured: true, newArrival: false, bestSeller: true, stock: 'Mock stock', rating: 4.7, reviewCount: 0, careInstructions: 'Wash both shirts inside out.' }
];

const services = [
  ['Custom T-Shirt Printing', 'One-off tees, personal graphics and apparel gifts.', 'assets/tshirt_black_oversized.jpg'],
  ['DTF Transfer Printing', 'Vibrant transfers for cotton, polyester and complex artwork.', 'assets/tshirt_printing_press.jpg'],
  ['Bulk Printing', 'Schools, businesses, teams, clubs and events.', 'assets/Gallery/m.jpg'],
  ['Team and Event T-Shirts', 'Coordinated shirts with names, numbers and logos.', 'assets/Gallery/streetwear_look_01.jpg'],
  ['Business Branding', 'Uniforms, staff shirts and campaign apparel.', 'assets/tshirt_model_urban_black.jpg'],
  ['Custom Graphic Design', 'Artwork preparation and editable mockup support.', 'image.png']
];

const collections = [
  ['Oversized Collection', 'assets/tshirt_black_oversized.jpg'],
  ['Streetwear Collection', 'assets/Gallery/streetwear_look_01.jpg'],
  ['Minimal Collection', 'assets/tshirt_white_flatlay.jpg'],
  ['Couple Collection', 'assets/tshirt_model_studio_white.jpg'],
  ['Team Collection', 'assets/Gallery/m.jpg'],
  ['Custom Prints', 'assets/tshirt_printing_press.jpg']
];

const galleryImages = [
  'assets/tshirt_printing_press.jpg','assets/tshirt_black_oversized.jpg','assets/tshirt_white_flatlay.jpg','assets/Gallery/streetwear_look_01.jpg',
  'assets/Gallery/streetwear_look_02.jpg','assets/Gallery/streetwear_look_03.jpg','assets/Gallery/streetwear_look_04.jpg','assets/Gallery/k.jpg',
  'assets/Gallery/l.jpg','assets/Gallery/m.jpg','assets/Gallery/n.jpg','assets/Gallery/o.jpg','assets/Gallery/p.jpg','assets/Gallery/j.jpg'
];

// Demo testimonials must be replaced with verified customer reviews before public launch.
const testimonials = [
  ['Nimesh P.', 'Galle', 'Custom Name Tee', '12 pcs', 'The mockup flow made the order easy and the print colors looked strong in the final sample.', 'assets/Gallery/streetwear_look_01.jpg'],
  ['Ashani R.', 'Matara', 'Couple Vibe Tee', '2 pcs', 'Good communication through WhatsApp and helpful design suggestions.', 'assets/Gallery/streetwear_look_02.jpg'],
  ['Dinuka S.', 'Galle', 'Team Event Shirts', '35 pcs', 'The team shirts looked consistent across sizes and the delivery was coordinated well.', 'assets/Gallery/streetwear_look_03.jpg'],
  ['Kavindi M.', 'Colombo', 'Birthday T-Shirts', '8 pcs', 'The preview helped us fix the print size before approval.', 'assets/Gallery/streetwear_look_04.jpg'],
  ['Tharindu J.', 'Galle', 'Business Uniforms', '24 pcs', 'Clean front logo prints and useful washing advice.', 'assets/tshirt_model_urban_black.jpg'],
  ['Sachini W.', 'Kandy', 'Oversized Tee', '1 pc', 'The oversized fit and orange artwork gave the shirt a premium look.', 'assets/tshirt_model_studio_white.jpg']
];

const faqs = [
  ['What is DTF printing?', 'DTF printing uses a printed transfer film and heat press process to apply detailed full-color artwork to garments.'],
  ['Can I order one T-shirt?', 'Yes. Single-piece custom orders are supported, with final pricing confirmed after artwork and garment details.'],
  ['What file format should I upload?', 'PNG, JPG and SVG are accepted for preview. Transparent PNG or vector artwork is preferred for clean production.'],
  ['Can you design the artwork?', 'Yes. Use the design service option or message Driftwear Clo. with your concept.'],
  ['How long does printing take?', 'Turnaround is an editable business detail and should be confirmed per order quantity and artwork readiness.'],
  ['Do you accept bulk orders?', 'Yes. Bulk quotes are available for teams, schools, businesses, clubs and events.'],
  ['Can I choose the T-shirt color?', 'Yes. Available colors depend on stock and garment type.'],
  ['What sizes are available?', 'Common sizes include S, M, L, XL and XXL, with kids or special sizes handled as editable placeholders.'],
  ['Do you offer islandwide delivery?', 'Delivery information should be confirmed in the editable site configuration.'],
  ['How should I wash a printed T-shirt?', 'Wash inside out in cold water, avoid bleach, and do not iron directly on the print.'],
  ['Can I print on sleeves?', 'Yes, sleeve printing is available as a selectable print position.'],
  ['Can I preview my design before printing?', 'Yes. A mockup preview should be approved before final production.']
];

const state = {
  page: 'home',
  cart: JSON.parse(localStorage.getItem('driftwear-cart') || '[]'),
  selectedProduct: products[0],
  designSide: 'front',
  artworkDataUrl: '',
  layerHidden: false,
  designPosition: { x: 0, y: 0 },
  drag: null
};

function money(value) {
  return `LKR ${Number(value).toLocaleString('en-LK')}`;
}

function saveCart() {
  localStorage.setItem('driftwear-cart', JSON.stringify(state.cart));
  document.getElementById('cartCount').textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0);
}

function go(page) {
  state.page = page;
  document.querySelectorAll('.page').forEach((el) => el.classList.toggle('page--active', el.id === `page-${page}`));
  document.querySelectorAll('[data-page-link]').forEach((el) => el.classList.toggle('active', el.dataset.pageLink === page));
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('menuToggle').setAttribute('aria-expanded', 'false');
  renderDynamicPage(page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function productCard(product) {
  return `
    <article class="product-card">
      <div class="product-card__media">
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy" />
        <div class="product-card__badges">
          ${product.newArrival ? '<span class="badge">New</span>' : ''}
          ${product.bestSeller ? '<span class="badge">Best seller</span>' : ''}
        </div>
      </div>
      <div class="card-pad">
        <p class="eyebrow">${product.category}</p>
        <h3>${product.name}</h3>
        <p>${product.shortDescription}</p>
        <strong>${money(product.price)}</strong>
        <div class="color-dots">${product.colors.map((color) => `<span title="${color}" style="background:${colorValue(color)}"></span>`).join('')}</div>
        <small>Sizes: ${product.sizes.join(', ')}</small>
        <div class="product-card__actions">
          <button class="secondary-btn" onclick="openProduct('${product.id}')">Quick view</button>
          <button class="primary-btn" onclick="quickAdd('${product.id}')">Quick add</button>
          <button class="ghost-btn" onclick="openProduct('${product.id}')">Wishlist</button>
          <button class="ghost-btn" onclick="customizeProduct('${product.id}')">Customize</button>
        </div>
      </div>
    </article>
  `;
}

function colorValue(name) {
  const found = shirtColors.find((color) => color.name === name);
  if (found) return found.value;
  if (name === 'Grey') return '#777';
  if (name === 'Red') return '#b91c1c';
  return '#ddd';
}

function renderHome() {
  document.getElementById('serviceGrid').innerHTML = services.map(([title, desc, image]) => `
    <article class="service-card"><img src="${image}" alt="${title}" loading="lazy" /><div class="card-pad"><p class="price-note">Starting price placeholder</p><h3>${title}</h3><p>${desc}</p><button class="ghost-btn" data-page-link="dtf">Learn more</button></div></article>
  `).join('');

  document.getElementById('featuredProducts').innerHTML = products.filter((p) => p.featured).slice(0, 6).map(productCard).join('');
  document.getElementById('collectionGrid').innerHTML = collections.map(([title, image]) => `<article class="collection-card"><img src="${image}" alt="${title}" loading="lazy" /><div class="card-pad"><h3>${title}</h3><button class="ghost-btn" data-page-link="shop">Explore</button></div></article>`).join('');
  document.getElementById('homeGallery').innerHTML = galleryImages.map((image, i) => `<img src="${image}" alt="Driftwear gallery preview ${i + 1}" loading="lazy" />`).join('');
  document.getElementById('testimonialGrid').innerHTML = testimonials.map(([name, location, product, qty, quote, image]) => `<article class="testimonial-card"><img src="${image}" alt="${name} demo profile" loading="lazy" /><p>${quote}</p><strong>${name}</strong><small>${location} / ${product} / ${qty} / Demo review</small></article>`).join('');
  document.getElementById('socialGrid').innerHTML = ['New custom design','Behind the scenes','Customer order','DTF print close-up','Bulk order preparation','New oversized T-shirt'].map((title, i) => `<article class="social-post" style="background-image:url('${galleryImages[i]}')"><span>${title}</span></article>`).join('');
  document.getElementById('faqList').innerHTML = faqs.map(([q, a], i) => `<article class="faq-item"><button type="button" onclick="toggleFaq(${i})">${q}<span>+</span></button><p>${a}</p></article>`).join('');

  const heroSwatches = document.getElementById('heroSwatches');
  heroSwatches.innerHTML = shirtColors.map((color, i) => `<button class="swatch ${i === 0 ? 'active' : ''}" aria-label="Preview ${color.name} shirt" title="${color.name}" style="background:${color.value}" onclick="setHeroColor(${i})"></button>`).join('');

  const miniColor = document.getElementById('miniColor');
  miniColor.innerHTML = shirtColors.map((color) => `<option value="${color.name}">${color.name}</option>`).join('');
}

function setHeroColor(index) {
  const color = shirtColors[index];
  const visual = document.getElementById('heroVisual');
  const shirt = document.getElementById('heroShirt');
  visual.classList.add('hero-changing');
  document.querySelector('[data-color-surface]').style.setProperty('--hero-glow', color.glow);
  setTimeout(() => {
    shirt.src = color.image;
    shirt.alt = `Premium ${color.name.toLowerCase()} Driftwear T-shirt mockup`;
    visual.classList.remove('hero-changing');
  }, 160);
  document.querySelectorAll('#heroSwatches .swatch').forEach((btn, i) => btn.classList.toggle('active', i === index));
}

function renderShop() {
  const filters = {
    text: document.getElementById('shopSearch').value.toLowerCase(),
    category: document.getElementById('categoryFilter').value,
    color: document.getElementById('colorFilter').value,
    size: document.getElementById('sizeFilter').value,
    fit: document.getElementById('fitFilter').value,
    customOnly: document.getElementById('customOnly').checked,
    newOnly: document.getElementById('newOnly').checked,
    bestOnly: document.getElementById('bestOnly').checked,
    sort: document.getElementById('sortFilter').value
  };
  let result = products.filter((product) => {
    const textMatch = `${product.name} ${product.category} ${product.shortDescription}`.toLowerCase().includes(filters.text);
    return textMatch &&
      (!filters.category || product.category === filters.category) &&
      (!filters.color || product.colors.includes(filters.color)) &&
      (!filters.size || product.sizes.includes(filters.size)) &&
      (!filters.fit || product.fit === filters.fit) &&
      (!filters.customOnly || product.customizable) &&
      (!filters.newOnly || product.newArrival) &&
      (!filters.bestOnly || product.bestSeller);
  });
  if (filters.sort === 'price-low') result.sort((a, b) => a.price - b.price);
  if (filters.sort === 'price-high') result.sort((a, b) => b.price - a.price);
  if (filters.sort === 'new') result.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
  if (filters.sort === 'best') result.sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller));
  document.getElementById('productCount').textContent = `${result.length} products`;
  document.getElementById('shopGrid').innerHTML = result.length ? result.map(productCard).join('') : `<div class="policy-card card-pad"><h2>No products found</h2><p>Clear filters or try another category.</p></div>`;
}

function setupFilters() {
  const unique = (items) => [...new Set(items)].sort();
  const fill = (id, values, label) => {
    document.getElementById(id).innerHTML = `<option value="">All ${label}</option>${values.map((value) => `<option value="${value}">${value}</option>`).join('')}`;
  };
  fill('categoryFilter', unique(products.map((p) => p.category)), 'categories');
  fill('colorFilter', unique(products.flatMap((p) => p.colors)), 'colors');
  fill('sizeFilter', unique(products.flatMap((p) => p.sizes)), 'sizes');
  fill('fitFilter', unique(products.map((p) => p.fit)), 'fits');
  ['shopSearch','categoryFilter','colorFilter','sizeFilter','fitFilter','sortFilter','customOnly','newOnly','bestOnly'].forEach((id) => document.getElementById(id).addEventListener('input', renderShop));
  document.getElementById('clearFilters').addEventListener('click', () => {
    ['shopSearch','categoryFilter','colorFilter','sizeFilter','fitFilter','sortFilter'].forEach((id) => document.getElementById(id).value = id === 'sortFilter' ? 'featured' : '');
    ['customOnly','newOnly','bestOnly'].forEach((id) => document.getElementById(id).checked = false);
    renderShop();
  });
}

function openProduct(id) {
  state.selectedProduct = products.find((product) => product.id === id) || products[0];
  go('product');
}

function quickAdd(id) {
  const product = products.find((item) => item.id === id);
  if (!product) return;
  addCartItem({ productId: product.id, name: product.name, image: product.images[0], size: product.sizes[1] || product.sizes[0], color: product.colors[0], quantity: 1, price: product.price, custom: false, notes: '' });
  go('cart');
}

function customizeProduct(id) {
  const product = products.find((item) => item.id === id);
  if (product) document.getElementById('designProduct').value = product.name;
  go('designer');
}

function addCartItem(item) {
  state.cart.push({ ...item, ref: `DWC-${Date.now().toString().slice(-6)}` });
  saveCart();
}

function renderProduct() {
  const p = state.selectedProduct;
  document.getElementById('page-product').innerHTML = `
    <section class="page-hero compact"><p class="eyebrow">Product Details</p><h1>${p.name}</h1></section>
    <section class="split-section section">
      <div class="masonry">
        ${p.images.map((image, i) => `<img src="${image}" alt="${p.name} image ${i + 1}" />`).join('')}
        <video controls poster="${p.images[0]}"><source src="${p.video}" type="video/mp4" /></video>
      </div>
      <div>
        <p class="eyebrow">${p.category} / ${p.fit}</p>
        <h2>${money(p.price)}</h2>
        <p>${p.description}</p>
        <div class="feature-list"><span>Rating ${p.rating}</span><span>${p.fabric}</span><span>${p.gsm}</span><span>Custom print option</span></div>
        <label>Size selector <select id="detailSize">${p.sizes.map((s) => `<option>${s}</option>`).join('')}</select></label>
        <label>Color selector <select id="detailColor">${p.colors.map((s) => `<option>${s}</option>`).join('')}</select></label>
        <label>Quantity <input id="detailQty" type="number" min="1" value="1" /></label>
        <div class="button-row">
          <button class="primary-btn" onclick="addDetailProduct()">Add to cart</button>
          <button class="secondary-btn" onclick="customizeProduct('${p.id}')">Upload design option</button>
          <a class="whatsapp-btn" target="_blank" rel="noopener" href="${waUrl(`Hi Driftwear Clo., I want to order ${p.name}.`)}">WhatsApp order</a>
        </div>
        <h3>Care instructions</h3><p>${p.careInstructions}</p>
        <h3>Delivery information</h3><p>Editable placeholder. Confirm delivery method, district and required date before final order approval.</p>
      </div>
    </section>
  `;
}

function addDetailProduct() {
  const p = state.selectedProduct;
  addCartItem({ productId: p.id, name: p.name, image: p.images[0], size: document.getElementById('detailSize').value, color: document.getElementById('detailColor').value, quantity: Number(document.getElementById('detailQty').value), price: p.price, custom: false, notes: '' });
  go('cart');
}

function estimateDesignerPrice() {
  const type = document.getElementById('designProduct').value;
  const qty = Math.max(1, Number(document.getElementById('designQty').value || 1));
  const location = document.getElementById('printLocation').value;
  const printSize = document.getElementById('printSize').value;
  let base = type.includes('Oversized') ? 3600 : type.includes('Sports') ? 3300 : type.includes('Polo') ? 3900 : type.includes('Kids') ? 2400 : 3000;
  if (location.includes('Full')) base += 900;
  if (location.includes('Sleeve')) base += 450;
  if (printSize.includes('Large') || printSize.includes('Full')) base += 650;
  if (document.getElementById('designService').checked) base += 1200;
  if (document.getElementById('rushOrder').checked) base += 1000;
  const discount = qty >= 25 ? .82 : qty >= 12 ? .9 : 1;
  const total = Math.round(base * qty * discount);
  document.getElementById('designPrice').textContent = money(total);
  return total;
}

function setupDesigner() {
  document.getElementById('designProduct').innerHTML = ['Regular fit','Oversized fit','Premium cotton','Sports T-shirt','Polo shirt','Kids T-shirt'].map((v) => `<option>${v}</option>`).join('');
  document.getElementById('designColor').innerHTML = shirtColors.concat([{ name: 'Red', value: '#b91c1c' }, { name: 'Grey', value: '#777' }]).map((v) => `<option value="${v.name}">${v.name}</option>`).join('');
  document.getElementById('printLocation').innerHTML = ['Front center','Front left chest','Back center','Full front','Full back','Left sleeve','Right sleeve'].map((v) => `<option>${v}</option>`).join('');
  ['designProduct','designColor','printLocation','printSize','orderSize','designQty','designService','rushOrder'].forEach((id) => document.getElementById(id).addEventListener('input', () => { updateDesigner(); estimateDesignerPrice(); }));
  ['designTextInput','fontSelect','textColor','designScale','designRotate','designX','designY'].forEach((id) => document.getElementById(id).addEventListener('input', updateDesigner));
  document.getElementById('artworkUpload').addEventListener('change', handleArtwork);
  document.getElementById('centerDesign').addEventListener('click', () => {
    document.getElementById('designX').value = 0;
    document.getElementById('designY').value = 0;
    state.designPosition = { x: 0, y: 0 };
    updateDesigner();
  });
  document.getElementById('duplicateLayer').addEventListener('click', () => {
    const input = document.getElementById('designTextInput');
    input.value = `${input.value || 'DRIFTWEAR'} / ${input.value || 'DRIFTWEAR'}`;
    updateDesigner();
  });
  document.getElementById('toggleLayer').addEventListener('click', (event) => {
    state.layerHidden = !state.layerHidden;
    event.currentTarget.textContent = state.layerHidden ? 'Show text layer' : 'Hide text layer';
    updateDesigner();
  });
  document.getElementById('removeDesign').addEventListener('click', () => {
    state.artworkDataUrl = '';
    document.getElementById('artworkUpload').value = '';
    document.getElementById('designArtwork').removeAttribute('src');
    document.getElementById('uploadStatus').textContent = 'Artwork removed. Text layer is still available.';
    document.getElementById('resolutionWarning').classList.add('hidden');
    document.getElementById('transparentWarning').classList.add('hidden');
  });
  document.getElementById('downloadMockup').addEventListener('click', downloadMockup);
  document.getElementById('designerAddCart').addEventListener('click', addDesignerCart);
  document.getElementById('designerWhatsApp').addEventListener('click', () => window.open(designerWhatsApp(), '_blank', 'noopener'));
  document.querySelectorAll('[data-nudge]').forEach((button) => button.addEventListener('click', () => nudgeDesign(button.dataset.nudge)));
  document.querySelectorAll('.designer-tabs button').forEach((button) => button.addEventListener('click', () => {
    state.designSide = button.dataset.side;
    document.querySelectorAll('.designer-tabs button').forEach((b) => b.classList.toggle('active', b === button));
    updateDesigner();
  }));
  setupDesignerDrag();
  updateDesigner();
  estimateDesignerPrice();
}

function updateDesigner() {
  const colorName = document.getElementById('designColor').value;
  document.getElementById('designShirt').style.background = colorValue(colorName);
  state.designPosition = {
    x: Number(document.getElementById('designX').value),
    y: Number(document.getElementById('designY').value)
  };
  updateSafeArea();
  const text = document.getElementById('designText');
  text.textContent = state.designSide === 'sleeve' ? 'SLEEVE PRINT' : document.getElementById('designTextInput').value;
  text.style.fontFamily = document.getElementById('fontSelect').value;
  text.style.color = document.getElementById('textColor').value;
  text.style.opacity = state.layerHidden ? '0' : '1';
  const transform = `translate(calc(-50% + ${state.designPosition.x}px), calc(-50% + ${state.designPosition.y}px)) scale(${document.getElementById('designScale').value / 100}) rotate(${document.getElementById('designRotate').value}deg)`;
  text.style.transform = transform;
  document.getElementById('designArtwork').style.transform = transform;
  document.getElementById('uploadStatus').textContent = `${state.designSide.toUpperCase()} / ${document.getElementById('printLocation').value} / X ${state.designPosition.x}, Y ${state.designPosition.y}`;
}

function updateSafeArea() {
  const location = document.getElementById('printLocation').value;
  const boundary = document.getElementById('printBoundary');
  const shirt = document.getElementById('designShirt');
  const presets = {
    'Front center': ['28% 23% 24%', 'Front center safe print area'],
    'Front left chest': ['24% 52% 52% 18%', 'Left chest safe print area'],
    'Back center': ['24% 20% 22%', 'Back center safe print area'],
    'Full front': ['18% 13% 16%', 'Full front safe print area'],
    'Full back': ['17% 13% 15%', 'Full back safe print area'],
    'Left sleeve': ['36% 67% 37% 9%', 'Left sleeve safe print area'],
    'Right sleeve': ['36% 9% 37% 67%', 'Right sleeve safe print area']
  };
  const [inset, label] = presets[location] || presets['Front center'];
  shirt.style.setProperty('--safe-inset', inset);
  boundary.textContent = state.designSide === 'back' ? label.replace('Front', 'Back') : label;
}

function nudgeDesign(direction) {
  const x = document.getElementById('designX');
  const y = document.getElementById('designY');
  const step = 8;
  if (direction === 'left') x.value = Math.max(Number(x.min), Number(x.value) - step);
  if (direction === 'right') x.value = Math.min(Number(x.max), Number(x.value) + step);
  if (direction === 'up') y.value = Math.max(Number(y.min), Number(y.value) - step);
  if (direction === 'down') y.value = Math.min(Number(y.max), Number(y.value) + step);
  updateDesigner();
}

function setupDesignerDrag() {
  const canvas = document.getElementById('designCanvas');
  const startDrag = (event) => {
    if (!event.target.closest('#designArtwork, #designText')) return;
    event.preventDefault();
    state.drag = {
      startX: event.clientX,
      startY: event.clientY,
      originX: Number(document.getElementById('designX').value),
      originY: Number(document.getElementById('designY').value)
    };
    canvas.setPointerCapture?.(event.pointerId);
  };
  const moveDrag = (event) => {
    if (!state.drag) return;
    const xInput = document.getElementById('designX');
    const yInput = document.getElementById('designY');
    xInput.value = Math.max(Number(xInput.min), Math.min(Number(xInput.max), state.drag.originX + event.clientX - state.drag.startX));
    yInput.value = Math.max(Number(yInput.min), Math.min(Number(yInput.max), state.drag.originY + event.clientY - state.drag.startY));
    updateDesigner();
  };
  canvas.addEventListener('pointerdown', startDrag);
  canvas.addEventListener('pointermove', moveDrag);
  canvas.addEventListener('pointerup', () => { state.drag = null; });
  canvas.addEventListener('pointercancel', () => { state.drag = null; });
}

function handleArtwork(event) {
  const file = event.target.files[0];
  if (!file) return;
  const status = document.getElementById('uploadStatus');
  if (file.size > 4 * 1024 * 1024) {
    status.textContent = 'Maximum upload size warning: use artwork under 4MB for this browser preview.';
  }
  const img = document.getElementById('designArtwork');
  const reader = new FileReader();
  reader.onload = () => {
    state.artworkDataUrl = String(reader.result || '');
    img.src = state.artworkDataUrl;
    inspectArtwork(file, state.artworkDataUrl);
  };
  reader.readAsDataURL(file);
}

function inspectArtwork(file, dataUrl) {
  const image = new Image();
  image.onload = () => {
    const isLowResolution = image.naturalWidth < 1200 || image.naturalHeight < 1200;
    document.getElementById('resolutionWarning').classList.toggle('hidden', !isLowResolution);
    if (file.type === 'image/png') {
      document.getElementById('transparentWarning').classList.toggle('hidden', hasTransparentPixels(image));
    } else {
      document.getElementById('transparentWarning').classList.remove('hidden');
    }
    document.getElementById('uploadStatus').textContent = `${file.name} / ${image.naturalWidth} x ${image.naturalHeight}px`;
  };
  image.src = dataUrl;
}

function hasTransparentPixels(image) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { willReadFrequently: true });
  const sampleWidth = Math.min(image.naturalWidth, 320);
  const sampleHeight = Math.min(image.naturalHeight, 320);
  canvas.width = sampleWidth;
  canvas.height = sampleHeight;
  context.drawImage(image, 0, 0, sampleWidth, sampleHeight);
  const data = context.getImageData(0, 0, sampleWidth, sampleHeight).data;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 250) return true;
  }
  return false;
}

function escapeXml(value) {
  return String(value).replace(/[<>&"']/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[char]));
}

function downloadMockup() {
  const snap = designerSnapshot();
  const shirtColor = colorValue(snap.color);
  const textColor = document.getElementById('textColor').value;
  const transform = `translate(${snap.position.x} ${snap.position.y}) rotate(${snap.rotation}) scale(${snap.scale / 100})`;
  const artwork = state.artworkDataUrl ? `<image href="${state.artworkDataUrl}" x="250" y="260" width="180" height="150" preserveAspectRatio="xMidYMid meet" transform="${transform}" />` : '';
  const text = state.layerHidden ? '' : `<text x="340" y="455" text-anchor="middle" font-family="${escapeXml(snap.font)}" font-size="44" fill="${textColor}" transform="${transform}">${escapeXml(snap.text)}</text>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1100" viewBox="0 0 900 1100">
    <rect width="900" height="1100" fill="#080808"/>
    <circle cx="450" cy="500" r="350" fill="#ff7a00" opacity=".12"/>
    <path d="M278 210 C318 160 382 142 450 142 C518 142 582 160 622 210 L745 304 L670 430 L620 392 L620 932 L280 932 L280 392 L230 430 L155 304 Z" fill="${shirtColor}" stroke="#ffffff" stroke-opacity=".24" stroke-width="3"/>
    <path d="M330 220 C356 252 544 252 570 220" fill="none" stroke="#ffffff" stroke-opacity=".18" stroke-width="10"/>
    <rect x="283" y="285" width="334" height="470" fill="none" stroke="#ff9d1a" stroke-dasharray="12 12" opacity=".7"/>
    ${artwork}
    ${text}
    <text x="450" y="1010" text-anchor="middle" font-family="Arial" font-size="24" fill="#ff9d1a">DRIFTWEAR CLO. / ${escapeXml(snap.ref)} / ESTIMATE ${escapeXml(money(snap.estimate))}</text>
  </svg>`;
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `${snap.ref.toLowerCase()}-driftwear-mockup.svg`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function designerSnapshot() {
  const total = estimateDesignerPrice();
  return {
    product: document.getElementById('designProduct').value,
    color: document.getElementById('designColor').value,
    size: document.getElementById('orderSize').value,
    quantity: Number(document.getElementById('designQty').value),
    location: document.getElementById('printLocation').value,
    printSize: document.getElementById('printSize').value,
    side: state.designSide,
    text: document.getElementById('designTextInput').value || '',
    font: document.getElementById('fontSelect').value,
    scale: Number(document.getElementById('designScale').value),
    rotation: Number(document.getElementById('designRotate').value),
    position: { ...state.designPosition },
    hasArtwork: Boolean(state.artworkDataUrl),
    estimate: total,
    notes: document.getElementById('designNotes').value,
    ref: `DWC-${Date.now().toString().slice(-6)}`
  };
}

function addDesignerCart() {
  const snap = designerSnapshot();
  addCartItem({
    productId: 'custom',
    name: `${snap.product} custom design`,
    image: 'assets/tshirt_black_oversized.jpg',
    size: snap.size,
    color: snap.color,
    quantity: snap.quantity,
    price: Math.round(snap.estimate / snap.quantity),
    custom: true,
    notes: `${snap.side} / ${snap.location} / ${snap.printSize} / text: ${snap.text || 'none'} / artwork: ${snap.hasArtwork ? 'uploaded' : 'not uploaded'} / ${snap.notes || 'no notes'}`,
    ref: snap.ref
  });
  go('cart');
}

function designerWhatsApp() {
  const s = designerSnapshot();
  return waUrl(`Hi Driftwear Clo., I want a custom T-shirt quote.\nReference: ${s.ref}\nProduct: ${s.product}\nColor: ${s.color}\nSize: ${s.size}\nQuantity: ${s.quantity}\nPreview side: ${s.side}\nPrint location: ${s.location}\nPrint size: ${s.printSize}\nText: ${s.text || 'None'}\nFont: ${s.font}\nArtwork uploaded in preview: ${s.hasArtwork ? 'Yes' : 'No'}\nLayer position: X ${s.position.x}, Y ${s.position.y}\nScale: ${s.scale}%\nRotation: ${s.rotation} degrees\nEstimated price: ${money(s.estimate)}\nCustomer notes: ${s.notes || 'None'}\nPricing note: estimate until confirmed by Driftwear Clo.`);
}

function renderCart() {
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById('page-cart').innerHTML = `
    <section class="page-hero compact"><p class="eyebrow">Cart</p><h1>Your order preview.</h1></section>
    <section class="shop-layout">
      <div>
        ${state.cart.length ? state.cart.map((item, index) => `
          <article class="product-card card-pad">
            <div class="cart-line">
              <img src="${item.image}" alt="${item.name}" style="width:90px;height:110px;object-fit:cover;border-radius:8px" />
              <div><h3>${item.name}</h3><p>${item.color} / ${item.size} / ${item.custom ? 'Customized product' : 'Standard product'}</p><small>${item.notes || 'No notes'} / Ref ${item.ref}</small></div>
              <div><label>Qty <input type="number" min="1" value="${item.quantity}" onchange="updateCartQty(${index}, this.value)" /></label><button class="ghost-btn" onclick="removeCartItem(${index})">Remove</button></div>
            </div>
          </article>`).join('') : '<div class="policy-card card-pad"><h2>Your shopping cart is empty.</h2><button class="primary-btn" data-page-link="shop">Browse products</button></div>'}
      </div>
      <aside class="filters">
        <h2>Summary</h2>
        <p>Subtotal: <strong>${money(subtotal)}</strong></p>
        <p>Delivery estimate is confirmed after district and quantity review.</p>
        <label>Discount code <input placeholder="Optional" /></label>
        <button class="primary-btn" ${state.cart.length ? 'data-page-link="checkout"' : ''}>Checkout</button>
        <a class="whatsapp-btn full" target="_blank" rel="noopener" href="${waUrl(cartMessage())}">Confirm via WhatsApp</a>
      </aside>
    </section>
  `;
}

function updateCartQty(index, qty) {
  state.cart[index].quantity = Math.max(1, Number(qty));
  saveCart();
  renderCart();
}

function removeCartItem(index) {
  state.cart.splice(index, 1);
  saveCart();
  renderCart();
}

function cartMessage() {
  if (!state.cart.length) return 'Hi Driftwear Clo., I want to discuss a custom T-shirt order.';
  return `Hi Driftwear Clo., please confirm this order:\n${state.cart.map((item) => `- ${item.name}, ${item.color}, ${item.size}, qty ${item.quantity}, ref ${item.ref}`).join('\n')}`;
}

function renderCheckout() {
  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById('page-checkout').innerHTML = `
    <section class="page-hero compact"><p class="eyebrow">Checkout</p><h1>Delivery and confirmation.</h1></section>
    <section class="split-section section">
      <form id="checkoutForm" class="form-card">
        <label>Full name <input required name="name" /></label><label>Phone <input required name="phone" /></label><label>Email <input type="email" name="email" /></label>
        <label>Address <textarea required name="address"></textarea></label><label>City <input required name="city" /></label><label>District <input required name="district" /></label><label>Postal code <input name="postal" /></label>
        <label>Delivery method <select name="delivery"><option>Islandwide delivery</option><option>Pickup in Galle</option></select></label>
        <label>Payment method <select name="payment"><option>Cash on delivery</option><option>Bank transfer</option><option>Pay at pickup</option></select></label>
        <label>Order notes <textarea name="notes"></textarea></label><label class="check-row"><input required type="checkbox" /> I agree to the terms and conditions.</label>
        <button class="primary-btn" type="submit">Place order request</button>
      </form>
      <div class="summary-box"><span>Total estimate</span><strong>${money(total)}</strong><p>No real payment gateway is connected. Driftwear Clo. confirms payment instructions after reviewing the order.</p></div>
    </section>
  `;
  document.getElementById('checkoutForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const ref = `DWC-${Date.now().toString().slice(-6)}`;
    sessionStorage.setItem('last-order-ref', ref);
    state.cart = [];
    saveCart();
    go('success');
  });
}

function renderSuccess() {
  const ref = sessionStorage.getItem('last-order-ref') || `DWC-${Date.now().toString().slice(-6)}`;
  document.getElementById('page-success').innerHTML = `<section class="contact-cta"><p class="eyebrow">Order Success</p><h2>Order request received.</h2><p>Reference: <strong>${ref}</strong></p><div class="button-row"><a class="whatsapp-btn" target="_blank" rel="noopener" href="${waUrl(`Hi Driftwear Clo., please confirm my order reference ${ref}.`)}">WhatsApp confirmation</a><button class="secondary-btn" data-page-link="shop">Continue shopping</button></div></section>`;
}

function renderDynamicPage(page) {
  if (page === 'shop') renderShop();
  if (page === 'product') renderProduct();
  if (page === 'cart') renderCart();
  if (page === 'checkout') renderCheckout();
  if (page === 'success') renderSuccess();
}

function renderStaticPages() {
  document.getElementById('page-dtf').innerHTML = `<section class="page-hero compact"><p class="eyebrow">DTF Printing Services</p><h1>Artwork to film, powder, cure, press and inspect.</h1></section><section class="section"><div class="steps">${['Artwork preparation','Film printing','Powder application','Curing','Heat pressing','Quality inspection'].map((step, i) => `<article><b>${String(i+1).padStart(2,'0')}</b><h3>${step}</h3><p>Editable process note for DTF printing, artwork resolution, dimensions, print locations, washing instructions and turnaround time.</p></article>`).join('')}</div></section>`;
  document.getElementById('page-bulk').innerHTML = `<section class="page-hero compact"><p class="eyebrow">Bulk Orders</p><h1>Businesses, teams, schools, events and campaigns.</h1></section><section class="section split-section"><form id="bulkForm" class="form-card">${['Customer name','Phone','Email','Organization','T-shirt type','Quantity','Colors','Sizes','Print positions','Required date','Additional notes'].map((name) => `<label>${name} ${name === 'Additional notes' ? '<textarea required></textarea>' : `<input ${['Customer name','Phone','Quantity'].includes(name) ? 'required' : ''} ${name === 'Required date' ? 'type="date"' : ''} />`}</label>`).join('')}<label>Artwork upload <input type="file" accept="image/*,.pdf,.svg" /></label><button class="primary-btn" type="submit">Request a Bulk Quote</button><a class="whatsapp-btn full" href="${waUrl('Hi Driftwear Clo., I need a bulk order quote.')}" target="_blank" rel="noopener">WhatsApp bulk order</a></form><div><h2>Bulk-ready apparel.</h2><p>Use this form for staff uniforms, sports jerseys, school and class T-shirts, clubs, event apparel and promotional campaigns.</p></div></section>`;
  document.getElementById('page-gallery').innerHTML = `<section class="page-hero compact"><p class="eyebrow">Our Work / Gallery</p><h1>Process, customer orders, packaging and print textures.</h1></section><section class="section"><div class="feature-list">${['Custom Designs','Bulk Orders','Streetwear','Event T-Shirts','Printing Process','Customer Orders'].map((x) => `<span>${x}</span>`).join('')}</div><div class="masonry">${galleryImages.map((image, i) => `<img src="${image}" alt="Gallery item ${i+1}" />`).join('')}</div></section>`;
  document.getElementById('page-about').innerHTML = `<section class="page-hero compact"><p class="eyebrow">About Us</p><h1>Galle-based custom clothing and DTF printing.</h1></section><section class="section split-section"><div><h2>Brand story</h2><p>Driftwear Clo. is a Galle-based custom clothing and DTF printing brand focused on helping individuals, teams and businesses express their identity through high-quality apparel.</p><p>The brand combines creative design, modern printing technology and reliable customer service to produce apparel that feels personal, bold and wearable.</p><p class="price-note">Editable placeholders: founding year, team size, machinery model and production capacity are intentionally not invented.</p></div><img src="assets/tshirt_model_urban_black.jpg" alt="Driftwear streetwear model" /></section>`;
  document.getElementById('page-size-guide').innerHTML = `<section class="page-hero compact"><p class="eyebrow">Size Guide</p><h1>Confirm fit before print approval.</h1></section><section class="section"><div class="table-wrap"><table><thead><tr><th>Size</th><th>Chest</th><th>Length</th><th>Notes</th></tr></thead><tbody>${['S','M','L','XL','XXL'].map((s) => `<tr><td>${s}</td><td>Editable placeholder</td><td>Editable placeholder</td><td>Confirm with garment supplier before launch.</td></tr>`).join('')}</tbody></table></div></section>`;
  document.getElementById('page-contact').innerHTML = `<section class="page-hero compact"><p class="eyebrow">Contact</p><h1>Start a custom order.</h1></section><section class="split-section section"><form id="contactForm" class="form-card"><label>Name <input required /></label><label>Phone <input required /></label><label>Email <input type="email" /></label><label>Message <textarea required></textarea></label><button class="primary-btn" type="submit">Send message</button></form><div><h2>Driftwear Clo.</h2><p>${site.address}<br>${site.phone}<br>${site.email}</p><a class="whatsapp-btn" href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener">Order via WhatsApp</a></div></section>`;
  document.getElementById('page-privacy').innerHTML = `<section class="page-hero compact"><p class="eyebrow">Privacy Policy</p><h1>Customer data usage.</h1></section><section class="section policy-card card-pad"><p>Editable policy placeholder. Replace with legal-reviewed privacy terms before public launch. The static demo stores temporary cart and customization information in localStorage only.</p></section>`;
  document.getElementById('page-terms').innerHTML = `<section class="page-hero compact"><p class="eyebrow">Terms and Conditions</p><h1>Order approval and production terms.</h1></section><section class="section policy-card card-pad"><p>Editable terms placeholder. Replace with legal-reviewed order, return, artwork approval, delivery and payment terms before public launch.</p></section>`;
  document.getElementById('page-admin').innerHTML = `<section class="page-hero compact"><p class="eyebrow">Admin Dashboard</p><h1>Secure admin-dashboard-ready UI.</h1></section><section class="section"><div class="admin-grid">${['Dashboard overview','Orders','Custom design requests','Artwork files','Products','Categories','Inventory','Bulk quote requests','Customers','Gallery','Videos','Testimonials','Homepage content','Coupons','Delivery settings','Website settings'].map((x) => `<article class="admin-card"><h3>${x}</h3><p>Mock management panel ready for Supabase authentication and CRUD integration.</p></article>`).join('')}</div><div class="table-wrap" style="margin-top:24px"><table><thead><tr><th>Order</th><th>Status</th><th>Customer</th><th>Action</th></tr></thead><tbody>${['New','Awaiting Artwork','Design in Progress','Awaiting Approval','Approved','Printing','Ready','Shipped','Completed','Cancelled'].map((s, i) => `<tr><td>DWC-${1000+i}</td><td>${s}</td><td>Mock customer</td><td>Review uploaded artwork</td></tr>`).join('')}</tbody></table></div></section>`;

  ['bulkForm','contactForm','homeBulkForm'].forEach((id) => {
    const form = document.getElementById(id);
    if (form) form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      let status = form.querySelector('.form-status');
      if (!status) {
        status = document.createElement('p');
        status.className = 'form-status price-note';
        status.setAttribute('role', 'status');
        form.append(status);
      }
      status.textContent = 'Request captured in this static demo. Connect Supabase or email delivery before production.';
    });
  });
}

function injectStructuredData() {
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer }
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Driftwear Clo. demo products',
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.name,
          description: product.shortDescription,
          image: product.images[0],
          offers: {
            '@type': 'Offer',
            priceCurrency: 'LKR',
            price: product.price,
            availability: 'https://schema.org/InStock'
          }
        }
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: ['Home', 'Shop', 'Designer', 'DTF Printing', 'Bulk Orders', 'Gallery', 'Contact'].map((name, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name,
        item: `${site.website}#${name.toLowerCase().replaceAll(' ', '-')}`
      }))
    }
  ];
  data.forEach((entry) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(entry);
    document.head.append(script);
  });
}

function waUrl(message) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

function setupMiniDesigner() {
  const miniColor = document.getElementById('miniColor');
  const miniTextInput = document.getElementById('miniTextInput');
  const update = () => {
    document.getElementById('miniShirt').style.background = colorValue(miniColor.value);
    document.getElementById('miniText').textContent = miniTextInput.value || 'WEAR YOUR VIBE';
  };
  miniColor.addEventListener('input', update);
  miniTextInput.addEventListener('input', update);
  document.getElementById('miniUpload').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) document.getElementById('miniArtwork').src = URL.createObjectURL(file);
  });
  document.getElementById('miniAddCart').addEventListener('click', () => {
    addCartItem({ productId: 'custom-mini', name: 'Homepage custom T-shirt preview', image: 'assets/tshirt_black_oversized.jpg', size: 'M', color: miniColor.value, quantity: 1, price: 3200, custom: true, notes: miniTextInput.value });
    go('cart');
  });
  update();
}

function toggleFaq(index) {
  document.querySelectorAll('.faq-item')[index].classList.toggle('open');
}

function setupSearch() {
  const panel = document.getElementById('searchPanel');
  document.querySelector('[data-open-search]').addEventListener('click', () => panel.classList.add('open'));
  document.querySelector('[data-close-search]').addEventListener('click', () => panel.classList.remove('open'));
  document.getElementById('globalSearch').addEventListener('input', (event) => {
    const q = event.target.value.toLowerCase();
    document.getElementById('searchResults').innerHTML = products.filter((p) => `${p.name} ${p.category}`.toLowerCase().includes(q)).slice(0, 8).map((p) => `<button class="secondary-btn" onclick="openProduct('${p.id}')">${p.name}</button>`).join('') || '<p>No matches yet.</p>';
  });
}

function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (sessionStorage.getItem('driftwear-seen-preloader')) {
    preloader.classList.add('hidden');
    return;
  }
  let pct = 0;
  const timer = setInterval(() => {
    pct += 7;
    document.getElementById('loadPct').textContent = `${Math.min(pct, 100)}%`;
    document.getElementById('loadBar').style.width = `${Math.min(pct, 100)}%`;
    if (pct >= 100) {
      clearInterval(timer);
      sessionStorage.setItem('driftwear-seen-preloader', 'true');
      setTimeout(() => preloader.classList.add('hidden'), 220);
    }
  }, 35);
}

function setupGlobalEvents() {
  document.body.addEventListener('click', (event) => {
    const link = event.target.closest('[data-page-link]');
    if (link) {
      event.preventDefault();
      go(link.dataset.pageLink);
    }
  });
  document.getElementById('menuToggle').addEventListener('click', () => {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('open');
    document.getElementById('menuToggle').setAttribute('aria-expanded', String(menu.classList.contains('open')));
  });
  document.getElementById('backToTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.getElementById('videoModalBtn').addEventListener('click', () => document.getElementById('videoModal').classList.add('open'));
  document.getElementById('closeVideo').addEventListener('click', () => document.getElementById('videoModal').classList.remove('open'));

  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const header = document.getElementById('siteHeader');
    header.classList.toggle('scrolled', window.scrollY > 20);
    header.classList.toggle('hide', window.scrollY > lastY && window.scrollY > 180);
    lastY = window.scrollY;
  });

  if (matchMedia('(pointer:fine)').matches) {
    const cursor = document.getElementById('cursorFollower');
    window.addEventListener('mousemove', (event) => {
      cursor.style.opacity = '1';
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    });
    const heroVisual = document.getElementById('heroVisual');
    document.querySelector('.hero').addEventListener('mousemove', (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - .5) * 16;
      const y = ((event.clientY - rect.top) / rect.height - .5) * -12;
      heroVisual.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });
    document.querySelector('.hero').addEventListener('mouseleave', () => {
      heroVisual.style.transform = '';
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderHome();
  renderStaticPages();
  renderProduct();
  renderCart();
  renderCheckout();
  renderSuccess();
  setupFilters();
  setupDesigner();
  setupMiniDesigner();
  setupSearch();
  setupGlobalEvents();
  saveCart();
  injectStructuredData();
  initPreloader();
  renderShop();
  const initialPage = new URLSearchParams(window.location.search).get('page');
  if (initialPage && document.getElementById(`page-${initialPage}`)) {
    go(initialPage);
  }
});
