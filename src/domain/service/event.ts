import { Logger } from 'winston'
import { SingletonLogger } from '../facade/logger'
import { EventManager } from '../manager/event'

export class EventService {
    private logger: Logger = SingletonLogger.get()
    private eventManager: EventManager

    constructor() {
        this.eventManager = new EventManager()
    }
}
