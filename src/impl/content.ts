import * as t from '../api/content/types'
import { Api } from '../models'

async function contentValidate(request: Api.ContentValidateRequest): Promise<t.ContentValidateResponse> {
	throw 'Unimplemented'
}


const api: t.ContentApi = {
	contentValidate,
}

export default api
