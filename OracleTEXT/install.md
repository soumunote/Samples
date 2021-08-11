```sq1l
>C:\app\oracle\product\19.0.0\dbhome_1\bin\sqlplus.exe SYS/(パスワード) as sysdba
SQL> @$ORACLE_HOME/ctx/admin/catctx.sql CTXSYS SYSAUX TEMP NOLOCK;
SQL> conn CTXSYS/(パスワード)
SQL> grant CTXAPP to SCOTT;
SQL> conn SCOTT/(パスワード)
SQL> exec ctx_ddl.create_preference('text_lexer', 'JAPANESE_VGRAM_LEXER')
```
