# 📚 React Native, Expo y estado local

## 🔍 Contexto del proyecto

Momentum es una app móvil creada con React Native, Expo y TypeScript.

La app permite gestionar tres tipos de contenido: hábitos, tareas y notas. Para esta fase se ha trabajado con estado local, navegación con Expo Router, listas eficientes, formularios validados y persistencia en el dispositivo.

---

## 📱 React Native frente a una app nativa

React Native permite crear interfaces móviles usando React, pero no funciona como una página web dentro de un navegador.

Cuando se usa un componente como `View` o `Text`, React Native lo traduce a componentes nativos del sistema operativo. Por eso la app se comporta como una aplicación móvil real.

La lógica de React se ejecuta en JavaScript, mientras que la interfaz se renderiza en la parte nativa. Si el hilo de JavaScript se bloquea con operaciones pesadas, la app puede perder fluidez. Por eso es importante cuidar el rendimiento, especialmente en listas largas.

---

## ⚙️ Metro Bundler

Metro es el bundler que utiliza React Native.

Su trabajo es leer los archivos del proyecto, resolver imports, transformar TypeScript y preparar el bundle que se ejecuta en el móvil durante el desarrollo.

En Momentum se arranca con Expo:

```bash
npx expo start
```

Durante el desarrollo se ha probado principalmente desde Expo Go en móvil.

---

## 🚀 Expo Go y Development Build

Expo Go permite probar la app rápidamente escaneando un QR, sin tener que compilar una aplicación nativa completa.

Es muy útil para esta fase porque Momentum utiliza librerías compatibles con Expo Go, como Expo Router, AsyncStorage, FlashList, Zustand, Zod y Expo Haptics.

Un Development Build sería necesario si el proyecto necesitara módulos nativos personalizados o una configuración nativa más avanzada. Para esta versión no ha sido necesario.

---

## 🎨 Sistema de diseño

Para el sistema visual se eligió Gluestack UI.

La elección encaja con Momentum porque permite una interfaz más personalizable que una librería estrictamente Material Design. React Native Paper también era una opción válida, pero está más orientada a componentes Material ya preparados.

Momentum usa además un archivo de tema en `constants/theme.ts` con colores, espaciados, tamaños y radios base.

La app tiene modo oscuro y claro mediante un contexto propio en `context/ThemeContext.tsx`. El modo inicial es oscuro y desde la pantalla More se puede cambiar entre ambos temas.

El provider principal se configura en `app/_layout.tsx`, donde la app queda envuelta por `AppThemeProvider` y `GluestackUIProvider`.

---

## 🧭 Navegación con Expo Router

Expo Router utiliza el sistema de archivos para crear rutas.

En Momentum se usa una navegación principal por pestañas:

- Home
- Habits
- Tasks
- Notes
- More

También se usan rutas dinámicas para las pantallas de detalle:

```txt
app/habits/[id].tsx
app/tasks/[id].tsx
app/notes/[id].tsx
```

Las pestañas sirven para moverse entre secciones principales. Las rutas dinámicas sirven para abrir el detalle de un hábito, una tarea o una nota concreta. La pantalla `app/new-item.tsx` se usa para crear contenido nuevo.

---

## 🧱 Modelado de datos con TypeScript

Los datos principales de Momentum se dividen en tres entidades:

- `Habit`
- `Task`
- `Note`

Todas comparten campos base como `id`, `title`, `createdAt` y `updatedAt`.

En esta versión las fechas se guardan como texto ISO, porque los datos se persisten como JSON en AsyncStorage. Esto evita problemas al cerrar y volver a abrir la app.

TypeScript ayuda a controlar qué propiedades tiene cada tipo de elemento y reduce errores al crear, mostrar o eliminar datos.

---

## 🧠 Estado global con Zustand

Momentum usa Zustand para guardar el estado global de la app.

El store principal está en:

```txt
store/useMomentumStore.ts
```

Ahí se guardan:

- `habits`
- `tasks`
- `notes`

Y también las acciones principales:

- `addHabit`
- `addTask`
- `addNote`
- `deleteHabit`
- `deleteTask`
- `deleteNote`
- `toggleTask`

Se eligió Zustand porque es más ligero que montar un sistema grande con Context API y evita pasar props por muchas pantallas. Para este proyecto resulta suficiente, claro y fácil de mantener.

---

## 💾 Persistencia con AsyncStorage

AsyncStorage permite guardar datos localmente en el dispositivo.

En Momentum se usa junto al middleware `persist` de Zustand. Así, cuando el usuario crea o elimina contenido, el estado se guarda y puede recuperarse al volver a abrir la app.

La configuración usa:

```txt
persist
createJSONStorage
AsyncStorage
```

Limitaciones importantes:

- los datos se guardan solo en el dispositivo;
- no hay sincronización entre móviles;
- no es una base de datos remota;
- no debe usarse para información sensible sin medidas adicionales.

Para esta fase encaja bien porque el ejercicio se centra en estado local.

---

## 📋 Listas con FlashList

Las secciones Habits, Tasks y Notes muestran listas de elementos.

Para renderizarlas se usa FlashList de Shopify. Es una alternativa a FlatList pensada para mejorar el rendimiento en listas grandes mediante reciclaje de componentes.

En Momentum las listas actuales no son enormes, pero usar FlashList deja la base preparada para crecer mejor.

---

## ✅ Formularios y validación con Zod

La pantalla `app/new-item.tsx` permite crear hábitos, tareas y notas.

Cada tipo tiene campos propios y se valida antes de guardarse. Para esto se usa Zod, que permite definir reglas claras para los formularios.

Si un campo no cumple la validación, la app muestra el error correspondiente y no guarda el elemento.

---

## 📳 Haptics y feedback de usuario

La app usa Expo Haptics para dar feedback táctil en acciones concretas.

Por ejemplo:

- al completar una tarea;
- al eliminar un elemento.

No es imprescindible para la lógica de la app, pero mejora la sensación de interacción en móvil.

---

## 🧩 Estados vacíos

Las listas muestran un mensaje cuando no hay contenido.

Esto evita pantallas vacías sin explicación y ayuda al usuario a entender qué puede hacer en cada sección.

Hay estados vacíos en:

- Habits
- Tasks
- Notes

---

## 🌗 Modo claro y oscuro

Momentum soporta modo claro y oscuro.

El modo por defecto es oscuro, porque encaja mejor con la identidad visual inicial de la app. Desde la pantalla More se puede cambiar al modo claro y volver al oscuro.

El cambio se aplica a pantallas principales, cards, detalles y formulario de creación mediante el contexto de tema.

---

## 🧪 Comprobación final

Para revisar el proyecto se usa:

```bash
npx tsc --noEmit
```

También se comprueba en Expo Go:

- navegación por pestañas;
- creación de hábitos, tareas y notas;
- validación de formularios;
- persistencia local;
- detalles mediante rutas dinámicas;
- eliminación con confirmación;
- estados vacíos;
- cambio de tema;
- feedback táctil.
