# Assignment


## Operations

### assignmentArtificialGenerate

```http
POST /api/v1/assignment/artificialGenerate
```


### assignmentBigModelGenerate

```http
POST /api/v1/assignment/bigModelGenerate
```


### assignmentCorrection

```http
POST /api/v1/assignment/correction
```


### assignmentStudentAction

```http
POST /api/v1/assignment/studentAction
```


### assignmentUpload

```http
POST /api/v1/assignment/upload
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function assignmentArtificialGenerate(request: Api.CorrectionAssignmentArtificialRequest): Promise<t.AssignmentArtificialGenerateResponse> {
	throw 'Unimplemented'
}

async function assignmentBigModelGenerate(request: Api.CorrectionAssignmentBigModelRequest): Promise<t.AssignmentBigModelGenerateResponse> {
	throw 'Unimplemented'
}

async function assignmentCorrection(request: Api.CorrectionAssignmentCorrectionRequest): Promise<t.AssignmentCorrectionResponse> {
	throw 'Unimplemented'
}

async function assignmentStudentAction(request: Api.CorrectionStudentActionRequest): Promise<t.AssignmentStudentActionResponse> {
	throw 'Unimplemented'
}

async function assignmentUpload(request: Api.CorrectionAssignmentUploadRequest): Promise<t.AssignmentUploadResponse> {
	throw 'Unimplemented'
}


const api: t.AssignmentApi = {
	assignmentArtificialGenerate,
	assignmentBigModelGenerate,
	assignmentCorrection,
	assignmentStudentAction,
	assignmentUpload,
}

export default api
```
