import { journey, step } from '@elastic/synthetics';
import { deepStrictEqual } from 'assert';
import { join } from 'path';

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
      'What needs to be done?'
    );
  });
});

journey('check if footer exists', ({ page, params }) => {
  step('launch app', async () => {
    await page.goto(params.url);
  });

  step('assert footer', async () => {
    await page.textContent('p:has-text("Double-click to edit a todooo")')
  });
});
