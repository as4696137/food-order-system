import React, { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { configureStore, PreloadedStateShapeFromReducersMapObject } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

// Import reducers
import cartReducer from '../store/cartSlice';
import historyReducer from '../store/historySlice';
import { RootState, AppStore } from '../store/store';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedStateShapeFromReducersMapObject<RootState>;
    store?: AppStore;
    withRouter?: boolean;
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState,
        // Automatically create a store instance if no store was passed in
        store = configureStore({
            reducer: {
                cart: cartReducer,
                history: historyReducer,
            },
            preloadedState,
        }),
        withRouter = true,
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return (
            <Provider store={store}>
                {withRouter ? <MemoryRouter>{children}</MemoryRouter> : children}
            </Provider>
        );
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
