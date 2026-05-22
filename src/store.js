import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cartslice";
import couponReducer from "./features/couponSlice";
import ordersReducer from "./features/ordersSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    coupon: couponReducer,
    orders: ordersReducer,
  },
});

export default store;