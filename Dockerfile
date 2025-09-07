FROM node:24

WORKDIR /app

ADD . .
RUN npm run build

# 容器启动后执行的命令，启动 node 服务
ENTRYPOINT ["bash", "script/startService.sh"]

# 对外开放端口
EXPOSE 8080