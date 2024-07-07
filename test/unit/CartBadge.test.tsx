import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom'
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { CartBadge } from '../../src/client/components/CartBadge';
import { ApplicationState } from '../../src/client/store';

const mockStore = configureStore([]);

describe('CartBadge', () => {
    let store: MockStoreEnhanced<Partial<ApplicationState>>;

    beforeEach(() => {
        store = mockStore({
            cart: { 1: { id: 1, name: 'Test Product', count: 1, price: 100 } }
        });
    });

    it('should render "Item in cart" when item is in the cart', () => {
        const { getByText } = render(
            <Provider store={store}>
            <CartBadge id={1} />
        </Provider>
    );

        expect(getByText('Item in cart')).toBeInTheDocument();
    });

    it('should not render anything when item is not in the cart', () => {
        store = mockStore({
            cart: {}
        });

        const { queryByText } = render(
            <Provider store={store}>
            <CartBadge id={1} />
        </Provider>
    );

        expect(queryByText('Item in cart')).not.toBeInTheDocument();
    });
});
