# Experience


## Operations

### experienceAdd

```http
POST /api/v1/experience/add
```


### experienceCreate

```http
POST /api/v1/experience/create
```


### experienceDelete

```http
POST /api/v1/experience/delete
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function experienceAdd(request: Api.RagAddExperienceRequest): Promise<t.ExperienceAddResponse> {
	throw 'Unimplemented'
}

async function experienceCreate(request: Api.RagCreateExperienceRequest): Promise<t.ExperienceCreateResponse> {
	throw 'Unimplemented'
}

async function experienceDelete(request: Api.RagDeleteExperienceRequest): Promise<t.ExperienceDeleteResponse> {
	throw 'Unimplemented'
}


const api: t.ExperienceApi = {
	experienceAdd,
	experienceCreate,
	experienceDelete,
}

export default api
```
