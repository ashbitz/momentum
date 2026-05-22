import { create } from 'zustand';

import type { Habit, Note, Task } from '@/types';

interface MomentumStore {
  habits: Habit[];
  tasks: Task[];
  notes: Note[];

  addHabit: (habit: Habit) => void;
  addTask: (task: Task) => void;
  addNote: (note: Note) => void;

  deleteHabit: (id: string) => void;
  deleteTask: (id: string) => void;
  deleteNote: (id: string) => void;

  toggleTask: (id: string) => void;
}

export const useMomentumStore = create<MomentumStore>((set) => ({
  habits: [],
  tasks: [],
  notes: [],

  addHabit: (habit) =>
    set((state) => ({
      habits: [...state.habits, habit],
    })),

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  addNote: (note) =>
    set((state) => ({
      notes: [...state.notes, note],
    })),

  deleteHabit: (id) =>
    set((state) => ({
      habits: state.habits.filter((habit) => habit.id !== id),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    })),

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              isCompleted: !task.isCompleted,
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
    })),
}));