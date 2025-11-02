import * as t from '../api/auth/types'
import { Api } from '../models'
import { Logger } from 'winston'
import { SingletonLogger } from '../domain/facade/logger';
import { verifyMessage } from 'ethers';
import * as jwt from 'jsonwebtoken';

 // 生产环境使用环境变量
const JWT_SECRET = process.env.JWT_SECRET || 'e802e988a02546cc47415e4bc76346aae7ceece97a0f950319c861a5de38b20d';
// 生产环境使用 Redis
const challenges = new Map();

async function authChallenge(request: Api.AuthChallengeRequest): Promise<t.AuthChallengeResponse> {
	const logger: Logger = SingletonLogger.get()
	logger.info(`authChallenge request=${JSON.stringify(request)}`);
	try {
		// 可在函数开头添加参数验证
		if (request.body?.address === undefined) {
			return {
				status: 'default',
				actualStatus: 400,
				body: {
					code: 400,
					message: 'Missing application data',
				}
			};
		}
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

		// 生成随机 Challenge
		const challenge = `请签名以登录 YeYing Wallet\n\n随机数: ${Math.random().toString(36).substring(7)}\n时间戳: ${Date.now()}`;
		
		// 保存 Challenge（5分钟过期）
		challenges.set(request.body?.address.toLowerCase(), {
			challenge,
			timestamp: Date.now()
		});
  		
		// 返回 200 响应
		return {
			status: 200,
			body: {
				header: {},
				body: {
					status: {
						code: Api.CommonResponseCodeEnum.OK,
					},
					result: challenge
				}
			}
		};
	} catch (error) {
		logger.error(`authChallenge failed ${error}`)
		// 返回错误响应
		return {
			status: 'default',
			actualStatus: 500,  // 从错误中获取状态码
			body: {
				code: -1,
				message: `authChallenge failed: ${error}`,
			}
		};
	}
}

async function authVerify(request: Api.AuthVerifyRequest): Promise<t.AuthVerifyResponse> {
	const logger: Logger = SingletonLogger.get()
	logger.info(`authVerify request=${JSON.stringify(request)}`);
	try {
		// 可在函数开头添加参数验证
		if (request.body?.address === undefined || request.body?.signature === undefined) {
			return {
				status: 'default',
				actualStatus: 400,
				body: {
					code: 400,
					message: 'Missing application data',
				}
			};
		}
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
		const address = request.body?.address
		const signature = request.body?.signature
		const addressLower = address.toLowerCase();
		const challengeData = challenges.get(addressLower);

		if (!challengeData) {
			return {
				status: 'default',
				actualStatus: 400,
				body: {
					code: 400,
					message: 'Challenge 不存在或已过期',
				}
			};
		}
		
		// 检查过期（5分钟）
		if (Date.now() - challengeData.timestamp > 5 * 60 * 1000) {
			challenges.delete(addressLower);
			return {
				status: 'default',
				actualStatus: 400,
				body: {
					code: 400,
					message: 'Challenge 不存在或已过期',
				}
			};
		}

		try {
			// 验证签名
			const recoveredAddress = verifyMessage(challengeData.challenge, signature);
			
			if (recoveredAddress.toLowerCase() !== addressLower) {
				return {
					status: 'default',
					actualStatus: 401,
					body: {
						code: 401,
						message: '签名验证失败',
					}
				};

			}

			// 删除已使用的 Challenge
			challenges.delete(addressLower);
			
			// 生成 JWT Token
			const token = jwt.sign(
				{ address: addressLower },
				JWT_SECRET,
				{ expiresIn: '1h' }
			);

			// 返回 200 响应
			return {
				status: 200,
				body: {
					header: {},
					body: {
						status: {
							code: Api.CommonResponseCodeEnum.OK,
						},
						token: token
					}
				}
			};
			
		} catch (error) {
			console.error('验证失败:', error);
			return {
				status: 'default',
				actualStatus: 500,  // 从错误中获取状态码
				body: {
					code: -1,
					message: `authVerify failed: ${error}`,
				}
			};
		}
  		
	} catch (error) {
		logger.error(`authVerify failed ${error}`)
		// 返回错误响应
		return {
			status: 'default',
			actualStatus: 500,  // 从错误中获取状态码
			body: {
				code: -1,
				message: `authVerify failed: ${error}`,
			}
		};
	}
}


const api: t.AuthApi = {
	authChallenge,
	authVerify,
}

export default api
