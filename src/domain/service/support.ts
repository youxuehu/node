import { Logger } from 'winston'
import { SingletonLogger } from '../facade/logger'
import { SupportManager } from '../manager/support'
import { convertSupportTo, Support } from '../model/support'

export class SupportService {
    private logger: Logger = SingletonLogger.get()
    private supportManager: SupportManager

    constructor() {
        this.supportManager = new SupportManager()
    }

    async add(support: Support) {
        return await this.supportManager.insert(convertSupportTo(support))
    }
}
