import { existsSync, readFileSync, writeFileSync } from 'fs'

import multiavatar from '@multiavatar/multiavatar'
import { SingletonLogger } from '../facade/logger'
import { Logger } from 'winston'
import {
    BlockAddress,
    createBlockAddress,
    createIdentity,
    Identity,
    IdentityTemplate,
    SecurityAlgorithm,
    SecurityConfig,
    updateIdentity,
    verifyIdentity
} from '@yeying-community/yeying-web3'
import { CipherTypeEnum } from '../../yeying/api/common/code'
import { decodeBase64, encodeBase64 } from '../../common/string'
import {
    convertCipherTypeFrom,
    convertCipherTypeTo,
    convertToAlgorithmName,
    decrypt,
    deriveRawKeyFromString,
    encrypt,
    generateIv
} from '../../common/crypto'

export class IdentityService {
    private logger: Logger = SingletonLogger.get()

    constructor() {}

    async load(identityPath: string) {
        if (!existsSync(identityPath)) {
            throw new Error(`There is no ${identityPath} identity for loading.`)
        }

        const identity: Identity = Identity.fromJSON(JSON.parse(readFileSync(identityPath, 'utf8')))
        const passed = await verifyIdentity(identity)
        // 验证身份合法性
        if (!passed) {
            if (identity.metadata) {
                this.logger.error(`Invalid identity=${identity.metadata.did}`)
            }
            
            throw new Error(`Invalid identity=${identityPath}`)
        } else {
            return identity
        }
    }

    save(identityPath: string, identity: Identity) {
        // 如果文件已经存在则覆盖写
        writeFileSync(identityPath, JSON.stringify(Identity.toJSON(identity)))
        console.log(`Save identity file=${identityPath}`)
    }

    async encryptBlockAddress(blockAddress: BlockAddress, securityAlgorithm: SecurityAlgorithm, password: string) {
        const algorithmName = convertToAlgorithmName(convertCipherTypeFrom(securityAlgorithm.name))
        const cryptoKey = await deriveRawKeyFromString(algorithmName, password)
        const cipher = await encrypt(
            algorithmName,
            cryptoKey,
            decodeBase64(securityAlgorithm.iv),
            BlockAddress.encode(blockAddress).finish()
        )
        return encodeBase64(cipher)
    }

    async decryptBlockAddress(blockAddress: string, securityAlgorithm: SecurityAlgorithm, password: string) {
        const algorithmName = convertToAlgorithmName(convertCipherTypeFrom(securityAlgorithm.name))
        const cryptoKey = await deriveRawKeyFromString(algorithmName, password)
        const plain = await decrypt(
            algorithmName,
            cryptoKey,
            decodeBase64(securityAlgorithm.iv),
            decodeBase64(blockAddress)
        )
        return BlockAddress.decode(new Uint8Array(plain))
    }

    async update(password: string, template: IdentityTemplate, identity: Identity) {
        if (identity.securityConfig && identity.securityConfig.algorithm) {
            const blockAddress = await this.decryptBlockAddress(
                identity.blockAddress,
                identity.securityConfig.algorithm,
                password
            )
            return await updateIdentity(template, identity, blockAddress)
        }
 
    }

    async create(password: string, template: IdentityTemplate) {
        if (template.avatar === undefined) {
            template.avatar = this.createAvatar(template.name)
        }

        if (template.securityConfig === undefined) {
            template.securityConfig = SecurityConfig.create({
                algorithm: SecurityAlgorithm.create({
                    name: convertCipherTypeTo(CipherTypeEnum.CIPHER_TYPE_AES_GCM_256),
                    iv: encodeBase64(generateIv().buffer)
                })
            })
        }

        const blockAddress = createBlockAddress()
        if (template.securityConfig.algorithm === undefined) {
            throw new Error("template.securityConfig.algorithm is undefined")
        }
        const encryptedBlockAddress = await this.encryptBlockAddress(
            blockAddress,
            template.securityConfig.algorithm,
            password
        )

        return await createIdentity(blockAddress, encryptedBlockAddress, template)
    }

    private createAvatar(name: string) {
        return `data:image/svg+xml;base64,${Buffer.from(decodeURIComponent(encodeURIComponent(multiavatar(name))), 'utf-8').toString('base64')}`
    }

    private readAvatarFile(filePath: string) {
        if (!existsSync(filePath)) {
            return undefined
        }

        const data = readFileSync(filePath, 'base64')
        return 'data:image/webp;base64,' + data
    }
}
