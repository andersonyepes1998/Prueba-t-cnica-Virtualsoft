## 🔧 Configuración del Teclado en Ionic

### Problema Resuelto
El teclado del celular no desplaza el contenido hacia arriba.

### Solución Implementada

En todos los `ion-content`, agrega la propiedad `scrollAssist="false"`:

```vue
<ion-content :fullscreen="true" scrollAssist="false">
  <!-- Tu contenido -->
</ion-content>
```

### Opciones Disponibles

| Propiedad | Valor | Descripción |
|-----------|-------|-------------|
| `scrollAssist` | `false` | Desactiva el scroll automático cuando se abre el teclado |
| `scrollEvents` | `true` | Emite eventos cuando hace scroll |
| `forceOverscroll` | `false` | Previene overscroll en iOS |

### Ejemplo Completo

```vue
<template>
  <ion-page>
    <ion-content 
      :fullscreen="true" 
      scrollAssist="false"
      scrollEvents="true"
    >
      <div class="login-form">
        <ion-item>
          <ion-input placeholder="Usuario" />
        </ion-item>
        <ion-item>
          <ion-input type="password" placeholder="Contraseña" />
        </ion-item>
      </div>
    </ion-content>
  </ion-page>
</template>
```

### Alternativa: Usar Capacitor Keyboard

Si necesitas controlar el teclado manualmente, instala:

```bash
npm install @capacitor/keyboard
```

Luego úsalo en tu componente:

```typescript
import { Keyboard } from '@capacitor/keyboard';

Keyboard.addListener('keyboardWillShow', () => {
  console.log('Teclado se abrió');
});

Keyboard.addListener('keyboardWillHide', () => {
  console.log('Teclado se cerró');
});
```

### ✅ Aplicado En
- ✅ LoginPage.vue
- ✅ HomePage.vue

### 📋 Checklist para Nuevas Páginas
- [ ] Agregar `scrollAssist="false"` al `ion-content`
- [ ] Testear con el teclado del celular
- [ ] Revisar que el layout se mantenga fijo
