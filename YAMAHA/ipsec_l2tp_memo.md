＃IPsec／L2TP 

## トランスポートモードについてのメモ
### 例
```
tunnel select 1
 description tunnel 本社
 tunnel encapsulation l2tpv3
 tunnel endpoint address 192.168.1.252 xxx.xxx.xxx.xxx
 ipsec tunnel 101
  ipsec sa policy 101 1 esp aes-cbc sha-hmac
(中略)
tunnel select 30
 tunnel template 30-33
 description tunnel リモートアクセス
 tunnel encapsulation l2tp
 ipsec tunnel 30
  ipsec sa policy 30 30 esp aes-cbc sha-hmac
(中略)
tunnel select 31
 ip tunnel tcp mss limit auto
tunnel select 32
 ip tunnel tcp mss limit auto
tunnel select 33
 ip tunnel tcp mss limit auto
(中略)
ipsec transport 1 101 udp 1701
ipsec transport 30 30 udp 1701
ipsec transport template 30 31-33
```
### トランスポートモードの定義
```
ipsec transport id policy_id [proto [src_port_list [dst_port_list]]]
```
- 指定した ipsec transport コマンドの設定の展開先となるトランスポートIDを設定する  
  展開先のポリシーIDは展開先のトランスポートIDと同じ値が設定される
  ```
  ipsec transport template id1 id2 [id2 ...]
  ```


### 出展
[トランスポートモードの定義](https://www.rtpro.yamaha.co.jp/RT/manual/rt-common/ipsec/ipsec_transport.html)
[トランスポートモードのテンプレートの設定](https://www.rtpro.yamaha.co.jp/RT//manual/nvr500/ipsec/ipsec_transport_template.html)

