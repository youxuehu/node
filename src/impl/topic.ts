import * as t from '../api/topic/types'
import { Api } from '../models'

async function topicSearch(request: Api.ApitopicSearchRequest): Promise<t.TopicSearchResponse> {
	throw 'Unimplemented'
}

async function topicSubscribe(request: Api.TopicSubscribeRequest): Promise<t.TopicSubscribeResponse> {
	throw 'Unimplemented'
}

async function topicUnsubscribe(request: Api.TopicUnsubscribeRequest): Promise<t.TopicUnsubscribeResponse> {
	throw 'Unimplemented'
}


const api: t.TopicApi = {
	topicSearch,
	topicSubscribe,
	topicUnsubscribe,
}

export default api
