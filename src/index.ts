import { Application } from './app'

/**
 * Entrypoint for bootstrapping and starting the application.
 */

const PORT = 8000
Application.createApplication(PORT).then(() => {
    console.info(`The application was started!\nServing is up at port - ${PORT}\nKill it using Ctrl + C\n`)
})