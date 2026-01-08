import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { initReactI18next, useTranslation } from 'react-i18next';

import en from './locales/en.json';
import th from './locales/th.json';

const STORAGE_KEY = '@app/language';

// Initialize i18next with resources and a safe default.
i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources: {
      en,
      th,
    },
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'th'],
    defaultNS: 'common',
    ns: ['common', 'auth', 'topbar', 'tabs', 'home', 'market', 'trade', 'wallet', 'profile', 'phoneInput', 'modal'],
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
  });

function normalizeLang(code?: string | null) {
  if (!code) return 'en';
  const lower = code.toLowerCase();
  if (lower.startsWith('th')) return 'th';
  return 'en';
}

export function I18nProvider({ children }: PropsWithChildren) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        const device = (() => {
          try {
            const locales = (Localization as any).getLocales?.() ?? [];
            return normalizeLang(locales[0]?.languageCode || (Localization as any).locale);
          } catch {
            return 'en';
          }
        })();
        const next = normalizeLang(saved) || device;
        await i18n.changeLanguage(next);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  if (!ready) return null;
  return <>{children}</>;
}

export function useAppLanguage() {
  const { i18n: instance } = useTranslation();

  const setLanguage = useCallback(async (lng: 'en' | 'th') => {
    const normalized = normalizeLang(lng) as 'en' | 'th';
    await instance.changeLanguage(normalized);
    await AsyncStorage.setItem(STORAGE_KEY, normalized);
  }, [instance]);

  return {
    language: (instance.language?.startsWith('th') ? 'th' : 'en') as 'en' | 'th',
    setLanguage,
  } as const;
}

export default i18n;
