import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Bell, Search, ShieldCheck } from 'lucide-react-native';

import { useAuthStore } from '@/store/useAuthStore';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedText } from '@/components/themed-text';
import { TrustScoreCard } from '@/components/TrustScoreCard';
import { VerificationStepper } from '@/components/VerificationStepper';
import { Card } from '@/components/ui/Card';

export default function DashboardScreen() {
  const { user, checkAuth } = useAuthStore();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await checkAuth();
    setRefreshing(false);
  }, []);

  // Map user verification stage to steps
  const getStepStatus = (stepId: string) => {
    // Basic mapping logic based on user.verificationStage
    // enum: STAGE_0_UNVERIFIED, STAGE_1_PROFILE_COMPLETED, STAGE_2_SKILLS_SUBMITTED, etc.
    if (!user) return 'locked';
    
    // Identity Step (1)
    if (stepId === '1') return user.verificationStage !== 'STAGE_0_UNVERIFIED' ? 'completed' : 'current';
    
    // Skills Step (2)
    if (stepId === '2') {
        if (user.verificationStage === 'STAGE_0_UNVERIFIED') return 'locked';
        if (user.verificationStage === 'STAGE_1_PROFILE_COMPLETED') return 'current';
        return 'completed';
    }

    // Background/Interview Step (3)
    if (stepId === '3') {
        if (user.verificationStage === 'STAGE_2_SKILLS_SUBMITTED') return 'current';
        if (['STAGE_3_INTERVIEW_COMPLETED', 'STAGE_4_REFERENCES_PENDING', 'STAGE_5_VERIFIED'].includes(user.verificationStage || '')) return 'completed';
        return 'locked';
    }

    // Vouched/Final Step (4)
    if (stepId === '4') {
        if (user.verificationStage === 'STAGE_5_VERIFIED') return 'completed';
        if (user.verificationStage === 'STAGE_4_REFERENCES_PENDING') return 'current';
        return 'locked';
    }

    return 'locked';
  };

  const steps = [
    { id: '1', title: 'Identity', status: getStepStatus('1') as any },
    { id: '2', title: 'Skills', status: getStepStatus('2') as any },
    { id: '3', title: 'Interview', status: getStepStatus('3') as any },
    { id: '4', title: 'Verified', status: getStepStatus('4') as any },
  ];

  if (!user) return null;

  const isWorker = user.role === 'talent' || user.role === 'worker'; // Handle both naming conventions

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.avatarContainer, { backgroundColor: theme.primary }]}>
              <ThemedText style={{ color: 'white', fontWeight: 'bold' }}>
                  {user.name.charAt(0).toUpperCase()}
              </ThemedText>
          </View>
          <View>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>Good Morning,</ThemedText>
            <ThemedText type="headingM">{user.name.split(' ')[0]}</ThemedText>
          </View>
        </View>
        <TouchableOpacity style={[styles.iconButton, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Bell size={20} color={theme.text} />
          <View style={[styles.badgeDot, { backgroundColor: theme.error }]} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Trust Score Section */}
        <TrustScoreCard score={user.trustScore || 0} role={user.role} />

        {/* Verification Path */}
        <VerificationStepper steps={steps} />

        {/* Action Grid */}
        <View style={styles.section}>
          <ThemedText type="headingM" style={{ marginBottom: 12 }}>
            {isWorker ? 'Find Opportunities' : 'Manage Talent'}
          </ThemedText>
          
          <View style={styles.grid}>
            <TouchableOpacity 
              style={[styles.gridItem]} 
              onPress={() => router.push(isWorker ? '/jobs' : '/(tabs)/freelancers')}
            >
              <Card style={styles.actionCard} padding="md">
                <View style={[styles.actionIcon, { backgroundColor: theme.primary + '15' }]}>
                  <Search size={24} color={theme.primary} />
                </View>
                <ThemedText type="defaultSemiBold">
                  {isWorker ? 'Find Jobs' : 'Find Talent'}
                </ThemedText>
                <ThemedText type="small" style={{ color: theme.textSecondary }}>
                  {isWorker ? 'Browse verified listings' : 'Hire verified pros'}
                </ThemedText>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.gridItem]} onPress={() => router.push('/profile')}>
              <Card style={styles.actionCard} padding="md">
                <View style={[styles.actionIcon, { backgroundColor: theme.success + '15' }]}>
                  <ShieldCheck size={24} color={theme.success} />
                </View>
                <ThemedText type="defaultSemiBold">
                  My Verifications
                </ThemedText>
                <ThemedText type="small" style={{ color: theme.textSecondary }}>
                  Check status
                </ThemedText>
              </Card>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  badgeDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'white',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
  gridItem: {
    flex: 1,
  },
  actionCard: {
    height: 140,
    justifyContent: 'space-between',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
});
