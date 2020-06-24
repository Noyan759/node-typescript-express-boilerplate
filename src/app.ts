import "reflect-metadata"
import { ExpressServer } from './express-server'
/**
 * Wrapper around the Node process, ExpressServer abstraction and complex dependencies such as services that ExpressServer needs.
 * When not using Dependency Injection, can be used as place for wiring together services which are dependencies of ExpressServer.
 */
export class Application {
    public static async createApplication(port: number) {
        const expressServer = new ExpressServer()
        await expressServer.setup(port)
        Application.handleExit(expressServer)

        return expressServer
    }

    private static handleExit(express: ExpressServer) {
        process.on('uncaughtException', (err: Error) => {
            console.error('Uncaught exception', err)
            Application.shutdownProperly(1, express)
        })
        process.on('unhandledRejection', (reason: {} | null | undefined) => {
            console.error('Unhandled Rejection at promise', reason)
            Application.shutdownProperly(2, express)
        })
        process.on('SIGINT', () => {
            console.info('Caught SIGINT')
            Application.shutdownProperly(128 + 2, express)
        })
        process.on('SIGTERM', () => {
            console.info('Caught SIGTERM')
            Application.shutdownProperly(128 + 2, express)
        })
        process.on('exit', () => {
            console.info('Exiting')
        })
    }

    private static async shutdownProperly(exitCode: number, express: ExpressServer) {
        try {
            await express.kill()
            console.info('Shutdown complete')
            process.exit(exitCode)
        } catch (err) {
            console.error('Error during shutdown', err)
            process.exit(1)
        }
    }
}