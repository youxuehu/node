# Topic


## Operations

### topicSearch

```http
POST /api/v1/topic/search
```


### topicSubscribe

```http
POST /api/v1/topic/subscribe
```


### topicUnsubscribe

```http
POST /api/v1/topic/unsubscribe
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function topicSearch(request: Api.ApitopicSearchRequest): Promise<t.TopicSearchResponse> {
	throw 'Unimplemented'
}

async function topicSubscribe(request: Api.TopicSubscribeRequest): Promise<t.TopicSubscribeResponse> {
	throw 'Unimplemented'
}

async function topicUnsubscribe(request: Api.TopicUnsubscribeRequest): Promise<t.TopicUnsubscribeResponse> {
	throw 'Unimplemented'
}


const api: t.TopicApi = {
	topicSearch,
	topicSubscribe,
	topicUnsubscribe,
}

export default api
```
