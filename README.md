# Synthetics Examples

This repository contains examples of Elastic Synthetics configurations, and instructions for running them both locally, via CI, and via Heartbeat. 

## Table of Contents

- The `todos` folder contains basic examples of `elastic-synthetics` usage. Start here. This folder is equivalent to running `npx @elastic/synthetics init <foldername>`, which generates a basic project with a few simple examples.
- The `advanced-examples` folder contains more advanced examples of more complex use cases.
- The `inline-examples` folder demonstrates the use of `elastic-synthetics` to test scripts in the `inline` format used in the Kibana UI.

We run the tests suites contained in each on all PRs and merges. See the `.github/workflows` directory to see sample CI configurations.

For deploying via Heartbeat see the `heartbeat` folder.