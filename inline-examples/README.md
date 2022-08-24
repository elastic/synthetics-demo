## Inline Examples

You can use the `elastic-synthetics` agent to test inline monitors used in the create monitor form in Kibana.

The syntax is identical to that of a full `journey`, just omitting the wrapping `journey` statement, and with all `journey`
parameters like `step`, `browser`, etc. injected.

You can run inline `.ts/.js` files by piping them through stdin with the `--inline` flag, like so:

`cat inline-example.ts | npx @elastic/synthetics --inline`