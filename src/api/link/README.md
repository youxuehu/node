# Link


## Operations

### linkCreate

```http
POST /api/v1/link/create
```


### linkDetail

```http
POST /api/v1/link/detail
```


### linkDisable

```http
POST /api/v1/link/disable
```


### linkSearch

```http
POST /api/v1/link/search
```


### linkUpdate

```http
POST /api/v1/link/update
```


### linkVisitor

```http
POST /api/v1/link/visitor
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
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
```
