import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartslice";
import couponReducer from "./features/couponSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    coupon: couponReducer,
  },
});

export default store;