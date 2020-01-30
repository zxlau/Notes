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
```js
componentWillMount () {
  ajax.get('/data/' + this.props.data, (data) => {
    this.setState({ data })
  })
}
```
它会用传进来的 `props.data` 去服务器取数据。这时候修改 `InputWithUserName`
```js
import wrapWithLoadData from './wrapWithLoadData'
import wrapWithAjaxData from './wrapWithAjaxData'

class InputWithUserName extends Component {
  render () {
    return <input value={this.props.data} />
  }
}

InputWithUserName = wrapWithAjaxData(InputWithUserName)
InputWithUserName = wrapWithLoadData(InputWithUserName, 'username')
export default InputWithUserName
```
大家可以看到，我们给 `InputWithUserName` 应用了两种高阶组件：先用 `wrapWithAjaxData` 包裹 `InputWithUserName`，再用 `wrapWithLoadData` 包含上次包裹的结果<br>
实际上最终得到的组件会先去 `LocalStorage` 取数据，然后通过 `props.data` 传给下一层组件，下一层用这个 `props.data` 通过 `Ajax` 去服务端取数据，然后再通过 `props.data` 把数据传给下一层，也就是 `InputWithUserName`

#### 动手实现 `Redux`（一）：优雅地修改共享状态
`Redux` 和 `React-redux` 并不是同一个东西。`Redux` 是一种架构模式（`Flux` 架构的一种变种），它不关注你到底用什么库，你可以把它应用到 `React` 和 `Vue`，甚至跟 `jQuery` 结合都没有问题。而 `React-redux` 就是把 `Redux` 这种架构模式和 `React.js` 结合起来的一个库，就是 `Redux` 架构在 `React.js` 中的体现.

现在让我们忘掉 `React.js、Redux` 这些词，从一个例子的代码 + 问题开始推演。

用 `create-react-app` 新建一个项目 `make-redux`，修改 `public/index.html` 里面的 `body` 结构为：
```html
 <body>
    <div id='title'></div>
    <div id='content'></div>
  </body>
```


