exports.CartPage = class CartPage 
{

    constructor(page)
    {
        this.page = page;
        this.cartTitle = page.locator("//span[@class='title']");
        this.continueShoppingButton = page.locator("//button[@id='continue-shopping']");
        this.checkoutButton = page.locator("//button[@id='checkout']");
        this.productNameCart = page.locator('.inventory_item_name');
        this.productDescriptionCart = page.locator('.inventory_item_desc');
        this.productPriceCart = page.locator('.inventory_item_price');
        this.removeButtonCart = page.locator('.cart_button');
    }

    async clickOnContinueShopping()
    {
        await this.continueShoppingButton.click();
    }

    async clickOnCheckout()
    {
        await this.checkoutButton.click();
    }   

        async getCartPageElements()
        {
            return {
                cartTitle: this.cartTitle,
                continueShoppingButton: this.continueShoppingButton,
                checkoutButton: this.checkoutButton
            }
        }

        async getCartProducts()
        {
         const allName = await this.productNameCart.allTextContents();
        const allDescription = await this.productDescriptionCart.allTextContents();
        const allPrice = await this.productPriceCart.allTextContents();
        //array of object with name, description and price for all products
        const allCartProducts = allName.map((_, i) => {
            return {
                name : allName[i].trim(),
                description : allDescription[i].trim(),
                price : allPrice[i].trim()
            }
        });
             return allCartProducts;
            }

            async removeFirstProductFromCart()
            {
                await this.removeButtonCart.first().click();
            }
}


    