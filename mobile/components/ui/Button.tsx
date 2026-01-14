import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle, ActivityIndicator } from 'react-native';
import { ThemedText } from '../themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
}

export function Button({
  onPress,
  title,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  loading = false,
  style,
  fullWidth = false,
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const getBackgroundColor = () => {
    if (disabled) return theme.border;
    switch (variant) {
      case 'primary': return theme.primary;
      case 'secondary': return theme.icon; // Slate 500
      case 'danger': return theme.error;
      case 'outline': return 'transparent';
      case 'ghost': return 'transparent';
      default: return theme.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.textSecondary;
    switch (variant) {
      case 'primary': return theme.white;
      case 'secondary': return theme.white;
      case 'danger': return theme.white;
      case 'outline': return theme.primary;
      case 'ghost': return theme.text;
      default: return theme.white;
    }
  };

  const getBorderColor = () => {
    if (variant === 'outline') return theme.primary;
    return 'transparent';
  };

  const containerStyles = [
    styles.container,
    {
      backgroundColor: getBackgroundColor(),
      borderColor: getBorderColor(),
      borderWidth: variant === 'outline' ? 1.5 : 0,
      width: fullWidth ? '100%' : 'auto',
      opacity: disabled ? 0.6 : 1,
    },
    size === 'sm' && styles.sizeSm,
    size === 'md' && styles.sizeMd,
    size === 'lg' && styles.sizeLg,
    style,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={containerStyles}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {icon && <>{icon}</>}
          <ThemedText
            type="defaultSemiBold"
            style={{
              color: getTextColor(),
              marginLeft: icon ? 8 : 0,
              fontSize: size === 'sm' ? 14 : size === 'lg' ? 18 : 16,
            }}
          >
            {title}
          </ThemedText>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12, // Modern rounded corners
  },
  sizeSm: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sizeMd: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  sizeLg: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
});
