# Example Heartbeat configs

It is generally now advised to run synthetics projects by pushing them to kibana first.
See our [documentation](https://www.elastic.co/guide/en/observability/master/synthetic-monitoring.html)
for more info.

This folder contains sample heartbeat configurations for the demos in this repository.

The interesting bits are mostly in the `monitors.d` folder, where we've broken out example
configs into a separate files. 

## Running via `Heartbeat`

These examples are meant to run against an [Elastic Cloud](https://cloud.elastic.co/) cluster.

Invoke the synthetic test suites by entering this `heartbeat` folder via `cd`, then running `./run.sh CLOUD_ID CLOUD_AUTH` using your actual Elastic cloud ID / Auth values.
The `CLOUD_AUTH` parameter is in the form of `$USERNAME:$PASSWORD`.
