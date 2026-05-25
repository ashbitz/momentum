import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '@/constants/theme';
import type { Task } from '@/types';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onPress?: () => void;
}

export function TaskCard({ task, onToggle, onPress }: TaskCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
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
            task.isCompleted && styles.cardTitleCompleted,
          ]}
        >
          {task.title}
        </Text>

        {task.description ? (
          <Text style={styles.cardDescription}>{task.description}</Text>
        ) : null}

        <Text style={styles.cardMeta}>
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
    borderColor: colors.dark.border,
    borderRadius: radius.lg,
    backgroundColor: colors.dark.surface,
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
    color: colors.dark.text,
    fontSize: 18,
    fontWeight: '700',
  },
  cardTitleCompleted: {
    color: colors.dark.textMuted,
    textDecorationLine: 'line-through',
  },
  cardDescription: {
    marginTop: spacing.xs,
    color: colors.dark.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  cardMeta: {
    marginTop: spacing.sm,
    color: colors.dark.textMuted,
    fontSize: 13,
  },
});