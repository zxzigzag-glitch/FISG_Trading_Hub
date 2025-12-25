import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Position {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  lots: number;
  openPrice: number;
  currentPrice: number;
  openTime: string;
  sl?: number;
  tp?: number;
  profit: number;
}

export default function TradeScreen() {
  const colorScheme = useColorScheme();
  const [selectedAccount, setSelectedAccount] = useState('MT4');
  const [selectedSymbol, setSelectedSymbol] = useState('EURUSD');
  const [volume, setVolume] = useState('0.01');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [comment, setComment] = useState('');
  
  const [accountInfo] = useState({
    balance: 1250.50,
    equity: 1258.16,
    margin: 0.00,
    freeMargin: 1258.16,
  });

  const [positions, setPositions] = useState<Position[]>([
    {
      id: '1',
      symbol: 'EURUSD',
      type: 'BUY',
      lots: 0.2,
      openPrice: 1.0861,
      currentPrice: 1.0899,
      openTime: '2025-03-14 10:10',
      profit: 7.66,
    },
  ]);

  const [currentPrice] = useState(1.0899);

  const symbols = ['EURUSD', 'XAUUSD', 'USOIL', 'NAS100', 'GBPUSD', 'USDJPY'];

  const handleTrade = (type: 'BUY' | 'SELL') => {
    const lots = parseFloat(volume);
    if (isNaN(lots) || lots <= 0) {
      Alert.alert('Invalid Volume', 'Please enter a valid lot size');
      return;
    }

    Alert.alert(
      'Trade Placed',
      `${type} ${lots} lots of ${selectedSymbol} at ${currentPrice}`,
      [{ text: 'OK' }]
    );
  };

  const handleClosePosition = (id: string) => {
    Alert.alert(
      'Close Position',
      'Are you sure you want to close this position?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Close',
          style: 'destructive',
          onPress: () => {
            setPositions(prev => prev.filter(p => p.id !== id));
            Alert.alert('Success', 'Position closed successfully');
          },
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <ThemedText type="title">Trade (Demo)</ThemedText>
          <ThemedText style={styles.subtitle}>Market order</ThemedText>
        </View>
        {/* Account Selection */}
        <View style={styles.section}>
          <ThemedText type="subtitle">Account</ThemedText>
          <View style={styles.accountButtons}>
            {['MT4', 'MT5'].map((account) => (
              <TouchableOpacity
                key={account}
                style={[
                  styles.accountButton,
                  selectedAccount === account && {
                    backgroundColor: Colors[colorScheme ?? 'light'].tint,
                  },
                ]}
                onPress={() => setSelectedAccount(account)}
              >
                <Text
                  style={[
                    styles.accountButtonText,
                    selectedAccount === account && styles.accountButtonTextActive,
                  ]}
                >
                  {account}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Symbol Selection */}
        <View style={styles.section}>
          <ThemedText type="subtitle">Symbol</ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.symbolScroll}>
            {symbols.map((symbol) => (
              <TouchableOpacity
                key={symbol}
                style={[
                  styles.symbolButton,
                  selectedSymbol === symbol && {
                    backgroundColor: Colors[colorScheme ?? 'light'].tint,
                  },
                ]}
                onPress={() => setSelectedSymbol(symbol)}
              >
                <Text
                  style={[
                    styles.symbolButtonText,
                    selectedSymbol === symbol && styles.symbolButtonTextActive,
                  ]}
                >
                  {symbol}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Current Price */}
        <View style={[styles.priceCard, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}>
          <ThemedText type="subtitle">Quote</ThemedText>
          <ThemedText type="title" style={styles.currentPrice}>{currentPrice}</ThemedText>
          <Text style={styles.priceUpdate}>Live • Updates every 10s • 15m</Text>
        </View>

        {/* Volume Input */}
        <View style={styles.section}>
          <ThemedText type="subtitle">Volume (Lots)</ThemedText>
          <TextInput
            style={[styles.input, { 
              backgroundColor: Colors[colorScheme ?? 'light'].cardBackground,
              color: Colors[colorScheme ?? 'light'].text,
            }]}
            placeholder="0.01"
            placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
            value={volume}
            onChangeText={setVolume}
            keyboardType="decimal-pad"
          />
        </View>

        {/* Stop Loss / Take Profit */}
        <View style={styles.section}>
          <ThemedText type="subtitle">Stop Loss (optional)</ThemedText>
          <TextInput
            style={[styles.input, { 
              backgroundColor: Colors[colorScheme ?? 'light'].cardBackground,
              color: Colors[colorScheme ?? 'light'].text,
            }]}
            placeholder="—"
            placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
            value={stopLoss}
            onChangeText={setStopLoss}
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle">Take Profit (optional)</ThemedText>
          <TextInput
            style={[styles.input, { 
              backgroundColor: Colors[colorScheme ?? 'light'].cardBackground,
              color: Colors[colorScheme ?? 'light'].text,
            }]}
            placeholder="—"
            placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
            value={takeProfit}
            onChangeText={setTakeProfit}
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle">Comment (optional)</ThemedText>
          <TextInput
            style={[styles.input, { 
              backgroundColor: Colors[colorScheme ?? 'light'].cardBackground,
              color: Colors[colorScheme ?? 'light'].text,
            }]}
            placeholder="Add note..."
            placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
            value={comment}
            onChangeText={setComment}
          />
        </View>

        {/* Trade Buttons */}
        <View style={styles.tradeButtons}>
          <TouchableOpacity
            style={[styles.tradeButton, styles.buyButton]}
            onPress={() => handleTrade('BUY')}
          >
            <Text style={styles.tradeButtonText}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tradeButton, styles.sellButton]}
            onPress={() => handleTrade('SELL')}
          >
            <Text style={styles.tradeButtonText}>Sell</Text>
          </TouchableOpacity>
        </View>

        {/* Account Info */}
        <View style={[styles.accountInfo, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Balance</Text>
            <ThemedText type="defaultSemiBold">${accountInfo.balance.toFixed(2)}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Equity</Text>
            <ThemedText type="defaultSemiBold">${accountInfo.equity.toFixed(2)}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Margin</Text>
            <ThemedText type="defaultSemiBold">${accountInfo.margin.toFixed(2)}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Free Margin</Text>
            <ThemedText type="defaultSemiBold">${accountInfo.freeMargin.toFixed(2)}</ThemedText>
          </View>
        </View>

        {/* Tip */}
        <View style={[styles.tipCard, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
          <ThemedText style={styles.tipText}>
            💡 This is a UI simulator for review. Not connected to real MT execution.
          </ThemedText>
          <TouchableOpacity style={styles.mtLink}>
            <Text style={[styles.mtLinkText, { color: Colors[colorScheme ?? 'light'].tint }]}>
              Open MT4/MT5
            </Text>
          </TouchableOpacity>
        </View>

        {/* Open Positions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle">Open Positions</ThemedText>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{positions.length}</Text>
            </View>
          </View>

          {positions.map((position) => (
            <View
              key={position.id}
              style={[styles.positionCard, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}
            >
              <View style={styles.positionHeader}>
                <View style={styles.positionInfo}>
                  <ThemedText type="defaultSemiBold">
                    {position.type === 'BUY' ? '▲' : '▼'} {position.symbol}
                  </ThemedText>
                  <Text style={styles.positionDetails}>
                    {position.type} • {position.lots} lots
                  </Text>
                  <Text style={styles.positionTime}>
                    Open {position.openTime} @ {position.openPrice}
                  </Text>
                  <Text style={styles.positionSLTP}>
                    SL {position.sl ?? '—'} • TP {position.tp ?? '—'}
                  </Text>
                </View>
                <View style={styles.positionActions}>
                  <ThemedText type="defaultSemiBold" style={[styles.profit, position.profit >= 0 ? styles.profitPositive : styles.profitNegative]}>
                    {position.profit >= 0 ? '+' : ''}{position.profit.toFixed(2)}
                  </ThemedText>
                  <TouchableOpacity
                    style={[styles.closeButton, { borderColor: Colors[colorScheme ?? 'light'].tint }]}
                    onPress={() => handleClosePosition(position.id)}
                  >
                    <Text style={[styles.closeButtonText, { color: Colors[colorScheme ?? 'light'].tint }]}>
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  accountButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  accountButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  accountButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  accountButtonTextActive: {
    color: '#fff',
  },
  symbolScroll: {
    marginTop: 8,
  },
  symbolButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  symbolButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  symbolButtonTextActive: {
    color: '#fff',
  },
  priceCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  currentPrice: {
    fontSize: 32,
    marginVertical: 8,
  },
  priceUpdate: {
    fontSize: 12,
    opacity: 0.6,
  },
  input: {
    marginTop: 8,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  tradeButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tradeButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buyButton: {
    backgroundColor: '#10b981',
  },
  sellButton: {
    backgroundColor: '#ef4444',
  },
  tradeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  accountInfo: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  tipCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
  },
  tipText: {
    fontSize: 13,
    marginBottom: 8,
  },
  mtLink: {
    alignSelf: 'flex-start',
  },
  mtLinkText: {
    fontSize: 14,
    fontWeight: '600',
  },
  positionCard: {
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  positionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  positionInfo: {
    flex: 1,
    gap: 4,
  },
  positionDetails: {
    fontSize: 12,
    opacity: 0.7,
  },
  positionTime: {
    fontSize: 11,
    opacity: 0.5,
  },
  positionSLTP: {
    fontSize: 11,
    opacity: 0.5,
  },
  positionActions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  profit: {
    fontSize: 18,
    fontWeight: '700',
  },
  profitPositive: {
    color: '#10b981',
  },
  profitNegative: {
    color: '#ef4444',
  },
  closeButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
  },
  closeButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
