# Oracle Apex 20.1 Install
## インストールの前に
### 前提条件
|対象|バージョン|ダウンロード→解凍先|
|--|--|--|
|OS|Windows Server 2019||
|Database|Oracle Database 19c R 19.3.0|C:\app\oracle\product\19.3\dbhome_1|
|APEX|Oracle APEX 20.1.0.00.13|C:\downloads\apex_20.1\apex|
|REST|Oracle REST Data Services 20.2.0.r1781804|C:\downloads\ords-20.2.0.178.1804(後で移動)|
### ダウンロードするものなど
1. Oracle Database はダウンロード後インストール済とする
2. データベースは、カスタムにて APEX 無しで作成した
3. まぁ、上の全部と、以下の設定も事前に行う。  
   `%PATH%;C:\app\oracle\product\19.3\dbhome_1\jdk\bin`
4. APEX, ORDS に関しては、`C:\Downloads`にダウンロードしておく

## インストール
### 1. APEX インストールイメージの解凍
`C:\Downloads\apex_20.1\apex` の配下に解凍される。  
上記フォルダが APEX インストール作業のベースディレクトリとなる。  
[Application Express Installation Guide / 5.4.1 Installing Application Express](https://docs.oracle.com/en/database/oracle/application-express/20.1/htmig/downloading-installing-Oracle-AE.html#GUID-7E432C6D-CECC-4977-B183-3C654380F7BF)

### 2. SQL*Plus にてインストールの実行
手順 1 で解凍したしたフォルダをカレントにして、SQL*Plus を起動し、  
- `apex/apexins.sql` スクリプトを実行する。

```
C:\downloads\apex_20.1\apex>sqlplus /nolog
SQL*Plus: Release 19.0.0.0.0 - Production on 月 7月 13 11:49:58 2020
Version 19.3.0.0.0
Copyright (c) 1982, 2019, Oracle.  All rights reserved.
SQL> conn sys as sysdba
パスワードを入力してください:<パスワード>
接続されました。
SQL> @apexins.sql SYSAUX SYSAUX TEMP /i/
```

### 3. Instance Administrator パスワードの変更(作成)  
手順 1 で解凍したしたフォルダをカレントにして、SQL*Plus を起動し、  
- `apex/apxchpwd.sql` スクリプトを実行する。  

これで「ADMIN」ユーザが作られるらしい。  
[Application Express Installation Guide / 5.4.2.3 Running apxchpwd.sql](https://docs.oracle.com/en/database/oracle/application-express/20.1/htmig/downloading-installing-Oracle-AE.html#GUID-2DA3D4C1-EFB0-4FAF-841B-E90D58EF11E0)

```
C:\downloads\apex_20.1\apex>sqlplus /nolog
SQL*Plus: Release 19.0.0.0.0 - Production on 火 7月 14 18:39:21 2020
Version 19.3.0.0.0
Copyright (c) 1982, 2019, Oracle.  All rights reserved.
SQL> conn sys as sysdba
パスワードを入力してください:
接続されました。
SQL> @apxchpwd.sql
...set_appun.sql
================================================================================
This script can be used to change the password of an Application Express
instance administrator. If the user does not yet exist, a user record will be
created.
================================================================================
Enter the administrator's username [ADMIN]
User "ADMIN" does not yet exist and will be created.
Enter ADMIN's email [ADMIN]
Enter ADMIN's password []<font color="green"><パスワード(#付)></font>
Created instance administrator ADMIN.
```

### 4. APEX_PUBLIC_USER アカウントの構成
ここまでの時点で、`APEX_PUBLIC_USER`アカウントはロックされており、パスワードもランダムなので、  
SQL直起動で、ロック解除とパスワード設定を行う。  
- `alter user APEX_PUBLIC_USER account unlock;`  
- `alter user APEX_PUBLIC_USER identified by <パスワード>;`  

[Application Express Installation Guide / 5.4.4.1 About the APEX_PUBLIC_USER Account](https://docs.oracle.com/en/database/oracle/application-express/20.1/htmig/downloading-installing-Oracle-AE.html#GUID-382AFED6-6542-4E6E-9EF7-6DB1DC588E98)

```
C:\downloads\apex_20.1\apex>sqlplus /nolog
SQL*Plus: Release 19.0.0.0.0 - Production on 火 7月 14 18:58:08 2020
Version 19.3.0.0.0
Copyright (c) 1982, 2019, Oracle.  All rights reserved.
SQL> conn sys as sysdba
パスワードを入力してください:
接続されました。
SQL> alter user APEX_PUBLIC_USER account unlock;
ユーザーが変更されました。

SQL> alter user APEX_PUBLIC_USER identified by <パスワード>;
ユーザーが変更されました。
```

### 5. RESTful Services の構成
- `apex/apex_rest_config.sql`を実行する。  

これで何が行われるかは、以下を参照。  
APEX_LISTENER, APEX_REST_PUBLIC_USER が作成されることは間違いない。  
[Application Express Installation Guide / 5.4.5 Configuring RESTful Services](https://docs.oracle.com/en/database/oracle/application-express/20.1/htmig/downloading-installing-Oracle-AE.html#GUID-93638EC4-5278-421B-9C19-BB68F9B31C40)

```
C:\downloads\apex_20.1\apex>sqlplus /nolog

SQL*Plus: Release 19.0.0.0.0 - Production on 火 7月 14 19:21:39 2020
Version 19.3.0.0.0

Copyright (c) 1982, 2019, Oracle.  All rights reserved.

SQL> conn sys as sysdba
パスワードを入力してください:
接続されました。
SQL> @apex_rest_config.sql
PL/SQLプロシージャが正常に完了しました。
PL/SQLプロシージャが正常に完了しました。
Enter a password for the APEX_LISTENER user [] <パスワード>
Enter a password for the APEX_REST_PUBLIC_USER user [] <パスワード>
...set_appun.sql
...setting session environment
PL/SQLプロシージャが正常に完了しました。
プロシージャが作成されました。
セッションが変更されました。
コールが完了しました。
コールが完了しました。
セッションが変更されました。
プロシージャが削除されました。
...create APEX_LISTENER and APEX_REST_PUBLIC_USER users
PL/SQLプロシージャが正常に完了しました。
```
### 6. ORDS イメージのコピー
- ords.version.number.zip を解凍して app/oracle 配下にコピーする
- もうここで同時にordsフォルダ配下に apec/images をコピーする
```PowerShell
PS C:\Downloads> Copy-Item .\ords-20.2.0.178.1804\ -Destination C:\app\oracle\ords -Recurse
PS C:\Downloads> Copy-Item .\apex_20.1\apex\images -Destination C:\app\oracle\ords\apex\images -Recurse
```
最終的なフォルダ形態
```
C:\app\oracle
        \ords
          \apex
            \images
          \docs
          \examples
          \installer
          \params
          index.html
          ords.war
```
[5.5 Downloading and Installing Oracle REST Data Services](https://docs.oracle.com/en/database/oracle/application-express/20.1/htmig/downloading-installing-Oracle-REST-data-services.html#GUID-1F0064FB-7F00-4ACE-85BD-E9B2AF73A233)  
[1.3.4 Downloading, Configuring and Installing Oracle REST Data Services](https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/19.2/aelig/installing-REST-data-services.html#GUID-B6661F35-3EE3-4CB3-9379-40D0B8E24635)

なぜか、`ords.version.number.zip`の解凍先フォルダの指定がマニュアルに無い。  
探しても。辛うじて、以下のサイトで言及がある。  
[Oracle REST Data Services (ORDS) : Installation on Tomcat](https://oracle-base.com/articles/misc/oracle-rest-data-services-ords-installation-on-tomcat#ords-installation)  

### 7.ORDS インストーラ権限スクリプトの実行
- `ords\installer\ords_installer_privileges.sql sys`スクリプトを実行する (引数にsys)
```
C:\app\oracle\ords>sqlplus /nolog
SQL*Plus: Release 19.0.0.0.0 - Production on 水 7月 15 08:53:07 2020
Version 19.3.0.0.0
Copyright (c) 1982, 2019, Oracle.  All rights reserved.

SQL> conn sys as sysdba
パスワードを入力してください:
接続されました。
SQL> @installer/ords_installer_privileges.sql sys
```

### 8.ORDS インストール(大詰)
実行するコマンドと、答える要求は以下の通り
- `java -jar ords.war install advanced`
- 構成データを格納する場所を入力してください: `C:\app\oracle\ords\config`
- 使用するデータベース接続タイプを指定します。  
  番号を入力してください: [1] 基本  [2] TNS  [3] カスタムURL [1]:`(既定値)`  
  データベース・サーバーの名前を入力してください [localhost]:`(既定値)`  
  データベースのリスニング・ポートを入力してください [1521]:`(既定値)`  
  データベース・サービス名を指定するには1を、データベースSIDを指定するには2を入力してください [1]:`(既定値)`  
  データベース・サービス名を入力してください:`orcl`
- Oracle REST Data Servicesスキーマを確認/インストールする場合は1を、このステップをスキップする場合は2を入力してください [1]:`既定値`  
- ORDS_PUBLIC_USERのデータベース・パスワードを入力してください:`(パスワード)`  
  パスワードの確認:`(パスワード)`  
- 管理者権限でログインし、Oracle REST Data Servicesスキーマを確認する必要があります。  
  管理者ユーザー名を入力してください:`sys`  
  SYS AS SYSDBAのデータベース・パスワードを入力してください:`(パスワード)`  
  パスワードの確認:`(パスワード)`
- ORDS_METADATAのデフォルト表領域を入力してください [SYSAUX]:`(既定値)`
- ORDS_METADATAの一時表領域を入力してください [TEMP]:`(既定値)`
- ORDS_PUBLIC_USERのデフォルト表領域を入力してください [USERS]:`(既定値)`
- ORDS_PUBLIC_USERの一時表領域を入力してください [TEMP]:`(既定値)`
- PL/SQLゲートウェイを使用する場合は1を、このステップをスキップする場合は2を入力してください
  Oracle Application Expressを使用しているかmod_plsqlから移行する場合は、1を入力する必要があります [1]:`(既定値)`
- APEX_PUBLIC_USERのデータベース・パスワードを入力してください:`(パスワード)`
- Application Express RESTfulサービスのデータベース・ユーザー(APEX_LISTENER,  APEX_REST_PUBLIC_USER)にパスワードを使用する には1を、このステップをスキップするには2を入力してください [1]:`(既定値)`  
APEX_LISTENERのデータベース・パスワードを入力してください:`(パスワード)`  
パスワードの確認:`(パスワード)`  
APEX_REST_PUBLIC_USERのデータベース・パスワードを入力してください:`(パスワード)`  
パスワードの確認:`(パスワード)`  
- 番号を入力して、有効化する機能を選択してください:  
     [1] SQL Developer Web (すべての機能を有効化)  
     [2] REST対応SQL  
     [3] データベースAPI  
     [4] REST対応SQLとデータベースAPI  
     [5] なし  
  選択 [1]:`(既定値)`  
- スタンドアロン・モードで起動するには1を、終了するには2を入力してください [1]:`(既定値)  `
- APEX静的リソースの場所を入力します:`C:\app\oracle\ords\apex\images`
- HTTPを使用する場合は1を、HTTPSを使用する場合は2を入力してください [1]:`(既定値)`  
- HTTPポートを入力してください [8080]:`(既定値)`  

### 9.日本語化
- カレントフォルダを`C:\downloads\apex_20.1\apex\builder`に変更  
- 環境変数 `set NLS_LANG=American_America.AL32UTF8` 
- sys ユーザにて  
  `alter session set current_schema=APEX_200100;`  
  `@load_ja.sql`

[5.11.2 Installing a Translated Version of Oracle Application Express](https://docs.oracle.com/en/database/oracle/application-express/20.1/htmig/installing-translated-versions-of-Oracle-AE.html#GUID-614D03ED-5AEA-48DB-875C-210DA742F8F5)

  ```
  C:\downloads\apex_20.1\apex\builder>cd \downloads\apex_20.1\apex\builder\ja
  C:\downloads\apex_20.1\apex\builder\ja>set NLS_LANG=American_America.AL32UTF8
  C:\downloads\apex_20.1\apex\builder\ja>sqlplus /nolog
  SQL*Plus: Release 19.0.0.0.0 - Production on Wed Jul 15 17:17:03 2020
  Version 19.3.0.0.0
  Copyright (c) 1982, 2019, Oracle.  All rights reserved.
  SQL> conn sys as sysdba
  Enter password:
  Connected.
  SQL> alter session set current_schema=APEX_200100;
  Session altered.

  SQL> @load_ja.sql
  ```
---
## 作成されるユーザ
|スキーマ|作成されるステップ|役割|
|--|--|--|
|APEX_200100|apexins.sql||
|APEX_PUBLIC_USER|apexins.sql||
|FLOWS_FILES|apexins.sql||
|APEX_INSTANCE_ADMIN_USER|apexins.sql||
|APEX_LISTENER|apex_rest_config.sql||
|APEX_REST_PUBLIC_USER|apex_rest_config.sql||
