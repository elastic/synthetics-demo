#!/bin/bash -e
echo "This script will fail unless both curl and jq are available on your system"
CLOUD_ID=$1
CLOUD_AUTH=$2
LATEST_RELEASE_TAG=$(curl -s 'https://docker-api.elastic.co/v1/r/beats/heartbeat/?show_snapshots=false' | jq -r '.results[] | select(.name|test("^[0-9\\\\.]+-amd64$")).name
	' | head -n1)
DOCKER_IMAGE=docker.elastic.co/beats/heartbeat:$LATEST_RELEASE_TAG
echo "Using docker image $DOCKER_IMAGE"
docker run \
  --rm \
  --name=heartbeat \
  --user=heartbeat \
  --net=host \
  --volume="$PWD/heartbeat.yml:/usr/share/heartbeat/heartbeat.yml:ro" \
  --volume="$PWD/monitors.d:/usr/share/heartbeat/monitors.d:ro" \
  $DOCKER_IMAGE heartbeat -e \
  -E cloud.id=$CLOUD_ID \
  -E cloud.auth=$CLOUD_AUTH
