import * as t from '../api/invitation/types'
import { Api } from '../models'

async function invitationCreate(request: Api.InvitationCreateInvitationRequest): Promise<t.InvitationCreateResponse> {
	throw 'Unimplemented'
}

async function invitationDetail(request: Api.InvitationInvitationDetailRequest): Promise<t.InvitationDetailResponse> {
	throw 'Unimplemented'
}

async function invitationSearch(request: Api.InvitationSearchInvitationRequest): Promise<t.InvitationSearchResponse> {
	throw 'Unimplemented'
}


const api: t.InvitationApi = {
	invitationCreate,
	invitationDetail,
	invitationSearch,
}

export default api
