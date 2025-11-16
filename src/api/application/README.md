# Application


## Operations

### applicationCreate

```http
POST /api/v1/application/create
```


### applicationDelete

```http
POST /api/v1/application/delete
```


### applicationDetail

```http
POST /api/v1/application/detail
```


### applicationQueryById

```http
POST /api/v1/application/querybyid
```


### applicationSearch

```http
POST /api/v1/application/search
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function applicationCreate(request: Api.ApplicationCreateApplicationRequest): Promise<t.ApplicationCreateResponse> {
	throw 'Unimplemented'
}

async function applicationDelete(request: Api.ApplicationDeleteApplicationRequest): Promise<t.ApplicationDeleteResponse> {
	throw 'Unimplemented'
}

async function applicationDetail(request: Api.ApplicationApplicationDetailRequest): Promise<t.ApplicationDetailResponse> {
	throw 'Unimplemented'
}

async function applicationQueryById(request: Api.ApplicationQueryByIdApplicationRequest): Promise<t.ApplicationQueryByIdResponse> {
	throw 'Unimplemented'
}

async function applicationSearch(request: Api.ApplicationSearchApplicationRequest): Promise<t.ApplicationSearchResponse> {
	throw 'Unimplemented'
}


const api: t.ApplicationApi = {
	applicationCreate,
	applicationDelete,
	applicationDetail,
	applicationQueryById,
	applicationSearch,
}

export default api
```
