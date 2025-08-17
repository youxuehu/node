import * as t from '../api/config/types'
import { Api } from '../models'

async function configGet(request: Api.ConfigGetConfigRequest): Promise<t.ConfigGetResponse> {
	throw 'Unimplemented'
}

async function configSet(request: Api.ConfigSetConfigRequest): Promise<t.ConfigSetResponse> {
	throw 'Unimplemented'
}


const api: t.ConfigApi = {
	configGet,
	configSet,
}

export default api
