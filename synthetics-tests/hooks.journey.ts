import { beforeAll, afterAll } from '@elastic/synthetics';
import { createServer, Server } from 'http';
import { Server as StaticServer } from 'node-static';

let srv: Server;

beforeAll(async ({params}) => {
    const loc = (__dirname + "/../app");
    const ss = new(StaticServer)(loc);

    // We use this value for the default in synthetics.config.ts as well
    const port = 8080;
    return new Promise(isUp => {
        console.log(`Serving static app from ${loc}`)
        srv = createServer((req, res) => {
            req.addListener('end', () => {
                ss.serve(req, res)
            }).resume();
        }).listen(port, undefined, undefined, () => {isUp()});
    });
})

afterAll(async () => {
    if (srv) {
        await srv.close();
    }
})