# Room


## Operations

### roomCreate

```http
POST /api/v1/room/create
```


### roomDelete

```http
POST /api/v1/room/delete
```


### roomGet

```http
POST /api/v1/room/get
```


### roomList

```http
POST /api/v1/room/list
```


### roomUpdate

```http
POST /api/v1/room/update
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function roomCreate(request: Api.InterviewerCreateRoomRequest): Promise<t.RoomCreateResponse> {
	throw 'Unimplemented'
}

async function roomDelete(request: Api.InterviewerDeleteRoomRequest): Promise<t.RoomDeleteResponse> {
	throw 'Unimplemented'
}

async function roomGet(request: Api.InterviewerGetRoomRequest): Promise<t.RoomGetResponse> {
	throw 'Unimplemented'
}

async function roomList(request: Api.InterviewerListRoomsRequest): Promise<t.RoomListResponse> {
	throw 'Unimplemented'
}

async function roomUpdate(request: Api.InterviewerUpdateRoomRequest): Promise<t.RoomUpdateResponse> {
	throw 'Unimplemented'
}


const api: t.RoomApi = {
	roomCreate,
	roomDelete,
	roomGet,
	roomList,
	roomUpdate,
}

export default api
```
