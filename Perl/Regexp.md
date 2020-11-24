# Perlのワンライナーと正規表現
## サンプル
-e のみの指定
```Perl
$ perl -e '"山田 太郎 12番" =~ /((?<lastName>\S+)\s+|)(?<firstName>\S+)\s(?<no>\d+)\S+/;print "$+{firstName}\n"'
太郎
```
-nle を指定し、標準入力から値を取るパターン
```Perl
$ echo "太郎 12番" | perl -ne '/((?<lastName>\S+)\s+|)(?<firstName>\S+)\s(?<no>\d+)\S+/;print "$+{firstName}\n"'
太郎
```

## ワンライナー
[参考元 perldoc.jp perlrun - Perlインタプリタの起動方法](https://perldoc.jp/docs/perl/5.26.1/perlrun.pod)
- -e **commandline**  
  1行のプログラムを指定するのに使用する。-eが指定されるとPerlは引数のリストからファイル名を探さない  
- -n 以下のようなループが実際のプログラムの周りにあるかのようにPerlに指示する。  
  各行の印字を行う場合は -p を使用する  
   ```Perl
   LINE:
     while (<>) {
        ...
     }
   ```
- -p 以下のようなループが実際のプログラムの周りにあるかのようにPerlに指示する。　　
   ```Perl
   LINE:
     while (<>) {
       ...
     }
     continue {
       print or die "-p destination: $!\n";
     }
   ```
 - -l  
   自動の行末処理を行う
 
 ## 正規表現(名前付きグループ)
 [参照元 perldoc.jp perlretut Perlの正規表現チュートリアル](https://perldoc.jp/docs/perl/5.26.1/perlretut.pod#Named32backreferences)
 (?<name>...) と書く
 
 
