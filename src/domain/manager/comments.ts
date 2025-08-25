import { Repository } from 'typeorm/repository/Repository'
import { CommentDO } from '../mapper/entity'
import { SingletonDataSource } from '../facade/datasource'
import { ResponsePage } from '../../yeying/api/common/message'
import { CommentMetadata } from '../../yeying/api/audit/audit'

export class CommentManager {
    private repository: Repository<CommentDO>

    constructor() {
        this.repository = SingletonDataSource.get().getRepository(CommentDO)
    }

    async queryByAuditId(auditId: string) {
        return await this.repository.findBy({ auditId: auditId})
    }

    async save(comment: CommentDO) {
        return await this.repository.save(comment)
    }
}
