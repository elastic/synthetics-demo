import { journey, step, expect } from '@elastic/synthetics';
import { deepStrictEqual } from 'assert';

journey('check if title is present', ({ page, params }) => {
  step('launch app', async () => {
    await page.goto(params.url);
  });

  step('assert title', async () => {
    const header = await page.$('h1');
    deepStrictEqual(await header.textContent(), 'todos');
  });
});

journey('check if input placeholder is correct', ({ page, params }) => {
  step('launch app', async () => {
    await page.goto(params.url);
  });

  step('assert placeholder value', async () => {
    const input = await page.$('input.new-todo');
    deepStrictEqual(
      await input.getAttribute('placeholder'),
      'What needs to be doneeee?'
    );
  });
});

journey('check written by text', ({ page, params }) => {
  step('launch app', async () => {
    await page.goto(params.url);
  })

  step('assert written by', async () => {
    await page.waitForSelector('text=Written by Evan You', {timeout: 1000})
  });
});