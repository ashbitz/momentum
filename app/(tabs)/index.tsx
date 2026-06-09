import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { useMomentumStore } from '@/store/useMomentumStore';


function MomentumLogo() {
  return (
    <View style={styles.logoWrapper}>
      <Svg width={58} height={34} viewBox="0 0 58 34" fill="none">
        <Path
          d="M7 27L19 7"
          stroke={colors.brand.primary}
          strokeWidth={7}
          strokeLinecap="round"
        />
        <Path
          d="M24 27L36 7"
          stroke={colors.brand.accent}
          strokeWidth={7}
          strokeLinecap="round"
          opacity={0.78}
        />
        <Path
          d="M41 27L53 7"
          stroke={colors.brand.primary}
          strokeWidth={7}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

type StatCardProps = {
  icon: string;
  value: number;
  label: string;
};

function StatCard({ icon, value, label }: StatCardProps) {
  const { colors: activeColors } = useAppTheme();

  return (
    <View
      style={[
        styles.statCard,
        {
          borderColor: activeColors.border,
          backgroundColor: activeColors.surface,
        },
      ]}
    >
      <View
        style={[
          styles.statIconBadge,
          { backgroundColor: activeColors.surfaceSoft },
        ]}
      >
        <Text style={styles.statIcon}>{icon}</Text>
      </View>

      <Text style={styles.statValue}>{value}</Text>
      <Text style={[styles.statLabel, { color: activeColors.textMuted }]}>
        {label}
      </Text>
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { colors: activeColors } = useAppTheme();

  const habits = useMomentumStore((state) => state.habits);
  const tasks = useMomentumStore((state) => state.tasks);
  const notes = useMomentumStore((state) => state.notes);

  const pendingTasks = tasks.filter((task) => !task.isCompleted).length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const currentStreak = 0;

  return (
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
        <View style={styles.container}>
          <View style={styles.brandRow}>
            <MomentumLogo />
            <Text style={styles.brandText}>Momentum</Text>
          </View>

          <Text style={[styles.title, { color: activeColors.text }]}>
            Resumen del día
          </Text>
          <Text style={[styles.description, { color: activeColors.textMuted }]}>
            Consulta de un vistazo tus hábitos, tareas y notas personales.
          </Text>

          <Pressable
            style={styles.createButton}
            onPress={() => {
              router.push('/new-item');
            }}
          >
            <Text style={styles.createButtonIcon}>＋</Text>
            <Text style={styles.createButtonText}>Crear nuevo</Text>
          </Pressable>

          <View style={styles.statsGrid}>
            <StatCard
              icon="◼"
              value={habits.length}
              label="hábitos activos"
            />
            <StatCard
              icon="✓"
              value={pendingTasks}
              label="tareas pendientes"
            />
            <StatCard
              icon="✎"
              value={notes.length}
              label="notas guardadas"
            />
            <StatCard
              icon="🔥"
            value={currentStreak}
            label="días de racha"
            />
          </View>

          <View
            style={[
              styles.summaryCard,
              {
                borderColor: activeColors.border,
                backgroundColor: activeColors.surfaceSoft,
              },
            ]}
          >
            <View style={styles.summaryIconBadge}>
              <Text
                style={[
                  styles.summaryIcon,
                  { color: activeColors.surfaceSoft },
                ]}
              >
                ★
              </Text>
            </View>

            <View style={styles.summaryContent}>
              <Text style={[styles.summaryTitle, { color: activeColors.text }]}>
                Estado actual
              </Text>
              <Text
                style={[
                  styles.summaryText,
                  { color: activeColors.textMuted },
                ]}
              >
                Has completado {completedTasks} tarea
                {completedTasks === 1 ? '' : 's'} y tienes {pendingTasks}{' '}
                pendiente
                {pendingTasks === 1 ? '' : 's'}.
              </Text>
            </View>

            <Text
              style={[
                styles.summaryArrow,
                { color: activeColors.textMuted },
              ]}
            >
              ›
            </Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  logoWrapper: {
    width: 58,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    color: colors.brand.primary,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  title: {
    maxWidth: 300,
    ...typography.openingTitle,
  },
  description: {
    maxWidth: 310,
    marginTop: spacing.md,
    ...typography.openingDescription,
  },
  createButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.full,
    backgroundColor: colors.brand.primary,
  },
  createButtonIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  statCard: {
    width: '47%',
    minHeight: 128,
    justifyContent: 'space-between',
    padding: spacing.md,
    borderWidth: 1,
    borderRadius: radius.xl,
    shadowColor: '#0F766E',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  statIconBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    height: 38,
    borderRadius: radius.full,
  },
  statIcon: {
    color: colors.brand.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  statValue: {
    marginTop: spacing.md,
    color: colors.brand.primary,
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  statLabel: {
    marginTop: spacing.xs,
    fontSize: 15,
    lineHeight: 20,
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderRadius: radius.xl,
  },
  summaryIconBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 62,
    height: 62,
    borderRadius: radius.full,
    backgroundColor: colors.brand.primary,
  },
  summaryIcon: {
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 34,
  },
  summaryContent: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  summaryText: {
    marginTop: spacing.xs,
    fontSize: 15,
    lineHeight: 22,
  },
  summaryArrow: {
    fontSize: 34,
    fontWeight: '300',
  },
});