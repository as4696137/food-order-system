import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
    id: string; // The food item ID
    name: string;
    price: number;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
}

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart(state, action: PayloadAction<{ id: string; name: string; price: number; quantity?: number }>) {
            const newItem = action.payload;
            const quantityToAdd = newItem.quantity || 1;
            const existingItem = state.items.find((item) => item.id === newItem.id);

            state.totalQuantity += quantityToAdd;
            state.totalPrice += newItem.price * quantityToAdd;

            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    quantity: quantityToAdd,
                });
            } else {
                existingItem.quantity += quantityToAdd;
            }
        },
        removeItemFromCart(state, action: PayloadAction<string>) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);

            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.price * existingItem.quantity;
                state.items = state.items.filter((item) => item.id !== id);
            }
        },
        increaseQuantity(state, action: PayloadAction<string>) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            if (existingItem) {
                existingItem.quantity++;
                state.totalQuantity++;
                state.totalPrice += existingItem.price;
            }
        },
        decreaseQuantity(state, action: PayloadAction<string>) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            if (existingItem) {
                if (existingItem.quantity === 1) {
                    state.items = state.items.filter((item) => item.id !== id);
                } else {
                    existingItem.quantity--;
                }
                state.totalQuantity--;
                state.totalPrice -= existingItem.price;
            }
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
    },
});

export const { addItemToCart, removeItemFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
