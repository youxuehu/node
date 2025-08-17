import * as t from '../api/session/types'
import { Api } from '../models'

async function sessionCreate(request: Api.SessionCreateSessionRequest): Promise<t.SessionCreateResponse> {
	throw 'Unimplemented'
}

async function sessionDelete(request: Api.SessionDeleteSessionRequest): Promise<t.SessionDeleteResponse> {
	throw 'Unimplemented'
}

async function sessionDetail(request: Api.SessionSessionDetailRequest): Promise<t.SessionDetailResponse> {
	throw 'Unimplemented'
}

async function sessionSearch(request: Api.SessionSearchSessionRequest): Promise<t.SessionSearchResponse> {
	throw 'Unimplemented'
}

async function sessionUpdate(request: Api.SessionUpdateSessionRequest): Promise<t.SessionUpdateResponse> {
	throw 'Unimplemented'
}


const api: t.SessionApi = {
	sessionCreate,
	sessionDelete,
	sessionDetail,
	sessionSearch,
	sessionUpdate,
}

export default api
