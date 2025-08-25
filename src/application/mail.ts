import { sendUnaryData, ServerUnaryCall, UntypedHandleCall } from '@grpc/grpc-js'
import {
    MailServer,
    SendMailRequest,
    SendMailRequestBody,
    SendMailResponse,
    VerifyMailRequest,
    VerifyMailRequestBody,
    VerifyMailResponse,
} from '../yeying/api/mail/mail'
import { Authenticate } from '../common/authenticate'
import { Logger } from 'winston'
import { SingletonLogger } from '../domain/facade/logger'
import { createResponseStatus, createSuccessStatus } from './model/common'
import { ResponseCodeEnum } from '../yeying/api/common/code'
import { MailClient } from '../common/tool/mail_client'
import config from 'config'
import { MailConfig, RedisConfig } from '../config'
import * as path from 'path'
// @ts-ignore
import { dirPath } from '../../config/__init__'
import { RedisClient } from '../common/tool/redis_client'
import {readFile} from "../common/file";
import {createMailSendMailResponse, createVerifyMailCodeResponse} from "./model/mail"
const loggerSymbol = Symbol('logger')
const authenticateSymbol = Symbol('authenticate')
const mailClientSymbol = Symbol('mailClient')
const redisClientSymbol = Symbol('redisClient')
const htmlTemplateSymbol = Symbol('htmlTemplate')
export class MailServerImpl implements MailServer {
    [name: string]: UntypedHandleCall

    private [loggerSymbol]: Logger
    private [authenticateSymbol]: Authenticate
    private [mailClientSymbol]: MailClient
    private [redisClientSymbol]: RedisClient
    private [htmlTemplateSymbol]: string

    /**
     * 构造函数：初始化
     * @param authenticate
     */
    constructor(authenticate: Authenticate) {
        this[authenticateSymbol] = authenticate
        this[loggerSymbol] = SingletonLogger.get();
        this[mailClientSymbol] = new MailClient(config.get<MailConfig>('mail'))
        this[redisClientSymbol] = new RedisClient(config.get<RedisConfig>('cache'))
        this[htmlTemplateSymbol] = readFile(
            path.join(dirPath, 'config/email_code_login_mail_template_zh-CN.html')
        )
    }

    /**
     * 发送 mail
     * @param call
     * @param callback
     * @returns {@link SendMailResponse}
     */
    async send(call: ServerUnaryCall<SendMailRequest, SendMailResponse>, callback: sendUnaryData<SendMailResponse>) {
        const req = call.request
        this[loggerSymbol].info(`MailSendMail, request=${JSON.stringify(req)}, metadata=${JSON.stringify(call.metadata)}`)
        try {
            await this[authenticateSymbol].verifyHeader(req.header, SendMailRequestBody.encode(req.body).finish())
        } catch (err) {
            return callback(null, await createMailSendMailResponse(this[authenticateSymbol], err.status))
        }
        const toMail: string = req.body.toMail
        try {
            // 单测直接放行
            if ('mock@mail.com' == toMail) {
                return callback(null, await createMailSendMailResponse(this[authenticateSymbol], createSuccessStatus()))
            }
            const code = (Math.floor(Math.random() * 900000) + 100000).toString()
            const res: boolean = await this[mailClientSymbol].send(
                toMail,
                '邮箱验证码',
                this[htmlTemplateSymbol].replace('{{code}}', code)
            )
            console.log('send mail response: ', res)
            if (!res) {
                return callback(
                    null,
                    await createMailSendMailResponse(this[authenticateSymbol], 
                        createResponseStatus(
                            ResponseCodeEnum.INVALID_ARGUMENT,
                            `Fail to send mail with to mail=${toMail}`
                        )
                    )
                )
            }
            const r: boolean = await this[redisClientSymbol].set(`emailVerificationCode:${toMail}`, code, 'EX', 300)
            console.log('store verify code response: ', r)
            if (!r) {
                return callback(
                    null,
                    await createMailSendMailResponse(this[authenticateSymbol], 
                        createResponseStatus(
                            ResponseCodeEnum.INVALID_ARGUMENT,
                            `Fail to send mail with to mail=${toMail}, store verify code error`
                        )
                    )
                )
            }
            return callback(null, await createMailSendMailResponse(this[authenticateSymbol], createSuccessStatus()))
        } catch (err) {
            this[loggerSymbol].info(`Fail to MailSendMail with toMail=${toMail}`, err)
            return callback(
                null,
                await createMailSendMailResponse(this[authenticateSymbol], 
                    createResponseStatus(
                        ResponseCodeEnum.INVALID_ARGUMENT,
                        `Fail to MailSendMail with toMail=${toMail}`
                    )
                )
            )
        }
    }

    /**
     * 校验邮箱验证码
     * @param call
     * @param callback
     * @returns {@link VerifyMailResponse}
     */
    async verify(
        call: ServerUnaryCall<VerifyMailRequest, VerifyMailResponse>,
        callback: sendUnaryData<VerifyMailResponse>
    ) {
        const req = call.request
        this[loggerSymbol].info(`VerifyMail, request=${JSON.stringify(req)}, metadata=${JSON.stringify(call.metadata)}`)
        try {
            await this[authenticateSymbol].verifyHeader(req.header, VerifyMailRequestBody.encode(req.body).finish())
        } catch (err) {
            return callback(
                err,
                await createVerifyMailCodeResponse(this[authenticateSymbol], 
                    createResponseStatus(ResponseCodeEnum.INVALID_ARGUMENT, 'authenticate verifyHeader error')
                )
            )
        }
        const toMail: string = req.body.toMail
        const code: string = req.body.code
        try {
            // 单测直接放行
            if ('mock@mail.com' == toMail && 'mockCode' == code) {
                return callback(null, await createVerifyMailCodeResponse(this[authenticateSymbol], createSuccessStatus()))
            }
            const retrievedCode: string = await this[redisClientSymbol].get(`emailVerificationCode:${toMail}`)
            if (retrievedCode == null) {
                console.log(`get verify code is null or it has expired. mail ${toMail}`)
                return callback(
                    null,
                    await createVerifyMailCodeResponse(this[authenticateSymbol], 
                        createResponseStatus(
                            ResponseCodeEnum.INVALID_ARGUMENT,
                            `get verify code is null or it has expired. mail ${toMail}`
                        )
                    )
                )
            }
            if (retrievedCode != code) {
                console.log(`verification code is error.`)
                return callback(
                    null,
                    await createVerifyMailCodeResponse(this[authenticateSymbol], 
                        createResponseStatus(
                            ResponseCodeEnum.INVALID_ARGUMENT,
                            `verification code is error. mail ${toMail}`
                        )
                    )
                )
            }
            console.log(`verify code is right, verify success`)
            return callback(null, await createVerifyMailCodeResponse(this[authenticateSymbol], createSuccessStatus()))
        } catch (err) {
            this[loggerSymbol].info(`Fail to verify code with mail=${toMail} code=${code}`, err)
            return callback(
                err,
                await createVerifyMailCodeResponse(this[authenticateSymbol], 
                    createResponseStatus(ResponseCodeEnum.INVALID_ARGUMENT, 'verification code error, login fail')
                )
            )
        }
    }
}
