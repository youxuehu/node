import * as t from '../api/support/types'
import { Api } from '../models'

async function supportCollect(request: Api.SupportCollectSupportRequest): Promise<t.SupportCollectResponse> {
	throw 'Unimplemented'
}


const api: t.SupportApi = {
	supportCollect,
}

export default api
