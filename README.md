![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=FFF)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge)
![FlashList](https://img.shields.io/badge/FlashList-95BF47?style=for-the-badge)
![Neon](https://img.shields.io/badge/Neon-00E599?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

# ⚡ Momentum

Momentum es una aplicación móvil de seguimiento personal para organizar hábitos, tareas y notas rápidas desde el móvil.

El objetivo es que el usuario pueda revisar su día de forma sencilla: ver hábitos activos, tareas pendientes, notas guardadas y acceder al detalle de cada elemento.

Repositorio: https://github.com/ashbitz/momentum

API desplegada: https://momentum-api-ten.vercel.app

---

## 📱 Descripción del proyecto

Momentum combina tres áreas principales:

- **Habits** → creación y consulta de hábitos con objetivo, unidad, color y registros diarios.
- **Tasks** → tareas sencillas que se pueden marcar como completadas o pendientes.
- **Notes** → notas rápidas con título, contenido y color.

La app también incluye una pantalla **Home** con resumen general y una sección **More** para ajustes básicos, como el cambio entre modo claro y oscuro.

En esta fase la app se conecta a una API propia desplegada en Vercel. Los datos principales se guardan en PostgreSQL mediante Neon, por lo que hábitos, tareas y notas ya no dependen solo del almacenamiento local del dispositivo.

---

## ✨ Características implementadas

- Navegación principal por pestañas con Expo Router.
- Pantallas para Home, Habits, Tasks, Notes y More.
- Creación de hábitos, tareas y notas desde un formulario común.
- Validación de formularios con Zod.
- Estado global con Zustand.
- Consumo de API REST propia para hábitos, tareas y notas.
- Persistencia en PostgreSQL mediante Neon.
- Listas renderizadas con FlashList.
- Tarjetas reutilizables para hábitos, tareas y notas.
- Pantallas de detalle mediante rutas dinámicas.
- Eliminación con confirmación usando Alert.
- Actualización de tareas completadas contra la API.
- Feedback táctil con Expo Haptics.
- Estados vacíos en las listas.
- Cambio funcional entre modo claro y modo oscuro.
- Sistema de diseño base con tokens de color, espaciado y bordes.

---

## 🛠 Tecnologías

### Frontend / Mobile

| Tecnología | Uso |
| --- | --- |
| React Native | Desarrollo de la interfaz móvil |
| Expo | Entorno de desarrollo y ejecución de la app |
| TypeScript | Tipado del proyecto |
| Expo Router | Navegación por pestañas, stack y rutas dinámicas |
| Gluestack UI | Provider y base para el sistema visual |
| FlashList | Renderizado eficiente de listas |
| Zustand | Gestión de estado global |
| Zod | Validación de formularios |
| Expo Haptics | Feedback táctil en acciones |
| NativeWind / Tailwind | Base de estilos generada por la configuración de Gluestack |

### Backend / API

| Tecnología | Uso |
| --- | --- |
| Next.js | API REST propia |
| PostgreSQL | Base de datos relacional |
| Neon | Hosting de la base de datos en la nube |
| Vercel | Despliegue del backend |
| Zod | Validación de datos en la API |

---

## 🧱 Estructura del proyecto

```txt
momentum/
├── app/                    # Rutas y pantallas con Expo Router
│   ├── (tabs)/             # Navegación principal por pestañas
│   ├── habits/[id].tsx     # Detalle de hábito
│   ├── tasks/[id].tsx      # Detalle de tarea
│   ├── notes/[id].tsx      # Detalle de nota
│   ├── _layout.tsx         # Layout raíz
│   └── new-item.tsx        # Formulario de creación
├── components/             # Componentes reutilizables
├── constants/              # Tema, colores y valores base
├── context/                # Contexto de tema claro/oscuro
├── docs/                   # Documentación del proyecto
├── lib/                    # Cliente de la API
├── schemas/                # Validaciones con Zod
├── store/                  # Estado global con Zustand
├── types/                  # Tipos e interfaces de TypeScript
├── app.json                # Configuración de Expo
├── package.json
└── README.md
```

---

## 🔌 Conexión con la API

La app consume la API propia de Momentum desde:

```txt
https://momentum-api-ten.vercel.app/api
```

La capa de conexión está centralizada en:

```txt
lib/api.ts
```

Desde ahí se llaman los endpoints de hábitos, tareas y notas, y se adaptan los datos recibidos del backend al formato usado por la app móvil.

---

## 📋 Gestión del proyecto

El proyecto se organiza mediante un tablero Kanban en Trello.

Las tareas se han dividido en bloques: definición de la idea, configuración del proyecto, navegación, sistema de diseño, estado global, formularios, backend, integración con API, persistencia en la nube, detalles, feedback de usuario y documentación.

👉 https://trello.com/b/cRvF6EyE/momentum

---

## ▶️ Ejecución en local

Instalar dependencias:

```bash
npm install
```

Arrancar Expo:

```bash
npx expo start
```

También se pueden usar los scripts del proyecto:

```bash
npm run start
npm run android
npm run ios
npm run web
```

La prueba principal se realiza desde **Expo Go** en móvil. También se puede usar la versión web de Expo para revisar la app en navegador.

---

## ✅ Comprobación del proyecto

Para comprobar TypeScript:

```bash
npx tsc --noEmit
```

Flujo básico de prueba:

1. Abrir la app en Expo Go.
2. Comprobar que Habits, Tasks y Notes cargan datos desde la API.
3. Crear una tarea, una nota y un hábito.
4. Comprobar que aparecen en sus pestañas.
5. Entrar al detalle de cada elemento.
6. Marcar una tarea como completada o pendiente.
7. Eliminar un elemento y confirmar que desaparece.
8. Cerrar y abrir la app para comprobar que los datos se mantienen desde la API.
9. Cambiar entre modo claro y oscuro desde More.

---

## 📚 Documentación

La documentación principal del proyecto está en:

- `docs/idea.md`
- `docs/project-management.md`
- `docs/ai-setup.md`
- `docs/react-native-teoria.md`

El backend propio tiene su documentación en el repositorio `momentum-api`.

---

## 👨‍💻 Autor

Ashbitz
