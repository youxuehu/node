import { ResponseStatus } from '../yeying/api/common/message'

export class RequestException extends Error {
    status: ResponseStatus
    constructor(status: ResponseStatus) {
        super(status.message)
        this.name = 'RequestException'
        this.status = status
    }
}

class InvalidIdentity extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'InvalidIdentity'
    }
}
