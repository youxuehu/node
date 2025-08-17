# Content


## Operations

### contentValidate

```http
POST /api/v1/content/validate
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function contentValidate(request: Api.ContentValidateRequest): Promise<t.ContentValidateResponse> {
	throw 'Unimplemented'
}


const api: t.ContentApi = {
	contentValidate,
}

export default api
```
