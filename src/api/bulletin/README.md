# Bulletin


## Operations

### bulletinList

```http
POST /api/v1/bulletin/list
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function bulletinList(request: Api.BulletinBulletinListRequest): Promise<t.BulletinListResponse> {
	throw 'Unimplemented'
}


const api: t.BulletinApi = {
	bulletinList,
}

export default api
```
