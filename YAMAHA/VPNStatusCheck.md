# VPN 接続確認方法

## SAの確認
```
# show ipsec sa
Total: isakmp:3 send:3 recv:3

sa    sgw isakmp connection    dir  life[s] remote-id
----------------------------------------------------------------------------
1     1    -     isakmp        -    21398   XXX.XXX.XXX
2     1    1     tun[0001]esp  send 21399   XXX.XXX.XXX
3     1    1     tun[0001]esp  recv 21399   XXX.XXX.XXX
4     1    1     tun[0001]esp  send 21400   XXX.XXX.XXX
5     1    1     tun[0001]esp  recv 21400   XXX.XXX.XXX
6     1    -     isakmp        -    21407   XXX.XXX.XXX
```

## トンネルの確認
```
# show status tunnel 1
TUNNEL[1]:
説明: とある接続先
  インタフェースの種類: IPsec
  トンネルインタフェースは接続されています
  開始: 2021/03/25 15:04:47
  通信時間: 2時間5分10秒
  受信: (IPv4) 391 パケット [23172 オクテット]
        (IPv6) 0 パケット [0 オクテット]
  送信: (IPv4) 4964 パケット [477836 オクテット]
        (IPv6) 0 パケット [0 オクテット]
``` 

## ルート情報の確認
```
# show ip route
宛先ネットワーク    ゲートウェイ     インタフェース  種別  付加情報
default             -                    PP[01]    static
XXX.XXX.XXX.XXX/32    -                    PP[01] temporary
192.168.1.0/24      -                 TUNNEL[1]    static
192.168.11.0/24     192.168.11.254         LAN1  implicit
```
