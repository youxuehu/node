import * as t from '../api/invitation/types'
import { Api } from '../models'
import { Logger } from 'winston'
import { SingletonLogger } from '../domain/facade/logger';
import { InvitationService } from '../domain/service/invitation';
import { Invitation } from '../domain/model/invitation';
const logger: Logger = SingletonLogger.get()
async function invitationCreate(request: Api.InvitationCreateInvitationRequest): Promise<t.InvitationCreateResponse> {
	logger.info(`invitationCreate request=${JSON.stringify(request)}`);
	const invitationService = new InvitationService();
	try {
		// 可在函数开头添加参数验证
		if (!request.body?.invitation) {
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
		const invitation = convertToInvitation(request.body.invitation)
		if (!invitation) {
			return {
				status: 'default',
				actualStatus: 400,
				body: {
					code: 400,
					message: 'Missing application data',
				}
			};
		}
		const pageResult = await invitationService.create(invitation);
		
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
		logger.error(`invitationCreate failed ${error}`)
		// 返回错误响应
		return {
			status: 'default',
			actualStatus: 500,  // 从错误中获取状态码
			body: {
				code: -1,
				message: `invitationCreate failed: ${error}`,
			}
		};
	}
}

function convertToInvitation(metadata: Api.InvitationInvitationMetadata): Invitation | null {
  // 检查所有必需字段是否存在
  if (
    metadata.scene == null ||
    metadata.inviter == null ||
    metadata.invitee == null ||
    metadata.code == null ||
    metadata.expiredAt == null ||
    metadata.createdAt == null ||
    metadata.signature == null
  ) {
    console.warn('转换失败：缺少必需字段', metadata);
    return null; // 或抛出错误，取决于你的错误处理策略
  }

  return {
    scene: metadata.scene,
    inviter: metadata.inviter,
    invitee: metadata.invitee,
    code: metadata.code,
    expiredAt: metadata.expiredAt,
    createdAt: metadata.createdAt,
    signature: metadata.signature,
  };
}

async function invitationDetail(request: Api.InvitationInvitationDetailRequest): Promise<t.InvitationDetailResponse> {
	throw 'Unimplemented'
}

async function invitationSearch(request: Api.InvitationSearchInvitationRequest): Promise<t.InvitationSearchResponse> {
	throw 'Unimplemented'
}


const api: t.InvitationApi = {
	invitationCreate,
	invitationDetail,
	invitationSearch,
}

export default api
