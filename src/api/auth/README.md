# Auth


## Operations

### authChallenge

```http
POST /api/v1/auth/challenge
```


### authVerify

```http
POST /api/v1/auth/verify
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function authChallenge(request: Api.AuthChallengeRequest): Promise<t.AuthChallengeResponse> {
	throw 'Unimplemented'
}

async function authVerify(request: Api.AuthVerifyRequest): Promise<t.AuthVerifyResponse> {
	throw 'Unimplemented'
}


const api: t.AuthApi = {
	authChallenge,
	authVerify,
}

export default api
```
