import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import historyReducer, { addOrder, clearHistory, HistoryState } from './historySlice';
import { foodItems } from '../data/mockData';

describe('historySlice', () => {
    const initialState: HistoryState = {
        orders: [],
    };

    beforeEach(() => {
        // Mock system time to handle Date.now() and new Date().toISOString()
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2023-01-01T10:00:00Z'));
    });

    afterEach(() => {
        // Restore timers after tests
        vi.useRealTimers();
    });

    it('should return the initial state when passed an empty action', () => {
        expect(historyReducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should add a new order with current timestamp and ISO date', () => {
        const mockItems = [
            { id: foodItems[0].id, name: foodItems[0].name, price: foodItems[0].price, quantity: 2 },
        ];
        const payload = { items: mockItems, totalPrice: foodItems[0].price * 2, totalQuantity: 2 };

        const expectedTimeStampsMillis = Date.now().toString(); // '1672567200000' based on mock
        const expectedISODate = new Date().toISOString(); // '2023-01-01T10:00:00.000Z' based on mock

        const state = historyReducer(initialState, addOrder(payload));

        expect(state.orders.length).toBe(1);
        expect(state.orders[0]).toEqual({
            id: expectedTimeStampsMillis,
            items: mockItems,
            totalPrice: foodItems[0].price * 2,
            totalQuantity: 2,
            date: expectedISODate,
        });
    });

    it('should add newer orders to the start of the list', () => {
        const payload1 = { items: [], totalPrice: 10, totalQuantity: 1 };

        let state = historyReducer(initialState, addOrder(payload1));
        const firstAddedId = state.orders[0].id;

        // Advance time and add second order
        vi.setSystemTime(new Date('2023-01-02T10:00:00Z'));
        const payload2 = { items: [], totalPrice: 20, totalQuantity: 2 };

        state = historyReducer(state, addOrder(payload2));

        expect(state.orders.length).toBe(2);
        // The second added item should be at index 0 (unshifted)
        expect(state.orders[0].totalPrice).toBe(20);
        expect(state.orders[1].id).toBe(firstAddedId);
    });

    it('should clear all history', () => {
        const startingState: HistoryState = {
            orders: [
                {
                    id: '123',
                    items: [],
                    totalPrice: 10,
                    totalQuantity: 1,
                    date: '2023-01-01T10:00:00.000Z'
                }
            ],
        };

        const state = historyReducer(startingState, clearHistory());

        expect(state.orders).toEqual([]);
    });
});
