import { create } from 'zustand';

import {
  addHabitProgress,
  createHabit,
  createNote,
  createTask,
  deleteHabit,
  deleteNote,
  deleteTask,
  getHabitLogs,
  getHabits,
  getNotes,
  getTasks,
  updateHabit,
  updateNote,
  updateTask,
  updateTaskStatus,
} from '@/lib/api';
import type { Habit, HabitLog, ISODateString, Note, Task } from '@/types';

interface MomentumStore {
  habits: Habit[];
  tasks: Task[];
  notes: Note[];
  isLoading: boolean;
  error: string | null;

  fetchHabits: () => Promise<void>;
  fetchHabitLogs: (id: string) => Promise<void>;
  fetchTasks: () => Promise<void>;
  fetchNotes: () => Promise<void>;

  addHabit: (habit: Habit) => Promise<void>;
  addTask: (task: Task) => Promise<void>;
  addNote: (note: Note) => Promise<void>;

  updateHabit: (id: string, habit: Habit) => Promise<void>;
  updateTask: (id: string, task: Task) => Promise<void>;
  updateNote: (id: string, note: Note) => Promise<void>;

  addHabitProgress: (id: string, date: ISODateString, value?: number) => Promise<void>;

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

  fetchHabitLogs: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const logs = await getHabitLogs(id);

      set((state) => ({
        habits: state.habits.map((habit) =>
          habit.id === id
            ? {
                ...habit,
                logs,
              }
            : habit,
        ),
        isLoading: false,
      }));
    } catch {
      set({
        error: 'No se han podido cargar los registros del hábito.',
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
        color: task.color,
        isCompleted: task.isCompleted,
      });

      set((state) => ({
        tasks: [...state.tasks, createdTask],
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


  updateHabit: async (id, habit) => {
    set({ isLoading: true, error: null });

    try {
      const updatedHabit = await updateHabit(id, {
        title: habit.title,
        description: habit.description,
        color: habit.color,
        targetValue: habit.targetValue,
        unit: habit.unit,
      });

      set((state) => ({
        habits: state.habits.map((currentHabit) =>
          currentHabit.id === id ? updatedHabit : currentHabit,
        ),
        isLoading: false,
      }));
    } catch {
      set({
        error: 'No se ha podido actualizar el hábito.',
        isLoading: false,
      });
    }
  },

  updateTask: async (id, task) => {
    set({ isLoading: true, error: null });

    try {
      const updatedTask = await updateTask(id, {
        title: task.title,
        description: task.description,
        color: task.color,
        isCompleted: task.isCompleted,
      });

      set((state) => ({
        tasks: state.tasks.map((currentTask) =>
          currentTask.id === id ? updatedTask : currentTask,
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

  updateNote: async (id, note) => {
    set({ isLoading: true, error: null });

    try {
      const updatedNote = await updateNote(id, {
        title: note.title,
        content: note.content,
        color: note.color,
      });

      set((state) => ({
        notes: state.notes.map((currentNote) =>
          currentNote.id === id ? updatedNote : currentNote,
        ),
        isLoading: false,
      }));
    } catch {
      set({
        error: 'No se ha podido actualizar la nota.',
        isLoading: false,
      });
    }
  },



  addHabitProgress: async (id, date, value = 1) => {
    set({ isLoading: true, error: null });

    try {
      const updatedLog = await addHabitProgress(id, { date, value });

      set((state) => ({
        habits: state.habits.map((habit) => {
          if (habit.id !== id) {
            return habit;
          }

          const logExists = habit.logs.some((log) => log.date === updatedLog.date);
          const logs: HabitLog[] = logExists
            ? habit.logs.map((log) =>
                log.date === updatedLog.date ? updatedLog : log,
              )
            : [...habit.logs, updatedLog];

          return {
            ...habit,
            logs: logs.sort((firstLog, secondLog) =>
              firstLog.date.localeCompare(secondLog.date),
            ),
          };
        }),
        isLoading: false,
      }));
    } catch {
      set({
        error: 'No se ha podido registrar el progreso del hábito.',
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
            ? updatedTask
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
