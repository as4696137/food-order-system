import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/test-utils';
import History from './History';
import { foodItems } from '../data/mockData';

// Pick some real mock data items
const item1 = foodItems[0]; // Classic Cheeseburger ($149)
const item2 = foodItems[1]; // Bacon Double Burger ($189)

describe('History Component', () => {
    const preloadedStateWithHistory = {
        cart: { items: [], totalPrice: 0, totalQuantity: 0 },
        history: {
            orders: [
                {
                    id: '123456789',
                    date: '2023-10-25T10:00:00.000Z',
                    items: [
                        { id: item1.id, name: item1.name, price: item1.price, quantity: 2 },
                        { id: item2.id, name: item2.name, price: item2.price, quantity: 1 }
                    ],
                    totalPrice: (item1.price * 2) + item2.price,
                    totalQuantity: 3
                }
            ]
        }
    };

    it('should render empty state when history is empty', () => {
        renderWithProviders(<History />);
        expect(screen.getByText('You have no past orders.')).toBeInTheDocument();
    });

    it('should render order details when history has data', () => {
        // @ts-ignore
        renderWithProviders(<History />, { preloadedState: preloadedStateWithHistory });

        expect(screen.getByText('Order #456789')).toBeInTheDocument();

        // Exact component text verification for list items using real mock data
        expect(screen.getByText(item1.name)).toBeInTheDocument();
        expect(screen.getAllByText('Quantity: 2')[0]).toBeInTheDocument();
        expect(screen.getByText('$' + (item1.price * 2).toFixed(2))).toBeInTheDocument();

        expect(screen.getByText(item2.name)).toBeInTheDocument();
        expect(screen.getAllByText('Quantity: 1')[0]).toBeInTheDocument();
        expect(screen.getByText('$' + item2.price.toFixed(2))).toBeInTheDocument();

        expect(screen.getByText('Total Items: 3')).toBeInTheDocument();
        expect(screen.getByText('Total: $' + ((item1.price * 2) + item2.price).toFixed(2))).toBeInTheDocument();
    });
});
