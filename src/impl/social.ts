import * as t from '../api/social/types'
import { Api } from '../models'

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
