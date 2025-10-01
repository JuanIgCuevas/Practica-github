# Practica-github (fdsw-github)

Portafolio personal de Juan Ignacio Cuevas. Sitio estático con Bootstrap, servido localmente con Python y desplegado automáticamente en GitHub Pages.

## Tecnologías usadas hasta el momento

- HTML5 (estructura en `index.html`).
- CSS3 (estilos propios en `assets/css/estilos.css`).
- Bootstrap 5.1.3 vía CDN (CSS y JS de `cdn.jsdelivr.net`).
- Google Fonts (familia Raleway) vía CDN.
- Font Awesome 5.9.0 vía CDN (iconos).
- Imágenes locales en `assets/img/`.
- Python 3 (módulo estándar `http.server`) para servidor local de desarrollo.
- VS Code Tasks (archivo `.vscode/tasks.json`) para iniciar el servidor con un clic.

## Estructura del proyecto

```
src/
  index.html
  assets/
    css/
      estilos.css
    img/
      ...
.vscode/
  tasks.json
.github/
  workflows/
    deploy-pages.yml
```

## Cómo correr el proyecto (sin Live Server)

Opción A — abrir el archivo directamente:

- Doble clic a `src/index.html` o desde PowerShell:

```powershell
start .\src\index.html
```

Opción B — servidor local con Python (recomendado):

1) Abre una terminal en la carpeta del proyecto (`c:\Users\User\Documents\GitHub\Practica-github`).
2) Ejecuta:

```powershell
py -m http.server 5500 --directory src
```

3) Visita: http://localhost:5500/

- Para detener el servidor: vuelve a la terminal y presiona Ctrl + C.
- Si el puerto 5500 está en uso, prueba otro (por ejemplo, 5501):

```powershell
py -m http.server 5501 --directory src
```

Opción C — usando la tarea de VS Code (ya incluida):

- Menú Terminal > Run Task… > "Start Python HTTP server (5500)". La tarea ya está configurada para servir desde `src`.
- Para detenerla: Terminal > Terminate Task.

## Notas

- Bootstrap, Google Fonts y Font Awesome se cargan desde CDNs; requiere conexión a Internet para verlos correctamente.
- No hay pasos de build: es un sitio estático, listo para abrirse o servirse.

## Despliegue a GitHub Pages (automatizado)

Este repo incluye un workflow de GitHub Actions que despliega automáticamente a Pages en cada push a `main`.

Badge de estado:

![Deploy to GitHub Pages](https://github.com/JuanIgCuevas/Practica-github/actions/workflows/deploy-pages.yml/badge.svg)

Primer uso — habilitar GitHub Pages:

1) En GitHub, ve a Settings → Pages.
2) En "Build and deployment" elige "GitHub Actions" como Source.
3) Guarda. El workflow `Deploy to GitHub Pages` se encargará del resto en cada push a `main`.

URL del sitio (cuando publique):
- https://JuanIgCuevas.github.io/Practica-github/

Sugerencias:
- Evita rutas absolutas que comiencen con `/`. Este proyecto usa rutas relativas (`assets/...`), así que funciona bien bajo `/Practica-github/`.
- Si en algún momento usas rutas absolutas, considera agregar `<base href="/Practica-github/">` en el `<head>` o cambiar a rutas relativas.
- Si configuras un dominio personalizado, agrega un archivo `CNAME` en la raíz con tu dominio.

Notas del flujo:
- El workflow sube el contenido de la carpeta `src` tal cual a Pages.
- Mantén rutas relativas para que funcione bajo `/Practica-github/`.
