import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { Card, Title, Paragraph, Button, Text, Searchbar, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const ALL_JOBS = [
  { id: '1', title: 'Logo Design', budget: '$50', company: 'Tech Somalia', tags: ['Design', 'Remote'] },
  { id: '2', title: 'React Developer', budget: '$500', company: 'Ardaykaab', tags: ['Coding', 'Hybrid'] },
  { id: '3', title: 'UI/UX Audit', budget: '$100', company: 'Hargeisa Hub', tags: ['Design', 'Freelance'] },
  { id: '4', title: 'Content Writer', budget: '$30', company: 'Somali Media', tags: ['Writing', 'Remote'] },
  { id: '5', title: 'Mobile App Test', budget: '$200', company: 'Innovate', tags: ['QA', 'Remote'] },
];

export default function JobsScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Title style={styles.headerTitle}>Shaqooyinka Diyaar ah</Title>
      
      <Searchbar
        placeholder="Raadi xirfad ama shaqo..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.search}
      />

      <FlatList
        data={ALL_JOBS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.row}>
                <Title style={styles.jobTitle}>{item.title}</Title>
                <Text style={styles.budget}>{item.budget}</Text>
              </View>
              <Paragraph style={styles.company}>{item.company}</Paragraph>
              <View style={styles.tagContainer}>
                {item.tags.map(tag => (
                  <Chip key={tag} style={styles.chip} textStyle={styles.chipText}>{tag}</Chip>
                ))}
              </View>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained-tonal">Faahfaahin</Button>
              <Button mode="contained">Codso Hadda</Button>
            </Card.Actions>
          </Card>
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  headerTitle: {
    paddingHorizontal: 20,
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  search: {
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  row: {
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
  },
  company: {
    color: '#64748b',
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  chip: {
    height: 30,
    backgroundColor: '#e2e8f0',
  },
  chipText: {
    fontSize: 12,
  },
});