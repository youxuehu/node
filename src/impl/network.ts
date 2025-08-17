import * as t from '../api/network/types'
import { Api } from '../models'

async function networkExit(request: Api.NetworkExitRequest): Promise<t.NetworkExitResponse> {
	throw 'Unimplemented'
}

async function networkJoin(request: Api.NetworkJoinRequest): Promise<t.NetworkJoinResponse> {
	throw 'Unimplemented'
}

async function networkList(request: Api.NetworkListRequest): Promise<t.NetworkListResponse> {
	throw 'Unimplemented'
}


const api: t.NetworkApi = {
	networkExit,
	networkJoin,
	networkList,
}

export default api
