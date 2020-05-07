# Sort-Object
オブジェクトをソートする

-Property プロパティ名
-Descending
  
```PowerShell
PS C:\Users\maeda\Source\Repos> (Get-Item * | Sort-Object -Property CreationTime -Descending)[0..10]

    ディレクトリ: C:??Source\Repos

Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----       2020/05/07     12:28                foo02
d-----       2020/05/02     14:53                Samples
d-----       2020/05/02     11:00                Gtk2HsSample
d-----       2020/05/01     17:49                gloss-tutorial
d-----       2020/03/17     13:15                ConsoleApp9
d-----       2020/03/17     13:03                ConsoleApp8
d-----       2020/03/11     14:26                WindowsApp3
d-----       2020/03/05     10:34                WindowsApp2
d-----       2020/03/05      9:45                ConsoleApplication9
d-----       2020/03/04     17:57                WinFormsRXUI
d-----       2020/03/04     16:21                WindowsApp1
```
