import { CreateInvitationResponse, CreateInvitationResponseBody, InvitationMetadata, InvitationSceneEnum } from '../../yeying/api/invitation/invitation'
import { Invitation } from '../../domain/model/invitation'
import { ResponseStatus } from '../../yeying/api/common/message'
import { Authenticate } from '../../common/authenticate'

export function convertInvitationMetadataTo(invitation: InvitationMetadata): Invitation {
    return {
        code: invitation.code,
        inviter: invitation.inviter,
        invitee: invitation.invitee,
        signature: invitation.signature,
        createdAt: invitation.createdAt,
        expiredAt: invitation.expiredAt,
        scene: InvitationSceneEnum[invitation.scene]
    }
}

export async function createInvitationResponse(authenticate: Authenticate, status: ResponseStatus, invitation?: InvitationMetadata) {
    const body = CreateInvitationResponseBody.create({
        status: status,
        invitation: invitation
    })
    return CreateInvitationResponse.create({
        header: await authenticate.createHeader(CreateInvitationResponseBody.encode(body).finish()),
        body: body
    })
}