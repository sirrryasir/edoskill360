import React from 'react';
import { StyleSheet, View, ViewStyle, Platform } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  bordered?: boolean;
}

export function Card({ children, style, padding = 'md', bordered = true }: CardProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const getPadding = () => {
    switch (padding) {
      case 'none': return 0;
      case 'sm': return 12;
      case 'md': return 16;
      case 'lg': return 24;
      default: return 16;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          borderWidth: bordered ? 1 : 0,
          padding: getPadding(),
          shadowColor: theme.text,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    width: '100%',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
