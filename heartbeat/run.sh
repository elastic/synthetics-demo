#!/bin/bash
CLOUD_ID=$1
CLOUD_AUTH=$2
docker run \
  --rm \
  --name=heartbeat \
  --user=heartbeat \
  --volume="$PWD/monitors.d:/usr/share/heartbeat/monitors.d:ro" \
  docker.elastic.co/beats/heartbeat:7.13.1 heartbeat -e \
  -E cloud.id=$CLOUD_ID \
  -E cloud.auth=$CLOUD_AUTH
