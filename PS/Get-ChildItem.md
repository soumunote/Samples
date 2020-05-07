# Get-ChildItem  
子アイテムを表示する。
```PowerShell
PS > Get-ChildItem .\Documents\*
    ディレクトリ: C:\Users\xxxxx\Documents

Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----       2020/02/20      9:29                essupd200220-0844
d-----       2020/01/28      6:01                Graphics
d-----       2019/06/19      9:48                IISExpress
d-----       2019/04/06     13:51                Microsoft Hardware
d-----       2020/03/07      9:02                My Kindle Content
d-----       2019/06/19      9:48                My Web Sites
```

-Recurse を指定すると、再帰的に表示する  
```PowerShell
PS C:\Users\maeda> Get-ChildItem -Recurse .\Documents\*
    ディレクトリ: C:\Users\xxxxx\Documents
Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----       2020/02/20      9:29                essupd200220-0844
d-----       2020/01/28      6:01                Graphics
d-----       2019/06/19      9:48                IISExpress
.....
    ディレクトリ: C:\Users\xxxxx\Documents\essupd200220-0844
Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----       2020/02/20      9:29                dll
-a----       2020/02/20      9:29          26006 nod0027.nup
-a----       2020/02/20      9:29         434798 nod0065.nup
-a----       2020/02/20      9:29          95023 nod00D8.nup
```

フルパスをとりたい場合、`Select-Object FullName`を加える   
```
PS C:\Users\xxxxx> Get-ChildItem -Recurse .\Documents\* | Select-Object FullName

FullName
--------
C:\Users\xxxxx\Documents\essupd200220-0844
C:\Users\xxxxx\Documents\Graphics
C:\Users\xxxxx\Documents\IISExpress
C:\Users\xxxxx\Documents\Microsoft Hardware
C:\Users\xxxxx\Documents\My Kindle Content
C:\Users\xxxxx\Documents\My Web Sites
C:\Users\xxxxx\Documents\Office のカスタム テンプレート
C:\Users\xxxxx\Documents\Remote Desktop定義
C:\Users\xxxxx\Documents\SolarWinds
```
