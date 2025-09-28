import * as t from '../api/minio/types'
import { Api } from '../models'

async function minioPresignedUploadUrl(request: Api.MiniosdkPresignedUploadUrlRequest): Promise<t.MinioPresignedUploadUrlResponse> {
	throw 'Unimplemented'
}


const api: t.MinioApi = {
	minioPresignedUploadUrl,
}

export default api
