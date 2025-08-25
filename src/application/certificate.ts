import {
    CertificateServer,
    GetRequest,
    GetResponse,
    SignRequest,
    SignRequestBody,
    SignResponse
} from '../yeying/api/certificate/certificate'
import { sendUnaryData, ServerUnaryCall, UntypedHandleCall } from '@grpc/grpc-js'
import { Authenticate } from '../common/authenticate'
import { Logger } from 'winston'
import { SingletonLogger } from '../domain/facade/logger'
import { CertificateService } from '../domain/service/certificate'
const loggerSymbol = Symbol('logger')
const authenticateSymbol = Symbol('authenticate')
const certificateServiceSymbol = Symbol('certificateService')
export class CertificateServerImpl implements CertificateServer {
    [name: string]: UntypedHandleCall

    private [loggerSymbol]: Logger
    private [authenticateSymbol]: Authenticate
    private [certificateServiceSymbol]: CertificateService
    constructor(authenticate: Authenticate) {
        this[authenticateSymbol] = authenticate
        this[loggerSymbol] = SingletonLogger.get()
        this[certificateServiceSymbol] = new CertificateService()
    }

    get(call: ServerUnaryCall<GetRequest, GetResponse>, callback: sendUnaryData<GetResponse>): void {}

    async sign(call: ServerUnaryCall<SignRequest, SignResponse>, callback: sendUnaryData<SignResponse>) {
        const req = call.request
        this[loggerSymbol].info(`Sign certificate, request=${JSON.stringify(req)}`)
        try {
            await this[authenticateSymbol].verifyHeader(req.header, SignRequestBody.encode(req.body).finish())
        } catch (err) {
            //return callback(null, this.createSignResponse(method, err.status))
        }
    }
}
