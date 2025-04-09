class WebSocketService {
  constructor() {
    this.socket = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 3000;
    this.subscribers = new Set();
    this.currentRoute = null;
  }

  setCurrentRoute(route) {
    this.currentRoute = route;
  }

  connect() {
    // Only connect to crypto stream if on crypto route
    if (this.currentRoute === '/crypto') {
      this.socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker/ethusdt@ticker');

      this.socket.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
      };

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.handleMessage(data);
      };

      this.socket.onclose = () => {
        console.log('WebSocket disconnected');
        this.handleReconnect();
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  }

  handleMessage(data) {
    const notification = this.processData(data);
    if (notification) {
      this.notifySubscribers(notification);
    }
  }

  processData(data) {
    if (!data.s || !data.p) return null;

    const symbol = data.s;
    const priceChange = parseFloat(data.p);
    const priceChangePercent = parseFloat(data.P);

    // Only notify for significant changes (e.g., > 1%)
    if (Math.abs(priceChangePercent) > 1) {
      return {
        type: 'price_alert',
        symbol: symbol,
        priceChange: priceChange,
        priceChangePercent: priceChangePercent,
        currentPrice: parseFloat(data.c),
        timestamp: new Date().toISOString()
      };
    }
    return null;
  }

  // Simulate weather alerts
  simulateWeatherAlert() {
    const weatherAlerts = [
      {
        type: 'weather_alert',
        message: 'Heavy rain expected in New York in the next hour',
        severity: 'warning',
        timestamp: new Date().toISOString()
      },
      {
        type: 'weather_alert',
        message: 'Temperature dropping below freezing in Chicago',
        severity: 'warning',
        timestamp: new Date().toISOString()
      }
    ];

    const randomAlert = weatherAlerts[Math.floor(Math.random() * weatherAlerts.length)];
    this.notifySubscribers(randomAlert);
  }

  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect();
      }, this.reconnectDelay);
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notifySubscribers(notification) {
    // Only notify if the notification type matches the current route
    if ((this.currentRoute === '/crypto' && notification.type === 'price_alert') ||
        (this.currentRoute === '/weather' && notification.type === 'weather_alert')) {
      this.subscribers.forEach(callback => callback(notification));
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export const websocketService = new WebSocketService(); 