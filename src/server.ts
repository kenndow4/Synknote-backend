import { createServer, Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import env from "./config/env";
import app from "./app";
import { connectDB } from "./db";



export class AppServer {

    private HttpServer: HttpServer;
    public io: IOServer;

    constructor() {
        this.HttpServer = createServer(app);
        this.io = new IOServer(this.HttpServer, {
            cors:{origin: "*"}
        });
        
    }

    public async  start() {
        const p: number = env.port ? Number(env.port) : 4000;

        await connectDB();

        this.HttpServer.listen(p, ()=>{
            console.log(`Server running in port ${p}`);
        });
    }

};