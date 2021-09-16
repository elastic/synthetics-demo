import { beforeAll, afterAll } from '@elastic/synthetics';
import { createServer, Server } from 'http';
import { Server as StaticServer } from 'node-static';

let srv: Server;

beforeAll(async ({env, params}) => {
    const loc = (__dirname + "/../app");
    const ss = new(StaticServer)(loc);

    const devWebserverPort = params.devWebserver?.port;
    if (!devWebserverPort) {
        return
    }
    return new Promise(isUp => {
        srv = createServer((req, res) => {
            req.addListener('end', () => {
                ss.serve(req, res)
            }).resume();
        }).listen(devWebserverPort, undefined, undefined, () => {isUp()});
        console.log(`Serving static app from ${loc} on localhost:${devWebserverPort}`)
    });
})

afterAll(async () => {
    if (srv) {
        await srv.close();
    }
})