import * as t from '../api/mistakes/types'
import { Api } from '../models'

async function mistakesAdd(request: Api.CorrectionMistakesAddRequest): Promise<t.MistakesAddResponse> {
	throw 'Unimplemented'
}

async function mistakesAnalysis(request: Api.CorrectionMistakesAnalysisRequest): Promise<t.MistakesAnalysisResponse> {
	throw 'Unimplemented'
}

async function mistakesDetail(request: Api.CorrectionMistakesDetailRequest): Promise<t.MistakesDetailResponse> {
	throw 'Unimplemented'
}

async function mistakesList(request: Api.CorrectionMistakesListRequest): Promise<t.MistakesListResponse> {
	throw 'Unimplemented'
}

async function mistakesMakeCorrection(request: Api.CorrectionMakeCorrectionRequest): Promise<t.MistakesMakeCorrectionResponse> {
	throw 'Unimplemented'
}

async function mistakesPrint(request: Api.CorrectionMistakesPrintRequest): Promise<t.MistakesPrintResponse> {
	throw 'Unimplemented'
}

async function mistakesSubmit(request: Api.CorrectionMistakesSubmitRequest): Promise<t.MistakesSubmitResponse> {
	throw 'Unimplemented'
}


const api: t.MistakesApi = {
	mistakesAdd,
	mistakesAnalysis,
	mistakesDetail,
	mistakesList,
	mistakesMakeCorrection,
	mistakesPrint,
	mistakesSubmit,
}

export default api
