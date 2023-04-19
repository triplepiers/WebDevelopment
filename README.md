# Learn-React

一些速通React的笔记，在前端框架里阴暗地爬行

- TodoList & GithubUsers 下是随课程做的两个案例

- Marquee 是一个跑马灯组件
  
  - 鸣谢 [haixiangyan](https://github.com/haixiangyan)
  
  - 因为水平有限，从原来的 TypeScript + SASS 改成了 JSX + CSS
  
  - 基本原理：将原始内容复制一份，添加 `translateX(0) -> translateX(-100%)` 的效果。在播放结束时，瞬间重置布局。
  
  - Tip:
  
    1. `<img>` 标签的 `src` 属性根目录为 `public` 文件夹
    2. 可以通过 `onLoad` 监听图片加载完成事件
    3. 由于 `setState()` 会被优化为异步更新，可通过以下代码确保同步数据更新
      ```js
        this.setState( prevState => ({
        imgLoaded: prevState.imgLoaded+1
      }))
      ```
      
  - 支持自定义的属性（ imgList 请额外添加 `recalc={true}`
    
    | 属性名 | 描述 | 值 |
    | :---: | --- | -- |
    |gradientColor| 遮罩层颜色| color |
    |gradientWidth | 遮罩层宽度 | `width` 支持的值 |
    |direction | 运动方向 | left / right |
    |delay| 延迟开始时间 | ns |
    | pauseOnHover | 悬停时静止 | 输入任意内容开启|

- 其他是笔记站点的相关资源，可以[点这里进行查看](https://triplepiers.github.io/Learn-React/)
