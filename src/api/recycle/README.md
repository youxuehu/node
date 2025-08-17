# Recycle


## Operations

### recycleRecover

```http
POST /api/v1/recycle/recover
```


### recycleRemove

```http
POST /api/v1/recycle/remove
```


### recycleSearch

```http
POST /api/v1/recycle/search
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
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
```
