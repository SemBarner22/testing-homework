import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { ProductDetails } from '../../src/client/components/ProductDetails';
import { addToCart } from '../../src/client/store';
import { Product } from '../../src/common/types';

const mockStore = configureStore([]);

describe('ProductDetails Component', () => {
    let store: MockStoreEnhanced;
    const product: Product = {
        id: 1,
        name: 'Test Product',
        description: 'This is a test product.',
        price: 100,
        color: 'red',
        material: 'cotton'
    };

    const setup = (bugId?: string) => {
        if (bugId) {
            process.env.BUG_ID = bugId;
        } else {
            delete process.env.BUG_ID;
        }

        store = mockStore({
            cart: {
                [product.id]: { id: product.id, name: product.name, quantity: 1, price: product.price }
            }
        });

        render(
            <Provider store={store}>
                <ProductDetails product={product} />
            </Provider>
        );
    };

    it('should render product details correctly', () => {
        setup();

        expect(screen.getByText(product.name)).toBeInTheDocument();
        expect(screen.getByText(product.description)).toBeInTheDocument();
        expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
        expect(screen.getByText(product.color)).toBeInTheDocument();
        expect(screen.getByText(product.material)).toBeInTheDocument();
    });

    it('should dispatch addToCart action when "Add to Cart" button is clicked', () => {
        setup();

        fireEvent.click(screen.getByText(/Add to Cart/i));

        const actions = store.getActions();
        expect(actions).toEqual([addToCart(product)]);
    });

    it('should render button with btn-lg class when BUG_ID is not 9', () => {
        setup();

        const button = screen.getByText(/Add to Cart/i);
        expect(button).toHaveClass('btn-lg');
    });

    it('should render button with btn-sm class when BUG_ID is 9', () => {
        setup('9');

        const button = screen.getByText(/Add to Cart/i);
        expect(button).toHaveClass('btn-sm');
    });
});
