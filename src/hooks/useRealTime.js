import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

// Notification hook for real-time updates
export const useNotification = () => {
  const notify = useCallback((message, type = "info") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }, []);

  return notify;
};

// Hook for real-time cart updates with localStorage persistence
export const useRealTimeCart = () => {
  const dispatch = useDispatch();
  const notify = useNotification();

  // Persist cart to localStorage
  const persistCart = useCallback((cartState) => {
    try {
      localStorage.setItem("bitebox_cart", JSON.stringify(cartState));
    } catch (error) {
      console.error("Failed to persist cart:", error);
    }
  }, []);

  // Load cart from localStorage
  const loadCartFromStorage = useCallback(() => {
    try {
      const savedCart = localStorage.getItem("bitebox_cart");
      return savedCart ? JSON.parse(savedCart) : null;
    } catch (error) {
      console.error("Failed to load cart:", error);
      return null;
    }
  }, []);

  return { persistCart, loadCartFromStorage, notify };
};

// Hook for real-time order updates
export const useRealTimeOrders = () => {
  const notify = useNotification();

  const pollOrderUpdates = useCallback((orderId, onUpdate) => {
    const interval = setInterval(() => {
      // Simulate real-time polling
      // In production, this would connect to WebSocket or use Server-Sent Events
      onUpdate();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [notify]);

  const subscribeToOrderStatus = useCallback((orderId, callback) => {
    // Real-time order status updates
    const unsubscribe = pollOrderUpdates(orderId, callback);
    return unsubscribe;
  }, [pollOrderUpdates]);

  return { subscribeToOrderStatus, notify };
};

// Hook for sync across browser tabs
export const useLocalStorageSync = (key, initialValue) => {
  const [storedValue, setStoredValue] = useCallback((value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(
        new StorageEvent("storage", {
          key,
          newValue: JSON.stringify(value),
        })
      );
    } catch (error) {
      console.error(`Failed to set ${key}:`, error);
    }
  }, [key]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Failed to parse ${key}:`, error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, setStoredValue]);

  return [storedValue, setStoredValue];
};
