# Portfolio
---

## Tabla de Contenidos

1. [Requisitos previos](#-requisitos-previos)
2. [Instalación](#-instalación)

---

##  Requisitos previos

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

##  Instalación

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


### 4. Variables de entorno (si aplica)

Crea un archivo `.env.local` en la raíz del proyecto si necesitas configurar alguna variable de entorno:

```bash
cp .env.example .env.local
```

> El archivo `.env.local` está incluido en `.gitignore` y nunca debe subirse al repositorio.

---

## Cómo ejecutar en desarrollo

Una vez instaladas las dependencias, inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre tu navegador y visita:

```
http://localhost:3000
```

El servidor tiene **Hot Module Replacement (HMR)** activado: cualquier cambio en el código se refleja en el navegador automáticamente sin necesidad de recargar la página manualmente.
