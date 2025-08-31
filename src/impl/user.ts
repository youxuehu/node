import * as t from '../api/user/types'
import { Api } from '../models'
import { Logger } from 'winston'
import { SingletonLogger } from '../domain/facade/logger';
import { SupportService } from '../domain/service/support';
import { UserService } from '../domain/service/user';
import { User, UserState } from '../domain/model/user';
import { getCurrentUtcString } from '../common/date';
import { UserRoleEnum, UserStatusEnum } from '../yeying/api/user/user';

async function userAdd(request: Api.UserAddUserRequest): Promise<t.UserAddResponse> {
	const logger: Logger = SingletonLogger.get()
	logger.info(`supportCollect request=${JSON.stringify(request)}`);
	const userService = new UserService();
	try {
		// 可在函数开头添加参数验证
		if (!request.body?.user || !request.body?.user.did) {
			return {
				status: 'default',
				actualStatus: 400,
				body: {
					code: 400,
					message: 'Missing application data',
				}
			};
		}

		// 请求身份认证，检查 header 
		// const authenticate: Authenticate = SingletonAuthenticate.get()
		// 转换
		if (request.header === undefined) {
			return {
				status: 'default',
				actualStatus: 400,
				body: {
					code: 400,
					message: 'Missing application data',
				}
			};
		}
		// const messageHeader: MessageHeader = convertCommonToMessageHeader(request.header);
		// const body = new TextEncoder().encode(JSON.stringify(request.body, null, 0));
		// authenticate.verifyHeader(messageHeader, body)

		// 假设 save 方法返回保存后的应用数据
		const existing = await userService.getUser(request.body.user.did);
		if (existing) {
			return {
				status: 200,
				body: {
					header: {},
					body: {
						status: {
							code: Api.CommonResponseCodeEnum.OK,
							message: `current user already exists did=${request.body.user.did}`
						}
					}
				}
			};
		}
		const user = convertToUser(request.body.user)
		if (!user) {
			return {
				status: 'default',
				actualStatus: 400,
				body: {
					code: 400,
					message: 'user is null',
				}
			};
		}
		await userService.saveUser(user)
		await userService.saveState(convertUserStateTo(request.body.user))
		// 返回 200 响应
		return {
			status: 200,
			body: {
				header: {},
				body: {
					status: {
						code: Api.CommonResponseCodeEnum.OK
					}
				}
			}
		};
	} catch (error) {
		logger.error(`supportCollect failed ${error}`)
		// 返回错误响应
		return {
			status: 'default',
			actualStatus: 500,  // 从错误中获取状态码
			body: {
				code: -1,
				message: `supportCollect failed: ${error}`,
			}
		};
	}
}

export function convertUserStateTo(user: Api.UserUserMetadata): UserState {
    return {
		did: user.did === undefined ? "" : user.did,
		status: getUserStatusKey(UserStatusEnum.USER_STATUS_AUDIT),
		role: getUserRoleKey(UserRoleEnum.USER_ROLE_NORMAL),
		createdAt: getCurrentUtcString(),
		updatedAt: getCurrentUtcString(),
		signature: ""
    }
}
function getUserStatusKey(value: UserStatusEnum): string {
  return UserStatusEnum[value] || 'UNKNOWN';
}
function getUserRoleKey(value: UserRoleEnum): string {
  return UserRoleEnum[value] || 'UNKNOWN';
}
function convertToUser(metadata: Api.UserUserMetadata): User | null {
  // 检查必需字段是否存在
  if (!metadata.name || !metadata.did) {
    console.warn('Cannot convert to User: missing required fields (name or did)');
    return null; // 或抛出错误 throw new Error('Missing required fields')
  }

  return {
    name: metadata.name,
    did: metadata.did,
    avatar: metadata.avatar ?? '', // 提供默认值
    createdAt: metadata.createdAt ?? new Date().toISOString(),
    updatedAt: metadata.updatedAt ?? new Date().toISOString(),
    signature: metadata.signature ?? '',
  };
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
