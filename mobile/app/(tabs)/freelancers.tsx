import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import FreelancerCard from '@/components/FreelancerCard';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import api from '@/config/api';

export default function TalentsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [Talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];

  const fetchTalents = async () => {
    try {
      // Assuming endpoint is /users/Talents based on context, 
      // but checking web store it calls /api/users/Talents (implied) or similar.
      // Wait, client uses usePublicDataStore.ts. Let's assume /users/Talents or similar.
      // If endpoint fails, we will debug.
      const res = await api.get('/users?role=worker'); // Or specific endpoint
      setTalents(res.data);
    } catch (error) {
      console.log('Error fetching Talents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTalents();
  }, []);

  const filteredTalents = Talents.filter((f: any) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (f.headline && f.headline.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Find Talent</Text>
      </View>

      <Searchbar
        placeholder="Search Talents..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={themeColors.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredTalents}
          keyExtractor={(item: any) => item._id}
          renderItem={({ item }) => (
            <FreelancerCard
              id={item._id}
              name={item.name}
              title={item.headline || "Freelancer"}
              location={item.location || "Remote"}
              rate={item.hourlyRate ? `$${item.hourlyRate}` : "Negotiable"}
              verified={true} // Mock logic for now
              score={85} // Mock logic
              skills={item.skills || []}
              reviews={0}
              rating={5.0}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20, color: themeColors.icon }}>
              No Talents found.
            </Text>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchBar: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
