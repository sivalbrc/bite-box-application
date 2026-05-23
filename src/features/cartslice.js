import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {

    addToCart: (state, action) => {
      const item = state.find(
        (i) => i.id === action.payload.id
      );

      if (item) {
        item.quantity += 1;
        item.updatedAt = new Date().toISOString();
      } else {
        state.push({ 
          ...action.payload, 
          quantity: 1,
          addedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    },

    incrementQty: (state, action) => {
      const item = state.find(
        (i) => i.id === action.payload.id
      );
      if (item) {
        item.quantity += 1;
        item.updatedAt = new Date().toISOString();
      }
    },

    decrementQty: (state, action) => {
      const item = state.find(
        (i) => i.id === action.payload.id
      );

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
        item.updatedAt = new Date().toISOString();
      } else {
        return state.filter(
          (i) => i.id !== action.payload.id
        );
      }
    },

    removeCart: (state, action) => {
      return state.filter(
        (item) => item.id !== action.payload.id
      );
    },

    clearCart: () => [],

    syncCart: (state, action) => {
      return action.payload || [];
    },

    updateCartItem: (state, action) => {
      const { id, updates } = action.payload;
      const item = state.find((i) => i.id === id);
      if (item) {
        Object.assign(item, updates, {
          updatedAt: new Date().toISOString()
        });
      }
    },

    setCart: (state, action) => {
      return action.payload;
    }
  }
});

export const {
  addToCart,
  incrementQty,
  decrementQty,
  removeCart,
  clearCart,
  syncCart,
  updateCartItem,
  setCart
} = cartSlice.actions;

export default cartSlice.reducer;