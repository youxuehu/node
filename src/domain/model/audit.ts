import { ResponsePage } from "../../yeying/api/common/message"
import { AuditDO } from "../mapper/entity"


export interface PageResult {
    data: Audit[]
    page: ResponsePage
}

export interface Audit {
    uid: string
    appOrServiceMetadata: string
    applicant: string
    approver: string
    reason: string
    createdAt: string
    updatedAt: string
    signature: string
}

export function convertAuditDOFrom(meta: Audit): AuditDO {
    return {
        uid: meta.uid,
        appOrServiceMetadata: meta.appOrServiceMetadata,
        applicant: meta.applicant,
        approver: meta.approver,
        reason: meta.reason,
        createdAt: new Date(meta.createdAt),
        updatedAt: new Date(meta.updatedAt),
        signature: meta.signature
    }
}

export function convertAuditMetadataTo(auditDO: AuditDO) {
    return {
        uid: auditDO.uid,
        appOrServiceMetadata: auditDO.appOrServiceMetadata,
        applicant: auditDO.applicant,
        approver: auditDO.approver,
        reason: auditDO.reason,
        createdAt: auditDO.createdAt.toISOString(),
        updatedAt: auditDO.updatedAt.toISOString(),
        signature: auditDO.signature
    }
}

