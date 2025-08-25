import { Authenticate } from '../../common/authenticate'

export class SingletonAuthenticate {
    private static authenticate: Authenticate
    static set(authenticate: Authenticate) {
        SingletonAuthenticate.authenticate = authenticate
    }

    static get() {
        return SingletonAuthenticate.authenticate
    }
}
