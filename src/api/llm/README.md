# Llm


## Operations

### llmComplete

```http
POST /api/v1/llm/complete
```


### llmEdit

```http
POST /api/v1/llm/edit
```


### llmGenerate

```http
POST /api/v1/llm/generate
```


### llmSpeech

```http
POST /api/v1/llm/speech
```


### llmTranslate

```http
POST /api/v1/llm/translate
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function llmComplete(request: Api.LlmCompleteRequest): Promise<t.LlmCompleteResponse> {
	throw 'Unimplemented'
}

async function llmEdit(request: Api.LlmEditRequest): Promise<t.LlmEditResponse> {
	throw 'Unimplemented'
}

async function llmGenerate(request: Api.LlmGenerateRequest): Promise<t.LlmGenerateResponse> {
	throw 'Unimplemented'
}

async function llmSpeech(request: Api.LlmSpeechRequest): Promise<t.LlmSpeechResponse> {
	throw 'Unimplemented'
}

async function llmTranslate(request: Api.LlmTranslateRequest): Promise<t.LlmTranslateResponse> {
	throw 'Unimplemented'
}


const api: t.LlmApi = {
	llmComplete,
	llmEdit,
	llmGenerate,
	llmSpeech,
	llmTranslate,
}

export default api
```
