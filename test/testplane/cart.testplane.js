describe('Cart Page', function() {

    // let addProductStep = async () => {
    //     await this.browser.url('http://localhost:3000/hw/store/catalog/0');
    //     await this.browser.$('button=ProductDetails-AddToCart btn btn-primary btn-lg').click();
    // };

    it('should display loading state and product details correctly', async ({browser}) => {
        await browser.url('http://localhost:3000/hw/store/cart');

        const cartDiv = await browser.$('.Cart');
        expect(await cartDiv.isDisplayed()).toBe(true);

        const shoppingCartTitle = await browser.$('h1=Shopping cart');
        expect(await shoppingCartTitle.isDisplayed()).toBe(true);
    });

    it('should dispatch clearCart action when "Clear shopping cart" button is clicked', async ({browser}) => {
        await browser.runStep('add one item to cart', async() => {
            await browser.url('http://localhost:3000/hw/store/catalog/0');
            await browser.$('.ProductDetails-AddToCart.btn.btn-primary.btn-lg').click();
        });
        await browser.url('http://localhost:3000/hw/store/cart');

        const clearButton = await browser.$('.btn-outline-secondary');
        await clearButton.click();

        await browser.$('href=/hw/store/catalog')
        // const actions = await browser.execute(() => window.store.getActions());
        // expect(actions).to.include({ type: 'CLEAR_CART' });
    });

    it('should display checkout form when cart is not empty', async ({browser}) => {
        await browser.runStep('add one item to cart', async() => {
            await browser.url('http://localhost:3000/hw/store/catalog/0');
            await browser.$('.ProductDetails-AddToCart.btn.btn-primary.btn-lg').click();
        });
        await browser.url('http://localhost:3000/hw/store/cart');

        const checkoutForm = await browser.$('h2=Сheckout');
        expect(await checkoutForm.isDisplayed()).toBe(true);
    });

    it('should dispatch checkout action when checkout form is submitted', async ({browser}) => {
        let bugId = process.env.BUG_ID
        await browser.url('http://localhost:3000/hw/store/cart?bug_id=${bugId}');

        const nameInput = await browser.$('input[id="f-name"]');
        await nameInput.setValue('John Doe');

        const phoneInput = await browser.$('input[id="f-phone"]');
        await phoneInput.setValue('+1234567890');

        const addressInput = await browser.$('textarea[id="f-address"]');
        await addressInput.setValue('123 Main St');

        const checkoutButton = await browser.$('button=Checkout');
        await checkoutButton.click();

        const alertSuccess = await browser.$('.alert-success');
        expect(await alertSuccess.isDisplayed()).toBe(true);
        // expect(actions).to.include({
        //    type: 'CHECKOUT',
        //    form: { name: 'John Doe', phone: '123-456-7890', address: '123 Main St' },
        //    cart: await this.browser.execute(() => window.store.getState().cart)
        // });
    });

    it('should show in checkout when item is added', async ({browser}) => {
        let bugId = process.env.BUG_ID
        await browser.runStep('add one item to cart', async() => {
            await browser.url('http://localhost:3000/hw/store/catalog/0?${bugId}');
            await browser.$('.ProductDetails-AddToCart.btn.btn-primary.btn-lg').click();
        });
        await browser.url('http://localhost:3000/hw/store/cart');
        const checkoutForm = await browser.$('h2=Сheckout');
        expect(await checkoutForm.isDisplayed()).toBe(true);
        // expect(actions).to.include({
        //    type: 'CHECKOUT',
        //    form: { name: 'John Doe', phone: '123-456-7890', address: '123 Main St' },
        //    cart: await this.browser.execute(() => window.store.getState().cart)
        // });
    });
});