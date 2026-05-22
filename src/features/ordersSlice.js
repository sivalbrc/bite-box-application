import { createSlice } from "@reduxjs/toolkit";

let ordersSlice = createSlice({
    name: 'orders',
    initialState: [],
    reducers: {
        addOrder: (state, action) => {
            state.push(action.payload);
        },
        removeOrder: (state, action) => {
            return state.filter(order => order.orderId !== action.payload);
        }
    }
});
export const { addOrder, removeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
