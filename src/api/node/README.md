# Node


## Operations

### nodeHealthCheck

```http
POST /api/v1/node/healthCheck
```


### nodeWhoami

```http
POST /api/v1/node/whoami
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function nodeHealthCheck(request: Api.NodeHealthCheckRequest): Promise<t.NodeHealthCheckResponse> {
	throw 'Unimplemented'
}

async function nodeWhoami(request: Api.NodeWhoamiRequest): Promise<t.NodeWhoamiResponse> {
	throw 'Unimplemented'
}


const api: t.NodeApi = {
	nodeHealthCheck,
	nodeWhoami,
}

export default api
```
