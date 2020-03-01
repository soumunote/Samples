# .NET の format strings に関するサンプル
ここでは主に数値に関する書式に関して記載する。  
参照)  
[Standard numeric format strings](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings)

## [Standard Numeric Format Strings](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings)  
```
Axx
```
| A |xx|
|---|--|
| format specifirer | precision specifier (optional) |

| Format Specifier | OUT | IN | Precision specifier |
|------------------|-----|----|---------------------|
| "C" or "c" | 通貨 | 数値全般 | 小数点以下桁数 | 
| "D" or "d" | 整数値 | 整数のみ | 最大桁数(他と異なる 123 -> D9 なら 000000123 ) | 
| "N" or "n" | カンマ付き数値| 数値全般 | 小数点以下桁数 | 

## format strings の使用方法
format strings は、以下の３つでサポートされる
1. ToStringメソッド
2. composit formatting feature (WriteLineメソッド, String.Formatメソッド)
3. interpolated strings

上記の３つは、フォーマットの起動方法が異なる。  
### ToString メソッド
この方法だと、全体の桁数は指定できない。以下の方法でも、マイナス記号の為に思ったようにならない  
`-123.ToString("D5")`  ... マイナス記号も含め6桁となる

### [Composit formatting feature](https://docs.microsoft.com/en-us/dotnet/standard/base-types/composite-formatting)
WriteLine等で使用するパターン  
フォーマットの指定は以下のとおり  
[{インデックス[,アライメント][:フォーマット文字列]}](https://docs.microsoft.com/en-us/dotnet/standard/base-types/composite-formatting#format-item-syntax)  
例  
```
Console.WriteLine("....*....1....*....2....*....3");
Console.WriteLine("{0}|{1}|{2}|", 12345.678, 12, -12);
Console.WriteLine("{0:N2}|{1:D5}|{2:D5}|", 12345.678, 12, -12);
Console.WriteLine("{0,9}|{1,9}|{2,9}|", 12345.678, 12, -12);
Console.WriteLine("{0,9:N2}|{1,9:D5}|{2,9:D5}|", 12345.678, 12, -12);
....*....1....*....2....*....3
12345.678|12|-12|
12,345.68|00012|-00012|
12345.678|       12|      -12|
12,345.68|    00012|   -00012|
```

### [interpolated string](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/tokens/interpolated)
以下のような文字列
```
Console.WriteLine($"チロルは{10:C}");
チロルは¥10
```
フォーマットの指定は、format strings の インデックスが、値にそのまま置き換わっただけである
[{値[,アライメント][:フォーマット文字列]}](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/tokens/interpolated#structure-of-an-interpolated-string)

