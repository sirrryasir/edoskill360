import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Share2, ShieldCheck, MapPin, Briefcase, LogOut } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { useAuthStore } from '@/store/useAuthStore';
import { useSkillStore } from '@/store/useSkillStore';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedText } from '@/components/themed-text';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const { userSkills, fetchUserSkills } = useSkillStore();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    fetchUserSkills();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserSkills();
    setRefreshing(false);
  };

  const handleLogout = async () => {
      await logout();
      router.replace('/login');
  };

  if (!user) return null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <ThemedText type="headingM">Profile</ThemedText>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <TouchableOpacity onPress={handleLogout}>
            <LogOut size={24} color={theme.error} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Profile Card */}
        <Card style={styles.profileCard} padding="lg">
          <View style={styles.profileHeader}>
            <View style={[styles.avatarPlaceholder, { backgroundColor: theme.primary }]}>
                <ThemedText type="headingXL" style={{ color: 'white' }}>
                    {user.name.charAt(0).toUpperCase()}
                </ThemedText>
            </View>
            <View style={styles.profileInfo}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <ThemedText type="headingL">{user.name}</ThemedText>
                <ShieldCheck size={20} color={theme.success} />
              </View>
              <ThemedText style={{ color: theme.textSecondary, marginBottom: 4 }}>
                {user.headline || (user.role === 'talent' ? 'Skilled Professional' : 'Employer')}
              </ThemedText>
              <View style={styles.locationRow}>
                <MapPin size={14} color={theme.textSecondary} />
                <ThemedText type="small" style={{ color: theme.textSecondary, marginLeft: 4 }}>
                  {user.location || 'Remote'}
                </ThemedText>
              </View>
            </View>
          </View>

          <View style={[styles.trustSummary, { backgroundColor: theme.background }]}>
            <View style={styles.trustItem}>
              <ThemedText type="headingL" style={{ color: theme.primary }}>{user.trustScore || 0}</ThemedText>
              <ThemedText type="small" style={{ color: theme.textSecondary }}>Trust Score</ThemedText>
            </View>
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <View style={styles.trustItem}>
              <ThemedText type="headingL" style={{ color: theme.text }}>12</ThemedText>
              <ThemedText type="small" style={{ color: theme.textSecondary }}>Jobs Done</ThemedText>
            </View>
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <View style={styles.trustItem}>
              <ThemedText type="headingL" style={{ color: theme.text }}>4.8</ThemedText>
              <ThemedText type="small" style={{ color: theme.textSecondary }}>Rating</ThemedText>
            </View>
          </View>
        </Card>

        {/* Verified Skills */}
        {user.role === 'talent' && (
            <View style={styles.section}>
            <ThemedText type="headingM" style={{ marginBottom: 12 }}>Verified Skills</ThemedText>
            <View style={styles.skillsContainer}>
                {userSkills.length > 0 ? (
                    userSkills.map((us) => (
                        <Badge 
                            key={us._id} 
                            text={us.skillId.name} 
                            status={us.verified ? 'success' : 'warning'} 
                            icon={us.verified ? <ShieldCheck size={12} color={theme.success} /> : undefined} 
                        />
                    ))
                ) : (
                    <ThemedText style={{ color: theme.textSecondary }}>No skills added yet.</ThemedText>
                )}
            </View>
            </View>
        )}

        {/* Experience / Portfolio (Placeholder) */}
        <View style={styles.section}>
          <ThemedText type="headingM" style={{ marginBottom: 12 }}>Bio</ThemedText>
          <Card padding="md">
             <ThemedText style={{ color: theme.textSecondary }}>
                 {user.bio || "No bio available. Please edit your profile to add more details."}
             </ThemedText>
          </Card>
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
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  profileCard: {
    marginBottom: 24,
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  trustSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 16,
    borderRadius: 12,
  },
  trustItem: {
    alignItems: 'center',
    flex: 1,
  },
  divider: {
    width: 1,
    height: '80%',
    alignSelf: 'center',
  },
  section: {
    marginBottom: 24,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
