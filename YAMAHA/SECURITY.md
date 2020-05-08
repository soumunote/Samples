security class *level* *forget* *telnet* ssh*
- level ... 1 : シリアルでも、TELNET、SSH でも遠隔地のルーターからでもログインできる
- forget ... on : 設定したパスワードの代わりに "w,lXlma" ( ダブリュー、カンマ、エル、エックス、エル、エム、エー) でもログインでき、設定の変更も可能になる。ただしシリアルのみ
- telnet ... on : TELNET クライアントとしてtelnet コマンドが使用できる
- ssh ... on : SSH クライアントとしてssh コマンドが使用できる

[セキュリティクラスの設定](http://www.rtpro.yamaha.co.jp/RT/manual/rt-common/setup/security_class.html)

```
security class 1 on on on
```
