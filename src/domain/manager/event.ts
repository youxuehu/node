import { Repository } from 'typeorm/repository/Repository'
import { CertificateDO, EventDO } from '../mapper/entity'
import { SingletonDataSource } from '../facade/datasource'

export class EventManager {
    private repository: Repository<EventDO>

    constructor() {
        this.repository = SingletonDataSource.get().getRepository(EventDO)
    }
}
