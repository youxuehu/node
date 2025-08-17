# Group


## Operations

### groupAdd

```http
POST /api/v1/group/add
```


### groupDelete

```http
POST /api/v1/group/delete
```


### groupDetail

```http
POST /api/v1/group/detail
```


### groupList

```http
POST /api/v1/group/list
```


### groupUpdate

```http
POST /api/v1/group/update
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function groupAdd(request: Api.CorrectionAddGroupRequest): Promise<t.GroupAddResponse> {
	throw 'Unimplemented'
}

async function groupDelete(request: Api.CorrectionDeleteGroupRequest): Promise<t.GroupDeleteResponse> {
	throw 'Unimplemented'
}

async function groupDetail(request: Api.CorrectionDetailGroupRequest): Promise<t.GroupDetailResponse> {
	throw 'Unimplemented'
}

async function groupList(request: Api.CorrectionListGroupRequest): Promise<t.GroupListResponse> {
	throw 'Unimplemented'
}

async function groupUpdate(request: Api.CorrectionUpdateGroupRequest): Promise<t.GroupUpdateResponse> {
	throw 'Unimplemented'
}


const api: t.GroupApi = {
	groupAdd,
	groupDelete,
	groupDetail,
	groupList,
	groupUpdate,
}

export default api
```
