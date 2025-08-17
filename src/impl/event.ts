import * as t from '../api/event/types'
import { Api } from '../models'

async function eventConsume(request: Api.EventConsumeRequest): Promise<t.EventConsumeResponse> {
	throw 'Unimplemented'
}

async function eventProduce(request: Api.EventProduceRequest): Promise<t.EventProduceResponse> {
	throw 'Unimplemented'
}


const api: t.EventApi = {
	eventConsume,
	eventProduce,
}

export default api
