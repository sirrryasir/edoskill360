import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Button, Chip, useTheme } from 'react-native-paper';
import { MapPin, Clock, DollarSign, CheckCircle2 } from 'lucide-react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';

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
}: JobCardProps) {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];

  return (
    <Card style={[styles.card, { backgroundColor: themeColors.card }]}>
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={[styles.title, { color: themeColors.text }]} numberOfLines={1}>{title}</Text>
            <View style={styles.companyRow}>
              <Text style={{ color: themeColors.text, fontWeight: '500' }}>{company}</Text>
              {isVerifiedHost && <CheckCircle2 size={14} color={themeColors.primary} style={{ marginLeft: 4 }} />}
              <Text style={{ color: themeColors.icon, marginHorizontal: 4 }}>•</Text>
              <View style={styles.iconRow}>
                <MapPin size={14} color={themeColors.icon} />
                <Text style={{ color: themeColors.icon, fontSize: 12, marginLeft: 2 }}>{location}</Text>
              </View>
            </View>
          </View>
          <Chip mode="outlined" style={styles.typeChip} textStyle={{ fontSize: 10 }}>{type}</Chip>
        </View>

        <View style={styles.metaRow}>
          <View style={[styles.badge, { backgroundColor: '#f0fdf4' }]}> 
             {/* Using green-50 approximation */}
            <DollarSign size={14} color="#15803d" />
            <Text style={{ color: '#15803d', fontSize: 12, fontWeight: 'bold', marginLeft: 2 }}>{salary}</Text>
          </View>
          <View style={styles.iconRow}>
            <Clock size={14} color={themeColors.icon} />
            <Text style={{ color: themeColors.icon, fontSize: 12, marginLeft: 4 }}>{postedAt}</Text>
          </View>
        </View>

        <Text style={[styles.description, { color: themeColors.icon }]} numberOfLines={2}>
          {description}
        </Text>

        <View style={styles.skillsRow}>
          {skills.slice(0, 3).map((skill) => (
            <View key={skill} style={[styles.skillBadge, { backgroundColor: themeColors.background, borderColor: themeColors.border }]}>
              <Text style={{ fontSize: 10, color: themeColors.text }}>{skill}</Text>
            </View>
          ))}
          {skills.length > 3 && (
            <View style={[styles.skillBadge, { backgroundColor: themeColors.background, borderColor: themeColors.border }]}>
              <Text style={{ fontSize: 10, color: themeColors.text }}>+{skills.length - 3}</Text>
            </View>
          )}
        </View>
      </Card.Content>
      <Card.Actions style={styles.footer}>
        <Button 
          mode="contained" 
          onPress={() => router.push(`/jobs/${id}` as any)} // Using as any to bypass type check for dynamic route
          style={[styles.button, { backgroundColor: themeColors.text }]} // Slate 900
          labelStyle={{ fontSize: 14 }}
        >
          Apply Now
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeChip: {
    height: 24,
    alignItems: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9', // Slate 100
    paddingTop: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
    borderRadius: 8,
  },
});
