import { Authenticate } from "../../common/authenticate"
import { ResponseStatus } from "../../yeying/api/common/message"
import { SendMailResponse, SendMailResponseBody, VerifyMailResponse, VerifyMailResponseBody } from "../../yeying/api/mail/mail"

/**
 * 邮件发送响应体
 * @param status
 * @returns SendMailResponse
 */
export async function createMailSendMailResponse(authenticate: Authenticate, status: ResponseStatus) {
    const body = SendMailResponseBody.create({ status: status })
    return SendMailResponse.create({
        header: await authenticate.createHeader(SendMailResponseBody.encode(body).finish()),
        body: body
    })
}

/**
 * 校验验证码响应体
 * @param status
 * @returns VerifyMailResponse
 */
export async function createVerifyMailCodeResponse(authenticate: Authenticate, status: ResponseStatus) {
    const body = VerifyMailResponseBody.create({ status: status })
    return VerifyMailResponse.create({
        header: await authenticate.createHeader(VerifyMailResponseBody.encode(body).finish()),
        body: body
    })
}
