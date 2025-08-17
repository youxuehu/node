import * as t from '../api/vector/types'
import { Api } from '../models'

async function vectorQuery(request: Api.VectorVectorRequest): Promise<t.VectorQueryResponse> {
	throw 'Unimplemented'
}


const api: t.VectorApi = {
	vectorQuery,
}

export default api
