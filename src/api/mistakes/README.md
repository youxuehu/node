# Mistakes


## Operations

### mistakesAdd

```http
POST /api/v1/mistakes/add
```


### mistakesAnalysis

```http
POST /api/v1/mistakes/analysis
```


### mistakesDetail

```http
POST /api/v1/mistakes/detail
```


### mistakesList

```http
POST /api/v1/mistakes/list
```


### mistakesMakeCorrection

```http
POST /api/v1/mistakes/makeCorrection
```


### mistakesPrint

```http
POST /api/v1/mistakes/print
```


### mistakesSubmit

```http
POST /api/v1/mistakes/submit
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function mistakesAdd(request: Api.CorrectionMistakesAddRequest): Promise<t.MistakesAddResponse> {
	throw 'Unimplemented'
}

async function mistakesAnalysis(request: Api.CorrectionMistakesAnalysisRequest): Promise<t.MistakesAnalysisResponse> {
	throw 'Unimplemented'
}

async function mistakesDetail(request: Api.CorrectionMistakesDetailRequest): Promise<t.MistakesDetailResponse> {
	throw 'Unimplemented'
}

async function mistakesList(request: Api.CorrectionMistakesListRequest): Promise<t.MistakesListResponse> {
	throw 'Unimplemented'
}

async function mistakesMakeCorrection(request: Api.CorrectionMakeCorrectionRequest): Promise<t.MistakesMakeCorrectionResponse> {
	throw 'Unimplemented'
}

async function mistakesPrint(request: Api.CorrectionMistakesPrintRequest): Promise<t.MistakesPrintResponse> {
	throw 'Unimplemented'
}

async function mistakesSubmit(request: Api.CorrectionMistakesSubmitRequest): Promise<t.MistakesSubmitResponse> {
	throw 'Unimplemented'
}


const api: t.MistakesApi = {
	mistakesAdd,
	mistakesAnalysis,
	mistakesDetail,
	mistakesList,
	mistakesMakeCorrection,
	mistakesPrint,
	mistakesSubmit,
}

export default api
```
