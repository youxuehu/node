import * as t from '../api/asset/types'
import { Api } from '../models'

async function assetDelete(request: Api.AssetDeleteAssetRequest): Promise<t.AssetDeleteResponse> {
	throw 'Unimplemented'
}

async function assetDetail(request: Api.AssetAssetDetailRequest): Promise<t.AssetDetailResponse> {
	throw 'Unimplemented'
}

async function assetSearch(request: Api.AssetSearchAssetRequest): Promise<t.AssetSearchResponse> {
	throw 'Unimplemented'
}

async function assetSign(request: Api.AssetSignAssetRequest): Promise<t.AssetSignResponse> {
	throw 'Unimplemented'
}

async function assetUpdate(request: Api.AssetUpdateAssetRequest): Promise<t.AssetUpdateResponse> {
	throw 'Unimplemented'
}


const api: t.AssetApi = {
	assetDelete,
	assetDetail,
	assetSearch,
	assetSign,
	assetUpdate,
}

export default api
