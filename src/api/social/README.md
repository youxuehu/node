# Social


## Operations

### socialGetFriends

```http
POST /api/v1/social/getFriends
```


### socialMakeFriends

```http
POST /api/v1/social/makeFriends
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function socialGetFriends(request: Api.SocialGetFriendsRequest): Promise<t.SocialGetFriendsResponse> {
	throw 'Unimplemented'
}

async function socialMakeFriends(request: Api.SocialMakeFriendsRequest): Promise<t.SocialMakeFriendsResponse> {
	throw 'Unimplemented'
}


const api: t.SocialApi = {
	socialGetFriends,
	socialMakeFriends,
}

export default api
```
