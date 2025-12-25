import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Transaction {
  id: string;
  type: 'Deposit' | 'Withdraw' | 'Transfer';
  method: string;
  date: string;
  status: 'Approved' | 'Pending' | 'Rejected' | 'Completed';
  amount: number;
  reason?: string;
}

type ModalType = 'deposit' | 'withdraw' | 'transfer' | null;

export default function WalletScreen() {
  const colorScheme = useColorScheme();
  const [balance] = useState(1571.25);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [kycApproved] = useState(true);
  
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'Deposit',
      method: 'USDT Deposit',
      date: '2025-03-10 09:20',
      status: 'Approved',
      amount: 500.00,
    },
    {
      id: '2',
      type: 'Withdraw',
      method: 'Bank Transfer',
      date: '2025-03-12 15:40',
      status: 'Pending',
      amount: -120.00,
      reason: 'Awaiting approval',
    },
    {
      id: '3',
      type: 'Transfer',
      method: 'MT4 → MT5',
      date: '2025-03-13 11:05',
      status: 'Completed',
      amount: 250.00,
    },
  ]);

  // Deposit Modal State
  const [depositMethod, setDepositMethod] = useState('USDT Deposit');
  const [depositCurrency, setDepositCurrency] = useState('USD');
  const [depositAmount, setDepositAmount] = useState('');

  // Withdraw Modal State
  const [withdrawMethod, setWithdrawMethod] = useState('Bank Transfer');
  const [withdrawCurrency, setWithdrawCurrency] = useState('USD');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  // Transfer Modal State
  const [transferFrom, setTransferFrom] = useState('MT4');
  const [transferTo, setTransferTo] = useState('MT5');
  const [transferCurrency, setTransferCurrency] = useState('USD');
  const [transferAmount, setTransferAmount] = useState('');

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount');
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'Deposit',
      method: depositMethod,
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'Pending',
      amount: amount,
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setActiveModal(null);
    setDepositAmount('');
    Alert.alert('Success', 'Deposit request submitted successfully');
  };

  const handleWithdraw = () => {
    if (!kycApproved) {
      Alert.alert('KYC Required', 'Complete KYC to unlock withdrawals');
      return;
    }

    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount');
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'Withdraw',
      method: withdrawMethod,
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'Pending',
      amount: -amount,
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setActiveModal(null);
    setWithdrawAmount('');
    Alert.alert('Success', 'Withdrawal request submitted successfully');
  };

  const handleTransfer = () => {
    const amount = parseFloat(transferAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount');
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'Transfer',
      method: `${transferFrom} → ${transferTo}`,
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'Completed',
      amount: amount,
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setActiveModal(null);
    setTransferAmount('');
    Alert.alert('Success', 'Transfer completed successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
      case 'Completed':
        return '#10b981';
      case 'Pending':
        return '#f59e0b';
      case 'Rejected':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'Deposit':
        return '➕';
      case 'Withdraw':
        return '➖';
      case 'Transfer':
        return '⇄';
      default:
        return '•';
    }
  };

  if (activeModal === 'deposit') {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setActiveModal(null)}>
            <IconSymbol name="chevron.left" size={24} color={Colors[colorScheme ?? 'light'].text} />
          </TouchableOpacity>
          <ThemedText type="title">Deposit</ThemedText>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.scrollView}>
          <ThemedText style={styles.modalSubtitle}>Creates transaction record</ThemedText>

          <View style={styles.section}>
            <ThemedText type="subtitle">Method</ThemedText>
            <View style={styles.buttonGroup}>
              {['USDT Deposit', 'Bank Transfer', 'Credit/Debit Card'].map((method) => (
                <TouchableOpacity
                  key={method}
                  style={[
                    styles.optionButton,
                    depositMethod === method && {
                      backgroundColor: Colors[colorScheme ?? 'light'].tint,
                    },
                  ]}
                  onPress={() => setDepositMethod(method)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      depositMethod === method && styles.optionTextActive,
                    ]}
                  >
                    {method}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle">Currency</ThemedText>
            <View style={styles.buttonGroup}>
              {['USD', 'THB'].map((currency) => (
                <TouchableOpacity
                  key={currency}
                  style={[
                    styles.optionButton,
                    depositCurrency === currency && {
                      backgroundColor: Colors[colorScheme ?? 'light'].tint,
                    },
                  ]}
                  onPress={() => setDepositCurrency(currency)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      depositCurrency === currency && styles.optionTextActive,
                    ]}
                  >
                    {currency}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle">Amount</ThemedText>
            <TextInput
              style={[styles.input, { 
                backgroundColor: Colors[colorScheme ?? 'light'].cardBackground,
                color: Colors[colorScheme ?? 'light'].text,
              }]}
              placeholder="Enter amount"
              placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
              value={depositAmount}
              onChangeText={setDepositAmount}
              keyboardType="decimal-pad"
            />
          </View>

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
            onPress={handleDeposit}
          >
            <Text style={styles.submitButtonText}>Confirm deposit</Text>
          </TouchableOpacity>
        </ScrollView>
      </ThemedView>
    );
  }

  if (activeModal === 'withdraw') {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setActiveModal(null)}>
            <IconSymbol name="chevron.left" size={24} color={Colors[colorScheme ?? 'light'].text} />
          </TouchableOpacity>
          <ThemedText type="title">Withdraw</ThemedText>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.scrollView}>
          <ThemedText style={styles.modalSubtitle}>KYC required</ThemedText>

          {!kycApproved && (
            <View style={[styles.warningCard, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
              <Text style={styles.warningIcon}>!</Text>
              <View style={styles.warningContent}>
                <ThemedText type="defaultSemiBold">Withdrawal is locked</ThemedText>
                <Text style={styles.warningText}>Complete KYC to unlock withdrawals.</Text>
                <TouchableOpacity style={styles.warningButton}>
                  <Text style={[styles.warningButtonText, { color: Colors[colorScheme ?? 'light'].tint }]}>
                    Go to KYC
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={styles.section}>
            <ThemedText type="subtitle">Method</ThemedText>
            <View style={styles.buttonGroup}>
              {['Bank Transfer', 'USDT'].map((method) => (
                <TouchableOpacity
                  key={method}
                  style={[
                    styles.optionButton,
                    withdrawMethod === method && {
                      backgroundColor: Colors[colorScheme ?? 'light'].tint,
                    },
                    !kycApproved && styles.optionButtonDisabled,
                  ]}
                  onPress={() => kycApproved && setWithdrawMethod(method)}
                  disabled={!kycApproved}
                >
                  <Text
                    style={[
                      styles.optionText,
                      withdrawMethod === method && styles.optionTextActive,
                    ]}
                  >
                    {method}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle">Currency</ThemedText>
            <View style={styles.buttonGroup}>
              {['USD', 'THB'].map((currency) => (
                <TouchableOpacity
                  key={currency}
                  style={[
                    styles.optionButton,
                    withdrawCurrency === currency && {
                      backgroundColor: Colors[colorScheme ?? 'light'].tint,
                    },
                    !kycApproved && styles.optionButtonDisabled,
                  ]}
                  onPress={() => kycApproved && setWithdrawCurrency(currency)}
                  disabled={!kycApproved}
                >
                  <Text
                    style={[
                      styles.optionText,
                      withdrawCurrency === currency && styles.optionTextActive,
                    ]}
                  >
                    {currency}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle">Amount</ThemedText>
            <TextInput
              style={[styles.input, { 
                backgroundColor: Colors[colorScheme ?? 'light'].cardBackground,
                color: Colors[colorScheme ?? 'light'].text,
              }]}
              placeholder="Enter amount"
              placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
              value={withdrawAmount}
              onChangeText={setWithdrawAmount}
              keyboardType="decimal-pad"
              editable={kycApproved}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              { backgroundColor: Colors[colorScheme ?? 'light'].tint },
              !kycApproved && styles.submitButtonDisabled,
            ]}
            onPress={handleWithdraw}
            disabled={!kycApproved}
          >
            <Text style={styles.submitButtonText}>Request withdrawal</Text>
          </TouchableOpacity>
        </ScrollView>
      </ThemedView>
    );
  }

  if (activeModal === 'transfer') {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setActiveModal(null)}>
            <IconSymbol name="chevron.left" size={24} color={Colors[colorScheme ?? 'light'].text} />
          </TouchableOpacity>
          <ThemedText type="title">Transfer</ThemedText>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.scrollView}>
          <ThemedText style={styles.modalSubtitle}>MT4 ⇄ MT5</ThemedText>

          <View style={styles.section}>
            <ThemedText type="subtitle">From</ThemedText>
            <View style={styles.buttonGroup}>
              {['MT4', 'MT5'].map((account) => (
                <TouchableOpacity
                  key={account}
                  style={[
                    styles.optionButton,
                    transferFrom === account && {
                      backgroundColor: Colors[colorScheme ?? 'light'].tint,
                    },
                  ]}
                  onPress={() => {
                    setTransferFrom(account);
                    setTransferTo(account === 'MT4' ? 'MT5' : 'MT4');
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      transferFrom === account && styles.optionTextActive,
                    ]}
                  >
                    {account}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle">To</ThemedText>
            <View style={styles.buttonGroup}>
              {['MT5', 'MT4'].map((account) => (
                <TouchableOpacity
                  key={account}
                  style={[
                    styles.optionButton,
                    transferTo === account && {
                      backgroundColor: Colors[colorScheme ?? 'light'].tint,
                    },
                  ]}
                  onPress={() => {
                    setTransferTo(account);
                    setTransferFrom(account === 'MT4' ? 'MT5' : 'MT4');
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      transferTo === account && styles.optionTextActive,
                    ]}
                  >
                    {account}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle">Currency</ThemedText>
            <View style={styles.buttonGroup}>
              {['USD'].map((currency) => (
                <TouchableOpacity
                  key={currency}
                  style={[
                    styles.optionButton,
                    { backgroundColor: Colors[colorScheme ?? 'light'].tint },
                  ]}
                >
                  <Text style={[styles.optionText, styles.optionTextActive]}>
                    {currency}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle">Amount</ThemedText>
            <TextInput
              style={[styles.input, { 
                backgroundColor: Colors[colorScheme ?? 'light'].cardBackground,
                color: Colors[colorScheme ?? 'light'].text,
              }]}
              placeholder="Enter amount"
              placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
              value={transferAmount}
              onChangeText={setTransferAmount}
              keyboardType="decimal-pad"
            />
          </View>

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
            onPress={handleTransfer}
          >
            <Text style={styles.submitButtonText}>Confirm transfer</Text>
          </TouchableOpacity>
        </ScrollView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <ThemedText type="title">Wallet</ThemedText>
          <ThemedText style={styles.subtitle}>All features enabled</ThemedText>
        </View>
        {/* Balance Card */}
        <View style={[styles.balanceCard, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
          <Text style={styles.balanceSubtext}>History</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}
            onPress={() => setActiveModal('deposit')}
          >
            <Text style={styles.actionIcon}>➕</Text>
            <ThemedText type="defaultSemiBold">Deposit</ThemedText>
            <Text style={styles.actionDesc}>Amount → Method → Status</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}
            onPress={() => setActiveModal('withdraw')}
          >
            <Text style={styles.actionIcon}>➖</Text>
            <ThemedText type="defaultSemiBold">Withdraw</ThemedText>
            <Text style={[styles.actionDesc, !kycApproved && { color: '#ef4444' }]}>
              {kycApproved ? 'Approved users only' : 'Blocked until KYC Approved'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}
            onPress={() => setActiveModal('transfer')}
          >
            <Text style={styles.actionIcon}>⇄</Text>
            <ThemedText type="defaultSemiBold">Transfer</ThemedText>
            <Text style={styles.actionDesc}>Move funds between MT4 and MT5</Text>
            <TouchableOpacity style={styles.openButton}>
              <Text style={[styles.openButtonText, { color: Colors[colorScheme ?? 'light'].tint }]}>Open</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Recent History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle">Recent History</ThemedText>
            <TouchableOpacity>
              <Text style={[styles.viewAll, { color: Colors[colorScheme ?? 'light'].tint }]}>View all</Text>
            </TouchableOpacity>
          </View>

          {transactions.map((transaction) => (
            <View
              key={transaction.id}
              style={[styles.transactionCard, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}
            >
              <View style={styles.transactionLeft}>
                <Text style={styles.transactionIcon}>{getTransactionIcon(transaction.type)}</Text>
                <View style={styles.transactionDetails}>
                  <ThemedText type="defaultSemiBold">
                    {transaction.type} • {transaction.method}
                  </ThemedText>
                  <Text style={styles.transactionDate}>
                    {transaction.date}
                    {transaction.reason && ` • Reason: ${transaction.reason}`}
                  </Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(transaction.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(transaction.status) }]}>
                      {transaction.status}
                    </Text>
                  </View>
                </View>
              </View>
              <ThemedText
                type="defaultSemiBold"
                style={[
                  styles.transactionAmount,
                  transaction.amount >= 0 ? styles.amountPositive : styles.amountNegative,
                ]}
              >
                {transaction.amount >= 0 ? '+' : ''}{transaction.amount.toFixed(2)}
              </ThemedText>
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
  balanceCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 8,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 4,
  },
  balanceSubtext: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  actionCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionDesc: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },
  openButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  openButtonText: {
    fontSize: 14,
    fontWeight: '600',
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
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  transactionIcon: {
    fontSize: 20,
  },
  transactionDetails: {
    flex: 1,
    gap: 4,
  },
  transactionDate: {
    fontSize: 11,
    opacity: 0.6,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  transactionAmount: {
    fontSize: 16,
    marginLeft: 12,
  },
  amountPositive: {
    color: '#10b981',
  },
  amountNegative: {
    color: '#ef4444',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
  },
  modalSubtitle: {
    fontSize: 14,
    opacity: 0.7,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  optionButtonDisabled: {
    opacity: 0.3,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  optionTextActive: {
    color: '#fff',
  },
  input: {
    marginTop: 8,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  submitButton: {
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.3,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  warningCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 12,
  },
  warningIcon: {
    fontSize: 24,
    color: '#ef4444',
  },
  warningContent: {
    flex: 1,
    gap: 4,
  },
  warningText: {
    fontSize: 13,
    opacity: 0.7,
  },
  warningButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  warningButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
