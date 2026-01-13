import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { TextInput, Button, ActivityIndicator, useTheme } from 'react-native-paper';
import { useAuthStore } from '@/store/useAuthStore';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '@/config/api';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuthStore();
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      
      const data = res.data;
      login(data);

      Alert.alert("Success", "Logged in successfully");
      router.replace('/(tabs)');
      
    } catch (error: any) {
      console.log("Login error:", error);
      const message = error.response?.data?.message || "Login failed. Please check your credentials.";
      Alert.alert('Login Failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
               <Text style={[styles.logoText, { color: themeColors.primary }]}>EduSkill360</Text>
            </View>
            <Text style={[styles.title, { color: themeColors.text }]}>Welcome Back</Text>
            <Text style={[styles.subtitle, { color: themeColors.icon }]}>Sign in to continue to your dashboard</Text>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
              outlineColor={themeColors.border}
              activeOutlineColor={themeColors.primary}
              textColor={themeColors.text}
              theme={{ colors: { onSurfaceVariant: themeColors.icon } }} 
            />
            
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry
              style={styles.input}
              outlineColor={themeColors.border}
              activeOutlineColor={themeColors.primary}
              textColor={themeColors.text}
              theme={{ colors: { onSurfaceVariant: themeColors.icon } }}
            />

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={[styles.forgotPasswordText, { color: themeColors.primary }]}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button 
              mode="contained" 
              onPress={handleLogin} 
              loading={loading}
              disabled={loading}
              style={[styles.button, { backgroundColor: themeColors.primary }]}
              labelStyle={styles.buttonLabel}
            >
              Sign In
            </Button>

            <View style={styles.footer}>
              <Text style={{ color: themeColors.icon }}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => Alert.alert("Coming Soon", "Registration not yet implemented on mobile")}>
                <Text style={[styles.link, { color: themeColors.primary }]}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontWeight: '600',
  },
  button: {
    paddingVertical: 6,
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  link: {
    fontWeight: 'bold',
  },
});