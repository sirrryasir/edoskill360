import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Clock, DollarSign, ShieldCheck } from 'lucide-react-native';

import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { ThemedText } from './themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedAt: string;
  description: string;
  skills: string[];
  isVerifiedHost?: boolean;
  trustScoreRequired?: number;
}

export default function JobCard({
  id,
  title,
  company,
  location,
  type,
  salary,
  postedAt,
  description,
  skills,
  isVerifiedHost = false,
  trustScoreRequired = 0,
}: JobCardProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <Card style={styles.card} padding="lg">
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <ThemedText type="headingM" numberOfLines={1}>{title}</ThemedText>
          <View style={styles.companyRow}>
            <ThemedText type="defaultSemiBold" style={{ color: theme.textSecondary }}>{company}</ThemedText>
            {isVerifiedHost && (
               <ShieldCheck size={16} color={theme.primary} style={{ marginLeft: 4 }} />
            )}
          </View>
        </View>
        {trustScoreRequired > 0 && (
          <View style={[styles.trustBadge, { backgroundColor: theme.primary + '10' }]}>
            <ShieldCheck size={14} color={theme.primary} />
            <ThemedText type="small" style={{ color: theme.primary, marginLeft: 4, fontWeight: '700' }}>
              {trustScoreRequired}+
            </ThemedText>
          </View>
        )}
      </View>

      <View style={styles.metaRow}>
        <Badge text={type} status="neutral" />
        <View style={styles.divider} />
        <View style={styles.iconRow}>
          <MapPin size={14} color={theme.textSecondary} />
          <ThemedText type="small" style={{ color: theme.textSecondary, marginLeft: 4 }}>{location}</ThemedText>
        </View>
        <View style={styles.divider} />
        <View style={styles.iconRow}>
          <Clock size={14} color={theme.textSecondary} />
          <ThemedText type="small" style={{ color: theme.textSecondary, marginLeft: 4 }}>{postedAt}</ThemedText>
        </View>
      </View>

      <View style={styles.salaryContainer}>
        <ThemedText type="headingL" style={{ color: theme.success }}>{salary}</ThemedText>
        <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: 4 }}>/ Project</ThemedText>
      </View>

      <ThemedText type="default" style={{ color: theme.textSecondary, marginBottom: 16 }} numberOfLines={2}>
        {description}
      </ThemedText>

      <View style={styles.footer}>
        <Button 
          title="View Details" 
          onPress={() => router.push(`/jobs/${id}` as any)}
          variant="secondary"
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 8,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
  },
  salaryContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
    gap: 4,
  },
  footer: {
    marginTop: 8,
  },
});