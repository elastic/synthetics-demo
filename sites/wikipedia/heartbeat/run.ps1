$CLOUD_ID=$args[0]
$CLOUD_AUTH=$args[1]
docker run `
  --rm `
  --name=heartbeat `
  --user=heartbeat `
  --volume="$PWD/heartbeat.yml:/usr/share/heartbeat/heartbeat.yml:ro" `
  --volume="$PWD/monitors.d:/usr/share/heartbeat/monitors.d:ro" `
  docker.elastic.co/beats/heartbeat:7.13.1 heartbeat -e `
  -E cloud.id=$CLOUD_ID `
  -E cloud.auth=$CLOUD_AUTH
