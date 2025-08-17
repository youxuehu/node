import * as t from '../api/service/types'
import { Api } from '../models'

async function serviceCreate(request: Api.ServiceCreateServiceRequest): Promise<t.ServiceCreateResponse> {
	throw 'Unimplemented'
}

async function serviceDelete(request: Api.ServiceDeleteServiceRequest): Promise<t.ServiceDeleteResponse> {
	throw 'Unimplemented'
}

async function serviceDetail(request: Api.ServiceDetailServiceRequest): Promise<t.ServiceDetailResponse> {
	throw 'Unimplemented'
}

async function serviceSearch(request: Api.ServiceSearchServiceRequest): Promise<t.ServiceSearchResponse> {
	throw 'Unimplemented'
}


const api: t.ServiceApi = {
	serviceCreate,
	serviceDelete,
	serviceDetail,
	serviceSearch,
}

export default api
