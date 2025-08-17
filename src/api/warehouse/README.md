# Warehouse


## Operations

### warehouseAdd

```http
POST /api/v1/warehouse/add
```


### warehouseDetail

```http
POST /api/v1/warehouse/detail
```


### warehouseGetState

```http
POST /api/v1/warehouse/getState
```


### warehouseList

```http
POST /api/v1/warehouse/list
```


### warehouseTransfer

```http
POST /api/v1/warehouse/transfer
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
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
```
