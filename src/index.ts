import { Application } from './app'

/**
 * Entrypoint for bootstrapping and starting the application.
 * Might configure aspects like logging, telemetry, memory leak observation or even orchestration before.
 * This is about to come later!
 */

const PORT = 8000
Application.createApplication(PORT).then(() => {
    console.info(`The application was started!\nServing is up at port - ${PORT}\nKill it using Ctrl + C\n`)
})