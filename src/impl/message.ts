import * as t from '../api/message/types'
import { Api } from '../models'

async function messageCount(request: Api.CorrectionCountRequest): Promise<t.MessageCountResponse> {
	throw 'Unimplemented'
}

async function messageList(request: Api.CorrectionMessageListRequest): Promise<t.MessageListResponse> {
	throw 'Unimplemented'
}

async function messageListBy(request: Api.CorrectionListByRequest): Promise<t.MessageListByResponse> {
	throw 'Unimplemented'
}

async function messageMarkAsRead(request: Api.CorrectionMarkAsReadRequest): Promise<t.MessageMarkAsReadResponse> {
	throw 'Unimplemented'
}


const api: t.MessageApi = {
	messageCount,
	messageList,
	messageListBy,
	messageMarkAsRead,
}

export default api
