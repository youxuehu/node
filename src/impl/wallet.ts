import * as t from '../api/wallet/types'
import { Api } from '../models'

async function walletBalance(request: Api.ContractBalanceRequest): Promise<t.WalletBalanceResponse> {
	throw 'Unimplemented'
}

async function walletCreateAddress(request: Api.ContractCreateAddressRequest): Promise<t.WalletCreateAddressResponse> {
	throw 'Unimplemented'
}

async function walletTransaction(request: Api.ContractTransactionRequest): Promise<t.WalletTransactionResponse> {
	throw 'Unimplemented'
}

async function walletWalletInfo(request: Api.ContractWalletInfoRequest): Promise<t.WalletWalletInfoResponse> {
	throw 'Unimplemented'
}


const api: t.WalletApi = {
	walletBalance,
	walletCreateAddress,
	walletTransaction,
	walletWalletInfo,
}

export default api
