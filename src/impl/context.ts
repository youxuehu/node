import * as t from '../api/context/types'
import { Api } from '../models'

async function contextAdd(request: Api.RagAddContextRequest): Promise<t.ContextAddResponse> {
	throw 'Unimplemented'
}

async function contextCreate(request: Api.RagCreateContextRequest): Promise<t.ContextCreateResponse> {
	throw 'Unimplemented'
}

async function contextDelete(request: Api.RagDeleteContextRequest): Promise<t.ContextDeleteResponse> {
	throw 'Unimplemented'
}

async function contextDeleteMessage(request: Api.RagDeleteContextMessageRequest): Promise<t.ContextDeleteMessageResponse> {
	throw 'Unimplemented'
}


const api: t.ContextApi = {
	contextAdd,
	contextCreate,
	contextDelete,
	contextDeleteMessage,
}

export default api
