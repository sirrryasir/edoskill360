import { Platform } from 'react-native';

const tintColorLight = '#2563EB'; // Brand Blue
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#0F172A', // Slate 900
    background: '#F8FAFC', // Slate 50
    tint: tintColorLight,
    icon: '#64748B', // Slate 500
    tabIconDefault: '#94A3B8', // Slate 400
    tabIconSelected: tintColorLight,
    primary: '#2563EB',
    secondary: '#4F46E5',
    card: '#FFFFFF',
    border: '#E2E8F0',
    error: '#EF4444',
  },
  dark: {
    text: '#F8FAFC',
    background: '#020617', // Slate 950
    tint: tintColorDark,
    icon: '#94A3B8',
    tabIconDefault: '#64748B',
    tabIconSelected: tintColorDark,
    primary: '#3B82F6',
    secondary: '#6366F1',
    card: '#1E293B', // Slate 800
    border: '#334155',
    error: '#EF4444',
  },
};