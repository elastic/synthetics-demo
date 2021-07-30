# Example Elastic Synthetics TODOS Project

This suite tests the todo examples that ship with the open source Vue.js project, located in the 'app' directory.

## Running via `@elastic/synthetics`

We can invoke the Synthetics runner from the CLI using the below steps. Note that this example uses a global
`elastic-synthetics` command installed via `npm -g`. For an example using only local dependencies see the
`e-commerce demo`.

```sh
# Install the global command
npm install -g @elastic/synthetics 

# Enter the tests directory
cd synthetics-tests && npm install; cd ..

# Invoke the runner and show test results
elastic-synthetics synthetics-tests
```

This project uses a `synthetics.config.ts` file to seed some initial variables. This file must be in the current folder or a parent of it when the `elastic-synthetics` command is invoked OR specified with the `--config` flag. This
file is normally placed at the root of the project.

## Running via Heartbeat

See the `heartbeat` folder at the root of this repository for information on running with Heartbeat.
