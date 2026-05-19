export const colors = {
  light: {
    background: '#F7F8FA',
    surface: '#FFFFFF',
    surfaceSoft: '#EEF1F6',
    text: '#111827',
    textMuted: '#6B7280',
    border: '#E5E7EB',
  },

  dark: {
    background: '#111827',
    surface: '#1F2937',
    surfaceSoft: '#273449',
    text: '#F9FAFB',
    textMuted: '#9CA3AF',
    border: '#374151',
  },

  brand: {
    primary: '#7C5CFF',
    secondary: '#22D3EE',
    accent: '#34D399',
  },

  habits: {
    workout: '#FF5C5C',
    reading: '#7C5CFF',
    water: '#22D3EE',
    steps: '#34D399',
    meditation: '#C084FC',
  },

  feedback: {
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 18,
  xl: 24,
  full: 999,
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const theme = {
  colors,
  spacing,
  radius,
  fontSize,
  fontWeight,
} as const;