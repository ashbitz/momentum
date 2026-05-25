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
      <Text
        style={styles.checkbox}
        onPress={() => {
          onToggle(task.id);
        }}
      >
        {task.isCompleted ? '✓' : '○'}
      </Text>

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
        >
          {task.title}
        </Text>

        {task.description ? (
          <Text
            style={[
              styles.cardDescription,
              { color: activeColors.textMuted },
            ]}
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
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderRadius: radius.lg,
  },
  checkbox: {
    width: 28,
    color: colors.brand.accent,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  cardTitleCompleted: {
    textDecorationLine: 'line-through',
  },
  cardDescription: {
    marginTop: spacing.xs,
    fontSize: 14,
    lineHeight: 20,
  },
  cardMeta: {
    marginTop: spacing.sm,
    fontSize: 13,
  },
});
