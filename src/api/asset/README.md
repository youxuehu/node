# Asset


## Operations

### assetDelete

```http
POST /api/v1/asset/delete
```


### assetDetail

```http
POST /api/v1/asset/detail
```


### assetSearch

```http
POST /api/v1/asset/search
```


### assetSign

```http
POST /api/v1/asset/sign
```


### assetUpdate

```http
POST /api/v1/asset/update
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
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
```
