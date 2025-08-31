import * as t from '../api/bulletin/types'
import { Api } from '../models'
import { Logger } from 'winston'
import { SingletonLogger } from '../domain/facade/logger';
import { BulletinService } from '../domain/service/bulletin';
import { PageResult, Solution } from '../domain/model/bulletin'
const logger: Logger = SingletonLogger.get()
async function bulletinList(request: Api.BulletinBulletinListRequest): Promise<t.BulletinListResponse> {
	logger.info(`bulletinList request=${JSON.stringify(request)}`);
	const bulletinService = new BulletinService();
	try {
		// 可在函数开头添加参数验证
		if (!request.body?.language) {
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

		const lang: Api.CommonLanguageCodeEnum = request.body.language
		const langString: string = lang
		const pageResult: PageResult = await bulletinService.search(langString, pageIndex, pageSize);
		
		// 返回 200 响应
		return {
			status: 200,
			body: {
				header: {},
				body: {
					status: {
						code: Api.CommonResponseCodeEnum.OK
					},
					page: {
						total: pageResult.page.total,
						page: pageResult.page.page,
						pageSize: pageResult.page.pageSize
					},
					solutions: pageResult.data.map(item => solutionToBulletinSolutionMetadata(item))
				}
			}
		};
	} catch (error) {
		logger.error(`bulletinList failed ${error}`)
		// 返回错误响应
		return {
			status: 'default',
			actualStatus: 500,  // 从错误中获取状态码
			body: {
				code: -1,
				message: `bulletinList failed: ${error}`,
			}
		};
	}
}

function solutionToBulletinSolutionMetadata(solution: Solution): Api.BulletinSolutionMetadata {
  return {
    publisher: solution.publisher,
    language: solution.language as Api.CommonLanguageCodeEnum, // 注意：确保值符合枚举类型
    uid: solution.uid,
    name: solution.name,
    description: solution.description,
    signature: solution.signature,
    createdAt: solution.createdAt,
    cards: solution.cards as Api.BulletinSolutionCard[], // 类型断言，确保兼容
  };
}


const api: t.BulletinApi = {
	bulletinList,
}

export default api
