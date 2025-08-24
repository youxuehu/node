import {
    AuditMetadata,
    AuditServer,
    AuditCancelRequest,
    AuditCancelRequestBody,
    AuditCancelResponse,
    AuditCreateRequest,
    AuditCreateRequestBody,
    AuditCreateResponse,
    AuditDetailRequest,
    AuditDetailRequestBody,
    AuditDetailResponse,
    AuditDetail,
    AuditApproveRequest,
    AuditApproveResponse,
    AuditRejectRequest,
    AuditRejectResponse,
    AuditSearchRequest,
    AuditSearchResponse,
    AuditApproveRequestBody,
    AuditSearchCondition,
    AuditSearchRequestBody,
} from '../yeying/api/audit/audit'
import {sendUnaryData, ServerUnaryCall, UntypedHandleCall} from '@grpc/grpc-js'
import {Authenticate} from '../common/authenticate'
import {Logger} from 'winston'
import {SingletonLogger} from '../domain/facade/logger'
import {
    createResponseStatus,
    createSuccessStatus,
    notExistStatus
} from './model/common'
import {ResponseCodeEnum} from '../yeying/api/common/code'
import { approveResponse, auditDetailResponse, cancelResponse, convertAuditMetadataTo, createAuditResponse, createAuditSearchResponse, rejectResponse } from './model/audit'
import { AuditService } from '../domain/service/audit'
import { convertComment } from '../domain/model/comments'
const loggerSymbol = Symbol('logger')
const authenticateSymbol = Symbol('authenticate')
const auditServiceSymbol = Symbol('auditService')
export class AuditServerImpl implements AuditServer {
    [name: string]: UntypedHandleCall

    private [loggerSymbol]: Logger;
    private [authenticateSymbol]: Authenticate
    private [auditServiceSymbol]: AuditService
    constructor(authenticate: Authenticate) {
        this[authenticateSymbol] = authenticate
        this[loggerSymbol] = SingletonLogger.get()
        this[auditServiceSymbol] = new AuditService()
    }

    /**
     * 发起申请：创建申请工单
     * @param call 
     * @param callback 
     * @returns 
     */
    async create(
        call: ServerUnaryCall<AuditCreateRequest, AuditCreateResponse>,
        callback: sendUnaryData<AuditCreateResponse>
    ) {
        const req = call.request
        const meta: AuditMetadata = req.body.meta
        this[loggerSymbol].info(`create audit, request=${JSON.stringify(req)}, metadata=${JSON.stringify(call.metadata)}`)
        try {
            await this[authenticateSymbol].verifyHeader(req.header, AuditCreateRequestBody.encode(req.body).finish())
        } catch (err) {
            return callback(err, await createAuditResponse(this[authenticateSymbol], err.status))
        }
        try {
            // 创建申请工单
            const auditMeta = await this[auditServiceSymbol].create(meta)
            const r = convertAuditMetadataTo(auditMeta)
            console.log(`create audit auditMeta = ${auditMeta}`)
            return callback(null, await createAuditResponse(this[authenticateSymbol], createSuccessStatus(), r))
        } catch (err) {
            this[loggerSymbol].info(`Fail to create audit with meta=${meta}`, err)
            return callback(
                err,
                await createAuditResponse(this[authenticateSymbol], 
                    createResponseStatus(
                        ResponseCodeEnum.INVALID_ARGUMENT,
                        `Fail to create audit with meta=${meta}`
                    )
                )
            )
        }
    }

    /**
     * 查看审批详情
     * @param call 
     * @param callback 
     * @returns 
     */
    async detail(
        call: ServerUnaryCall<AuditDetailRequest, AuditDetailResponse>,
        callback: sendUnaryData<AuditDetailResponse>
    ) {
        const req = call.request
        this[loggerSymbol].info(`detail audit, request=${JSON.stringify(req)}, metadata=${JSON.stringify(call.metadata)}`)
        try {
            await this[authenticateSymbol].verifyHeader(req.header, AuditDetailRequestBody.encode(req.body).finish())
        } catch (err) {
            return callback(err, await auditDetailResponse(this[authenticateSymbol], err.status))
        }
        try {
            const auditDetail: AuditDetail = await this[auditServiceSymbol].detail(req.body.uid)
            console.log(`detail audit auditDetail = ${auditDetail}`)
            return callback(null, await auditDetailResponse(this[authenticateSymbol], createSuccessStatus(), auditDetail))
        } catch (err) {
            this[loggerSymbol].info(`Fail to detail audit with uid=${req.body.uid}`, err)
            return callback(
                err,
                await auditDetailResponse(this[authenticateSymbol], 
                    createResponseStatus(
                        ResponseCodeEnum.INVALID_ARGUMENT,
                        `Fail to detail audit with uid=${req.body.uid}`
                    )
                )
            )
        }
    }

    /**
     * 撤销申请的应用审批流程
     * @param call 
     * @param callback 
     * @returns 
     */
    async cancel(
        call: ServerUnaryCall<AuditCancelRequest, AuditCancelResponse>,
        callback: sendUnaryData<AuditCancelResponse>
    ) {
        const req = call.request
        const uid = req.body.uid
        console.log(`uid=${uid}`)
        this[loggerSymbol].info(`cancel, request=${JSON.stringify(req)}, metadata=${JSON.stringify(call.metadata)}`)
        try {
            await this[authenticateSymbol].verifyHeader(req.header, AuditCancelRequestBody.encode(req.body).finish())
        } catch (err) {
            return callback(err, await cancelResponse(this[authenticateSymbol], err.status))
        }
        try {
            const queryAuditMeta = await this[auditServiceSymbol].queryById(req.body.uid)
            // 检查是否存在发起申请
            if (!queryAuditMeta) {
                return callback(null, await cancelResponse(this[authenticateSymbol], notExistStatus()))
            }
            const loginDid = req.header.did
            const [did, name] = queryAuditMeta.applicant.split("::")
            // 检查是否有审批权限
            // this[loggerSymbol].info(`loginDid=${loginDid}`)
            // this[loggerSymbol].info(`did=${did}`)
            // if (loginDid != did) {
            //     return callback(null, await cancelResponse(this[authenticateSymbol], createNoPermissionStatus()))
            // }
            await this[auditServiceSymbol].cancel(req.body.uid)
            return callback(null, await cancelResponse(this[authenticateSymbol], createSuccessStatus()))
        } catch (err) {
            this[loggerSymbol].info(`Fail to cancel with uid=${req.body.uid}`, err)
            return callback(
                err,
                await cancelResponse(this[authenticateSymbol], 
                    createResponseStatus(
                        ResponseCodeEnum.INVALID_ARGUMENT,
                        `Fail to cancel with uid=${req.body.uid}`
                    )
                )
            )
        }
    }

    /**
     * 同意
     * @param call 
     * @param callback 
     * @returns 
     */
    async approve(
        call: ServerUnaryCall<AuditApproveRequest, AuditApproveResponse>,
        callback: sendUnaryData<AuditApproveResponse>
    ) {
        const req = call.request
        const metadata = req.body.metadata
        console.log(`metadata=${metadata}`)
        this[loggerSymbol].info(`approve, request=${JSON.stringify(req)}, metadata=${JSON.stringify(call.metadata)}`)
        try {
            await this[authenticateSymbol].verifyHeader(req.header, AuditApproveRequestBody.encode(req.body).finish())
        } catch (err) {
            return callback(err, await approveResponse(this[authenticateSymbol], err.status))
        }
        try {
            await this[auditServiceSymbol].approve(convertComment(req.body.metadata))
            return callback(null, await approveResponse(this[authenticateSymbol], createSuccessStatus()))
        } catch (err) {
            this[loggerSymbol].info(`Fail to approve with metadata=${req.body.metadata}`, err)
            return callback(
                err,
                await approveResponse(this[authenticateSymbol], 
                    createResponseStatus(
                        ResponseCodeEnum.INVALID_ARGUMENT,
                        `Fail to approve with metadata=${req.body.metadata}`
                    )
                )
            )
        }
    }

    /**
     * 拒绝
     * @param call 
     * @param callback 
     * @returns 
     */
    async reject(
        call: ServerUnaryCall<AuditRejectRequest, AuditRejectResponse>,
        callback: sendUnaryData<AuditRejectResponse>
    ) {
        const req = call.request
        const metadata = req.body.metadata
        console.log(`metadata=${metadata}`)
        this[loggerSymbol].info(`reject, request=${JSON.stringify(req)}, metadata=${JSON.stringify(call.metadata)}`)
        try {
            await this[authenticateSymbol].verifyHeader(req.header, AuditApproveRequestBody.encode(req.body).finish())
        } catch (err) {
            return callback(err, await rejectResponse(this[authenticateSymbol], err.status))
        }
        try {
            await this[auditServiceSymbol].reject(convertComment(req.body.metadata))
            return callback(null, await rejectResponse(this[authenticateSymbol], createSuccessStatus()))
        } catch (err) {
            this[loggerSymbol].info(`Fail to reject with metadata=${req.body.metadata}`, err)
            return callback(
                err,
                await rejectResponse(this[authenticateSymbol], 
                    createResponseStatus(
                        ResponseCodeEnum.INVALID_ARGUMENT,
                        `Fail to reject with metadata=${req.body.metadata}`
                    )
                )
            )
        }
    }

    /**
     * 审计列表
     * @param call 
     * @param callback 
     * @returns 
     */
    async search(
        call: ServerUnaryCall<AuditSearchRequest, AuditSearchResponse>,
        callback: sendUnaryData<AuditSearchResponse>
    ) {
        const req = call.request
        const condition: AuditSearchCondition = req.body.condition
        let approver: string
        let name: string
        let type: string
        let applicant: string
        let startTime: string
        let endTime: string
        if (condition) {
            approver = condition.approver
            name = condition.name
            type = condition.type
            applicant = condition.applicant
            startTime = condition.startTime
            endTime = condition.endTime
        }

        console.log(`approver=${approver}`)
        console.log(`name=${name}`)
        console.log(`type=${type}`)
        console.log(`applicant=${applicant}`)
        console.log(`startTime=${startTime}`)
        console.log(`endTime=${endTime}`)
        this[loggerSymbol].info(`createList, request=${JSON.stringify(req)}, metadata=${JSON.stringify(call.metadata)}`)
        try {
            await this[authenticateSymbol].verifyHeader(req.header, AuditSearchRequestBody.encode(req.body).finish())
        } catch (err) {
            return callback(err, await createAuditSearchResponse(this[authenticateSymbol], err.status))
        }
        try {
            const res = await this[auditServiceSymbol].queryByCondition(approver, applicant, name, startTime, endTime, req.body.page.page, req.body.page.pageSize)
            console.log(`search res = ${res}`)
            return callback(null, await createAuditSearchResponse(this[authenticateSymbol], createSuccessStatus(), res))
        } catch (err) {
            this[loggerSymbol].info(`Fail to search with approver=${approver} applicant=${applicant} name=${name} type=${type} startTime=${startTime} endTime=${endTime}`, err)
            return callback(
                err,
                await createAuditSearchResponse(this[authenticateSymbol], 
                    createResponseStatus(
                        ResponseCodeEnum.INVALID_ARGUMENT,
                        `Fail to search with approver=${approver} applicant=${applicant} name=${name} type=${type} startTime=${startTime} endTime=${endTime}`
                    )
                )
            )
        }
    }

}
