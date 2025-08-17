import * as t from '../api/homework/types'
import { Api } from '../models'

async function homeworkDetail(request: Api.CorrectionHomeworkDetailRequest): Promise<t.HomeworkDetailResponse> {
	throw 'Unimplemented'
}

async function homeworkList(request: Api.CorrectionHomeworkListRequest): Promise<t.HomeworkListResponse> {
	throw 'Unimplemented'
}


const api: t.HomeworkApi = {
	homeworkDetail,
	homeworkList,
}

export default api
