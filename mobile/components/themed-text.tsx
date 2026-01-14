import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'headingXL' | 'headingL' | 'headingM' | 'caption' | 'small';
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  align = 'auto',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const linkColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');

  return (
    <Text
      style={[
        { color, textAlign: align },
        type === 'default' ? styles.default : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'title' ? styles.title : undefined, // Legacy support
        type === 'subtitle' ? styles.subtitle : undefined, // Legacy support
        
        // New Design System Types
        type === 'headingXL' ? styles.headingXL : undefined,
        type === 'headingL' ? styles.headingL : undefined,
        type === 'headingM' ? styles.headingM : undefined,
        type === 'caption' ? styles.caption : undefined,
        type === 'small' ? styles.small : undefined,
        
        type === 'link' ? { ...styles.link, color: linkColor } : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  // Body Text
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'System', // Use system font for now
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  
  // Headings
  headingXL: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  headingL: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    letterSpacing: -0.25,
  },
  headingM: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  
  // Utilities
  caption: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.7,
  },
  small: {
    fontSize: 12,
    lineHeight: 16,
    opacity: 0.6,
  },
  
  // Legacy mappings
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    fontWeight: '500',
  },
});