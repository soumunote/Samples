# linux 共有ライブラリ

## 概要
|種類|ファイル名|例|リンク先|
|--|--|--|
|real name|libXXX.so.N.M|libhello.so.1.0|ファイル本体|
|so name|libXXX.so.N|libhello.so.1|libhello.so.1.0|
|linker name|libXXX.so|libhello.so|libhello.so.1|
- N ... メジャー番号
- M ... マイナー番号

## ソースファイル
```hello.h
void hello(const char*);
```

```hello.c
#include <stdio.h>

void hello(const char* name)
{
	printf("Hello %s.\n", name);
}
```

```sayhello.c
#include "hello.h"

int main(void)
{
	hello("World");
	return 0;
}
```


## linux 共有ライブラリの作成

1. コンパイル
```
$ gcc -o hello.c
```
IN  : hello.c
OUT : hello.o


2. ライブラリの作成
```
$ ld -shared -fPIC -soname libhello.so.1 -o libhello.so.1.0 -lc hello.o
```
IN  : hello.o
OUT : libhello.so.1.0

3. ライブラリのインストール 
```
$ sudo cp libhello.so.1.0 /usr/local/lib
$ sudo ldconfig
```
IN  : /usr/local/lib/libhello.so.1.0
OUT : /usr/local/lib/libhello.so.1 -> /usr/local/lib/libhello.so.1.0

4. soname シンボリックリンク作成
```
$ sudo ln -s /usr/local/lib/libhello.so.1 /usr/local/lib/libhello.so
```
IN  : /usr/local/lib/libhello.so.1
OUT : /usr/local/lib/libhello.so

5. 確認
```
$ ldconfig -p | grep hello
	libhello.so.1 (libc6,x86-64) => /usr/local/lib/libhello.so.1
	libhello.so (libc6,x86-64) => /usr/local/lib/libhello.so
```

## ライブラリの使用

