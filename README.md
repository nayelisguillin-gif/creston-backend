# 🐔 Crestón - Asistente de Salud Mental
## Guía de Instalación y Despliegue

---

## ¿Qué necesitas?
- Cuenta gratuita en **Render.com** (para subir la app)
- Tu **API Key de Anthropic** (de console.anthropic.com)
- La imagen de Crestón como `creston.jpeg` dentro de la carpeta `public/`

---

## PASO 1 – Prepara los archivos

Estructura de tu carpeta:
```
creston-app/
├── server.js
├── package.json
└── public/
    ├── index.html
    ├── manifest.json
    ├── sw.js
    └── creston.jpeg   ← Pon aquí la foto de Crestón
```

---

## PASO 2 – Sube a GitHub

1. Ve a **github.com** y crea una cuenta gratis si no tienes.
2. Haz clic en **"New repository"** → nómbralo `creston-app`
3. Marca **"Public"** → clic en **"Create repository"**
4. En la página del repositorio, clic en **"uploading an existing file"**
5. **Arrastra todos los archivos** de tu carpeta `creston-app` (incluyendo la subcarpeta `public`)
6. Clic en **"Commit changes"** → ✅ ¡Ya están en GitHub!

---

## PASO 3 – Despliega en Render.com (GRATIS)

1. Ve a **render.com** y crea una cuenta gratis
2. Clic en **"New +"** → **"Web Service"**
3. Conecta tu cuenta de GitHub → selecciona el repositorio `creston-app`
4. Configura:
   - **Name:** creston-salud-mental
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free
5. Clic en **"Advanced"** → **"Add Environment Variable"**:
   - Key: `ANTHROPIC_API_KEY`
   - Value: (pega aquí tu API key de Anthropic)
6. Clic en **"Create Web Service"**

⏳ Espera 2-3 minutos → Render te dará una URL como:
`https://creston-salud-mental.onrender.com`

---

## PASO 4 – Instalar como App en el celular

### En Android (Chrome):
1. Abre la URL de tu app en Chrome
2. Aparecerá un banner → **"Agregar a pantalla de inicio"**
3. Si no aparece: menú (⋮) → **"Agregar a pantalla de inicio"** → **"Instalar"**
4. ¡Crestón aparecerá como app en tu pantalla!

### En iPhone (Safari):
1. Abre la URL en Safari
2. Toca el botón de **Compartir** (cuadrado con flecha ↑)
3. Desplázate → **"Agregar a pantalla de inicio"**
4. Escribe "Crestón" → **"Agregar"**

---

## ¿Cómo funciona?

- 🤖 **IA real:** Cada respuesta viene de Claude (Anthropic) a través de tu API key
- 🔊 **Voz de niño:** Usa el sintetizador de voz del celular con tono agudo
- 🎤 **Micrófono:** Puedes hablarle a Crestón directamente
- 🌟 **Actividades:** Crestón propone talleres según tu situación emocional
- 📱 **App descargable:** Funciona como app nativa (PWA)

---

## Notas importantes

- El plan **gratis de Render** "duerme" la app si no se usa en 15 minutos
  - La primera carga puede tardar ~30 segundos al despertar
  - Para evitar esto, puedes usar el plan **Starter** ($7/mes)
- La API de Anthropic tiene costo por uso (muy económico para uso personal)
- La voz funciona mejor con Chrome en Android

---

¿Problemas? Verifica que tu `ANTHROPIC_API_KEY` esté bien escrita en Render.
