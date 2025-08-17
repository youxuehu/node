import * as t from '../api/certificate/types'
import { Api } from '../models'

async function certificateGet(request: Api.CertificateGetRequest): Promise<t.CertificateGetResponse> {
	throw 'Unimplemented'
}

async function certificateSign(request: Api.CertificateSignRequest): Promise<t.CertificateSignResponse> {
	throw 'Unimplemented'
}


const api: t.CertificateApi = {
	certificateGet,
	certificateSign,
}

export default api
