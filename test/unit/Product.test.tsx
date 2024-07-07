import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { Product } from '../../src/client/pages/Product';
import { ApplicationState } from '../../src/client/store';
import { Product as ProductDetailsType } from '../../src/common/types';

const mockStore = configureStore([]);

describe('Product Component', () => {
    let store: MockStoreEnhanced<Partial<ApplicationState>>;
    const product: ProductDetailsType = {
        id: 1,
        name: 'Test Product',
        description: 'This is a test product.',
        price: 100,
        color: 'red',
        material: 'cotton'
    };

    const setup = (state: Partial<ApplicationState>) => {
        store = mockStore(state);
        render(
            <Provider store={store}>
                <Router>
                    <Product />
                </Router>
            </Provider>
        );
    };

    it('should render loading state when product is not loaded', () => {
        setup({ details: {} });

        expect(screen.getByText('LOADING')).toBeInTheDocument();
    });

    it('should render product details when product is loaded', () => {
        setup({ details: { 1: product } });

        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('This is a test product.')).toBeInTheDocument();
        expect(screen.getByText('$100')).toBeInTheDocument();
    });

    it('should dispatch productDetailsLoad action on mount', () => {
        setup({ details: {} });

        const actions = store.getActions();
        expect(actions).toContainEqual({ type: 'PRODUCT_DETAILS_LOAD', id: 1 });
    });
});
