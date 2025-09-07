# 停止服务
set -x
echo "开始停止服务"
docker compose down
echo "服务停止完成"

echo "开始卸载镜像"
# 卸载镜像
IMAGE_NAME="yeying-node"
IMAGE_ID=$(docker images | grep "$IMAGE_NAME" | awk '{print $3}')
docker rmi "$IMAGE_ID"
echo "镜像卸载完成"

# 启动服务
echo "开始启动服务"
docker compose up -d
echo "服务启动完成"
set +x