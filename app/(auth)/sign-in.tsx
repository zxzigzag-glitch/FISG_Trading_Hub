import { PhoneInput } from '@/components/phone-input';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAppLanguage } from '@/i18n';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type SignInMethod = 'email' | 'phone' | 'social';

export default function SignInScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const themeColors = Colors[theme];
  const { t } = useTranslation();
  const { language, setLanguage } = useAppLanguage();
  const [languageOpen, setLanguageOpen] = useState(false);

  const [method, setMethod] = useState<SignInMethod>('phone');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+66');

  const handleEmailSignIn = () => {
    if (!email) {
      Alert.alert(t('common:error'), t('auth:enterEmail'));
      return;
    }
    router.push({ pathname: '/(auth)/otp', params: { method: 'email', value: email, flow: 'signin' } });
  };

  const handlePhoneSignIn = () => {
    if (!phone) {
      Alert.alert(t('common:error'), t('auth:enterPhone'));
      return;
    }
    router.push({ pathname: '/(auth)/otp', params: { method: 'phone', value: `${countryCode}${phone}`, flow: 'signin' } });
  };

  const handleSocialSignIn = (provider: 'line' | 'facebook' | 'google') => {
    // Simulate checking if user exists
    // In real app, this would check with backend
    const userExists = false;

    if (userExists) {
      // User exists, go to main app
      router.replace('/(tabs)');
    } else {
      // User doesn't exist, need phone verification
      router.push({ pathname: '/(auth)/phone-verification', params: { provider } });
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('@/assets/images/logo-1.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.header}>
          <Text style={[styles.title, { color: themeColors.text }]}>{t('auth:signIn')}</Text>
          <Text style={[styles.subtitle, { color: themeColors.icon }]}>
            {t('auth:signInSubtitle')}
          </Text>
        </View>

        {/* Social Sign In */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.icon }]}>{t('auth:signInWith')}</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity
              style={[styles.socialButton, { borderColor: themeColors.icon }]}
              onPress={() => handleSocialSignIn('line')}
            >
              <Image source={require('@/assets/images/line.png')} style={styles.socialImage} />
              <Text style={[styles.socialText, { color: themeColors.text }]}>{t('common:line')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, { borderColor: themeColors.icon }]}
              onPress={() => handleSocialSignIn('facebook')}
            >
              <Image source={require('@/assets/images/facebook.png')} style={styles.socialImage} />
              <Text style={[styles.socialText, { color: themeColors.text }]}>{t('common:facebook')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, { borderColor: themeColors.icon }]}
              onPress={() => handleSocialSignIn('google')}
            >
              <Image source={require('@/assets/images/google.png')} style={styles.socialImage} />
              <Text style={[styles.socialText, { color: themeColors.text }]}>{t('common:google')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={[styles.dividerLine, { backgroundColor: themeColors.icon }]} />
          <Text style={[styles.dividerText, { color: themeColors.icon }]}>{t('common:or')}</Text>
          <View style={[styles.dividerLine, { backgroundColor: themeColors.icon }]} />
        </View>

        {/* Method Selector */}
        <View style={styles.methodSelector}>
          <TouchableOpacity
            style={[
              styles.methodButton,
              method === 'phone' && { backgroundColor: themeColors.tint },
              { borderColor: themeColors.icon }
            ]}
            onPress={() => setMethod('phone')}
          >
            <Text style={[styles.methodText, { color: method === 'phone' ? '#fff' : themeColors.text }]}> 
              {t('common:phone')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodButton,
              method === 'email' && { backgroundColor: themeColors.tint },
              { borderColor: themeColors.icon }
            ]}
            onPress={() => setMethod('email')}
          >
            <Text style={[styles.methodText, { color: method === 'email' ? '#fff' : themeColors.text }]}> 
              {t('common:email')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <View style={styles.inputSection}>
          {method === 'email' && (
            <>
              <TextInput
                style={[styles.input, { color: themeColors.text, borderColor: themeColors.icon, backgroundColor: themeColors.background }]}
                placeholder={t('auth:emailPlaceholder')}
                placeholderTextColor={themeColors.icon}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={[styles.continueButton, { backgroundColor: themeColors.tint }]}
                onPress={handleEmailSignIn}
              >
                <Text style={styles.continueButtonText}>{t('common:continue')}</Text>
              </TouchableOpacity>
            </>
          )}

          {method === 'phone' && (
            <>
              <PhoneInput
                value={phone}
                onChangeText={setPhone}
                countryCode={countryCode}
                onCountryCodeChange={setCountryCode}
              />
              <TouchableOpacity
                style={[styles.continueButton, { backgroundColor: themeColors.tint }]}
                onPress={handlePhoneSignIn}
              >
                <Text style={styles.continueButtonText}>{t('common:continue')}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Sign Up Link */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: themeColors.icon }]}> 
            {t('auth:dontHaveAccount')}{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
            <Text style={[styles.linkText, { color: themeColors.tint }]}>{t('auth:signUp')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.languageSection}>
          <TouchableOpacity
            style={[styles.languageButton]}
            onPress={() => setLanguageOpen((prev) => !prev)}
          >
            <Text style={styles.languageFlag}>{language === 'th' ? '🇹🇭' : '🇺🇸'}</Text>
            <Text style={[styles.languageButtonText, { color: themeColors.text }]}>
              {language === 'th' ? 'ไทย' : 'English'}
            </Text>
            <Text style={[styles.languageButtonCaret, { color: themeColors.icon }]}>▼</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={languageOpen}
          transparent
          animationType="slide"
          onRequestClose={() => setLanguageOpen(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setLanguageOpen(false)}
          >
            <View style={[styles.modalContent, { backgroundColor: themeColors.background }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: themeColors.text }]}>
                  {t('common:language')}
                </Text>
                <TouchableOpacity onPress={() => setLanguageOpen(false)}>
                  <Text style={[styles.closeButton, { color: themeColors.tint }]}>✕</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.languageList}>
                {[
                  { code: 'th', label: 'ไทย', flag: '🇹🇭' },
                  { code: 'en', label: 'English', flag: '🇺🇸' },
                ].map((lng) => (
                  <TouchableOpacity
                    key={lng.code}
                    style={[
                      styles.languageItem,
                      language === lng.code && { backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }
                    ]}
                    onPress={async () => {
                      await setLanguage(lng.code as 'en' | 'th');
                      setLanguageOpen(false);
                    }}
                  >
                    <Text style={styles.languageItemFlag}>{lng.flag}</Text>
                    <Text style={[styles.languageItemText, { color: themeColors.text }]}>
                      {lng.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingTop: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 20,
  },
  logo: {
    // width: 120,
    height: 60,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  socialImage: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  socialIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialText: {
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    opacity: 0.3,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
  },
  methodSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  methodButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  methodText: {
    fontSize: 16,
    fontWeight: '600',
  },
  inputSection: {
    gap: 16,
    marginBottom: 24,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  continueButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
  },
  languageSection: {
    marginTop: 24,
    marginBottom: 12,
    alignItems: 'center',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    minWidth: 150,
  },
  languageFlag: {
    fontSize: 20,
  },
  languageButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  languageButtonCaret: {
    fontSize: 12,
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '40%',
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    fontSize: 24,
    fontWeight: '300',
  },
  languageList: {
    flex: 1,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  languageItemFlag: {
    fontSize: 24,
  },
  languageItemText: {
    flex: 1,
    fontSize: 16,
  },
});
