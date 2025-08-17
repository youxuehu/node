# Message


## Operations

### messageCount

```http
POST /api/v1/message/count
```


### messageList

```http
POST /api/v1/message/list
```


### messageListBy

```http
POST /api/v1/message/listBy
```


### messageMarkAsRead

```http
POST /api/v1/message/markAsRead
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function messageCount(request: Api.CorrectionCountRequest): Promise<t.MessageCountResponse> {
	throw 'Unimplemented'
}

async function messageList(request: Api.CorrectionMessageListRequest): Promise<t.MessageListResponse> {
	throw 'Unimplemented'
}

async function messageListBy(request: Api.CorrectionListByRequest): Promise<t.MessageListByResponse> {
	throw 'Unimplemented'
}

async function messageMarkAsRead(request: Api.CorrectionMarkAsReadRequest): Promise<t.MessageMarkAsReadResponse> {
	throw 'Unimplemented'
}


const api: t.MessageApi = {
	messageCount,
	messageList,
	messageListBy,
	messageMarkAsRead,
}

export default api
```
