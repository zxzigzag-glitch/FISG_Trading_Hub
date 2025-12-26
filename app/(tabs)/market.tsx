import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type MarketCategory = 'All' | 'Forex' | 'Metals' | 'Indices' | 'CFDs';

interface Symbol {
  id: string;
  name: string;
  category: string;
  price: number;
  change: number;
  isFavorite: boolean;
}

export default function MarketScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const themeColors = Colors[theme];
  const subtleBorderColor = theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)';
  const subtleFill = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)';
  const [selectedCategory, setSelectedCategory] = useState<MarketCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [symbols, setSymbols] = useState<Symbol[]>([
    { id: '1', name: 'EURUSD', category: 'Forex', price: 1.0899, change: 9.58, isFavorite: true },
    { id: '2', name: 'GBPUSD', category: 'Forex', price: 1.2704, change: -58.97, isFavorite: false },
    { id: '3', name: 'USDJPY', category: 'Forex', price: 157.645, change: 52.45, isFavorite: false },
    { id: '4', name: 'XAUUSD', category: 'Metals', price: 2429.36, change: 87.65, isFavorite: true },
    { id: '5', name: 'XAGUSD', category: 'Metals', price: 28.54, change: 12.34, isFavorite: false },
    { id: '6', name: 'NAS100', category: 'Indices', price: 18234.50, change: 45.23, isFavorite: false },
    { id: '7', name: 'US30', category: 'Indices', price: 38456.78, change: -12.34, isFavorite: false },
    { id: '8', name: 'USOIL', category: 'CFDs', price: 73.45, change: 23.45, isFavorite: false },
  ]);

  const categories: MarketCategory[] = ['All', 'Forex', 'Metals', 'Indices', 'CFDs'];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setSymbols(prev => prev.map(s => ({
        ...s,
        price: s.price * (1 + (Math.random() - 0.5) * 0.01),
        change: s.change + (Math.random() - 0.5) * 10,
      })));
      setRefreshing(false);
    }, 1000);
  };

  const toggleFavorite = (id: string) => {
    setSymbols(prev => prev.map(s => s.id === id ? { ...s, isFavorite: !s.isFavorite } : s));
  };

  const filteredSymbols = symbols.filter(s => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.header}>
          <ThemedText type="title">Market</ThemedText>
          <ThemedText style={styles.subtitle}>Favorites + Alerts</ThemedText>
        </View>
        {/* Category Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryTab,
                { backgroundColor: subtleFill },
                selectedCategory === category && {
                  backgroundColor: themeColors.tint,
                },
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  { color: themeColors.text },
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Search Bar */}
        <View
          style={[
            styles.searchContainer,
            { backgroundColor: themeColors.cardBackground, borderColor: subtleBorderColor },
          ]}
        >
          <IconSymbol name="magnifyingglass" size={20} color={themeColors.icon} />
          <TextInput
            style={[styles.searchInput, { color: themeColors.text }]}
            placeholder="Search symbol"
            placeholderTextColor={themeColors.tabIconDefault}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Symbol List */}
        {filteredSymbols.map((symbol) => (
          <View
            key={symbol.id}
            style={[
              styles.symbolCard,
              { backgroundColor: themeColors.cardBackground, borderColor: subtleBorderColor },
            ]}
          >
            <View style={styles.symbolHeader}>
              <View style={styles.symbolInfo}>
                <TouchableOpacity onPress={() => toggleFavorite(symbol.id)}>
                  <IconSymbol
                    name={symbol.isFavorite ? 'star.fill' : 'star'}
                    size={20}
                    color={symbol.isFavorite ? '#FFD700' : themeColors.icon}
                  />
                </TouchableOpacity>
                <View style={styles.symbolDetails}>
                  <ThemedText type="defaultSemiBold">{symbol.name}</ThemedText>
                  <Text style={[styles.category, { color: themeColors.text }]}>{symbol.category}</Text>
                </View>
              </View>
              <View style={styles.priceInfo}>
                <ThemedText type="defaultSemiBold" style={styles.price}>
                  {symbol.price.toFixed(symbol.category === 'Forex' ? 5 : 2)}
                </ThemedText>
                <Text style={[styles.change, symbol.change >= 0 ? styles.positive : styles.negative]}>
                  {symbol.change >= 0 ? '+' : ''}{symbol.change.toFixed(2)}%
                </Text>
              </View>
            </View>
            <View style={styles.symbolActions}>
              <TouchableOpacity style={[styles.actionButton, { borderColor: themeColors.tint }]}>
                <Text style={[styles.actionText, { color: themeColors.tint }]}>Trade</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, { borderColor: themeColors.tint }]}>
                <IconSymbol name="bell" size={16} color={themeColors.tint} />
                <Text style={[styles.actionText, { color: themeColors.tint }]}>Alert</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
    flexGrow: 0,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  symbolCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  symbolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  symbolInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  symbolDetails: {
    gap: 4,
  },
  category: {
    fontSize: 12,
    opacity: 0.6,
  },
  priceInfo: {
    alignItems: 'flex-end',
    gap: 4,
  },
  price: {
    fontSize: 18,
  },
  change: {
    fontSize: 14,
    fontWeight: '600',
  },
  positive: {
    color: '#10b981',
  },
  negative: {
    color: '#ef4444',
  },
  symbolActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
