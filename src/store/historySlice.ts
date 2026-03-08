import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from './cartSlice';

export interface Order {
    id: string; // generated ID (e.g., timestamp)
    items: CartItem[];
    totalPrice: number;
    totalQuantity: number;
    date: string; // ISO date string
}

export interface HistoryState {
    orders: Order[];
}

const initialState: HistoryState = {
    orders: [],
};

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addOrder(state, action: PayloadAction<{ items: CartItem[]; totalPrice: number; totalQuantity: number }>) {
            const newOrder: Order = {
                id: Date.now().toString(),
                items: action.payload.items,
                totalPrice: action.payload.totalPrice,
                totalQuantity: action.payload.totalQuantity,
                date: new Date().toISOString(),
            };
            state.orders.unshift(newOrder); // Add to beginning of history
        },
        clearHistory(state) {
            state.orders = [];
        },
    },
});

export const { addOrder, clearHistory } = historySlice.actions;

export default historySlice.reducer;
