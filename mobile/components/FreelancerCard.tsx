import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Button, ProgressBar, useTheme } from 'react-native-paper';
import { Star, MapPin, CheckCircle2 } from 'lucide-react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';

interface FreelancerCardProps {
  id: string;
  name: string;
  title: string;
  location: string;
  rate: string;
  verified: boolean;
  score: number;
  skills: string[];
  reviews: number;
  rating: number;
}

export default function FreelancerCard({
  id,
  name,
  title,
  location,
  rate,
  verified,
  score,
  skills,
  reviews,
  rating,
}: FreelancerCardProps) {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];

  return (
    <Card style={[styles.card, { backgroundColor: themeColors.card }]}>
      <View style={styles.topBar} />
      <Card.Content style={styles.content}>
        <View style={[styles.avatarContainer, { backgroundColor: themeColors.background }]}>
          <Text style={styles.avatarText}>
            {name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
          </Text>
          {verified && (
            <View style={[styles.verifiedBadge, { backgroundColor: themeColors.card }]}>
              <CheckCircle2 size={20} color={themeColors.primary} fill="#eff6ff" />
            </View>
          )}
        </View>

        <Text style={[styles.name, { color: themeColors.text }]}>{name}</Text>
        <Text style={[styles.title, { color: themeColors.icon }]}>{title}</Text>

        <View style={styles.ratingRow}>
          <Star size={16} color="#f59e0b" fill="#f59e0b" />
          <Text style={[styles.rating, { color: themeColors.text }]}>{rating}</Text>
          <Text style={[styles.reviews, { color: themeColors.icon }]}>({reviews} reviews)</Text>
        </View>

        <View style={styles.scoreContainer}>
          <View style={styles.scoreHeader}>
            <Text style={styles.scoreLabel}>Skill Score</Text>
            <Text style={[styles.scoreValue, { color: themeColors.primary }]}>{score}/100</Text>
          </View>
          <ProgressBar progress={score / 100} color={themeColors.primary} style={styles.progressBar} />
        </View>

        <View style={styles.skillsRow}>
          {skills.slice(0, 3).map((skill) => (
            <View key={skill} style={[styles.skillBadge, { backgroundColor: themeColors.background }]}>
              <Text style={{ fontSize: 10, color: themeColors.text }}>{skill}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.footer, { borderTopColor: themeColors.border }]}>
          <View style={styles.locationRow}>
            <MapPin size={14} color={themeColors.icon} />
            <Text style={[styles.location, { color: themeColors.icon }]}>{location}</Text>
          </View>
          <Text style={[styles.rate, { color: themeColors.text }]}>{rate}/hr</Text>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button 
          mode="contained" 
          onPress={() => router.push(`/profile/${id}` as any)}
          style={[styles.button, { backgroundColor: themeColors.text }]}
          labelStyle={{ fontSize: 14 }}
        >
          View Profile
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },
  topBar: {
    height: 4,
    backgroundColor: '#3b82f6', // blue-500
    width: '100%',
  },
  content: {
    alignItems: 'center',
    paddingTop: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#94a3b8',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 12,
    padding: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 4,
  },
  rating: {
    fontWeight: 'bold',
  },
  reviews: {
    fontSize: 12,
  },
  scoreContainer: {
    width: '100%',
    marginBottom: 16,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  scoreValue: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e2e8f0',
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 16,
  },
  skillBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderTopWidth: 1,
    paddingTop: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: 12,
  },
  rate: {
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    borderRadius: 8,
  },
});
