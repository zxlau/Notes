http://huziketang.mangojuice.top/books/react/

### 高阶组件
**高阶组件就是一个函数，传给它一个组件，它返回一个新的组件。**
```js
const NewComponent = higherOrderComponent(OldComponent)
```
这个新的组件会使用你传给它的组件作为子组件，一个很简单的高阶组件：
```js
import React, { Component } from 'react'
export default (WrappedComponent) => {
  class NewComponent extends Component {
    // 可以做很多自定义逻辑
    render () {
      return <WrappedComponent />
    }
  }
  return NewComponent
}
```
现在 `NewComponent` 会根据第二个参数 `name` 在挂载阶段从 `LocalStorage` 加载数据，并且 `setState` 到自己的 `state.data` 中，而渲染的时候将 `state.data` 通过 `props.data` 传给 `WrappedComponent`。


