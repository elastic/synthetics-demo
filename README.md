# Example Elastic Synthetics Project

This suite tests the todo examples that ship with the open source Vue.js project, located in the 'app' directory.

## Running via `@elastic/synthetics`

We can invoke the Synthetics runner from the CLI using the below steps

```sh
# Enter the `synthetics-tests` directory
cd synthetics-tests 

# Install synthetics dependencies
npm install

# Invoke the runner and show test results
npx @elastic/synthetics .
```

## Running via `Heartbeat`

Invoke the synthetic test suites by entering the `heartbeat` folder, then running `./run.sh CLOUD_ID CLOUD_AUTH` using your actual Elastic cloud ID / Auth values
