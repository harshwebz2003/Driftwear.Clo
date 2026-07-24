# Cloudinary Setup

The current upload controls use browser previews only. They do not upload to Cloudinary yet.

Recommended folders:

- `driftwear/products`
- `driftwear/gallery`
- `driftwear/customer-artwork`
- `driftwear/videos`
- `driftwear/posters`

Use unsigned upload presets only for low-risk public uploads with strict validation. For production artwork uploads, route through an authenticated backend, validate file type and size, then store the resulting secure URL in Supabase.
