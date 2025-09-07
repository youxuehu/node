set -x

# nohup node /app/dist/server.js > "/mount/start.log" 2>&1 &
node /app/dist/server.js
set +x