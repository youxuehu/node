import { sendUnaryData, ServerUnaryCall, UntypedHandleCall } from '@grpc/grpc-js'
import {
    CollectSupportRequest,
    CollectSupportRequestBody,
    CollectSupportResponse,
    SupportServer
} from '../yeying/api/support/support'
import { Authenticate } from '../common/authenticate'
import { Logger } from 'winston'
import { SingletonLogger } from '../domain/facade/logger'
import { SupportService } from '../domain/service/support'
import { createResponseStatus, createSuccessStatus } from './model/common'
import { ResponseCodeEnum } from '../yeying/api/common/code'
import { createCollectSupportResponse, verifyFaqMetadata } from './model/support'
const loggerSymbol = Symbol('logger')
const authenticateSymbol = Symbol('authenticate')
const supportServiceSymbol = Symbol('supportService')
export class SupportServerImpl implements SupportServer {
    [name: string]: UntypedHandleCall

    private [loggerSymbol]: Logger
    private [authenticateSymbol]: Authenticate
    private [supportServiceSymbol]: SupportService
    constructor(authenticate: Authenticate) {
        this[authenticateSymbol] = authenticate
        this[loggerSymbol] = SingletonLogger.get()
        this[supportServiceSymbol] = new SupportService()
    }

    async collect(
        call: ServerUnaryCall<CollectSupportRequest, CollectSupportResponse>,
        callback: sendUnaryData<CollectSupportResponse>
    ) {
        const req = call.request
        this[loggerSymbol].info(
            `support for collecting, request=${JSON.stringify(req)}, metadata=${JSON.stringify(call.metadata)}`
        )
        try {
            await this[authenticateSymbol].verifyHeader(req.header, CollectSupportRequestBody.encode(req.body).finish())
        } catch (err) {
            this[loggerSymbol].info(`Fail to verify for collecting faq=${req.header.did}`, err)
            return callback(null, await createCollectSupportResponse(this[authenticateSymbol], err.status))
        }

        try {
            const faq = req.body.data.faq
            const passed = await verifyFaqMetadata(this[loggerSymbol], faq, req.header.did)
            if (!passed) {
                return callback(
                    null,
                    await createCollectSupportResponse(this[authenticateSymbol], 
                        createResponseStatus(ResponseCodeEnum.INVALID_ARGUMENT, 'invalid signature')
                    )
                )
            }

            await this[supportServiceSymbol].add(faq)
            return callback(null, await createCollectSupportResponse(this[authenticateSymbol], createSuccessStatus()))
        } catch (err) {
            this[loggerSymbol].error(`Fail to collect faq=${req.header.did}`, err)
            return callback(
                null,
                await createCollectSupportResponse(this[authenticateSymbol], 
                    createResponseStatus(ResponseCodeEnum.INVALID_ARGUMENT, 'invalid parameter')
                )
            )
        }
    }
}
