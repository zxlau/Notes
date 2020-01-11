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
现在 `NewComponent` 会根据第二个参数 `name` 在挂载阶段从 `LocalStorage` 加载数据，并且 `setState` 到自己的 `state.data` 中，而渲染的时候将 `state.data` 通过 `props.data` 传给 `WrappedComponent`。<br>
这个高阶组件有什么用呢？假设上面的代码是在 `src/wrapWithLoadData.js` 文件中的，我们可以在别的地方这么用它：
```js
import wrapWithLoadData from './wrapWithLoadData'

class InputWithUserName extends Component {
  render () {
    return <input value={this.props.data} />
  }
}
InputWithUserName = wrapWithLoadData(InputWithUserName, 'username')
export default InputWithUserName
```
假如 `InputWithUserName` 的功能需求是挂载的时候从 `LocalStorage` 里面加载 `username` 字段作为 `<input /> `的 `value` 值，现在有了 `wrapWithLoadData`，我们可以很容易地做到这件事情。

只需要定义一个非常简单的 `InputWithUserName`，它会把 `props.data` 作为 `<input />` 的 `value` 值。然把这个组件和 `username` 传给 `wrapWithLoadData`,`wrapWithLoadData` 会返回一个新的组件，我们用这个新的组件覆盖原来的 `InputWithUserName`,然后再导出去模块。


