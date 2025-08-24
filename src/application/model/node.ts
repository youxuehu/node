import { Authenticate } from "../../common/authenticate"
import { ResponseStatus } from "../../yeying/api/common/message"
import { HealthCheckResponse, HealthCheckResponseBody } from "../../yeying/api/node/node"


export async function  createHealthCheckResponse(authenticate: Authenticate, status: ResponseStatus) {
    const body = HealthCheckResponseBody.create({ status: status })
    return HealthCheckResponse.create({
        header: await authenticate.createHeader(HealthCheckResponseBody.encode(body).finish()),
        body: body
    })
}
