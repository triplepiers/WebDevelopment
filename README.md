# README

> 一些个 repo 结构胡乱介绍

才发现 `tree` 是可以通过 `-L` 指定深度的 (shocked)

```text
.
├── Spider          # 为了《拍拍》大战 CP 文学网
│
├── Basic           # 一些个平时攒的前端页面
│   ├── api         # 常用的 JS 库及用例
│   ├── ref         # 一些薅来的样例（部分缺少引用标注）
│   ├── src         # 自己搓的部分
│   ├── img         # 一些会用到的图片
│   ├── init.py     # 搭配 index 食用，用于生成 json
│   └── index.html  # 用于展示 /src 下的页面
│
├── MongoDB         # MongoDB 用例
│
├── React                 # React 用例
│   ├── GithubUsers       # GitHub 用户卡片组件
│   ├── Marquee           # 轮播图组件
│   ├── TodoList          # 待办清单组件
│   └── bilibili-activity # B站的某个页面复刻
│
└── Vue             # Vue 用例
    ├── flask       # 大概是后端
    └── vue         # 大概是前端
```

## Tips

### (并不) 优雅的在 NodeJS 中使用 ES6 模块

NodeJS 默认使用 CommonJS 语法，which means 您只能通过 `require()` 加载模块:

- 令人痛苦面具的是，浏览器支持的是 ES6 语法（于是需要一通大改）

- 您可以通过以下两种方法让 Node 皈依 ES6 神教：

    1. 在项目的 `package.json` 中添加 `"type": "module"` 字段
    2. 将需要使用 ES6 语法的文件后缀改为 `mjs`，需要使用 CommonJS 的文件后缀改为 `cjs`

---

两种格式模块的导入导出规范：

- CommonJS

    ```js
    // #1 导入（同步加载）
    // #1.1 整体导入模块
    const utils = require('path/to/util.js');
    // #1.2 使用解构赋值导入单个属性
    const { print } = require('path/to/util.js');

    // #2 导出（module.exports == exports）
    // #2.1 导出整体（我胡乱塞）
    module.exports = {
        name: 'banana',
        age: 18,
        eat: function() {
            console.log('I like eating bananas')
        }
    }
    // #2.2 塞入单个属性
    module.exports.username = 'admin';
    ```
- ES6

    - 导出 Module（任意类型）

        ```js
        // #1 导出 => export
        const obj = {
            name: 'banana',
            eat: () => console.log('I like eating bananas')
        }
        const username = 'admin';
        // 可以通过 as 重命名导出
        export {
            obj as user,
            username as uname
        }

        // #2 导入
        import { user, name } from 'path/to/util.js';
        // 需要导入大量成员时，可以使用通配符 *
        import * as obj from 'path/to/util.js';
        console.log(obj.name);
        ```

    - 默认导出（单个成员）

        ```js
        // #1 导出 => export default（没有指定导出名称）
        const name = 'banana';
        export default name;
        // 也可以导出一个对象
        export default {
            name: 'banana',
            eat: () => console.log('I like eating bananas')
        }

        // #2 导入 => 可以直接通过任意变量名接受
        import neoname from 'path/to/name.js';
        // 也可以接受对象
        import usr from 'path/to/usr.js';
        usr.eat();
        ```

    - 其实可以同时导出 命名/默认成员

        ```js
        // 导出
        export {
            name: 'banana',
            age: 18
        };
        export default 'admin';

        // 导入
        // 1. 通过 default as xxx 对默认导出成员进行命名
        import {name, age, default as username} from 'path/to/...';
        // 2. 将默认成员放在最前进行简写
        import username, {name, age} from 'path/to/...';
        ```