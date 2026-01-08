import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const COUNTRY_CODES = [
  { code: '+66', country: 'Thailand', flag: '🇹🇭' },
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
  { code: '+63', country: 'Philippines', flag: '🇵🇭' },
];

interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  countryCode?: string;
  onCountryCodeChange?: (code: string) => void;
}

export function PhoneInput({
  value,
  onChangeText,
  placeholder,
  countryCode = '+66',
  onCountryCodeChange,
}: PhoneInputProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const themeColors = Colors[theme];
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCode, setSelectedCode] = useState(countryCode);

  const handleSelectCode = (code: string) => {
    setSelectedCode(code);
    onCountryCodeChange?.(code);
    setModalVisible(false);
  };

  const selectedCountry = COUNTRY_CODES.find(c => c.code === selectedCode) || COUNTRY_CODES[0];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.countryButton, { backgroundColor: themeColors.background, borderColor: themeColors.icon }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.flag}>{selectedCountry.flag}</Text>
        <Text style={[styles.countryCode, { color: themeColors.text }]}>{selectedCode}</Text>
        <Text style={[styles.arrow, { color: themeColors.icon }]}>▼</Text>
      </TouchableOpacity>

      <TextInput
        style={[styles.input, { color: themeColors.text, borderColor: themeColors.icon, backgroundColor: themeColors.background }]}
        placeholder={placeholder || t('phoneInput:placeholder')}
        placeholderTextColor={themeColors.icon}
        value={value}
        onChangeText={onChangeText}
        keyboardType="phone-pad"
        maxLength={15}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: themeColors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: themeColors.text }]}>{t('phoneInput:selectCountryCode')}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={[styles.closeButton, { color: themeColors.tint }]}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.countryList}
              contentContainerStyle={styles.countryListContent}
              showsVerticalScrollIndicator={false}
            >
              {COUNTRY_CODES.map((country) => (
                <TouchableOpacity
                  key={country.code}
                  style={[
                    styles.countryItem,
                    selectedCode === country.code && { backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }
                  ]}
                  onPress={() => handleSelectCode(country.code)}
                >
                  <Text style={styles.countryFlag}>{country.flag}</Text>
                  <Text style={[styles.countryName, { color: themeColors.text }]}>{country.country}</Text>
                  <Text style={[styles.countryCodeText, { color: themeColors.icon }]}>{country.code}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
  countryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  flag: {
    fontSize: 20,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '600',
  },
  arrow: {
    fontSize: 12,
    marginLeft: 4,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '70%',
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
  countryList: {
    flex: 1,
  },
  countryListContent: {
    paddingBottom: 20,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  countryFlag: {
    fontSize: 24,
  },
  countryName: {
    flex: 1,
    fontSize: 16,
  },
  countryCodeText: {
    fontSize: 14,
  },
});
