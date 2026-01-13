import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Avatar, Title, Caption, Button, List, Divider, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/useAuthStore';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Mail, ShieldCheck, MapPin, Briefcase, LogOut } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: () => {
            logout();
            router.replace('/login');
        }}
      ]
    );
  };

  if (!user) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>Not logged in</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Avatar.Text 
              size={80} 
              label={user.name.substring(0, 2).toUpperCase()} 
              style={{ backgroundColor: themeColors.primary }}
            />
            <View style={{ marginLeft: 20 }}>
              <Title style={[styles.title, { marginTop: 15, marginBottom: 5, color: themeColors.text }]}>
                {user.name}
              </Title>
              <Caption style={styles.caption}>{user.email}</Caption>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Briefcase color={themeColors.icon} size={20} />
            <Text style={{ color: themeColors.icon, marginLeft: 20 }}>Role: <Text style={{fontWeight:'bold', color: themeColors.text}}>{user.role.toUpperCase()}</Text></Text>
          </View>
          <View style={styles.row}>
            <ShieldCheck color={themeColors.icon} size={20} />
            <Text style={{ color: themeColors.icon, marginLeft: 20 }}>Verified User</Text>
          </View>
          {/* Mock data for now as user object might be minimal */}
          <View style={styles.row}>
            <MapPin color={themeColors.icon} size={20} />
            <Text style={{ color: themeColors.icon, marginLeft: 20 }}>Mogadishu, Somalia</Text>
          </View>
        </View>

        <Divider />

        <List.Section>
          <List.Subheader>Settings</List.Subheader>
          <List.Item
            title="Edit Profile"
            left={() => <List.Icon icon="account-edit" />}
            onPress={() => {}}
          />
          <List.Item
            title="Notifications"
            left={() => <List.Icon icon="bell-outline" />}
            onPress={() => {}}
          />
          <List.Item
            title="Security"
            left={() => <List.Icon icon="shield-check-outline" />}
            onPress={() => {}}
          />
        </List.Section>
        
        <View style={styles.buttonSection}>
           <Button 
            mode="outlined" 
            onPress={handleLogout} 
            textColor={Colors.light.error}
            style={{ borderColor: Colors.light.error }}
            icon={() => <LogOut size={18} color={Colors.light.error} />}
           >
             Logout
           </Button>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonSection: {
    padding: 20,
  }
});
