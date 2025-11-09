import { Authenticate } from "../../common/authenticate";
import { AuditDO, CommentDO } from "../../domain/mapper/entity";
import { Audit, PageResult } from "../../domain/model/audit";
import { convertCommentStatusFrom } from "../../domain/model/comments";
import { AuditApproveResponse, AuditApproveResponseBody, AuditCancelResponse, AuditCancelResponseBody, AuditCreateResponse, AuditCreateResponseBody, AuditDetail, AuditDetailResponse, AuditDetailResponseBody, AuditMetadata, AuditRejectResponse, AuditRejectResponseBody, AuditSearchResponse, AuditSearchResponseBody, CommentMetadata} from "../../yeying/api/audit/audit";
import { ResponseStatus } from "../../yeying/api/common/message";


export function convertAuditMetadataTo(audit: Audit): AuditMetadata {
    return AuditMetadata.create({
        uid: audit.uid,
        appOrServiceMetadata: audit.appOrServiceMetadata,
        auditType: audit.auditType,
        applicant: audit.applicant,
        approver: audit.approver,
        reason: audit.reason,
        createdAt: audit.createdAt,
        updatedAt: audit.updatedAt,
        signature: audit.signature
    })
}

export function convertAuditMetadataFrom(audit: AuditMetadata): AuditDO {
    return {
        uid: audit.uid,
        appOrServiceMetadata: audit.appOrServiceMetadata,
        auditType: audit.auditType,
        applicant: audit.applicant,
        approver: audit.approver,
        reason: audit.reason,
        createdAt: new Date(audit.createdAt),
        updatedAt: new Date(audit.updatedAt),
        signature: audit.signature
    }
}

export function convertCommentMeta(c: CommentDO) {
    return {
        uid: c.uid,
        auditId: c.auditId,
        text: c.text,
        status: convertCommentStatusFrom(c.status),
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        signature: c.signature
    } as CommentMetadata
}


export async function createAuditSearchResponse(authenticate: Authenticate, status: ResponseStatus, result?: PageResult) {
    const body = AuditSearchResponseBody.create({
        status: status,
        detail: result?.data.map(item => {
            return AuditDetail.create({
                meta: convertAuditMetadataTo(item),
                commentMeta: item.commonsMetadatas?.map((s) => convertCommentMeta(s))
            })
        }),
        page: result?.page
    })

    return AuditSearchResponse.create({
        header: await authenticate.createHeader(AuditSearchResponseBody.encode(body).finish()),
        body: body
    })
}

export async function rejectResponse(authenticate: Authenticate, status: ResponseStatus, meta?: CommentMetadata): Promise<AuditRejectResponse> {
    const body = AuditRejectResponseBody.create({
        status: status,
        metadata: meta
    })

    return AuditRejectResponse.create({
        header: await authenticate.createHeader(AuditRejectResponseBody.encode(body).finish()),
        body: body
    })
}
export async function approveResponse(authenticate: Authenticate, status: ResponseStatus, meta?: CommentMetadata) {
    const body = AuditApproveResponseBody.create({
        status: status,
        metadata: meta
    })

    return AuditApproveResponse.create({
        header: await authenticate.createHeader(AuditApproveResponseBody.encode(body).finish()),
        body: body
    })
}

export async function cancelResponse(authenticate: Authenticate, status: ResponseStatus, meta?: AuditMetadata) {
    const body = AuditCancelResponseBody.create({
        status: status,
        meta: meta
    })

    return AuditCancelResponse.create({
        header: await authenticate.createHeader(AuditCancelResponseBody.encode(body).finish()),
        body: body
    })
}

export async function createAuditResponse(authenticate: Authenticate, status: ResponseStatus, meta?: AuditMetadata) {
    const body = AuditCreateResponseBody.create({
        status: status,
        meta: meta,
    })

    return AuditCreateResponse.create({
        header: await authenticate.createHeader(AuditCreateResponseBody.encode(body).finish()),
        body: body
    })
}


export async function auditDetailResponse(authenticate: Authenticate, status: ResponseStatus, detail?: AuditDetail) {
    const body = AuditDetailResponseBody.create({
        status: status,
        detail: detail,
    })

    return AuditDetailResponse.create({
        header: await authenticate.createHeader(AuditDetailResponseBody.encode(body).finish()),
        body: body
    })
}