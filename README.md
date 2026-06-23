# RAÍZ — Landing Page

## Estructura de archivos
```
raiz/
├── index.html
├── README.md
└── assets/
    ├── style.css
    ├── script.js
    └── images/
        ├── hero-01.jpg … hero-04.jpg        (marquee del hero)
        ├── service-01.jpg … service-03.jpg   (sección Servicio)
        ├── proj-01.jpg … proj-06.jpg         (sección Proyectos)
        ├── course-01.jpg … course-04.jpg     (sección Cursos)
        ├── tex-mesa.png … tex-vetas.png      (texturas sección Servicio)
        └── num-1.png … num-3.png             (texturas sección Proceso)
```

## Deploy

### GitHub Pages
1. Subí toda la carpeta a un repositorio público.
2. Settings → Pages → Branch: `main` / root (`/`).

### Netlify / Vercel
Arrastrá la carpeta al dashboard o conectá el repositorio.

### Local
Usar un servidor local — index.html no funciona abriéndolo directamente:
```bash
cd raiz
python3 -m http.server 8080
# abrir http://localhost:8080
```
O en VS Code: extensión **Live Server** → "Open with Live Server".

## Fuentes (requieren internet)
- **Raleway** 300 / 400 / 500 / 700 / 900
- **Cormorant Garamond** 400 / 500 / 600 (regular + italic)
