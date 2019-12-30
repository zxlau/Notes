### Eslint + Prettier + VScode 规范代码风格
前端工程化以及三大框架愈发成熟，开发效率日渐提升，但是前端代码规范方面还是不够的，比方说一个大的前端项目到后期维护会感觉越来越难，团队协作方面每个人的代码风格不一致，导致维护愈发困难，所以统一前端代码风格很重要的事情。

#### 1、使用 Eslint 规范 React 和 Typescript （如有需要） 代码
全局安装依赖：
```
npm i -g eslint
```
运行命令初始化 `eslint`
```
eslint --init
```
运行之后会有一系列问题,选择 `react` 项目 和使用 `typescript`,使用 `javascript modules`，使用 `airbnb` 规范。<br>
统一安装 `airbnb` 规范，如果有使用 `typescript`，则选择 `yes` 。会自动安装 如下依赖：<br>
```js
eslint-plugin-react    // react eslint规范
eslint-config-airbnb   // 爱彼迎规范
eslint-plugin-import   // import 相关 eslint 规范
eslint-plugin-jsx-a11y   // jsx规范
eslint-plugin-react-hooks   // hooks 相关规范
@typescript-eslint/eslint-plugin    // 这是一个 ESLint 插件，包含了各类定义好的检测 Typescript 代码的规范
@typescript-eslint/parser  // ESLint 的解析器，用于解析 typescript ，从而检查和规范 Typescript 代码，如果没有用 typescript 则此处应该是 babel-eslint
```
此时在根目录下会生成一个`.eslintrc.js` 配置文件：









