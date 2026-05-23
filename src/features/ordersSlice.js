import { createSlice } from "@reduxjs/toolkit";

let ordersSlice = createSlice({
    name: 'orders',
    initialState: [],
    reducers: {
        addOrder: (state, action) => {
            // Set default status to 'Placed', progress to 10% and chat history to empty
            const newOrder = {
                status: 'Placed',
                deliveryProgress: 10,
                chatHistory: [],
                ...action.payload
            };
            state.push(newOrder);
        },
        removeOrder: (state, action) => {
            return state.filter(order => order.orderId !== action.payload);
        },
        updateOrderStatus: (state, action) => {
            const { orderId, status, deliveryProgress, chatHistory } = action.payload;
            const order = state.find(o => o.orderId === orderId);
            if (order) {
                if (status !== undefined) order.status = status;
                if (deliveryProgress !== undefined) order.deliveryProgress = deliveryProgress;
                if (chatHistory !== undefined) order.chatHistory = chatHistory;
            }
        }
    }
});
export const { addOrder, removeOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;

