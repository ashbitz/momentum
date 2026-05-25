import { router, Stack } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { z } from 'zod';

import { colors, radius, spacing } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import {
  habitSchema,
  noteSchema,
  taskSchema,
} from '@/schemas/momentumSchemas';
import { useMomentumStore } from '@/store/useMomentumStore';
import type { Habit, Note, Task } from '@/types';

type ItemType = 'habit' | 'task' | 'note';

type TaskFormErrors = Partial<Record<keyof z.infer<typeof taskSchema>, string>>;
type NoteFormErrors = Partial<Record<keyof z.infer<typeof noteSchema>, string>>;
type HabitFormErrors = Partial<Record<keyof z.infer<typeof habitSchema>, string>>;

const itemTypeOptions: {
  label: string;
  value: ItemType;
  description: string;
}[] = [
  {
    label: 'Hábito',
    value: 'habit',
    description: 'Seguimiento repetible con progreso diario.',
  },
  {
    label: 'Tarea',
    value: 'task',
    description: 'Acción puntual para completar.',
  },
  {
    label: 'Nota',
    value: 'note',
    description: 'Texto rápido para guardar una idea.',
  },
];

const habitColorOptions = [
  colors.habits.workout,
  colors.habits.reading,
  colors.habits.water,
  colors.brand.primary,
  colors.brand.secondary,
];

export default function NewItemScreen() {
  const { colors: activeColors } = useAppTheme();
  const addHabit = useMomentumStore((state) => state.addHabit);
  const addTask = useMomentumStore((state) => state.addTask);
  const addNote = useMomentumStore((state) => state.addNote);

  const [selectedType, setSelectedType] = useState<ItemType>('task');

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskErrors, setTaskErrors] = useState<TaskFormErrors>({});

  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteColor, setNoteColor] = useState<string>(colors.brand.primary);
  const [noteErrors, setNoteErrors] = useState<NoteFormErrors>({});

  const [habitTitle, setHabitTitle] = useState('');
  const [habitDescription, setHabitDescription] = useState('');
  const [habitTargetValue, setHabitTargetValue] = useState('1');
  const [habitUnit, setHabitUnit] = useState('');
  const [habitColor, setHabitColor] = useState<string>(colors.habits.workout);
  const [habitErrors, setHabitErrors] = useState<HabitFormErrors>({});

  const cardThemeStyle = {
    borderColor: activeColors.border,
    backgroundColor: activeColors.surface,
  };
  const inputThemeStyle = {
    borderColor: activeColors.border,
    backgroundColor: activeColors.background,
    color: activeColors.text,
  };
  const optionThemeStyle = {
    borderColor: activeColors.border,
    backgroundColor: activeColors.background,
  };
  const optionSelectedThemeStyle = {
    backgroundColor: activeColors.surfaceSoft,
  };
  const optionIndicatorThemeStyle = {
    borderColor: activeColors.border,
  };

  const buildBaseDates = () => {
    const now = new Date().toISOString();

    return {
      createdAt: now,
      updatedAt: now,
    };
  };

  const handleCreateTask = () => {
    const result = taskSchema.safeParse({
      title: taskTitle.trim(),
      description: taskDescription.trim() || undefined,
    });

    if (!result.success) {
      const formattedErrors: TaskFormErrors = {};

      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];

        if (fieldName === 'title' || fieldName === 'description') {
          formattedErrors[fieldName] = issue.message;
        }
      });

      setTaskErrors(formattedErrors);
      return;
    }

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: result.data.title,
      description: result.data.description,
      isCompleted: false,
      ...buildBaseDates(),
    };

    addTask(newTask);
    router.replace('/(tabs)/tasks');
  };

  const handleCreateNote = () => {
    const result = noteSchema.safeParse({
      title: noteTitle.trim(),
      content: noteContent.trim(),
      color: noteColor,
    });

    if (!result.success) {
      const formattedErrors: NoteFormErrors = {};

      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];

        if (
          fieldName === 'title' ||
          fieldName === 'content' ||
          fieldName === 'color'
        ) {
          formattedErrors[fieldName] = issue.message;
        }
      });

      setNoteErrors(formattedErrors);
      return;
    }

    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: result.data.title,
      content: result.data.content,
      color: result.data.color,
      ...buildBaseDates(),
    };

    addNote(newNote);
    router.replace('/(tabs)/notes');
  };

  const handleCreateHabit = () => {
    const targetValue = Number(habitTargetValue.replace(',', '.'));

    const result = habitSchema.safeParse({
      title: habitTitle.trim(),
      description: habitDescription.trim() || undefined,
      targetValue,
      unit: habitUnit.trim(),
      color: habitColor,
    });

    if (!result.success) {
      const formattedErrors: HabitFormErrors = {};

      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];

        if (
          fieldName === 'title' ||
          fieldName === 'description' ||
          fieldName === 'targetValue' ||
          fieldName === 'unit' ||
          fieldName === 'color'
        ) {
          formattedErrors[fieldName] = issue.message;
        }
      });

      setHabitErrors(formattedErrors);
      return;
    }

    const newHabit: Habit = {
      id: `habit-${Date.now()}`,
      title: result.data.title,
      description: result.data.description,
      targetValue: result.data.targetValue,
      unit: result.data.unit,
      color: result.data.color,
      logs: [],
      ...buildBaseDates(),
    };

    addHabit(newHabit);
    router.replace('/(tabs)/habits');
  };

  return (
    <>
      <Stack.Screen options={{ presentation: 'modal', title: 'Nuevo elemento' }} />

      <KeyboardAvoidingView
        style={[
          styles.keyboardView,
          { backgroundColor: activeColors.background },
        ]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[
            styles.container,
            { backgroundColor: activeColors.background },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.kicker}>Crear</Text>
          <Text style={[styles.title, { color: activeColors.text }]}>
            Nuevo elemento
          </Text>
          <Text style={[styles.description, { color: activeColors.textMuted }]}>
            Elige qué quieres añadir a Momentum.
          </Text>

          <View style={[styles.card, cardThemeStyle]}>
            <Text style={[styles.cardTitle, { color: activeColors.text }]}>
              Tipo de elemento
            </Text>

            <View style={styles.optionsContainer}>
              {itemTypeOptions.map((option) => {
                const isSelected = selectedType === option.value;

                return (
                  <Pressable
                    key={option.value}
                    onPress={() => setSelectedType(option.value)}
                    style={[
                      styles.option,
                      optionThemeStyle,
                      isSelected ? styles.optionSelected : null,
                      isSelected ? optionSelectedThemeStyle : null,
                    ]}
                  >
                    <View
                      style={[
                        styles.optionIndicator,
                        optionIndicatorThemeStyle,
                        isSelected ? styles.optionIndicatorSelected : null,
                      ]}
                    />

                    <View style={styles.optionContent}>
                      <Text
                        style={[
                          styles.optionLabel,
                          { color: activeColors.text },
                          isSelected ? styles.optionLabelSelected : null,
                        ]}
                      >
                        {option.label}
                      </Text>

                      <Text
                        style={[
                          styles.optionDescription,
                          { color: activeColors.textMuted },
                        ]}
                      >
                        {option.description}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {selectedType === 'task' ? (
            <View style={[styles.card, cardThemeStyle]}>
              <Text style={[styles.cardTitle, { color: activeColors.text }]}>
                Datos de la tarea
              </Text>

              <View style={styles.field}>
                <Text style={[styles.label, { color: activeColors.text }]}>
                  Título
                </Text>
                <TextInput
                  value={taskTitle}
                  onChangeText={(value) => {
                    setTaskTitle(value);
                    setTaskErrors((currentErrors) => ({
                      ...currentErrors,
                      title: undefined,
                    }));
                  }}
                  placeholder="Ej: Revisar documentación"
                  placeholderTextColor={activeColors.textMuted}
                  style={[
                    styles.input,
                    inputThemeStyle,
                    taskErrors.title ? styles.inputError : null,
                  ]}
                />
                {taskErrors.title ? (
                  <Text style={styles.errorText}>{taskErrors.title}</Text>
                ) : null}
              </View>

              <View style={styles.field}>
                <Text style={[styles.label, { color: activeColors.text }]}>
                  Descripción opcional
                </Text>
                <TextInput
                  value={taskDescription}
                  onChangeText={(value) => {
                    setTaskDescription(value);
                    setTaskErrors((currentErrors) => ({
                      ...currentErrors,
                      description: undefined,
                    }));
                  }}
                  placeholder="Ej: Añadir notas del último bloque"
                  placeholderTextColor={activeColors.textMuted}
                  multiline
                  style={[styles.input, inputThemeStyle, styles.textArea]}
                />
                {taskErrors.description ? (
                  <Text style={styles.errorText}>{taskErrors.description}</Text>
                ) : null}
              </View>

              <Pressable style={styles.primaryButton} onPress={handleCreateTask}>
                <Text
                  style={[
                    styles.primaryButtonText,
                    { color: activeColors.background },
                  ]}
                >
                  Crear tarea
                </Text>
              </Pressable>
            </View>
          ) : null}

          {selectedType === 'note' ? (
            <View style={[styles.card, cardThemeStyle]}>
              <Text style={[styles.cardTitle, { color: activeColors.text }]}>
                Datos de la nota
              </Text>

              <View style={styles.field}>
                <Text style={[styles.label, { color: activeColors.text }]}>
                  Título
                </Text>
                <TextInput
                  value={noteTitle}
                  onChangeText={(value) => {
                    setNoteTitle(value);
                    setNoteErrors((currentErrors) => ({
                      ...currentErrors,
                      title: undefined,
                    }));
                  }}
                  placeholder="Ej: Idea para mejorar la app"
                  placeholderTextColor={activeColors.textMuted}
                  style={[
                    styles.input,
                    inputThemeStyle,
                    noteErrors.title ? styles.inputError : null,
                  ]}
                />
                {noteErrors.title ? (
                  <Text style={styles.errorText}>{noteErrors.title}</Text>
                ) : null}
              </View>

              <View style={styles.field}>
                <Text style={[styles.label, { color: activeColors.text }]}>
                  Contenido
                </Text>
                <TextInput
                  value={noteContent}
                  onChangeText={(value) => {
                    setNoteContent(value);
                    setNoteErrors((currentErrors) => ({
                      ...currentErrors,
                      content: undefined,
                    }));
                  }}
                  placeholder="Escribe una nota rápida..."
                  placeholderTextColor={activeColors.textMuted}
                  multiline
                  style={[
                    styles.input,
                    inputThemeStyle,
                    styles.textArea,
                    noteErrors.content ? styles.inputError : null,
                  ]}
                />
                {noteErrors.content ? (
                  <Text style={styles.errorText}>{noteErrors.content}</Text>
                ) : null}
              </View>

              <View style={styles.field}>
                <Text style={[styles.label, { color: activeColors.text }]}>
                  Color
                </Text>
                <View style={styles.colorOptions}>
                  {habitColorOptions.map((color) => {
                    const isSelected = noteColor === color;

                    return (
                      <Pressable
                        key={color}
                        onPress={() => setNoteColor(color)}
                        style={[
                          styles.colorOption,
                          { backgroundColor: color },
                          isSelected ? styles.colorOptionSelected : null,
                          isSelected
                            ? { borderColor: activeColors.text }
                            : null,
                        ]}
                      />
                    );
                  })}
                </View>
              </View>

              <Pressable style={styles.primaryButton} onPress={handleCreateNote}>
                <Text
                  style={[
                    styles.primaryButtonText,
                    { color: activeColors.background },
                  ]}
                >
                  Crear nota
                </Text>
              </Pressable>
            </View>
          ) : null}

          {selectedType === 'habit' ? (
            <View style={[styles.card, cardThemeStyle]}>
              <Text style={[styles.cardTitle, { color: activeColors.text }]}>
                Datos del hábito
              </Text>

              <View style={styles.field}>
                <Text style={[styles.label, { color: activeColors.text }]}>
                  Título
                </Text>
                <TextInput
                  value={habitTitle}
                  onChangeText={(value) => {
                    setHabitTitle(value);
                    setHabitErrors((currentErrors) => ({
                      ...currentErrors,
                      title: undefined,
                    }));
                  }}
                  placeholder="Ej: Beber agua"
                  placeholderTextColor={activeColors.textMuted}
                  style={[
                    styles.input,
                    inputThemeStyle,
                    habitErrors.title ? styles.inputError : null,
                  ]}
                />
                {habitErrors.title ? (
                  <Text style={styles.errorText}>{habitErrors.title}</Text>
                ) : null}
              </View>

              <View style={styles.field}>
                <Text style={[styles.label, { color: activeColors.text }]}>
                  Descripción opcional
                </Text>
                <TextInput
                  value={habitDescription}
                  onChangeText={(value) => {
                    setHabitDescription(value);
                    setHabitErrors((currentErrors) => ({
                      ...currentErrors,
                      description: undefined,
                    }));
                  }}
                  placeholder="Ej: Registrar vasos de agua al día"
                  placeholderTextColor={activeColors.textMuted}
                  multiline
                  style={[styles.input, inputThemeStyle, styles.textArea]}
                />
                {habitErrors.description ? (
                  <Text style={styles.errorText}>{habitErrors.description}</Text>
                ) : null}
              </View>

              <View style={styles.inlineFields}>
                <View style={styles.inlineField}>
                  <Text style={[styles.label, { color: activeColors.text }]}>
                    Objetivo
                  </Text>
                  <TextInput
                    value={habitTargetValue}
                    onChangeText={(value) => {
                      setHabitTargetValue(value);
                      setHabitErrors((currentErrors) => ({
                        ...currentErrors,
                        targetValue: undefined,
                      }));
                    }}
                    placeholder="8"
                    placeholderTextColor={activeColors.textMuted}
                    keyboardType="numeric"
                    style={[
                      styles.input,
                      inputThemeStyle,
                      habitErrors.targetValue ? styles.inputError : null,
                    ]}
                  />
                  {habitErrors.targetValue ? (
                    <Text style={styles.errorText}>
                      {habitErrors.targetValue}
                    </Text>
                  ) : null}
                </View>

                <View style={styles.inlineField}>
                  <Text style={[styles.label, { color: activeColors.text }]}>
                    Unidad
                  </Text>
                  <TextInput
                    value={habitUnit}
                    onChangeText={(value) => {
                      setHabitUnit(value);
                      setHabitErrors((currentErrors) => ({
                        ...currentErrors,
                        unit: undefined,
                      }));
                    }}
                    placeholder="vasos"
                    placeholderTextColor={activeColors.textMuted}
                    style={[
                      styles.input,
                      inputThemeStyle,
                      habitErrors.unit ? styles.inputError : null,
                    ]}
                  />
                  {habitErrors.unit ? (
                    <Text style={styles.errorText}>{habitErrors.unit}</Text>
                  ) : null}
                </View>
              </View>

              <View style={styles.field}>
                <Text style={[styles.label, { color: activeColors.text }]}>
                  Color
                </Text>
                <View style={styles.colorOptions}>
                  {habitColorOptions.map((color) => {
                    const isSelected = habitColor === color;

                    return (
                      <Pressable
                        key={color}
                        onPress={() => setHabitColor(color)}
                        style={[
                          styles.colorOption,
                          { backgroundColor: color },
                          isSelected ? styles.colorOptionSelected : null,
                          isSelected
                            ? { borderColor: activeColors.text }
                            : null,
                        ]}
                      />
                    );
                  })}
                </View>
              </View>

              <Pressable style={styles.primaryButton} onPress={handleCreateHabit}>
                <Text
                  style={[
                    styles.primaryButtonText,
                    { color: activeColors.background },
                  ]}
                >
                  Crear hábito
                </Text>
              </Pressable>
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  kicker: {
    color: colors.brand.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    marginTop: spacing.sm,
    fontSize: 32,
    fontWeight: '700',
  },
  description: {
    marginTop: spacing.sm,
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    marginTop: spacing.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderRadius: radius.lg,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  optionsContainer: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderRadius: radius.md,
  },
  optionSelected: {
    borderColor: colors.brand.primary,
  },
  optionIndicator: {
    width: 14,
    height: 14,
    borderWidth: 2,
    borderRadius: 999,
  },
  optionIndicatorSelected: {
    borderColor: colors.brand.primary,
    backgroundColor: colors.brand.primary,
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  optionLabelSelected: {
    color: colors.brand.primary,
  },
  optionDescription: {
    marginTop: 2,
    fontSize: 13,
    lineHeight: 18,
  },
  field: {
    marginTop: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    minHeight: 48,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderRadius: radius.md,
    fontSize: 16,
  },
  inputError: {
    borderColor: colors.feedback.error,
  },
  textArea: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  errorText: {
    marginTop: spacing.xs,
    color: colors.feedback.error,
    fontSize: 13,
  },
  inlineFields: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  inlineField: {
    flex: 1,
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  colorOption: {
    width: 36,
    height: 36,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 999,
  },
  colorOptionSelected: {
  },
  primaryButton: {
    alignItems: 'center',
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.brand.primary,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
