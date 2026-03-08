import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../utils/test-utils';
import Cart from './Cart';
import { foodItems } from '../data/mockData';

// Pick some real mock data items
const item1 = foodItems[0]; // Classic Cheeseburger ($149)
const item2 = foodItems[1]; // Bacon Double Burger ($189)

describe('Cart Component', () => {
    const preloadedStateWithItems = {
        cart: {
            items: [
                { id: item1.id, name: item1.name, price: item1.price, quantity: 2 },
                { id: item2.id, name: item2.name, price: item2.price, quantity: 1 }
            ],
            totalPrice: (item1.price * 2) + item2.price,
            totalQuantity: 3
        },
        history: { orders: [] }
    };

    it('should render empty state when cart is empty', () => {
        // Redux state will default to empty since we don't pass preloadedState
        renderWithProviders(<Cart />);
        expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /browse menu/i })).toBeInTheDocument();
    });

    it('should render items when cart has data', () => {
        // @ts-ignore: Assuming preloaded state shape is acceptable for testing
        renderWithProviders(<Cart />, { preloadedState: preloadedStateWithItems });

        expect(screen.getByText(item1.name)).toBeInTheDocument();
        expect(screen.getByText(item2.name)).toBeInTheDocument();
        expect(screen.getByText('Total Value:')).toBeInTheDocument();
        expect(screen.getByText('$' + ((item1.price * 2) + item2.price).toFixed(2))).toBeInTheDocument();
    });

    it('should trigger checkout and show navigation logic', async () => {
        const user = userEvent.setup();
        // @ts-ignore
        renderWithProviders(<Cart />, { preloadedState: preloadedStateWithItems });

        const checkoutBtn = screen.getByRole('button', { name: /checkout/i });
        await user.click(checkoutBtn);

        // Since checkout just dispatches clearCart() and navigates, the component
        // should render the empty cart text after clearing the cart state:
        expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    });
});
