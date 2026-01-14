import { StyleSheet, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ShieldCheck, CheckCircle2, X } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ModalScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const benefits = [
    { title: 'Higher Trust Score', desc: 'Verified profiles get 2x more visibility.' },
    { title: 'Premium Jobs', desc: 'Access high-value contracts restricted to verified talent.' },
    { title: 'Payment Protection', desc: 'Guaranteed payments for verified milestones.' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <ThemedText type="headingM">Why Verify?</ThemedText>
        <Button 
          title="Close" 
          variant="ghost" 
          onPress={() => router.back()} 
          size="sm"
          icon={<X size={20} color={theme.text} />}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroIcon}>
           <View style={[styles.iconCircle, { backgroundColor: theme.primary + '15' }]}>
             <ShieldCheck size={64} color={theme.primary} />
           </View>
        </View>

        <ThemedText type="headingL" align="center" style={{ marginBottom: 12 }}>
          Build Trust. Earn More.
        </ThemedText>
        
        <ThemedText type="default" align="center" style={{ color: theme.textSecondary, marginBottom: 32 }}>
          Verification is the core of EduSkill360. It separates professionals from the crowd and guarantees quality for employers.
        </ThemedText>

        <View style={styles.benefitsContainer}>
          {benefits.map((benefit, index) => (
            <View key={index} style={[styles.benefitItem, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <CheckCircle2 size={24} color={theme.success} style={{ marginRight: 16 }} />
              <View style={{ flex: 1 }}>
                <ThemedText type="defaultSemiBold">{benefit.title}</ThemedText>
                <ThemedText type="small" style={{ color: theme.textSecondary }}>{benefit.desc}</ThemedText>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>

      <View style={[styles.footer, { borderTopColor: theme.border }]}>
        <Button 
          title="Start Verification" 
          onPress={() => router.back()} 
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  heroIcon: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitsContainer: {
    gap: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
  },
});