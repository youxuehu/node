import { Logger } from 'winston'
import { SingletonLogger } from '../facade/logger'
import { CertificateManager } from '../manager/certificate'

export class CertificateService {
    private logger: Logger = SingletonLogger.get()
    private certificateManager: CertificateManager

    constructor() {
        this.certificateManager = new CertificateManager()
    }
}
