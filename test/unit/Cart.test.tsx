import '@testing-library/jest-dom';
import React from 'react';
import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { Cart } from '../../src/client/pages/Cart';
import { ApplicationState } from '../../src/client/store';
import { CheckoutFormData } from '../../src/common/types';

const mockStore = configureStore([]);

describe('Cart Component', () => {
    let store: MockStoreEnhanced<Partial<ApplicationState>>;

    const setup = (state: Partial<ApplicationState>) => {
        store = mockStore(state);
        render(
            <Provider store={store}>
                <Router>
                    <Cart />
                </Router>
            </Provider>
        );
    };

    it('should dispatch clearCart action when "Clear shopping cart" button is clicked', () => {
        const cart = {
            1: { id: 1, name: 'Test Product 1', count: 2, price: 100 }
        };
        setup({ cart });

        fireEvent.click(screen.getByText('Clear shopping cart'));

        const actions = store.getActions();
        expect(actions).toEqual([{ type: 'CLEAR_CART' }]);
    });

    it('should render checkout form when cart is not empty', () => {
        const cart = {
            1: { id: 1, name: 'Test Product 1', count: 2, price: 100 }
        };
        setup({ cart });

        expect(screen.getByText('Сheckout')).toBeInTheDocument();
    });

    it('should render order completion message when cart is empty and latestOrderId is present', async () => {
        setup({ cart: {}, latestOrderId: 123 });

        await waitFor(()  => {
            expect(screen.getByText('Well done!')).toBeInTheDocument();
            expect(screen.getByText('123')).toBeInTheDocument();
        });
    });

    it('should dispatch checkout action when checkout form is submitted', () => {
        const cart = {
            1: { id: 1, name: 'Test Product 1', count: 2, price: 100 }
        };
        setup({ cart });

        const formData: CheckoutFormData = { name: 'John Doe', phone: '123-456-7890', address: '123 Main St' };

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: formData.name } });
        fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: formData.phone } });
        fireEvent.change(screen.getByLabelText(/Address/i), { target: { value: formData.address } });

        fireEvent.click(screen.getByText(/Checkout/i));

        const actions = store.getActions();
        expect(actions).toContainEqual({ type: 'CHECKOUT', form: formData, cart });
    });
});