import { Repository } from 'typeorm/repository/Repository'
import { SolutionDO } from '../mapper/entity'
import { SingletonDataSource } from '../facade/datasource'
import { ResponsePage } from '../../yeying/api/common/message'

export class BulletinManager {
    private repository: Repository<SolutionDO>

    constructor() {
        this.repository = SingletonDataSource.get().getRepository(SolutionDO)
    }

    async insert(solutionDo: SolutionDO) {
        await this.repository.save(solutionDo)
    }

    async delete(uid: string) {
        return await this.repository.delete({ uid })
    }

    async query(language: string, page: number, pageSize: number) {
        const [solutions, total] = await this.repository.findAndCount({
            where: { language: language },
            skip: (page - 1) * pageSize,
            take: pageSize,
            order: { createdAt: 'DESC' },
            relations: { cards: true }
        })

        return {
            data: solutions,
            page: ResponsePage.create({
                total: total,
                page: page,
                pageSize: pageSize
            })
        }
    }
}
