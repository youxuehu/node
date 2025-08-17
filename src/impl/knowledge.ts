import * as t from '../api/knowledge/types'
import { Api } from '../models'

async function knowledgeAdd(request: Api.RagAddKnowledgeRequest): Promise<t.KnowledgeAddResponse> {
	throw 'Unimplemented'
}

async function knowledgeAppend(request: Api.ContentAppendRequest): Promise<t.KnowledgeAppendResponse> {
	throw 'Unimplemented'
}

async function knowledgeCreate(request: Api.RagCreateKnowledgeRequest): Promise<t.KnowledgeCreateResponse> {
	throw 'Unimplemented'
}

async function knowledgeDelete(request: Api.RagDeleteKnowledgeRequest): Promise<t.KnowledgeDeleteResponse> {
	throw 'Unimplemented'
}

async function knowledgeSearch(request: Api.ApicontentSearchRequest): Promise<t.KnowledgeSearchResponse> {
	throw 'Unimplemented'
}


const api: t.KnowledgeApi = {
	knowledgeAdd,
	knowledgeAppend,
	knowledgeCreate,
	knowledgeDelete,
	knowledgeSearch,
}

export default api
