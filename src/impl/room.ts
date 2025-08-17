import * as t from '../api/room/types'
import { Api } from '../models'

async function roomCreate(request: Api.InterviewerCreateRoomRequest): Promise<t.RoomCreateResponse> {
	throw 'Unimplemented'
}

async function roomDelete(request: Api.InterviewerDeleteRoomRequest): Promise<t.RoomDeleteResponse> {
	throw 'Unimplemented'
}

async function roomGet(request: Api.InterviewerGetRoomRequest): Promise<t.RoomGetResponse> {
	throw 'Unimplemented'
}

async function roomList(request: Api.InterviewerListRoomsRequest): Promise<t.RoomListResponse> {
	throw 'Unimplemented'
}

async function roomUpdate(request: Api.InterviewerUpdateRoomRequest): Promise<t.RoomUpdateResponse> {
	throw 'Unimplemented'
}


const api: t.RoomApi = {
	roomCreate,
	roomDelete,
	roomGet,
	roomList,
	roomUpdate,
}

export default api
