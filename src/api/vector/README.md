# Vector


## Operations

### vectorQuery

```http
POST /api/v1/vector/query
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function vectorQuery(request: Api.VectorVectorRequest): Promise<t.VectorQueryResponse> {
	throw 'Unimplemented'
}


const api: t.VectorApi = {
	vectorQuery,
}

export default api
```
