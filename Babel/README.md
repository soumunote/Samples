# vscode-and-babel

src/index.js を動かす  

表題の目標は簡単そうであるが、以下の理由があり面倒である...たぶん
TODO: アロー関数は使えるが、import は使えない。要調査

以下をすべて実現しなければならない。  
1.トランスパイル  
1.1.binフォルダの削除  
1.2.srcフォルダの全ファイルをbinフォルダへトランスパイル(ソースマップの指定が必要)  
1.3.フォルダ削除とトランスパイルの一括実行  
2.デバッグ実行  
2.1.VSCode用トランスパイルタスクの作成  
2.2.デバッグ実行(ソースマップの指定が必要)  

■npm install --save-dev 操作の説明は省略...以下参照(package.jsonの抜粋)
```
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-preset-env": "^1.7.0",
    "npm-run-all": "^4.1.5",
    "rimraf": "^2.6.3"
  }
```

### 1.1.binフォルダの削除
まずは、トランスパイル後のファイルが格納されるbinフォルダを一旦消す。
ここで、OSの違いでコマンドが異なるうえに、Windows の rmdir は 該当ファイルが存在しない場合エラーとなってしまう。
そこで、 rimraf プラグインを使用する
package.json の”scripts”に以下の定義を追加
```
"scripts": {
    "clean": "rimraf bin"
},
```
これで、以下のように実行できる
```
npm run clean
```

### 1.2.srcフォルダの全ファイルをbinフォルダへトランスパイル
ここでも、package.json の "scripts" に定義を追加するが、ソースマップの指定が必要
TODO:ソースマップの詳しい仕組みは未調査
```
"scripts": {
    "build:babel": "babel src --out-dir bin --source-maps",
},
```

### 1.3.フォルダ削除とトランスパイルの一括実行
最終的に package.json の "scripts" を以下のようにすることで、一括実行が可能となる
(npm-run-all を使用する)
```
"scripts": {
    "build": "npm-run-all clean build:babel",
    "build:babel": "babel src --out-dir bin --source-maps",
    "clean": "rimraf bin"
},
```
以下のコマンドで一括実行可能
```
npm run build
```

### 2.1.実行前の全トランスパイル
以下のような .vscode/tasks.json ファイルを作ればよい...のだが、
実は、Ctrl+Shift+B にてコマンドパレットを表示し、勝手に作ってくれた。
```
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
                   "label": "buildTask",
            "type": "npm",
            "script": "build",
            "problemMatcher": [
                "$go"
            ]
        }
    ]
}
```
更に、上記作成したタスクを 起動前に実行しないといけない。

---
とりあえず、ここまでで以下のソースを実行できた。
```
import * as fs from 'fs'

fs.readFile(__dirname + '/../sample.dat', (e, buf) =>{
    console.log(buf.toString())
})
```
---
## 参照
- [Babel CLI Babelコマンド の使い方](https://mae.chab.in/archives/2845)
- [npm-scripts で使える便利モジュールたち - Qiita](https://qiita.com/mysticatea/items/12bb6579b9155fd74586)
- [Visual Studio Codeの使い勝手をよくするツール (1/5)](http://www.atmarkit.co.jp/ait/articles/1509/08/news019.html)
- [WIP npm-scripts を使い倒そう! - Qiita](https://qiita.com/mysticatea/items/e9bf581fb28c5f1cd660)
- [VS codeでES6のコードをデバッグする - Qiita](https://qiita.com/muiscript/items/ec2e93f631894fcbecb8)

---
## 今後の課題
* await /async は ES2017から
* コメントの書き方
* ソースマップの詳しい仕組み
* node.js の EcmaScript 対応状況
