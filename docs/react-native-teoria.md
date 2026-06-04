# 📚 React Native, Expo y arquitectura móvil

## 🔍 Contexto del proyecto

Momentum es una app móvil creada con React Native, Expo y TypeScript.

La app permite gestionar tres tipos de contenido: hábitos, tareas y notas. Actualmente usa una API propia desplegada en Vercel como fuente principal de datos, con Zustand para manejar el estado en la app y una capa `lib/api.ts` para comunicarse con el backend.

---

## 📱 React Native frente a una app nativa

React Native permite crear interfaces móviles usando React, pero no funciona como una página web dentro de un navegador.

Cuando se usa un componente como `View` o `Text`, React Native lo traduce a componentes nativos del sistema operativo. Por eso la app se comporta como una aplicación móvil real.

La lógica de React se ejecuta en JavaScript, mientras que la interfaz se renderiza en la parte nativa. Si el hilo de JavaScript se bloquea con operaciones pesadas, la app puede perder fluidez. Por eso es importante cuidar el rendimiento, especialmente en listas largas o pantallas con muchos elementos.

---

## ⚙️ Metro Bundler

Metro es el bundler que utiliza React Native.

Su trabajo es leer los archivos del proyecto, resolver imports, transformar TypeScript y preparar el bundle que se ejecuta en el móvil durante el desarrollo.

En Momentum se arranca con Expo:

```bash
npx expo start
```

Durante el desarrollo se prueba principalmente desde Expo Go en móvil.

---

## 🚀 Expo Go, emulador y Development Build

Expo Go permite probar la app rápidamente escaneando un QR, sin tener que compilar una aplicación nativa completa.

Es útil para desarrollo porque Momentum usa librerías compatibles con Expo, como Expo Router, FlashList, Zustand, Zod y Expo Haptics.

También se puede probar la app en un emulador de Android desde Android Studio. Esto permite revisar el comportamiento móvil desde el ordenador, aunque sigue siendo un entorno local de desarrollo.

Un Development Build sería necesario si el proyecto necesitara módulos nativos personalizados o una configuración nativa más avanzada. Para esta versión no ha sido necesario, aunque más adelante la evolución natural del proyecto puede ser generar una APK.

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

Las pestañas sirven para moverse entre secciones principales. Las rutas dinámicas sirven para abrir el detalle de un hábito, una tarea o una nota concreta. La pantalla `app/new-item.tsx` se usa para crear contenido nuevo desde un formulario común.

En resumen:

| Tipo de navegación | Uso en Momentum                                   |
| ------------------ | ------------------------------------------------- |
| Tabs               | Navegación principal entre secciones              |
| Stack              | Navegación hacia detalles y pantallas secundarias |
| Ruta de creación   | Pantalla para crear hábitos, tareas y notas       |

---

## 🧱 Modelado de datos con TypeScript

Los datos principales de Momentum se dividen en tres entidades:

- `Habit`
- `Task`
- `Note`

Todas comparten campos base como `id`, `title`, `createdAt` y `updatedAt`.

En la app móvil se usan tipos adaptados a la interfaz. La API devuelve algunos campos con formato de base de datos, como `created_at`, `is_completed` o `target`, y la capa `lib/api.ts` los transforma al formato que espera la app.

Esto evita que las pantallas tengan que conocer detalles internos del backend y mantiene el código de componentes más limpio.

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
- `isLoading`
- `error`

Y también las acciones principales:

- `fetchHabits`
- `fetchTasks`
- `fetchNotes`
- `addHabit`
- `addTask`
- `addNote`
- `deleteHabit`
- `deleteTask`
- `deleteNote`
- `toggleTask`

Se eligió Zustand porque es más ligero que montar un sistema grande con Context API y evita pasar props por muchas pantallas. Para este proyecto resulta suficiente, claro y fácil de mantener.

Comparación rápida:

| Opción      | Uso                                                   |
| ----------- | ----------------------------------------------------- |
| `useState`  | Estado pequeño dentro de un componente                |
| Context API | Datos globales sencillos, como el tema visual         |
| Zustand     | Estado global de la aplicación y acciones compartidas |

En Momentum se usa Context para el tema claro/oscuro y Zustand para los datos principales de la app.

---

## 🌐 Conexión con la API

Momentum consume una API propia desplegada en Vercel.

La comunicación con el backend está centralizada en:

```txt
lib/api.ts
```

Este archivo contiene funciones para cargar, crear, actualizar o eliminar datos desde la API:

- hábitos;
- tareas;
- notas;
- estado de tareas.

La app móvil no se conecta directamente a PostgreSQL. Solo llama a endpoints HTTP. El backend es quien valida los datos y guarda la información en Neon.

Esta separación deja la arquitectura más ordenada:

```txt
App móvil → API REST → PostgreSQL / Neon
```

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

## 🧩 Estados vacíos, carga y errores

Las listas muestran un mensaje cuando no hay contenido.

Esto evita pantallas vacías sin explicación y ayuda al usuario a entender qué puede hacer en cada sección.

Hay estados vacíos en:

- Habits
- Tasks
- Notes

Además, el store incluye `isLoading` y `error` para mostrar estados de carga o mensajes cuando la app no puede comunicarse correctamente con la API.

---

## 🌗 Modo claro y oscuro

Momentum soporta modo claro y oscuro.

El modo por defecto es oscuro, porque encaja mejor con la identidad visual inicial de la app. Desde la pantalla More se puede cambiar al modo claro y volver al oscuro.

El cambio se aplica a pantallas principales, cards, detalles y formulario de creación mediante el contexto de tema.

---

## 🧪 Comprobación final

Para revisar TypeScript se usa:

```bash
npx tsc --noEmit
```

También se comprueba en Expo Go:

- navegación por pestañas;
- carga de hábitos, tareas y notas desde la API;
- creación de hábitos, tareas y notas;
- validación de formularios;
- detalles mediante rutas dinámicas;
- eliminación con confirmación;
- estados vacíos;
- cambio de tema;
- feedback táctil;
- conexión con la API desplegada.
