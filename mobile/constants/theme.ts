import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

// 🎨 EduSkill360 / Vouch Color System

const palette = {
  // Primary - Deep Blue / Indigo -> Trust & Professionalism
  primary: '#312E81', // Indigo 900
  primaryLight: '#4338CA', // Indigo 700
  primaryDark: '#1E1B4B', // Indigo 950

  // Secondary - Calm & Supportive
  secondary: '#64748B', // Slate 500

  // Status Colors
  success: '#059669', // Emerald 600 -> Verified
  warning: '#D97706', // Amber 600 -> Pending
  error: '#DC2626', // Red 600 -> Action Required
  info: '#2563EB', // Blue 600

  // Neutrals
  white: '#FFFFFF',
  background: '#F8FAFC', // Slate 50
  surface: '#FFFFFF',
  text: '#0F172A', // Slate 900
  textSecondary: '#475569', // Slate 600
  border: '#E2E8F0', // Slate 200
  
  // Dark Mode Neutrals
  darkBackground: '#020617', // Slate 950
  darkSurface: '#0F172A', // Slate 900
  darkText: '#F8FAFC', // Slate 50
  darkTextSecondary: '#94A3B8', // Slate 400
  darkBorder: '#1E293B', // Slate 800
};

export const Colors = {
  light: {
    text: palette.text,
    textSecondary: palette.textSecondary,
    background: palette.background,
    tint: palette.primary,
    icon: palette.secondary,
    tabIconDefault: palette.secondary,
    tabIconSelected: palette.primary,
    primary: palette.primary,
    card: palette.surface,
    border: palette.border,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    white: palette.white,
  },
  dark: {
    text: palette.darkText,
    textSecondary: palette.darkTextSecondary,
    background: palette.darkBackground,
    tint: palette.white,
    icon: palette.darkTextSecondary,
    tabIconDefault: palette.darkTextSecondary,
    tabIconSelected: palette.white,
    primary: palette.primaryLight, // Lighter for dark mode visibility
    card: palette.darkSurface,
    border: palette.darkBorder,
    success: '#34D399', // Emerald 400
    warning: '#FBBF24', // Amber 400
    error: '#F87171', // Red 400
    white: palette.white,
  },
};

// React Native Paper Theme Adaptation
export const PaperThemeLight = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: palette.primary,
    secondary: palette.secondary,
    background: palette.background,
    surface: palette.surface,
    error: palette.error,
    onPrimary: palette.white,
  },
};

export const PaperThemeDark = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: palette.primaryLight,
    background: palette.darkBackground,
    surface: palette.darkSurface,
    error: palette.error,
    onPrimary: palette.white,
  },
};
