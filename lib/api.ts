import type { Habit, ISODateString, Note, Task } from '@/types';

const API_BASE_URL = 'https://momentum-api-ten.vercel.app/api';

type ApiHabitLog = {
  id: string;
  habit_id: string;
  log_date: string;
  value: number;
  is_completed: boolean;
  color?: string | null;
  created_at: string;
  updated_at: string;
};

type ApiHabit = {
  id: string;
  title: string;
  description: string | null;
  frequency: string;
  color: string | null;
  target: number;
  unit: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type ApiTask = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  priority: string;
  due_date: string | null;
  is_completed: boolean;
  color?: string | null;
  created_at: string;
  updated_at: string;
};

type ApiNote = {
  id: string;
  title: string;
  content: string | null;
  color: string | null;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
};

type CreateHabitInput = {
  title: string;
  description?: string;
  color?: string;
  targetValue?: number;
  unit?: string;
};

type CreateTaskInput = {
  title: string;
  description?: string;
  isCompleted?: boolean;
  color?: string;
};

type CreateNoteInput = {
  title: string;
  content?: string;
  color?: string;
};

function mapHabitLogFromApi(log: ApiHabitLog) {
  return {
    date: log.log_date as ISODateString,
    value: log.value,
  };
}

function mapHabitFromApi(habit: ApiHabit, logs = [] as ApiHabitLog[]): Habit {
  return {
    id: habit.id,
    title: habit.title,
    description: habit.description ?? undefined,
    color: habit.color ?? '#14B8A6',
    targetValue: habit.target,
    unit: habit.unit ?? '',
    logs: logs.map(mapHabitLogFromApi),
    createdAt: habit.created_at,
    updatedAt: habit.updated_at,
  };
}

function mapTaskFromApi(task: ApiTask): Task {
  return {
    id: task.id,
    title: task.title,
    description: task.description ?? undefined,
    color: task.color ?? undefined,
    isCompleted: task.is_completed,
    createdAt: task.created_at,
    updatedAt: task.updated_at,
  };
}

function mapNoteFromApi(note: ApiNote): Note {
  return {
    id: note.id,
    title: note.title,
    content: note.content ?? '',
    color: note.color ?? undefined,
    createdAt: note.created_at,
    updatedAt: note.updated_at,
  };
}

async function request<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error('Error al conectar con la API de Momentum');
  }

  return response.json() as Promise<T>;
}

export async function getHabits(): Promise<Habit[]> {
  const habits = await request<ApiHabit[]>('/habits');

  return habits.map((habit) => mapHabitFromApi(habit));
}

export async function createHabit(data: CreateHabitInput): Promise<Habit> {
  const habit = await request<ApiHabit>('/habits', {
    method: 'POST',
    body: JSON.stringify({
      title: data.title,
      description: data.description,
      color: data.color,
      target: data.targetValue,
      unit: data.unit,
      frequency: 'daily',
    }),
  });

  return mapHabitFromApi(habit);
}

export async function deleteHabit(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/habits/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el hábito');
  }
}

export async function getTasks(): Promise<Task[]> {
  const tasks = await request<ApiTask[]>('/tasks');

  return tasks.map(mapTaskFromApi);
}

export async function createTask(data: CreateTaskInput): Promise<Task> {
  const task = await request<ApiTask>('/tasks', {
    method: 'POST',
    body: JSON.stringify({
      title: data.title,
      description: data.description,
      color: data.color,
      is_completed: data.isCompleted ?? false,
      priority: 'medium',
    }),
  });

  return mapTaskFromApi(task);
}

export async function updateTaskStatus(
  id: string,
  isCompleted: boolean
): Promise<Task> {
  const task = await request<ApiTask>(`/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      is_completed: isCompleted,
    }),
  });

  return mapTaskFromApi(task);
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar la tarea');
  }
}

export async function getNotes(): Promise<Note[]> {
  const notes = await request<ApiNote[]>('/notes');

  return notes.map(mapNoteFromApi);
}

export async function createNote(data: CreateNoteInput): Promise<Note> {
  const note = await request<ApiNote>('/notes', {
    method: 'POST',
    body: JSON.stringify({
      title: data.title,
      content: data.content,
      color: data.color,
      is_pinned: false,
    }),
  });

  return mapNoteFromApi(note);
}

export async function deleteNote(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar la nota');
  }
}