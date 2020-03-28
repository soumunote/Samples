################################################################################
#
# 機　能：全仮想マシンを停止する
#
################################################################################

#
# 基本設定
#
$vCenterVMName  = 'vm-vcenter'
$vCenterAddress = [Net.Dns]::GetHostAddresses('').IPAddressToString[0]
$vCenterUser    = 'administrator@vsphere.local'
$vCenterPasswd  = 'P@assw0rd'
$hostUser       = 'root'
$hostPasswd     = 'P2ssw0rd'
$pewerOnVMs     = 'c:\tooldir\PowerOnVMs.txt'
$ESXCLI         = 'C:\Program Files (x86)\VMware\VMware vSphere CLI\bin\esxcli.exe'

#
# PowerCLI スナップイン追加/バージョン取得
#
if ( $PSVersionTable.PSVersion.Major -lt 5 ){
    Add-PSSnapin VMware.VimAutomation.Core
}else{
    Import-Module -Name VMware.VimAutomation.Core
}
$powerCliMajor = Get-PowerCLIVersion | select -expand Major

#
# 対話モード動作確認
#
if ( $args -contains '-interactive' ) {
    $typename = "Management.Automation.Host.ChoiceDescription"
    $yes = New-Object $typename("&Yes","全仮想マシンを停止する")
    $no = New-Object $typename("&NO","キャンセル")
    $choice = [Management.Automation.Host.ChoiceDescription[]]($yes,$no)
    $ans = $Host.UI.PromptForChoice("<実行確認>","実行しますか？",$choice,1)
    if ( $ans -ne 0 ) {
        exit
    }
}

#
# vCenter 接続
#
Connect-VIServer -Server $vCenterAddress -User $vCenterUser -Password $vCenterPasswd

#
# 全仮想マシンのシャットダウン
#
$vms = @(Get-VM | Where-Object { $_.Name -ne $vCenterVMName -and $_.PowerState -eq 'PoweredOn' -and $_.Name -notlike 'vMA*' })
#$vms | Select -ExpandProperty Name | Out-File $pewerOnVMs
if ($powerCliMajor -ge 6) {
    $vms | Stop-VMGuest -Confirm:$false
}else {
    $vms | Shutdown-VMGuest -Confirm:$false
}
Start-Sleep 60

#
# vCenter仮想マシンをシャットダウン
#
$vCenter = (Get-VM $vCenterVMName)
if ($powerCliMajor -ge 6) {
    $vCenter | Stop-VMGuest -Confirm:$false
}
else {
    $vCenter | Shutdown-VMGuest -Confirm:$false
}
