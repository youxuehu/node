import * as t from '../api/mail/types'
import { Api } from '../models'
import { Logger } from 'winston'
import { SingletonLogger } from '../domain/facade/logger';
import { MailClient } from '../common/tool/mail_client';
import config from 'config'
import { MailConfig, RedisConfig } from '../config';
import { RedisClient } from '../common/tool/redis_client';
import {readFile} from "../common/file";
// @ts-ignore
import { dirPath } from '../../config/__init__'
import * as path from 'path'

async function mailSend(request: Api.MailSendMailRequest): Promise<t.MailSendResponse> {
	const logger: Logger = SingletonLogger.get()
	logger.info(`mailSend request=${JSON.stringify(request)}`);
	const mailClient = new MailClient(config.get<MailConfig>('mail'));
	const redisClient = new RedisClient(config.get<RedisConfig>('cache'));
	try {
		// 可在函数开头添加参数验证
		if (!request.body?.toMail) {
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

		const code = (Math.floor(Math.random() * 900000) + 100000).toString()
		const tempTemplate = readFile(
            path.join(dirPath, 'config/email_code_login_mail_template_zh-CN.html')
        )
		const toMail = request.body?.toMail
		const pageResult = await mailClient.send(
			toMail,
			'邮箱验证码',
			tempTemplate.replace('{{code}}', code)
		);
		const r: boolean = await redisClient.set(`emailVerificationCode:${toMail}`, code, 'EX', 300)
		if (!r) {
			logger.error(`store verify code error`)
			// 返回错误响应
			return {
				status: 'default',
				actualStatus: 500,  // 从错误中获取状态码
				body: {
					code: -1,
					message: `store verify code error`,
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
		logger.error(`mailSend failed ${error}`)
		// 返回错误响应
		return {
			status: 'default',
			actualStatus: 500,  // 从错误中获取状态码
			body: {
				code: -1,
				message: `mailSend failed: ${error}`,
			}
		};
	}
}

async function mailVerify(request: Api.MailVerifyMailRequest): Promise<t.MailVerifyResponse> {
	const logger: Logger = SingletonLogger.get()
	logger.info(`mailVerify request=${JSON.stringify(request)}`);
	const mailClient = new MailClient(config.get<MailConfig>('mail'));
	const redisClient = new RedisClient(config.get<RedisConfig>('cache'));
	try {
		// 可在函数开头添加参数验证
		if (!request.body?.toMail) {
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
		const toMail = request.body?.toMail
		const code = request.body?.code
		const retrievedCode: string = await redisClient.get(`emailVerificationCode:${toMail}`)
		if (retrievedCode == null) {
            console.log(`get verify code is null or it has expired. mail ${toMail}`)
			// 返回错误响应
			return {
				status: 'default',
				actualStatus: 500,  // 从错误中获取状态码
				body: {
					code: -1,
					message: `get verify code is null or it has expired. mail ${toMail}`,
				}
			};
		}

		if (retrievedCode != code) {
			console.log(`verification code is error.`)
			return {
				status: 'default',
				actualStatus: 500,  // 从错误中获取状态码
				body: {
					code: -1,
					message: `verification code is error. mail ${toMail}`,
				}
			};
		}
		console.log(`verify code is right, verify success`)

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
		logger.error(`mailVerify failed ${error}`)
		// 返回错误响应
		return {
			status: 'default',
			actualStatus: 500,  // 从错误中获取状态码
			body: {
				code: -1,
				message: `mailVerify failed: ${error}`,
			}
		};
	}
}


const api: t.MailApi = {
	mailSend,
	mailVerify,
}

export default api
