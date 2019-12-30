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
```js
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
  },
};
```
其中 `env` 是配置环境，比如 `console` 只有在 `browser` 环境才存在，如果不配置的话可能会标红报错。

#### 2、结合 Prettier 规范代码
安装依赖：
```
npm i -D prettier eslint-config-prettier eslint-plugin-prettier
```
```js
Prettie //Prettier插件的核心代码
eslint-config-prettier //解决 ESLint 中的样式规范和 Prettier 中样式规范的冲突，以 Prettier 的样式规范为准
eslint-plugin-prettie //将 Prettier 作为 ESLint 规范来使用
```
根目录下创建 `.prettierrc.js` 文件，配置如下：
```js
module.exports =  {
  "eslintIntegration": true,
  "printWidth": 150, // 每行代码长度（默认80）
  "tabWidth": 2, // 每个tab相当于多少个空格（默认2）
  "useTabs": false, // 是否使用tab进行缩进（默认false）
  "singleQuote": true, // 使用单引号（默认false）
  "semi": true, // 声明结尾使用分号(默认true)
  "trailingComma": "all", // 多行使用拖尾逗号（默认none）
  "bracketSpacing": true, // 对象字面量的大括号间使用空格（默认true）
  "jsxBracketSameLine": true, // 多行JSX中的>放置在最后一行的结尾，而不是另起一行（默认false）
  "arrowParens": "always" // 只有一个参数的箭头函数的参数是否带圆括号（默认avoid）
};
```
修改 `.eslintrc.js` 文件，引入 `Prettier`

```js
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018, // 指定ESLint可以解析JSX语法
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: ['error', 'always'],
    eqeqeq: 'off',
    'linebreak-style': ['error', 'unix'],
    'no-useless-call': 'off',
    'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
    "import/no-extraneous-dependencies": [0],
    "no-underscore-dangle": [0],
    "no-unused-expressions": [0, { "allowShortCircuit": true }], 
    "react/jsx-props-no-spreading": [0], 
    "react/destructuring-assignment": [0], 
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "jsx-a11y/no-static-element-interactions": [0], 
    "jsx-a11y/click-events-have-key-events": [0],
    'import/extensions': [2, { 'js': 'never', 'jsx': 'never', 'ts': 'never', 'tsx': 'never' }],  // import 的时候后缀名配置
    'prefer-const': 'off',  // 默认使用 const, 会改掉代码，不知道有没有坑，先关掉
    'react/jsx-filename-extension': 'off',  // 关掉 jsx 语法不能再 .tsx 文件中使用的报错
    'no-unused-vars': [1]  // 声明但未使用的变量警告
   	// ...
   	// 后续开发过程中遇到的不合理的报错可在这里添加关闭
  },
  settings: {
    //自动发现React的版本，从而进行规范react代码
    react: {
      pragma: 'React',
      version: 'detect'
    },
    "import/resolver": {
      "node": {
        "extensions": [".ts", ".tsx", ".js", ".jsx"]
      }
    }
  },
};
```
#### 3、 结合VScode

