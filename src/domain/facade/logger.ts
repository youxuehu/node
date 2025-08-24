import { Logger } from 'winston'

export class SingletonLogger {
    private static instance: Logger

    static get(): Logger {
        return SingletonLogger.instance
    }

    static set(logger: Logger): void {
        SingletonLogger.instance = logger
    }
}
