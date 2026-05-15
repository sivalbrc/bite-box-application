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
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    incrementQty: (state, action) => {
      const item = state.find(
        (i) => i.id === action.payload.id
      );
      if (item) {
        item.quantity += 1;
      }
    },

    decrementQty: (state, action) => {
      const item = state.find(
        (i) => i.id === action.payload.id
      );

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
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

    clearCart: () => []
  }
});

export const {
  addToCart,
  incrementQty,
  decrementQty,
  removeCart,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;