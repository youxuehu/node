# Session


## Operations

### sessionCreate

```http
POST /api/v1/session/create
```


### sessionDelete

```http
POST /api/v1/session/delete
```


### sessionDetail

```http
POST /api/v1/session/detail
```


### sessionSearch

```http
POST /api/v1/session/search
```


### sessionUpdate

```http
POST /api/v1/session/update
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function sessionCreate(request: Api.SessionCreateSessionRequest): Promise<t.SessionCreateResponse> {
	throw 'Unimplemented'
}

async function sessionDelete(request: Api.SessionDeleteSessionRequest): Promise<t.SessionDeleteResponse> {
	throw 'Unimplemented'
}

async function sessionDetail(request: Api.SessionSessionDetailRequest): Promise<t.SessionDetailResponse> {
	throw 'Unimplemented'
}

async function sessionSearch(request: Api.SessionSearchSessionRequest): Promise<t.SessionSearchResponse> {
	throw 'Unimplemented'
}

async function sessionUpdate(request: Api.SessionUpdateSessionRequest): Promise<t.SessionUpdateResponse> {
	throw 'Unimplemented'
}


const api: t.SessionApi = {
	sessionCreate,
	sessionDelete,
	sessionDetail,
	sessionSearch,
	sessionUpdate,
}

export default api
```
