# RAÍZ — Restauración de Muebles

Landing page institucional para RAÍZ, estudio de restauración de muebles.

## Estructura del proyecto

```
raiz/
├── index.html          # Página principal
├── style.css           # Estilos globales
├── script.js           # Interacciones (navbar, flip cards, typewriter, fade-up)
├── assets/
│   └── images/         # Agregar aquí las fotografías
└── README.md
```

## Cómo agregar imágenes

Los placeholders en el HTML tienen clases como `.hero-img-placeholder`,
`.service-card-img`, `.project-card-img`, etc.
Reemplazalos con etiquetas `<img>`:

```html
<img src="assets/images/nombre.jpg" alt="Descripción" style="width:100%; height:100%; object-fit:cover;">
```

## Publicar en GitHub Pages

1. Subí el repositorio a GitHub
2. Settings → Pages → Source: rama `main`, carpeta `/ (root)`
3. El sitio queda en `https://tu-usuario.github.io/raiz/`

## Tipografías (Google Fonts)

- **Raleway** — 300, 400, 500, 700, 900
- **Cormorant Garamond** — 400, 500, 600 (regular e italic)

## Paleta de colores

| Token        | Hex       |
|--------------|-----------|
| Cream        | `#efece3` |
| Cream dark   | `#e3d6c5` |
| Sage         | `#8b937e` |
| Rust         | `#984516` |
| Walnut       | `#6f533b` |
| Espresso     | `#392f28` |
| Near black   | `#21191a` |
