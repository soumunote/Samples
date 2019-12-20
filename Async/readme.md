# sample_async
JavaScript 及び C# の非同期サンプル

## JavaScript
act に代入する値で４つのサンプルを実行可能
ベースは 3秒待って、"3Freeze!" と表示する
３秒待ちの setTimeout() を実行するThreeFreeze() 関数をベースに検証してみる

### 1.とにかく非同期実行
ThreeFreeze()関数内の setTimeout() に渡された callback を全く待たない。
(コールバックに、 await を付けることもできない。SyntaxError となる)

### 2.Promise() による同期実行
Promise() による同期実行を行う。  
Promise() に ThreeFreeze() 関数を渡す。  
ThreeFreeze() の内部では、更に setTimeout() に callback を渡すことで3秒待ちを実現している。  
Promise() は直ぐにTreeFreeze()の実行を開始するが、処理完了の待機をさせるには callback 内で resolve を実行する必要がある。
...この時点で、ThreeFreeze()は、resolve, reject を受け取るように改造されている。  

### 3.ThreeFreezeAsync() 改良型
ThreeFreezeAsync() 内部で Promise() を作成し、setTimeout() へ渡した callback　内部で resolve を実行する。  

### 4.async / await 版
async / await 版であるが、ThreeFreezeAsync は Promise() を使用している。  
使用しないといけないと思う。

## ここまでの道のり
結局…コールバック関数が Promise に対応してないとダメだろう。  
というとろにたどり着く。  
だって、request だって `require(‘request-promise-native’)` だし。  
そして、https://www.emailjs.com にたどり着くが、有償っぽい。  
https://github.com/zhaosiyang/nodemailer-promise  
これは、 MIT License ! Good!
で、Promise っぽく、
```
sendEmail(message)
    .then(function(info){console.log(info)})   // if successful
    .catch(function(err){console.log('got error'); console.log(err)});   // if an error occurs
```
と呼べる。
ソースは、こんだけ。  
https://github.com/zhaosiyang/nodemailer-promise/blob/master/index.js  
あれ？メール送るところのソースは？
https://nodemailer.com/about/  
これだ。これをカプセル化してるだけだ。  
結局、Promise なんて、コンストラクタに渡す関数の、resolve か reject を呼ぶまで待機して、  
終わったら、then か catch に行くだけか。  
https://qiita.com/tfrcm/items/1dfe4265c36bea903ab3  
ということで、↓のソースを真似れば良いらしい。試してないが...  
https://github.com/zhaosiyang/nodemailer-promise/blob/master/index.js  
