import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { Catalog } from '../../src/client/pages/Catalog';
import { ApplicationState } from '../../src/client/store';
import { ProductShortInfo } from '../../src/common/types';

const mockStore = configureStore([]);

describe('Catalog Component', () => {
    let store: MockStoreEnhanced<Partial<ApplicationState>>;

    const setup = (state: Partial<ApplicationState>) => {
        store = mockStore(state);
        render(
            <Provider store={store}>
                <Router>
                    <Catalog />
                </Router>
            </Provider>
        );
    };

    it('should render loading state when products are not loaded', () => {
        setup({ products: undefined });

        expect(screen.getByText('LOADING')).toBeInTheDocument();
    });

    it('should render product items when products are loaded', () => {
        const products: ProductShortInfo[] = [
            { id: 1, name: 'Product 1', price: 100 },
            { id: 2, name: 'Product 2', price: 200 }
        ];

        setup({ products });

        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('$100')).toBeInTheDocument();
        expect(screen.getByText('Product 2')).toBeInTheDocument();
        expect(screen.getByText('$200')).toBeInTheDocument();
    });

    it('should dispatch productsLoad action on mount', () => {
        setup({ products: [] });

        const actions = store.getActions();
        expect(actions).toContainEqual({ type: 'PRODUCTS_LOAD' });
    });
});
