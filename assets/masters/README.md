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

## aerial-town-square-master.mp4

The ungraded 8 s, 1280×720 veo-3.1-fast render used for the Venue section
(`#venue`). Kept here because re-running the model costs money and will not
return this same clip.

`public/video/aerial.mp4` is derived from it: audio stripped, and the clip
concatenated with a reversed copy so the forward drone push wraps without a
visible jump (a hard cut back to frame 1 is obvious on a 16 s loop).

```bash
ffmpeg -i aerial-town-square-master.mp4 -an \
  -filter_complex "[0:v]split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1[out]" \
  -map "[out]" -c:v libx264 -preset slow -crf 32 -pix_fmt yuv420p \
  -movflags +faststart -r 24 ../../public/video/aerial.mp4

# Poster must be the loop's FIRST frame, or the still-to-video hand-off jumps.
ffmpeg -i ../../public/video/aerial.mp4 -frames:v 1 /tmp/first.png
convert /tmp/first.png -quality 82 ../../public/photo/aerial-poster.webp
```

**Not Lockhart.** This is a generated composite of a generic Texas county-seat
square, not the Caldwell County Courthouse. It must not be captioned as
Lockhart; replace it with the organiser's own drone footage or a licensed
clip before launch.
