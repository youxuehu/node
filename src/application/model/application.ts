import {ApplicationCodeEnum, ApplicationStatusEnum, ServiceCodeEnum} from '../../yeying/api/common/code'
import { Application, PageResult } from '../../domain/model/application'
import {ApplicationMetadata} from '../../yeying/api/common/model'
import {Identity, NetworkTypeEnum, signData} from "@yeying-community/yeying-web3";
import {Authenticate} from "../../common/authenticate";
import { ApplicationDetailResponse, ApplicationDetailResponseBody, CreateApplicationResponse, CreateApplicationResponseBody, DeleteApplicationResponse, DeleteApplicationResponseBody, SearchApplicationResponse, SearchApplicationResponseBody } from '../../yeying/api/application/application';
import { ResponseStatus } from '../../yeying/api/common/message';

export function convertApplicationCodeTo(code: ApplicationCodeEnum) {
    return ApplicationCodeEnum[code] || ApplicationCodeEnum[ApplicationCodeEnum.APPLICATION_CODE_UNKNOWN]
}

export function convertApplicationCodeFrom(code: string) {
    const v = ApplicationCodeEnum[code as keyof typeof ApplicationCodeEnum]
    return v !== undefined ? v : ApplicationCodeEnum.APPLICATION_CODE_UNKNOWN
}

export function convertApplicationStatusTo(status: ApplicationStatusEnum) {
    return ApplicationStatusEnum[status] || ApplicationStatusEnum[ApplicationStatusEnum.APPLICATION_STATUS_UNKNOWN]
}

export function convertApplicationStatusFrom(status: string) {
    const v = ApplicationStatusEnum[status as keyof typeof ApplicationStatusEnum]
    return v !== undefined ? v : ApplicationStatusEnum.APPLICATION_STATUS_UNKNOWN
}

// export function convertAuditTypeTo(status: AuditTypeEnum) {
//     return AuditTypeEnum[status] || AuditTypeEnum[AuditTypeEnum.AUDIT_TYPE_UNKNOWN]
// }

// export function convertAuditTypeFrom(status: string) {
//     const v = AuditTypeEnum[status as keyof typeof AuditTypeEnum]
//     return v !== undefined ? v : AuditTypeEnum.AUDIT_TYPE_UNKNOWN
// }

export function convertApplicationMetadataFrom(application: Application) {
    return ApplicationMetadata.create({
        owner: application.owner,
        network: application.network,
        address: application.address,
        name: application.name,
        description: application.description,
        did: application.did,
        version: application.version,
        code:  ApplicationCodeEnum[application.code as keyof typeof ApplicationCodeEnum],
        avatar: application.avatar,
        hash: application.hash,
        location: application.location,
        createdAt: application.createdAt,
        updatedAt: application.updatedAt,
        serviceCodes: application.serviceCodes.split(',').map((a) => ServiceCodeEnum[a as keyof typeof ServiceCodeEnum]),
        signature: application.signature,
        codePackagePath: application.codePackagePath
    })
}

export function convertApplicationMetadataTo(application: ApplicationMetadata): Application {
    return {
        owner: application.owner,
        network: application.network,
        address: application.address,
        did: application.did,
        version: application.version,
        name: application.name,
        description: application.description,
        code: ApplicationCodeEnum[application.code],
        avatar: application.avatar,
        hash: application.hash,
        location: application.location,
        createdAt: application.createdAt,
        updatedAt: application.updatedAt,
        serviceCodes: application.serviceCodes.map((a) => ServiceCodeEnum[a]).join(','),
        signature: application.signature,
        codePackagePath: application.codePackagePath,
        id: ''
    }
}

export function convertApplicationMetadataFromIdentity(identity: Identity) {
    const metadata = identity.metadata
    const extend = identity.applicationExtend

    return ApplicationMetadata.create({
        network: NetworkTypeEnum[metadata.network],
        owner: metadata.parent,
        address: metadata.address,
        name: metadata.name,
        description: metadata.description,
        did: metadata.did,
        version: metadata.version,
        code: ApplicationCodeEnum[extend.code as keyof typeof ApplicationCodeEnum],
        serviceCodes: extend.serviceCodes.split(',').map((a) => ServiceCodeEnum[a as keyof typeof ServiceCodeEnum]),
        hash: extend.hash,
        location: extend.location,
        avatar: metadata.avatar,
        createdAt: metadata.createdAt,
        updatedAt: metadata.updatedAt
    })
}

export async function verifyApplicationMetadata(metadata: ApplicationMetadata) {
    const signature = metadata.signature
    metadata.signature = ''
    try {
        const passed = await Authenticate.verifyData(metadata.did, ApplicationMetadata.encode(metadata).finish(), signature)
        if (!passed) {
            throw new Error(`Invalid application metadata=${JSON.stringify(metadata, null, 2)}`)
        }
        return metadata
    } finally {
        metadata.signature = signature
    }
}

export async function signApplicationMetadata(privateKey: string, metadata: ApplicationMetadata) {
    metadata.signature = ''
    metadata.signature = await signData(privateKey, ApplicationMetadata.encode(metadata).finish())
    return metadata
}


export async function createApplicationResponse(authenticate: Authenticate, status: ResponseStatus, application?: ApplicationMetadata) {
    const body = CreateApplicationResponseBody.create({
        status: status,
        application: application,
    })
    return CreateApplicationResponse.create({
        header: await authenticate.createHeader(CreateApplicationResponseBody.encode(body).finish()),
        body: body
    })
}

export async function deleteApplicationResponse(authenticate: Authenticate, status: ResponseStatus) {
    const body = DeleteApplicationResponseBody.create({status: status})
    return DeleteApplicationResponse.create({
        header: await authenticate.createHeader(DeleteApplicationResponseBody.encode(body).finish()),
        body: body
    })
}

export async function searchApplicationResponse(authenticate: Authenticate, status: ResponseStatus, result?: PageResult) {
    const body =
        result === undefined
            ? SearchApplicationResponseBody.create({status: status})
            : SearchApplicationResponseBody.create({
                status: status,
                page: result.page,
                applications: result.data.map((a) => convertApplicationMetadataFrom(a))
            })
    return SearchApplicationResponse.create({
        header: await authenticate.createHeader(SearchApplicationResponseBody.encode(body).finish()),
        body: body
    })
}

export async function applicationDetailResponse(authenticate: Authenticate, status: ResponseStatus, application?: ApplicationMetadata) {
    const body = ApplicationDetailResponseBody.create({
        status: status,
        application: application,
    })

    return ApplicationDetailResponse.create({
        header: await authenticate.createHeader(ApplicationDetailResponseBody.encode(body).finish()),
        body: body
    })
}