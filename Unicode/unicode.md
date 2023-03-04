# Unicode 
## 概要・用語

- 符号化文字集合(CCS: Coded Character Set) 
  コンピュータが扱う文字の集合  
  Unicode, JIS X 0208, JIS X 0213 等がある  
  各文字には非負整数値を割り当てる(符号位置・コードポイント：Code Point) Unicodeの用語ではUnicodeスカラー値という  
  Unicodeスカラー値は、 U+0000〜U+10FFFF で表現する  
  
- 文字符号化方式(CES: Character Encoding Scheme)  
  符号化文字集合のコードポイントを、実際にコンピュータが利用できるバイト列に変換する符号化方式  
  Unicode に対する符号化方式 ... UTF-8, UTF-16, UTF-32  
  JIS X 0208 に対する符号化方式 ... ISO-2022-JP, EUC-JP, Shift_JIS  

## Unicode のコードポイント
面(8bit) + ( 区(8bit) + 点(8bit) ) で定義する。  (面は0〜16 の17面なので5bit 合計 21 bit で足りる)  
第0面〜第16面まで定義されている。  
第0面 ... 基本多言語面(BMP: Basic Multilingual Plane) 16bitで表現可能  
第1面 ... 追加多言語面(SMP: Supplementary Multilingual Plane)  
...  
BMPは、16bitの U+0000〜U+FFFFで表現できる。
最後の16面は、U+100000〜U+10FFFF

##  Unicode の符号化方式
### UTF-32  
32 bit の固定長で、Unicodeスカラー値と正確に一致する  

### UTF-16  
Unicodeスカラー を 16 bit または 32 bit に変換する。  
bmp … 16 bit  
第1面以降 …  BMP の未使用領域(U+D800-U+DFFF:サロゲートコードポイント) へ変換演算して 16 bit + 16 bit で表現する。  

### UTF-8
ASCII と同じ部分は 8bit 、その他の部分を 16〜32 bit (2〜4byte) で表現する。  
符号単位が 8bit なので UTF-32(UTF-32BE, UTF-32LE)、UTF-16(UTF-16BE, UTF-16LE) のようにエンディアンを気にする必要がない。  

### プログラミング言語での扱い

#### C#
[System.Char](https://learn.microsoft.com/ja-jp/dotnet/api/system.char?view=net-7.0) … 文字をUTF-16 コードで表現します。  
UTF-32は、[文字列のエスケープシーケンス](https://learn.microsoft.com/ja-jp/dotnet/csharp/programming-guide/strings/#string-escape-sequences)(\U00HHHHHH)にて指定可能。  
```cs
using System.Globalization;

char c1 = '\u00E9';
Console.WriteLine(c1);
string s1 = Char.ConvertFromUtf32(0x0001_F47D);
Console.WriteLine(s1);
Console.WriteLine(s1.Length);
Console.WriteLine(new StringInfo(s1).LengthInTextElements);
string s2 = "\U0001F47D";
Console.WriteLine(s2);
Console.WriteLine(s2.Length);
Console.WriteLine(new StringInfo(s2).LengthInTextElements);
// é
// 👽
//2
// 1
// 👽
// 2
// 1
```

#### Swift
[文字列内の特殊文字](https://www.swiftlangjp.com/language-guide/strings-and-characters.html)にある通り、
\u{n} nは1〜8桁の16進（Unicodeスカラー）
[Character型](https://developer.apple.com/documentation/swift/character)はUnicodeスカラーの値の集まりで、人が１文字として認識する１文字。  
後述する合字もスカラーの集まりで1文字として扱う。(Charcter型に格納される。)  
```Swift
let c1:Character = "\u{E9}"
let c2:Character = "\u{65}\u{301}"
let c3:Character = "\u{1F47D}"
print(c1)
print(c2)
print(c3)
// é
// é
// 👽
```

## 拡張初期素クラスタ(Entended Graoheme Clusters)
人間が読み取れる1文字を生成するための、1つ以上のUnicodeスカラーの<u>配列</u> 
例)  
é … U+00E9  
é … U+0065 + U+0301 ( e + &#x0301)   

### プログラミング言語での合字比較

### C# (.NET)
```cs
var c1 = new string(new char[] { '\u00E9' });
var c2 = new string(new char[] { '\u0065', '\u0301' });

Console.WriteLine(c1);
Console.WriteLine(c2);
Console.WriteLine($"\"{c1}\" == \"{c2}\" => {c1 == c2}");
Console.WriteLine($"\"{c1}\".Equals(\"{c2}\") => {c1.Equals(c2)}");
Console.WriteLine($"\"{c1}\".Equals(\"{c2}, CurrentCulture\") => {c1.Equals(c2, StringComparison.CurrentCulture)}");
Console.WriteLine($"\"{c1}\".Equals(\"{c2}, InvariantCulture\") => {c1.Equals(c2, StringComparison.InvariantCulture)}");
Console.WriteLine($"\"{c1}\".Equals(\"{c2}, Ordinal\") => {c1.Equals(c2, StringComparison.Ordinal)}");
Console.WriteLine($"\"{c1}\".CompareTo(\"{c2}\") => {c1.CompareTo(c2)}");
// "é" == "é" => False
// "é".Equals("é") => False
// "é".Equals("é, CurrentCulture") => True
// "é".Equals("é, InvariantCulture") => True
// "é".Equals("é, Ordinal") => False
// "é".CompareTo("é") => 0
```

### Swift
```swift
let c1:Character = "\u{E9}"
let c2:Character = "\u{65}\u{301}"
print("\(c1) == \(c2) => \(c1 == c2)")
// é == é => true
```

## プログラミング言語での扱い(補足)

### C# (.NET)
System.Char は、UTF-16 を格納する。  
Swift の Character に匹敵するのは、 [System.Text.Rune](https://learn.microsoft.com/ja-jp/dotnet/api/system.text.rune.-ctor?view=net-7.0) と言えよう。  
 ### Swift
Swift の Charter は 純粋に、 Unicodeスカラーを扱う。
- [String→UTF-8](https://developer.apple.com/documentation/swift/string/utf8view)
- [String→UTF-16](https://developer.apple.com/documentation/swift/string/utf16view)

## 文字列の幅
[EAST ASIAN WIDTH](http://www.unicode.org/reports/tr11/tr11-38.html）

参考サイト）  
- [.NET での文字エンコード(MSDN)](https://learn.microsoft.com/ja-jp/dotnet/standard/base-types/character-encoding-introduction)  
- [文字と文字列(Strings and Characters)(The Swift Programming Language)](https://www.swiftlangjp.com/language-guide/strings-and-characters.html#unicode)  
- [UnicodeとUTF-8の違い。UTF-8・UTF-16・UTF-32とは](https://elite-lane.com/difference-between-unicode-and-utf-8-and-utf-16-and-utf-32/)  
- [文字集合(CCS)と符号化方式(CES)とは](http://office-qa.com/win/win243.htm)  
- [とほほの文字コード入門](https://www.tohoho-web.com/ex/charset.html)  
- [C++で学ぶUnicodeの基本とUTF-8, UTF-16, UTF-32の相互変換アルゴリズム](https://contentsviewer.work/Master/Programming/unicode-utf-conversion/unicode-utf-conversion)  
