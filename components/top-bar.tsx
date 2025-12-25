import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function TopBar() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('MT4 - Standard');
  const [balance, setBalance] = useState(1571.25);
  const [language, setLanguage] = useState('English');

  const accounts = [
    { name: 'MT4 - Standard', balance: 1571.25 },
    { name: 'MT5 - ECN', balance: 2450.80 },
    { name: 'MT4 - Cent', balance: 500.00 },
  ];

  const languages = ['English', 'ไทย', '中文'];

  const handleAccountChange = () => {
    const currentIndex = accounts.findIndex(acc => acc.name === selectedAccount);
    const nextIndex = (currentIndex + 1) % accounts.length;
    setSelectedAccount(accounts[nextIndex].name);
    setBalance(accounts[nextIndex].balance);
  };

  const handleLanguageChange = () => {
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  const handleSignOut = () => {
    setMenuVisible(false);
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: () => {
        Alert.alert('Signed Out', 'You have been signed out successfully');
      }},
    ]);
  };

  return (
    <>
      <View style={[styles.safeArea, { backgroundColor: Colors[colorScheme ?? 'light'].tint, paddingTop: insets.top }]}>
        <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}>
          {/* Logo */}
          <TouchableOpacity style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>F</Text>
            </View>
          </TouchableOpacity>

          {/* Search Bar */}
          <View style={[styles.searchContainer, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search prices, news, lessons"
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Notification Icon */}
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.icon}>🔔</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>0</Text>
            </View>
          </TouchableOpacity>

          {/* Hamburger Menu */}
          <TouchableOpacity style={styles.iconButton} onPress={() => setMenuVisible(true)}>
            <Text style={styles.icon}>☰</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Dropdown Menu */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setMenuVisible(false)}
        >
          <View style={[styles.dropdownMenu, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
            {/* Close Button */}
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setMenuVisible(false)}
            >
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>

            {/* Account Info */}
            <View style={styles.menuSection}>
              <Text style={[styles.menuLabel, { color: Colors[colorScheme ?? 'light'].icon }]}>
                Trading Account
              </Text>
              <Text style={[styles.accountName, { color: Colors[colorScheme ?? 'light'].text }]}>
                {selectedAccount}
              </Text>
              <Text style={[styles.accountBalance, { color: Colors[colorScheme ?? 'light'].tint }]}>
                ${balance.toFixed(2)}
              </Text>
            </View>

            <View style={styles.divider} />

            {/* Change Account */}
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleAccountChange}
            >
              <Text style={styles.menuItemIcon}>🔄</Text>
              <Text style={[styles.menuItemText, { color: Colors[colorScheme ?? 'light'].text }]}>
                Switch Trading Account
              </Text>
              <Text style={[styles.menuItemArrow, { color: Colors[colorScheme ?? 'light'].icon }]}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Language */}
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleLanguageChange}
            >
              <Text style={styles.menuItemIcon}>🌐</Text>
              <View style={styles.menuItemContent}>
                <Text style={[styles.menuItemText, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Language
                </Text>
                <Text style={[styles.menuItemSubtext, { color: Colors[colorScheme ?? 'light'].icon }]}>
                  {language}
                </Text>
              </View>
              <Text style={[styles.menuItemArrow, { color: Colors[colorScheme ?? 'light'].icon }]}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Sign Out */}
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleSignOut}
            >
              <Text style={styles.menuItemIcon}>🚪</Text>
              <Text style={[styles.menuItemText, { color: '#ef4444' }]}>
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    zIndex: 1000,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
  logoContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  icon: {
    fontSize: 24,
    color: '#fff',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
  },
  dropdownMenu: {
    marginTop: 0,
    marginHorizontal: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  closeIcon: {
    fontSize: 24,
    color: '#9CA3AF',
  },
  menuSection: {
    marginBottom: 16,
  },
  menuLabel: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: '500',
  },
  accountName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  accountBalance: {
    fontSize: 28,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginVertical: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  menuItemIcon: {
    fontSize: 20,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  menuItemSubtext: {
    fontSize: 14,
    marginTop: 2,
  },
  menuItemArrow: {
    fontSize: 24,
  },
});
