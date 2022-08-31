import { journey, step, monitor, expect } from '@elastic/synthetics';

/*
This example demonstrates the use of the `request` object to perform lightweight API requests
to setup a later browser based check. This would be used to retrieve credentials, for instance,
that are later used by the browser.

See https://www.elastic.co/guide/en/observability/master/synthetics-create-test.html#synthetics-request-param
for more information!
*/

journey('Retrieve and use HTTP Headers via request object', ({ page, params, request }) => {
  // We will populate these variable from example HTTP API responses
  let apiKey;
  let decodedApiKey;
  // We will use httpbin.org endpoints for demonstration
  const apiBaseUrl = 'https://httpbin.org';
  // Let's say we expect the following header key:value from an Auth API
  const exampleAPIHeaderKey = 'x-api-key';
  const exampleAPIHeaderValue = 'some api key'; // base64 of 'Example-HTTP-Header-Value'
  // /response-headers endpoint returns passed query params in headers
  step('Retrieve headers from API', async() => {
    const resp = await request.get(`${apiBaseUrl}/response-headers?${exampleAPIHeaderKey}=${exampleAPIHeaderValue}`);
    apiKey = resp.headers()[exampleAPIHeaderKey];
    expect(apiKey).toEqual(exampleAPIHeaderValue);
  });
  // /base64 endpoint returns the decoded string
  step('Use API Key in HTTP request', async() => {
    const apiKey64 = Buffer.from(apiKey, 'utf-8').toString('base64');
    const resp = await request.get(`${apiBaseUrl}/base64/${apiKey64}`);
    decodedApiKey = await resp.text();
    expect(decodedApiKey).toEqual(apiKey);
  });
  // httpbin.org/headers prints all request headers
  step('Use API Key in page request', async() => {
    await page.setExtraHTTPHeaders({ [exampleAPIHeaderKey]: decodedApiKey });
    await page.goto('https://httpbin.org/headers');
    await page.waitForSelector(`text=${decodedApiKey}`);
  });
  step('Send headers to API', async () => {
    const resp = await request.get('https://httpbin.org/headers', { headers: { 'Foo': 'Bar' } });
    const respJson = await resp.json();
    expect(respJson.headers['Foo']).toEqual('Bar');
  });
});