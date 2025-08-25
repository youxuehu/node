import {
    BulletinListRequest,
    BulletinListRequestBody,
    BulletinListResponse,
    BulletinListResponseBody,
    BulletinServer
} from '../yeying/api/bulletin/bulletin'
import { sendUnaryData, ServerUnaryCall, UntypedHandleCall } from '@grpc/grpc-js'
import { Authenticate } from '../common/authenticate'
import { Logger } from 'winston'
import { SingletonLogger } from '../domain/facade/logger'
import { BulletinService } from '../domain/service/bulletin'
import { createSuccessStatus } from './model/common'
import { ResponseStatus } from '../yeying/api/common/message'
import { PageResult } from '../domain/model/bulletin'
import { convertSolutionMetadataFrom } from './model/bulletin'
import { LanguageCodeEnum } from '../yeying/api/common/code'
const loggerSymbol = Symbol('logger')
const authenticateSymbol = Symbol('authenticate')
const bulletinServiceSymbol = Symbol('bulletinService')
export class BulletinServerImpl implements BulletinServer {
    [name: string]: UntypedHandleCall

    private [loggerSymbol]: Logger
    private [authenticateSymbol]: Authenticate
    private [bulletinServiceSymbol]: BulletinService
    constructor(authenticate: Authenticate) {
        this[authenticateSymbol] = authenticate
        this[loggerSymbol] = SingletonLogger.get()
        this[bulletinServiceSymbol] = new BulletinService()
    }

    async list(
        call: ServerUnaryCall<BulletinListRequest, BulletinListResponse>,
        callback: sendUnaryData<BulletinListResponse>
    ) {
        const req = call.request
        this[loggerSymbol].info(`Bulletin list, request=${JSON.stringify(req)}, metadata=${JSON.stringify(call.metadata)}`)
        try {
            await this[authenticateSymbol].verifyHeader(req.header, BulletinListRequestBody.encode(req.body).finish())
        } catch (err) {
            this[loggerSymbol].info(`Fail to verify for listing solutions=${req.header.did}`, err)
            return callback(null, await this.createBulletinListResponse(err.status))
        }

        try {
            const body = req.body
            const pageResult = await this[bulletinServiceSymbol].search(
                LanguageCodeEnum[body.language],
                body.page.page,
                body.page.pageSize
            )
            const response = await this.createBulletinListResponse(createSuccessStatus(), pageResult)
            return callback(null, response)
        } catch (err) {
            this[loggerSymbol].info(`Fail to list solutions=${req.header.did}`, err)
            return callback(null, await this.createBulletinListResponse(err.status))
        }
    }

    // @ts-ignore
    async createBulletinListResponse(status: ResponseStatus, result?: PageResult) {
        const body =
            result === undefined
                ? BulletinListResponseBody.create({ status: status })
                : BulletinListResponseBody.create({
                      status: status,
                      page: result.page,
                      solutions: result.data.map((s) => convertSolutionMetadataFrom(s))
                  })

        return BulletinListResponse.create({
            header: await this[authenticateSymbol].createHeader(BulletinListResponseBody.encode(body).finish()),
            body: body
        })
    }
}
