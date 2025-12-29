# 接続
```bash
$ screen /dev/tty.usbserial-110 9600,cs8,-parenb,-cstopb,ixon,ixoff
```
# 切断
`Control + A → Control + K`

# RTX シリーズ・シリアルのパラメータ
|パラメータ|値|Screenコマンド|
|--+--+--|
|ボーレート|9600|9600|
|データ・ビット|8|cs8|
|パリティ|なし|-parenb|
|ストップ・ビット|1|-cstopb|
|フロー制御|Xon/Xoff|ixon,ixoff|
