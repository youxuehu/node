import { Repository } from 'typeorm/repository/Repository'
import { EventDO, InvitationDO } from '../mapper/entity'
import { SingletonDataSource } from '../facade/datasource'
import { convertInvitationTo, Invitation } from '../model/invitation'
import { getCurrentUtcString } from '../../common/date'
import { Logger } from 'winston'
import { SingletonLogger } from '../facade/logger'

export class InvitationManager {
    private repository: Repository<InvitationDO>
    private logger: Logger = SingletonLogger.get()

    constructor() {
        this.repository = SingletonDataSource.get().getRepository(InvitationDO)
    }

    async query(code: string) {
        return await this.repository.findOneBy({ code: code })
    }

    // 清理过期的邀请码
    async clear() {
        const result = await this.repository
            .createQueryBuilder()
            .delete()
            .from(EventDO)
            .where('invitee is null and expired < :current', { current: getCurrentUtcString() })
            .execute()
        this.logger.info(`Delete expired invitation=${result.affected}`)
    }

    async insert(invitation: InvitationDO) {
        return await this.repository.save(invitation)
    }

    async update(code: string, updatedData: Partial<InvitationDO>) {
        // 查找需要更新的用户
        const invitationToUpdate = await this.repository.findOne({ where: { code: code } })
        if (!invitationToUpdate) {
            return
        }

        // 更新用户数据
        this.repository.merge(invitationToUpdate, updatedData)
        // 保存更新后的用户
        return await this.repository.save(invitationToUpdate)
    }

    async delete(code: string) {
        return await this.repository.delete({ code: code })
    }
}
