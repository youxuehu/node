import * as t from '../api/audit/types'
import { Api } from '../models'

async function auditApprove(request: Api.AuditAuditApproveRequest): Promise<t.AuditApproveResponse> {
	throw 'Unimplemented'
}

async function auditCancel(request: Api.AuditAuditCancelRequest): Promise<t.AuditCancelResponse> {
	throw 'Unimplemented'
}

async function auditCreate(request: Api.AuditAuditCreateRequest): Promise<t.AuditCreateResponse> {
	throw 'Unimplemented'
}

async function auditDetail(request: Api.AuditAuditDetailRequest): Promise<t.AuditDetailResponse> {
	throw 'Unimplemented'
}

async function auditReject(request: Api.AuditAuditRejectRequest): Promise<t.AuditRejectResponse> {
	throw 'Unimplemented'
}

async function auditSearch(request: Api.AuditAuditSearchRequest): Promise<t.AuditSearchResponse> {
	throw 'Unimplemented'
}


const api: t.AuditApi = {
	auditApprove,
	auditCancel,
	auditCreate,
	auditDetail,
	auditReject,
	auditSearch,
}

export default api
