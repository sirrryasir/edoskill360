import React from 'react';
import { StyleSheet, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Avatar, Button, Text, Searchbar, Badge } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'expo-router';
import { LogOut } from 'lucide-react-native';

const JOBS = [
  { id: '1', title: 'Logo Design', budget: '$50', company: 'Tech Somalia', type: 'Remote' },
  { id: '2', title: 'React Developer', budget: '$500', company: 'Ardaykaab', type: 'Full-time' },
  { id: '3', title: 'UI/UX Audit', budget: '$100', company: 'Hargeisa Hub', type: 'Freelance' },
];

export default function DashboardScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Nabad sxb,</Text>
          <Title style={styles.name}>{user?.name || 'User'}</Title>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <LogOut size={20} color="#ef4444" />
          </TouchableOpacity>
          <Avatar.Image size={50} source={{ uri: `https://i.pravatar.cc/150?u=${user?.email}` }} />
        </View>
      </View>

      <Searchbar
        placeholder="Raadi shaqooyin..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.search}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Title>Trust Score</Title>
          <Card style={styles.scoreCard}>
            <Card.Content style={styles.scoreContent}>
              <View>
                <Text style={styles.scoreValue}>85/100</Text>
                <Text style={styles.scoreLabel}>Kalsoonidaadu waa sareysaa</Text>
              </View>
              <Badge size={40} style={styles.badge}>✓</Badge>
            </Card.Content>
          </Card>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Title>Shaqooyinka Ugu Dambeeyay</Title>
            <Button mode="text">Eeg dhamaantood</Button>
          </View>
          
          {JOBS.map(job => (
            <Card key={job.id} style={styles.jobCard}>
              <Card.Content>
                <View style={styles.jobHeader}>
                  <Title style={styles.jobTitle}>{job.title}</Title>
                  <Text style={styles.budget}>{job.budget}</Text>
                </View>
                <Paragraph style={styles.company}>{job.company} • {job.type}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button mode="outlined" onPress={() => {}}>Codso</Button>
              </Card.Actions>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  logoutBtn: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#fee2e2',
  },
  welcome: {
    color: '#64748b',
    fontSize: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  search: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  scoreCard: {
    backgroundColor: '#2563eb',
    borderRadius: 15,
  },
  scoreContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreValue: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  scoreLabel: {
    color: '#bfdbfe',
    fontSize: 14,
  },
  badge: {
    backgroundColor: '#4ade80',
    color: '#fff',
  },
  jobCard: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  budget: {
    color: '#16a34a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  company: {
    color: '#64748b',
  },
});