# 大战 CP

## Todo

 - [] 获取 JS 处理后的 HTML 文件

 - [x] 使用 RE 处理 HTML 并转存为 txt

## Structure

```text
.
├── app.py           # 入口文件
├── todo             # 待处理的 html 文件
└── utils
    └── changpei.py  # 提供 api 捏
```

## 心路历程

1. 直接用 `wget` 下载 HTML 

    => 发现没有内容，因为内容是用 JS 挂载的

2. 用 Python API 爬 

    => 没有内容（同上）

3. 翻找开发者工具找包，找到了 JSON

     => `content` 字段加密

4. 大战 `render.js` 脚本

    => 混淆，但我逮到解密函数了

5. 大战解密脚本

    => 突然不是很想动 AES 加密了

6. 尝试使用 PhantomJS，然后用 Python 调用

    => 好的 phantomJS 停止更新了

7. 尝试使用 puppeteer

    ```bash
    # 甚至 cnpm 都换源了
    npm install -g cnpm --registry=http://registry.npmmirror.com
    ```