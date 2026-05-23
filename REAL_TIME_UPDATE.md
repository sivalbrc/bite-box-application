# BiteBox - Real-time Application Update Guide

## Overview
The BiteBox application has been upgraded to a production-ready, real-time application with comprehensive state management, error handling, and analytics.

## New Features & Improvements

### 1. **Real-time State Management**
- **Enhanced Redux Store** with localStorage persistence
- **Automatic state hydration** on app load
- **Redux middleware** for real-time state synchronization
- **Cart, Orders, and Coupon** states are automatically persisted

### 2. **Authentication & Authorization**
- **AuthContext** for global authentication state
- **Token-based authentication** with localStorage
- **User session management** with automatic logout on 401

### 3. **API Integration**
- **Axios interceptors** for automatic token injection
- **Centralized API service** with all endpoints
- **Error handling** with automatic redirects
- **Request/Response transformation**

### 4. **Real-time Notifications**
- **Toast notifications** using react-toastify
- **Notification Center** component for app-wide notifications
- **Cart update notifications**
- **Order status notifications**

### 5. **Error Handling**
- **ErrorBoundary** component for React error catching
- **API error handling** with user-friendly messages
- **Graceful fallbacks** for failed operations
- **Console logging** for debugging

### 6. **Analytics & Logging**
- **AnalyticsService** for tracking user actions
- **Event logging** (cart, orders, payments)
- **Error tracking** and reporting
- **Performance monitoring**
- **Log export** functionality

### 7. **Utilities & Helpers**
- **Currency formatting** with INR support
- **Date formatting** and time-ago calculations
- **Form validation** (email, phone)
- **Debounce and throttle** functions
- **Order and transaction ID generation**

### 8. **Configuration**
- **App-wide constants** in config/constants.js
- **Order status definitions**
- **Payment method definitions**
- **Theme colors** configuration
- **Storage keys** management
- **Notification messages** templates

## File Structure

```
src/
├── components/
│   ├── ErrorBoundary.jsx          # Error boundary component
│   ├── Footer.jsx                 # Footer with social links
│   ├── NotificationCenter.jsx    # Real-time notification UI
│   ├── Navbar.jsx
│   └── ...
├── context/
│   └── AuthContext.jsx            # Authentication context
├── features/
│   ├── cartslice.js               # Enhanced cart with timestamps
│   ├── couponSlice.js
│   └── ordersSlice.js
├── hooks/
│   └── useRealTime.js             # Real-time update hooks
├── services/
│   ├── api.js                     # Centralized API service
│   └── analytics.js               # Analytics & logging
├── config/
│   └── constants.js               # App-wide constants
├── utils/
│   └── helpers.js                 # Utility functions
├── pages/
│   └── ...
├── App.jsx                        # Enhanced with ErrorBoundary
├── store.js                       # Enhanced with persistence
└── main.jsx                       # Updated with ToastContainer
```

## Usage Examples

### Real-time Cart Updates
```javascript
import { useNotification, useRealTimeCart } from "@/hooks/useRealTime";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cartslice";

const MyComponent = () => {
  const dispatch = useDispatch();
  const notify = useNotification();
  const { persistCart } = useRealTimeCart();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    notify("Added to cart!", "success");
  };

  return // JSX
};
```

### Using Analytics
```javascript
import { analytics } from "@/services/analytics";

// Track cart action
analytics.trackCartAction("ADD_ITEM", { itemId: 123, price: 299 });

// Track order action
analytics.trackOrderAction("CREATE_ORDER", { orderId: "ORD12345" });

// Track payment
analytics.trackPaymentAction("PROCESS_PAYMENT", { amount: 5000 });

// Get analytics stats
const stats = analytics.getStats();
console.log(stats);
```

### Using API Service
```javascript
import apiService from "@/services/api";

// Login
const user = await apiService.login({ email, password });

// Get orders
const orders = await apiService.getOrders();

// Create order
const newOrder = await apiService.createOrder(orderData);

// Validate coupon
const coupon = await apiService.validateCoupon("SAVE10");
```

### Using Authentication
```javascript
import { useAuth, AuthProvider } from "@/context/AuthContext";

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <>
      {isAuthenticated && <p>Welcome, {user.name}!</p>}
      <button onClick={logout}>Logout</button>
    </>
  );
};
```

## Configuration

### Environment Variables
Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=BiteBox
VITE_VERSION=1.0.0
```

### Store Keys
All localStorage keys are defined in `config/constants.js`:
- `bitebox_user` - User data
- `bitebox_token` - Authentication token
- `bitebox_cart` - Cart items
- `bitebox_orders` - Order history
- `bitebox_coupon` - Applied coupon
- `bitebox_logs` - Application logs

## Real-time Updates

### Cart Synchronization
- Cart is automatically persisted to localStorage
- Cart updates are persisted in real-time
- Cart can be synced across multiple tabs

### Order Updates
- Order status is tracked with timestamps
- Order updates trigger notifications
- Order history is maintained in Redux

### Notification System
- Notifications appear in real-time
- Notification center shows recent notifications
- Clear all notifications with one click

## Performance Optimizations

1. **Debounced API calls** - Prevent excessive API requests
2. **Throttled UI updates** - Smooth user interactions
3. **Lazy loading** - Components load on demand
4. **Memoization** - Prevent unnecessary re-renders
5. **LocalStorage caching** - Instant data retrieval

## Security Features

1. **Token-based auth** - Secure API requests
2. **Automatic logout** - On 401 responses
3. **Input validation** - Email and phone validation
4. **CORS support** - Cross-origin requests
5. **Error sanitization** - No sensitive data in logs

## Debugging

### View Analytics Logs
```javascript
import { analytics } from "@/services/analytics";

// Get all logs
console.log(analytics.getLogs());

// Filter by event
console.log(analytics.getLogs("CART"));

// Export logs
analytics.exportLogs();
```

### Monitor Store State
Redux DevTools integration:
1. Install Redux DevTools browser extension
2. Store state is automatically visible in DevTools
3. Time-travel debugging enabled

### Error Tracking
- All errors are logged to browser console
- Error Boundary catches React errors
- API errors are handled gracefully

## Migration Guide

### Update Imports
Old:
```javascript
import store from "./store";
```

New:
```javascript
import store from "./store"; // Now includes persistence
import { useAuth } from "@/context/AuthContext";
import { analytics } from "@/services/analytics";
```

### Update Components
All components automatically benefit from:
- Error boundary protection
- Toast notifications
- Real-time state updates
- Analytics tracking

## Next Steps

1. **Setup Backend** - Update API_URL in .env
2. **Implement Endpoints** - Create backend routes
3. **Add WebSocket** - Real-time order updates
4. **Enable Offline Mode** - Service worker setup
5. **Add Push Notifications** - Web push support

## Support

For issues or questions:
1. Check the console logs
2. Export logs via `analytics.exportLogs()`
3. Review Redux state in DevTools
4. Check localStorage in DevTools
