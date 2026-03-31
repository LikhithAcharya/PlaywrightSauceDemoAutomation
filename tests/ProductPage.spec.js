import { test, expect } from '@playwright/test';
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig';
import { ProductPage } from '../pageObjects/ProductPage';
import { LoginPage } from '../pageObjects/LoginPage';
import { productsToCart } from '../test-data/products';

test.describe('Product page Tests', () => {

    let productPage;
    let loginPage;

    test.beforeEach(async ({page}) => {
        await page.goto(BASE_URL);
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })

    test('Validate logout functionality', async ({page}) => {
        await productPage.logout();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(loginPage.loginButton).toBeVisible();
     });

     test('Validate navigation to about page', async ({page}) => {
        await productPage.navigateToAboutPage();
        await expect(page).toHaveURL('https://saucelabs.com/');
        await expect(productPage.requestDemoButton).toBeVisible();
        await expect(productPage.tryItFreeButton).toBeVisible();
        await page.goBack();
        await expect(productPage.hamburgerMenu).toBeVisible();
    })

    test('Validate that all products are displayed with name, description, price and add to cart button', async ({page}) => {
        await productPage.validateAllProductsDisplayed();
        await productPage.addFirtstProductToCart();
        await productPage.addAllProductsToCart();
    });

    test('Validate adding a specific product to the cart', async ({page}) => {
        await productPage.addSpecificProductToCart(productsToCart);
    });

    test('Filter By A to z', async ({page}) => {
        await productPage.filterByAtoZ();  
        const names = await productPage.getProductNames();
        const sortedNames = [...names].sort();
        expect(names).toEqual(sortedNames);
    });

    test('Filter By Z to A', async ({page}) => {
        await productPage.filterByZtoA();   
        const names = await productPage.getProductNames();
        const sortedNames = [...names].sort().reverse();
        expect(names).toEqual(sortedNames);
    })

    test('Filter By Price Low to High', async ({page}) => {
        await productPage.filterByLowToHigh();  
        const prices = await productPage.getProductPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    })

    test('Filter By Price High to Low', async ({page}) => {
        await productPage.filterByHighToLow();  
        const prices = await productPage.getProductPrices();
        const sortedPrices = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sortedPrices);
    })  
});


