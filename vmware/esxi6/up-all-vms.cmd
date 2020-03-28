@rem ************************************************************
@rem
@rem  全仮想マシンを開始する。
@rem    起動対象VMは、c:\s-max\PowerOnVMs.txt に記録されている
@rem    (↑全停止のスクリプトが書き込む）
@rem
@rem  UPSのシャットダウンスクリプトとして実行する場合、
@rem  PowerShellの実行ポリシーがRemoteSignedでも足りないため、
@rem  PsExec.exe経由で起動する
@rem
@rem ************************************************************

set PASSWORD=Kbc@12345
set TOOLDIR=c:\tooldir

date /t >> %TOOLDIR%\up-all-vms.start.txt
time /t >> %TOOLDIR%\up-all-vms.start.txt
%TOOLDIR%\tools\psexec.exe \\localhost -h -u Administrator -p %PASSWORD% -accepteula C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe C:\s-max\up-all-vms.ps1 >> c:\s-max\up-all-vms.log.txt
