import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter } from 'lucide-react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedText } from '@/components/themed-text';
import { Input } from '@/components/ui/Input';
import FreelancerCard from '@/components/FreelancerCard';
import api from '@/config/api';

export default function FreelancersScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');
  const [talents, setTalents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTalents = async () => {
    try {
      // Fetch users with role 'talent'
      const res = await api.get('/users?role=talent'); 
      setTalents(res.data);
    } catch (error) {
      console.log('Error fetching talents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTalents();
  }, []);

  const filteredTalents = talents.filter((t) => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.headline && t.headline.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <ThemedText type="headingL">Find Talent</ThemedText>
        <TouchableOpacity style={[styles.filterButton, { borderColor: theme.border }]}>
          <Filter size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Input 
          placeholder="Search by name or skill..." 
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
          data={filteredTalents}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <FreelancerCard
              id={item._id}
              name={item.name}
              title={item.headline || "Talent"}
              location={item.location || "Remote"}
              rate={item.hourlyRate ? `$${item.hourlyRate}` : "Negotiable"}
              verified={item.trustScore > 50} // Logic for verified badge
              score={item.trustScore || 0}
              skills={item.skills || []} // Assuming populated or handled
              reviews={0} // Mock for now
              rating={0} // Mock for now
            />
          )}
          ListHeaderComponent={
            <View style={{ marginBottom: 16 }}>
               <ThemedText type="defaultSemiBold" style={{ color: theme.textSecondary }}>
                 Top Verified Professionals
               </ThemedText>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.centered}>
              <ThemedText style={{ color: theme.textSecondary }}>No talent found.</ThemedText>
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
    paddingBottom: 100,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
