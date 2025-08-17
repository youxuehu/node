# Identity


## Operations

### identityCancel

```http
POST /api/v1/identity/cancel
```


### identityDeposit

```http
POST /api/v1/identity/deposit
```


### identityQuery

```http
POST /api/v1/identity/query
```


### identityRetrieve

```http
POST /api/v1/identity/retrieve
```


### identityShare

```http
POST /api/v1/identity/share
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function identityCancel(request: Api.IdentityCancelRequest): Promise<t.IdentityCancelResponse> {
	throw 'Unimplemented'
}

async function identityDeposit(request: Api.IdentityDepositRequest): Promise<t.IdentityDepositResponse> {
	throw 'Unimplemented'
}

async function identityQuery(request: Api.IdentityQueryRequest): Promise<t.IdentityQueryResponse> {
	throw 'Unimplemented'
}

async function identityRetrieve(request: Api.IdentityRetrieveRequest): Promise<t.IdentityRetrieveResponse> {
	throw 'Unimplemented'
}

async function identityShare(request: Api.IdentityShareRequest): Promise<t.IdentityShareResponse> {
	throw 'Unimplemented'
}


const api: t.IdentityApi = {
	identityCancel,
	identityDeposit,
	identityQuery,
	identityRetrieve,
	identityShare,
}

export default api
```
