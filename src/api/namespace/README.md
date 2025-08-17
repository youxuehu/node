# Namespace


## Operations

### namespaceCreate

```http
POST /api/v1/namespace/create
```


### namespaceDelete

```http
POST /api/v1/namespace/delete
```


### namespaceDetail

```http
POST /api/v1/namespace/detail
```


### namespaceSearch

```http
POST /api/v1/namespace/search
```


### namespaceUpdate

```http
POST /api/v1/namespace/update
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
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
```
