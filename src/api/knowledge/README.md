# Knowledge


## Operations

### knowledgeAdd

```http
POST /api/v1/knowledge/add
```


### knowledgeAppend

```http
POST /api/v1/knowledge/append
```


### knowledgeCreate

```http
POST /api/v1/knowledge/create
```


### knowledgeDelete

```http
POST /api/v1/knowledge/delete
```


### knowledgeSearch

```http
POST /api/v1/knowledge/search
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function knowledgeAdd(request: Api.RagAddKnowledgeRequest): Promise<t.KnowledgeAddResponse> {
	throw 'Unimplemented'
}

async function knowledgeAppend(request: Api.ContentAppendRequest): Promise<t.KnowledgeAppendResponse> {
	throw 'Unimplemented'
}

async function knowledgeCreate(request: Api.RagCreateKnowledgeRequest): Promise<t.KnowledgeCreateResponse> {
	throw 'Unimplemented'
}

async function knowledgeDelete(request: Api.RagDeleteKnowledgeRequest): Promise<t.KnowledgeDeleteResponse> {
	throw 'Unimplemented'
}

async function knowledgeSearch(request: Api.ApicontentSearchRequest): Promise<t.KnowledgeSearchResponse> {
	throw 'Unimplemented'
}


const api: t.KnowledgeApi = {
	knowledgeAdd,
	knowledgeAppend,
	knowledgeCreate,
	knowledgeDelete,
	knowledgeSearch,
}

export default api
```
