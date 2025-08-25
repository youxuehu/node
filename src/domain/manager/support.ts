import { Repository } from 'typeorm/repository/Repository'
import { SupportDO } from '../mapper/entity'
import { SingletonDataSource } from '../facade/datasource'

export class SupportManager {
    private repository: Repository<SupportDO>

    constructor() {
        this.repository = SingletonDataSource.get().getRepository(SupportDO)
    }

    async insert(supportDO: SupportDO) {
        return await this.repository.save(supportDO)
    }
}
