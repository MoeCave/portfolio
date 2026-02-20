# 🚀 Portfolio de Desarrollador — Next.js

> Portfolio personal desarrollado con Next.js (App Router), Tailwind CSS, Framer Motion, GSAP y Three.js. Muestra proyectos, información personal y un formulario de contacto funcional sin backend propio.

---

## Tabla de Contenidos

1. [Descripción del proyecto](#-descripción-del-proyecto)
2. [Tecnologías usadas](#-tecnologías-usadas)
3. [Requisitos previos](#-requisitos-previos)
4. [Instalación](#-instalación)
5. [Cómo ejecutar en desarrollo](#-cómo-ejecutar-en-desarrollo)
6. [Estructura del proyecto](#-estructura-del-proyecto)
7. [Uso de Tailwind CSS](#-uso-de-tailwind-css)
8. [Uso de Framer Motion](#-uso-de-framer-motion)
9. [Uso de GSAP + ScrollTrigger](#-uso-de-gsap--scrolltrigger)
10. [Uso de Three.js / React Three Fiber](#-uso-de-threejs--react-three-fiber)
11. [Formulario de contacto](#-formulario-de-contacto)
12. [Scripts disponibles](#-scripts-disponibles)
13. [Deploy en Vercel](#-deploy-en-vercel)

---

## 📋 Descripción del proyecto

Este proyecto es un **portfolio personal** diseñado para presentar de forma profesional:

- **Proyectos desarrollados**: galería con descripción, tecnologías utilizadas y enlaces al repositorio o demo en vivo.
- **Sobre mí**: sección que presenta mi perfil, habilidades técnicas, experiencia y lo que me apasiona del desarrollo.
- **Formulario de contacto**: formulario funcional que permite a visitantes o clientes potenciales enviar mensajes directamente, sin necesidad de backend propio.

El portfolio está construido con las mejores prácticas modernas de desarrollo frontend: renderizado híbrido con Next.js App Router, estilos utilitarios con Tailwind CSS, animaciones fluidas con Framer Motion y GSAP, y soporte para escenas 3D interactivas mediante Three.js y React Three Fiber.

---

## 🛠 Tecnologías usadas

### Core

| Tecnología | Versión | Descripción |
|---|---|---|
| [Next.js](https://nextjs.org/) | 14+ | Framework de React con App Router, SSR/SSG y optimizaciones integradas |
| [React](https://react.dev/) | 18+ | Librería de UI para construir componentes reutilizables |
| JavaScript (ES2022+) | — | Sin TypeScript de momento, usando JS moderno con JSX |

### Estilos

| Tecnología | Descripción |
|---|---|
| [Tailwind CSS](https://tailwindcss.com/) | Framework de utilidades CSS para diseño rápido y consistente |
| CSS Modules / CSS propio | Para casos especiales donde Tailwind no cubre la necesidad |

### Animaciones

| Tecnología | Descripción |
|---|---|
| [Framer Motion](https://www.framer.com/motion/) | Animaciones declarativas de UI: entradas, fades, hovers y transiciones de página |
| [GSAP](https://gsap.com/) | Animaciones avanzadas basadas en timeline y scroll |
| [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | Plugin de GSAP para sincronizar animaciones con el scroll (parallax, pin, scrub) |

### 3D (opcional, preparado)

| Tecnología | Descripción |
|---|---|
| [Three.js](https://threejs.org/) | Motor 3D WebGL de bajo nivel |
| [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) | Integración declarativa de Three.js con React |
| [@react-three/drei](https://github.com/pmndrs/drei) | Colección de helpers: `OrbitControls`, `Environment`, `Text`, etc. |

### Calidad de código

| Herramienta | Descripción |
|---|---|
| [ESLint](https://eslint.org/) | Linter configurado por defecto en Next.js para mantener código limpio |

### Hosting

| Plataforma | Descripción |
|---|---|
| [Vercel](https://vercel.com/) | Hosting optimizado para Next.js con despliegue automático desde GitHub |

---

## ✅ Requisitos previos

Antes de empezar, asegúrate de tener instalado en tu sistema:

- **Node.js** en su versión LTS (Long Term Support). Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
- **npm** (viene incluido con Node.js) o alternativamente **yarn** / **pnpm**.

Para verificar que están correctamente instalados, ejecuta en tu terminal:

```bash
node -v
# Debería mostrar algo como: v20.x.x

npm -v
# Debería mostrar algo como: 10.x.x
```

Si la versión de Node.js es inferior a la 18, se recomienda actualizarla usando [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager):

```bash
nvm install --lts
nvm use --lts
```

---

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tu-portfolio.git
cd tu-portfolio
```

### 2. Instalar dependencias

```bash
npm install
```

Esto instalará todas las dependencias definidas en `package.json`.

### 3. Verificar dependencias clave (si no están incluidas)

Si las librerías de animaciones y 3D no aparecen en `package.json`, instálalas manualmente:

```bash
# Animaciones
npm install framer-motion gsap

# 3D (opcional)
npm install three @react-three/fiber @react-three/drei
```

### 4. Variables de entorno (si aplica)

Crea un archivo `.env.local` en la raíz del proyecto si necesitas configurar alguna variable de entorno:

```bash
cp .env.example .env.local
```

> ⚠️ El archivo `.env.local` está incluido en `.gitignore` y nunca debe subirse al repositorio.

---

## ▶️ Cómo ejecutar en desarrollo

Una vez instaladas las dependencias, inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre tu navegador y visita:

```
http://localhost:3000
```

El servidor tiene **Hot Module Replacement (HMR)** activado: cualquier cambio en el código se refleja en el navegador automáticamente sin necesidad de recargar la página manualmente.

---

## 📁 Estructura del proyecto

El proyecto sigue la convención de carpeta `src/` junto con el **App Router** de Next.js:

```
tu-portfolio/
├── public/                        # Archivos estáticos (imágenes, favicon, fuentes, etc.)
│   ├── favicon.ico
│   └── og-image.png
│
├── src/
│   ├── app/                       # App Router de Next.js
│   │   ├── layout.js              # Layout global (Navbar, Footer, fuentes, metadata)
│   │   ├── page.js                # Página de inicio (Home)
│   │   ├── globals.css            # Estilos globales e imports de Tailwind
│   │   │
│   │   ├── projects/
│   │   │   └── page.js            # Página de proyectos
│   │   │
│   │   ├── about/
│   │   │   └── page.js            # Página "Sobre mí"
│   │   │
│   │   └── contact/
│   │       └── page.js            # Página de contacto con formulario
│   │
│   └── components/                # Componentes reutilizables
│       ├── Navbar.js              # Barra de navegación principal
│       ├── Footer.js              # Pie de página
│       ├── Hero.js                # Sección hero de la página de inicio
│       ├── ProjectsSection.js     # Grid/lista de tarjetas de proyectos
│       ├── AboutSection.js        # Contenido de la sección "Sobre mí"
│       ├── ContactForm.js         # Formulario de contacto
│       └── Scene3D.js             # Escena Three.js / React Three Fiber (opcional)
│
├── .env.local                     # Variables de entorno locales (no subir a git)
├── .env.example                   # Ejemplo de variables de entorno
├── .eslintrc.json                 # Configuración de ESLint
├── .gitignore
├── next.config.js                 # Configuración de Next.js
├── tailwind.config.js             # Configuración de Tailwind CSS
├── postcss.config.js              # Configuración de PostCSS (requerido por Tailwind)
├── jsconfig.json                  # Alias de rutas (ej: @/components/...)
└── package.json
```

### Convención de alias de rutas

El archivo `jsconfig.json` está configurado con el alias `@/` apuntando a `src/`, lo que permite importar componentes de forma limpia:

```js
// En lugar de esto:
import Navbar from '../../../components/Navbar'

// Puedes escribir esto:
import Navbar from '@/components/Navbar'
```

---

## 🎨 Uso de Tailwind CSS

**Tailwind CSS** es el framework de estilos principal. Se utiliza directamente en el JSX mediante clases utilitarias, sin necesidad de escribir CSS adicional en la mayoría de los casos.

### Ejemplo de uso típico

```jsx
// src/components/Hero.js
export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-6">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
        Hola, soy{' '}
        <span className="text-indigo-400">Tu Nombre</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-400 max-w-2xl text-center mb-8">
        Desarrollador Frontend apasionado por crear experiencias web únicas.
      </p>
      <a
        href="/projects"
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-medium transition-colors duration-300"
      >
        Ver mis proyectos
      </a>
    </section>
  )
}
```

### Clases más utilizadas en el proyecto

- **Layout**: `flex`, `grid`, `items-center`, `justify-between`, `gap-x`, `container`, `mx-auto`
- **Espaciado**: `px-`, `py-`, `mt-`, `mb-`, `space-y-`
- **Tipografía**: `text-xl`, `font-bold`, `tracking-tight`, `text-gray-400`
- **Responsive**: `sm:`, `md:`, `lg:`, `xl:` (prefijos de breakpoint)
- **Transiciones**: `transition-all`, `duration-300`, `ease-in-out`
- **Colores**: paleta extendida configurada en `tailwind.config.js`

### CSS propio (casos especiales)

Para animaciones complejas, efectos específicos o estilos que Tailwind no cubre de forma elegante, se puede usar CSS en módulos (`Component.module.css`) o en `globals.css`:

```css
/* src/app/globals.css */
.custom-gradient-text {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 🎬 Uso de Framer Motion

**Framer Motion** se utiliza para animaciones de interfaz: aparición de secciones, efectos hover, transiciones entre páginas y cualquier animación declarativa de componentes React.

### Ejemplo básico: entrada de sección con fade + slide

```jsx
// src/components/AboutSection.js
'use client'

import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-3xl mx-auto py-20 px-6"
    >
      <h2 className="text-4xl font-bold mb-6">Sobre mí</h2>
      <p className="text-gray-400 text-lg leading-relaxed">
        Soy desarrollador frontend con experiencia en React y Next.js...
      </p>
    </motion.div>
  )
}
```

> ⚠️ Los componentes que usan Framer Motion necesitan la directiva `'use client'` al inicio del archivo, ya que son componentes del lado del cliente.

### Animaciones al entrar en el viewport (whileInView)

```jsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.5 }}
>
  {/* Contenido de la tarjeta de proyecto */}
</motion.div>
```

### Efecto hover en tarjetas

```jsx
<motion.div
  whileHover={{ scale: 1.03, y: -4 }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  className="bg-gray-800 rounded-2xl p-6 cursor-pointer"
>
  {/* Tarjeta de proyecto */}
</motion.div>
```

---

## 📜 Uso de GSAP + ScrollTrigger

**GSAP** (GreenSock Animation Platform) se usa para animaciones más avanzadas y complejas vinculadas al scroll: efectos parallax, secciones con pin, animaciones tipo "scroll scrub" donde la animación avanza a medida que el usuario hace scroll.

### Registro del plugin y animación básica

```jsx
// src/components/ParallaxSection.js
'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registrar el plugin (solo una vez, puede hacerse en layout.js también)
gsap.registerPlugin(ScrollTrigger)

export default function ParallaxSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación ligada al scroll: el título sube a medida que se hace scroll
      gsap.fromTo(
        titleRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',   // Inicia cuando el top de la sección llega al 80% del viewport
            end: 'top 30%',     // Termina cuando llega al 30%
            scrub: true,        // La animación se sincroniza con el scroll
          },
        }
      )
    }, sectionRef)

    // Limpieza al desmontar el componente
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center">
      <h2 ref={titleRef} className="text-6xl font-bold">
        Proyectos
      </h2>
    </section>
  )
}
```

### Sección con efecto Pin (la sección se "clava" mientras el contenido cambia)

```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=200%',
      pin: true,          // La sección queda fija mientras el scroll avanza
      pinSpacing: true,
    })
  }, sectionRef)

  return () => ctx.revert()
}, [])
```

> 💡 **Buena práctica**: usa siempre `gsap.context()` para agrupar las animaciones y llama a `ctx.revert()` en el cleanup de `useEffect`. Esto evita fugas de memoria y animaciones duplicadas en el modo de desarrollo con StrictMode.

---

## 🌐 Uso de Three.js / React Three Fiber

**React Three Fiber** permite usar Three.js de forma declarativa dentro de componentes React. El componente `<Canvas>` crea el contexto WebGL y dentro de él se definen los objetos 3D como si fueran JSX.

### Ejemplo mínimo: cubo girando

```jsx
// src/components/Scene3D.js
'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

// Componente del cubo que rota en cada frame
function RotatingCube() {
  const meshRef = useRef(null)

  // useFrame se ejecuta en cada frame del render loop (~60fps)
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.8
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#6366f1" wireframe={false} />
    </mesh>
  )
}

// Componente principal exportado
export default function Scene3D() {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        {/* Iluminación */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Objeto 3D */}
        <RotatingCube />

        {/* Controles de órbita (arrastrar para rotar la cámara) */}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}
```

### Integración en una página

```jsx
// src/app/page.js
import dynamic from 'next/dynamic'

// Importación dinámica para evitar errores de SSR (Three.js necesita el navegador)
const Scene3D = dynamic(() => import('@/components/Scene3D'), { ssr: false })

export default function HomePage() {
  return (
    <main>
      <h1>Mi Portfolio</h1>
      <Scene3D />
    </main>
  )
}
```

> ⚠️ **Importante**: Three.js accede a APIs del navegador (`window`, `canvas`), por lo que **siempre** debe importarse con `dynamic(() => import(...), { ssr: false })` en Next.js para evitar errores durante el renderizado del servidor.

---

## 📬 Formulario de contacto

El formulario de contacto está implementado como un `<form>` HTML estándar que envía los datos directamente a un servicio externo, **sin necesidad de crear un backend propio**.

### Implementación con FormSubmit

[FormSubmit](https://formsubmit.co/) redirige los envíos del formulario a tu correo electrónico de forma gratuita y sin configuración de servidor.

```jsx
// src/components/ContactForm.js
export default function ContactForm() {
  return (
    <form
      action="https://formsubmit.co/tu@email.com"
      method="POST"
      className="flex flex-col gap-4 max-w-xl mx-auto"
    >
      {/* Evitar el CAPTCHA de FormSubmit (opcional) */}
      <input type="hidden" name="_captcha" value="false" />

      {/* Redirigir tras el envío (opcional) */}
      <input type="hidden" name="_next" value="https://tu-portfolio.vercel.app/gracias" />

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          placeholder="Tu nombre"
          className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          placeholder="tu@email.com"
          className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="¿En qué puedo ayudarte?"
          className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium transition-colors duration-300 self-start"
      >
        Enviar mensaje
      </button>
    </form>
  )
}
```

### Alternativas al formulario

| Servicio | Descripción |
|---|---|
| **[FormSubmit](https://formsubmit.co/)** | Sin registro, envía a tu email. Solo configura el `action`. |
| **[Netlify Forms](https://docs.netlify.com/forms/setup/)** | Si el proyecto está desplegado en Netlify, añade `netlify` al `<form>`. |
| **[Formspree](https://formspree.io/)** | Similar a FormSubmit, con dashboard y filtros de spam. |
| **[Web3Forms](https://web3forms.com/)** | API key gratuita, muy sencillo de integrar. |

---

## 📝 Scripts disponibles

Todos los scripts se ejecutan desde la raíz del proyecto con `npm run <script>`:

| Script | Comando | Descripción |
|---|---|---|
| **dev** | `npm run dev` | Inicia el servidor de desarrollo en `http://localhost:3000` con HMR |
| **build** | `npm run build` | Genera la build de producción optimizada en la carpeta `.next/` |
| **start** | `npm run start` | Sirve la build de producción (requiere ejecutar `build` antes) |
| **lint** | `npm run lint` | Ejecuta ESLint en todos los archivos del proyecto e informa errores |

### Flujo de trabajo recomendado

```bash
# Desarrollo diario
npm run dev

# Antes de hacer un commit importante
npm run lint
npm run build   # Verifica que la build de producción no tiene errores
```

---

## 🚀 Deploy en Vercel

[Vercel](https://vercel.com/) es la plataforma de hosting recomendada para proyectos Next.js. El despliegue es automático a partir del repositorio de GitHub.

### Pasos para el primer despliegue

**1. Sube el proyecto a GitHub**

```bash
git init
git add .
git commit -m "feat: initial portfolio setup"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-portfolio.git
git push -u origin main
```

**2. Conecta el repositorio en Vercel**

1. Inicia sesión en [vercel.com](https://vercel.com/) (puedes usar tu cuenta de GitHub).
2. Haz clic en **"Add New… → Project"**.
3. Selecciona el repositorio `tu-portfolio` de la lista.
4. Vercel detectará automáticamente que es un proyecto Next.js y configurará los ajustes de build correctamente.
5. (Opcional) Añade las variables de entorno si las tienes en `.env.local`.
6. Haz clic en **"Deploy"**.

**3. ¡Listo!** 🎉

Vercel te proporcionará una URL de producción del tipo `tu-portfolio.vercel.app`.

### Despliegues automáticos

A partir de este momento, **cada `git push` a la rama `main` genera un nuevo despliegue automáticamente**:

```bash
# Hacer cambios en el código...
git add .
git commit -m "feat: add new project card"
git push origin main
# → Vercel detecta el push y despliega la nueva versión en segundos
```

Además, cada Pull Request genera una **Preview URL** única, lo que permite revisar los cambios antes de mergear a producción.

### Dominio personalizado

Si tienes un dominio propio, puedes configurarlo en el panel de Vercel en **Settings → Domains** del proyecto. Vercel gestiona automáticamente los certificados SSL.

---

## 🤝 Contribuciones

Este es un proyecto personal, pero si detectas algún error o tienes sugerencias de mejora, siéntete libre de abrir un **Issue** o enviar un **Pull Request**.

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Puedes usar el código como base para tu propio portfolio indicando la atribución correspondiente.

---

<div align="center">
  <p>Hecho con ❤️ y mucho ☕</p>
  <p>
    <a href="https://tu-portfolio.vercel.app">🌐 Ver Portfolio</a> •
    <a href="https://github.com/tu-usuario">👨‍💻 GitHub</a> •
    <a href="https://linkedin.com/in/tu-perfil">💼 LinkedIn</a>
  </p>
</div>