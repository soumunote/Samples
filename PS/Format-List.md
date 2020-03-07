# Format-List
リスト表示されるコマンドレットの実行結果を縦表示する。
**特に、\*を指定すると、全列表示可能である。**  
```
PS> get-command dotnet

CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
Application     dotnet.exe                                         3.100.1... C:\Program Files\dotnet\dotnet.exe
```

Format-List を通すと
```
PS> get-command dotnet | Format-List
Name            : dotnet.exe
CommandType     : Application
Definition      : C:\Program Files\dotnet\dotnet.exe
Extension       : .exe
Path            : C:\Program Files\dotnet\dotnet.exe
FileVersionInfo : File:             C:\Program Files\dotnet\dotnet.exe
                  InternalName:     .NET Core Host
                  OriginalFilename: .NET Core Host
                  FileVersion:      3,100,19,56502 @Commit: 65f04fb6db7a5e198d05dbebd5c4ad21eb018f89
                  FileDescription:  .NET Core Host
                  Product:          Microsoft® .NET Framework
                  ProductVersion:   3,100,19,56502 @Commit: 65f04fb6db7a5e198d05dbebd5c4ad21eb018f89
                  Debug:            False
                  Patched:          False
                  PreRelease:       False
                  PrivateBuild:     False
                  SpecialBuild:     False
                  Language:         英語 (米国)
```

Format-List に * を付けると**全列表示する**  
```
PS > get-command dotnet | Format-List *


HelpUri            :
FileVersionInfo    : File:             C:\Program Files\dotnet\dotnet.exe
                     InternalName:     .NET Core Host
                     OriginalFilename: .NET Core Host
                     FileVersion:      3,100,119,60804 @Commit: a1388f194c30cb21b36b75982962cb5e35954e4e
                     FileDescription:  .NET Core Host
                     Product:          Microsoft® .NET Framework
                     ProductVersion:   3,100,119,60804 @Commit: a1388f194c30cb21b36b75982962cb5e35954e4e
                     Debug:            False
                     Patched:          False
                     PreRelease:       False
                     PrivateBuild:     False
                     SpecialBuild:     False
                     Language:         英語 (米国)

Path               : C:\Program Files\dotnet\dotnet.exe
Extension          : .exe
Definition         : C:\Program Files\dotnet\dotnet.exe
Source             : C:\Program Files\dotnet\dotnet.exe
Version            : 3.100.119.60804
Visibility         : Public
OutputType         : {System.String}
Name               : dotnet.exe
CommandType        : Application
ModuleName         :
Module             :
RemotingCapability : PowerShell
Parameters         :
ParameterSets      :
```
