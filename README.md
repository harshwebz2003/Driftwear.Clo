# Driftwear Clo. Static Website

Premium static redesign for Driftwear Clo., a Galle-based custom DTF clothing printing business.

## What is included

- Responsive multi-page single HTML app
- Home, shop, designer, DTF services, product details, bulk orders, gallery, about, size guide, contact, cart, checkout, success, privacy, terms and admin-ready UI
- LocalStorage cart persistence
- Interactive T-shirt preview with color, text, upload, size, print position, quantity and WhatsApp submission
- Editable demo product data in `script.js`
- Business configuration reference in `config/site.ts`
- Asset generation and integration docs in `docs/`

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static server.

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Important production notes

- Demo testimonials are marked in `script.js` and must be replaced with verified customer reviews before public launch.
- Prices, GSM, fabric composition, stock and delivery timing are editable placeholders until confirmed by Driftwear Clo.
- No payment gateway is connected.
- Admin screens are mock UI only. Connect authentication and database rules before using them operationally.
