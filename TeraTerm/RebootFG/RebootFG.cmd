set TTMACRO="C:\Program Files (x86)\TeraTerm\ttpmacro.exe"

set HOSTNAME=(ホスト名)
set USERNAME=admin
set PASSWORD=(パスワード)

set MACRO_FILE=rebootFG.ttl
set MACRO_PATH="%~dp0%MACRO_FILE%"
@rem %0  ... コマンド名
@rem %~0 ... 上記のクォート無し
@rem d   ... 上記のドライブ文字
@rem p   ... 上記のドライブ文字抜き

%TTMACRO% %MACRO_PATH% %HOSTNAME% %USERNAME% %PASSWORD%
