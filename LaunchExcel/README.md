## OLE2の機能でEXCELを起動するサンプル

当然、通常のCreateProcess()等を使用した方が楽である。
また、IDispatchインタフェース経由で、Visible=Trueを行わないと、Excelのメインウィンドウは表示されないが、
タスクマネージャで起動は確認できる。

参照)
[MFC または #import を使用せずに C++ から Excel を自動化する方法](https://docs.microsoft.com/ja-jp/office/troubleshoot/office-developer/automate-excel-from-c)

以下の2行は同じ意味
```
hr = CoCreateInstance(clsid, NULL, CLSCTX_LOCAL_SERVER, IID_PPV_ARGS(&pxlApp));
hr = CoCreateInstance(clsid, NULL, CLSCTX_LOCAL_SERVER, IID_IDispatch, (LPVOID*)&pxlApp);
```
