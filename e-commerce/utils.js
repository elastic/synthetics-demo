const { step, expect } = require('@elastic/synthetics');

const URL = 'https://elastic-synthetics-demo-ecommerce.vercel.app/';

export const navigateToProductDetail = (page, params) => {
  step('visit landing page', async () => {
    await page.goto(params.url || URL, { waitUntil: 'networkidle' });
    // check to make sure all products are loaded
    const productImages = await page.$$('.card img');
    expect(productImages.length).toBe(9);
  });

  step('navigate to product detail page', async () => {
    const productImages = await page.$$('.card img');
    const randomCard = Math.floor(Math.random() * productImages.length);
    const product = productImages[randomCard];
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      product.click(),
    ]);
  });
};
