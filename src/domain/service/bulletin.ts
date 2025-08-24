import { Logger } from 'winston'
import { SingletonLogger } from '../facade/logger'
import { BulletinManager } from '../manager/bulletin'
import { convertSolutionFrom, convertSolutionTo, PageResult, Solution } from '../model/bulletin'

export class BulletinService {
    private logger: Logger = SingletonLogger.get()
    private bulletinManager: BulletinManager

    constructor() {
        this.bulletinManager = new BulletinManager()
    }

    async search(language: string, page: number, pageSize: number): Promise<PageResult> {
        const result = await this.bulletinManager.query(language, page, pageSize)
        return {
            data: result.data.map((s) => convertSolutionFrom(s)),
            page: result.page
        }
    }

    async saveSolution(solution: Solution): Promise<void> {
        return await this.bulletinManager.insert(convertSolutionTo(solution))
    }

    async deleteSolution(uid: string) {
        return await this.bulletinManager.delete(uid)
    }
}
