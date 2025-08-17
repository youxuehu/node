import * as t from '../api/block/types'
import { Api } from '../models'

async function blockConfirm(request: Api.AssetConfirmBlockRequest): Promise<t.BlockConfirmResponse> {
	throw 'Unimplemented'
}

async function blockGet(request: Api.AssetGetBlockRequest): Promise<t.BlockGetResponse> {
	throw 'Unimplemented'
}

async function blockPut(request: Api.AssetPutBlockRequest): Promise<t.BlockPutResponse> {
	throw 'Unimplemented'
}

async function blockStreamGet(request: Api.AssetStreamGetBlockRequest): Promise<t.BlockStreamGetResponse> {
	throw 'Unimplemented'
}

async function blockStreamPut(request: Api.AssetStreamPutBlockRequest): Promise<t.BlockStreamPutResponse> {
	throw 'Unimplemented'
}


const api: t.BlockApi = {
	blockConfirm,
	blockGet,
	blockPut,
	blockStreamGet,
	blockStreamPut,
}

export default api
