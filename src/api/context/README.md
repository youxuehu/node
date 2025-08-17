# Context


## Operations

### contextAdd

```http
POST /api/v1/context/add
```


### contextCreate

```http
POST /api/v1/context/create
```


### contextDelete

```http
POST /api/v1/context/delete
```


### contextDeleteMessage

```http
POST /api/v1/context/deleteMessage
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function contextAdd(request: Api.RagAddContextRequest): Promise<t.ContextAddResponse> {
	throw 'Unimplemented'
}

async function contextCreate(request: Api.RagCreateContextRequest): Promise<t.ContextCreateResponse> {
	throw 'Unimplemented'
}

async function contextDelete(request: Api.RagDeleteContextRequest): Promise<t.ContextDeleteResponse> {
	throw 'Unimplemented'
}

async function contextDeleteMessage(request: Api.RagDeleteContextMessageRequest): Promise<t.ContextDeleteMessageResponse> {
	throw 'Unimplemented'
}


const api: t.ContextApi = {
	contextAdd,
	contextCreate,
	contextDelete,
	contextDeleteMessage,
}

export default api
```
