@rem ************************************************************
@rem
@rem  全仮想マシンを停止する。
@rem    vCenterからの実行を前提とし、vCenterは最後に停止する。
@rem
@rem  UPSのシャットダウンスクリプトとして実行する場合、
@rem  PowerShellの実行ポリシーがRemoteSignedでも足りないため、
@rem  PsExec.exe経由で起動する
@rem
@rem ************************************************************

set PASSWORD=P@ssw0rd
set TOOLDIR=c:\tooldir

date /t >> %TOOLDIR%\down-all-vms.start.txt
time /t >> %TOOLDIR%\down-all-vms.start.txt
%TOOLDIR%\psexec.exe \\localhost -h -u Administrator -p %PASSWORD% -accepteula C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe C:\s-max\down-all-vms.ps1 >> c:\s-max\down-all-vms.log.txt
