import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ThemedText } from './themed-text';
import { Card } from './ui/Card';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { CheckCircle2, Circle, Lock } from 'lucide-react-native';

interface Step {
  id: string;
  title: string;
  status: 'completed' | 'current' | 'locked';
}

interface VerificationStepperProps {
  steps: Step[];
}

export function VerificationStepper({ steps }: VerificationStepperProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="headingM">Verification Path</ThemedText>
        <ThemedText type="small" style={{ color: theme.primary }}>View Details</ThemedText>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const isActive = step.status === 'current';
          const isCompleted = step.status === 'completed';

          return (
            <Card 
              key={step.id} 
              style={[
                styles.stepCard, 
                { 
                  borderColor: isActive ? theme.primary : theme.border,
                  backgroundColor: isActive ? theme.primary + '05' : theme.card 
                }
              ]} 
              padding="md"
            >
              <View style={styles.stepHeader}>
                {isCompleted ? (
                  <CheckCircle2 size={24} color={theme.success} />
                ) : step.status === 'locked' ? (
                  <Lock size={24} color={theme.textSecondary} />
                ) : (
                  <Circle size={24} color={theme.primary} />
                )}
                <ThemedText type="small" style={{ color: theme.textSecondary }}>
                  Step {index + 1}
                </ThemedText>
              </View>
              
              <ThemedText type="defaultSemiBold" style={{ marginTop: 8, marginBottom: 4 }}>
                {step.title}
              </ThemedText>
              
              <ThemedText type="small" style={{ color: isActive ? theme.primary : theme.textSecondary }}>
                {isCompleted ? 'Verified' : isActive ? 'In Progress' : 'Locked'}
              </ThemedText>
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  scrollContent: {
    gap: 12,
    paddingRight: 24,
  },
  stepCard: {
    width: 140,
    height: 120,
    justifyContent: 'space-between',
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
