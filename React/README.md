# for React

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

- bilibili-activity 是复刻叔叔家的活动页（显然原版应该是 Vue）

  - 依然鸣谢 [haixiangyan](https://github.com/haixiangyan/bilibili-activity-page-demo)
  
  - 改动：
  
    1. 依然水平有限改成了 JS + CSS
    2. 将原版的下移隐藏按钮改成了直接禁用超链接，防止误触
    3. 稍微适配了一下 PC 端（限制了最大宽度）
  
  - 基本功能如下：
  
    1. 点击 Tab 垂直滚动跳转
    2. 滚动时，高亮对应 Tab
    3. Tab 吸顶、按钮吸底c
    
  - 收获：学到了新的 scroll 偏移技巧（硬算 offsetTop / 使用 `scroll-margin` 样式）
