![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=FFF)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge)
![AsyncStorage](https://img.shields.io/badge/AsyncStorage-6C63FF?style=for-the-badge)
![FlashList](https://img.shields.io/badge/FlashList-95BF47?style=for-the-badge)

# ⚡ Momentum

Momentum es una aplicación móvil de seguimiento personal para organizar hábitos, tareas y notas rápidas desde el móvil.

La idea principal es ayudar al usuario a ver de forma visual cómo avanza en su día a día, especialmente mediante hábitos, rachas y registros por fecha.

Repositorio: https://github.com/ashbitz/momentum

---

## 📱 Descripción del proyecto

Momentum combina tres partes principales:

- **Habits** → seguimiento visual de hábitos con registros diarios.
- **Tasks** → listas de tareas y checklists.
- **Notes** → notas rápidas estilo bloc personal.

Además, la app tendrá una pantalla **Home** con un resumen general y una sección **More** para ajustes, modo claro/oscuro y futuras opciones.

En esta primera versión, los datos se guardarán de forma local en el dispositivo.

---

## ✨ Características principales

- Seguimiento de hábitos diarios.
- Vista visual con cuadros por día e intensidad según el progreso.
- Gestión de tareas tipo checklist.
- Creación de notas rápidas.
- Navegación por pestañas.
- Estado global con Zustand.
- Persistencia local con AsyncStorage.
- Validación de formularios.
- Soporte para modo claro y modo oscuro.
- Diseño móvil con una estética visual cuidada.

---

## 🛠 Tecnologías

### Frontend / Mobile

| Tecnología   | Uso                                         |
| ------------ | ------------------------------------------- |
| React Native | Desarrollo de la interfaz móvil             |
| Expo         | Entorno de desarrollo y ejecución de la app |
| TypeScript   | Tipado del proyecto                         |
| Expo Router  | Navegación entre pantallas y pestañas       |
| Gluestack UI | Sistema de componentes visuales             |
| FlashList    | Renderizado eficiente de listas             |
| Zustand      | Gestión de estado global                    |
| AsyncStorage | Persistencia local en el dispositivo        |
| Zod          | Validación de formularios                   |

### Backend

| Tecnología             | Uso                                                                           |
| ---------------------- | ----------------------------------------------------------------------------- |
| No aplica en esta fase | La primera versión funciona con estado local y persistencia en el dispositivo |

---

## 🧱 Estructura prevista del proyecto

```txt
momentum/
├── app/                    # Rutas y pantallas con Expo Router
├── components/             # Componentes reutilizables
├── constants/              # Tema, colores y valores base
├── docs/                   # Documentación del proyecto
├── store/                  # Estado global con Zustand
├── types/                  # Tipos e interfaces de TypeScript
├── app.json                # Configuración de Expo
├── package.json
└── README.md
```

---

## 📋 Gestión del proyecto

El proyecto se organizará mediante un tablero Kanban en Trello.

Las tareas se dividirán en bloques pequeños para controlar mejor el avance: definición de la idea, configuración del proyecto, navegación, sistema de diseño, estado global, persistencia, formularios y pulido final.

👉 https://trello.com/b/cRvF6EyE/momentum

---

## 🚧 Estado del proyecto

Actualmente el proyecto está en fase inicial.

Primeros objetivos:

- Definir la idea general de Momentum.
- Crear la documentación inicial.
- Configurar el proyecto Expo con TypeScript.
- Preparar la navegación principal con pestañas.
- Definir los tipos principales de datos: hábitos, tareas y notas.

---

## ▶️ Ejecución en local

Cuando el proyecto Expo esté configurado, se podrá ejecutar con:

```bash
npm install
npx expo start
```

La app se podrá probar desde Expo Go, un emulador o un simulador.

---

## 👨‍💻 Autor

Ashbitz
