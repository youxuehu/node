import * as t from '../api/support/types'
import { Api } from '../models'
import { Logger } from 'winston'
import { SingletonLogger } from '../domain/facade/logger';
import { SupportService } from '../domain/service/support';
import { Support } from '../domain/model/support';
const logger: Logger = SingletonLogger.get()
async function supportCollect(request: Api.SupportCollectSupportRequest): Promise<t.SupportCollectResponse> {
	logger.info(`supportCollect request=${JSON.stringify(request)}`);
	const supportService = new SupportService();
	try {
		// 可在函数开头添加参数验证
		if (!request.body?.code || !request.body?.faq) {
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
		const supportCollect = await supportService.add(convertToSupport(request.body.faq));
		
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

function convertToSupport(metadata: Api.SupportFaqMetadata): Support {
  // 可以根据业务需求设置默认值，或抛出错误
  return {
    did: metadata.did ?? '',
    email: metadata.email ?? '',
    type: metadata.type ?? '',
    description: metadata.description ?? '',
    createdAt: metadata.createdAt ?? new Date().toISOString(),
    signature: metadata.signature ?? '',
  };
}

const api: t.SupportApi = {
	supportCollect,
}

export default api
