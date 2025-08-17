# Network


## Operations

### networkExit

```http
POST /api/v1/network/exit
```


### networkJoin

```http
POST /api/v1/network/join
```


### networkList

```http
POST /api/v1/network/list
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function networkExit(request: Api.NetworkExitRequest): Promise<t.NetworkExitResponse> {
	throw 'Unimplemented'
}

async function networkJoin(request: Api.NetworkJoinRequest): Promise<t.NetworkJoinResponse> {
	throw 'Unimplemented'
}

async function networkList(request: Api.NetworkListRequest): Promise<t.NetworkListResponse> {
	throw 'Unimplemented'
}


const api: t.NetworkApi = {
	networkExit,
	networkJoin,
	networkList,
}

export default api
```
