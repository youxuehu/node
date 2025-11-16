import { Repository } from 'typeorm/repository/Repository'
import { ServiceDO } from '../mapper/entity'
import { SingletonDataSource } from '../facade/datasource'
import { SearchCondition } from '../model/service'
import { ResponsePage } from '../../yeying/api/common/message'
import { SingletonLogger } from '../facade/logger'
import { Logger } from 'winston'
import { Like } from "typeorm";

export class ServiceManager {
    private repository: Repository<ServiceDO>

    private logger: Logger = SingletonLogger.get()

    constructor() {
        this.repository = SingletonDataSource.get().getRepository(ServiceDO)
    }

    async save(service: ServiceDO) {
        return await this.repository.save(service)
    }

    async query(did: string, version: number): Promise<ServiceDO|null> {
        return await this.repository.findOneBy({ did: did, version: version })
    }

    async queryById(id: string): Promise<ServiceDO|null> {
        return await this.repository.findOneBy({ id: id})
    }

    async delete(did: string, version: number) {
        return await this.repository.delete({ did: did, version: version })
    }

    async queryByCondition(condition: SearchCondition, page: number, pageSize: number) {
        let completeCondition: object[] = [];
        if (condition.keyword) {
            const safeKeyword = condition.keyword.replace(/([%_])/g, "\\$1");
            completeCondition.push({name: Like(`%${safeKeyword}%`), isOnline: true})
            completeCondition.push({owner: Like(`%${safeKeyword}%`), isOnline: true})
        } else {
            const cond: SearchCondition = {}
            if (condition.name) {
                cond.name = condition.name
            }
            if (condition.owner) {
                cond.owner = condition.owner
            }
            if (condition.code) {
                cond.code = condition.code
            }
            if (cond.name || cond.owner || cond.code) {
                completeCondition.push(cond)
            }
            if (completeCondition.length == 0) {
                completeCondition = []
            }
        }
        if (completeCondition.length != 0) {
            const [services, total] = await this.repository.findAndCount({
                where: completeCondition,
                skip: (page - 1) * pageSize,
                take: pageSize,
                order: { createdAt: 'DESC' }
            })
            return {
                data: services,
                page: ResponsePage.create({
                    total: total,
                    page: page,
                    pageSize: pageSize
                })
            }
        } else {
            const [services, total] = await this.repository.findAndCount({
                where: {isOnline: true},
                skip: (page - 1) * pageSize,
                take: pageSize,
                order: { createdAt: 'DESC' }
            })
            console.log(`services=${JSON.stringify(services)}`)
            return {
                data: services,
                page: ResponsePage.create({
                    total: total,
                    page: page,
                    pageSize: pageSize
                })
            }
        }
    }
}
