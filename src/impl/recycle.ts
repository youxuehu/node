import * as t from '../api/recycle/types'
import { Api } from '../models'

async function recycleRecover(request: Api.AssetRecoverDeletedAssetRequest): Promise<t.RecycleRecoverResponse> {
	throw 'Unimplemented'
}

async function recycleRemove(request: Api.AssetRemoveDeletedAssetRequest): Promise<t.RecycleRemoveResponse> {
	throw 'Unimplemented'
}

async function recycleSearch(request: Api.AssetSearchDeletedAssetRequest): Promise<t.RecycleSearchResponse> {
	throw 'Unimplemented'
}


const api: t.RecycleApi = {
	recycleRecover,
	recycleRemove,
	recycleSearch,
}

export default api
