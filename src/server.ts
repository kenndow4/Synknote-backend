import { createServer, Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import env from "./config/env";
import app from "./app";



export class AppServer {

    private HttpServer: HttpServer;
    public io: IOServer;

    constructor() {
        this.HttpServer = createServer(app);
        this.io = new IOServer(this.HttpServer, {
            cors:{origin: "*"}
        });
        
    }

    public start() {
        const p: number = env.port ? Number(env.port) : 4000;

        this.HttpServer.listen(p, ()=>{
            console.log(`Server running in port ${p}`);
        });
    }

};