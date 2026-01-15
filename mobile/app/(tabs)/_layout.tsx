import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Home, Briefcase, User, Search, Settings } from 'lucide-react-native';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '@/store/useAuthStore';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useAuthStore();
  const themeColors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: themeColors.tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />

      {/* Jobs Tab - Visible for Everyone, but mainly Talent */}
      <Tabs.Screen
        name="jobs"
        options={{
          title: 'Jobs',
          href: user?.role === 'employer' ? null : '/jobs', // Hide for employer if desired, or keep open
          tabBarIcon: ({ color }) => <Briefcase size={24} color={color} />,
        }}
      />

      {/* Talents Tab - Visible for Employer */}
      <Tabs.Screen
        name="Talents"
        options={{
          title: 'Talent',
          href: user?.role === 'talent' ? null : '/Talents', // Hide for talent? Maybe keep visible for networking.
          // Let's hide it for talent to match sidebar logic strictly, or keep it open. 
          // Sidebar shows 'Find Jobs' for Talent, 'Find Talent' for Employer.
          // Let's stick to sidebar logic to be safe.
          // Actually, sidebar logic:
          // Talent: Dashboard, Jobs, Skills, Verification, Profile
          // Employer: Dashboard, Post Job, Find Talent

          // So if user is talent, hide Talents tab?
          // If user is employer, hide jobs tab?

          // Let's refine based on user role presence.
          // If user is null, we show default maybe?
          // If user is talent -> Hide Talents
          // If user is employer -> Hide Jobs (unless they want to see what's out there? Usually employers post jobs, not find them)

          href: user?.role === 'employer' ? '/Talents' : null,
          tabBarIcon: ({ color }) => <Search size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />

      {/* Hide explore if we replaced it */}
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
