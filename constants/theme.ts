export const colors = {
  light: {
    background: '#F4FBFA',
    surface: '#FFFFFF',
    surfaceSoft: '#E8F6F4',
    text: '#10201F',
    textMuted: '#647876',
    border: '#D7E8E5',
  },

  dark: {
    background: '#071A1F',
    surface: '#0D2730',
    surfaceSoft: '#143641',
    text: '#F2FFFD',
    textMuted: '#91AAA8',
    border: '#1F4650',
  },

  brand: {
    primary: '#14B8A6',
    secondary: '#22D3EE',
    accent: '#2DD4BF',
  },

  habits: {
    coral: '#FF5A4F',
    orange: '#FF7A1A',
    yellow: '#FACC15',
    blue: '#2F80ED',
    cyan: '#18C9D2',
    momentum: '#14B8A6',
    magenta: '#D946EF',

    // Aliases used by the app UI.
    workout: '#FF5A4F',
    energy: '#FF7A1A',
    steps: '#FACC15',
    reading: '#2F80ED',
    water: '#18C9D2',
    meditation: '#D946EF',
  },

  feedback: {
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    errorSoft: '#FDE7E4',
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