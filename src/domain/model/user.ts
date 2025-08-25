import { UserDO, UserStateDO } from '../mapper/entity'

export interface User {
    name: string
    did: string
    avatar: string
    createdAt: string
    updatedAt: string
    signature: string
}

export interface UserState {
    did: string
    role: string
    createdAt: string
    updatedAt: string
    status: string
    signature: string
}

export function convertUserStateTo(userState: Partial<UserState>): UserStateDO {
    const userStateDO = new UserStateDO()
    
    // 使用类型守卫或默认值来处理可能的 undefined 值
    if (userState.did !== undefined) userStateDO.did = userState.did
    if (userState.role !== undefined) userStateDO.role = userState.role
    if (userState.status !== undefined) userStateDO.status = userState.status
    if (userState.signature !== undefined) userStateDO.signature = userState.signature
    if (userState.createdAt !== undefined) userStateDO.createdAt = userState.createdAt
    if (userState.updatedAt !== undefined) userStateDO.updatedAt = userState.updatedAt
    
    return userStateDO
}

export function convertUserStateFrom(userStateDO: UserStateDO|null): UserState|null {
        // 如果 userDO 为 null，直接返回 null
    if (!userStateDO) {
        return null;
    }
    return {
        did: userStateDO.did,
        role: userStateDO.role,
        status: userStateDO.status,
        createdAt: userStateDO.createdAt,
        updatedAt: userStateDO.updatedAt,
        signature: userStateDO.signature
    }
}

export function convertUserTo(user: Partial<User>): UserDO {
    const userDO = new UserDO()
    
    // 同样处理 User 转换中的可能 undefined 值
    if (user.name !== undefined) userDO.name = user.name
    if (user.did !== undefined) userDO.did = user.did
    if (user.avatar !== undefined) userDO.avatar = user.avatar
    if (user.signature !== undefined) userDO.signature = user.signature
    if (user.createdAt !== undefined) userDO.createdAt = user.createdAt
    if (user.updatedAt !== undefined) userDO.updatedAt = user.updatedAt
    
    return userDO
}

export function convertUserFrom(userDO: UserDO | null): User | null {
    // 如果 userDO 为 null，直接返回 null
    if (!userDO) {
        return null;
    }
    
    return {
        name: userDO.name,
        did: userDO.did,
        avatar: userDO.avatar,
        createdAt: userDO.createdAt,
        updatedAt: userDO.updatedAt,
        signature: userDO.signature
    };
}