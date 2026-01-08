import { PhoneInput } from '@/components/phone-input';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PhoneVerificationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ provider: string }>();
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const themeColors = Colors[theme];
  const { t } = useTranslation();

  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+66');

  const handleContinue = () => {
    if (!phone) {
      Alert.alert(t('common:error'), t('auth:enterPhone'));
      return;
    }
    router.push({ pathname: '/(auth)/otp', params: { method: 'phone', value: `${countryCode}${phone}`, flow: 'signin' } });
  };

  const providerName = params.provider?.charAt(0).toUpperCase() + params.provider?.slice(1);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: themeColors.text }]}>{t('auth:verifyPhone')}</Text>
          <Text style={[styles.subtitle, { color: themeColors.icon }]}>
            {t('auth:verifyPhoneSubtitle', { provider: providerName })}
          </Text>
        </View>

        <View style={styles.inputSection}>
          <PhoneInput
            value={phone}
            onChangeText={setPhone}
            countryCode={countryCode}
            onCountryCodeChange={setCountryCode}
          />
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={[styles.backButton, { borderColor: themeColors.icon }]}
            onPress={() => router.back()}
          >
            <Text style={[styles.backButtonText, { color: themeColors.text }]}>{t('common:back')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: themeColors.tint }]}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>{t('common:continue')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  inputSection: {
    marginBottom: 32,
  },
  buttonSection: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 'auto',
  },
  backButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
