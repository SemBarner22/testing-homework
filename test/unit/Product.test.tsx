import '@testing-library/jest-dom';
import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import { Provider } from 'react-redux';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import { Product } from '../../src/client/pages/Product';
import {ApplicationState, initStore} from '../../src/client/store';
import {
    Product as ProductDetailsType,
} from '../../src/common/types';
import { productDetailsLoad } from '../../src/client/store';
import {CartApi, ExampleApi} from "../../src/client/api";
import {
    AxiosResponse,
} from "axios";

describe('Product Component', () => {
    // let store: MockStoreEnhanced<Partial<ApplicationState>>;
    const product: ProductDetailsType = {
        id: 1,
        name: 'Test Product',
        description: 'This is a test product.',
        price: 100,
        color: 'red',
        material: 'cotton'
    };

    class MockExampleApi extends ExampleApi {
        constructor() {
            super("");
            this.getProductById = (id: number): Promise<AxiosResponse<ProductDetailsType, any>> => {
                let answer: AxiosResponse<ProductDetailsType, any> = {
                    data: product,
                    status: 200,
                    statusText: 'OK',
                    headers: {'Server': "", 'Content-Type': "", 'Content-Length': "", 'Cache-Control': "", 'Content-Encoding' : ""},
                    config: {
                        headers: undefined
                    }
                };
                return Promise.resolve(answer);
            }
        }
    }
    const mockApi = new MockExampleApi();
    const setup = (state: Partial<ApplicationState>, initialEntries = ['/catalog/1']) => {
        const cart = new CartApi();
        const store = initStore(mockApi, cart);
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={initialEntries}>
                    <Routes>
                        <Route path="/catalog/:id" element={<Product />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
        store.dispatch(productDetailsLoad(1));
    };

    it('should render loading state when product is not loaded', () => {
        setup({ details: {} });

        expect(screen.getByText('LOADING')).toBeInTheDocument();
    });

    it('should render product details when product is loaded', async () => {
        setup({details: {1: product}});

        await waitFor(()  => {
            expect(screen.getByText('Test Product')).toBeInTheDocument();
            expect(screen.getByText('This is a test product.')).toBeInTheDocument();
            expect(screen.getByText('$100')).toBeInTheDocument();
        }, { timeout: 5000 } );
    });
});
