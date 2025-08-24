import { Logger } from 'winston'
import { SingletonLogger } from '../facade/logger'
import { ApplicationManager } from '../manager/application'
import {
    Application,
    convertApplicationFrom,
    convertApplicationTo,
    PageResult,
    SearchCondition
} from '../model/application'

export class ApplicationService {
    private logger: Logger = SingletonLogger.get()
    private applicationManager: ApplicationManager

    constructor() {
        this.applicationManager = new ApplicationManager()
    }

    async save(application: Application) {
        await this.applicationManager.save(convertApplicationTo(application))
    }
    async query(did: string, version: number) {
        return await this.applicationManager.query(did, version)
    }

    async search(condition: SearchCondition, page: number, pageSize: number): Promise<PageResult> {
        const result = await this.applicationManager.queryByCondition(condition, page, pageSize)
        return {
            data: result.data.map((s) => convertApplicationFrom(s)),
            page: result.page
        }
    }

    async delete(did: string, version: number) {
        return await this.applicationManager.delete(did, version)
    }
}
