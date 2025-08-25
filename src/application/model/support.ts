import { Logger } from "winston"
import { Authenticate } from "../../common/authenticate"
import { ResponseStatus } from "../../yeying/api/common/message"
import { CollectSupportResponse, CollectSupportResponseBody, FaqMetadata } from "../../yeying/api/support/support"


export async function createCollectSupportResponse(authenticate: Authenticate, status: ResponseStatus) {
    const body = CollectSupportResponseBody.create({ status: status })
    return CollectSupportResponse.create({
        header: await authenticate.createHeader(CollectSupportResponseBody.encode(body).finish()),
        body: body
    })
}

export async function verifyFaqMetadata(log: Logger, faq: FaqMetadata, did: string) {
    if (did !== faq.did) {
        log.warning(`user=${faq.did}, authentication=${did} when verifying faq metadata.`)
        return false
    }

    const metadata = FaqMetadata.create({ ...faq, signature: '' })
    return await Authenticate.verifyData(did, FaqMetadata.encode(metadata).finish(), faq.signature)
}