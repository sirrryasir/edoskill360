import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Card, Title, Text, Button, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/useAuthStore';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Briefcase, ShieldCheck, CheckCircle, FileText, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const { user } = useAuthStore();
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];
  const router = useRouter();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Refresh logic here
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  if (!user) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const isWorker = user.role === 'worker';
  const isEmployer = user.role === 'employer';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={{ fontSize: 16, color: themeColors.icon }}>Welcome back,</Text>
          <Title style={{ fontSize: 24, fontWeight: 'bold', color: themeColors.text }}>{user.name}</Title>
        </View>
        <Avatar.Text size={48} label={user.name.substring(0, 2).toUpperCase()} style={{ backgroundColor: themeColors.primary }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Quick Actions / Stats */}
        <View style={styles.statsRow}>
          <Card style={[styles.statCard, { backgroundColor: themeColors.card }]}>
            <Card.Content style={styles.statContent}>
              <Text style={[styles.statValue, { color: themeColors.primary }]}>
                {isWorker ? '85' : '12'}
              </Text>
              <Text style={[styles.statLabel, { color: themeColors.icon }]}>
                {isWorker ? 'Skill Score' : 'Active Jobs'}
              </Text>
            </Card.Content>
          </Card>
          <Card style={[styles.statCard, { backgroundColor: themeColors.card }]}>
            <Card.Content style={styles.statContent}>
              <Text style={[styles.statValue, { color: themeColors.primary }]}>
                {isWorker ? '3' : '45'}
              </Text>
              <Text style={[styles.statLabel, { color: themeColors.icon }]}>
                {isWorker ? 'Active Jobs' : 'Applicants'}
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* Action Cards */}
        <View style={styles.section}>
          <Title style={[styles.sectionTitle, { color: themeColors.text }]}>Quick Actions</Title>

          {isWorker && (
            <>
              <TouchableOpacity onPress={() => router.push('/jobs')}>
                <Card style={[styles.actionCard, { backgroundColor: themeColors.card }]}>
                  <Card.Content style={styles.actionContent}>
                    <View style={[styles.iconBox, { backgroundColor: '#eff6ff' }]}>
                      <Briefcase size={24} color={Colors.light.primary} />
                    </View>
                    <View style={styles.actionText}>
                      <Title style={{ fontSize: 16 }}>Find Jobs</Title>
                      <Text style={{ fontSize: 12, color: themeColors.icon }}>Browse latest opportunities</Text>
                    </View>
                  </Card.Content>
                </Card>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push('/profile')}>
                <Card style={[styles.actionCard, { backgroundColor: themeColors.card }]}>
                  <Card.Content style={styles.actionContent}>
                    <View style={[styles.iconBox, { backgroundColor: '#f0fdf4' }]}>
                      <ShieldCheck size={24} color="#16a34a" />
                    </View>
                    <View style={styles.actionText}>
                      <Title style={{ fontSize: 16 }}>Verify Skills</Title>
                      <Text style={{ fontSize: 12, color: themeColors.icon }}>Take assessments to boost trust</Text>
                    </View>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            </>
          )}

          {isEmployer && (
            <>
              <TouchableOpacity onPress={() => router.push('/Talents')}>
                <Card style={[styles.actionCard, { backgroundColor: themeColors.card }]}>
                  <Card.Content style={styles.actionContent}>
                    <View style={[styles.iconBox, { backgroundColor: '#eff6ff' }]}>
                      <User size={24} color={Colors.light.primary} />
                    </View>
                    <View style={styles.actionText}>
                      <Title style={{ fontSize: 16 }}>Find Talent</Title>
                      <Text style={{ fontSize: 12, color: themeColors.icon }}>Search for verified Talents</Text>
                    </View>
                  </Card.Content>
                </Card>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { /* Navigate to Post Job */ }}>
                <Card style={[styles.actionCard, { backgroundColor: themeColors.card }]}>
                  <Card.Content style={styles.actionContent}>
                    <View style={[styles.iconBox, { backgroundColor: '#f5f3ff' }]}>
                      <FileText size={24} color="#7c3aed" />
                    </View>
                    <View style={styles.actionText}>
                      <Title style={{ fontSize: 16 }}>Post a Job</Title>
                      <Text style={{ fontSize: 12, color: themeColors.icon }}>Create a new job listing</Text>
                    </View>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Verification Status (Worker) */}
        {isWorker && (
          <View style={styles.section}>
            <Title style={[styles.sectionTitle, { color: themeColors.text }]}>Verification Status</Title>
            <Card style={[styles.verificationCard, { backgroundColor: themeColors.primary }]}>
              <Card.Content style={styles.verificationContent}>
                <View>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Identity Verified</Text>
                  <Text style={{ color: '#bfdbfe', fontSize: 12 }}>You are a trusted member</Text>
                </View>
                <CheckCircle size={32} color="white" />
              </Card.Content>
            </Card>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 25,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
  },
  statContent: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  actionCard: {
    marginBottom: 12,
    borderRadius: 12,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  actionText: {
    flex: 1,
  },
  verificationCard: {
    borderRadius: 12,
  },
  verificationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
