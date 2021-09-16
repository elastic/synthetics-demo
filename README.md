# Synthetics Examples

This repository contains examples of Elastic Synthetics configurations, and instructions for running them both locally, via CI, and via Heartbeat.

See the `todos` and `e-commerce` directories, and their respective `README` to find out more about each example.

We run the tests suites contained in each on all PRs and merges. See the `.github/workflows` directory to see sample CI configurations.

```sh
# Enter the `synthetics-tests` directory
cd todos/synthetics-tests 

# Install synthetics dependencies
npm install

# Invoke the runner and show test results
npx @elastic/synthetics .
```

## Running via `Heartbeat`

Invoke the synthetic test suites by entering the `heartbeat` folder, then running `./run.sh CLOUD_ID CLOUD_AUTH` using your actual Elastic cloud ID / Auth values
For deploying via Heartbeat see the `heartbeat` folder.
