// App Configuration
export const APP_CONFIG = {
  name: "BiteBox",
  version: "1.0.0",
  description: "Fresh meals, fast delivery, and flavors you'll love every day.",
};

// API Configuration
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  timeout: 10000,
};

// Theme Colors
export const THEME = {
  primary: "#ff7300",
  dark: "#161b22",
  light: "#f0f0f5",
  success: "#2ecc71",
  error: "#e74c3c",
  warning: "#f39c12",
};

// Order Status
export const ORDER_STATUS = {
  pending: "Pending",
  confirmed: "Confirmed",
  preparing: "Preparing",
  ready: "Ready",
  outForDelivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

// Payment Methods
export const PAYMENT_METHODS = {
  card: "Credit/Debit Card",
  upi: "UPI",
  wallet: "Digital Wallet",
  cod: "Cash on Delivery",
};

// Categories
export const CATEGORIES = {
  veg: "Vegetarian",
  nonveg: "Non-Vegetarian",
  milk: "Milkshakes",
  sweets: "Sweets",
  cakes: "Cakes",
  chicken: "Chicken",
};

// Local Storage Keys
export const STORAGE_KEYS = {
  user: "bitebox_user",
  token: "bitebox_token",
  cart: "bitebox_cart",
  orders: "bitebox_orders",
  coupon: "bitebox_coupon",
  preferences: "bitebox_preferences",
};

// Notification Messages
export const MESSAGES = {
  success: {
    addedToCart: "Added to cart!",
    removedFromCart: "Removed from cart!",
    orderPlaced: "Order placed successfully!",
    couponApplied: "Coupon applied!",
  },
  error: {
    networkError: "Network error. Please try again.",
    invalidCoupon: "Invalid coupon code.",
    emptyCart: "Your cart is empty.",
    serverError: "Server error. Please try again later.",
  },
  info: {
    loadingOrders: "Loading your orders...",
    processingPayment: "Processing payment...",
  },
};
