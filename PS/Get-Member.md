# Get-Member
オブジェクトのメンバー/メソッドを一覧表示する。  
(Get-Item 等で単に一覧表示した場合、省略されるため)
```PowerShell
PS > Get-Item . | Get-Member

   TypeName: System.IO.DirectoryInfo

Name                      MemberType     Definition
----                      ----------     ----------
LinkType                  CodeProperty   System.String LinkType{get=GetLinkType;}
Mode                      CodeProperty   System.String Mode{get=Mode;}
Target                    CodeProperty   System.Collections.Generic.IEnumerable`1[[System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b...
Create                    Method         void Create(), void Create(System.Security.AccessControl.DirectorySecurity directorySecurity)
CreateObjRef              Method         System.Runtime.Remoting.ObjRef CreateObjRef(type requestedType)
CreateSubdirectory        Method         System.IO.DirectoryInfo CreateSubdirectory(string path), System.IO.DirectoryInfo CreateSubdirectory(string path, Syst...
Delete                    Method         void Delete(), void Delete(bool recursive)
.....
```
