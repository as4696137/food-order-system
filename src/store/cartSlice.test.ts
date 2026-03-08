import { describe, it, expect } from 'vitest';
import cartReducer, {
    addItemToCart,
    removeItemFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    CartState,
} from './cartSlice';
import { foodItems } from '../data/mockData';

// Pick some real mock data items
const item1 = foodItems[0]; // Classic Cheeseburger ($149)
const item2 = foodItems[1]; // Bacon Double Burger ($189)

describe('cartSlice', () => {
    const initialState: CartState = {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
    };

    it('should return initial state when passed an empty action', () => {
        expect(cartReducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should add a new item to an empty cart', () => {
        const item = { id: item1.id, name: item1.name, price: item1.price };
        const state = cartReducer(initialState, addItemToCart(item));

        expect(state.items.length).toBe(1);
        expect(state.items[0]).toEqual({ ...item, quantity: 1 });
        expect(state.totalQuantity).toBe(1);
        expect(state.totalPrice).toBe(item1.price);
    });

    it('should add an existing item and update quantity', () => {
        const item = { id: item1.id, name: item1.name, price: item1.price };

        // Add first time
        let state = cartReducer(initialState, addItemToCart(item));
        // Add second time
        state = cartReducer(state, addItemToCart({ ...item, quantity: 2 }));

        expect(state.items.length).toBe(1);
        expect(state.items[0].quantity).toBe(3);
        expect(state.totalQuantity).toBe(3);
        expect(state.totalPrice).toBe(item1.price * 3);
    });

    it('should completely remove an item from the cart', () => {
        const startingState: CartState = {
            items: [
                { id: item1.id, name: item1.name, price: item1.price, quantity: 2 },
                { id: item2.id, name: item2.name, price: item2.price, quantity: 1 }
            ],
            totalQuantity: 3,
            totalPrice: (item1.price * 2) + item2.price,
        };

        const state = cartReducer(startingState, removeItemFromCart(item1.id));

        expect(state.items.length).toBe(1);
        expect(state.items[0].id).toBe(item2.id);
        expect(state.totalQuantity).toBe(1);
        expect(state.totalPrice).toBe(item2.price);
    });

    it('should increase the quantity of an existing item', () => {
        const startingState: CartState = {
            items: [{ id: item1.id, name: item1.name, price: item1.price, quantity: 1 }],
            totalQuantity: 1,
            totalPrice: item1.price,
        };

        const state = cartReducer(startingState, increaseQuantity(item1.id));

        expect(state.items[0].quantity).toBe(2);
        expect(state.totalQuantity).toBe(2);
        expect(state.totalPrice).toBe(item1.price * 2);
    });

    it('should decrease the quantity of an existing item', () => {
        const startingState: CartState = {
            items: [{ id: item1.id, name: item1.name, price: item1.price, quantity: 2 }],
            totalQuantity: 2,
            totalPrice: item1.price * 2,
        };

        const state = cartReducer(startingState, decreaseQuantity(item1.id));

        expect(state.items[0].quantity).toBe(1);
        expect(state.totalQuantity).toBe(1);
        expect(state.totalPrice).toBe(item1.price);
    });

    it('should remove the item when decreasing quantity from 1 to 0', () => {
        const startingState: CartState = {
            items: [{ id: item1.id, name: item1.name, price: item1.price, quantity: 1 }],
            totalQuantity: 1,
            totalPrice: item1.price,
        };

        const state = cartReducer(startingState, decreaseQuantity(item1.id));

        expect(state.items.length).toBe(0);
        expect(state.totalQuantity).toBe(0);
        expect(state.totalPrice).toBe(0);
    });

    it('should clear the entire cart', () => {
        const startingState: CartState = {
            items: [{ id: item1.id, name: item1.name, price: item1.price, quantity: 2 }],
            totalQuantity: 2,
            totalPrice: item1.price * 2,
        };

        const state = cartReducer(startingState, clearCart());

        expect(state).toEqual(initialState);
    });
});
