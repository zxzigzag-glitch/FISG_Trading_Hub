import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import 'react-native-reanimated';

import { ThemePreferenceProvider, useColorScheme } from '@/hooks/use-color-scheme';
import { I18nProvider } from '@/i18n';

export default function RootLayout() {
  return (
    <I18nProvider>
      <ThemePreferenceProvider defaultPreference="dark">
        <RootLayoutInner />
      </ThemePreferenceProvider>
    </I18nProvider>
  );
}

function RootLayoutInner() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal', headerShown: true }} />
        </Stack>
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 414,
    width: '100%',
    alignSelf: 'center',
  },
});
