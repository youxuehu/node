import * as t from '../api/link/types'
import { Api } from '../models'

async function linkCreate(request: Api.AssetCreateLinkRequest): Promise<t.LinkCreateResponse> {
	throw 'Unimplemented'
}

async function linkDetail(request: Api.AssetLinkDetailRequest): Promise<t.LinkDetailResponse> {
	throw 'Unimplemented'
}

async function linkDisable(request: Api.AssetDisableLinkRequest): Promise<t.LinkDisableResponse> {
	throw 'Unimplemented'
}

async function linkSearch(request: Api.AssetSearchLinkRequest): Promise<t.LinkSearchResponse> {
	throw 'Unimplemented'
}

async function linkUpdate(request: Api.AssetUpdateLinkRequest): Promise<t.LinkUpdateResponse> {
	throw 'Unimplemented'
}

async function linkVisitor(request: Api.AssetLinkVisitorRequest): Promise<t.LinkVisitorResponse> {
	throw 'Unimplemented'
}


const api: t.LinkApi = {
	linkCreate,
	linkDetail,
	linkDisable,
	linkSearch,
	linkUpdate,
	linkVisitor,
}

export default api
