import * as t from '../api/mail/types'
import { Api } from '../models'

async function mailSend(request: Api.MailSendMailRequest): Promise<t.MailSendResponse> {
	throw 'Unimplemented'
}

async function mailVerify(request: Api.MailVerifyMailRequest): Promise<t.MailVerifyResponse> {
	throw 'Unimplemented'
}


const api: t.MailApi = {
	mailSend,
	mailVerify,
}

export default api
