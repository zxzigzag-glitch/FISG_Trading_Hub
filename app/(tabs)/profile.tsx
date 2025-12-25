import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<'system' | 'dark' | 'light'>('system');
  const [notifications, setNotifications] = useState({
    all: true,
    system: true,
    wallet: true,
    trading: true,
    education: false,
  });

  const user = {
    name: 'Araya K.',
    email: 'araya@demo.com',
    points: 220,
    kycStatus: 'Approved',
    accountId: 'FISG-7H2KQ',
    tier: 'Gold',
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {
          Alert.alert('Logged Out', 'You have been logged out successfully');
        }},
      ]
    );
  };

  const handleResetDemo = () => {
    Alert.alert(
      'Reset Demo Data',
      'This will reset all demo data. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: () => {
          Alert.alert('Success', 'Demo data has been reset');
        }},
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <ThemedText type="title">Profile</ThemedText>
        </View>
        {/* User Card */}
        <View style={[styles.userCard, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}>
          <View style={styles.userBadge}>
            <Text style={styles.userTier}>{user.tier}</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name.split(' ').map(n => n[0]).join('')}</Text>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <View style={styles.userStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.points} pts</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>KYC: {user.kycStatus}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Acct: {user.accountId}</Text>
            </View>
          </View>
        </View>

        {/* Theme Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle">Theme</ThemedText>
          <View style={styles.themeButtons}>
            {(['system', 'dark', 'light'] as const).map((t) => (
              <TouchableOpacity
                key={t}
                style={[
                  styles.themeButton,
                  theme === t && { backgroundColor: Colors[colorScheme ?? 'light'].tint },
                ]}
                onPress={() => setTheme(t)}
              >
                <Text style={[styles.themeButtonText, theme === t && styles.themeButtonTextActive]}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}
            onPress={() => Alert.alert('Learn', 'Opening Learn section...')}
          >
            <Text style={styles.menuIcon}>🎓</Text>
            <View style={styles.menuContent}>
              <ThemedText type="defaultSemiBold">Learn</ThemedText>
              <Text style={styles.menuDesc}>Courses, quizzes, bookmarks</Text>
            </View>
            <TouchableOpacity style={styles.menuButton}>
              <Text style={[styles.menuButtonText, { color: Colors[colorScheme ?? 'light'].tint }]}>Open</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}
            onPress={() => Alert.alert('Support', 'Opening support...')}
          >
            <Text style={styles.menuIcon}>?</Text>
            <View style={styles.menuContent}>
              <ThemedText type="defaultSemiBold">Support</ThemedText>
              <Text style={styles.menuDesc}>Ticket / FAQ (demo)</Text>
            </View>
            <TouchableOpacity style={styles.menuButton}>
              <Text style={[styles.menuButtonText, { color: Colors[colorScheme ?? 'light'].tint }]}>Open</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}
            onPress={() => Alert.alert('Notifications', 'Opening notifications...')}
          >
            <IconSymbol name="bell.fill" size={20} color={Colors[colorScheme ?? 'light'].text} />
            <View style={styles.menuContent}>
              <ThemedText type="defaultSemiBold">Notifications</ThemedText>
              <Text style={styles.menuDesc}>Manage alerts & updates</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={Colors[colorScheme ?? 'light'].icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}
            onPress={() => Alert.alert('Rewards', 'Opening rewards...')}
          >
            <IconSymbol name="gift.fill" size={20} color={Colors[colorScheme ?? 'light'].text} />
            <View style={styles.menuContent}>
              <ThemedText type="defaultSemiBold">Rewards & Missions</ThemedText>
              <Text style={styles.menuDesc}>Earn points, redeem prizes</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={Colors[colorScheme ?? 'light'].icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}
            onPress={() => Alert.alert('Settings', 'Opening settings...')}
          >
            <IconSymbol name="gearshape.fill" size={20} color={Colors[colorScheme ?? 'light'].text} />
            <View style={styles.menuContent}>
              <ThemedText type="defaultSemiBold">Settings</ThemedText>
              <Text style={styles.menuDesc}>Preferences & security</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={Colors[colorScheme ?? 'light'].icon} />
          </TouchableOpacity>
        </View>

        {/* Notification Settings */}
        <View style={styles.section}>
          <ThemedText type="subtitle">Notification Preferences</ThemedText>
          <View style={[styles.notifCard, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}>
            {Object.entries(notifications).map(([key, value]) => (
              <View key={key} style={styles.notifItem}>
                <ThemedText>{key.charAt(0).toUpperCase() + key.slice(1)}</ThemedText>
                <Switch
                  value={value}
                  onValueChange={(val) => setNotifications(prev => ({ ...prev, [key]: val }))}
                  trackColor={{ false: '#767577', true: Colors[colorScheme ?? 'light'].tint }}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}
            onPress={handleResetDemo}
          >
            <Text style={[styles.actionButtonText, { color: Colors[colorScheme ?? 'light'].tint }]}>
              Reset demo data
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#ef4444' }]}
            onPress={handleLogout}
          >
            <Text style={[styles.actionButtonText, { color: '#fff' }]}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>FISG Trading Hub v1.0.0</Text>
          <View style={styles.footerLinks}>
            <TouchableOpacity>
              <Text style={[styles.footerLink, { color: Colors[colorScheme ?? 'light'].tint }]}>Terms</Text>
            </TouchableOpacity>
            <Text style={styles.footerDot}>•</Text>
            <TouchableOpacity>
              <Text style={[styles.footerLink, { color: Colors[colorScheme ?? 'light'].tint }]}>Privacy</Text>
            </TouchableOpacity>
            <Text style={styles.footerDot}>•</Text>
            <TouchableOpacity>
              <Text style={[styles.footerLink, { color: Colors[colorScheme ?? 'light'].tint }]}>Help</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  scrollView: {
    flex: 1,
  },
  userCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  userBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255,215,0,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  userTier: {
    color: '#000',
    fontSize: 12,
    fontWeight: '700',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
  },
  userName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  userEmail: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 16,
  },
  editButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 16,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  userStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 11,
  },
  statDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  themeButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  themeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  themeButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  themeButtonTextActive: {
    color: '#fff',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    gap: 12,
  },
  menuIcon: {
    fontSize: 20,
  },
  menuContent: {
    flex: 1,
    gap: 2,
  },
  menuDesc: {
    fontSize: 12,
    opacity: 0.6,
  },
  menuButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  menuButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  notifCard: {
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    gap: 16,
  },
  notifItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 8,
  },
  footerText: {
    fontSize: 12,
    opacity: 0.5,
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerLink: {
    fontSize: 12,
    fontWeight: '500',
  },
  footerDot: {
    fontSize: 12,
    opacity: 0.3,
  },
});
