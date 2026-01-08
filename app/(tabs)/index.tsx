import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ChecklistItem {
  id: string;
  title: string;
  subtitle: string;
  status: 'completed' | 'active' | 'locked';
  icon: string;
}

interface NewsItem {
  id: string;
  icon: string;
  title: string;
  category: string;
  date: string;
}

interface MarketSnapshot {
  symbol: string;
  price: number;
  change: number;
  timeframe: string;
}

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const themeColors = Colors[theme];
  const subtleBorderColor = theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)';
  const subtleFill = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)';
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useTranslation();

  const checklist: ChecklistItem[] = [
    { id: '1', title: t('home:register'), subtitle: t('home:accountCreated'), status: 'completed', icon: '✓' },
    { id: '2', title: t('home:kycVerification'), subtitle: t('home:verified'), status: 'completed', icon: '✓' },
    { id: '3', title: t('home:openTradingAccount'), subtitle: t('home:accountActive'), status: 'completed', icon: '✓' },
    { id: '4', title: t('home:deposit'), subtitle: t('home:done'), status: 'completed', icon: '✓' },
    { id: '5', title: t('home:trade'), subtitle: t('home:done'), status: 'completed', icon: '✓' },
    { id: '6', title: t('home:rewards'), subtitle: t('home:claimMissions'), status: 'active', icon: '6' },
  ];

  const marketSnapshot: MarketSnapshot[] = [
    { symbol: 'EURUSD', price: 1.0899, change: 9.58, timeframe: '15m' },
    { symbol: 'XAUUSD', price: 2429.36, change: 87.65, timeframe: '15m' },
  ];

  const news: NewsItem[] = [
    {
      id: '1',
      icon: '📰',
      title: 'Stock Index & Dividend Adjustment announcement',
      category: 'FISG Notices',
      date: '2025-12-10',
    },
    {
      id: '2',
      icon: '📰',
      title: 'Trading hours schedule for Thanksgiving Day 2025',
      category: 'Trading Hours',
      date: '2025-11-25',
    },
    {
      id: '3',
      icon: '📰',
      title: 'New series: Risk Management for New Traders',
      category: 'Education',
      date: '2025-12-18',
    },
  ];

  const quickActions = [
    { id: '1', icon: 'ID', title: t('home:kycApproved'), subtitle: t('home:kycVerificationLabel'), status: t('home:verifiedStatus'), color: '#10b981' },
    { id: '2', icon: '$', title: t('home:walletLabel'), subtitle: t('home:depositWithdrawStatus'), balance: '$1571.25', color: '#3b82f6' },
    { id: '3', icon: '🎓', title: t('home:learnLabel'), subtitle: t('home:lessonsQuizzesProgress'), action: t('home:openAction'), color: '#8b5cf6' },
    { id: '4', icon: '⚡', title: t('home:lightTrading'), subtitle: t('home:marketOrderClose'), action: t('home:tradeAction'), color: '#f59e0b' },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.header}>
          <View>
            <ThemedText type="title">{t('home:welcome', { name: 'Araya K.' })}</ThemedText>
            <Text style={[styles.subtitle, { color: themeColors.text }]}>
              {t('home:subtitle')}
            </Text>
          </View>
        </View>
        {/* Journey Checklist */}
        <View style={styles.section}>
          <View style={styles.checklistContainer}>
            {checklist.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.checklistItem,
                  { backgroundColor: themeColors.cardBackground, borderColor: subtleBorderColor },
                ]}
              >
                <View style={styles.checklistLeft}>
                  <View
                    style={[
                      styles.statusIcon,
                      { backgroundColor: subtleFill },
                      item.status === 'completed' && styles.statusIconCompleted,
                      item.status === 'active' && styles.statusIconActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusIconText,
                        item.status === 'completed' && styles.statusIconTextCompleted,
                      ]}
                    >
                      {item.icon}
                    </Text>
                  </View>
                  <View style={styles.checklistContent}>
                    <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
                    <Text style={[styles.checklistSubtitle, { color: themeColors.text }]}>{item.subtitle}</Text>
                    {item.status === 'completed' && (
                      <Text style={[styles.checklistStatus, { color: themeColors.text }]}>{item.subtitle}</Text>
                    )}
                  </View>
                </View>
                <IconSymbol
                  name="chevron.right"
                  size={20}
                  color={themeColors.icon}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Market Continue Button */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: themeColors.tint }]}
          >
            <Text style={styles.continueButtonText}>{t('home:continueMarket')}</Text>
            <Text style={styles.continueButtonLabel}>{t('home:continue')}</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <ThemedText type="subtitle">{t('home:quickActions')}</ThemedText>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[
                  styles.actionCard,
                  { backgroundColor: themeColors.cardBackground, borderColor: subtleBorderColor },
                ]}
              >
                <Text style={styles.actionIcon}>{action.icon}</Text>
                <ThemedText type="defaultSemiBold">{action.title}</ThemedText>
                <Text style={[styles.actionSubtitle, { color: themeColors.text }]}>{action.subtitle}</Text>
                {action.balance && (
                  <ThemedText type="defaultSemiBold" style={styles.actionBalance}>
                    {action.balance}
                  </ThemedText>
                )}
                {action.status && (
                  <Text style={[styles.actionStatus, { color: action.color }]}>{action.status}</Text>
                )}
                {action.action && (
                  <TouchableOpacity style={[styles.actionButton, { borderColor: action.color }]}>
                    <Text style={[styles.actionButtonText, { color: action.color }]}>{action.action}</Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Market Snapshot */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle">{t('home:marketSnapshot')}</ThemedText>
            <View style={styles.timeframeTabs}>
              {['15m', '1h', '4h'].map((tf) => (
                <Text
                  key={tf}
                  style={[
                    styles.timeframeTab,
                    { color: themeColors.text },
                    tf === '15m' && styles.timeframeTabActive,
                  ]}
                >
                  {tf}
                </Text>
              ))}
            </View>
          </View>

          {marketSnapshot.map((market, index) => (
            <View
              key={index}
              style={[
                styles.marketCard,
                { backgroundColor: themeColors.cardBackground, borderColor: subtleBorderColor },
              ]}
            >
              <View style={styles.marketInfo}>
                <ThemedText type="defaultSemiBold">{market.symbol}</ThemedText>
                <ThemedText type="title" style={styles.marketPrice}>
                  {market.price.toFixed(market.symbol.includes('USD') && market.symbol !== 'XAUUSD' ? 4 : 2)}
                </ThemedText>
              </View>
              <Text style={[styles.marketChange, market.change >= 0 ? styles.changePositive : styles.changeNegative]}>
                +{market.change.toFixed(2)}%
              </Text>
            </View>
          ))}
        </View>

        {/* What's New */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle">{t('home:whatsNew')}</ThemedText>
            <TouchableOpacity>
              <Text style={[styles.viewAll, { color: themeColors.tint }]}>{t('home:viewAll')}</Text>
            </TouchableOpacity>
          </View>

          {news.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.newsCard,
                { backgroundColor: themeColors.cardBackground, borderColor: subtleBorderColor },
              ]}
            >
              <Text style={styles.newsIcon}>{item.icon}</Text>
              <View style={styles.newsContent}>
                <ThemedText type="defaultSemiBold" numberOfLines={2}>
                  {item.title}
                </ThemedText>
                <Text style={[styles.newsCategory, { color: themeColors.text }]}>
                  {item.category} • {item.date}
                </Text>
                <View style={[styles.newsCategoryBadge, { backgroundColor: themeColors.tint + '20' }]}>
                  <Text style={[styles.newsCategoryText, { color: themeColors.tint }]}>
                    {item.category}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Rewards Section */}
        <View style={styles.section}>
          <View style={[styles.rewardsCard, { backgroundColor: themeColors.tint }]}>
            <View style={styles.rewardsHeader}>
              <Text style={styles.rewardsTitle}>{t('home:rewardsTitle')}</Text>
              <Text style={styles.rewardsPoints}>{t('home:points', { count: 220 })}</Text>
            </View>
            <Text style={styles.rewardsSubtitle}>{t('home:missions')}</Text>
            <Text style={styles.rewardsDesc}>{t('home:completeActions')}</Text>
            <TouchableOpacity style={styles.rewardsButton}>
              <Text style={styles.rewardsButtonText}>{t('home:open')}</Text>
            </TouchableOpacity>
            <View style={styles.rewardsMissions}>
              <Text style={styles.missionItem}>KYC ✓</Text>
              <Text style={styles.missionItem}>Open account ✓</Text>
              <Text style={styles.missionItem}>Deposit ✓</Text>
            </View>
          </View>
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
    fontSize: 13,
    opacity: 0.7,
    marginTop: 8,
    lineHeight: 18,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  checklistContainer: {
    gap: 8,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  checklistLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  statusIconCompleted: {
    backgroundColor: '#10b981',
  },
  statusIconActive: {
    backgroundColor: '#3b82f6',
  },
  statusIconText: {
    fontSize: 18,
    fontWeight: '600',
  },
  statusIconTextCompleted: {
    color: '#fff',
  },
  checklistContent: {
    flex: 1,
    gap: 2,
  },
  checklistSubtitle: {
    fontSize: 12,
    opacity: 0.6,
  },
  checklistStatus: {
    fontSize: 11,
    opacity: 0.5,
  },
  continueButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  continueButtonLabel: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  actionCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    gap: 8,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 11,
    opacity: 0.6,
    lineHeight: 14,
  },
  actionBalance: {
    fontSize: 18,
    marginTop: 4,
  },
  actionStatus: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  actionButton: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  timeframeTabs: {
    flexDirection: 'row',
    gap: 8,
  },
  timeframeTab: {
    fontSize: 12,
    opacity: 0.5,
  },
  timeframeTabActive: {
    opacity: 1,
    fontWeight: '600',
  },
  marketCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  marketInfo: {
    gap: 4,
  },
  marketPrice: {
    fontSize: 24,
  },
  marketChange: {
    fontSize: 16,
    fontWeight: '700',
  },
  changePositive: {
    color: '#10b981',
  },
  changeNegative: {
    color: '#ef4444',
  },
  newsCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    gap: 12,
  },
  newsIcon: {
    fontSize: 20,
  },
  newsContent: {
    flex: 1,
    gap: 4,
  },
  newsCategory: {
    fontSize: 11,
    opacity: 0.6,
  },
  newsCategoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  newsCategoryText: {
    fontSize: 10,
    fontWeight: '600',
  },
  rewardsCard: {
    padding: 20,
    borderRadius: 16,
  },
  rewardsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rewardsTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  rewardsPoints: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  rewardsSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  rewardsDesc: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginBottom: 12,
  },
  rewardsButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  rewardsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  rewardsMissions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  missionItem: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
});

