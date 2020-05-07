# Get-Command
何も指定しないと、全てのコマンドレット等が表示される一方、アプリケーションは表示されない。
```PowerShell
PS> Get-Command -h
CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
Function        Add-BCDataCacheExtension                           1.0.0.0    BranchCache
Function        Add-BitLockerKeyProtector                          1.0.0.0    BitLocker
Function        Add-DnsClientNrptRule                              1.0.0.0    DnsClient
Function        Add-DtcClusterTMMapping                            1.0.0.0    MsDtc
```

アプリケーション名を指定すると、そのアプリケーションの詳細が表示される。
```
PS> Get-Command notepad
CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
Application     notepad.exe                                        10.0.18... C:\WINDOWS\system32\notepad.exe
```

↑ Version など一部切れてしまうので、[Format-List](./Format-List.md)と組み合わせて利用する。
