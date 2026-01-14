import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter } from 'lucide-react-native';

import { useAuthStore } from '@/store/useAuthStore';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedText } from '@/components/themed-text';
import { Input } from '@/components/ui/Input';
import JobCard from '@/components/JobCard';
import api from '@/config/api';

export default function JobsScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs');
      setJobs(res.data);
    } catch (error) {
      console.log('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <ThemedText type="headingL">Explore Jobs</ThemedText>
        <TouchableOpacity style={[styles.filterButton, { borderColor: theme.border }]}>
          <Filter size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Input 
          placeholder="Search for roles, skills..." 
          value={searchQuery}
          onChangeText={setSearchQuery}
          icon={<Search size={20} color={theme.textSecondary} />}
          style={{ backgroundColor: theme.card }}
        />
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredJobs}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <JobCard
              id={item._id}
              title={item.title}
              company={item.employerId?.name || "Verified Employer"}
              location={item.location || "Remote"}
              type={item.type || "Contract"}
              salary={item.budget ? `$${item.budget}` : "Negotiable"}
              postedAt={new Date(item.createdAt).toLocaleDateString()}
              description={item.description}
              skills={item.skills || []}
              isVerifiedHost={true} // Assuming posted by verified user logic
              trustScoreRequired={item.minTrustScore}
            />
          )}
          ListHeaderComponent={
            <View style={{ marginBottom: 16 }}>
               <ThemedText type="defaultSemiBold" style={{ color: theme.textSecondary }}>
                 {filteredJobs.length} Verified Opportunities
               </ThemedText>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.centered}>
              <ThemedText style={{ color: theme.textSecondary }}>No jobs found matching your criteria.</ThemedText>
            </View>
          }
        />
      )}
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
    paddingTop: 16,
    paddingBottom: 8,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  listContent: {
    padding: 20,
    paddingBottom: 100, // Extra padding for bottom tab
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
