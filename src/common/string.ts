import { v4 as uuidv4 } from 'uuid'

export function trimLeft(str: string, trim: string) {
    if (str === undefined || str === null) {
        return str
    }

    return str.startsWith(trim) ? str.substring(trim.length) : str
}

export function encodeString(str: string) {
    return new TextEncoder().encode(str)
}

export function decodeString(bytes: AllowSharedBufferSource) {
    return new TextDecoder().decode(bytes)
}

export function encodeBase64(bytes: ArrayBufferLike) {
    return Buffer.from(bytes).toString('base64')
}

export function encodeHex(bytes: ArrayBufferLike) {
    return Buffer.from(bytes).toString('hex')
}

export function generateUuid() {
    return uuidv4()
}

export function decodeBase64(str: string) {
    return Buffer.from(str, 'base64')
}

export function decodeHex(str: string) {
    return Buffer.from(str, 'hex')
}

export function generateRandomString(prefix: string, length: number = 17) {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let code = prefix

    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length)
        code += chars.charAt(randomIndex)
    }

    return code
}

/**
 * 通用格式化函数，将多个基本类型拼接为一个字符串。
 * @param  {...any} args - 多个基本类型的参数。
 * @returns {Uint8Array} - 拼接后的字符串。
 */
export function concat(...args: (string | number)[]): Uint8Array {
    // 使用数组的 join 方法将参数拼接为字符串
    return new TextEncoder().encode(args.join(''))
}
