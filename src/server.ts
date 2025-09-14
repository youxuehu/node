// src/server.ts

import express, { Request, Response } from 'express';
import api from './index'; // 导入你提供的路由注册函数
import { ApiImplementation } from './types'; // 假设 types.ts 中导出了 ApiImplementation 接口
// 导入你的实现
import application from './impl/application'
import archive from './impl/archive'
import asset from './impl/asset'
import assignment from './impl/assignment'
import audit from './impl/audit'
import block from './impl/block'
import bulletin from './impl/bulletin'
import certificate from './impl/certificate'
import config from './impl/config'
import content from './impl/content'
import context from './impl/context'
import event from './impl/event'
import experience from './impl/experience'
import group from './impl/group'
import homework from './impl/homework'
import identity from './impl/identity'
import invitation from './impl/invitation'
import knowledge from './impl/knowledge'
import link from './impl/link'
import llm from './impl/llm'
import mail from './impl/mail'
import message from './impl/message'
import mistakes from './impl/mistakes'
import namespace from './impl/namespace'
import network from './impl/network'
import node from './impl/node'
import provider from './impl/provider'
import recycle from './impl/recycle'
import room from './impl/room'
import service from './impl/service'
import session from './impl/session'
import social from './impl/social'
import spider from './impl/spider'
import support from './impl/support'
import task from './impl/task'
import taskTag from './impl/taskTag'
import topic from './impl/topic'
import user from './impl/user'
import vector from './impl/vector'
import wallet from './impl/wallet'
import warehouse from './impl/warehouse'
import swaggerUi from 'swagger-ui-express'
import * as fs from 'fs';
import * as path from 'path';
import { DatabaseConfig, ServerConfig } from './config';
import { DataSourceBuilder } from './infrastructure/db';
import { existsSync, readFileSync } from 'fs'
import { IdentityService } from './domain/service/identity'
import { Authenticate } from './common/authenticate'
import {
    ApplicationDO,
    CardDO,
    CertificateDO,
    EventDO,
    InvitationDO,
    ServiceDO,
    SolutionDO,
    SupportDO,
    UserDO,
    UserStateDO,
    AuditDO,
    CommentDO
} from './domain/mapper/entity'
import config2 from 'config'
import { SingletonDataSource } from './domain/facade/datasource';
import { LoggerConfig, LoggerService } from './infrastructure/logger';
import { convertServiceMetadataFromIdentity, signServiceMetadata } from './application/model/service';
import { SingletonAuthenticate, SingletonService } from './domain/facade/authenticate';
import { isFile, writeStringToTempFileSync } from './common/file';

const workDir = process.cwd()

// 初始化日志
new LoggerService(config2.get<LoggerConfig>('logger')).initialize()

const serverConfig: ServerConfig = config2.get<ServerConfig>('server')
// 获取所有环境变量
const allEnv = process.env;
console.log(`allEnv=${JSON.stringify(allEnv)}`);
const password = process.env.PASSWORD;
const id = process.env.IDENTITY_FILE;
console.log(`EMV password file=${password}`)
console.log(`EMV id file=${id}`)
// 加载身份
let identityFile = path.join(workDir, `node.id`)
let passwordFile = process.argv[2]
if (passwordFile === undefined) {
    const password = process.env.PASSWORD;
    console.log(`param password=${password}`)
    if (password === undefined) {
        throw new Error("password is undefined")
    }
    passwordFile = writeStringToTempFileSync(password, "password")
    console.log(`param passwordFile=${passwordFile}`)
}

if (!isFile(identityFile)) {
    const id = process.env.IDENTITY_FILE;
    if (id != undefined && isFile(id)) {
        identityFile = id
    }
}

let port = 8080
if (process.env.APP_PORT) {
    port = Number(process.env.APP_PORT)
}
if (process.argv[3]) {
    port = Number(process.argv[3])
}

console.log(`Use password file=${passwordFile}`)
console.log(`Use identity file=${identityFile}`)
// 确保文件路径被提供
if (!passwordFile || !existsSync(passwordFile)) {
    console.error('Please input the password firstly！')
    process.exit(1)
}
if (!passwordFile || !existsSync(passwordFile)) {
    console.error('Please input the password firstly！')
    process.exit(1)
}
const identityService = new IdentityService()

// 初始化数据库
const databaseConfig: DatabaseConfig = config2.get<DatabaseConfig>('database')
const builder = new DataSourceBuilder(databaseConfig)
builder.entities([
    UserStateDO,
    UserDO,
    ServiceDO,
    ApplicationDO,
    SupportDO,
    SolutionDO,
    EventDO,
    CertificateDO,
    InvitationDO,
    CardDO,
    AuditDO,
    CommentDO
])

builder.build().initialize().then((conn) => {
    // 注册数据库连接
    SingletonDataSource.set(conn)
    console.log('The database has been initialized.')
    initializeIdentity(passwordFile, identityFile).then(async (o) => {
        const authenticate = new Authenticate(o.blockAddress)
        // 注册身份认证对象
        SingletonAuthenticate.set(authenticate)
        SingletonService.set(o.service)
        console.log('The authenticate has been initialized.')
        // 创建 Express 应用
        const app = express();

        // 设置 JSON 解析中间件
        app.use(express.json());
        const impl: ApiImplementation = {
            application:application,
            archive:archive,
            asset:asset,
            assignment:assignment,
            audit:audit,
            block:block,
            bulletin:bulletin,
            certificate:certificate,
            config:config,
            content:content,
            context:context,
            event:event,
            experience:experience,
            group:group,
            homework:homework,
            identity:identity,
            invitation:invitation,
            knowledge:knowledge,
            link:link,
            llm:llm,
            mail:mail,
            message:message,
            mistakes:mistakes,
            namespace:namespace,
            network:network,
            node:node,
            provider:provider,
            recycle:recycle,
            room:room,
            service:service,
            session:session,
            social:social,
            spider:spider,
            support:support,
            task:task,
            taskTag:taskTag,
            topic:topic,
            user:user,
            vector:vector,
            wallet:wallet,
            warehouse:warehouse,
        };

        // 测试路由
        app.get('/', (req: Request, res: Response) => {
        res.send('Hello TypeScript + Express!');
        });
        app.get('/hello', (req, res) => {
        res.send('Hello World')
        })

        const envValue = process.env.APP_ENV
        if (envValue === "dev") {
            // 🌟 注册 Swagger UI
            // 读取你已有的 openapi.json 文件
            const openapiPath = path.join(__dirname, '../openapi.json');
            const openapiDocument = JSON.parse(fs.readFileSync(openapiPath, 'utf8'));
            // 挂载 Swagger UI，使用你自己的 openapi.json
            app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));
        }
        // 注册所有路由
        api(app, impl);

        // 启动服务器
        app.listen(port, '0.0.0.0', () => {
        console.log(`🚀 Server is running on http://localhost:${port}`);
        });
    }).catch(error => console.log("Authenticate init failed", error))
    
}).catch(error => console.log("Database connection failed", error))


async function initializeIdentity(passwordFile: string, identityFile: string) {
    const password = readFileSync(passwordFile, 'utf-8')
    const identity = await identityService.load(identityFile)
    if (identity.securityConfig === undefined || identity.securityConfig.algorithm === undefined) {
        throw new Error("identity.securityConfig or identity.securityConfig.algorithm is undefined")
    }
    const blockAddress = await identityService.decryptBlockAddress(
        identity.blockAddress,
        identity.securityConfig.algorithm,
        password
    )

    const service = convertServiceMetadataFromIdentity(identity)
    await signServiceMetadata(blockAddress.privateKey, service)
    return {
        identity: identity,
        blockAddress: blockAddress,
        service: service
    }
}