# Task


## Operations

### taskAdd

```http
POST /api/v1/task/add
```


### taskCreate

```http
POST /api/v1/task/create
```


### taskDelete

```http
POST /api/v1/task/delete
```


### taskDetail

```http
POST /api/v1/task/detail
```


### taskList

```http
POST /api/v1/task/list
```


### taskTagCount

```http
POST /api/v1/task/tagCount
```


### taskUpdate

```http
POST /api/v1/task/update
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function taskAdd(request: Api.CorrectionAddTaskRequest): Promise<t.TaskAddResponse> {
	throw 'Unimplemented'
}

async function taskCreate(request: Api.TaskCreateTaskRequest): Promise<t.TaskCreateResponse> {
	throw 'Unimplemented'
}

async function taskDelete(request: Api.CorrectionDeleteTaskRequest): Promise<t.TaskDeleteResponse> {
	throw 'Unimplemented'
}

async function taskDetail(request: Api.CorrectionDetailTaskRequest): Promise<t.TaskDetailResponse> {
	throw 'Unimplemented'
}

async function taskList(request: Api.CorrectionListTaskRequest): Promise<t.TaskListResponse> {
	throw 'Unimplemented'
}

async function taskTagCount(request: Api.CorrectionTagCountTaskRequest): Promise<t.TaskTagCountResponse> {
	throw 'Unimplemented'
}

async function taskUpdate(request: Api.CorrectionUpdateTaskRequest): Promise<t.TaskUpdateResponse> {
	throw 'Unimplemented'
}


const api: t.TaskApi = {
	taskAdd,
	taskCreate,
	taskDelete,
	taskDetail,
	taskList,
	taskTagCount,
	taskUpdate,
}

export default api
```
