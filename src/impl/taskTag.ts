import * as t from '../api/taskTag/types'
import { Api } from '../models'

async function taskTagAdd(request: Api.CorrectionAddTaskTagRequest): Promise<t.TaskTagAddResponse> {
	throw 'Unimplemented'
}

async function taskTagDelete(request: Api.CorrectionDeleteTaskTagRequest): Promise<t.TaskTagDeleteResponse> {
	throw 'Unimplemented'
}

async function taskTagDetail(request: Api.CorrectionDetailTaskTagRequest): Promise<t.TaskTagDetailResponse> {
	throw 'Unimplemented'
}

async function taskTagList(request: Api.CorrectionListTaskTagRequest): Promise<t.TaskTagListResponse> {
	throw 'Unimplemented'
}

async function taskTagUpdate(request: Api.CorrectionUpdateTaskTagRequest): Promise<t.TaskTagUpdateResponse> {
	throw 'Unimplemented'
}


const api: t.TaskTagApi = {
	taskTagAdd,
	taskTagDelete,
	taskTagDetail,
	taskTagList,
	taskTagUpdate,
}

export default api
