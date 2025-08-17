import * as t from '../api/group/types'
import { Api } from '../models'

async function groupAdd(request: Api.CorrectionAddGroupRequest): Promise<t.GroupAddResponse> {
	throw 'Unimplemented'
}

async function groupDelete(request: Api.CorrectionDeleteGroupRequest): Promise<t.GroupDeleteResponse> {
	throw 'Unimplemented'
}

async function groupDetail(request: Api.CorrectionDetailGroupRequest): Promise<t.GroupDetailResponse> {
	throw 'Unimplemented'
}

async function groupList(request: Api.CorrectionListGroupRequest): Promise<t.GroupListResponse> {
	throw 'Unimplemented'
}

async function groupUpdate(request: Api.CorrectionUpdateGroupRequest): Promise<t.GroupUpdateResponse> {
	throw 'Unimplemented'
}


const api: t.GroupApi = {
	groupAdd,
	groupDelete,
	groupDetail,
	groupList,
	groupUpdate,
}

export default api
