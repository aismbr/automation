// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.carvertical.com');
});

const VIN = "SALLAAA146A396339";
const email = "";
const pass = "";
const voucher = "qahomework";


test.describe('CarVertical VIN', () => {
  test('should allow me to submit VIN', async ({ page }) => {
    // Page loaded
    page.waitForLoadState('domcontentloaded');
    
    // Popup
    await page.getByText('English').click();
    await page.getByTestId('BisquitsBanner-acceptAllButton').click();

    // Fill VIN
    await page.locator("[name='identifier']").first().fill(VIN);
    page.keyboard.press('Enter');

    // Report type
    await page.getByText('Checking my car').click();
    page.getByText('Continue').click();

    // Report number
    await page.getByTestId('GridItem').nth(1).click();
    page.getByTestId('Link-innerLink').nth(3).click();

    // Popup
    await page.getByText('English').click();

    // Email form
    await page.getByTestId('Checkout-EmailInput').fill(email);
    await page.locator('.Checkbox_box__hvQz9').click();
    page.getByTestId('Checkout-ValidateEmailButton').click();

    // Password form
    await page.locator('#password').fill(pass);
    page.getByRole('button').nth(3).click();

    // Get full price
    await expect(page.getByText('Have a voucher code?')).toBeVisible();
    var fullpriceText = await page.getByTestId('Checkout-ReportAmount').textContent();
    var fullPrice = fullpriceText?.match(/\d+\.\d+/)?.map(Number);

    // Fill vouncher
    await page.getByRole('button').nth(2).click();
    await page.locator('#coupon').fill(voucher);
    page.keyboard.press('Enter');

    // Get vouncher discount
    const element = await page.locator(`[data-testid="Checkout-VoucherRemoveButton"]`);
    var percentText = await element.textContent();
    var percent = percentText?.match(/\d+/)?.map(Number);

    // Calculate price with discount
    var amount = (fullPrice - ((fullPrice * percent) / 100)).toFixed(2);

    // Get a price with discount
    var priceWithDiscountText = await page.getByTestId('Checkout-TotalAmount').textContent();
    var priceWithDiscount = priceWithDiscountText?.match(/\d+\.\d+/)?.map(Number);

    // Compare the calculated and received price
    if (amount = priceWithDiscount) {
      console.log('Total price is shown correctly');
    }
    else {
      console.log('total price is shown incorrectly');

    }
  });
});