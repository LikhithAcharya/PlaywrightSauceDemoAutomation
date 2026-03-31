import { test, expect } from '@playwright/test';
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig';
import { ProductPage } from '../pageObjects/ProductPage';
import { LoginPage } from '../pageObjects/LoginPage';
import { productsToCart } from '../test-data/products';
import { CartPage } from '../pageObjects/CartPage';

test.describe('Cart Page Validation', () => {

    let productPage;
    let loginPage;
    let cartPage;

    test.beforeEach(async ({page}) => {
        await page.goto(BASE_URL);
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    }) 

    test('Validate cart page URL and UI elements', async ({page}) => {
        await productPage.addFirtstProductToCart(); 
        await productPage.navigateToCart();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        const ui = await cartPage.getCartPageElements();
        await expect(ui.cartTitle).toBeVisible();
        await expect(ui.continueShoppingButton).toBeVisible();
        await expect(ui.checkoutButton).toBeVisible();
    });

    test('Validate continue shopping button functionality', async ({page}) => {
        await productPage.addFirtstProductToCart();
        await productPage.navigateToCart();
        await cartPage.clickOnContinueShopping();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('Validate first product added to the cart page', async ({page}) => {
        const firstProduct =   await productPage.getFirstProcuctDetails();
        await productPage.addFirtstProductToCart();
        await productPage.navigateToCart();

        const cartProducts = await cartPage.getCartProducts();
        expect(cartProducts[0]).toEqual(firstProduct);
        
    });

    test('Validate all products added to the cart page', async ({page}) => {    
        const allProductsDetails = await productPage.AllProductDetails();
        await productPage.addAllProductsToCart();
        await productPage.navigateToCart();
        const cartProducts = await cartPage.getCartProducts();
        expect(cartProducts).toEqual(allProductsDetails);
    });

    test ('Validate specific product added to the cart page', async ({page}) => {
        const addSpecificProductDetails = await productPage.getSpecificProductDetails(productsToCart);
        await productPage.addSpecificProductToCart(productsToCart);
        await productPage.navigateToCart();
        const cartProducts = await cartPage.getCartProducts();
        expect(cartProducts).toEqual(addSpecificProductDetails);
    });

    test.only("Validate Remove Product functionality", async({page})=>
{
    await productPage.addAllProductsToCart();
    await productPage.navigateToCart();  // Changed from clickOnCartLink

    const initialProducts = await cartPage.getCartProducts();
    expect(initialProducts.length).toBeGreaterThan(0);
    await cartPage.removeFirstProductFromCart();

    const updatedCartProducts = await cartPage.getCartProducts();
    expect(updatedCartProducts.length).toBe(initialProducts.length - 1);
})
});

