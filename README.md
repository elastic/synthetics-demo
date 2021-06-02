# Example Elastic Synthetics Project

This suite tests the todo examples that ship with the open source Vue.js project, located in the 'app' directory.

## Running via `@elastic/synthetics`

We can invoke the Synthetics runner from the CLI using the below steps

```sh
# Install the global command
npm install -g @elastic/synthetics 

# Install the local dependencies
cd synthetics-tests && npm install; cd ..

# Invoke the runner and show test results
elastic-synthetics synthetics-tests
```

## Running via `Heartbeat`

Invoke the synthetic test suites using heartbeat with the following heartbeat.yml:

```yaml
heartbeat.monitors:
- name: Todos
  id: todos
  type: browser
  schedule: "@every 1m"
  source:
    zip_url: 
      url: "https://github.com/elastic/synthetics-demo/archive/refs/heads/main.zip"
      folder: "synthetics-tests"

// Sample ES output options, override these with whatever is appropriate for your environment
// or use the cloud.id / cloud.auth options instead
output.elasticsearch:
    hosts: localhost:9200
    username: elastic
    password: changeme
```
