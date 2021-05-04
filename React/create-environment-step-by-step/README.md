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
1. ソースフォルダ上で、`npx babel --watch src --out-dir ./dist --presets react-app/prod` を起動しておく
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
2. `index.html` を開く

### 参照
- [webpack Getting Started](https://webpack.js.org/guides/getting-started/)
- [webpack Command Line Interface](https://webpack.js.org/api/cli/)

---

## [05-webpack-babel-loader](05-webpack-babel-loader)

### 概要
Webpack Loader を使用して、バンドル前の変換を行う。  
[様々な種類のLoader](https://webpack.js.org/loaders/)が準備されている。

### インストール
1. `npm init -y`
2. `npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli`
3. `npm install --save react react-dom`

### 起動方法
1. ソースフォルダ上で、`npx webpack --config webpack.config.js --watch` を起動しておく
2. `index.html` を開く

### 参照
- [webpack Loaders](https://webpack.js.org/loaders/)
- [webpack babel-loader](https://webpack.js.org/loaders/babel-loader/)

---
## [05a-html-webpack-plugin](05a-html-webpack-plugin)
### 概要
Create React App を参考にもう少し研究
- index.html の &lt;script&gt; タグ自体を埋め込む

### 参照
- [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)
- [Create React App](https://create-react-app.dev/docs/getting-started)

---

## [06-simple-nextjs](06-simple-nextjs)

### 概要

### インストール
1. `npm init -y`
2. `npm install next react react-dom`

### 起動方法
1. ソースフォルダ上で、`npm run dev` を起動しておく  
   (package.json で dev を定義)
2. `http://localhost:3000/` を開く

### 参照
- [Next.js tutorial:manual project setup - Video Docs(Pt.1)](https://kananrahimov.com/post/next-js-tutorial-manual-project-setup-video-docs-part-1/)

---

## [07-next-bootstrap](07-next-bootstrap)

### 概要

### インストール
1. `npm init -y`
2. `npm install next react react-dom`
3. `npm install react-bootstrap bootstrap`

### 起動方法
1. ソースフォルダ上で、`npm run dev` を起動しておく  
   (package.json で dev を定義)
2. `http://localhost:3000/` を開く

### 参照
- [React Bootstrap Getting Started Introduction](https://react-bootstrap.github.io/getting-started/introduction/)

---

## [08-bs-stepper](08-bs-stepper)

### 概要
[bs-stepper](https://github.com/Johann-S/bs-stepper)に関して、３ステップで検証する
1. [全てをマークアップで実装する](https://github.com/Johann-S/bs-stepper#html-markup)  
   これだけでは、動かない
2. [JavaScript](https://github.com/Johann-S/bs-stepper#javascript)  
   必要なモジュールを、CDNではなく npm にて取得する
3. webpack にて、css, js をバンドルしてみる   

### インストール
各フォルダの　package.json を参照

### 起動方法
各フォルダの、index.html をローカルで開く

#### 参照
- [Johann-S / bs-stepper](https://github.com/Johann-S/bs-stepper/blob/master/README.md)

---

## [99-nextjs](99-nextjs)

## [99-bootstrap](99-bootstrap)

[Why React-Bootstrap?](https://react-bootstrap.github.io/getting-started/why-react-bootstrap/)

## [99-final](99-final)
