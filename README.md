# CryptoWeather Nexus

A modern web application that combines cryptocurrency and weather data visualization, built with React and Vite.

## 🚀 Features

- Real-time cryptocurrency data tracking
- Weather information integration
- Modern, responsive UI built with Tailwind CSS
- State management using Redux Toolkit
- Client-side routing with React Router
- Icon support through Heroicons
- **Real-time Notifications System**
  - Route-based notifications (crypto/weather)
  - Price change alerts for cryptocurrencies
  - Weather alerts and warnings
  - Auto-dismissing notifications
  - Customizable notification types

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Icons**: Heroicons
- **Linting**: ESLint
- **Real-time Updates**: WebSocket
- **API Integration**: Binance WebSocket API

## 📁 Project Structure

```
src/
├── assets/         # Static assets and images
├── components/     # Reusable UI components
│   ├── Notification.jsx      # Notification component
│   ├── NotificationManager.jsx # Notification management
│   └── ...
├── config/         # Configuration files
├── pages/          # Page components
├── services/       # API and service integrations
│   └── websocketService.js   # WebSocket service
├── store/          # Redux store configuration
├── App.jsx         # Main application component
├── main.jsx        # Application entry point
└── index.css       # Global styles
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Build for production:
   ```bash
   npm run build
   ```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🔧 Configuration

The project uses environment variables for configuration. Copy `.env.example` to `.env` and fill in the required values.

## 🔔 Real-time Notifications

The application features a sophisticated notification system:

### Cryptocurrency Notifications
- Real-time price change alerts for BTC and ETH
- Notifications for significant price movements (>1%)
- Color-coded alerts (green for increases, red for decreases)
- Current price and percentage change information

### Weather Notifications
- Simulated weather alerts and warnings
- Regular updates for weather conditions
- Location-specific weather warnings
- Severity-based notification styling

### Notification Features
- Route-based notification filtering
- Auto-dismissing after 5 seconds
- Manual dismissal option
- Multiple notification support
- Smooth animations and transitions

## 🧪 Testing

The project includes ESLint configuration for code quality and consistency.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
