step("load todos", async () => {
    await page.goto('https://elastic.github.io/synthetics-demo/');
});


step('assert title', async () => {
  const header = await page.$('h1');
  expect(await header.textContent()).toBe('todos');
});
