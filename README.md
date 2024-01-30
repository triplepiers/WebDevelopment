# README

> 一些个 repo 结构胡乱介绍

才发现 `tree` 是可以通过 `-L` 指定深度的 (shocked)

```text
.
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