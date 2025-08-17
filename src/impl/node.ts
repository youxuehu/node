import * as t from '../api/node/types'
import { Api } from '../models'

async function nodeHealthCheck(request: Api.NodeHealthCheckRequest): Promise<t.NodeHealthCheckResponse> {
	throw 'Unimplemented'
}

async function nodeWhoami(request: Api.NodeWhoamiRequest): Promise<t.NodeWhoamiResponse> {
	throw 'Unimplemented'
}


const api: t.NodeApi = {
	nodeHealthCheck,
	nodeWhoami,
}

export default api
