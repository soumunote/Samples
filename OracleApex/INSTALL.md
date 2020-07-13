# Oracle Apex 20.1 Install

---
[5.4.1 Installing Application Express](https://docs.oracle.com/en/database/oracle/application-express/20.1/htmig/downloading-installing-Oracle-AE.html#GUID-7E432C6D-CECC-4977-B183-3C654380F7BF)

## インストールイメージの解凍(必須)
   `C:\downloads\apex_20.1\apex`

## インストール
   ```
   C:\downloads\apex_20.1\apex>sqlplus /nologSQL*Plus: Release 19.0.0.0.0 - Production on 月 7月 13 11:49:58 2020
   Version 19.3.0.0.0
   Copyright (c) 1982, 2019, Oracle.  All rights reserved.
   SQL> conn sys as sysdba
   パスワードを入力してください:<パスワード>
   接続されました。
   SQL> @apexins.sql SYSAUX SYSAUX TEMP /i/
   ```
 ## Instance Administrator パスワードの変更
   ↓以下を実施しても、スキーマユーザは作成されない...
   ```
   C:\downloads\apex_20.1\apex>sqlplus /nolog
   SQL*Plus: Release 19.0.0.0.0 - Production on 月 7月 13 12:41:51 2020
   Version 19.3.0.0.0
   Copyright (c) 1982, 2019, Oracle.  All rights reserved.

   SYS> @apxchpwd.sql
   ...set_appun.sql
   ================================================================================
   This script can be used to change the password of an Application Express
   instance administrator. If the user does not yet exist, a user record will be
   created.
   ================================================================================
   Enter the administrator's username [ADMIN]
   User "ADMIN" does not yet exist and will be created.
   Enter ADMIN's email [ADMIN]
   Enter ADMIN's password []<パスワード(#を使う)>
   ```
   * Password must contain at least one punctuation character (!"#$%&()``*+,-/:;?_)

---
[5.4.4 Configuring the APEX_PUBLIC_USER Account](https://docs.oracle.com/en/database/oracle/application-express/20.1/htmig/downloading-installing-Oracle-AE.html#GUID-0619448A-56FB-43E1-A479-C45EC5002E4B)

## APEX_PUBLIC_USER アカウントの構成
  ```
  C:\downloads\apex_20.1\apex>sqlplus /nolog
  SQL*Plus: Release 19.0.0.0.0 - Production on 月 7月 13 12:41:51 2020
  Version 19.3.0.0.0
  Copyright (c) 1982, 2019, Oracle.  All rights reserved.

  SQL> conn sys as sysdba
  パスワードを入力してください:<パスワード>
  接続されました。
  
  SQL> alter user APEX_PUBLIC_USER account unlock;
  ユーザーが変更されました。

  SQL> alter user APEX_PUBLIC_USER identified by <パスワード>;
  ユーザーが変更されました。
  ```
 ---
 [5.4.5 Configuring RESTful Services](https://docs.oracle.com/en/database/oracle/application-express/20.1/htmig/downloading-installing-Oracle-AE.html#GUID-93638EC4-5278-421B-9C19-BB68F9B31C40)
 
## RESTful Services の構成
  この時点で、`APEX_LISTENER`,`APEX_REST_PUBLIC_USER`は存在しない  
  ``` 
  SQL> @apex_rest_config.sql
  ...
  Enter a password for the APEX_LISTENER user              []<パスワード>
  Enter a password for the APEX_REST_PUBLIC_USER user              []<パスワード>
  ```
  ここで、`APEX_LISTENER`,`APEX_REST_PUBLIC_USER`が作成されている。

---
[5.5 Downloading and Installing Oracle REST Data Services](https://docs.oracle.com/en/database/oracle/application-express/20.1/htmig/downloading-installing-Oracle-REST-data-services.html#GUID-1F0064FB-7F00-4ACE-85BD-E9B2AF73A233)

  ```
  C:\app\oracle>mkdir ords
  ■■■■■■■■■■　ここで、Explorer にて unzip とコピー　■■■■■■■■■■
  C:\app\oracle>dir
   ドライブ C のボリューム ラベルがありません。
   ボリューム シリアル番号は 2E8C-6F51 です

   C:\app\oracle のディレクトリ

  2020/07/13  13:49    <DIR>          .
  2020/07/13  13:49    <DIR>          ..
  2020/06/18  10:51    <DIR>          admin
  2020/06/18  10:59    <DIR>          audit
  2020/06/18  10:50    <DIR>          cfgtoollogs
  2020/06/18  10:31    <DIR>          checkpoints
  2020/06/18  10:31    <DIR>          diag
  2020/06/18  10:51    <DIR>          oradata
  2020/07/13  13:49    <DIR>          ords
  2020/06/18  10:14    <DIR>          product
                 0 個のファイル                   0 バイト
                10 個のディレクトリ  21,849,116,672 バイトの空き領域
  ```

  ```
  C:\app\oracle\ords>C:\app\oracle\product\19.3.0\DB_1\jdk\bin\java.exe -jar ords.war help
  java -jar ords.war <COMMAND> [オプション] [引数]

    次のコマンドが使用可能です:

                 configdir         web.xml
                                   config.dirプロパティの値を設定します
  
                 generate-access-tokenGenerate an access token that
                                   can be exchanged for a cookie
                                   session
  
                 help              このプログラムまたはコマンドの使用方法を説明します
  
                 http-wallet       Generate Oracle Auto-Login
                                   wallet to hold HTTP Basic or
                                   OAuth Resource Owner
                                   Credentials
  
                 install           Oracle REST Data
                                   Servicesをインストールします
  
                 map-url           URLパターンを、指定したデータベース接続にマップします
  
                 oam-config        Oracle WebLogicでOracle Access
  
  String index out of range: -1
  ```
