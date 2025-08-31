import * as t from '../api/service/types'
import { ServiceService } from '../domain/service/service'
import { Api } from '../models'
import { SingletonLogger } from '../domain/facade/logger';
import { Logger } from 'winston'
import { Service, SearchCondition } from '../domain/model/service';

const logger: Logger = SingletonLogger.get()
async function serviceCreate(request: Api.ServiceCreateServiceRequest): Promise<t.ServiceCreateResponse> {
	logger.info(`applicationCreate request=${JSON.stringify(request)}`);
	try {
		// 可在函数开头添加参数验证
		if (!request.body?.service) {
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
		const serviceService = new ServiceService()
		serviceService.add(convertToService(request.body?.service))

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

function convertToService(metadata: Api.CommonServiceMetadata): Service {
  return {
    did: metadata.did || '',
    version: metadata.version || 0,
    owner: metadata.owner || '',
    network: metadata.network || '',
    address: metadata.address || '',
    name: metadata.name || '',
    description: metadata.description || '',
    code: metadata.code || 'SERVICE_CODE_UNKNOWN', // 默认未知编码
    apiCodes: (metadata.apiCodes || []).join(','), // 数组转为逗号分隔字符串
    proxy: metadata.proxy || '',
    grpc: metadata.grpc || '',
    avatar: metadata.avatar || '',
    createdAt: metadata.createdAt || '',
    updatedAt: metadata.updatedAt || '',
    signature: metadata.signature || '',
    codePackagePath: metadata.codePackagePath || '',
  };
}

async function serviceDelete(request: Api.ServiceDeleteServiceRequest): Promise<t.ServiceDeleteResponse> {
	logger.info(`serviceDelete request=${JSON.stringify(request)}`);
	try {
		// 可在函数开头添加参数验证
		if (!request.body?.did || !request.body?.version) {
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
		const serviceService = new ServiceService()
		serviceService.delete(request.body?.did, request.body?.version)

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
		logger.error(`Delete failed ${error}`)
        // 返回错误响应
        return {
            status: 'default',
            actualStatus: 500,  // 从错误中获取状态码
            body: {
                code: -1,
                message: `Delete failed: ${error}`,
            }
        };
	}
}

async function serviceDetail(request: Api.ServiceDetailServiceRequest): Promise<t.ServiceDetailResponse> {
	logger.info(`serviceDetail request=${JSON.stringify(request)}`);
	try {
		// 可在函数开头添加参数验证
		if (!request.body?.did || !request.body?.version) {
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
		const serviceService = new ServiceService()
		serviceService.get(request.body?.did, request.body?.version)

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
		logger.error(`Detail failed ${error}`)
        // 返回错误响应
        return {
            status: 'default',
            actualStatus: 500,  // 从错误中获取状态码
            body: {
                code: -1,
                message: `Detail failed: ${error}`,
            }
        };
	}
}

async function serviceSearch(request: Api.ServiceSearchServiceRequest): Promise<t.ServiceSearchResponse> {
	logger.info(`serviceSearch request=${JSON.stringify(request)}`);
	try {
		// 可在函数开头添加参数验证
		if (!request.body?.condition) {
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
		const page = request.body.page
		let pageIndex = page?.page
		let pageSize = page?.pageSize
		if (pageIndex === undefined) {
			pageIndex = 1
		}
		if (pageSize === undefined) {
			pageSize = 10
		}
		const serviceService = new ServiceService()
		serviceService.search(convertToSearchCondition(request.body?.condition), pageIndex, pageSize)

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
		logger.error(`Search failed ${error}`)
        // 返回错误响应
        return {
            status: 'default',
            actualStatus: 500,  // 从错误中获取状态码
            body: {
                code: -1,
                message: `Search failed: ${error}`,
            }
        };
	}
}

function convertToSearchCondition(
  condition: Api.ServiceSearchServiceCondition
): SearchCondition {
  return {
    owner: condition.owner,
    code: condition.code, // 枚举值本身就是字符串，可以直接赋值
    name: condition.name,
    keyword: condition.keyword,
    // 注意：isOnline 不在 ServiceSearchServiceCondition 中，无法映射
  };
}

const api: t.ServiceApi = {
	serviceCreate,
	serviceDelete,
	serviceDetail,
	serviceSearch,
}

export default api
