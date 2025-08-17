import * as t from '../api/provider/types'
import { Api } from '../models'

async function providerAdd(request: Api.LlmAddProviderRequest): Promise<t.ProviderAddResponse> {
	throw 'Unimplemented'
}

async function providerDelete(request: Api.LlmDeleteProviderRequest): Promise<t.ProviderDeleteResponse> {
	throw 'Unimplemented'
}

async function providerDescriptions(request: Api.LlmProviderDescriptionsRequest): Promise<t.ProviderDescriptionsResponse> {
	throw 'Unimplemented'
}

async function providerDetail(request: Api.LlmProviderDetailRequest): Promise<t.ProviderDetailResponse> {
	throw 'Unimplemented'
}

async function providerModels(request: Api.LlmProviderModelsRequest): Promise<t.ProviderModelsResponse> {
	throw 'Unimplemented'
}

async function providerSearch(request: Api.LlmSearchProviderRequest): Promise<t.ProviderSearchResponse> {
	throw 'Unimplemented'
}


const api: t.ProviderApi = {
	providerAdd,
	providerDelete,
	providerDescriptions,
	providerDetail,
	providerModels,
	providerSearch,
}

export default api
