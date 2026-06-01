# 💡 Idea del proyecto: Momentum

## 🔍 Descripción general

Momentum es una aplicación móvil de seguimiento personal centrada en hábitos, tareas y notas rápidas.

La idea es que el usuario pueda organizar pequeños elementos de su día a día desde una única app: crear hábitos, revisar tareas, guardar notas y consultar un resumen general desde Home.

La app se organiza en cinco pestañas principales: Home, Habits, Tasks, Notes y More.

---

## ❗ Problema que intenta resolver

Muchas personas intentan crear rutinas, completar tareas o guardar ideas, pero acaban usando varias herramientas distintas: notas sueltas, recordatorios, listas separadas o apps demasiado complejas.

Momentum intenta resolverlo con una app móvil sencilla y directa, donde el usuario pueda:

- crear hábitos;
- consultar su objetivo;
- organizar tareas;
- marcar tareas como completadas;
- guardar notas rápidas;
- revisar un resumen general;
- mantener sus datos en una API propia conectada a la nube.

---

## 👤 Usuario objetivo

El usuario objetivo es una persona que quiere organizar mejor su día a día desde el móvil sin usar una herramienta demasiado grande.

Puede ser útil para estudiantes, personas en prácticas, trabajadores o cualquier usuario que quiera controlar hábitos, tareas personales y pequeñas notas.

---

## 📲 Uso diario de la app

En su uso diario, el usuario puede abrir Momentum para revisar su estado general y registrar contenido nuevo.

Por ejemplo:

- crear un hábito como beber agua, leer o entrenar;
- consultar los hábitos activos;
- marcar una tarea como completada;
- crear una nota rápida;
- entrar al detalle de un elemento;
- eliminar contenido que ya no necesita.

En esta fase la app se conecta a una API propia desplegada en Vercel. Los datos principales se guardan en PostgreSQL mediante Neon, por lo que la información puede mantenerse fuera del dispositivo.

---

## 🧭 Pantallas principales

### Home

Home funciona como pantalla de resumen.

Muestra el número de hábitos, tareas pendientes, notas guardadas y registros de hábitos.

### Habits

Habits muestra los hábitos creados por el usuario.

Cada hábito tiene título, descripción opcional, objetivo, unidad, color y registros. Los registros diarios se han preparado en el backend para poder representar el progreso visualmente más adelante.

### Tasks

Tasks permite consultar tareas y marcarlas como completadas o pendientes.

También permite acceder al detalle de cada tarea.

### Notes

Notes sirve para guardar notas rápidas con título, contenido y color.

### More

More reúne opciones secundarias de la app.

En esta versión incluye el cambio entre modo claro y modo oscuro.

---

## ⭐ Funcionalidades principales

- Crear hábitos, tareas y notas.
- Validar formularios antes de guardar.
- Consultar datos desde una API REST propia.
- Guardar hábitos, tareas y notas en PostgreSQL mediante Neon.
- Consultar listados mediante pestañas.
- Mostrar tarjetas reutilizables.
- Ver detalles con rutas dinámicas.
- Eliminar elementos con confirmación.
- Marcar tareas como completadas o pendientes.
- Mostrar estados vacíos.
- Usar feedback táctil en acciones.
- Cambiar entre modo claro y modo oscuro.

---

## 🧩 Mejoras futuras

- Mejorar la parte visual de hábitos con un calendario de actividad.
- Añadir rachas y estadísticas más completas.
- Crear filtros por fecha, tipo o estado.
- Permitir edición más completa de elementos.
- Añadir archivado en lugar de eliminar siempre.
- Añadir recordatorios o notificaciones.
- Mejorar el diseño visual siguiendo una estética más premium.
- Añadir autenticación para separar datos por usuario.
- Preparar una APK para instalar la app fuera del entorno de desarrollo.
