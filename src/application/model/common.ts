import { LanguageCodeEnum, ResponseCodeEnum } from '../../yeying/api/common/code'

export function convertLanguageCodeTo(code: LanguageCodeEnum) {
    return LanguageCodeEnum[code] || LanguageCodeEnum[LanguageCodeEnum.LANGUAGE_CODE_UNKNOWN]
}

export function createSuccessStatus() {
    return { code: ResponseCodeEnum.OK, message: 'success' }
}

export function createAlreadyExistStatus(message?: string) {
    return { code: ResponseCodeEnum.ALREADY_EXISTS, message: message }
}

export function notExistStatus(message?: string) {
    return { code: ResponseCodeEnum.NOT_FOUND, message: message }
}

export function createResponseStatus(code: ResponseCodeEnum, message?: string) {
    if (message === undefined) {
        message = ""
    }
    return { code: code, message: message }
}

export function createNoPermissionStatus(message?: string) {
    return { code: ResponseCodeEnum.PERMISSION_DENIED, message: message }
}