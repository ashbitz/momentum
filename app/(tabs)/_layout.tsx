import { Tabs } from 'expo-router';
import { Text } from 'react-native';

import { colors } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';

export default function TabsLayout() {
  const { colors: activeColors } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.brand.primary,
        tabBarInactiveTintColor: activeColors.textMuted,
        tabBarStyle: {
          backgroundColor: activeColors.surface,
          borderTopColor: activeColors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Text style={{ color }}>⌂</Text>,
        }}
      />

      <Tabs.Screen
        name="habits"
        options={{
          title: 'Hábitos',
          tabBarIcon: ({ color }) => <Text style={{ color }}>◼</Text>,
        }}
      />

      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tareas',
          tabBarIcon: ({ color }) => <Text style={{ color }}>✓</Text>,
        }}
      />

      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notas',
          tabBarIcon: ({ color }) => <Text style={{ color }}>✎</Text>,
        }}
      />

      <Tabs.Screen
        name="more"
        options={{
          title: 'Más',
          tabBarIcon: ({ color }) => <Text style={{ color }}>•••</Text>,
        }}
      />
    </Tabs>
  );
}
