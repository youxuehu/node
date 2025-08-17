import * as t from '../api/llm/types'
import { Api } from '../models'

async function llmComplete(request: Api.LlmCompleteRequest): Promise<t.LlmCompleteResponse> {
	throw 'Unimplemented'
}

async function llmEdit(request: Api.LlmEditRequest): Promise<t.LlmEditResponse> {
	throw 'Unimplemented'
}

async function llmGenerate(request: Api.LlmGenerateRequest): Promise<t.LlmGenerateResponse> {
	throw 'Unimplemented'
}

async function llmSpeech(request: Api.LlmSpeechRequest): Promise<t.LlmSpeechResponse> {
	throw 'Unimplemented'
}

async function llmTranslate(request: Api.LlmTranslateRequest): Promise<t.LlmTranslateResponse> {
	throw 'Unimplemented'
}


const api: t.LlmApi = {
	llmComplete,
	llmEdit,
	llmGenerate,
	llmSpeech,
	llmTranslate,
}

export default api
