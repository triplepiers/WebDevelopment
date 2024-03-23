# Sth about Electron

[Electron](https://www.electronjs.org/zh/) 是一个使用前端三件套构建 **桌面** 应用程序的框架。

同时，这个桌面应用是跨平台的（废话，网页当然是跨平台的）。

## Init

必要的依赖是 NodeJS + NPM，相信前端人都装过了。

1. 初始化项目 `npm init`
2. 将 Electron 添加至依赖 `npm install --save-dev electron`
3. 安装依赖 `npm install`
4. 在`package.json` 中添加脚本，随后可以通过 `npm start` 运行项目：

    ```
    {
        ...,
        "scripts": {
            "start": "electron .",
            ...
        },
        ...
    ```
5. 事实上直接运行 `npm start` 会报错 => 你需要创建入口文件 `index.js`

    好消息是：不报错了

    坏消息是：啥反应都没有 => 因为你根本没有往 `index.js` 里面写代码

6. 创建 `index.html`，然后随便往里填一些前端内容。转头处理 `index.js`

    ```js
    // @ index.js
    const { app, BrowserWindow } = require('electron')

    const createWindow = () => {
        const w = new BrowserWindow({
            width: 800,
            height: 699,
            // electron12 后需要添加下面的内容
            webPreferences: {
                nodeIntergration: true,
                enableRemoteModule: true,
                contextIsolation: false
            }
        })

        // window 内容从 `index.html` 中读取
        w.loadFile('index.html')
    }

    // 类似于 window.onReady，这里需要 app 准备好之后才能创建窗口
    app.whenReady()
    .then(() => {
        createWindow()
    })
    .catch(err => {})
    ```

    这回运行 `npm start` 你就可以看到丑陋的页面了。

---

最抽象的是 Win 的菜单在窗口上方，Mac 在屏幕上方（痛苦面具）。
