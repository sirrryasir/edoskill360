import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type BadgeStatus = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface BadgeProps {
  text: string;
  status?: BadgeStatus;
  icon?: React.ReactNode;
}

export function Badge({ text, status = 'neutral', icon }: BadgeProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const getColors = () => {
    switch (status) {
      case 'success':
        return { bg: theme.success + '20', text: theme.success }; // 20% opacity bg
      case 'warning':
        return { bg: theme.warning + '20', text: theme.warning };
      case 'error':
        return { bg: theme.error + '20', text: theme.error };
      case 'info':
        return { bg: theme.primary + '20', text: theme.primary };
      case 'neutral':
      default:
        return { bg: theme.border, text: theme.textSecondary };
    }
  };

  const { bg, text: textColor } = getColors();

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <ThemedText style={[styles.text, { color: textColor }]}>
        {text}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999, // Pill shape
    alignSelf: 'flex-start',
  },
  iconContainer: {
    marginRight: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
});
