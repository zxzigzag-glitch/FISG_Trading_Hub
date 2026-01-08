import { OTPInput } from '@/components/otp-input';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OTPScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ method: string; value: string; flow: 'signin' | 'signup' }>();
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const themeColors = Colors[theme];
  const { t } = useTranslation();

  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleResend = () => {
    if (!canResend) return;
    setTimeLeft(60);
    setCanResend(false);
    setOtp('');
    Alert.alert('OK', t('auth:otpResent'));
  };

  const handleConfirm = () => {
    if (otp.length !== 6) {
      Alert.alert(t('common:error'), t('auth:enterCompleteOtp'));
      return;
    }

    // Simulate OTP verification
    // In real app, this would verify with backend
    if (params.flow === 'signup') {
      router.replace('/(auth)/sign-in');
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleBack = () => {
    router.back();
  };

  const maskedValue = params.method === 'email'
    ? params.value?.replace(/(.{3}).*(@.*)/, '$1***$2')
    : params.value?.replace(/(\+\d{2})(\d{3}).*(\d{2})/, '$1 $2 *** $3');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: themeColors.text }]}>{t('auth:enterOtp')}</Text>
          <Text style={[styles.subtitle, { color: themeColors.icon }]}>
            {t('auth:otpSentTo')}
          </Text>
          <Text style={[styles.value, { color: themeColors.text }]}>{maskedValue}</Text>
        </View>

        <View style={styles.otpSection}>
          <OTPInput value={otp} onChange={setOtp} length={6} />
        </View>

        <View style={styles.timerSection}>
          {canResend ? (
            <TouchableOpacity onPress={handleResend}>
              <Text style={[styles.resendText, { color: themeColors.tint }]}>{t('auth:resendOtp')}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={[styles.timerText, { color: themeColors.icon }]}> 
              {t('auth:resendOtpIn', { time: timeLeft })}
            </Text>
          )}
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={[styles.backButton, { borderColor: themeColors.icon }]}
            onPress={handleBack}
          >
            <Text style={[styles.backButtonText, { color: themeColors.text }]}>{t('common:back')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.confirmButton, { backgroundColor: themeColors.tint, opacity: otp.length === 6 ? 1 : 0.5 }]}
            onPress={handleConfirm}
            disabled={otp.length !== 6}
          >
            <Text style={styles.confirmButtonText}>{t('common:confirm')}</Text>
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
    marginBottom: 48,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
  otpSection: {
    marginBottom: 32,
  },
  timerSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  timerText: {
    fontSize: 14,
  },
  resendText: {
    fontSize: 14,
    fontWeight: '600',
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
  confirmButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
