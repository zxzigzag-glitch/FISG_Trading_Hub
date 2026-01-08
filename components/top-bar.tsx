import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAppLanguage } from '@/i18n';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function TopBar() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const themeColors = Colors[theme];
  const subtleBorderColor = theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)';
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('MT4 - Standard');
  const [balance, setBalance] = useState(1571.25);
  const { t } = useTranslation();
  const { language, setLanguage } = useAppLanguage();

  const accounts = [
    { name: 'MT4 - Standard', balance: 1571.25 },
    { name: 'MT5 - ECN', balance: 2450.80 },
    { name: 'MT4 - Cent', balance: 500.00 },
  ];

  const languageLabel = language === 'th' ? 'ไทย' : 'English';

  const handleAccountChange = () => {
    const currentIndex = accounts.findIndex(acc => acc.name === selectedAccount);
    const nextIndex = (currentIndex + 1) % accounts.length;
    setSelectedAccount(accounts[nextIndex].name);
    setBalance(accounts[nextIndex].balance);
  };

  const handleLanguageChange = () => {
    setLanguage(language === 'th' ? 'en' : 'th');
  };

  const handleSignOut = () => {
    setMenuVisible(false);
    Alert.alert(t('topbar:signedOutTitle'), t('topbar:signedOutConfirm'), [
      { text: t('common:cancel'), style: 'cancel' },
      { text: t('common:signOut'), style: 'destructive', onPress: () => {
        router.replace('/(auth)/sign-in');
      }},
    ]);
  };

  return (
    <>
      <View style={[styles.safeArea, { backgroundColor: themeColors.tint, paddingTop: insets.top }]}>
        <View style={[styles.container, { backgroundColor: themeColors.tint }]}>
          {/* Logo */}
          <TouchableOpacity style={styles.logoContainer}>
            <View style={[styles.logo, { backgroundColor: "#FFFFFF" }]}>
              <Image source={require('../assets/images/icon.png')} style={styles.logoImage} />
            </View>
          </TouchableOpacity>

          {/* Search Bar */}
          <View style={[styles.searchContainer, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Ionicons name="search" size={16} color="#fff" />
            <TextInput
              style={styles.searchInput}
              placeholder={t('topbar:searchPlaceholder')}
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Notification Icon */}
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications" size={22} color="#fff" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>0</Text>
            </View>
          </TouchableOpacity>

          {/* Hamburger Menu */}
          <TouchableOpacity style={styles.iconButton} onPress={() => setMenuVisible(true)}>
            <Ionicons name="menu" size={24} color="#fff" />
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
          <View style={[styles.dropdownMenu, { backgroundColor: themeColors.background }]}>
            {/* Close Button */}
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setMenuVisible(false)}
            >
              <Text style={[styles.closeIcon, { color: themeColors.icon }]}>✕</Text>
            </TouchableOpacity>

            {/* Account Info */}
            <View style={styles.menuSection}>
              <Text style={[styles.menuLabel, { color: themeColors.icon }]}> 
                {t('topbar:tradingAccount')}
              </Text>
              <Text style={[styles.accountName, { color: themeColors.text }]}>
                {selectedAccount}
              </Text>
              <Text style={[styles.accountBalance, { color: themeColors.tint }]}>
                ${balance.toFixed(2)}
              </Text>
            </View>

            <View style={[styles.divider, { backgroundColor: subtleBorderColor }]} />

            {/* Change Account */}
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleAccountChange}
            >
              <Text style={styles.menuItemIcon}>🔄</Text>
              <Text style={[styles.menuItemText, { color: themeColors.text }]}> 
                {t('topbar:switchAccount')}
              </Text>
              <Text style={[styles.menuItemArrow, { color: themeColors.icon }]}>›</Text>
            </TouchableOpacity>

            <View style={[styles.divider, { backgroundColor: subtleBorderColor }]} />

            {/* Language */}
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleLanguageChange}
            >
              <Text style={styles.menuItemIcon}>🌐</Text>
              <View style={styles.menuItemContent}>
                <Text style={[styles.menuItemText, { color: themeColors.text }]}> 
                  {t('common:language')}
                </Text>
                <Text style={[styles.menuItemSubtext, { color: themeColors.icon }]}>
                  {languageLabel}
                </Text>
              </View>
              <Text style={[styles.menuItemArrow, { color: themeColors.icon }]}>›</Text>
            </TouchableOpacity>

            <View style={[styles.divider, { backgroundColor: subtleBorderColor }]} />

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
  logoImage: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
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
