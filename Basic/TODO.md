# Tips

## 1 Todos

- [] PRTS 角色展示组件复刻：https://m.prts.wiki/w/%E5%8F%8C%E6%9C%88#

    `/api/CharName.ttf` 是不完整的字体包

- [] 纯CSS视差：https://juejin.cn/post/7087766484587380767
- [] Parralax Hover基本原理：https://juejin.cn/post/7126369893930237989

## 2 Refs

- [] 仿腾讯 Up2017 年度发布会的粒子效果: https://qingxia-ela.github.io/Up2017-Particles-Effect-Template/

    Repo: https://github.com/QingXia-Ela/Up2017-Particles-Effect-Template

- [] 3D Room: https://abigail-bloom-portolio-bokoko33.vercel.app/

    Repo: https://github.com/andrewwoan/abigail-bloom-portolio-bokoko33
    
## 3 Nots

- 无框架跨页转场动画思路

    - 核心思路：在超链接跳转前使用 `setTimeout()` 强行延迟，并播放跳转动画

    - 过程：(点击链接) -> In -> Fill(贯穿两侧) -> (实际跳转) -> Out

    - 实现：

        > 最好用框架的路由方法实现 “无刷跳转”

        ```js
        // 加载完毕后，退出 loader：Fill -> Out
        const Loader = {
            container: document.querySelector(".loader"),   // 包含 loading 动画的容器
            duration: 1000,                                 // 默认退出动画时长为 1s
            out() {
                this.container.classList.add("loading_out"); // 使用类名开始 Out 动画
            },
            in(URL) { // 将标签的点击响应设置为 onclick="Loadewr.in({URL})"
                // 播放 In 动画
                this.container.classList.remove("loading_out");
                // 延迟跳转
                setTimout(() => {
                    window.location.href = URL;
                }, this.duration);
            }
        }
        window.addEventListener("load", () => {
            Loader.out();
        })
        ```