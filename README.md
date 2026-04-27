# Proyecto Ionic + Capacitor + Vue

Proyecto móvil híbrido desarrollado con **Ionic Framework**, **Capacitor** y **Vue 3**.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v16 o superior)
- **npm** o **yarn**
- **Android Studio** (con SDK de Android configurado)
- **Git**
- Un dispositivo Android físico o emulador configurado

## 🚀 Instalación Inicial

### 1. Instalar Ionic CLI globalmente

```bash
npm install -g @ionic/cli
```

Verifica la instalación:

```bash
ionic --version
```

### 2. Clonar e instalar dependencias

```bash

git clone <url-del-repositorio>
cd <nombre-del-proyecto>

npm install
```

### 3. Configurar Java para Android

Este proyecto requiere **Java 17**. Edita el archivo `android/variables.gradle` y asegúrate de que contenga:

```groovy
ext {
    javaVersion = JavaVersion.VERSION_17
}
```

También verifica que `android/gradle.properties` incluya:

```properties
org.gradle.java.home=C:\\Program Files\\Android\\Android Studio\\jbr
```

### 4. Agregar plataforma Android

```bash
npm run build

ionic capacitor add android
```

## 💻 Comandos de Desarrollo

### Desarrollo Web (navegador)

Para probar la aplicación en el navegador:

```bash
ionic serve
```

La app se abrirá en `http://localhost:8100`

---

### **Desarrollo Móvil (RECOMENDADO) - Con Hot Reload** 

Para desarrollar en tu dispositivo Android con **recarga automática de cambios**:

```bash
ionic capacitor run android --livereload --external
```

**✅ Ventajas:**
- ✨ Los cambios en el código Vue se reflejan **automáticamente** en el dispositivo
- 🚀 No necesitas recompilar cada vez que modificas algo
- ⚡ Experiencia de desarrollo similar a React Native

**📱 Requisitos:**
- Dispositivo Android conectado por USB con **Depuración USB habilitada**
- O emulador Android ejecutándose

---

### Desarrollo Móvil - Sin Hot Reload

Si solo quieres compilar e instalar la app sin recarga automática:

```bash
ionic capacitor run android
```

** Nota:** Con este comando el servidor se detiene después de subir el proyecto al dispositivo.

---

### Sincronizar cambios manualmente

Si haces cambios en plugins nativos o configuración de Capacitor:

```bash
npx cap sync android
```

## Comandos Útiles

### Abrir proyecto en Android Studio

```bash
npx cap open android
```

### Limpiar build de Android

```bash
cd android
./gradlew clean
cd ..
```

### Ver dispositivos conectados

```bash
adb devices
```

## Generar APK para Instalar en Dispositivos

### Método Rápido - APK Debug (Recomendado para pruebas)

Ejecuta estos comandos desde la terminal de VS Code:

```bash
npm run build

npx cap sync android

cd android
./gradlew assembleDebug
cd ..
```

**Ubicación del APK generado:**

`android/app/build/outputs/apk/debug/app-debug.apk`

---

## Características de la Aplicación

### Login (LoginPage.vue)

Sistema de autenticación simple y seguro: Este LOGIN decidi desarrollarlo para que la APP sea más profesional.

- **Validación de credenciales** con formularios reactivos
- **Almacenamiento seguro** de tokens en `localStorage`
- **Redirección automática** a pantalla de productos después de login exitoso
- **Manejo de errores** con mensajes claros al usuario
- **Protección de rutas** mediante guards de autenticación en Vue Router

**Flujo:**
1. Usuario ingresa credenciales
2. Validación y autenticación
3. Token guardado en localStorage
4. Redirección a `/products`

---

### Sistema de Tabs (TabsPage.vue)

Navegación por pestañas optimizada para móvil:

- **Tres secciones principales:**
  - 🏠 Home (Catálogo de productos)
  - ❤️ Favorites (Productos marcados como favoritos)
  - 👤 Account (Perfil y opciones de usuario)

- **Persistencia de navegación** - Mantiene la posición en cada tab
- **Transiciones suaves** entre pantallas
- **Interfaz intuitiva** con iconos claros

---

### Header Personalizado (BaseHeader.vue)

Componente reutilizable de encabezado con:

- **Título dinámico** según la pantalla actual
- **Botón de logout** con confirmación de alerta
- **Diseño limpio** con fondo blanco y colores consistentes
- **Responsive** - Se adapta a diferentes tamaños de pantalla

**Características:**
- Alert de confirmación antes de cerrar sesión
- Navegación segura de vuelta a login
- Icono de logout (ionicon)

```vue
<BaseHeader title="Productos" />
```

---

### Pantalla de Detalle (ProductDetailPage.vue)

Vista completa de un producto seleccionado:

- **Información completa del producto:**
  - Imagen en alta resolución
  - Título y descripción completa
  - Precio y categoría
  - Opción para marcar como favorito

- **Botón de compra** (integración futura)
- **Navegación hacia atrás** a la lista de productos
- **Diseño optimizado** para lectura cómoda

---

### ProductCard.vue - Componente Reutilizable

Tarjeta de producto optimizada:

- **Visualización clara** de producto con imagen, título y precio
- **Botón de favoritos** con emojis intuitivos (❤️ / 🤍)
- **Interacciones suaves** con transiciones CSS
- **Eventos emisores:**
  - `view-detail` - Navega al detalle del producto
  - `toggle-favorite` - Añade/elimina de favoritos

**Uso:**
```vue
<ProductCard 
  :product="product" 
  :isFavorite="isFavorite"
  @view-detail="goToDetail"
  @toggle-favorite="handleFavorite"
/>
```

---

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── BaseHeader.vue
│   ├── ProductCard.vue
│   ├── EmptyState.vue
│   └── ProductSkeleton.vue
├── views/              # Pantallas principales
│   ├── LoginPage.vue
│   ├── HomePage.vue
│   ├── FavoritesPage.vue
│   ├── ProductDetailPage.vue
│   └── TabsPage.vue
├── services/           # API y lógica externa
│   └── product.service.ts
├── router/             # Vue Router config
│   └── index.ts
└── types/              # TypeScript interfaces
    └── product.interface.ts
```

---

** DESARROLLADO POR ANDERSON YEPES BEDOYA **