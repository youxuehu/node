 import {
    CreateServiceRequest,
    CreateServiceRequestBody,
    CreateServiceResponse,
    SearchServiceRequest,
    SearchServiceRequestBody,
    SearchServiceResponse,
    ServiceServer,
    DetailServiceRequest,
    DetailServiceResponse,
    DetailServiceRequestBody,
    DeleteServiceRequest,
    DeleteServiceResponse,
    DeleteServiceRequestBody,
} from '../yeying/api/service/service'
import {sendUnaryData, ServerUnaryCall, UntypedHandleCall} from '@grpc/grpc-js'
import {Authenticate} from '../common/authenticate'
import {Logger} from 'winston'
import {SingletonLogger} from '../domain/facade/logger'
import {ServiceService} from '../domain/service/service'
import {
    convertServiceConditionTo,
    convertServiceMetadataFrom,
    convertServiceMetadataTo,
    createCreateServiceResponse,
    createDeleteServiceResponse,
    createDetailServiceResponse,
    createSearchServiceResponse,
    verifyServiceMetadata
} from './model/service'
import {createNoPermissionStatus, createResponseStatus, createSuccessStatus} from './model/common'
import {ResponseCodeEnum} from '../yeying/api/common/code'
const loggerSymbol = Symbol('logger')
const authenticateSymbol = Symbol('authenticate')
const serviceServiceSymbol = Symbol('serviceService')
export class ServiceServerImpl implements ServiceServer {
    [name: string]: UntypedHandleCall

    private [loggerSymbol]: Logger
    private [authenticateSymbol]: Authenticate
    private [serviceServiceSymbol]: ServiceService
    constructor(authenticate: Authenticate) {
        this[authenticateSymbol] = authenticate
        this[loggerSymbol] = SingletonLogger.get()
        this[serviceServiceSymbol] = new ServiceService()
    }

    /**
     * 创建服务
     * @param call 
     * @param callback 
     * @returns 
     */
    async create(
        call: ServerUnaryCall<CreateServiceRequest, CreateServiceResponse>,
        callback: sendUnaryData<CreateServiceResponse>
    ) {
        const req = call.request
        this[loggerSymbol].info(`CreateService service, header=${JSON.stringify(req.header)}`)
        try {
            await this[authenticateSymbol].verifyHeader(req.header, CreateServiceRequestBody.encode(req.body).finish())
        } catch (err) {
            return callback(null, await createCreateServiceResponse(this[authenticateSymbol], err.status))
        }

        if (req.header.did !== req.body.service.did) {
            return callback(null, await createCreateServiceResponse(this[authenticateSymbol], createNoPermissionStatus()))
        }

        try {
            const passed = await verifyServiceMetadata(req.body.service)
            if (!passed) {
                return callback(
                    null,
                    await createCreateServiceResponse(this[authenticateSymbol], 
                        createResponseStatus(ResponseCodeEnum.INVALID_ARGUMENT, 'invalid signature')
                    )
                )
            }

            const existing = await this[serviceServiceSymbol].get(req.body.service.did, req.body.service.version)
            if (existing && existing !== null) {
                return callback(
                    null,
                    await createCreateServiceResponse(this[authenticateSymbol], 
                        createResponseStatus(ResponseCodeEnum.ALREADY_EXISTS),
                        convertServiceMetadataFrom(existing)
                    )
                )
            }

            await this[serviceServiceSymbol].add(convertServiceMetadataTo(req.body.service))
            return callback(null, await createCreateServiceResponse(this[authenticateSymbol], createSuccessStatus(), req.body.service))
        } catch (err) {
            this[loggerSymbol].error('Fail to create service!', err)
            return callback(
                null,
                await createCreateServiceResponse(this[authenticateSymbol], createResponseStatus(ResponseCodeEnum.UNKNOWN_ERROR))
            )
        }
    }

    /**
     * 服务详情
     * @param call 
     * @param callback 
     * @returns 
     */
    async detail(
        call: ServerUnaryCall<DetailServiceRequest, DetailServiceResponse>,
        callback: sendUnaryData<DetailServiceResponse>
    ) {
        const req = call.request
        this[loggerSymbol].info(`DetailService service, header=${JSON.stringify(req.header)}`)
        try {
            await this[authenticateSymbol].verifyHeader(req.header, DetailServiceRequestBody.encode(req.body).finish())
        } catch (err) {
            return callback(null, await createDetailServiceResponse(this[authenticateSymbol], err.status))
        }

        if (req.header.did !== req.body.did) {
            return callback(null, await createDetailServiceResponse(this[authenticateSymbol], createNoPermissionStatus()))
        }

        try {
            const existing = await this[serviceServiceSymbol].get(req.body.did, req.body.version)
            if (existing == null) {
                return callback(
                    null,
                    await createDetailServiceResponse(
                        this[authenticateSymbol], createResponseStatus(ResponseCodeEnum.NOT_FOUND)
                    )
                )
            }

            return callback(null, await createDetailServiceResponse(this[authenticateSymbol], createSuccessStatus(), convertServiceMetadataFrom(existing)))
        } catch (err) {
            this[loggerSymbol].error('Fail to detail service!', err)
            return callback(
                null,
                await createDetailServiceResponse(this[authenticateSymbol], createResponseStatus(ResponseCodeEnum.UNKNOWN_ERROR))
            )
        }
    }

    /**
     * 查看服务列表
     * @param call 
     * @param callback 
     * @returns 
     */
    async search(
        call: ServerUnaryCall<SearchServiceRequest, SearchServiceResponse>,
        callback: sendUnaryData<SearchServiceResponse>
    ) {
        const req = call.request
        this[loggerSymbol].info(`SearchService identity, request=${JSON.stringify(req)}`)
        try {
            await this[authenticateSymbol].verifyHeader(req.header, SearchServiceRequestBody.encode(req.body).finish())
        } catch (err) {
            this[loggerSymbol].error(`Fail to verify header for searching services`, err)
            return callback(null, await createSearchServiceResponse(this[authenticateSymbol], err.status))
        }

        try {
            const result = await this[serviceServiceSymbol].search(
                convertServiceConditionTo(req.body.condition),
                req.body.page.page,
                req.body.page.pageSize
            )
            const services = result.data.map(s => convertServiceMetadataFrom(s))
            return callback(null, await createSearchServiceResponse(this[authenticateSymbol], createSuccessStatus(), services))
        } catch (err) {
            this[loggerSymbol].error('Fail to search service!', err)
            return callback(
                null,
                await createSearchServiceResponse(this[authenticateSymbol], createResponseStatus(ResponseCodeEnum.UNKNOWN_ERROR))
            )
        }
    }

    /**
     * 删除服务
     * @param call 
     * @param callback 
     * @returns 
     */
    async delete(
        call: ServerUnaryCall<DeleteServiceRequest, DeleteServiceResponse>,
        callback: sendUnaryData<DeleteServiceResponse>
    ) {
        const req = call.request
        this[loggerSymbol].info(`Delete identity, request=${JSON.stringify(req)}`)
        try {
            await this[authenticateSymbol].verifyHeader(req.header, DeleteServiceRequestBody.encode(req.body).finish())
        } catch (err) {
            return callback(null, await createDeleteServiceResponse(this[authenticateSymbol], err.status))
        }

        try {
            await this[serviceServiceSymbol].delete(req.body.did, req.body.version)
            return callback(null, await createDeleteServiceResponse(this[authenticateSymbol], createSuccessStatus()))
        } catch (err) {
            this[loggerSymbol].error('Fail to delete service!', err)
            return callback(
                null,
                await createDeleteServiceResponse(this[authenticateSymbol], createResponseStatus(ResponseCodeEnum.UNKNOWN_ERROR))
            )
        }
    }


}
