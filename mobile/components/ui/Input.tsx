import React from 'react';
import { StyleSheet, TextInput, View, TextInputProps } from 'react-native';
import { ThemedText } from '../themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({ label, error, icon, style, ...props }: InputProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.container}>
      {label && (
        <ThemedText type="defaultSemiBold" style={[styles.label, { color: theme.textSecondary }]}>
          {label}
        </ThemedText>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.background,
            borderColor: error ? theme.error : theme.border,
            borderWidth: 1,
          },
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={[
            styles.input,
            {
              color: theme.text,
              paddingLeft: icon ? 8 : 16,
            },
            style,
          ]}
          placeholderTextColor={theme.icon}
          {...props}
        />
      </View>
      {error && (
        <ThemedText style={[styles.error, { color: theme.error }]}>
          {error}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    height: 56,
  },
  iconContainer: {
    paddingLeft: 16,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingRight: 16,
    paddingLeft: 16,
    fontSize: 16,
  },
  error: {
    fontSize: 12,
    marginTop: 4,
  },
});
