import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ShieldCheck, Star } from 'lucide-react-native';

import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { ThemedText } from './themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

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
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <Card style={styles.card} padding="md">
      <View style={styles.header}>
        <Image 
          source={{ uri: `https://ui-avatars.com/api/?name=${name}&background=random` }} 
          style={styles.avatar} 
        />
        <View style={styles.headerInfo}>
          <View style={styles.nameRow}>
            <ThemedText type="headingM">{name}</ThemedText>
            {verified && <ShieldCheck size={18} color={theme.success} />}
          </View>
          <ThemedText type="default" style={{ color: theme.textSecondary }}>{title}</ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>{location}</ThemedText>
        </View>
        <View style={styles.scoreContainer}>
          <ThemedText type="headingM" style={{ color: theme.primary }}>{score}</ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>Trust</ThemedText>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
           <Star size={14} color={theme.warning} fill={theme.warning} />
           <ThemedText type="defaultSemiBold" style={{ marginLeft: 4 }}>{rating}</ThemedText>
           <ThemedText type="small" style={{ color: theme.textSecondary }}> ({reviews})</ThemedText>
        </View>
        <ThemedText type="defaultSemiBold" style={{ color: theme.success }}>{rate}/hr</ThemedText>
      </View>

      <View style={styles.skillsRow}>
        {skills.slice(0, 3).map((skill, index) => (
          <Badge key={index} text={skill} status="neutral" />
        ))}
        {skills.length > 3 && (
          <Badge text={`+${skills.length - 3}`} status="neutral" />
        )}
      </View>

      <View style={styles.footer}>
        <Button 
          title="View Profile" 
          onPress={() => router.push(`/profile/${id}` as any)}
          variant="outline"
          size="sm"
          fullWidth
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scoreContainer: {
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    padding: 8,
    borderRadius: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  footer: {
    marginTop: 0,
  },
});