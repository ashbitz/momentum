import { create } from 'zustand';

import {
  createHabit,
  createNote,
  createTask,
  deleteHabit,
  deleteNote,
  deleteTask,
  getHabits,
  getNotes,
  getTasks,
  updateTaskStatus,
} from '@/lib/api';
import type { Habit, Note, Task } from '@/types';

interface MomentumStore {
  habits: Habit[];
  tasks: Task[];
  notes: Note[];
  isLoading: boolean;
  error: string | null;

  fetchHabits: () => Promise<void>;
  fetchTasks: () => Promise<void>;
  fetchNotes: () => Promise<void>;

  addHabit: (habit: Habit) => Promise<void>;
  addTask: (task: Task) => Promise<void>;
  addNote: (note: Note) => Promise<void>;

  deleteHabit: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;

  toggleTask: (id: string) => Promise<void>;
}

export const useMomentumStore = create<MomentumStore>()((set, get) => ({
  habits: [],
  tasks: [],
  notes: [],
  isLoading: false,
  error: null,

  fetchHabits: async () => {
    set({ isLoading: true, error: null });

    try {
      const habits = await getHabits();

      set({
        habits,
        isLoading: false,
      });
    } catch {
      set({
        error: 'No se han podido cargar los hábitos.',
        isLoading: false,
      });
    }
  },

  fetchTasks: async () => {
    set({ isLoading: true, error: null });

    try {
      const tasks = await getTasks();

      set({
        tasks,
        isLoading: false,
      });
    } catch {
      set({
        error: 'No se han podido cargar las tareas.',
        isLoading: false,
      });
    }
  },

  fetchNotes: async () => {
    set({ isLoading: true, error: null });

    try {
      const notes = await getNotes();

      set({
        notes,
        isLoading: false,
      });
    } catch {
      set({
        error: 'No se han podido cargar las notas.',
        isLoading: false,
      });
    }
  },

  addHabit: async (habit) => {
    set({ isLoading: true, error: null });

    try {
      const createdHabit = await createHabit({
        title: habit.title,
        description: habit.description,
        color: habit.color,
        targetValue: habit.targetValue,
        unit: habit.unit,
      });

      set((state) => ({
        habits: [...state.habits, createdHabit],
        isLoading: false,
      }));
    } catch {
      set({
        error: 'No se ha podido crear el hábito.',
        isLoading: false,
      });
    }
  },

  addTask: async (task) => {
    set({ isLoading: true, error: null });

    try {
      const createdTask = await createTask({
        title: task.title,
        description: task.description,
        isCompleted: task.isCompleted,
      });

      set((state) => ({
        tasks: [
          ...state.tasks,
          {
            ...createdTask,
            color: task.color,
          },
        ],
        isLoading: false,
      }));
    } catch {
      set({
        error: 'No se ha podido crear la tarea.',
        isLoading: false,
      });
    }
  },

  addNote: async (note) => {
    set({ isLoading: true, error: null });

    try {
      const createdNote = await createNote({
        title: note.title,
        content: note.content,
        color: note.color,
      });

      set((state) => ({
        notes: [...state.notes, createdNote],
        isLoading: false,
      }));
    } catch {
      set({
        error: 'No se ha podido crear la nota.',
        isLoading: false,
      });
    }
  },

  deleteHabit: async (id) => {
    set({ isLoading: true, error: null });

    try {
      await deleteHabit(id);

      set((state) => ({
        habits: state.habits.filter((habit) => habit.id !== id),
        isLoading: false,
      }));
    } catch {
      set({
        error: 'No se ha podido eliminar el hábito.',
        isLoading: false,
      });
    }
  },

  deleteTask: async (id) => {
    set({ isLoading: true, error: null });

    try {
      await deleteTask(id);

      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        isLoading: false,
      }));
    } catch {
      set({
        error: 'No se ha podido eliminar la tarea.',
        isLoading: false,
      });
    }
  },

  deleteNote: async (id) => {
    set({ isLoading: true, error: null });

    try {
      await deleteNote(id);

      set((state) => ({
        notes: state.notes.filter((note) => note.id !== id),
        isLoading: false,
      }));
    } catch {
      set({
        error: 'No se ha podido eliminar la nota.',
        isLoading: false,
      });
    }
  },

  toggleTask: async (id) => {
    const task = get().tasks.find((currentTask) => currentTask.id === id);

    if (!task) {
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const updatedTask = await updateTaskStatus(id, !task.isCompleted);

      set((state) => ({
        tasks: state.tasks.map((currentTask) =>
          currentTask.id === id
            ? {
                ...updatedTask,
                color: currentTask.color,
              }
            : currentTask,
        ),
        isLoading: false,
      }));
    } catch {
      set({
        error: 'No se ha podido actualizar la tarea.',
        isLoading: false,
      });
    }
  },
}));
