import {
    CreateInvitationRequest,
    CreateInvitationRequestBody,
    CreateInvitationResponse,
    InvitationDetailRequest,
    InvitationDetailResponse,
    InvitationServer,
    SearchInvitationRequest,
    SearchInvitationResponse
} from '../yeying/api/invitation/invitation'
import { sendUnaryData, ServerUnaryCall, UntypedHandleCall } from '@grpc/grpc-js'
import { Authenticate } from '../common/authenticate'
import { Logger } from 'winston'
import { SingletonLogger } from '../domain/facade/logger'
import { InvitationService } from '../domain/service/invitation'
import { convertInvitationMetadataTo, createInvitationResponse } from './model/invitation'
import { createResponseStatus, createSuccessStatus } from './model/common'
import { ResponseCodeEnum } from '../yeying/api/common/code'
const loggerSymbol = Symbol('logger')
const authenticateSymbol = Symbol('authenticate')
const invitationServiceSymbol = Symbol('invitationService')
export class InvitationServerImpl implements InvitationServer {
    [name: string]: UntypedHandleCall

    private [loggerSymbol]: Logger
    private [authenticateSymbol]: Authenticate
    private [invitationServiceSymbol]: InvitationService
    constructor(authenticate: Authenticate) {
        this[authenticateSymbol] = authenticate
        this[loggerSymbol] = SingletonLogger.get()
        this[invitationServiceSymbol] = new InvitationService()
    }

    detail(
        call: ServerUnaryCall<InvitationDetailRequest, InvitationDetailResponse>,
        callback: sendUnaryData<InvitationDetailResponse>
    ): void {}

    search(
        call: ServerUnaryCall<SearchInvitationRequest, SearchInvitationResponse>,
        callback: sendUnaryData<SearchInvitationResponse>
    ): void {}

    async create(
        call: ServerUnaryCall<CreateInvitationRequest, CreateInvitationResponse>,
        callback: sendUnaryData<CreateInvitationResponse>
    ) {
        const req = call.request
        this[loggerSymbol].info(`Create invitation, request=${req}, metadata=${JSON.stringify(call.metadata)}`)
        try {
            await this[authenticateSymbol].verifyHeader(req.header, CreateInvitationRequestBody.encode(req.body).finish())
        } catch (err) {
            this[loggerSymbol].info(`Fail to verify request=${req.header.did} for creating invitation`, err)
            return callback(err, await createInvitationResponse(this[authenticateSymbol], err.status))
        }
        try {
            await this[invitationServiceSymbol].create(convertInvitationMetadataTo(req.body.invitation))
            return callback(null, await createInvitationResponse(this[authenticateSymbol], createSuccessStatus(), req.body.invitation))
        } catch (err) {
            this[loggerSymbol].error(`Fail to insert invitation=${req.header.did}`, err)
            return callback(
                err,
                await createInvitationResponse(this[authenticateSymbol], createResponseStatus(ResponseCodeEnum.UNKNOWN_ERROR))
            )
        }
    }
}
