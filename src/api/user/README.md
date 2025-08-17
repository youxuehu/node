# User


## Operations

### userAdd

```http
POST /api/v1/user/add
```


### userDelete

```http
POST /api/v1/user/delete
```


### userDetail

```http
POST /api/v1/user/detail
```


### userList

```http
POST /api/v1/user/list
```


### userUpdate

```http
POST /api/v1/user/update
```


### userUpdateStatus

```http
POST /api/v1/user/updateStatus
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function userAdd(request: Api.UserAddUserRequest): Promise<t.UserAddResponse> {
	throw 'Unimplemented'
}

async function userDelete(request: Api.UserDeleteUserRequest): Promise<t.UserDeleteResponse> {
	throw 'Unimplemented'
}

async function userDetail(request: Api.UserUserDetailRequest): Promise<t.UserDetailResponse> {
	throw 'Unimplemented'
}

async function userList(request: Api.UserUserListRequest): Promise<t.UserListResponse> {
	throw 'Unimplemented'
}

async function userUpdate(request: Api.UserUpdateUserRequest): Promise<t.UserUpdateResponse> {
	throw 'Unimplemented'
}

async function userUpdateStatus(request: Api.UserUpdateStatusRequest): Promise<t.UserUpdateStatusResponse> {
	throw 'Unimplemented'
}


const api: t.UserApi = {
	userAdd,
	userDelete,
	userDetail,
	userList,
	userUpdate,
	userUpdateStatus,
}

export default api
```
