import * as t from '../api/experience/types'
import { Api } from '../models'

async function experienceAdd(request: Api.RagAddExperienceRequest): Promise<t.ExperienceAddResponse> {
	throw 'Unimplemented'
}

async function experienceCreate(request: Api.RagCreateExperienceRequest): Promise<t.ExperienceCreateResponse> {
	throw 'Unimplemented'
}

async function experienceDelete(request: Api.RagDeleteExperienceRequest): Promise<t.ExperienceDeleteResponse> {
	throw 'Unimplemented'
}


const api: t.ExperienceApi = {
	experienceAdd,
	experienceCreate,
	experienceDelete,
}

export default api
