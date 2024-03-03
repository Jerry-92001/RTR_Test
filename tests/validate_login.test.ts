import test, { Browser, BrowserContext, Locator, Page, chromium, expect } from '@playwright/test'
import { title } from 'process';

const username: any = '9488712093'
const passwword: any = 'Sathish@3927'

test('validate login', async () => {

    const browser: Browser = await chromium.launch();
    const page: Page = await browser.newPage();

    // Validate Login

    await page.goto('https://www.amazon.in/');

    const Account_List: Locator = page.locator('#nav-link-accountList');

    await Account_List.click();

    await page.locator('#ap_email').fill(username);

    await page.locator('//input[@id="continue"]').click();

    await page.locator('#ap_password').fill(passwword);

    await page.locator('#signInSubmit').click();

    await expect(page.url()).toBe('https://www.amazon.in/?ref_=nav_ya_signin');

    //Search Functionality

    await page.locator('#twotabsearchtextbox').fill('mobile');

    await page.keyboard.press('Enter');

    await page.waitForSelector('span.a-color-state.a-text-bold');

    const firstResultText = await page.textContent('span.a-color-state.a-text-bold');

    await expect(firstResultText).toContain('mobile');

    // Add to cart functionality

    await page.locator('#a-autoid-1-announce').click();

    await page.locator('#nav-cart').click();

    await page.locator('//img[@src="https://m.media-amazon.com/images/I/81ZSn2rk9WL._AC_AA180_.jpg"]').isVisible();

    // Wish list functionality

    await Account_List.hover();

    await page.locator('//span[text()="Create a Wish List"]').click();

    await page.locator("#createList").click();

    const list_field: Locator = page.locator('#list-name');

    await list_field.clear();

    await list_field.fill('My List');

    await page.locator('//*[@id="wl-redesigned-create-list"]/span/span/input').click();

    await page.waitForSelector('#profile-list-name');

    const wishList_check = await page.textContent('#profile-list-name');

    await expect(wishList_check).toContain('My List');


})