import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ShieldCheck, Mail, Lock } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuthStore } from '@/store/useAuthStore';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import api from '@/config/api';

import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuthStore();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Information', 'Please provide both email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      const data = res.data;
      login(data);
      router.replace('/(tabs)');
    } catch (error: any) {
      const message = error.response?.data?.message || "Please check your credentials and try again.";
      Alert.alert('Authentication Failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header Section */}
          <View style={styles.header}>
            <View style={[styles.logoBadge, { backgroundColor: theme.primary + '15' }]}>
              <ShieldCheck size={48} color={theme.primary} />
            </View>
            <ThemedText type="headingXL" align="center" style={styles.title}>
              EduSkill360
            </ThemedText>
            <ThemedText type="default" align="center" style={{ color: theme.textSecondary }}>
              Professional Verification & Talent Platform
            </ThemedText>
          </View>

          {/* Form Section */}
          <View style={styles.form}>
            <Input
              label="Work Email"
              value={email}
              onChangeText={setEmail}
              placeholder="name@company.com"
              keyboardType="email-address"
              autoCapitalize="none"
              icon={<Mail size={20} color={theme.icon} />}
            />
            
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              icon={<Lock size={20} color={theme.icon} />}
            />

            <TouchableOpacity style={styles.forgotPassword}>
              <ThemedText type="defaultSemiBold" style={{ color: theme.primary }}>
                Forgot Password?
              </ThemedText>
            </TouchableOpacity>

            <Button 
              title="Secure Sign In"
              onPress={handleLogin}
              loading={loading}
              fullWidth
              size="lg"
            />

            <View style={styles.footer}>
              <ThemedText style={{ color: theme.textSecondary }}>
                New to EduSkill360?{' '}
              </ThemedText>
              <TouchableOpacity onPress={() => Alert.alert("Registration", "Please visit our website to create a verified professional account.")}>
                <ThemedText type="defaultSemiBold" style={{ color: theme.primary }}>
                  Apply for Access
                </ThemedText>
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
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoBadge: {
    width: 88,
    height: 88,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
  },
  form: {
    width: '100%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
});
