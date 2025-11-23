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
import { ApplicationDO } from '../mapper/entity'

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
        const r: ApplicationDO | null | undefined = await this.applicationManager.query(did, version)
        return convertApplicationFrom(r)
    }

    async queryByUid(uid: string) {
        const r: ApplicationDO | null | undefined = await this.applicationManager.queryByUid(uid)
        return convertApplicationFrom(r)
    }

    async search(condition: SearchCondition, page: number, pageSize: number): Promise<PageResult> {
        const result = await this.applicationManager.queryByCondition(condition, page, pageSize)
        return {
            data: result.data.map((s: any) => convertApplicationFrom(s)),
            page: result.page
        }
    }

    async delete(did: string, version: number) {
        return await this.applicationManager.delete(did, version)
    }
}
