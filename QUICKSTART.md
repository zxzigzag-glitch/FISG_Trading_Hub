# 🚀 Quick Start Guide - FISG Trading Hub

## Prerequisites ✅

Before starting, ensure you have:
- ✅ Node.js 20.18.0 (already configured via nvm)
- ✅ Yarn 1.22.21 (already installed)
- ✅ Expo CLI (included in project)

## Step 1: Start the Development Server

The app is already configured and ready to run:

```bash
yarn start
```

You should see:
```
Starting project at D:\digital-next\FISG_Trading_Hub
React Compiler enabled
Starting Metro Bundler

› Metro waiting on exp://192.168.1.135:8081
```

## Step 2: Open the App

### Option A: Mobile Device (Recommended)
1. Install **Expo Go** from:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scan the QR code shown in terminal with:
   - **iOS**: Native Camera app
   - **Android**: Expo Go app

### Option B: Web Browser
Press `w` in the terminal or visit:
```
http://localhost:8081
```

### Option C: Emulator
- **Android**: Press `a` (requires Android Studio)
- **iOS**: Press `i` (requires Xcode, macOS only)

## Step 3: Navigate the App

The app has **5 main tabs**:

### 🏠 Home
- View your journey checklist
- See market snapshot
- Quick actions (KYC, Wallet, Learn, Trading)
- Latest news and updates
- Rewards preview

### 📊 Market
- Browse symbols by category (Forex, Metals, Indices, CFDs)
- Search for instruments
- Add favorites (tap the star)
- Set price alerts (tap Alert button)
- Pull down to refresh prices

### ⚡ Trade
- Select account (MT4/MT5)
- Choose symbol
- Set volume (lot size)
- Add SL/TP (optional)
- Tap Buy/Sell to place order
- View open positions
- Close positions

### 💰 Wallet
- View balance: **$1,571.25**
- **Deposit**: Tap ➕ card → Select method → Enter amount
- **Withdraw**: Tap ➖ card (requires KYC)
- **Transfer**: Tap ⇄ card → Select accounts → Enter amount
- View transaction history

### 👤 Profile
- View user info (Araya K., Gold tier, 220 pts)
- Change theme (System/Dark/Light)
- Access Learn, Support, Settings
- Manage notifications
- Reset demo data or Logout

## 🎯 Try These Demo Flows

### 1. Make a Deposit
1. Go to **Wallet** tab
2. Tap **Deposit** card (➕)
3. Select "USDT Deposit"
4. Choose "USD"
5. Enter amount (e.g., 100)
6. Tap "Confirm deposit"
7. ✅ See transaction in history with "Pending" status

### 2. Place a Trade
1. Go to **Trade** tab
2. Select "MT4" account
3. Choose "EURUSD"
4. Enter volume: 0.01
5. Tap **Buy** (green button)
6. ✅ Confirm in alert dialog
7. View in Open Positions section

### 3. Add a Favorite Symbol
1. Go to **Market** tab
2. Find "GBPUSD"
3. Tap the **star icon** (☆)
4. ✅ Star turns gold (⭐)

### 4. Try a Withdrawal (KYC Demo)
1. Go to **Wallet** tab
2. Tap **Withdraw** card (➖)
3. ✅ See KYC requirement message
4. (In production, this would redirect to KYC flow)

## 🎨 Theme Switching

1. Go to **Profile** tab
2. Under "Theme" section, tap:
   - **System**: Follows device setting
   - **Dark**: Force dark mode
   - **Light**: Force light mode

## 🔄 Refresh Data

- **Home**: Pull down from top
- **Market**: Pull down from top
- Prices update automatically every 10s in Trade screen

## 📱 Demo Data

The app comes pre-loaded with:
- **Balance**: $1,571.25
- **Points**: 220 pts
- **KYC Status**: Approved
- **Account**: FISG-7H2KQ (Gold tier)
- **Open Positions**: 1 EURUSD BUY (+$7.66)
- **Transactions**: 3 recent (deposit, withdraw, transfer)
- **Market Data**: 8 symbols across all categories

## 🛠️ Development Commands

```bash
# Start development server
yarn start

# Run on specific platform
yarn android    # Android emulator
yarn ios        # iOS simulator
yarn web        # Web browser

# Other commands
yarn lint       # Run ESLint
yarn reset-project  # Reset to fresh state
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 8081
npx kill-port 8081
yarn start
```

### Metro Bundler Issues
```bash
# Clear cache and restart
yarn start --clear
```

### Node Version
```bash
# Verify Node version (should be 20.18.0)
node -v

# Switch version if needed
nvm use 20.18.0
```

## 📖 Documentation

- **README.md**: Overview and features
- **IMPLEMENTATION.md**: Detailed implementation guide
- **This file**: Quick start guide

## 🎉 You're Ready!

The app is fully functional and ready for:
- ✅ Demo presentations
- ✅ User testing
- ✅ Stakeholder reviews
- ✅ Feature additions
- ✅ API integration

## 📞 Support

If you encounter issues:
1. Check terminal for error messages
2. Review IMPLEMENTATION.md for details
3. Use in-app Support button (Profile → Support)

---

**Happy Trading! 📈**
