import * as t from '../api/application/types'
import { Authenticate } from '../common/authenticate';
import { SingletonAuthenticate } from '../domain/facade/authenticate';
import { SingletonLogger } from '../domain/facade/logger';
import { convertToApplication, SearchCondition } from '../domain/model/application';
import { ApplicationService } from '../domain/service/application'
import { Api } from '../models'
import { Logger } from 'winston'
import { MessageHeader } from '../yeying/api/common/message';
import { AuthenticateTypeEnum } from '../yeying/api/common/code';

async function applicationCreate(request: Api.ApplicationCreateApplicationRequest): Promise<t.ApplicationCreateResponse> {
	const logger: Logger = SingletonLogger.get()
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
	const logger: Logger = SingletonLogger.get()
	logger.info(`applicationDelete request=${JSON.stringify(request)}`);
    const applicationService = new ApplicationService();
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

        const deleteApplication = await applicationService.delete(request.body?.did, request.body?.version);
        
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

async function applicationDetail(request: Api.ApplicationApplicationDetailRequest): Promise<t.ApplicationDetailResponse> {
	const logger: Logger = SingletonLogger.get()
	logger.info(`applicationDetail request=${JSON.stringify(request)}`);
    const applicationService = new ApplicationService();
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

        const detailApplication = await applicationService.query(request.body?.did, request.body?.version);
        
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

async function applicationSearch(request: Api.ApplicationSearchApplicationRequest): Promise<t.ApplicationSearchResponse> {
	const logger: Logger = SingletonLogger.get()
	logger.info(`applicationSearch request=${JSON.stringify(request)}`);
    const applicationService = new ApplicationService();
    try {
		const condition = request.body?.condition
		const page = request.body?.page
		if (condition === undefined) {
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

		let pageIndex = page?.page
		let pageSize = page?.pageSize
		if (pageIndex === undefined) {
			pageIndex = 1
		}
		if (pageSize === undefined) {
			pageSize = 10
		}

        const searchApplication = await applicationService.search(convertToSearchCondition(condition), pageIndex, pageSize);
        
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

function convertToSearchCondition(
  condition: Api.ApplicationSearchApplicationCondition
): SearchCondition {
  const result: SearchCondition = {
    code: condition.code,
    owner: condition.owner,
    name: condition.name,
    keyword: condition.keyword,
  };

  // 映射 status -> isOnline
  if (condition.status !== undefined) {
    result.isOnline = condition.status === Api.CommonApplicationStatusEnum.APPLICATIONSTATUSONLINE;
  }

  return result;
}


const api: t.ApplicationApi = {
	applicationCreate,
	applicationDelete,
	applicationDetail,
	applicationSearch,
}

export default api
