import { beforeAll, afterAll } from '@elastic/synthetics';
import { once } from 'events';
import { createServer, Server } from 'http';
import { join } from 'path';
import { Server as StaticServer } from 'node-static';

let srv: Server;

beforeAll(async ({params}) => {
  const devWebserverPort = params.devWebserver?.port;
  if (!devWebserverPort) {
    return
  }

  const file = new StaticServer(join(__dirname, '..', 'app'));
  srv = createServer(file.serve.bind(file)).listen(devWebserverPort);
  await once(srv, 'listening');
});

afterAll(async () => {
  srv && (await srv.close());
});
