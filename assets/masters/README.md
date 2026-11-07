# Print masters

Full-resolution originals, kept out of `public/` so they are never shipped to
a browser. The site serves 1600px derivatives from `public/photo/`; these are
here for reuse at size — banners, signage, posters, print, paid social.

All six generated with FLUX 3 at 4:5 portrait, 4K (3664 × 4576).

| File | Subject |
|---|---|
| `card-bloodymary-4k.webp` | Bloody Mary Full Dress |
| `card-dessert-4k.webp` | Dessert Full Dress (pecan pie) |
| `card-showmanship-4k.webp` | Cook Site Showmanship |
| `card-brisket-4k.webp` | Brisket category |
| `card-ribs-4k.webp` | Pork Ribs category |
| `card-chicken-4k.webp` | Chicken category |

Shipping these directly would cost roughly 3x the bytes for pixels no display
can resolve at card size, and DESIGN.md §9 requires Lighthouse mobile
performance of 90 or better. Regenerate derivatives with:

    convert assets/masters/card-<name>-4k.webp -resize 1600x \
      -quality 88 -define webp:method=6 public/photo/card-<name>.webp
