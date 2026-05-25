![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=FFF)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge)
![AsyncStorage](https://img.shields.io/badge/AsyncStorage-6C63FF?style=for-the-badge)
![FlashList](https://img.shields.io/badge/FlashList-95BF47?style=for-the-badge)

# ⚡ Momentum

Momentum es una aplicación móvil de seguimiento personal para organizar hábitos, tareas y notas rápidas desde el móvil.

El objetivo es que el usuario pueda revisar su día de forma sencilla: ver hábitos activos, tareas pendientes, notas guardadas y acceder al detalle de cada elemento.

Repositorio: https://github.com/ashbitz/momentum

---

## 📱 Descripción del proyecto

Momentum combina tres áreas principales:

- **Habits** → creación y consulta de hábitos con objetivo, unidad, color y registros.
- **Tasks** → tareas sencillas que se pueden marcar como completadas o pendientes.
- **Notes** → notas rápidas con título, contenido y color.

La app también incluye una pantalla **Home** con resumen general y una sección **More** para ajustes básicos, como el cambio entre modo claro y oscuro.

En esta fase los datos se guardan de forma local en el dispositivo, sin backend ni login.

---

## ✨ Características implementadas

- Navegación principal por pestañas con Expo Router.
- Pantallas para Home, Habits, Tasks, Notes y More.
- Creación de hábitos, tareas y notas desde un formulario común.
- Validación de formularios con Zod.
- Estado global con Zustand.
- Persistencia local con AsyncStorage.
- Listas renderizadas con FlashList.
- Tarjetas reutilizables para hábitos, tareas y notas.
- Pantallas de detalle mediante rutas dinámicas.
- Eliminación con confirmación usando Alert.
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
| AsyncStorage | Persistencia local en el dispositivo |
| Zod | Validación de formularios |
| Expo Haptics | Feedback táctil en acciones |
| NativeWind / Tailwind | Base de estilos generada por la configuración de Gluestack |

### Backend

| Tecnología | Uso |
| --- | --- |
| No aplica en esta fase | La app funciona con estado local y persistencia en el dispositivo |

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
├── schemas/                # Validaciones con Zod
├── store/                  # Estado global con Zustand
├── types/                  # Tipos e interfaces de TypeScript
├── app.json                # Configuración de Expo
├── package.json
└── README.md
```

---

## 📋 Gestión del proyecto

El proyecto se organiza mediante un tablero Kanban en Trello.

Las tareas se han dividido en bloques: definición de la idea, configuración del proyecto, navegación, sistema de diseño, estado global, formularios, persistencia local, detalles, feedback de usuario y documentación.

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

La prueba principal de esta fase se realiza desde **Expo Go** en móvil.

---

## ✅ Comprobación del proyecto

Para comprobar TypeScript:

```bash
npx tsc --noEmit
```

Flujo básico de prueba:

1. Abrir la app en Expo Go.
2. Crear una tarea, una nota y un hábito.
3. Comprobar que aparecen en sus pestañas.
4. Entrar al detalle de cada elemento.
5. Marcar una tarea como completada.
6. Eliminar un elemento y confirmar que desaparece.
7. Cerrar y abrir la app para comprobar la persistencia local.
8. Cambiar entre modo claro y oscuro desde More.

---

## 📚 Documentación

La documentación principal del proyecto está en:

- `docs/idea.md`
- `docs/project-management.md`
- `docs/ai-setup.md`
- `docs/react-native-teoria.md`

---

## 👨‍💻 Autor

Ashbitz
