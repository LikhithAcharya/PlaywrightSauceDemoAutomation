exports.ProductPage = class ProductPage
{
    constructor(page)
    {
        this.page = page;
        this.hamburgerMenu = page.locator("//button[@id='react-burger-menu-btn']");
        this.AboutLink = page.locator("//a[@id='about_sidebar_link']");
        this.LogoutLink = page.locator("//a[@id='logout_sidebar_link']");
        this.requestDemoButton = page.getByRole('button', { name:'Request a demo'});
        this.tryItFreeButton = page.getByRole('button', { name:'Try it free'}); 
        this.productNames = page.locator(".inventory_item_name");
        this.productDescription = page.locator('.inventory_item_desc');
        this.productPrice = page.locator('.inventory_item_price');
        this.addToCartButton = page.locator('.btn_inventory');
        this.filterDropdown = page.locator('.product_sort_container');
        this.filterAtoZOption = page.locator("//option[@value='az']");
        this.filterZtoAOption = page.locator("//option[@value='za']");
        this.filterLowToHighOption = page.locator("//option[@value='lohi']");
        this.filterHighToLowOption = page.locator("//option[@value='hilo']");
        this.shoppingCartLink = page.locator('.shopping_cart_badge');
    }

    async logout()
    {
        await this.hamburgerMenu.click();
        await this.LogoutLink.click();
    }

    async navigateToAboutPage()
    {
        await this.hamburgerMenu.click();
        await this.AboutLink.click();
    }

    async validateAllProductsDisplayed()
    {
        const productNames = await this.productNames.allTextContents();
        const productDescriptions = await this.productDescription.allTextContents();
        const productPrices = await this.productPrice.allTextContents();
        const addToCartButtonsCount = await this.addToCartButton.count();

        //Throw errow if no products are displayed
        if(productNames.length === 0)
        {
            throw new Error("No products displayed");
        }

        //Validate that all products have name, description, price and add to cart button
        if (productNames.length !== productDescriptions.length || productNames.length !== productPrices.length || productNames.length !== addToCartButtonsCount) {
            throw new Error("Mismatch in product details count");
        }
    }

    async addFirtstProductToCart()
    {
        await this.addToCartButton.first().click();
    }

    async addAllProductsToCart()
    {
        const addToCartButtonsCount = await this.addToCartButton.count();
        for(let i=0; i<addToCartButtonsCount; i++)
        {
            await this.addToCartButton.nth(i).click();
            await this.page.waitForTimeout(500); //Adding a small wait to ensure the click is registered before moving to the next button
        }
    }

    async addSpecificProductToCart(productName)
    {
        const productNames = await this.productNames.count();
        for(let i=0; i<productNames; i++)
        {
            const name = await this.productNames.nth(i).textContent();
            if(productName.includes(name.trim()))
            {
                await this.addToCartButton.nth(i).click();
                await this.page.waitForTimeout(3000); //Adding a small wait to ensure the click is registered before moving to the next button
            }
        }
    }

    async filterByAtoZ()
    {
        await this.filterDropdown.selectOption('az');
    }

    async filterByZtoA()
    {
        await this.filterDropdown.selectOption('za');
    }
    async filterByLowToHigh()
    {
        await this.filterDropdown.selectOption('lohi');
    }   
    async filterByHighToLow()
    {
        await this.filterDropdown.selectOption('hilo');
    }

    async getProductNames()
    {
        return await this.productNames.allTextContents();
    }

    async getProductPrices()
    {
        const prices = await this.productPrice.allTextContents();
        return prices.map(price => parseFloat(price.replace('$', '')));
    }

    async navigateToCart()
    {
        await this.shoppingCartLink.click();
    }

    async getFirstProcuctDetails()
    {
        const name = await this.productNames.first().textContent();
        const description = await this.productDescription.first().textContent();
        const price = await this.productPrice.first().textContent();
        return {
            name : name?.trim(), 
            description : description?.trim(), 
            price : price?.trim()
        };
    }

    async AllProductDetails()
    {
        const allName = await this.productNames.allTextContents();
        const allDescription = await this.productDescription.allTextContents();
        const allPrice = await this.productPrice.allTextContents();
        //array of object with name, description and price for all products
        const allProducts = allName.map((_, i) => {
            return {
                name : allName[i].trim(),
                description : allDescription[i].trim(),
                price : allPrice[i].trim()
            }
        });
        return allProducts;
    }

    async getSpecificProductDetails(productName)
    {
        const allName = await this.productNames.allTextContents();
        const allDescription = await this.productDescription.allTextContents();
        const allPrice = await this.productPrice.allTextContents();
        //array of object with name, description and price for all products
        const allProducts = allName.map((_, i) => {
            return {
                name : allName[i].trim(),
                description : allDescription[i].trim(),
                price : allPrice[i].trim()
            }
        });
        return allProducts.filter(product => productName.includes(product.name));
    }
}