import * as t from '../api/namespace/types'
import { Api } from '../models'

async function namespaceCreate(request: Api.AssetCreateNamespaceRequest): Promise<t.NamespaceCreateResponse> {
	throw 'Unimplemented'
}

async function namespaceDelete(request: Api.AssetDeleteNamespaceRequest): Promise<t.NamespaceDeleteResponse> {
	throw 'Unimplemented'
}

async function namespaceDetail(request: Api.AssetNamespaceDetailRequest): Promise<t.NamespaceDetailResponse> {
	throw 'Unimplemented'
}

async function namespaceSearch(request: Api.AssetSearchNamespaceRequest): Promise<t.NamespaceSearchResponse> {
	throw 'Unimplemented'
}

async function namespaceUpdate(request: Api.AssetUpdateNamespaceRequest): Promise<t.NamespaceUpdateResponse> {
	throw 'Unimplemented'
}


const api: t.NamespaceApi = {
	namespaceCreate,
	namespaceDelete,
	namespaceDetail,
	namespaceSearch,
	namespaceUpdate,
}

export default api
