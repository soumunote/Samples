# Oracle Apex 20.1 Install

## JAVA PATH設定

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

[5.4.5 Configuring RESTful Services](https://docs.oracle.com/en/database/oracle/application-express/20.1/htmig/downloading-installing-Oracle-AE.html#GUID-93638EC4-5278-421B-9C19-BB68F9B31C40)

```
C:\downloads\apex_20.1\apex>sqlplus /nolog
SQL*Plus: Release 19.0.0.0.0 - Production on 火 7月 14 15:34:19 2020
Version 19.3.0.0.0
Copyright (c) 1982, 2019, Oracle.  All rights reserved.

SQL> conn sys/Kbc12345 as sysdba
接続されました。
SQL> @apex_rest_config.sql

PL/SQLプロシージャが正常に完了しました。
PL/SQLプロシージャが正常に完了しました。
Enter a password for the APEX_LISTENER user              []
Enter a password for the APEX_REST_PUBLIC_USER user              []
```
   
## ORDS イメージのコピー
  なぜか、`ords.version.number.zip`の解凍先フォルダの指定がマニュアルに無い。  
  探しても。  
  辛うじて、以下のサイトで言及がある。  
  [Oracle REST Data Services (ORDS) : Installation on Tomcat](https://oracle-base.com/articles/misc/oracle-rest-data-services-ords-installation-on-tomcat#ords-installation)  
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

 C:\app\oracle\ords>sqlplus /nolog

SQL*Plus: Release 19.0.0.0.0 - Production on 火 7月 14 16:53:08 2020
Version 19.3.0.0.0

Copyright (c) 1982, 2019, Oracle.  All rights reserved.

SQL> conn sys/Kbc12345 as sysdba
接続されました。

SQL> @installer\ords_installer_privileges.sql sys  
   
   C:\app\oracle\ords>sqlplus /nolog

SQL*Plus: Release 19.0.0.0.0 - Production on 火 7月 14 16:53:08 2020
Version 19.3.0.0.0

Copyright (c) 1982, 2019, Oracle.  All rights reserved.

SQL> conn sys/Kbc12345 as sysdba
接続されました。
SQL> @installer\ords_installer_privileges.sql
1に値を入力してください:
SQL> @installer\ords_installer_privileges.sql sys

SQL> exit
Oracle Database 19c Standard Edition 2 Release 19.0.0.0.0 - Production
Version 19.3.0.0.0との接続が切断されました。

C:\app\oracle\ords>java -jar ords.war install advanced
このOracle REST Data Servicesインスタンスはまだ構成されていません。
次のプロンプトを完了してください


構成データを格納する場所を入力してください: C:\app\oracle\ords\install
使用するデータベース接続タイプを指定します。
番号を入力してください: [1] 基本  [2] TNS  [3] カスタムURL [1]:1
データベース・サーバーの名前を入力してください [localhost]:
データベースのリスニング・ポートを入力してください [1521]:
データベース・サービス名を指定するには1を、データベースSIDを指定するには2を入力してください [1]:
データベース・サービス名を入力してください:orcl
Oracle REST Data Servicesスキーマを確認/インストールする場合は1を、このステップをスキップする場合は2を入力してください [1]:
ORDS_PUBLIC_USERのデータベース・パスワードを入力してください:
パスワードの確認:
管理者権限でログインし、Oracle REST Data Servicesスキーマを確認する必要があります。

管理者ユーザー名を入力してください:sys
SYS AS SYSDBAのデータベース・パスワードを入力してください:
パスワードの確認:
データベース・ユーザー: SYS AS SYSDBA URL: jdbc:oracle:thin:@//localhost:1521/orclに接続しています

情報の取得中.
ORDS_METADATAのデフォルト表領域を入力してください [SYSAUX]:
ORDS_METADATAの一時表領域を入力してください [TEMP]:
ORDS_PUBLIC_USERのデフォルト表領域を入力してください [USERS]:
ORDS_PUBLIC_USERの一時表領域を入力してください [TEMP]:
PL/SQLゲートウェイを使用する場合は1を、このステップをスキップする場合は2を入力してください
Oracle Application Expressを使用しているかmod_plsqlから移行する場合は、1を入力する必要があります [1]:
Oracle Application Expressを使用しているかmod_plsqlから移行する場合は、1を入力する必要があります [1]:
PL/SQLゲートウェイ・データベースのユーザー名を入力してください [APEX_PUBLIC_USER]:APEX_PUBLIC_USERのデータベース・パスワードを入力してください:
C:\app\oracle\ords>java -jar ords.war install advanced
使用するデータベース接続タイプを指定します。
番号を入力してください: [1] 基本  [2] TNS  [3] カスタムURL [1]:
データベース・サーバーの名前を入力してください [localhost]:
データベースのリスニング・ポートを入力してください [1521]:
データベース・サービス名を指定するには1を、データベースSIDを指定するには2を入力してください [1]:
データベース・サービス名を入力してください:orcl
Oracle REST Data Servicesスキーマを確認/インストールする場合は1を、このステップをスキップする場合は2を入力してください [1]:
ORDS_PUBLIC_USERのデータベース・パスワードを入力してください:
パスワードの確認:
管理者権限でログインし、Oracle REST Data Servicesスキーマを確認する必要があります。

管理者ユーザー名を入力してください:sys
SYS AS SYSDBAのデータベース・パスワードを入力してください:
パスワードの確認:
データベース・ユーザー: SYS AS SYSDBA URL: jdbc:oracle:thin:@//localhost:1521/orclに接続しています

情報の取得中.
ORDS_METADATAのデフォルト表領域を入力してください [SYSAUX]:
ORDS_METADATAの一時表領域を入力してください [TEMP]:
ORDS_PUBLIC_USERのデフォルト表領域を入力してください [USERS]:
ORDS_PUBLIC_USERの一時表領域を入力してください [TEMP]:
PL/SQLゲートウェイを使用する場合は1を、このステップをスキップする場合は2を入力してください
Oracle Application Expressを使用しているかmod_plsqlから移行する場合は、1を入力する必要があります [1]:1
PL/SQLゲートウェイ・データベースのユーザー名を入力してください [APEX_PUBLIC_USER]:
APEX_PUBLIC_USERのデータベース・パスワードを入力してください:
パスワードの確認:
Application Express RESTfulサービスのデータベース・ユーザー(APEX_LISTENER, APEX_REST_PUBLIC_USER)にパスワードを使用する には1を、このステップをスキップするには2を入力してください [1]:
APEX_LISTENERのデータベース・パスワードを入力してください:
パスワードの確認:
APEX_REST_PUBLIC_USERのデータベース・パスワードを入力してください:
パスワードの確認:
番号を入力して、有効化する機能を選択してください:
   [1] SQL Developer Web (すべての機能を有効化)
   [2] REST対応SQL
   [3] データベースAPI
   [4] REST対応SQLとデータベースAPI
   [5] なし
選択 [1]:1   
2020-07-14T07:59:07.804Z INFO        reloaded pools: []
Oracle REST Data Servicesバージョン20.2.0.r1781804をインストールしています
... ログ・ファイルがC:\Users\Administrator\ords_install_core_2020-07-14_165907_00904.logに書き込まれました
... データベース前提条件を確認しました
... Oracle REST Data Servicesプロキシ・ユーザーを作成しました
... Oracle REST Data Servicesスキーマを作成しました
... Oracle REST Data Servicesに権限を付与しました
... Oracle REST Data Servicesデータベース・オブジェクトを作成しました
... ログ・ファイルがC:\Users\Administrator\ords_install_datamodel_2020-07-14_165920_00403.logに書き込まれました
... ログ・ファイルがC:\Users\Administrator\ords_install_apex_2020-07-14_165921_00234.logに書き込まれました
Oracle REST Data Servicesバージョン20.2.0.r1781804のインストールが完了しました。経過時間: 00:00:14.146

スタンドアロン・モードで起動するには1を、終了するには2を入力してください [1]:1
APEX静的リソースの場所を入力します:C:\app\oracle\ords\apex\images   
   
   
   
   
   
   
   
   
   
   ---
   ---
   ---
   ---
   ---
   
   
   
   
   
   
   
   

[1.3.4.1 ORDS Installer Privileges Script](https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/19.2/aelig/installing-REST-data-services.html#GUID-C613F122-E849-4EDC-8169-04140EDCFB64)

```
C:\app\oracle\ords>sqlplus /nolog

SQL*Plus: Release 19.0.0.0.0 - Production on 火 7月 14 09:42:04 2020
Version 19.3.0.0.0

Copyright (c) 1982, 2019, Oracle.  All rights reserved.

SQL> conn sys/Kbc12345 as sysdba
接続されました。
SQL> @installer/ords_installer_privileges.sql sys
```

```
java -jar ords.war install advance
```

[1.5.3 Configuring Oracle Application Express Images](https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/19.2/aelig/installing-REST-data-services.html#GUID-262EA0C7-682C-4D67-8189-2984A483B5A7)
java -jar ords.war static C:\app\oracle\ords\apex\images











[1.3.4.2 Advanced Installation Using Command-Line Prompts](https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/19.2/aelig/installing-REST-data-services.html#GUID-6F7B4E61-B730-4E73-80B8-F53299123730)
##
```
C:\app\oracle\ords>dir
 ドライブ C のボリューム ラベルがありません。
 ボリューム シリアル番号は 2E8C-6F51 です

 C:\app\oracle\ords のディレクトリ

2020/07/13  13:49    <DIR>          .
2020/07/13  13:49    <DIR>          ..
2020/07/13  13:49    <DIR>          docs
2020/07/13  13:49    <DIR>          examples
2019/07/05  18:26            38,023 index.html
2020/07/13  13:49    <DIR>          installer
2019/07/18  16:53        62,454,471 ords.war
2020/07/13  13:49    <DIR>          params
               2 個のファイル          62,492,494 バイト
               6 個のディレクトリ  21,596,942,336 バイトの空き領域

C:\app\oracle\ords>java -jar ords.war install advanced
このOracle REST Data Servicesインスタンスはまだ構成されていません。
次のプロンプトを完了してください

構成データを格納する場所を入力してください: config
データベース・サーバーの名前を入力してください [localhost]:
データベースのリスニング・ポートを入力してください [1521]:
データベース・サービス名を指定するには1を、データベースSIDを指定するには2を入力してください [1]:
データベース・サービス名を入力してください:orcl
Oracle REST Data Servicesスキーマを確認/インストールする場合は1を、このステップをスキップする場合は2を入力してください [1]:
ORDS_PUBLIC_USERのデータベース・パスワードを入力してください:
パスワードの確認:
Oracle REST Data Servicesスキーマを確認するには、SYS AS SYSDBAが必要です。

Enter the administrator username:sys
SYS AS SYSDBAのデータベース・パスワードを入力してください:
パスワードの確認:

情報の取得中.
Enter the default tablespace for ORDS_METADATA [SYSAUX]:
Enter the temporary tablespace for ORDS_METADATA [TEMP]:
Enter the default tablespace for ORDS_PUBLIC_USER [USERS]:
Enter the temporary tablespace for ORDS_PUBLIC_USER [TEMP]:
PL/SQLゲートウェイを使用する場合は1を、このステップをスキップする場合は2を入力してください
Oracle Application Expressを使用しているかmod_plsqlから移行する場合は、1を入力する必要があります [1]:2
7 13, 2020 6:44:50 午後
情報: reloaded pools: []
Oracle REST Data Servicesバージョン19.2.0.r1991647をインストールしています
... ログ・ファイルがC:\Users\Administrator\ords_install_core_2020-07-13_184450_00611.logに書き込まれました
... データベース前提条件を確認しました
... Oracle REST Data Servicesプロキシ・ユーザーを作成しました
... Oracle REST Data Servicesスキーマを作成しました
... Oracle REST Data Servicesに権限を付与しました
... Oracle REST Data Servicesデータベース・オブジェクトを作成しました
... ログ・ファイルがC:\Users\Administrator\ords_install_datamodel_2020-07-13_184458_00137.logに書き込まれました
... ログ・ファイルがC:\Users\Administrator\ords_install_apex_2020-07-13_184459_00207.logに書き込まれました
Oracle REST Data Servicesバージョン19.2.0.r1991647のインストールが完了しました。経過時間: 00:00:09.674

スタンドアロン・モードで起動するには1を、終了するには2を入力してください [1]:
HTTPを使用する場合は1を、HTTPSを使用する場合は2を入力してください [1]:
HTTPポートを入力してください [8080]:
2020-07-13 18:45:44.834:INFO::main: Logging initialized @165420ms to org.eclipse.jetty.util.log.StdErrLog
7 13, 2020 6:45:44 午後
情報: HTTP and HTTP/2 cleartext listening on port: 8080
7 13, 2020 6:45:44 午後
情報: Disabling document root because the specified folder does not exist: C:\app\oracle\ords\config\ords\standalone\doc_root
2020-07-13 18:45:45.319:INFO:oejs.Server:main: jetty-9.4.z-SNAPSHOT; built: 2019-05-02T09:46:34.874Z; git: 14f32d50076f2b706f41a33066eb364d8492e199; jvm 1.8.0_201-b09
2020-07-13 18:45:45.352:INFO:oejs.session:main: DefaultSessionIdManager workerName=node0
2020-07-13 18:45:45.353:INFO:oejs.session:main: No SessionScavenger set, using defaults
2020-07-13 18:45:45.354:INFO:oejs.session:main: node0 Scavenging every 600000ms
7 13, 2020 6:45:45 午後
情報: Configuration properties for: |apex|pu|
cache.caching=false
cache.directory=/tmp/apex/cache
cache.duration=days
cache.expiration=7
cache.maxEntries=500
cache.monitorInterval=60
cache.procedureNameList=
cache.type=lru
db.hostname=localhost
db.password=******
db.port=1521
db.servicename=orcl
db.username=ORDS_PUBLIC_USER
debug.debugger=false
debug.printDebugToScreen=false
error.keepErrorMessages=true
error.maxEntries=50
jdbc.DriverType=thin
jdbc.InactivityTimeout=1800
jdbc.InitialLimit=3
jdbc.MaxConnectionReuseCount=1000
jdbc.MaxLimit=10
jdbc.MaxStatementsLimit=10
jdbc.MinLimit=1
jdbc.statementTimeout=900
log.logging=false
log.maxEntries=50
misc.compress=
misc.defaultPage=apex
resource.templates.enabled=true
security.disableDefaultExclusionList=false
security.maxEntries=2000

7 13, 2020 6:45:45 午後
警告: *** 構成|apex|pu|のjdbc.MaxLimitで10の値を使用しています。この設定は製品環境には十分なサイズではない可能性があります ***
7 13, 2020 6:45:45 午後
警告: *** 構成|apex|pu|のjdbc.InitialLimitで3の値を使用しています。この設定は製品環境には十分なサイズではない可能性があ ります ***
7 13, 2020 6:45:45 午後
情報: Oracle REST Data Services initialized
Oracle REST Data Services version : 19.2.0.r1991647
Oracle REST Data Services server info: jetty/9.4.z-SNAPSHOT

2020-07-13 18:45:46.286:INFO:oejsh.ContextHandler:main: Started o.e.j.s.ServletContextHandler@53aac487{/ords,null,AVAILABLE}
2020-07-13 18:45:46.308:INFO:oejs.AbstractConnector:main: Started ServerConnector@766653e6{HTTP/1.1,[http/1.1, h2c]}{0.0.0.0:8080}
2020-07-13 18:45:46.309:INFO:oejs.Server:main: Started @166895ms
```

[5.6 Configuring Oracle REST Data Services](https://docs.oracle.com/en/database/oracle/application-express/20.1/htmig/configuring-Oracle-REST-data-services.html#GUID-AD38DE06-A560-4D6D-BD50-6E5A8E513BBF)


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
[1.3.4 Downloading, Configuring and Installing Oracle REST Data Services](https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/19.2/aelig/installing-REST-data-services.html#GUID-B6661F35-3EE3-4CB3-9379-40D0B8E24635)


---
## 参考
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
