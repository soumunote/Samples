## トレースファイルの出力先
```SQL
select 
  SESS.SID,
  SESS.SERIAL#,
  SESS.OSUSER,
  SESS.PROGRAM,
  PS.TRACEFILE
from 
  V$SESSION SESS,
  v$PROCESS PS 
where 
  PS.ADDR = SESS.PADDR
```
