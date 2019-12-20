# SampleExcelVBAOnTime
EXCEL VBA の Application.OnTime イベントの[サンプルソース](https://github.com/soumunote/SampleExcelVBAOnTime/blob/master/ShutdownSample.bas)  
無操作状態で5分間経過した EXCEL をそのまま終了する。  
EXCEL VBA には VB6 のタイマコントロールのようなものは無いが、Application.OnTime メソッドにより近い機能が利用できる。

## サンプルプログラムの解説
### 概要
- EXCELの起動時及び、何らかのVBA処理実行時に(各イベントの中など)で以下のメソッドをコールする  
  初回呼び出し時はカウントアップの開始、次回以降はカウントアップ中のタイマの停止と新たなカウントの開始を行う。  
  `Private Sub TimerInitializeSub()`
- 5分のタイマではなく、1分のタイマを5回まわしてみた。(汎用的になりやすいように)
- Application.Quit で終了しようと思ったが、複数のEXCELメインウィンドウが開いていても、実は1つのプロセスで全て閉じてしまうので、
  (開き方によると思うが)念のため、`ThisWorkbook.Close`を行う。  
  (開いているワークブックが1つなら、Application.Quit)

### 詳細
- `EXPIRE_LIMIT`
  何分後に止まるかをココで指定する
- `nWatchDogCounter`  
  現在何秒目かを保持する
- `nextTime`  
  次のタイマイベント発生時間(キャンセル時にも使う)
- `Private Sub TimerInitializeSub()`  
  とにかく処理開始時と何らかの処理実行\[開始|終了\]時に呼ぶ  
  たとえば5分以上かかる処理の場合、都度これを呼ばないと、実行中に終了してしまう悲しい状態になる
- `Private Sub TimerCountUpSub(Optional bInitialize As Boolean)`  
  上記メソッドは2箇所から呼ばれる
  1. `TimerInitializeSub()`の中から初回呼ばれる(bInitialize=True)
  2. 自分自身の中から、次の1分後のタイマ起動として呼ばれる(bInitialize=未指定)
- `Application.OnTime`  
  `Schedule:=False`の指定が無ければ次のイベントの設定、あれば設定済みイベントの解除
  
## 参考
[Office デベロッパーセンター/Application.OnTime メソッド (Excel)](https://docs.microsoft.com/ja-jp/office/vba/api/excel.application.ontime)

