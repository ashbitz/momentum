import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
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

type NewItemSearchParams = {
  type?: string | string[];
  id?: string | string[];
};

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

const colorOptions = [
  colors.habits.coral,
  colors.habits.orange,
  colors.habits.yellow,
  colors.habits.blue,
  colors.habits.cyan,
  colors.habits.momentum,
  colors.habits.magenta,
];

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getItemType(value: string | undefined): ItemType | undefined {
  if (value === 'habit' || value === 'task' || value === 'note') {
    return value;
  }

  return undefined;
}

export default function NewItemScreen() {
  const params = useLocalSearchParams<NewItemSearchParams>();
  const routeType = getItemType(getSingleParam(params.type));
  const itemId = getSingleParam(params.id);
  const isEditMode = routeType !== undefined && itemId !== undefined;
  const { colors: activeColors } = useAppTheme();
  const habits = useMomentumStore((state) => state.habits);
  const tasks = useMomentumStore((state) => state.tasks);
  const notes = useMomentumStore((state) => state.notes);
  const addHabit = useMomentumStore((state) => state.addHabit);
  const addTask = useMomentumStore((state) => state.addTask);
  const addNote = useMomentumStore((state) => state.addNote);
  const updateHabit = useMomentumStore((state) => state.updateHabit);
  const updateTask = useMomentumStore((state) => state.updateTask);
  const updateNote = useMomentumStore((state) => state.updateNote);

  const [selectedType, setSelectedType] = useState<ItemType>(routeType ?? 'task');

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskColor, setTaskColor] = useState<string>(colors.brand.primary);
  const [taskErrors, setTaskErrors] = useState<TaskFormErrors>({});

  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteColor, setNoteColor] = useState<string>(colors.brand.primary);
  const [noteErrors, setNoteErrors] = useState<NoteFormErrors>({});

  const [habitTitle, setHabitTitle] = useState('');
  const [habitDescription, setHabitDescription] = useState('');
  const [habitTargetValue, setHabitTargetValue] = useState('1');
  const [habitUnit, setHabitUnit] = useState('');
  const [habitColor, setHabitColor] = useState<string>(colors.habits.coral);
  const [habitErrors, setHabitErrors] = useState<HabitFormErrors>({});

  const editingHabit =
    isEditMode && routeType === 'habit'
      ? habits.find((currentHabit) => currentHabit.id === itemId)
      : undefined;
  const editingTask =
    isEditMode && routeType === 'task'
      ? tasks.find((currentTask) => currentTask.id === itemId)
      : undefined;
  const editingNote =
    isEditMode && routeType === 'note'
      ? notes.find((currentNote) => currentNote.id === itemId)
      : undefined;

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

  const buildBaseDates = () => {
    const now = new Date().toISOString();

    return {
      createdAt: now,
      updatedAt: now,
    };
  };

  useEffect(() => {
    if (!isEditMode || routeType === undefined) {
      return;
    }

    setSelectedType(routeType);

    if (routeType === 'habit' && editingHabit) {
      setHabitTitle(editingHabit.title);
      setHabitDescription(editingHabit.description ?? '');
      setHabitTargetValue(String(editingHabit.targetValue));
      setHabitUnit(editingHabit.unit);
      setHabitColor(editingHabit.color);
      setHabitErrors({});
    }

    if (routeType === 'task' && editingTask) {
      setTaskTitle(editingTask.title);
      setTaskDescription(editingTask.description ?? '');
      setTaskColor(editingTask.color ?? colors.brand.primary);
      setTaskErrors({});
    }

    if (routeType === 'note' && editingNote) {
      setNoteTitle(editingNote.title);
      setNoteContent(editingNote.content);
      setNoteColor(editingNote.color ?? colors.brand.primary);
      setNoteErrors({});
    }
  }, [editingHabit, editingNote, editingTask, isEditMode, routeType]);

  const handleCreateTask = async () => {
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
      color: taskColor,
      ...buildBaseDates(),
    };

    await addTask(newTask);
    router.replace('/(tabs)/tasks');
  };

  const handleUpdateTask = async () => {
    if (!editingTask) {
      return;
    }

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

    const updatedTask: Task = {
      ...editingTask,
      title: result.data.title,
      description: result.data.description,
      color: taskColor,
      updatedAt: new Date().toISOString(),
    };

    await updateTask(editingTask.id, updatedTask);
    router.replace('/(tabs)/tasks');
  };

  const handleCreateNote = async () => {
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

    await addNote(newNote);
    router.replace('/(tabs)/notes');
  };

  const handleUpdateNote = async () => {
    if (!editingNote) {
      return;
    }

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

    const updatedNote: Note = {
      ...editingNote,
      title: result.data.title,
      content: result.data.content,
      color: result.data.color,
      updatedAt: new Date().toISOString(),
    };

    await updateNote(editingNote.id, updatedNote);
    router.replace('/(tabs)/notes');
  };

  const handleCreateHabit = async () => {
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

    await addHabit(newHabit);
    router.replace('/(tabs)/habits');
  };

  const handleUpdateHabit = async () => {
    if (!editingHabit) {
      return;
    }

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

    const updatedHabit: Habit = {
      ...editingHabit,
      title: result.data.title,
      description: result.data.description,
      targetValue: result.data.targetValue,
      unit: result.data.unit,
      color: result.data.color,
      updatedAt: new Date().toISOString(),
    };

    await updateHabit(editingHabit.id, updatedHabit);
    router.replace('/(tabs)/habits');
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false, presentation: 'modal' }} />

      <SafeAreaView
        style={[
          styles.safeArea,
          { backgroundColor: activeColors.background },
        ]}
        edges={['top']}
      >
        <LinearGradient
          colors={[
            activeColors.background,
            activeColors.surfaceSoft,
            activeColors.background,
          ]}
          locations={[0, 0.55, 1]}
          style={styles.gradient}
        >
          <KeyboardAvoidingView
            style={styles.keyboardView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView
              contentContainerStyle={styles.container}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.topBar}>
                <Pressable hitSlop={16} onPress={() => router.back()}>
                  <Text style={styles.topBarIcon}>‹</Text>
                </Pressable>

                <Text style={[styles.topBarTitle, { color: activeColors.text }]}>
                  {isEditMode ? 'Editar' : 'Crear'}
                </Text>

                <View style={styles.topBarPlaceholder} />
              </View>

              <Text style={[styles.title, { color: activeColors.text }]}>
                {isEditMode ? 'Editar elemento' : 'Nuevo elemento'}
              </Text>
              <Text style={[styles.description, { color: activeColors.textMuted }]}>
                Elige qué quieres añadir a Momentum.
              </Text>

              <View style={[styles.card, cardThemeStyle]}>
                <Text style={[styles.cardTitle, { color: activeColors.text }]}>
                  Tipo de elemento
                </Text>

                <View style={styles.segmentedControl}>
                  {itemTypeOptions.map((option) => {
                    const isSelected = selectedType === option.value;

                    return (
                      <Pressable
                        key={option.value}
                        onPress={() => {
                          if (!isEditMode) {
                            setSelectedType(option.value);
                          }
                        }}
                        style={[
                          styles.segmentOption,
                          isSelected ? styles.segmentOptionSelected : null,
                        ]}
                      >
                        <Text
                          style={[
                            styles.segmentLabel,
                            {
                              color: isSelected
                                ? '#FFFFFF'
                                : activeColors.textMuted,
                            },
                          ]}
                        >
                          {option.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>

                <Text
                  style={[
                    styles.optionHelp,
                    { color: activeColors.textMuted },
                  ]}
                >
                  {
                    itemTypeOptions.find((option) => option.value === selectedType)
                      ?.description
                  }
                </Text>
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

                  <View style={styles.field}>
                    <Text style={[styles.label, { color: activeColors.text }]}>
                      Color
                    </Text>
                    <View style={styles.colorOptions}>
                      {colorOptions.map((color, index) => {
                        const isSelected = taskColor === color;

                        return (
                          <Pressable
                            key={`${color}-${index}`}
                            onPress={() => setTaskColor(color)}
                            style={[
                              styles.colorOption,
                              {
                                backgroundColor: color,
                                borderColor: isSelected
                                  ? activeColors.text
                                  : activeColors.border,
                              },
                              isSelected ? styles.colorOptionSelected : null,
                            ]}
                          />
                        );
                      })}
                    </View>
                  </View>

                  <Pressable
                    style={styles.primaryButton}
                    onPress={() => {
                      void (isEditMode ? handleUpdateTask() : handleCreateTask());
                    }}
                  >
                    <Text style={styles.primaryButtonText}>
                      {isEditMode ? 'Guardar tarea' : 'Crear tarea'}
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
                      {colorOptions.map((color, index) => {
                        const isSelected = noteColor === color;

                        return (
                          <Pressable
                            key={`${color}-${index}`}
                            onPress={() => setNoteColor(color)}
                            style={[
                              styles.colorOption,
                              {
                                backgroundColor: color,
                                borderColor: isSelected
                                  ? activeColors.text
                                  : activeColors.border,
                              },
                              isSelected ? styles.colorOptionSelected : null,
                            ]}
                          />
                        );
                      })}
                    </View>
                  </View>

                  <Pressable
                    style={styles.primaryButton}
                    onPress={() => {
                      void (isEditMode ? handleUpdateNote() : handleCreateNote());
                    }}
                  >
                    <Text style={styles.primaryButtonText}>
                      {isEditMode ? 'Guardar nota' : 'Crear nota'}
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
                      <Text style={styles.errorText}>
                        {habitErrors.description}
                      </Text>
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
                      {colorOptions.map((color, index) => {
                        const isSelected = habitColor === color;

                        return (
                          <Pressable
                            key={`${color}-${index}`}
                            onPress={() => setHabitColor(color)}
                            style={[
                              styles.colorOption,
                              {
                                backgroundColor: color,
                                borderColor: isSelected
                                  ? activeColors.text
                                  : activeColors.border,
                              },
                              isSelected ? styles.colorOptionSelected : null,
                            ]}
                          />
                        );
                      })}
                    </View>
                  </View>

                  <Pressable
                    style={styles.primaryButton}
                    onPress={() => {
                      void (isEditMode ? handleUpdateHabit() : handleCreateHabit());
                    }}
                  >
                    <Text style={styles.primaryButtonText}>
                      {isEditMode ? 'Guardar hábito' : 'Crear hábito'}
                    </Text>
                  </Pressable>
                </View>
              ) : null}
            </ScrollView>
          </KeyboardAvoidingView>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['2xl'],
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  topBarIcon: {
    color: colors.brand.primary,
    fontSize: 26,
    fontWeight: '800',
  },
  topBarPlaceholder: {
    width: 26,
  },
  topBarTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.7,
    textAlign: 'center',
  },
  description: {
    maxWidth: 300,
    alignSelf: 'center',
    marginTop: spacing.sm,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  card: {
    marginTop: spacing.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderRadius: radius.xl,
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.07,
    shadowRadius: 18,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  segmentedControl: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
    padding: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: 'rgba(20, 184, 166, 0.08)',
  },
  segmentOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },
  segmentOptionSelected: {
    backgroundColor: colors.brand.primary,
  },
  segmentLabel: {
    fontSize: 13,
    fontWeight: '800',
  },
  optionHelp: {
    marginTop: spacing.md,
    fontSize: 13,
    lineHeight: 19,
  },
  field: {
    marginTop: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    minHeight: 50,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderRadius: radius.lg,
    fontSize: 16,
  },
  inputError: {
    borderColor: colors.feedback.error,
  },
  textArea: {
    minHeight: 108,
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
    width: 38,
    height: 38,
    borderWidth: 3,
    borderColor: 'transparent',
    borderRadius: radius.full,
  },
  colorOptionSelected: {
    transform: [{ scale: 1.06 }],
  },
  primaryButton: {
    alignItems: 'center',
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.full,
    backgroundColor: colors.brand.primary,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
