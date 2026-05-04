# Async Studio — Website

Brand presence website for [Async Studio](https://asyncstudio.be), an independent game development studio founded in belgium and building games at the intersection of genres.

## Stack

Pure HTML, CSS, and JavaScript. No build process, no dependencies, no framework.

## Regenerating the OG image

The `og-image.png` is generated from `og-image.svg` using `rsvg-convert`:

```bash
rsvg-convert -w 1200 -h 630 assets/img/og-image.svg -o assets/img/og-image.png
```

Same for the LinkedIn logo:

```bash
rsvg-convert -w 500 -h 500 assets/img/logo-linkedin.svg -o assets/img/logo-linkedin.png
```
