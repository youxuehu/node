import {
    HealthCheckRequest,
    HealthCheckResponse,
    NodeServer,
    WhoamiRequest,
    WhoamiResponse,
    WhoamiResponseBody
} from '../yeying/api/node/node'
import { sendUnaryData, ServerUnaryCall, UntypedHandleCall } from '@grpc/grpc-js'
import { Authenticate } from '../common/authenticate'
import { Logger } from 'winston'
import { SingletonLogger } from '../domain/facade/logger'
import { createSuccessStatus } from './model/common'
import { ServiceMetadata } from '../yeying/api/common/model'
import { createHealthCheckResponse } from './model/node'
const loggerSymbol = Symbol('logger')
const authenticateSymbol = Symbol('authenticate')
const serviceSymbol = Symbol('service')
export class NodeServerImpl implements NodeServer {
    [name: string]: UntypedHandleCall

    private [loggerSymbol]: Logger
    private [authenticateSymbol]: Authenticate
    private [serviceSymbol]: ServiceMetadata

    constructor(authenticate: Authenticate, service: ServiceMetadata) {
        this[authenticateSymbol] = authenticate
        this[loggerSymbol] = SingletonLogger.get()
        this[serviceSymbol] = service
    }

    async healthCheck(
        call: ServerUnaryCall<HealthCheckRequest, HealthCheckResponse>,
        callback: sendUnaryData<HealthCheckResponse>
    ) {
        const req = call.request
        this[loggerSymbol].info(`Health check, header=${JSON.stringify(req.header)}`)
        try {
            await this[authenticateSymbol].verifyHeader(req.header)
        } catch (err) {
            return callback(null, await createHealthCheckResponse(this[authenticateSymbol], err.status))
        }
        return callback(null, await createHealthCheckResponse(this[authenticateSymbol], createSuccessStatus()))
    }

    async whoami(call: ServerUnaryCall<WhoamiRequest, WhoamiResponse>, callback: sendUnaryData<WhoamiResponse>) {
        const req = call.request
        this[loggerSymbol].info(`whoami, header=${JSON.stringify(req.header)}`)

        const body = WhoamiResponseBody.create({ status: createSuccessStatus(), service: this.service })
        const response = WhoamiResponse.create({
            header: await this[authenticateSymbol].createHeader(WhoamiResponseBody.encode(body).finish()),
            body: body
        })
        callback(null, response)
    }
}
