import { Repository } from 'typeorm/repository/Repository'
import { AuditDO } from '../mapper/entity'
import { SingletonDataSource } from '../facade/datasource'
import { ResponsePage } from '../../yeying/api/common/message'
import { ApplicationManager } from './application'
import { ServiceManager } from './service'
import { Like } from 'typeorm'

export class AuditManager {
    private repository: Repository<AuditDO>
    private applicationManager: ApplicationManager
    private serviceManager: ServiceManager

    constructor() {
        this.repository = SingletonDataSource.get().getRepository(AuditDO)
        this.applicationManager = new ApplicationManager()
        this.serviceManager = new ServiceManager()
    }

    async save(auditDO: AuditDO) {
        return await this.repository.save(auditDO)
    }

    async queryById(uid: string) {
        return await this.repository.findOneBy({ uid: uid})
    }

    async queryByCondition(approver: string|null, applicant: string|null, name: string, startTime: string|null, endTime: string|null, page: number, pageSize: number) {
        let completeCondition: object[] = [];
        const condition = new SearchCondition()
        if (approver) {
            condition.approver = approver
        }
        if (applicant) {
            condition.applicant = applicant
        }

        if (startTime) {
            condition.startTime = new Date(startTime)
        }
        if (endTime) {
            condition.endTime = new Date(endTime)
        }
        completeCondition.push(condition)
        if (name) {
            completeCondition.push({appOrServiceMetadata: Like(`%${name}%`)})
        }
        console.log(`completeCondition=${JSON.stringify(completeCondition)}`)
        const [audits, total] =  await this.repository.findAndCount({
            where: completeCondition,
            skip: (page - 1) * pageSize,
            take: pageSize,
            order: { createdAt: 'DESC' }
        })
        
        return {
            data: audits,
            page: ResponsePage.create({
                total: total,
                page: page,
                pageSize: pageSize
            })
        }
    }

    async delete(uid: string) {
        return await this.repository.delete({ uid: uid})
    }
 
}

export class SearchCondition {
    approver?: string
    applicant?: string
    appOrServiceMetadata?: string
    type?: string
    startTime?: Date
    endTime?: Date
}