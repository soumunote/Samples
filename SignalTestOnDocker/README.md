# SampleSignal

## 目的
docker run / start / stop によりプロセスがどのように起動し終了するか
理解を深める為に簡単なサンプルを作成した

### SampleSignal.cpp
* 起動時と終了時にメッセージを表示する
* pause()システムコールにより、ジグなるを受信するまで待機する
* シグナル受信時にメッセージを表示する

## 実行方法
1.イメージの作成  
  展開したフォルダ内で以下のコマンドを実行  
  `docker build -t soumunote/sample-signal .`  
2.コンテナの起動  
  `docker run -it --name sample-signal soumunote/sample-signal`  
3.停止  
  ^C で終わる  
