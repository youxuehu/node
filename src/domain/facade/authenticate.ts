import { Authenticate } from '../../common/authenticate'
import { ServiceMetadata } from '../../yeying/api/common/model'

export class SingletonAuthenticate {
    private static authenticate: Authenticate
    static set(authenticate: Authenticate) {
        SingletonAuthenticate.authenticate = authenticate
    }

    static get() {
        return SingletonAuthenticate.authenticate
    }
}

export class SingletonService {
    private static service: ServiceMetadata
    static set(service: ServiceMetadata) {
        SingletonService.service = service
    }

    static get() {
        return SingletonService.service
    }
}