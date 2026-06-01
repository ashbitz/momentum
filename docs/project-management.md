# 📋 Gestión del proyecto: Momentum

## 🔍 Organización del trabajo

El desarrollo de Momentum se organiza mediante un tablero en Trello usando una estructura Kanban.

La idea ha sido dividir el proyecto en bloques pequeños para avanzar de forma controlada y no mezclar demasiados cambios a la vez.

---

## 🧱 Columnas del tablero

El tablero está dividido en las siguientes columnas:

- **Backlog** → ideas, mejoras o tareas que pueden hacerse más adelante.
- **Todo** → tareas preparadas para empezar.
- **In Progress** → tareas que se están desarrollando en ese momento.
- **Review** → tareas terminadas pero pendientes de revisar o probar.
- **Done** → tareas completadas.

---

## 🧩 Bloques principales del proyecto

Las tareas principales se han organizado alrededor de las partes más importantes de la app:

- Definición de la idea.
- Configuración del proyecto Expo.
- Configuración de Expo Router.
- Sistema de diseño base.
- Modelado de datos con TypeScript.
- Estado global con Zustand.
- Pantallas principales.
- Cards reutilizables.
- Listas con FlashList.
- Formularios con validación.
- Backend propio con API REST.
- Base de datos PostgreSQL en Neon.
- Integración de la app móvil con la API.
- Rutas dinámicas y pantallas de detalle.
- Eliminación con confirmación.
- Haptics y estados vacíos.
- Modo claro y oscuro.
- Documentación técnica.

---

## 🔗 Enlace al tablero

👉 https://trello.com/b/cRvF6EyE/momentum

---

## ✅ Estado actual

El proyecto tiene implementada una base funcional con app móvil y backend propio:

- app Expo con TypeScript;
- navegación por pestañas;
- pantalla de creación;
- hábitos, tareas y notas;
- estado global con Zustand;
- API REST propia desplegada en Vercel;
- base de datos PostgreSQL en Neon;
- conexión de la app móvil con la API;
- creación, consulta y eliminación de elementos desde la API;
- actualización del estado de tareas contra el backend;
- listas con FlashList;
- validación con Zod;
- detalles con rutas dinámicas;
- eliminación con confirmación;
- haptics;
- estados vacíos;
- modo claro y oscuro;
- documentación técnica.

---

## 🧪 Revisión final

Antes de dar el proyecto por cerrado se revisa:

- que `npx tsc --noEmit` no devuelva errores;
- que la app funcione en Expo Go;
- que Habits, Tasks y Notes carguen datos desde la API;
- que se puedan crear los tres tipos de contenido;
- que las rutas de detalle funcionen;
- que la eliminación pida confirmación y borre en el backend;
- que las tareas puedan cambiar entre completadas y pendientes;
- que los datos sigan disponibles al cerrar y abrir la app;
- que el cambio de tema funcione desde More;
- que la API desplegada responda correctamente.
