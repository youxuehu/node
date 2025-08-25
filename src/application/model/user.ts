import { UserMetadata, UserRoleEnum, UserState as StateMetadata, UserStatusEnum, UserDetail, UserDetailResponseBody, UserDetailResponse, AddUserResponseBody, AddUserResponse, DeleteUserResponseBody, DeleteUserResponse, UpdateUserResponseBody, UpdateUserResponse } from '../../yeying/api/user/user'
import { User, UserState } from '../../domain/model/user'
import { Authenticate } from '../../common/authenticate'
import { ResponseStatus } from '../../yeying/api/common/message'
import { Logger } from 'winston'

export function convertUserRoleFrom(role: string) {
    const v = UserRoleEnum[role as keyof typeof UserRoleEnum]
    return v !== undefined ? v : UserRoleEnum.USER_ROLE_UNKNOWN
}

export function convertUserRoleTo(role: UserRoleEnum) {
    return UserRoleEnum[role] || UserRoleEnum[UserRoleEnum.USER_ROLE_UNKNOWN]
}

export function convertUserStatusTo(status: UserStatusEnum) {
    return UserStatusEnum[status] || UserStatusEnum[UserStatusEnum.USER_STATUS_UNKNOWN]
}

export function convertUserStatusFrom(status: string) {
    const v = UserStatusEnum[status as keyof typeof UserStatusEnum]
    return v !== undefined ? v : UserStatusEnum.USER_STATUS_UNKNOWN
}

export function convertUserMetadataFrom(user: User): UserMetadata {
    return UserMetadata.create({
        name: user.name,
        did: user.did,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        signature: user.signature
    })
}

export function convertUserMetadataTo(user: UserMetadata): User {
    return {
        name: user.name,
        did: user.did,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        signature: user.signature
    }
}

export function convertUserStateFrom(state: UserState): StateMetadata {
    return StateMetadata.create({
        role: convertUserRoleFrom(state.role),
        did: state.did,
        status: convertUserStatusFrom(state.status),
        createdAt: state.createdAt,
        updatedAt: state.updatedAt,
        signature: state.signature
    })
}

export function convertUserStateTo(state: StateMetadata): UserState {
    return {
        role: convertUserRoleTo(state.role),
        did: state.did,
        status: convertUserStatusTo(state.status),
        createdAt: state.createdAt,
        updatedAt: state.updatedAt,
        signature: state.signature
    }
}


export async function verifyUserMetadata(log: Logger, user: UserMetadata, did: string) {
    if (did !== user.did) {
        log.warning(`user=${user.did}, authentication=${did}`)
        return false
    }

    const signature = user.signature
    try {
        user.signature = ''
        return await Authenticate.verifyData(did, UserMetadata.encode(user).finish(), signature)
    } finally {
        user.signature = signature
    }
}

export async function createUserDetailResponse(authenticate: Authenticate, status: ResponseStatus, user?: UserMetadata, state?: StateMetadata) {
    const detail = UserDetail.create({ user: user, state: state })
    const body = UserDetailResponseBody.create({ status: status, detail: detail })
    return UserDetailResponse.create({
        header: await authenticate.createHeader(UserDetailResponseBody.encode(body).finish()),
        body: body
    })
}

export async function createAddUserResponse(authenticate: Authenticate, status: ResponseStatus, user?: UserMetadata) {
    const body = AddUserResponseBody.create({ status: status, user: user })
    return AddUserResponse.create({
        header: await authenticate.createHeader(AddUserResponseBody.encode(body).finish()),
        body: body
    })
}

export async function createDeleteUserResponse(authenticate: Authenticate, status: ResponseStatus) {
    const body = DeleteUserResponseBody.create({ status: status })
    return DeleteUserResponse.create({
        header: await authenticate.createHeader(DeleteUserResponseBody.encode(body).finish()),
        body: body
    })
}

export async function createUpdateUserResponse(authenticate: Authenticate, status: ResponseStatus, user?: UserMetadata) {
    const body = UpdateUserResponseBody.create({ status: status, user: user })
    return UpdateUserResponse.create({
        header: await authenticate.createHeader(UpdateUserResponseBody.encode(body).finish()),
        body: body
    })
}