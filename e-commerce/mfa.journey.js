const { journey, step, expect } = require('@elastic/synthetics');
const totp = require("totp-generator");
const { navigateToProductDetail } = require("./utils");
const jsQR = require("jsqr");
const PNGReader = require("png.js");

const pngToByteArray = (pngData) => {
  const rgbArr = new Uint8ClampedArray(pngData.width * pngData.height * 4);
  for (let y = 0; y < pngData.height; y++) {
    for (let x = 0; x < pngData.width; x++) {
      const pixelData = pngData.getPixel(x, y);

      rgbArr[(y * pngData.width + x) * 4 + 0] = pixelData[0];
      rgbArr[(y * pngData.width + x) * 4 + 1] = pixelData[1];
      rgbArr[(y * pngData.width + x) * 4 + 2] = pixelData[2];
      rgbArr[(y * pngData.width + x) * 4 + 3] = pixelData[3];
    }
  }

  return rgbArr;
}

const decodeQrCode = (buffer) => {
  return new Promise((resolve, reject) => {
    const reader = new PNGReader(buffer);
    reader.parse((err, png) => {
        if (err) reject(err)
        return resolve({
            rgbArr: pngToByteArray(png),
            width: png.getWidth(),
            height: png.getHeight(),
        });
    });
  });
}

export const generateTotp = (value, intervalSeconds = 90) => {
    return totp(value, {
        digits: 6,
        period: intervalSeconds,
        timestamp: Date.now()
    });
}

journey("mfa-checkout", ({ page, params }) => {
  let seed = null;

  step("setup MFA auth", async () => {
      await page.goto(params.url);
      await page.click("text=Set up MFA")
      await page.click("text=Enable MFA")
      const qrBuffer = await page.locator("#qr-code").screenshot()
      const qrImg = await decodeQrCode(qrBuffer);
      seed = jsQR(qrImg.rgbArr, qrImg.width, qrImg.height).data;
  });

  navigateToProductDetail(page, params);

  step('Add items to cart', async () => {
    await page.selectOption('select[name="quantity"]', '2');
    await Promise.all([
      page.waitForNavigation({
        url: /cart/,
        waitUntil: 'networkidle',
      }),
      page.click('text=Add to Cart'),
    ]);
  });

  step('check cart items and place the order', async () => {
    const headline = await page.$('.container h3');
    expect(await headline.textContent()).toContain(
      '1 items in your Shopping Cart'
    );
    await Promise.all([
      page.waitForNavigation({
        url: /mfa-auth/,
        waitUntil: 'networkidle',
      }),
      page.click('text=Place your order →'),
    ]);
  });

  step('Enter MFA', async () => {
    await page.locator("input[name=mfa]").fill(generateTotp(seed));
    await page.keyboard.press("Enter");
  });

  step('verify the order details', async () => {
    expect(page.url()).toContain('checkout');
    const containerNode = await page.$('.container .row');
    const content = await containerNode.textContent();
    expect(content).toContain('Your order is complete');
    expect(content).toContain('Order Confirmation');
  });
});
