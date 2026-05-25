import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { colors } from '@/constants/theme';
import type { Habit, Note, Task } from '@/types';

const now = new Date().toISOString();

const initialHabits: Habit[] = [
  {
    id: 'habit-1',
    title: 'Morning workout',
    description: 'Short training session to start the day.',
    color: colors.habits.workout,
    targetValue: 1,
    unit: 'session',
    logs: [
      { date: '2026-05-16', value: 1 },
      { date: '2026-05-17', value: 1 },
      { date: '2026-05-19', value: 1 },
      { date: '2026-05-21', value: 1 },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'habit-2',
    title: 'Read 20 pages',
    description: 'Daily reading habit.',
    color: colors.habits.reading,
    targetValue: 20,
    unit: 'pages',
    logs: [
      { date: '2026-05-15', value: 12 },
      { date: '2026-05-16', value: 20 },
      { date: '2026-05-17', value: 24 },
      { date: '2026-05-20', value: 15 },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'habit-3',
    title: 'Drink water',
    description: 'Track glasses of water during the day.',
    color: colors.habits.water,
    targetValue: 8,
    unit: 'glasses',
    logs: [
      { date: '2026-05-18', value: 5 },
      { date: '2026-05-19', value: 7 },
      { date: '2026-05-20', value: 8 },
      { date: '2026-05-21', value: 6 },
    ],
    createdAt: now,
    updatedAt: now,
  },
];

const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Prepare Expo Router structure',
    description: 'Check that the main tabs are working.',
    isCompleted: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'task-2',
    title: 'Design habit cards',
    description: 'Create the first visual version of habit cards.',
    isCompleted: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'task-3',
    title: 'Review project documentation',
    description: 'Keep README and docs aligned with the current project.',
    isCompleted: false,
    createdAt: now,
    updatedAt: now,
  },
];

const initialNotes: Note[] = [
  {
    id: 'note-1',
    title: 'App idea',
    content:
      'Momentum should feel visual, simple and focused on personal progress.',
    color: colors.brand.primary,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'note-2',
    title: 'Future feature',
    content:
      'Camera or GPS could be useful later for activity logs or habit evidence.',
    color: colors.brand.secondary,
    createdAt: now,
    updatedAt: now,
  },
];

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

export const useMomentumStore = create<MomentumStore>()(
  persist(
    (set) => ({
      habits: initialHabits,
      tasks: initialTasks,
      notes: initialNotes,

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
    }),
    {
      name: 'momentum-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);