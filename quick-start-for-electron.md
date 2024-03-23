# Sth about Electron

[Electron](https://www.electronjs.org/zh/) 是一个使用前端三件套构建 **桌面** 应用程序的框架。

同时，这个桌面应用是跨平台的（废话，网页当然是跨平台的）。

## 1 Init

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

### 窗口生命周期管理

- 为了让窗口看起来更像是各平台原生的，我们还应该添加一些额外的模版代码

    Electron 将在不通操作系统下保证行为一致的锅甩给了开发者（不像 Java），于是：

    Win 的菜单在窗口上方，Mac 在屏幕上方（痛苦面具）

- 关闭窗口时自动退出应用（ Win & Linux ）

    ```js
    app.on('window-all-closed', () => {
        // 通过监听 window-all-closed 实现：如果不是 macOS，则手动调用 app.quit()
        if (process.platform !== 'darwin') app.quit()
    })
    ```
- 若不存在窗口，则打开一个新窗口（ Mac ）

    因为 mac 里的应用可以在不打开任何窗口的情况下运行（大草）

    ```js
    // 因为没法在 app Ready 前创建窗口，所以要放在 whenReady 里面
    app.whenReady().then(() => {
        createWindow()
        // 在激活应用时，如果不存在任何窗口，则手动创建
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createWindow()
        })
    })
    ```

### 通过预加载脚本从渲染器访问窗口

- 事实上您不能直接在主进程中编辑 DOM => 它无法访问渲染器文档的上下文（又到了痛苦面具阶段）

- 您可以通过 *预加载* 脚本在渲染器进程开始之前抢跑，使您有权访问 `window, document` 和 NodeJS 环境：

    1. 请创建如下的 `preload.js`

        ```js
        // @ preload.js
        window.addEventListener('DOMContentLoaded', () => {
            const replaceText = (selector, text) => {
                const element = document.getElementById(selector)
                if (element) element.innerText = text
            }
            /* 
                - 通过访问 NodeJS 的 process.versions 对象获取版本号
                - 通过 replaceText() 对 <span id="[dependency]-version"></span> 进行替换
            */
            for (const dependency of ['chrome', 'node', 'electron']) {
                replaceText(`${dependency}-version`, process.versions[dependency])
            }
        })
        ```
    2. 随后，您需要手动修改 `index.js` 实现抢跑

        ```js
        // @ index.js
        const path = require('node:path')

        // ...

        const createWindow = () => {
            const w = new BrowserWindot({
                ...,
                webPreferences: {
                    ...,
                    // __dirname 是当前工作目录
                    preload: path.join(__dirname, 'preload.js')
                }
            })
        }
        ```

## 2 打包与分发

> 官方说最快捷的方式是 Electron Forge，姑且相信了
>
> 但是为 Linux 系统打包 RPM 需要安装额外的依赖（暂时忽略了）

1. 您需要向 `package.json` 中添加 `description`，否则会寄掉
2. 将 Electron Forge 添加至开发依赖 
   
   ```bash
   npm install --save-dev @elctron-forge/cli
   ```

3. 通过 `import` 命令启动 CLI

    ```bash
    npx electron-forge import
    ```

4. 通过 `make` 命令创建可分发的应用程序，该命令会在 `/out` 下创建软件包

    ```bash
    npm run make
    ```
