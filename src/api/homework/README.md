# Homework


## Operations

### homeworkDetail

```http
POST /api/v1/homework/detail
```


### homeworkList

```http
POST /api/v1/homework/list
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function homeworkDetail(request: Api.CorrectionHomeworkDetailRequest): Promise<t.HomeworkDetailResponse> {
	throw 'Unimplemented'
}

async function homeworkList(request: Api.CorrectionHomeworkListRequest): Promise<t.HomeworkListResponse> {
	throw 'Unimplemented'
}


const api: t.HomeworkApi = {
	homeworkDetail,
	homeworkList,
}

export default api
```
