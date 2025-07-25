# ⚙🎬 Tu Catálogo (Hub personalizable de pelis y series)

[![Tu Catálogo](https://img.shields.io/badge/Status-In_Progress-yellow)](https://github.com/Jorge-coder02/tu-catalogo-frontend)
[![Licencia](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

🔗 **Visitar:** [Ver en vivo](https://tucatalogohub.up.railway.app/)

## 🚀 Tecnologías Principales
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-06B6D4?logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-20.14.0-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18.2-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0.8-47A248?logo=mongodb&logoColor=white)

## ✨ Características Destacadas
- ✅ Datos obtenidos a partir de APIs (OMDb y TMDB)
- ✅ Gestión de estados con Redux (RTK)
- ✅ Autenticación de usuarios con JWT
- ✅ Rutas y acciones protegidas para usuarios autenticados
- ✅ Rutas dinámicas con React Router (página generada para cada película)
- ✅ Loading spinner de carga en peticiones a BBDD y API
- ✅ Diseño responsive con Tailwind CSS

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Jorge-coder02/tu-catalogo-frontend.git
cd tu-catalogo-frontend
```

2. **Instalar dependencias**
 ```bash
 npm install
```
o si usas Yarn
```bash
yarn install
 ```

3. **Ejecutar en modo desarrollo**
  ```bash
  npm run dev
  ```
  ## El servidor estará disponible en:
  ## http://localhost:3000


## 🗂️ Estructura del Proyecto

```plaintext
📦 root
├── 📁 public/
│   ├── 📁 images/         # Imágenes globales
│
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 header/     # Componentes de cabecera
│   │   └── 📁 ui/         # Componentes reutilizables (UI)
│   │
│   ├── 📁 features/       # Lógica específica por funcionalidad
│   ├── 📁 hooks/          # Hooks personalizados
│   ├── 📁 pages/          # Vistas principales (React Router)
│   ├── 📁 routes/         # Definición de rutas
│   ├── 📁 services/       # Llamadas a APIs y lógica externa
│   ├── 📁 store/          # Estado global (Redux)
│   └── 📁 utils/          # Funciones utilitarias
│
├── 📄 App.jsx             # Componente raíz de la app
├── ⚙️ .env.local          # Variables de entorno (gitignored)
├── 🎨 tailwind.config.js  # Configuración de Tailwind CSS
└── 📜 README.md           # Documentación del proyecto

```


# Versiones

- React: 19.1.0
- Tailwind CSS: 2.2.19
- React Router: 7.3.0

## Dependencias

- radix-ui: `2.1.15`
- lucide-react: `0.525.0`
- styled-components: `6.1.19`
- react-redux: `9.2.0`
- redux-toolkit: `2.8.2`

## Dependencias de desarrollo:

- eslint: `9.30.1`
- postcss: `8.5.6`
- vite: `7.0.4`
