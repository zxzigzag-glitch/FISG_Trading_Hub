# FISG Trading Hub 📱

A comprehensive trading platform built with React Native and Expo, designed to provide a seamless trading experience from registration to rewards.

## 🎯 Features Implemented (MVP)

### ✅ Core Navigation (5 Tabs)
- **Home** - Dashboard with journey checklist and quick actions
- **Market** - Live price board with favorites and alerts
- **Trade** - Light trading interface for market orders
- **Wallet** - Deposit, withdrawal, and transaction management
- **Profile** - User settings, rewards, and preferences

### 📱 Home Dashboard
- ✅ Welcome message with clear user journey
- ✅ Step-by-step checklist (Register → KYC → Account → Deposit → Trade → Rewards)
- ✅ Quick action cards (KYC status, Wallet, Learn, Light Trading)
- ✅ Market snapshot with live prices
- ✅ News feed with categorized updates
- ✅ Rewards preview with mission status

### 💹 Market Screen
- ✅ Live price board for Forex, Metals, Indices, CFDs
- ✅ Category filtering
- ✅ Symbol search functionality
- ✅ Favorite symbols management
- ✅ Price alerts setup
- ✅ Pull-to-refresh

### ⚡ Trade Screen (Light Trading)
- ✅ Account selection (MT4/MT5)
- ✅ Symbol selection
- ✅ Live price quotes
- ✅ Volume input (lot size)
- ✅ Stop Loss / Take Profit
- ✅ Buy/Sell buttons
- ✅ Open positions with P/L
- ✅ Close position functionality

### 💰 Wallet Screen
- ✅ Available balance display
- ✅ Deposit flow (USDT, Bank Transfer, Card)
- ✅ Withdrawal flow (KYC-gated)
- ✅ Transfer between MT4 ⇄ MT5
- ✅ Transaction history with timeline
- ✅ Status tracking

### 👤 Profile Screen
- ✅ User card with tier badge
- ✅ Points display
- ✅ Theme selection
- ✅ Notification preferences
- ✅ Settings & Support access
- ✅ Logout functionality

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ (see `.nvmrc`)
- Yarn 1.22+
- Expo Go app

### Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn start

# Platform-specific
yarn android  # Android
yarn ios      # iOS
yarn web      # Web
```

## 📦 Project Structure

```
app/(tabs)/       # Main tab screens
  index.tsx       # Home dashboard
  market.tsx      # Market prices
  trade.tsx       # Trading interface
  wallet.tsx      # Wallet & transactions
  profile.tsx     # User profile
components/       # Reusable components
constants/        # Theme & constants
```

## 🎨 Design Reference

Modeled after: https://trading-hub-rho.vercel.app/

## 📱 Supported Platforms

- ✅ iOS
- ✅ Android
- ✅ Web

## 🔧 Technology Stack

- React Native / Expo SDK 54
- TypeScript 5.9
- Expo Router
- Custom themed components

---

**Version**: 1.0.0 MVP  
**Status**: ✅ Development Ready
