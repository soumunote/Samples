# ORACLE サンプルSQL集

## 実行中SQLの表示
```SQL
select 
  SESS.SID,
  SESS.OSUSER,
  SESS.PROGRAM,
  SQL.SQL_TEXT
from
  V$SESSION SESS,
  V$SQLAREA SQL
where
      SESS.PREV_HASH_VALUE = SQL.hash_value
  and SESS.PREV_SQL_ADDR = SQL.address
  and SESS.STATUS = 'ACTIVE'
```
