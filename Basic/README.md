## 全屏滚动: [fullPage](https://alvarotrigo.com/fullPage/zh/)

> GitHub [repo](https://github.com/alvarotrigo/fullPage.js/tree/master/lang/chinese#fullpagejs)

## 1 Installation

使用框架需要引用：

- JS 文件 `fullpage.js`，或其压缩版本 `fullpage.min.js`
- CSS 文件 `fullpage.css`

---

- NPM

    ```bash
    npm install fullpage.js
    ```

    需要包含的文件如下：
    ```html
    <link rel="stylesheet" type="text/css" href="fullpage.css" />

    <!-- 以下行是可选的。 只有在使用选项 css3:false ，并且您希望使用其他缓动效果，而非 linear 、 swing 或 easeInOutCubic 时才有必要。 -->
    <script src="vendors/easings.min.js"></script>
    <script type="text/javascript" src="fullpage.js"></script>
    ```
- CDN 我的爱

    ```html
    <!-- 依赖于 jQuery -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <!-- 本地依赖去掉了许可证警告&水印，实际使用时应当注意 -->

    <!-- fullpage.min.js -->
    <script src="./fullpage.js"></script>
    <!-- fullpage.min.css -->
    <link rel="stylesheet" href="./fullpage.min.css">
    ```

## 2 Usage

### HTML 结构定义

1. 整个页面应该进行封装（不能直接使用 `<body>` 标签）

    此处使用 `div#fullpage` 进行封装（与后文的 JS 代码对应）

2. 纵向分区：class *包含* `section` 的元素

    默认将首个 `.section` 元素作为主页
    
    可以通过 `.section.active` 强行更改起始页面

3. 横向分区：class *包含* `slide` 的元素

下面是一个 sample：包含 3 个纵向分区，2<sup>th</sup>-Section 包含 3 个横向分区

```html
<div id="fullpage">
	<div class="section">Sec 1</div>
	<div class="section">
        <div class="slide">Sec 2-1</div>
        <div class="slide">Sec 2-2</div>
        <div class="slide">Sec 2-3</div>
    </div>
	<div class="section">Sec 3</div>
</div>
```

### 初始化

```js
$(document).ready(function() {
    // 选择器根据自己的封装情况来改
	$('#fullpage').fullpage({
		// options here
		autoScrolling:true,
		scrollHorizontally: true
	});

	//methods
	$.fn.fullpage.setAllowScrolling(false);
});
```

## JS动画框架：[GSAP](https://gsap.com/)

> Reference:
> - https://github.com/dev-zuo/nice-func

### 0 Intro
当我们谈论网页动画，你会想到什么？

- jQuery 的 `animate()` 方法？
- CSS3 提供的 `transfrom / animation`？
  
无论如何，手动控制 timeline 都是一件令人秃头的工作

=> 看看远方的 GSAP 吧（轻量级 JS 动画框架，爽！）

### 1 Installation

- 经典 NPM

    ```bash
    npm install gsap
    ```

    ```js
    // 简单引入一下就可以开用
    import { gsap } from 'gsap';
    ```

- 单页面展示不可缺少的 CDN

    ```html
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
    ```

    ```js
    // 激情开搓！
    document.addEventListener("DOMContentLoaded", 
        (event) => {
            // gsap code here!
        }
    );
    ```

### 2 Usage
> 挖坑待填

#### 2.1 Timeline



#### 2.2 🌟 [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

