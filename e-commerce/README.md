# Test E-commerce demo

This suite tests the workflow of a basic E-commerce application -
https://github.com/vigneshshanmugam/synthetics-ecommerce-demo

You can run the test suites in two ways

## Running tests

We can invoke the Synthetics runner from the CLI using the below steps

```sh
// Install the dependencies
npm install

// Run the synthetics tests
npm run test
// or
// npx @elastic/synthetics .

// Run specific workflows through tags
npm run test -- --tags "checkout" // You can also pass `browse`, `cart`
```


## Running via Heartbeat

See the `heartbeat` folder at the root of this repository for information on running with Heartbeat.
