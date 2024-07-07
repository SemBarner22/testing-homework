import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { ProductItem } from '../../src/client/components/ProductItem';
import { ProductShortInfo } from '../../src/common/types';

const mockStore = configureStore([]);

describe('ProductItem Component', () => {
    let store: MockStoreEnhanced;

    const product: ProductShortInfo = {
        id: 1,
        name: 'Test Product',
        price: 100
    };

    const setup = () => {
        store = mockStore({
            cart: {
                [product.id]: { id: product.id, name: product.name, quantity: 1, price: product.price }
            }
        });

        render(
            <Provider store={store}>
                <Router>
                    <ProductItem product={product} />
                </Router>
            </Provider>
        );
    };

    it('should render product details correctly', () => {
        setup();

        expect(screen.getByText(product.name)).toBeInTheDocument();
        expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
        expect(screen.getByText(/Details/i)).toBeInTheDocument();
    });

    it('should have correct link to product details page', () => {
        setup();

        const link = screen.getByText(/Details/i).closest('a');
        expect(link).toHaveAttribute('href', `/catalog/${product.id}`);
    });

    it('should render CartBadge with correct product id', () => {
        setup();

        const cartBadge = screen.getByText('Item in cart');
        expect(cartBadge).toBeInTheDocument();
    });

    it('should render Image component', () => {
        setup();

        const img = screen.getByRole('img');
        expect(img).toBeInTheDocument();
    });
});
