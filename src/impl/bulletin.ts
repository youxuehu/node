import * as t from '../api/bulletin/types'
import { Api } from '../models'

async function bulletinList(request: Api.BulletinBulletinListRequest): Promise<t.BulletinListResponse> {
	throw 'Unimplemented'
}


const api: t.BulletinApi = {
	bulletinList,
}

export default api
