import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import type { Task } from '@/types';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onPress?: () => void;
}

export function TaskCard({ task, onToggle, onPress }: TaskCardProps) {
  const { colors: activeColors } = useAppTheme();
  const taskColor = task.color ?? colors.brand.primary;

  return (
    <Pressable
      style={[
        styles.card,
        {
          borderColor: activeColors.border,
          backgroundColor: activeColors.surface,
        },
      ]}
      onPress={onPress}
    >
      <View style={[styles.colorStrip, { backgroundColor: taskColor }]} />

      <Pressable
        style={[
          styles.checkbox,
          {
            borderColor: task.isCompleted ? taskColor : activeColors.border,
            backgroundColor: task.isCompleted
              ? taskColor
              : activeColors.surfaceSoft,
          },
        ]}
        onPress={() => onToggle(task.id)}
      >
        <Text style={styles.checkboxText}>{task.isCompleted ? '✓' : ''}</Text>
      </Pressable>

      <View style={styles.cardContent}>
        <Text
          style={[
            styles.cardTitle,
            {
              color: task.isCompleted
                ? activeColors.textMuted
                : activeColors.text,
            },
            task.isCompleted ? styles.cardTitleCompleted : null,
          ]}
          numberOfLines={1}
        >
          {task.title}
        </Text>

        {task.description ? (
          <Text
            style={[
              styles.cardDescription,
              { color: activeColors.textMuted },
            ]}
            numberOfLines={1}
          >
            {task.description}
          </Text>
        ) : null}

        <Text style={[styles.cardMeta, { color: activeColors.textMuted }]}>
          {task.isCompleted ? 'Completada' : 'Pendiente'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    paddingLeft: spacing.lg,
    borderWidth: 1,
    borderRadius: radius.xl,
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 2,
  },
  colorStrip: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
  },
  checkbox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    height: 34,
    borderWidth: 2,
    borderRadius: radius.full,
  },
  checkboxText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 20,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  cardTitleCompleted: {
    textDecorationLine: 'line-through',
  },
  cardDescription: {
    marginTop: spacing.xs,
    fontSize: 13,
    lineHeight: 18,
  },
  cardMeta: {
    marginTop: spacing.sm,
    fontSize: 12,
    fontWeight: '700',
  },
});
