import { z } from 'zod';

export const habitSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  description: z.string().optional(),
  targetValue: z
    .number()
    .positive('El objetivo debe ser mayor que 0'),
  unit: z.string().min(1, 'La unidad es obligatoria'),
  color: z.string().min(1, 'El color es obligatorio'),
});

export const taskSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  description: z.string().optional(),
});

export const noteSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  content: z.string().min(1, 'El contenido no puede estar vacío'),
  color: z.string().optional(),
});

export type HabitFormData = z.infer<typeof habitSchema>;
export type TaskFormData = z.infer<typeof taskSchema>;
export type NoteFormData = z.infer<typeof noteSchema>;