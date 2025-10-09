# Practica-github - Portafolio

Sitio estático (HTML/CSS/Bootstrap) dentro de `src/`.

## Requisitos
- Windows con navegador moderno (Chrome, Edge, Firefox).
- Python 3 instalado (en Windows normalmente se usa el lanzador `py`).
- Opcional: VS Code (este repo ya trae una tarea para levantar un servidor local).

## Estructura
```
src/
  index.html
  css/
    estilos.css
  assets/
    img/
      Juani.jpg
      Prueba.jpg
```

## Cómo correrlo (opción 1: desde VS Code)
Hay una tarea lista: “Start Python HTTP server (5500)”.

1) Abrí la carpeta del repo en VS Code.
2) Menú Terminal → Run Task… (Ejecutar Tarea…) → “Start Python HTTP server (5500)”.
3) Abrí el navegador en: http://localhost:5500/
4) Para detener el servidor, volvé a la terminal de la tarea y presioná `Ctrl + C`.

## Cómo correrlo (opción 2: manual en PowerShell)
1) Abrí PowerShell en la carpeta del repo (la que contiene `src/`).
2) Ejecutá:

```powershell
py -m http.server 5500 --directory src
```

3) Abrí el navegador en: http://localhost:5500/
4) Para frenar, presioná `Ctrl + C` en la terminal.

## Notas y solución de problemas
- Si el puerto 5500 está ocupado, probá con otro (ej.: 5501) y abrí la URL correspondiente:
  ```powershell
  py -m http.server 5501 --directory src
  ```
- Si Windows Firewall pregunta, permití el acceso para que el servidor funcione en `localhost`.
- Editá el sitio dentro de `src/` (por ejemplo, `src/index.html` y `src/css/estilos.css`). Al guardar, actualizá el navegador para ver cambios.

## Deploy rápido (opcional)
Al ser un sitio estático, podés publicarlo en GitHub Pages sin mover nada, usando la carpeta `src/` como raíz del sitio.

### Opción recomendada: usar `src/` en GitHub Pages con Actions (sin mover archivos)
Este repo incluye un workflow de GitHub Actions (`.github/workflows/deploy-pages.yml`) que publica automáticamente el contenido de `src/` en GitHub Pages cada vez que hagas push a `main`.

Pasos:
1) Hacé push de tus cambios a `main`.
2) En GitHub: Settings → Pages.
  - En “Build and deployment”, seleccioná “GitHub Actions”.
3) Esperá 1–3 minutos a que el workflow termine.
4) La URL será:
  - https://juanigcuevas.github.io/Practica-github/
5) Si algo no carga, forzá recarga (Ctrl+F5) o probá en una ventana privada (Pages a veces cachea).

### Opción alternativa: mover todo al raíz del repo
Si preferís que la raíz del repo sea el sitio (Pages con carpeta `/`), hay que:
- Mover `src/index.html` a `/index.html`.
- Mover `src/css/` a `/css/` y `src/assets/` a `/assets/`.
- Ajustar la tarea de VS Code para servir desde la raíz o ejecutar `py -m http.server 5500` sin `--directory`.

Decime y lo automatizo en este repo (haría los movimientos y actualizaría la tarea de VS Code y este README).

---
Cualquier duda o mejora, ¡abrí un issue o PR!
