# TaskTag


## Operations

### taskTagAdd

```http
POST /api/v1/tasktag/add
```


### taskTagDelete

```http
POST /api/v1/tasktag/delete
```


### taskTagDetail

```http
POST /api/v1/tasktag/detail
```


### taskTagList

```http
POST /api/v1/tasktag/list
```


### taskTagUpdate

```http
POST /api/v1/tasktag/update
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function taskTagAdd(request: Api.CorrectionAddTaskTagRequest): Promise<t.TaskTagAddResponse> {
	throw 'Unimplemented'
}

async function taskTagDelete(request: Api.CorrectionDeleteTaskTagRequest): Promise<t.TaskTagDeleteResponse> {
	throw 'Unimplemented'
}

async function taskTagDetail(request: Api.CorrectionDetailTaskTagRequest): Promise<t.TaskTagDetailResponse> {
	throw 'Unimplemented'
}

async function taskTagList(request: Api.CorrectionListTaskTagRequest): Promise<t.TaskTagListResponse> {
	throw 'Unimplemented'
}

async function taskTagUpdate(request: Api.CorrectionUpdateTaskTagRequest): Promise<t.TaskTagUpdateResponse> {
	throw 'Unimplemented'
}


const api: t.TaskTagApi = {
	taskTagAdd,
	taskTagDelete,
	taskTagDetail,
	taskTagList,
	taskTagUpdate,
}

export default api
```
