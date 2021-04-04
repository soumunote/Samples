# React Samples Step by Step

## [01-without-webpack](01-without-webpack)

### 概要
HTML 内の `<script>` タグのみで React 本体及び 自作コンポーネントをロードする  

### 起動方法
ローカルで直接 `index.html` を開く

### 参照
- [Add React to a Wevsite](https://reactjs.org/docs/add-react-to-a-website.html)  
- [Add react in One Minute](https://gist.github.com/gaearon/faa67b76a6c47adbab04f739cba7ceda)

---

## [02-jsx-in-html](02-jsx-in-html)

### 概要
HTML 内の `<script>` タグ内に JSX まで埋め込む  
- `<script>` タグにて、[`babel-standalone`](https://github.com/babel/babel-standalone) を読み込む
- 自作コンポーネントには `<script type="text/babel">` を指定する
ローカルで直接 `index.html` を開く

### 起動方法
ローカルで直接 `index.html` を開く

### 参照
- [Quick Try JSX](https://reactjs.org/docs/add-react-to-a-website.html#quickly-try-jsx)  
- [An example HTML file with JSX](https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html)

---

## [03-run-jsx-preprocessor-at-server](03-run-jsx-preprocessor-at-server)

### 概要
基本は [01-without-webpack](01-without-webpack) と同じであるが、
- スクリプト内で JSX を使用する  
- [02-jsx-in-html](02-jsx-in-html) では、`<script>` タグにて、[`babel-standalone`](https://github.com/babel/babel-standalone) を読み込んでいたが、  
ここでは、
**ブラウザ上ではなく、node 上で babel を起動する**  
- `like_button.js` を [`src/`](src) に配置する
- babel でのトランスパイルにて、`index.htm` と同じフォルダに、`like_button.js` が作成される 
- この時点で、`babel --watch` を利用しているだけで、`webpack` も利用していない

### インストール
node を利用するので、以下のインストール作業が必要  
1. `npm -y init`
2. `npm install babel-cli@6 babel-preset-react-app@3`

### 起動方法
1. ソースフォルダ上で、`npx babel --watch src --out-dir . --presets react-app/prod` を起動しておく
2. これまで同様 `index.html` を開く

---

## [04-webpack](04-webpack)

### 概要
一旦、react から離れて、純粋な webpack の機能の入り口を調査  
参照サイトの webpack の起動方法にちょっと加え、`--watch` を使用する

### インストール
1. `npm -y init`
2. `npm install --save-dev webpack webpack-cli`
3. `npm install --save lodash`

### 起動方法
1. ソースフォルダ上で、`npx webpack --config webpack.config.js --watch` を起動しておく
2. `index.html` と ``
3. `dist/index.html` を開く

### 参照
- [webpack Getting Started](https://webpack.js.org/guides/getting-started/)
- [webpack Command Line Interface](https://webpack.js.org/api/cli/)

---

## [webpack-babel-loader](webpack-babel-loader)

### 概要

### インストール

### 起動方法

### 参照
- [webpack Loaders](https://webpack.js.org/loaders/)
- [webpack babel-loader](https://webpack.js.org/loaders/babel-loader/)
