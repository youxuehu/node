import * as t from '../api/identity/types'
import { Api } from '../models'

async function identityCancel(request: Api.IdentityCancelRequest): Promise<t.IdentityCancelResponse> {
	throw 'Unimplemented'
}

async function identityDeposit(request: Api.IdentityDepositRequest): Promise<t.IdentityDepositResponse> {
	throw 'Unimplemented'
}

async function identityQuery(request: Api.IdentityQueryRequest): Promise<t.IdentityQueryResponse> {
	throw 'Unimplemented'
}

async function identityRetrieve(request: Api.IdentityRetrieveRequest): Promise<t.IdentityRetrieveResponse> {
	throw 'Unimplemented'
}

async function identityShare(request: Api.IdentityShareRequest): Promise<t.IdentityShareResponse> {
	throw 'Unimplemented'
}


const api: t.IdentityApi = {
	identityCancel,
	identityDeposit,
	identityQuery,
	identityRetrieve,
	identityShare,
}

export default api
