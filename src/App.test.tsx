import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './utils/test-utils';
import App from './App';

describe('App Component Integration', () => {
  it('should render the header and default Menu page', async () => {
    renderWithProviders(<App />, { withRouter: false });

    // Header assertions
    expect(screen.getByText('🍔 Foodie')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /menu/i })).toBeInTheDocument();

    // Since Menu is the default route, we should see its content
    expect(screen.getByText('Our Menu')).toBeInTheDocument();
  });

  it('should navigate to History page when clicking the History link', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { withRouter: false });

    // Click on History link in header
    const historyLink = screen.getAllByRole('link', { name: /history/i })[0];
    await user.click(historyLink);

    // Assert we are on the History page
    expect(await screen.findByText('Order History')).toBeInTheDocument();
  });

  it('should navigate to Cart page when clicking the Cart link', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { withRouter: false });

    // Select the specific Cart link by finding the desktop text button (ignores mobile icon badge)
    // MUI adds many nested spans for badges but we can just find the button containing "Cart" explicitly.
    const cartButton = screen.getAllByRole('link').find(link => link.textContent?.includes('Cart'));

    if (cartButton) {
      await user.click(cartButton);
    }

    // Cart view renders "Your Cart" title 
    await waitFor(() => {
      expect(screen.getByText('Your Cart')).toBeInTheDocument();
    });
  });
});
