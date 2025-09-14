import * as t from '../api/node/types'
import { Api } from '../models'
import { Logger } from 'winston'
import { SingletonLogger } from '../domain/facade/logger';
import { SingletonService } from '../domain/facade/authenticate';
import { ServiceMetadata } from '../yeying/api/common/model';

async function nodeHealthCheck(request: Api.NodeHealthCheckRequest): Promise<t.NodeHealthCheckResponse> {
	const logger: Logger = SingletonLogger.get()
	logger.info(`nodeHealthCheck request=${JSON.stringify(request)}`);
	try {
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
		logger.error(`nodeHealthCheck failed ${error}`)
		// 返回错误响应
		return {
			status: 'default',
			actualStatus: 500,  // 从错误中获取状态码
			body: {
				code: -1,
				message: `nodeHealthCheck failed: ${error}`,
			}
		};
	}
}

async function nodeWhoami(request: Api.NodeWhoamiRequest): Promise<t.NodeWhoamiResponse> {
	const logger: Logger = SingletonLogger.get()
	logger.info(`nodeWhoami request=${JSON.stringify(request)}`);
	try {
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

		const service = SingletonService.get()

		// 返回 200 响应
		return {
			status: 200,
			body: {
				header: {},
				body: {
					status: {
						code: Api.CommonResponseCodeEnum.OK
					},
					service: serviceMetadataToCommonServiceMetadata(service)
				}
			}  // 确保类型匹配 Api.ApplicationCreateApplicationResponse
		};
	} catch (error) {
		logger.error(`nodeWhoami failed ${error}`)
		// 返回错误响应
		return {
			status: 'default',
			actualStatus: 500,  // 从错误中获取状态码
			body: {
				code: -1,
				message: `nodeWhoami failed: ${error}`,
			}
		};
	}
}

function serviceMetadataToCommonServiceMetadata(
  meta: ServiceMetadata
): Api.CommonServiceMetadata {
  // 校验 code 是否属于 Api.CommonServiceCodeEnum
  const isValidServiceCode = (value: string): value is Api.CommonServiceCodeEnum => {
    return Object.values(Api.CommonServiceCodeEnum).includes(value as any);
  };

  // 校验 apiCodes 数组中的每一项是否属于 Api.CommonApiCodeEnum
  const validApiCodes = Array.isArray(meta.apiCodes)
    ? meta.apiCodes
        .map(code => code as unknown as string) // 转为 string
        .filter(code => Object.values(Api.CommonApiCodeEnum).includes(code as any)) as Api.CommonApiCodeEnum[]
    : [];

  return {
    owner: meta.owner,
    network: meta.network,
    address: meta.address,
    did: meta.did,
    version: meta.version,
    name: meta.name,
    description: meta.description,
    // 枚举转换：仅当值合法时才赋值
    code: isValidServiceCode(meta.code as unknown as string) ? (meta.code as unknown as Api.CommonServiceCodeEnum) : undefined,
    // 枚举数组转换
    apiCodes: validApiCodes.length > 0 ? validApiCodes : undefined,
    proxy: meta.proxy,
    grpc: meta.grpc,
    avatar: meta.avatar,
    createdAt: meta.createdAt,
    updatedAt: meta.updatedAt,
    signature: meta.signature,
    codePackagePath: meta.codePackagePath,
  };
}


const api: t.NodeApi = {
	nodeHealthCheck,
	nodeWhoami,
}

export default api
