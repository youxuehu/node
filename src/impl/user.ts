import * as t from '../api/user/types'
import { Api } from '../models'

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
