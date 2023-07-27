# 案例小结

> 追加的依赖
> 
> - `nanoid` - 用于为 todo-item 生成 id
> 
> - `prop-types` - 用于限制 `props` 参数的类型和必要性

## 1 拆分组件

- 将 html 中的 `class` 批量替换为 `className`

- 注意对行内样式进行修改

## 2 数据存储位置

- 单个组件使用：放在「自身」的 State 中

- 多个组件共用：放在「共同父组件」的 State 中

## 3 父子通信

- Father-to-Son

    通过 `props` 进行传递

- Son-to-Father

    通过 `props` 中的函数传递（函数在父组件中实现）

    => State 在何处，操作 State 的 method 就在何处

## 4 CheckBox

- 区分 `defaultChecked` & `checked`

    - `defaultChecked` 仅在第一次渲染时生效

    - `checked` 支持动态绑定，但需要配合 `onChange` 函数使用

- `checkbox` 的值通过 `checked` 而非 `value` 进行获取