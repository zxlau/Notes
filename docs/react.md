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

**高阶组件的灵活性**<br>
代码复用的方法、形式有很多种，你可以用类继承来做到代码复用，也可以分离模块的方式。但是高阶组件这种方式很有意思，也很灵活。学过设计模式的同学其实应该能反应过来，它其实就是设计模式里面的装饰者模式。它通过组合的方式达到很高的灵活程度。<br>
假设现在我们需求变化了，现在要的是通过 `Ajax` 加载数据而不是从 `LocalStorage` 加载数据。我们只需要新建一个 `wrapWithAjaxData` 高阶组件：
```js
import React, { Component } from 'react'

export default (WrappedComponent, name) => {
  class NewComponent extends Component {
    constructor () {
      super()
      this.state = { data: null }
    }

    componentWillMount () {
      ajax.get('/data/' + name, (data) => {
        this.setState({ data })
      })
    }

    render () {
      return <WrappedComponent data={this.state.data} />
    }
  }
  return NewComponent
}
```
其实就是改了一下 `wrapWithLoadData` 的 `componentWillMount` 中的逻辑，改成了从服务器加载数据。现在只需要把 `InputWithUserName` 稍微改一下：
```js
import wrapWithAjaxData from './wrapWithAjaxData'

class InputWithUserName extends Component {
  render () {
    return <input value={this.props.data} />
  }
}

InputWithUserName = wrapWithAjaxData(InputWithUserName, 'username')
export default InputWithUserName
```
只要改一下包装的高阶组件就可以达到需要的效果。而且我们并没有改动 `InputWithUserName` 组件内部的任何逻辑，也没有改动 `Index` 的任何逻辑，只是改动了中间的高阶组件函数。

#### 多层高阶组件
假如现在需求有变化了：我们需要先从 `LocalStorage` 中加载数据，再用这个数据去服务器取数据。我们改一下（或者新建一个）`wrapWithAjaxData` 高阶组件，修改其中的 `componentWillMount`



