# Service


## Operations

### serviceCreate

```http
POST /api/v1/service/create
```


### serviceDelete

```http
POST /api/v1/service/delete
```


### serviceDetail

```http
POST /api/v1/service/detail
```


### serviceQueryById

```http
POST /api/v1/service/querybyid
```


### serviceSearch

```http
POST /api/v1/service/search
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function serviceCreate(request: Api.ServiceCreateServiceRequest): Promise<t.ServiceCreateResponse> {
	throw 'Unimplemented'
}

async function serviceDelete(request: Api.ServiceDeleteServiceRequest): Promise<t.ServiceDeleteResponse> {
	throw 'Unimplemented'
}

async function serviceDetail(request: Api.ServiceDetailServiceRequest): Promise<t.ServiceDetailResponse> {
	throw 'Unimplemented'
}

async function serviceQueryById(request: Api.ServiceQueryByIdServiceRequest): Promise<t.ServiceQueryByIdResponse> {
	throw 'Unimplemented'
}

async function serviceSearch(request: Api.ServiceSearchServiceRequest): Promise<t.ServiceSearchResponse> {
	throw 'Unimplemented'
}


const api: t.ServiceApi = {
	serviceCreate,
	serviceDelete,
	serviceDetail,
	serviceQueryById,
	serviceSearch,
}

export default api
```
