# Wallet


## Operations

### walletBalance

```http
POST /api/v1/wallet/balance
```


### walletCreateAddress

```http
POST /api/v1/wallet/createAddress
```


### walletTransaction

```http
POST /api/v1/wallet/transaction
```


### walletWalletInfo

```http
POST /api/v1/wallet/walletInfo
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
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
```
