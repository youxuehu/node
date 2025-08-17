import * as t from '../api/task/types'
import { Api } from '../models'

async function taskAdd(request: Api.CorrectionAddTaskRequest): Promise<t.TaskAddResponse> {
	throw 'Unimplemented'
}

async function taskCreate(request: Api.TaskCreateTaskRequest): Promise<t.TaskCreateResponse> {
	throw 'Unimplemented'
}

async function taskDelete(request: Api.CorrectionDeleteTaskRequest): Promise<t.TaskDeleteResponse> {
	throw 'Unimplemented'
}

async function taskDetail(request: Api.CorrectionDetailTaskRequest): Promise<t.TaskDetailResponse> {
	throw 'Unimplemented'
}

async function taskList(request: Api.CorrectionListTaskRequest): Promise<t.TaskListResponse> {
	throw 'Unimplemented'
}

async function taskTagCount(request: Api.CorrectionTagCountTaskRequest): Promise<t.TaskTagCountResponse> {
	throw 'Unimplemented'
}

async function taskUpdate(request: Api.CorrectionUpdateTaskRequest): Promise<t.TaskUpdateResponse> {
	throw 'Unimplemented'
}


const api: t.TaskApi = {
	taskAdd,
	taskCreate,
	taskDelete,
	taskDetail,
	taskList,
	taskTagCount,
	taskUpdate,
}

export default api
