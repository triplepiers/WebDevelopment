# Start Up

> [Vite 官方中文文档](https://cn.vitejs.dev/)

## Init

> Vite 需要 Node.js 版本 18+，20+。然而，有些模板需要依赖更高的 Node 版本才能正常运行，当你的包管理器发出警告时，请注意升级你的 Node 版本。

1. 搭建一个 Vite 项目

    ```bash
    npm create vite@latest
    # 需要手动选择 framework & variant
    ```

2. 安装依赖

    ```bash
    cd [ProjectName]
    npm install
    ```

3. 默认命令

    ```bash
    npm run dev     # 在本地运行 vite 项目
    npm run build   # 在 /dist 下生成打包好的静态网站
    npm run preview # 本地预览构建产物
    ```
## [TailwindCSS](https://tailwindcss.com/docs)

> 来自 [灰机Wiki的简要教程](https://www.huijiwiki.com/wiki/%E5%B8%AE%E5%8A%A9:Tailwind_CSS%E5%8F%82%E8%80%83#firstHeading)

1. install TailwindCSS

    ```bash
    npm install  # 安装一些默认依赖
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```
1. 修改默认的 teamplate paths

    ```js
    // @ tailwind.config.js
    /** @type {import('tailwindcss').Config} */
    export default {
        // 以下是需要修改的
        content: [
            "./index.html",
            "./src/**/*.{vue,js,ts,jsx,tsx}",
        ],
        // 以上是需要修改的
        theme: {
            extend: {},
        },
        plugins: [],
        }
    ```

2. 在 `src/*.css` 的所有样式表中添加 Tailwind directives

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

3. 使用 `npm run dev` 运行项目，然后开始使用 TailwindCSS 吧！

## [ShadcnUI](https://ui.shadcn.com/docs)

> 整了半天默认支持的是 React，还是看看远方的 [shadcn-vue](https://www.shadcn-vue.com/) 吧家人们

- 前置要求

    - 安装 `tailwindcss postcss autoprefixer`
    - 使用 TS 框架

1. 编辑 `tsconfig.json`

    ```json
    {
    "compilerOptions": {
        // 以下是需要添加的内容
        "baseUrl": ".",
        "paths": {
            "@/*": [
                "./src/*"
            ]
        }
        // 以上是需要添加的内容
    }
    }
    ```

2. 安装依赖 `npm i -D @types/node`，编辑 `vite.config.js`

    ```js
    // ...
    import path from "path"
    import tailwind from "tailwindcss"
    import autoprefixer from "autoprefixer"

    export default defineConfig({
    // ...
    css: {
        postcss: {
        plugins: [tailwind(), autoprefixer()],
        },
    },
    resolve: {
        alias: {
        "@": path.resolve(__dirname, "./src"),
        },
    },
    })
    ```
3. 使用 shadcn-ui CLI 来初始化项目 

    ```bash
    npx shadcn-vue@latest init # 咱就是说有亿些慢（又被淘宝源流换域名坑了）
    ```

    - 错误：`npm WARN ERESOLVE overriding peer dependency` 

        依赖版本过低，可以通过 `npm update` 尝试解决

4. 使用

    - 组件
  
        对于每个组件，需要首先通过 `npx shadcn-ui@latest add [Component]` 安装依赖

        随后在 Vue 文件中引入并使用：

        ```html
        <script>
            import { Button } from "@/components/ui/button"
        </script>
        <template>
            <Button variant="outline">Button</Button>
        </template>
        ```

    - dark theme：只要给 `index.html` 的 `<body>` 标签添加 `class="dark"` 就行啦！