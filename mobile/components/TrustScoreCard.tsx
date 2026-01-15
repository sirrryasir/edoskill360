import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './themed-text';
import { Card } from './ui/Card';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Shield, TrendingUp } from 'lucide-react-native';

interface TrustScoreCardProps {
  score: number;
  role: string;
}

export function TrustScoreCard({ score, role }: TrustScoreCardProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const getScoreColor = (s: number) => {
    if (s >= 80) return theme.success;
    if (s >= 50) return theme.warning;
    return theme.error;
  };

  const scoreColor = getScoreColor(score);

  return (
    <Card style={styles.container} padding="lg">
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View style={[styles.iconBadge, { backgroundColor: theme.primary + '15' }]}>
            <Shield size={24} color={theme.primary} />
          </View>
          <View>
            <ThemedText type="defaultSemiBold" style={{ color: theme.textSecondary }}>
              Trust Score
            </ThemedText>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              {role === 'talent' ? 'Professional Capability' : 'Employer Reliability'}
            </ThemedText>
          </View>
        </View>
        <View style={[styles.scoreBadge, { backgroundColor: scoreColor + '15' }]}>
          <TrendingUp size={16} color={scoreColor} style={{ marginRight: 4 }} />
          <ThemedText type="defaultSemiBold" style={{ color: scoreColor }}>
            Top 10%
          </ThemedText>
        </View>
      </View>

      <View style={styles.scoreContainer}>
        <ThemedText style={[styles.scoreValue, { color: theme.text }]}>
          {score}
        </ThemedText>
        <ThemedText type="headingM" style={{ color: theme.textSecondary, marginBottom: 8 }}>
          /100
        </ThemedText>
      </View>

      <View style={styles.barBackground}>
        <View
          style={[
            styles.barFill,
            {
              width: `${score}%`,
              backgroundColor: scoreColor
            }
          ]}
        />
      </View>

      <ThemedText type="small" style={{ marginTop: 12, color: theme.textSecondary }}>
        Complete more verifications to increase your trust score and access higher value opportunities.
      </ThemedText>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 48,
    marginRight: 4,
  },
  barBackground: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
});
