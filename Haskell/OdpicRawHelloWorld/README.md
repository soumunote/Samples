# OdpicRawHelloWorld
odpic-raw を使用した Haskell から Oracle Database への接続サンプル  
- [odpic-raw:Oracle Database Bindings](https://hackage.haskell.org/package/odpic-raw)を使用する
- 内部で、以下のライブラリを使用している。  
  (odpic-rawは以下を含むので別途インストールは不要。但し、OracleInstantClient11.2以上が必要。)  
  [ODPIC-C](https://hackage.haskell.org/package/odpic-raw)

- 最終的には、HDBC+ODBCによる接続に変更するのでこのプロジェクトは破棄

## プロジェクトの概要
環境構築も面倒なので、Docker環境を準備  

### Dockerfileについて
- [Qiita How to yum install oracle-instant](https://qiita.com/tkprof/items/2a4eb868f45fb5759110) を参考にOracleのリポジトリから直接ダウンロード  
  (rpmを直接ダウンロードしても良い)
- stackで使用する package.yaml.diff, ソース(Main.hs)等をコンテナにコピー
- stackのインストールや、プロジェクトの作成
- patchの実行

## プロジェクトの実行方法
### コンテナの作成
  ```sh
  docker build -t (タグ名) .
  docker run -it --name (コンテナ名) (タグ名) /bin/bash
  ```
### コンテナ内での作業
  ```sh
  export ORA_USERNAME=(ユーザ名)
  export ORA_PASSWD=(パスワード)
  export ORA_SERVICE=(データベース接続名)
  cd ~/odpic-raw-hello-world
  stack run
  ```
