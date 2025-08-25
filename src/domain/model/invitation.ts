import { InvitationDO } from '../mapper/entity'

export interface Invitation {
    scene: string
    inviter: string
    invitee: string
    code: string
    expiredAt: string
    createdAt: string
    signature: string
}

export function convertInvitationFrom(invitationDO: InvitationDO): Invitation {
    return {
        scene: invitationDO.scene,
        inviter: invitationDO.inviter,
        invitee: invitationDO.invitee,
        code: invitationDO.code,
        expiredAt: invitationDO.expiredAt,
        createdAt: invitationDO.createdAt,
        signature: invitationDO.signature
    }
}

export function convertInvitationTo(invitation: Invitation) {
    const invitationDO = new InvitationDO()
    invitationDO.scene = invitation.scene
    invitationDO.code = invitation.code
    invitationDO.invitee = invitation.invitee
    invitationDO.inviter = invitation.inviter
    invitationDO.createdAt = invitation.createdAt
    invitationDO.expiredAt = invitation.expiredAt
    invitationDO.signature = invitation.signature
    return invitationDO
}
