import * as t from '../api/application/types'
import { Api } from '../models'

async function applicationCreate(request: Api.ApplicationCreateApplicationRequest): Promise<t.ApplicationCreateResponse> {
	console.log(`applicationCreate request=${request}`)
	throw 'Unimplemented'
}

async function applicationDelete(request: Api.ApplicationDeleteApplicationRequest): Promise<t.ApplicationDeleteResponse> {
	throw 'Unimplemented'
}

async function applicationDetail(request: Api.ApplicationApplicationDetailRequest): Promise<t.ApplicationDetailResponse> {
	throw 'Unimplemented'
}

async function applicationSearch(request: Api.ApplicationSearchApplicationRequest): Promise<t.ApplicationSearchResponse> {
	throw 'Unimplemented'
}


const api: t.ApplicationApi = {
	applicationCreate,
	applicationDelete,
	applicationDetail,
	applicationSearch,
}

export default api
