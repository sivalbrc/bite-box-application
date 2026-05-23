import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("bitebox_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("bitebox_token");
      window.location.href = "/login";
    }
    return Promise.reject(error.response?.data || error);
  }
);

export const apiService = {
  // Auth
  login: (credentials) =>
    apiClient.post("/auth/login", credentials),
  register: (userData) =>
    apiClient.post("/auth/register", userData),
  logout: () => {
    localStorage.removeItem("bitebox_token");
  },

  // Orders
  getOrders: () => apiClient.get("/orders"),
  getOrderById: (id) => apiClient.get(`/orders/${id}`),
  createOrder: (orderData) =>
    apiClient.post("/orders", orderData),
  updateOrderStatus: (id, status) =>
    apiClient.patch(`/orders/${id}`, { status }),

  // Menu Items
  getMenuItems: () => apiClient.get("/menu"),
  getItemsByCategory: (category) =>
    apiClient.get(`/menu?category=${category}`),

  // Cart
  syncCart: (cartData) =>
    apiClient.post("/cart/sync", cartData),

  // Coupons
  validateCoupon: (code) =>
    apiClient.post("/coupons/validate", { code }),

  // Payment
  processPayment: (paymentData) =>
    apiClient.post("/payment/process", paymentData),
};

export default apiService;
