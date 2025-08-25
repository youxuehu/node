import {
    ApplicationDetailRequest,
    ApplicationDetailRequestBody,
    ApplicationDetailResponse,
    ApplicationServer,
    CreateApplicationRequest,
    CreateApplicationRequestBody,
    CreateApplicationResponse,
    DeleteApplicationRequest,
    DeleteApplicationRequestBody,
    DeleteApplicationResponse,
    SearchApplicationRequest,
    SearchApplicationRequestBody,
    SearchApplicationResponse,
} from '../yeying/api/application/application'
import {sendUnaryData, ServerUnaryCall, UntypedHandleCall} from '@grpc/grpc-js'
import {Authenticate} from '../common/authenticate'
import {Logger} from 'winston'
import {SingletonLogger} from '../domain/facade/logger'
import {ApplicationService} from '../domain/service/application'
import {SearchCondition} from '../domain/model/application'
import {
    applicationDetailResponse,
    convertApplicationCodeTo,
    convertApplicationMetadataFrom,
    convertApplicationMetadataTo,
    createApplicationResponse,
    deleteApplicationResponse,
    searchApplicationResponse,
    verifyApplicationMetadata
} from './model/application'
import {
    createAlreadyExistStatus,
    createNoPermissionStatus,
    createResponseStatus,
    createSuccessStatus,
    notExistStatus
} from './model/common'
import {ResponseCodeEnum} from '../yeying/api/common/code'
const loggerSymbol = Symbol('logger')
const authenticateSymbol = Symbol('authenticate')
const applicationServiceSymbol = Symbol('applicationService')
export class ApplicationServerImpl implements ApplicationServer {
    [name: string]: UntypedHandleCall

    private [loggerSymbol]: Logger
    private [authenticateSymbol]: Authenticate
    private [applicationServiceSymbol]: ApplicationService
    constructor(authenticate: Authenticate) {
        this[authenticateSymbol] = authenticate
        this[loggerSymbol] = SingletonLogger.get()
        this[applicationServiceSymbol] = new ApplicationService()
    }

    /**
     * 查看应用详情
     * @param call 
     * @param callback 
     * @returns 
     */
    async detail(
        call: ServerUnaryCall<ApplicationDetailRequest, ApplicationDetailResponse>,
        callback: sendUnaryData<ApplicationDetailResponse>
    ) {
        const req = call.request
        const did = req.body.did
        const version = req.body.version
        this[loggerSymbol].info(`detail app, request=${JSON.stringify(req)}, metadata=${JSON.stringify(call.metadata)}`)
        try {
            await this[authenticateSymbol].verifyHeader(req.header, ApplicationDetailRequestBody.encode(req.body).finish())
        } catch (err) {
            return callback(err, await applicationDetailResponse(this[authenticateSymbol], err.status))
        }
        try {
            const applicationDetail = await this[applicationServiceSymbol].query(did, version)
            if (!applicationDetail) {
                return callback(null, await applicationDetailResponse(this[authenticateSymbol], notExistStatus()))
            }
            console.log(`detail application applicationDetail = ${applicationDetail}`)
            return callback(null, await applicationDetailResponse(this[authenticateSymbol], createSuccessStatus(), convertApplicationMetadataFrom(applicationDetail)))
        } catch (err) {
            this[loggerSymbol].info(`Fail to query app with did=${did} version=${version}`, err)
            return callback(
                err,
                await applicationDetailResponse(this[authenticateSymbol], 
                    createResponseStatus(
                        ResponseCodeEnum.INVALID_ARGUMENT,
                        `Fail to query app with did=${did} version=${version}`
                    )
                )
            )
        }
    }

    async create(
        call: ServerUnaryCall<CreateApplicationRequest, CreateApplicationResponse>,
        callback: sendUnaryData<CreateApplicationResponse>
    ) {
        const req = call.request
        this[loggerSymbol].info(
            `Create application, request=${JSON.stringify(CreateApplicationRequest.toJSON(req))}, metadata=${JSON.stringify(call.metadata)}`
        )

        try {
            await this[authenticateSymbol].verifyHeader(req.header, CreateApplicationRequestBody.encode(req.body).finish())
            await verifyApplicationMetadata(req.body.application)
        } catch (err) {
            return callback(null, await createApplicationResponse(this[authenticateSymbol], createNoPermissionStatus()))
        }

        try {
            const existing = await this[applicationServiceSymbol].query(req.body.application.did, req.body.application.version)
            if (existing) {
                return callback(null, await createApplicationResponse(this[authenticateSymbol], createAlreadyExistStatus(), convertApplicationMetadataFrom(existing)))
            }

            await this[applicationServiceSymbol].save(convertApplicationMetadataTo(req.body.application))
            return callback(null, await createApplicationResponse(this[authenticateSymbol], createSuccessStatus(), req.body.application))
        } catch (err) {
            this[loggerSymbol].error(`Fail to delete application=${JSON.stringify(CreateApplicationRequest.toJSON(req))}`, err)
            return callback(
                null,
                await createApplicationResponse(this[authenticateSymbol], 
                    createResponseStatus(ResponseCodeEnum.UNKNOWN_ERROR, 'unknown error')
                )
            )
        }
    }

    async delete(
        call: ServerUnaryCall<DeleteApplicationRequest, DeleteApplicationResponse>,
        callback: sendUnaryData<DeleteApplicationResponse>
    ) {
        const req = call.request
        this[loggerSymbol].info(
            `DeleteApplication application, request=${JSON.stringify(DeleteApplicationRequest.toJSON(req))}, metadata=${JSON.stringify(call.metadata)}`
        )

        try {
            await this[authenticateSymbol].verifyHeader(req.header, DeleteApplicationRequestBody.encode(req.body).finish())
        } catch (err) {
            return callback(null, await deleteApplicationResponse(this[authenticateSymbol], createNoPermissionStatus()))
        }

        try {
            await this[applicationServiceSymbol].delete(req.body.did, req.body.version)
            return callback(null, await deleteApplicationResponse(this[authenticateSymbol], createSuccessStatus()))
        } catch (err) {
            this[loggerSymbol].error(
                `Fail to delete applications=${req.header.did}, did=${req.body.did}, version=${req.body.version}`,
                err
            )
            return callback(
                null,
                await deleteApplicationResponse(this[authenticateSymbol], 
                    createResponseStatus(ResponseCodeEnum.UNKNOWN_ERROR, 'unknown error')
                )
            )
        }
    }

    async search(
        call: ServerUnaryCall<SearchApplicationRequest, SearchApplicationResponse>,
        callback: sendUnaryData<SearchApplicationResponse>
    ) {
        const req = call.request
        this[loggerSymbol].info(
            `Search application, request=${JSON.stringify(req)}, metadata=${JSON.stringify(call.metadata)}`
        )
        try {
            await this[authenticateSymbol].verifyHeader(req.header, SearchApplicationRequestBody.encode(req.body).finish())
        } catch (err) {
            return callback(null, await searchApplicationResponse(this[authenticateSymbol], err.status))
        }

        const condition: SearchCondition = {}
        if (req.body.condition?.code) {
            condition.code = convertApplicationCodeTo(req.body.condition?.code)
        }

        if (req.body.condition?.owner) {
            condition.owner = req.body.condition?.owner
        }

        if (req.body.condition?.name) {
            condition.name = req.body.condition?.name
        }

        if (req.body.condition?.keyword) {
            condition.keyword = req.body.condition?.keyword
        }

        try {
            const result = await this[applicationServiceSymbol].search(condition, req.body.page.page, req.body.page.pageSize)
            return callback(null, await searchApplicationResponse(this[authenticateSymbol], createSuccessStatus(), result))
        } catch (err) {
            this[loggerSymbol].error(`Fail to search applications=${req.header.did}, condition=${condition}`, err)
            return callback(
                null,
                await searchApplicationResponse(this[authenticateSymbol], 
                    createResponseStatus(ResponseCodeEnum.UNKNOWN_ERROR, 'unknown error')
                )
            )
        }
    }
}
