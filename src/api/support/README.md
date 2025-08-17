# Support


## Operations

### supportCollect

```http
POST /api/v1/support/collect
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function supportCollect(request: Api.SupportCollectSupportRequest): Promise<t.SupportCollectResponse> {
	throw 'Unimplemented'
}


const api: t.SupportApi = {
	supportCollect,
}

export default api
```
