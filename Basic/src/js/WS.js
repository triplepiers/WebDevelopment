// 用于处理 WebSocket 的后端脚本，请用 NodeJS 运行
const http = require('http');
const WebSocket = require('ws');

// HTTP 服务器
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Web Socket Server 运行在 port 8000')
})

// WS 服务器
const wss = new WebSocket.Server({ server })

wss.on('connection', (ws) => {
    console.log('有新的客户端连接')
    ws.on('message', (msg) => {
        console.log(`recv: ${msg.toString()}`)
    })
    ws.on('close', ()=>{
        console.log('客户端断开连接')
    })
    ws.on('error', (err) => {
        console.log('发成错误: ', err.message)
    })
})

// 启动服务
const PORT = 8000
server.listen(PORT, () => {
    console.log(`Web Server 已启动: localhost:${PORT}`)
})