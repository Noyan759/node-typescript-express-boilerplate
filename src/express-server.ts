import * as express from 'express'
import { useExpressServer, useContainer as routingUseContainer } from "routing-controllers";

import { Express } from 'express'
import { Server } from 'http'
import { Container } from "typedi";

/**
 * Abstraction around the raw Express.js server and Nodes' HTTP server.
 * Defines HTTP request mappings, basic as well as request-mapping-specific
 * middleware chains for application logic, config and everything else.
 */
export class ExpressServer {
    private server?: Express
    private httpServer?: Server

    public async setup(port: number) {
        this.server = express()

        this.setupStandardMiddlewares(this.server)
        this.configureDependencyInjection()
        this.initializeControllers(this.server)

        this.httpServer = this.listen(this.server, port)
        return this.server
    }

    public listen(server: Express, port: number) {
        return server.listen(port)
    }

    public kill() {
        if (this.httpServer) this.httpServer.close()
    }

    private setupStandardMiddlewares(server: Express) {
        server.use(express.json())
    }

    private initializeControllers(server: Express): void {
        useExpressServer(server, {
            controllers: [__dirname + "/controllers/*.ts"],
        });
    }

    private configureDependencyInjection(): void {
        routingUseContainer(Container);
    }
}