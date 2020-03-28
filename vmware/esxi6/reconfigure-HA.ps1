################################################################################
#
# 機　能：HAを再構成する
#
################################################################################

#
# 基本設定
#
$vCenterVMName  = 'vm-vcenter'
$vCenterAddress = [Net.Dns]::GetHostAddresses('').IPAddressToString[0]
$vCenterUser    = 'administrator@vsphere.local'
$vCenterPasswd  = 'P@ssw0rd'
$hostUser       = 'root'
$hostPasswd     = 'P@ssw0rd'
$iScsiHba       = 'vmhba????????'
$VICFG_RESCAN   = 'C:\Program Files (x86)\VMware\VMware vSphere CLI\bin\esxcfg-rescan.pl'

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
# 再スキャン
#
Get-VMHost | ForEach-Object { `
  $hostMO = Get-View -ID $_.ID
  $hostMO.ReconfigureHostForDAS()
}
