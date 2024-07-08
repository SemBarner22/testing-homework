import '@testing-library/jest-dom';
import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import {BrowserRouter as Router, MemoryRouter, Route, Routes} from 'react-router-dom';
import { Catalog } from '../../src/client/pages/Catalog';
import { ApplicationState, initStore, productDetailsLoad } from '../../src/client/store';
import { Product as ProductDetailsType, ProductShortInfo } from '../../src/common/types';
import { CartApi, ExampleApi } from "../../src/client/api";
import { AxiosResponse } from "axios";
import { Product } from "../../src/client/pages/Product";

const mockStore = configureStore([]);

describe('Catalog Component', () => {
    const products: ProductShortInfo[] = [
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 200 }
    ];

    let store: MockStoreEnhanced<Partial<ApplicationState>>;

    class MockExampleApi extends ExampleApi {
        constructor(products: ProductShortInfo[]) {
            super("");
            this.getProducts = (): Promise<AxiosResponse<ProductShortInfo[], any>> => {
                let answer: AxiosResponse<ProductShortInfo[], any> = {
                    data: products,
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
    const mockApi = new MockExampleApi(products);
    const setup = (state: Partial<ApplicationState>, initialEntries = ['/catalog/']) => {
        const cart = new CartApi();
        const store = initStore(mockApi, cart);
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={initialEntries}>
                    <Routes>
                        <Route path="/catalog" element={<Catalog />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
        store.dispatch(productDetailsLoad(1));
    };

    it('should render loading state when products are not loaded', () => {
        setup({ products: undefined });

        expect(screen.getByText('LOADING')).toBeInTheDocument();
    });

    it('should render product items when products are loaded', async () => {

        setup({ products });

        await waitFor(()  => {
            expect(screen.getByText('Product 1')).toBeInTheDocument();
            expect(screen.getByText('$100')).toBeInTheDocument();
            expect(screen.getByText('Product 2')).toBeInTheDocument();
            expect(screen.getByText('$200')).toBeInTheDocument();
        }, { timeout: 5000 } );
    });
});
