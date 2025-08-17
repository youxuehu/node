import * as t from '../api/archive/types'
import { Api } from '../models'

async function archiveAdd(request: Api.CorrectionArchiveAddRequest): Promise<t.ArchiveAddResponse> {
	throw 'Unimplemented'
}

async function archiveDelete(request: Api.CorrectionArchiveDeleteRequest): Promise<t.ArchiveDeleteResponse> {
	throw 'Unimplemented'
}

async function archiveDetail(request: Api.CorrectionArchiveDetailRequest): Promise<t.ArchiveDetailResponse> {
	throw 'Unimplemented'
}

async function archiveDetailByStudentDid(request: Api.CorrectionArchiveDetailStudentRequest): Promise<t.ArchiveDetailByStudentDidResponse> {
	throw 'Unimplemented'
}

async function archiveList(request: Api.CorrectionArchiveListRequest): Promise<t.ArchiveListResponse> {
	throw 'Unimplemented'
}

async function archiveUpdate(request: Api.CorrectionArchiveUpdateRequest): Promise<t.ArchiveUpdateResponse> {
	throw 'Unimplemented'
}


const api: t.ArchiveApi = {
	archiveAdd,
	archiveDelete,
	archiveDetail,
	archiveDetailByStudentDid,
	archiveList,
	archiveUpdate,
}

export default api
