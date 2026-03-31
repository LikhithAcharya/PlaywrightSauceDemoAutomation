import { test, expect } from '@playwright/test';
import { LoginPage } from "../pageObjects/LoginPage";
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig';


test( 'First PW test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(BASE_URL);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});  
