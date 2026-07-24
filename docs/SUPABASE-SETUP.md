# Supabase Setup

The current site is static and Supabase-ready only. No Supabase client is connected.

Suggested tables:

- `products`: product catalog, prices, flags, colors, sizes and media URLs
- `orders`: checkout requests, customer details, delivery method, payment method and status
- `order_items`: standard and customized cart items
- `custom_designs`: artwork references, print positions, notes, approval status and estimate
- `bulk_quotes`: organization, quantity, garment type, sizes, colors, required date and notes
- `gallery_items`: image/video URLs, category filters and featured status
- `testimonials`: verified customer reviews only
- `site_settings`: editable contact details, homepage banners and section toggles

Add authentication and row-level security before enabling the admin dashboard.
