import * as t from '../api/assignment/types'
import { Api } from '../models'

async function assignmentArtificialGenerate(request: Api.CorrectionAssignmentArtificialRequest): Promise<t.AssignmentArtificialGenerateResponse> {
	throw 'Unimplemented'
}

async function assignmentBigModelGenerate(request: Api.CorrectionAssignmentBigModelRequest): Promise<t.AssignmentBigModelGenerateResponse> {
	throw 'Unimplemented'
}

async function assignmentCorrection(request: Api.CorrectionAssignmentCorrectionRequest): Promise<t.AssignmentCorrectionResponse> {
	throw 'Unimplemented'
}

async function assignmentStudentAction(request: Api.CorrectionStudentActionRequest): Promise<t.AssignmentStudentActionResponse> {
	throw 'Unimplemented'
}

async function assignmentUpload(request: Api.CorrectionAssignmentUploadRequest): Promise<t.AssignmentUploadResponse> {
	throw 'Unimplemented'
}


const api: t.AssignmentApi = {
	assignmentArtificialGenerate,
	assignmentBigModelGenerate,
	assignmentCorrection,
	assignmentStudentAction,
	assignmentUpload,
}

export default api
