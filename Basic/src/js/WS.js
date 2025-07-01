// 用于处理 WebSocket 的后端脚本，请用 NodeJS 运行
const http = require('http');
const WebSocket = require('ws');
const readline = require('readline');

// HTTP 服务器: WS 协议规定必须通过 HTTP 握手进行升级
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Web Socket Server 运行在 port 8000')
})

// WS 服务器
const wss = new WebSocket.Server({ server })

wss.on('connection', (ws) => {
    ws.on('message', (msg) => {
        let data = JSON.parse(msg);
        let stype = data.type;
        switch (stype) {
            case 'register':
                console.log(`[NEW] 用户 ${data.id} 已连接`)
                ws.id = data.id; // 维护ID
                break;
        }
    })
    ws.on('close', ()=>{
        console.log(`[CLOSE] 客户 ${ws.id} 断开连接`)
    })
    ws.on('error', (err) => {
        console.log('发成错误: ', err.message)
    })
})

// 启动 WS 服务
const PORT = 8000
server.listen(PORT, () => {
    console.log(`Web Server 已启动: localhost:${PORT}`)
})

function exit() {
    console.log('正在退出服务...')
    // 关闭所有客户端连接
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.close(1000, '服务器主动关闭')
        }
    })
    wss.close(() => {
        console.log('WebSocket Server 已关闭')
        server.close(() => {
            console.log('HTTP Server 已关闭')
            process.exit(0)
        })
    })
}

// 服务端关闭
process.on('SIGINT', () => exit() )

// 启用命令行监听
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
function broadcast(msg) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(`[Server]: ${msg}`)
        }
    })
}
var sendMsg = false;
reader.on('line', (ipt) => {
    let cmd = ipt.trim().toLowerCase();
    if (sendMsg) {
        broadcast(cmd);
        sendMsg = false;
        return
    }
    switch (cmd) {
        case 'exit':
            exit(); break;
        case 'send':
            sendMsg = true;
            console.log('输入需要广播的信息（单行）:')
            break;
        default:
            console.log('非法命令:', cmd)
    }
})