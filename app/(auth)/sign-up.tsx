import { PhoneInput } from '@/components/phone-input';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type SignUpMethod = 'email' | 'phone';

export default function SignUpScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const themeColors = Colors[theme];
  const { t } = useTranslation();

  const [method, setMethod] = useState<SignUpMethod>('phone');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+66');

  const handleEmailSignUp = () => {
    if (!email) {
      Alert.alert(t('common:error'), t('auth:enterEmail'));
      return;
    }
    router.push({ pathname: '/(auth)/otp', params: { method: 'email', value: email, flow: 'signup' } });
  };

  const handlePhoneSignUp = () => {
    if (!phone) {
      Alert.alert(t('common:error'), t('auth:enterPhone'));
      return;
    }
    router.push({ pathname: '/(auth)/otp', params: { method: 'phone', value: `${countryCode}${phone}`, flow: 'signup' } });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: themeColors.text }]}>{t('auth:signUpTitle')}</Text>
          <Text style={[styles.subtitle, { color: themeColors.icon }]}>
            {t('auth:signUpSubtitle')}
          </Text>
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
                onPress={handleEmailSignUp}
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
                onPress={handlePhoneSignUp}
              >
                <Text style={styles.continueButtonText}>{t('common:continue')}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Terms & Conditions */}
        <Text style={[styles.terms, { color: themeColors.icon }]}> 
          {t('auth:terms1')}
          <Text style={{ color: themeColors.tint }}>{t('auth:termsTos')}</Text>{t('auth:termsAnd')}
          <Text style={{ color: themeColors.tint }}>{t('auth:termsPrivacy')}</Text>
        </Text>

        {/* Sign In Link */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: themeColors.icon }]}> 
            {t('auth:alreadyHaveAccount')}{' '}
          </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[styles.linkText, { color: themeColors.tint }]}>{t('auth:signIn')}</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 40,
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
  terms: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
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
});
