# 🚀 Quick Start Guide - Using Real-Time Features

## Getting Started in 5 Minutes

### 1. **Setup Your Environment**
```bash
# Clone/navigate to project
cd Blog-react-project

# Install dependencies (if first time)
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

Visit `http://localhost:5173` 🎉

---

## 📚 Most Common Tasks

### A. Add Notifications to Your Component

```jsx
import { useNotification } from "@/hooks/useRealTime";

function MyComponent() {
  const notify = useNotification();

  const handleClick = () => {
    notify("Success! 🎉", "success");
    // Also available: "info", "warning", "error"
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

### B. Use Redux Cart State

```jsx
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeCart } from "@/features/cartslice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const quantity = cart.length;

  return (
    <div>
      <p>Cart has {quantity} items</p>
      <button onClick={() => dispatch(addToCart(product))}>
        Add to Cart
      </button>
    </div>
  );
}
```

### C. Track User Actions

```jsx
import { analytics } from "@/services/analytics";

// Track cart actions
analytics.trackCartAction("ADD_ITEM", {
  itemId: 123,
  price: 299,
  quantity: 2
});

// Track order actions
analytics.trackOrderAction("CREATE_ORDER", {
  orderId: "ORD12345",
  total: 5000
});

// Track payments
analytics.trackPaymentAction("PROCESS_PAYMENT", {
  amount: 5000,
  method: "card"
});
```

### D. Make API Calls

```jsx
import apiService from "@/services/api";
import { useNotification } from "@/hooks/useRealTime";

function LoginComponent() {
  const notify = useNotification();

  const handleLogin = async (email, password) => {
    try {
      const user = await apiService.login({ email, password });
      notify("Login successful!", "success");
      // User is logged in
    } catch (error) {
      notify("Login failed!", "error");
    }
  };

  return // JSX
}
```

### E. Get Current User

```jsx
import { useAuth } from "@/context/AuthContext";

function Profile() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <p>Please login</p>;
  }

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### F. Format Data

```jsx
import {
  formatCurrency,
  formatDate,
  getTimeAgo,
  calculateTotal
} from "@/utils/helpers";

const price = formatCurrency(1000);        // ₹1,000.00
const date = formatDate("2024-05-22");     // May 22, 2024, 10:30 AM
const time = getTimeAgo("2024-05-22");     // 2 days ago
const total = calculateTotal(cartItems);   // Sum of all items
```

### G. Get Configuration Values

```jsx
import {
  CATEGORIES,
  ORDER_STATUS,
  PAYMENT_METHODS,
  MESSAGES
} from "@/config/constants";

// Use categories in dropdown
Object.entries(CATEGORIES).map(([key, value]) => (
  <option key={key} value={key}>{value}</option>
));

// Get success message
const msg = MESSAGES.success.addedToCart; // "Added to cart!"
```

---

## 🔥 Real-Time Features Showcase

### Real-Time Cart Sync
```jsx
// Cart automatically syncs across browser tabs!
// Open your app in 2 browser windows:
// 1. Add item to cart in Window 1
// 2. Cart updates instantly in Window 2 ✨
```

### Live Notifications
```jsx
// Every action shows a notification
- Adding item → "Added to cart!"
- Removing item → "Removed from cart!"
- Placing order → "Order placed successfully!"
- Error → "Network error. Please try again."
```

### Order Status Updates
```jsx
import { useRealTimeOrders } from "@/hooks/useRealTime";

function OrderStatus({ orderId }) {
  const { subscribeToOrderStatus } = useRealTimeOrders();

  // Subscribe to real-time updates
  useEffect(() => {
    const unsubscribe = subscribeToOrderStatus(orderId, () => {
      // Order status updated!
    });
    return unsubscribe;
  }, [orderId]);
}
```

---

## 🔍 Debugging Your App

### Check Redux State
```javascript
// In browser console:
// Open DevTools → Redux tab
// You'll see:
// - Current state
// - Action history
// - Time-travel debugging
```

### View Application Logs
```javascript
import { analytics } from "@/services/analytics";

// Get all logs
console.log(analytics.getLogs());

// Export logs to file
analytics.exportLogs();

// Get stats
console.log(analytics.getStats());
```

### Check LocalStorage
```javascript
// In browser console:
localStorage.getItem('bitebox_cart')      // View cart
localStorage.getItem('bitebox_orders')    // View orders
localStorage.getItem('bitebox_user')      // View user
localStorage.getItem('bitebox_logs')      // View logs
```

---

## 🚨 Common Issues & Solutions

### Issue: Cart not saving
**Solution**: Check DevTools → Application → Storage → LocalStorage

### Issue: Notifications not showing
**Solution**: Make sure you're using `useNotification()` hook correctly

### Issue: API not working
**Solution**: 
1. Check `.env` file has correct `VITE_API_URL`
2. Verify API server is running
3. Check Network tab in DevTools

### Issue: Can't login
**Solution**: Check console for error message and verify credentials

---

## 💡 Pro Tips

1. **Dev Mode**: Open Redux DevTools to monitor all state changes
2. **Logs**: Export logs regularly for debugging
3. **Testing**: Test features in multiple browser windows
4. **Error Messages**: Always read toast notifications carefully
5. **Performance**: Use React DevTools Profiler to identify slow components

---

## 📝 File Reference

| Task | File | Hook/Service |
|------|------|--------------|
| Notifications | `NotificationCenter.jsx` | `useNotification()` |
| Cart | `cartslice.js` | Redux + localStorage |
| Auth | `AuthContext.jsx` | `useAuth()` |
| API | `services/api.js` | `apiService` |
| Analytics | `services/analytics.js` | `analytics` |
| Utils | `utils/helpers.js` | Various functions |
| Config | `config/constants.js` | CATEGORIES, etc. |

---

## 🎯 Common Component Templates

### Add to Cart Button
```jsx
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cartslice";
import { useNotification } from "@/hooks/useRealTime";

function AddToCartButton({ product }) {
  const dispatch = useDispatch();
  const notify = useNotification();

  const handleAdd = () => {
    dispatch(addToCart(product));
    notify("Added to cart!", "success");
  };

  return <button onClick={handleAdd}>Add to Cart</button>;
}
```

### Order Status Display
```jsx
import { ORDER_STATUS } from "@/config/constants";
import { getOrderStatusColor } from "@/utils/helpers";

function OrderStatusBadge({ status }) {
  return (
    <div style={{ color: getOrderStatusColor(status) }}>
      {ORDER_STATUS[status]}
    </div>
  );
}
```

### Price Display
```jsx
import { formatCurrency, calculateDiscount } from "@/utils/helpers";

function PriceDisplay({ original, discount }) {
  return (
    <div>
      <s>{formatCurrency(original)}</s>
      <p>{formatCurrency(discount)}</p>
      <small>{calculateDiscount(original, discount)} off</small>
    </div>
  );
}
```

### Login Form
```jsx
import apiService from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/hooks/useRealTime";

function LoginForm() {
  const { login } = useAuth();
  const notify = useNotification();

  const handleSubmit = async (email, password) => {
    try {
      const response = await apiService.login({ email, password });
      login(response.user, response.token);
      notify("Login successful!", "success");
    } catch (error) {
      notify("Login failed!", "error");
    }
  };

  return // JSX
}
```

---

## 🚀 Next: Advanced Features

Once comfortable with basics, explore:
1. **WebSocket integration** for real-time order updates
2. **Service Worker** for offline support
3. **IndexedDB** for large data caching
4. **Push Notifications** for mobile alerts
5. **Payment integration** with Stripe/Razorpay

---

## 📞 Help

- 📖 Read: `REAL_TIME_UPDATE.md` for detailed docs
- ✅ Check: `UPGRADE_CHECKLIST.md` for setup steps
- 📊 View: `UPGRADE_SUMMARY.md` for complete feature list
- 🔧 Debug: Use Redux DevTools + Browser Console

---

**Happy Coding! 🚀**

For more info, see the documentation files in your project root.
