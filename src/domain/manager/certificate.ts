import { Repository } from 'typeorm/repository/Repository'
import { CertificateDO } from '../mapper/entity'
import { SingletonDataSource } from '../facade/datasource'

export class CertificateManager {
    private repository: Repository<CertificateDO>

    constructor() {
        this.repository = SingletonDataSource.get().getRepository(CertificateDO)
    }
}
