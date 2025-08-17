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



// 创建 Express 应用
const app = express();

// 设置 JSON 解析中间件
app.use(express.json());

// TODO: 实现你的 API 逻辑，这里需要提供符合 t.ApiImplementation 的对象
// 以下为占位示例，实际需根据你的业务实现
const impl: ApiImplementation = {
  // 示例：假设 user 模块需要实现 createUser 方法
  // user: {
  //   createUser: (request, context) => { ... }
  // },
  // 其他模块...
  // ⚠️ 注意：这里必须实现所有模块的方法，否则运行时报错
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

// 🌟 注册 Swagger UI
// 读取你已有的 openapi.json 文件
const openapiPath = path.join(__dirname, '../openapi.json');
const openapiDocument = JSON.parse(fs.readFileSync(openapiPath, 'utf8'));

// 挂载 Swagger UI，使用你自己的 openapi.json
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));
// 注册所有路由
api(app, impl);

// 启动服务器
app.listen(3000, '0.0.0.0', () => {
  console.log(`🚀 Server is running on http://localhost:3000`);
});
