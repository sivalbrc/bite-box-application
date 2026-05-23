// Utility functions for the app

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const calculateDiscount = (originalPrice, discountedPrice) => {
  return (
    (((originalPrice - discountedPrice) / originalPrice) * 100).toFixed(0) + "%"
  );
};

export const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone) => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phone);
};

export const truncateText = (text, length) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};

export const getOrderStatusColor = (status) => {
  const statusColors = {
    pending: "#f39c12",
    confirmed: "#3498db",
    preparing: "#9b59b6",
    ready: "#2ecc71",
    outForDelivery: "#e67e22",
    delivered: "#27ae60",
    cancelled: "#e74c3c",
  };
  return statusColors[status] || "#95a5a6";
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return Math.floor(seconds) + "s ago";
};

export const generateOrderId = () => {
  return "ORD" + Date.now().toString().slice(-8);
};

export const generateTransactionId = () => {
  return "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase();
};
