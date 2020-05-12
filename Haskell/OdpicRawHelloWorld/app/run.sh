#!/bin/sh

export ORA_USERNAME=(ユーザ名)
export ORA_PASSWD=(パスワード)
export ORA_SERVICE=(データベース接続名)

cd ~/odpic-raw-hello-world
stack run
