import * as t from '../api/warehouse/types'
import { Api } from '../models'

async function warehouseAdd(request: Api.CorrectionAddWarehouseRequest): Promise<t.WarehouseAddResponse> {
	throw 'Unimplemented'
}

async function warehouseDetail(request: Api.CorrectionDetailWarehouseRequest): Promise<t.WarehouseDetailResponse> {
	throw 'Unimplemented'
}

async function warehouseGetState(request: Api.StoreGetStateRequest): Promise<t.WarehouseGetStateResponse> {
	throw 'Unimplemented'
}

async function warehouseList(request: Api.CorrectionListWarehouseRequest): Promise<t.WarehouseListResponse> {
	throw 'Unimplemented'
}

async function warehouseTransfer(request: Api.StoreTransferRequest): Promise<t.WarehouseTransferResponse> {
	throw 'Unimplemented'
}


const api: t.WarehouseApi = {
	warehouseAdd,
	warehouseDetail,
	warehouseGetState,
	warehouseList,
	warehouseTransfer,
}

export default api
