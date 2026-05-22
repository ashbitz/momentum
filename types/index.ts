export type ISODateString = string;

export interface BaseItem {
  id: string;
  title: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface HabitLog {
  date: ISODateString;
  value: number;
}

export interface Habit extends BaseItem {
  description?: string;
  color: string;
  targetValue: number;
  unit: string;
  logs: HabitLog[];
}

export interface Task extends BaseItem {
  description?: string;
  isCompleted: boolean;
}

export interface Note extends BaseItem {
  content: string;
  color?: string;
}

export type MomentumItem = Habit | Task | Note;