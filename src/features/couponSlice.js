import { createSlice } from "@reduxjs/toolkit";
import { coupons } from "../pages/coupons";

const couponSlice = createSlice({
    name: "coupon",

    initialState: {
        code: "",
        discount: 0,
        applied: false,
        message: "",
    },

    reducers: {
        applyCoupon: (state, action) => {
            const finalCouponCode = action.payload.toUpperCase();

            if (finalCouponCode in coupons) {
                state.code = finalCouponCode;
                state.discount = coupons[finalCouponCode];
                state.applied = true;
                state.message = `Coupon ${finalCouponCode} applied successfully!`;
            } else {
                state.code = "";
                state.discount = 0;
                state.applied = false;
                state.message = "Invalid coupon code. Please try again.";
            }
        },

        resetCoupon: (state) => {
            state.code = "";
            state.discount = 0;
            state.applied = false;
            state.message = "";
        },
    },
});

export const { applyCoupon, resetCoupon } = couponSlice.actions;

export default couponSlice.reducer;