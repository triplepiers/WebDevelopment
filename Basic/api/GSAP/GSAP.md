# GSAP

> 这是[官方文档](https://gsap.com/docs/v3/)，这是[中译本](https://gsap.framer.wiki/stated)

## 0 Install

- By NPM

  1. Insatll  `npm install gsap`
  2. Import `import { gsap } from "gsap";`

- By CDN

  ```html
  // import
  <script src="https://cdn.bootcdn.net/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  
  // import & usage
  <script>
    	document.addEventListener("DOMContentLoaded", (e) => {
        // GSAP Code Here
      })
  </script>
  ```

## 1 Usage

### 1.1 补间

- GSAP 动画由一连串顺序排布的补间（Tween）构成。

  一般情况下，这些 tween 会首尾相接的顺序播放；当然，你也可以手动指定 GAP

- GSAP 共提供了 4 种不同的 Tween 补间方式

  1. `gsap.to()`       让元素从原状态过渡到指定状态
  2. `gsap.from()`   让元素从指定状态过渡到初始状态
  3. `gsap.fromTo()` 从指定状态1过渡到指定状态2
  4. `gsap.set()`        无补间（跳变）

### 1.2 选择目标

- GSAP 实际上通过 `document.querySelector()` 来选择元素，所以你可以使用任何 CSS 选择器。
- 当然，你也可以传入一个预先选择好的 DOM 元素 / 数组。

```js
// 使用（复杂的）CSS 选择器
gsap.to("section > .box", {some operation});

// DOM 元素
let box = document.querySelector(".box");
gsap.to(box, {some operation})

// 数组（但手动塞入 DOM 元素）
let square = document.querySelector(".square");
let circle = document.querySelector(".circle");                              
gsap.to([square, circle], {some operation})
```

### 1.3 可变属性 / 过程设置

> 在 `{some operation}` 里可以塞下两种不同的 `config` 信息，其中：
>
> - 可变属性：X/Y 轴位移，旋转角度 ...
> - 过程设置：duration，onComplete（完成时触发事件），repeat

#### 可变属性

- GSAP 并没有规定“什么能变，什么不能变”。

  你可以改变 CSS 属性、自定义属性、CSS 变量、复杂字符串！

- 最常被改变的还是 `transfrom` / `opacity`

  => 这是因为 `transfrom` / `opacity` 不会影响页面布局导致重绘，可以节约浏览器性能

  > 比起直接改变元素的 `left / top / margin` 属性，设置 `transform` 得到的动画效果更加丝滑

- 一些带有连字符的属性需要使用小驼峰方式进行重写，belike `background-color => backgroundColor`

- 下面是一些 Transform 常用属性的简写：

  > GSAP 默认使用 `px / deg` 作为单位，你也可以手动指定 `vm / rad` 或 JS 计算值
  >
  > - `x: "+=200"` 相对值
  > - `x: '40vw', rotation: "1.25rad"`   也可以采用其他 CSS 单位
  > - `x: () => window.innerWidth/2` JS 计算值

| GSAP                       | CSS                            | 备注                                   |
| -------------------------- | ------------------------------ | -------------------------------------- |
| `x,y: 100`                 | `translateX,translateY(100px)` | 水平/垂直移动（省略 `px / svg`  单位） |
| `xPercent,yPercent(-50)`   | `translateX,translateY(-50%)`  | 水平/垂直移动本身宽度的 `-50%`         |
| `rotation: 360`            | `rotate: 360deg`               | 旋转（省略 `deg` 单位）                |
| `rotationX,rotationY(360)` | `rotateX,rotateY: 360deg`      |                                        |
| `transformOrigin:"0% 100%` | `transform-origin: 0% 100%;`   | 设置旋转中心点                         |
| `skewX,skewY: 45`          | `skewX,skewY(45deg)`           |                                        |
| `scale: 2`                 | `scale(2,2)`                   | 元素整体放缩                           |
| `scaleX,scaleY:2`          | `scaleX, scaleY(2)`            |                                        |

- 设置 SVG 元素的属性 => 需要通过 `attr` 属性进行设置

  ```js
  gsap.to(".svgBox", { // 直接就是 <svg> 标签
  	duration: 2,
    x: 100,            // 不是 px，而是 svg 默认单位（viewBox单位宽度）
    xPercent: -100,
    attr: {            // 设置 SVG 标签属性变化
    	fill: "#fff",    // 填充颜色变化
      rx:   50
    }
  })
  ```

- 改变任意对象的值（不一定是 DOM 元素）

  ```js
  let obj = { myNum:10, myColor:"red" };
  gsap.to(obj, {
    myNum: 200,
    myColor: "blue",
    onUpdate: () => console.log(obj.myNum, obj.myColor)
    // 可以通过 onUpdate 函数重绘 canvas 元素等
  })
  ```

#### 过程设置

> [这个文档](https://greensock.com/docs/v3/GSAP/Tween) 里有完整的相关属性列表

| 属性        | 备注                                                         |
| ----------- | ------------------------------------------------------------ |
| duration    | 动画时长（默认`0.5s`）                                       |
| delay       | 开始前延迟（默认`0.5s`）                                     |
| repeat      | 重复次数，设为 `repeat: -1` 时无限重复                       |
| repeatDelay | 每次重复前的 delay                                           |
| yoyo        | 追加一次反向执行，默认为 `false`                             |
| stagger     | 同时有多个元素需要驱动时，区分先后顺序（设置当前元素的gap）  |
| ease        | 运动曲线，默认为 `power1.out`（每种类型都有 `in/out/inout`） |
| onComplete  | 动画结束后的回调函数                                         |

- Stagger（错开）

  当我们拥有一连串 `.box` 标签时（选中一组），就可以通过 `stagger:0.1` 来达到近似于 `delay = 0.1*(x-1)`的效果

  ```js
  const boxes = document.querySelectorAll('.box');
  // 每个 box 点击都会触发
  boxes.forEach((box) => box.addEventListener('click', () => {
  	gsap.to(".box", {
  		duration: 0.5,
      // 上移变透明
      opacity: 0, y: -100,
      // 错开 0.1s
      stagger: 0.1,
      ease: "back.in"
  	})
  }))
  ```

## 2 Timeline

顺序动画时显然可以通过 `delay` 属性实现，但修了一个后面全得修。（我裂开）

于是乎，GSAP 掏出了 Timeline => 按照 `append` 顺序播放所有插入的动画！！

```js
// 以此移动 绿 -> 紫 -> 橙
let tl = gsap.timeline(); // 新建一个 timeline 实例
// 依次将 tween 挂在到时间线上
tl.to(".green",  { x: 600, duration: 2 });
tl.to(".purple", { x: 600, duration: 1 , delay: 1}); // 稍微加一个 GAP
tl.to(".orange", { x: 600, duration: 1 });
```

#### 位置参数

> 这里就有点像 PowerPoint 了

```js
let tl = gsap.timeline();

tl.to(".green",  {}, 1);      // Green 的 offset = 1s
tl.to(".purple", {}, "<");    // < 表示和前一个一起播放；> 表示和后一个一起播放
tl.to(".orange", {}, "+=1");  // 在前方所有动画结束后 1s 开始播放

// 此外 >1 表示“前一动画结束后1s”； <1 表示”前一动画开始后1s“
```

#### 动画属性

与 Tween 类似的，你可以对整个 Timeline 设置动画属性

```js
let tl = gsap.timeline({
  repeat: -1,     // 无限循环
  repeatDelay: 1, // 暂停 1s 后播放下一次（Reverse 前也会暂停）
  yoyo: true      // G -> O -> O -> G （出栈-入栈循环）
});

tl.to(".green",  {});
tl.to(".orange", {});
```

#### 继承

如果同一个 timeline 下的各 tween 存在一些共通属性值，就可以通过给 timeline 添加 `defaults` 字段进行继承。

```js
let tl = gsap.timeline({defaults: {
  duration: 1
}});
// 每个 tween 的 duration 均为 1s
t1.to(".green",  {})
  .to(".purple", {}); // 可以通过类 Promise 的方法流式添加
```

#### 控制流

- GSAP 提供了一些 API 以对动画的播放进程 & 播放速率等属性尽心控制。

- 你可以通过指定方法对引用的元单位（Tween）或整个时间线（Timeline）

```js
let tween = gsap.to("#logo", {});

tween.pause();   // 暂停
tween.resume();  // 继续播放
tween.reverse(); // 反向播放
tween.seek(0.5); // 跳转至整个动画 0.5s 时的状态
tween.progress(0.5); // 跳转至整个动画 50% 时的状态
tween.timeScale(0.5/2); // 减缓至0.5倍/加速至2倍

tween.kill();    // 销毁实例，回收内存
```

#### 回调函数

所有的 Tween 和 Timeline 均具备以下回调事件：

- `onComplete`：动画结束
- `onStart`： 动画开始
- `onUpdate`：只要动画还在运行，每一帧都会触发
- `onRepeat`：每次发生重放时触发
- `onReverseComplete`：反向运动结束后触发

```js
// 可以使用 inline 的方式进行定义
gsap.to(".cls", {
  x: 100,
  onComplete: () => console.log("completed")
})

// 也可以使用函数名进行指定
function tlComplete() {
  console.log("timeline finished")
}
gsap.timelin({
  onComplete: tlComplete
})
```

## 3 Plugin

### 3.1 ScrollTrigger

> 关于该插件文档可以看[这里](https://gsap.com/docs/v3/Plugins/ScrollTrigger/?page=1)