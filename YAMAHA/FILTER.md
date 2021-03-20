# IP Filter 設定

## PPインタフェースへの割り当て
```
ip pp secure filter in 200003 200020 200021 200022 200023 200024 200025 200030 200032 200100 200101 200102
ip pp secure filter out 200013 200020 200021 200022 200023 200024 200025 200099 →
              → dynamic 200080 200081 200082 200083 200084 200085 200098 200099
```

## PP in
```
##### IP Spoofing 対策 #####
ip filter 200003 reject 192.168.100.0/24 * * * *
##### NBT 関連をブロック #####
ip filter 200020 reject * * udp,tcp 135 *
ip filter 200021 reject * * udp,tcp * 135
ip filter 200022 reject * * udp,tcp netbios_ns-netbios_ssn *
ip filter 200023 reject * * udp,tcp * netbios_ns-netbios_ssn
ip filter 200024 reject * * udp,tcp 445 *
ip filter 200025 reject * * udp,tcp * 445
##### ICMP Ident を許可 #####
ip filter 200030 pass * 192.168.100.0/24 icmp * *
ip filter 200032 pass * 192.168.100.0/24 tcp * ident
##### IPsec VPN #####
ip filter 200100 pass * 192.168.100.1 udp * 500
ip filter 200101 pass * 192.168.100.1 esp * *
ip filter 200102 pass * 192.168.100.1 udp * 4500
```

## PP out
```
##### ローカルアドレスへの送信はあり得ない #####
ip filter 200013 reject * 192.168.100.0/24 * * *
##### NBT 関連をブロック #####
ip filter 200020 reject * * udp,tcp 135 *
ip filter 200021 reject * * udp,tcp * 135
ip filter 200022 reject * * udp,tcp netbios_ns-netbios_ssn *
ip filter 200023 reject * * udp,tcp * netbios_ns-netbios_ssn
ip filter 200024 reject * * udp,tcp 445 *
ip filter 200025 reject * * udp,tcp * 445
##### 全許可 #####
ip filter 200099 pass * * * * *
##### ダイナミックフィルタ #####
ip filter dynamic 200080 * * ftp
ip filter dynamic 200081 * * domain
ip filter dynamic 200082 * * www
ip filter dynamic 200083 * * smtp
ip filter dynamic 200084 * * pop3
ip filter dynamic 200085 * * submission
ip filter dynamic 200098 * * tcp
ip filter dynamic 200099 * * udp
```
