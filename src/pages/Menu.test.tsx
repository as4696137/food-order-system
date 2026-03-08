import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../utils/test-utils';
import Menu from './Menu';
import { foodItems } from '../data/mockData';

describe('Menu Component', () => {
    it('should render all categories and food items', () => {
        renderWithProviders(<Menu />);

        expect(screen.getByText('Our Menu')).toBeInTheDocument();

        // Pick top items from mock data to verify they rendered
        const sampleFoodName = foodItems[0].name;
        expect(screen.getByText(sampleFoodName)).toBeInTheDocument();
    });

    it('should open modal when a food item card is clicked', async () => {
        const user = userEvent.setup();
        renderWithProviders(<Menu />);

        // Find the "Add to Cart" button of the first item
        const buttons = screen.getAllByRole('button', { name: /add to cart/i });
        await user.click(buttons[0]);

        // The modal should open showing the item details and Quantity adjusters
        expect(screen.getByText('Quantity:')).toBeInTheDocument();
        // The modal Add button text
        const modalAddButton = screen.getByRole('button', { name: /add \d+ to cart/i });
        expect(modalAddButton).toBeInTheDocument();
    });

    it('should allow increasing and decreasing quantity in the modal', async () => {
        const user = userEvent.setup();
        renderWithProviders(<Menu />);

        // Open modal
        const buttons = screen.getAllByRole('button', { name: /add to cart/i });
        await user.click(buttons[0]);

        // Initial quantity is 1
        let quantityDisplay = screen.getByText('1');
        expect(quantityDisplay).toBeInTheDocument();

        const increaseBtn = screen.getByTestId('AddIcon').closest('button');
        const decreaseBtn = screen.getByTestId('RemoveIcon').closest('button');

        // Increase
        if (increaseBtn) await user.click(increaseBtn);
        quantityDisplay = screen.getByText('2');
        expect(quantityDisplay).toBeInTheDocument();

        // Decrease
        if (decreaseBtn) await user.click(decreaseBtn);
        quantityDisplay = screen.getByText('1');
        expect(quantityDisplay).toBeInTheDocument();

        // Should disable decrease below 1
        expect(decreaseBtn).toBeDisabled();
    });
});
