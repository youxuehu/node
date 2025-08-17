# Archive


## Operations

### archiveAdd

```http
POST /api/v1/archive/add
```


### archiveDelete

```http
POST /api/v1/archive/delete
```


### archiveDetail

```http
POST /api/v1/archive/detail
```


### archiveDetailByStudentDid

```http
POST /api/v1/archive/detailByStudentDid
```


### archiveList

```http
POST /api/v1/archive/list
```


### archiveUpdate

```http
POST /api/v1/archive/update
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function archiveAdd(request: Api.CorrectionArchiveAddRequest): Promise<t.ArchiveAddResponse> {
	throw 'Unimplemented'
}

async function archiveDelete(request: Api.CorrectionArchiveDeleteRequest): Promise<t.ArchiveDeleteResponse> {
	throw 'Unimplemented'
}

async function archiveDetail(request: Api.CorrectionArchiveDetailRequest): Promise<t.ArchiveDetailResponse> {
	throw 'Unimplemented'
}

async function archiveDetailByStudentDid(request: Api.CorrectionArchiveDetailStudentRequest): Promise<t.ArchiveDetailByStudentDidResponse> {
	throw 'Unimplemented'
}

async function archiveList(request: Api.CorrectionArchiveListRequest): Promise<t.ArchiveListResponse> {
	throw 'Unimplemented'
}

async function archiveUpdate(request: Api.CorrectionArchiveUpdateRequest): Promise<t.ArchiveUpdateResponse> {
	throw 'Unimplemented'
}


const api: t.ArchiveApi = {
	archiveAdd,
	archiveDelete,
	archiveDetail,
	archiveDetailByStudentDid,
	archiveList,
	archiveUpdate,
}

export default api
```
