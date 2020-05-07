# Add-Content
テキストファイルに文字列を追記する  
改行は\`(バッククォート)  
```PowerShell
PS > Add-Content -Path C:\tmp\xxx.vbp -Value "`n`n[VBCompiler]`nLinkSwitches=/TSAWARE`n"

PS > Get-Content -Path C:\tmp\xxx.vbp
.....
[MS Transaction Server]
AutoRefresh=1

[VBCompiler]
LinkSwitches=/TSAWARE

```
