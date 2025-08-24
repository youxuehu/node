import { SupportDO } from '../mapper/entity'

export interface Support {
    did: string
    email: string
    type: string
    description: string
    createdAt: string
    signature: string
}

export function convertSupportTo(support: Support): SupportDO {
    const supportDO = new SupportDO()
    supportDO.did = support.did
    supportDO.email = support.email
    supportDO.type = support.type
    supportDO.description = support.description
    supportDO.createdAt = support.createdAt
    supportDO.signature = support.signature
    return supportDO
}

export function convertSupportFrom(supportDO: SupportDO): Support {
    return {
        did: supportDO.did,
        email: supportDO.email,
        type: supportDO.type,
        description: supportDO.description,
        createdAt: supportDO.createdAt,
        signature: supportDO.signature
    }
}
