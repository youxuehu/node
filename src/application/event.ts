import {
    ConsumeRequest,
    ConsumeResponse,
    EventServer,
    ProduceRequest,
    ProduceRequestBody,
    ProduceResponse
} from '../yeying/api/event/event'
import { sendUnaryData, ServerUnaryCall, UntypedHandleCall } from '@grpc/grpc-js'
import { Authenticate } from '../common/authenticate'
import { Logger } from 'winston'
import { SingletonLogger } from '../domain/facade/logger'
import { EventService } from '../domain/service/event'
const loggerSymbol = Symbol('logger')
const authenticateSymbol = Symbol('authenticate')
const eventServiceSymbol = Symbol('eventService')
export class EventServerImpl implements EventServer {
    [name: string]: UntypedHandleCall

    private [loggerSymbol]: Logger
    private [authenticateSymbol]: Authenticate
    private [eventServiceSymbol]: EventService
    constructor(authenticate: Authenticate) {
        this[authenticateSymbol] = authenticate
        this[loggerSymbol] = SingletonLogger.get()
        this[eventServiceSymbol] = new EventService()
    }

    consume(call: ServerUnaryCall<ConsumeRequest, ConsumeResponse>, callback: sendUnaryData<ConsumeResponse>): void {}

    async produce(call: ServerUnaryCall<ProduceRequest, ProduceResponse>, callback: sendUnaryData<ProduceResponse>) {
        const req = call.request
        const method = '/yeying.api.event.Event/Produce'
        this[loggerSymbol].info(`Produce event, request=${JSON.stringify(req)}`)
        try {
            await this[authenticateSymbol].verifyHeader(req.header, ProduceRequestBody.encode(req.body).finish())
        } catch (err) {
            //return callback(null, this.createProduceResponse(method, err.status))
        }
    }
}
