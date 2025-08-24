import {
    AddUserRequest,
    AddUserRequestBody,
    AddUserResponse,
    DeleteUserRequest,
    DeleteUserResponse,
    UpdateStatusRequest,
    UpdateStatusResponse,
    UpdateUserRequest,
    UpdateUserRequestBody,
    UpdateUserResponse,
    UserDetailRequest,
    UserDetailResponse,
    UserListRequest,
    UserListResponse,
    UserRoleEnum,
    UserServer,
    UserState,
    UserStatusEnum
} from '../yeying/api/user/user'
import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from '@grpc/grpc-js'
import { SingletonLogger } from '../domain/facade/logger'
import { ResponseCodeEnum } from '../yeying/api/common/code'
import { Authenticate } from '../common/authenticate'
import { Logger } from 'winston'
import { createResponseStatus, createSuccessStatus } from './model/common'
import { UserService } from '../domain/service/user'
import { convertUserMetadataFrom, convertUserMetadataTo, convertUserStateFrom, convertUserStateTo, createAddUserResponse, createDeleteUserResponse, createUpdateUserResponse, createUserDetailResponse, verifyUserMetadata } from './model/user'
import { getCurrentUtcString } from '../common/date'
import { convertUserTo } from '../domain/model/user'
const loggerSymbol = Symbol('logger')
const authenticateSymbol = Symbol('authenticate')
const userServiceSymbol = Symbol('userService')
export class UserServerImpl implements UserServer {
    [name: string]: UntypedHandleCall

    private [loggerSymbol]: Logger
    private [authenticateSymbol]: Authenticate
    private [userServiceSymbol]: UserService
    constructor(authenticate: Authenticate) {
        this[authenticateSymbol] = authenticate
        this[loggerSymbol] = SingletonLogger.get()
        this[userServiceSymbol] = new UserService()
    }
    list: handleUnaryCall<UserListRequest, UserListResponse>
    updateStatus: handleUnaryCall<UpdateStatusRequest, UpdateStatusResponse>

    async add(
        call: ServerUnaryCall<AddUserRequest, AddUserResponse>,
        callback: sendUnaryData<AddUserResponse>
    ): Promise<void> {
        this[loggerSymbol].info(
            `AddUser user, request=${JSON.stringify(call.request)}, metadata=${JSON.stringify(call.metadata)}`
        )
        const req = call.request
        try {
            await this[authenticateSymbol].verifyHeader(req.header, AddUserRequestBody.encode(req.body).finish())
        } catch (err) {
            this[loggerSymbol].error(`Fail to verify for adding user=${req.header.did}`, err)
            return callback(null, await createAddUserResponse(this[authenticateSymbol], err.status))
        }

        try {
            const passed = await verifyUserMetadata(this[loggerSymbol], req.body.user, req.header.did)
            if (!passed) {
                return callback(
                    null,
                    await createAddUserResponse(this[authenticateSymbol], 
                        createResponseStatus(ResponseCodeEnum.INVALID_ARGUMENT, 'invalid signature')
                    )
                )
            }

            const existing = await this[userServiceSymbol].getUser(req.body.user.did)
            if (existing) {
                return callback(
                    null,
                    await createAddUserResponse(this[authenticateSymbol], 
                        createResponseStatus(ResponseCodeEnum.ALREADY_EXISTS),
                        convertUserMetadataFrom(existing)
                    )
                )
            }

            const userState = UserState.create({
                owner: this[authenticateSymbol].getDid(),
                did: req.body.user.did,
                status: UserStatusEnum.USER_STATUS_AUDIT,
                role: UserRoleEnum.USER_ROLE_NORMAL,
                createdAt: getCurrentUtcString(),
                updatedAt: getCurrentUtcString()
            })

            userState.signature = await this[authenticateSymbol].signData(UserState.encode(userState).finish())

            await this[userServiceSymbol].saveUser(convertUserMetadataTo(req.body.user))
            await this[userServiceSymbol].saveState(convertUserStateTo(userState))
            return callback(null, await createAddUserResponse(this[authenticateSymbol], createSuccessStatus(), req.body.user))
        } catch (err) {
            this[loggerSymbol].error(`Fail to insert new user=${req.header.did}`, err)
            return callback(
                null,
                await createAddUserResponse(this[authenticateSymbol], createResponseStatus(ResponseCodeEnum.UNKNOWN_ERROR))
            )
        }
    }

    async delete(
        call: ServerUnaryCall<DeleteUserRequest, DeleteUserResponse>,
        callback: sendUnaryData<DeleteUserResponse>
    ): Promise<void> {
        const req = call.request
        this[loggerSymbol].info(`DeleteUser user, request=${JSON.stringify(req)}, metadata=${JSON.stringify(call.metadata)}`)

        try {
            await this[authenticateSymbol].verifyHeader(req.header)
        } catch (err) {
            this[loggerSymbol].info(`Fail to verify request=${req.header.did} for deleting user`, err)
            return callback(null, await createDeleteUserResponse(this[authenticateSymbol], err.status))
        }
        try {
            await this[userServiceSymbol].del(req.header.did)
            return callback(null, await createDeleteUserResponse(this[authenticateSymbol], createSuccessStatus()))
        } catch (err) {
            return callback(
                null,
                await createDeleteUserResponse(this[authenticateSymbol], createResponseStatus(ResponseCodeEnum.UNKNOWN_ERROR))
            )
        }
    }

    async detail(
        call: ServerUnaryCall<UserDetailRequest, UserDetailResponse>,
        callback: sendUnaryData<UserDetailResponse>
    ): Promise<void> {
        this[loggerSymbol].info(
            `GetUser user, request=${JSON.stringify(call.request)}, metadata=${JSON.stringify(call.metadata)}`
        )
        const req = call.request
        try {
            await this[authenticateSymbol].verifyHeader(req.header)
        } catch (err) {
            this[loggerSymbol].info(`Fail to verify for getting user=${req.header.did}`, err)
            return callback(null, await createUserDetailResponse(this[authenticateSymbol], err.status))
        }

        try {
            const user = await this[userServiceSymbol].getUser(req.header.did)
            if (user === undefined) {
                return callback(
                    null,
                    await createUserDetailResponse(this[authenticateSymbol], createResponseStatus(ResponseCodeEnum.NOT_FOUND))
                )
            }

            const state = await this[userServiceSymbol].getState(req.header.did)
            return callback(
                null,
                await createUserDetailResponse(this[authenticateSymbol], 
                    createSuccessStatus(),
                    convertUserMetadataFrom(user),
                    convertUserStateFrom(state)
                )
            )
        } catch (err) {
            this[loggerSymbol].info(`Fail to query user=${req.header.did}`, err)
            return callback(null, await createUserDetailResponse(this[authenticateSymbol], err.status))
        }
    }

    async update(
        call: ServerUnaryCall<UpdateUserRequest, UpdateUserResponse>,
        callback: sendUnaryData<UpdateUserResponse>
    ): Promise<void> {
        const req = call.request
        this[loggerSymbol].info(`Modify user, request=${JSON.stringify(req)}, metadata=${JSON.stringify(call.metadata)}`)
        try {
            await this[authenticateSymbol].verifyHeader(req.header, UpdateUserRequestBody.encode(req.body).finish())
        } catch (err) {
            this[loggerSymbol].info(`Fail to verify request=${req.header.did} for modifying user`, err)
            return callback(null, await createUpdateUserResponse(this[authenticateSymbol], err.status))
        }

        try {
            const user = req.body.user
            const passed = await verifyUserMetadata(this[loggerSymbol], user, req.header.did)
            if (!passed) {
                return callback(
                    null,
                    await createUpdateUserResponse(this[authenticateSymbol], 
                        createResponseStatus(ResponseCodeEnum.INVALID_ARGUMENT, 'invalid signature')
                    )
                )
            }

            await this[userServiceSymbol].saveUser(convertUserTo(user))
            return callback(null, await createUpdateUserResponse(this[authenticateSymbol], createSuccessStatus(), user))
        } catch (err) {
            this[loggerSymbol].error(`Fail to update user=${req.header.did}`, err)
            return callback(
                null,
                await createUpdateUserResponse(this[authenticateSymbol], 
                    createResponseStatus(ResponseCodeEnum.INVALID_ARGUMENT, 'invalid parameter')
                )
            )
        }
    }
}
