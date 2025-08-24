import crypto from 'crypto'
import { CipherTypeEnum } from '../yeying/api/common/code'

export function generateIv(len = 12): Uint8Array {
    return crypto.getRandomValues(new Uint8Array(len))
}

export async function computeHash(content: Uint8Array): Promise<Uint8Array> {
    return new Uint8Array(await crypto.subtle.digest('SHA-256', content))
}

export function convertToAlgorithmName(type: CipherTypeEnum): string {
    switch (type) {
        case CipherTypeEnum.CIPHER_TYPE_AES_GCM_256:
            return 'AES-GCM'
        default:
            return 'AES-GCM'
    }
}

export function convertCipherTypeFrom(type: string) {
    const v = CipherTypeEnum[type as keyof typeof CipherTypeEnum]
    return v !== undefined ? v : CipherTypeEnum.CIPHER_TYPE_UNKNOWN
}

export function convertCipherTypeTo(type: CipherTypeEnum) {
    return CipherTypeEnum[type] || CipherTypeEnum[CipherTypeEnum.CIPHER_TYPE_UNKNOWN]
}

export async function deriveRawKeyFromString(algorithmName: string, content: string): Promise<CryptoKey> {
    const hashBytes = await computeHash(new TextEncoder().encode(content))
    return crypto.subtle.importKey('raw', hashBytes, algorithmName, false, ['encrypt', 'decrypt'])
}

export async function encrypt(
    name: string,
    key: CryptoKey,
    iv: Uint8Array,
    content: Uint8Array | ArrayBuffer
): Promise<ArrayBuffer> {
    return await crypto.subtle.encrypt({ name: name, iv: iv }, key, content)
}

export async function decrypt(
    name: string,
    key: CryptoKey,
    iv: Uint8Array,
    content: Uint8Array | ArrayBuffer
): Promise<ArrayBuffer> {
    return await crypto.subtle.decrypt({ name: name, iv: iv }, key, content)
}
