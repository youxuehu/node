import * as t from '../api/application/types'
import { Authenticate } from '../common/authenticate';
import { SingletonAuthenticate } from '../domain/facade/authenticate';
import { SingletonLogger } from '../domain/facade/logger';
import { convertToApplication } from '../domain/model/application';
import { ApplicationService } from '../domain/service/application'
import { Api } from '../models'
import { Logger } from 'winston'
import { MessageHeader } from '../yeying/api/common/message';
import { AuthenticateTypeEnum } from '../yeying/api/common/code';

const logger: Logger = SingletonLogger.get()
async function applicationCreate(request: Api.ApplicationCreateApplicationRequest): Promise<t.ApplicationCreateResponse> {
    logger.info(`applicationCreate request=${JSON.stringify(request)}`);
    const applicationService = new ApplicationService();
    try {
		// 可在函数开头添加参数验证
		if (!request.body?.application) {
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
		const authenticate: Authenticate = SingletonAuthenticate.get()
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
		const messageHeader: MessageHeader = convertCommonToMessageHeader(request.header);
		const body = new TextEncoder().encode(JSON.stringify(request.body, null, 0));
		authenticate.verifyHeader(messageHeader, body)

        // 假设 save 方法返回保存后的应用数据
        const savedApplication = await applicationService.save(convertToApplication(request.body?.application));
        
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
			}  // 确保类型匹配 Api.ApplicationCreateApplicationResponse
        };
    } catch (error) {
		logger.error(`Save failed ${error}`)
        // 返回错误响应
        return {
            status: 'default',
            actualStatus: 500,  // 从错误中获取状态码
            body: {
                code: -1,
                message: `Save failed: ${error}`,
            }
        };
    }
}

function convertCommonToMessageHeader(commonHeader: Api.CommonMessageHeader): MessageHeader {
  return MessageHeader.fromPartial({
    did: commonHeader.did,
    authType: commonHeader.authType as unknown as AuthenticateTypeEnum,
    authContent: commonHeader.authContent,
    nonce: commonHeader.nonce,
    timestamp: commonHeader.timestamp,
    version: commonHeader.version,
  });
}

async function applicationDelete(request: Api.ApplicationDeleteApplicationRequest): Promise<t.ApplicationDeleteResponse> {
	throw 'Unimplemented'
}

async function applicationDetail(request: Api.ApplicationApplicationDetailRequest): Promise<t.ApplicationDetailResponse> {
	throw 'Unimplemented'
}

async function applicationSearch(request: Api.ApplicationSearchApplicationRequest): Promise<t.ApplicationSearchResponse> {
	throw 'Unimplemented'
}


const api: t.ApplicationApi = {
	applicationCreate,
	applicationDelete,
	applicationDetail,
	applicationSearch,
}

export default api
