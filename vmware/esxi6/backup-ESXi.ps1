################################################################################
#
# 機　能：全仮想マシンを停止する
#
################################################################################

#
# 基本設定
#
$vCenterVMName  = 'vm-vcenter'
$vCenterAddress = 'ip address of vCenter'
$vCenterUser    = 'administrator@vsphere.local'
$vCenterPasswd  = 'P@ssw0rd'
$backupDestBase = '\\ip address of backup server\BACKUP_ESXi'

#
# PowerCLI スナップイン追加
#
if ( $PSVersionTable.PSVersion.Major -lt 5 ){
    Add-PSSnapin VMware.VimAutomation.Core
}else{
    Import-Module -Name VMware.VimAutomation.Core
}

#
# vCenter 接続
#
Connect-VIServer -Server $vCenterAddress -User $vCenterUser -Password $vCenterPasswd

#
# フォルダ名生成＆作成
#
$backupTime = Get-Date -Format "yyyyMMdd_HHmm"
$backupDest = "$backupDestBase\$backupTime"
New-Item $backupDest -itemType Directory

#
# バックアップ
#
Get-VMHostFirmware -VMHost (Get-VMHost) -DestinationPath $backupDest
