import { Logger } from 'winston'
import { SingletonLogger } from '../facade/logger'
import { InvitationManager } from '../manager/invitation'
import { convertInvitationTo, Invitation } from '../model/invitation'

export class InvitationService {
    private logger: Logger = SingletonLogger.get()
    private invitationManager: InvitationManager

    constructor() {
        this.invitationManager = new InvitationManager()
    }

    async create(invitation: Invitation) {
        return await this.invitationManager.insert(convertInvitationTo(invitation))
    }
}
