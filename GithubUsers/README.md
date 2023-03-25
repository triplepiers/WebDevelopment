# 案例小结

- 设计带有「网络请求」的组件时，应考虑「请求失败」时的处理

## 1 解构赋值+重命名
```js
let obj = {
    a: {
        b: 1
    }
}
const {a} = obj // 传统解构赋值，拿到对象 a
const {a:{b}} = obj // 连续解构赋值，拿到数据 b（只定义了数据 b）
const {a:{b:value}} = obj // 连续解构赋值，并重命名 b 为 value
```

## 2 消息订阅 + 发布

1. 先 subscribe，再 publish
2. 适用于「任意」组件间通信
3. 发起订阅的组件应在 `componentWillUnmount` 中取消订阅

## 3 Fetch（非 xhr）
> 猥琐的分离思想

下面是简化过的版本：
```js
// 最近的函数要标 async
try {
    const res = await fetch('url')
    const data = awiat res.json()
    console.log(data)
} catch(err) {
    console.log(err)
}
```