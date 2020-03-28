################################################################################
#
# 機　能：全仮想マシンを停止する
#
################################################################################

#
# 基本設定
#
$vCenterVMName  = 'vm-vcenter'
$vCenterAddress = 'address of ip address'
#$vCenterAddress = [Net.Dns]::GetHostAddresses('').IPAddressToString[0]
$vCenterUser    = 'administrator@vsphere.local'
$vCenterPasswd  = 'P@ssw0rd'
$pewerOnVMs     = 'c:\tooldir\PowerOnVMs.txt'
$vms = @('XXXX-TSV1', 'XXXX-TSV2', 'XXXX-DBSV', 'XXXX-DC')

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
do {
    Start-Sleep -s 60
    Connect-VIServer -Server $vCenterAddress -User $vCenterUser -Password $vCenterPasswd
} until ( $? )

#$vms = @(Get-Content $pewerOnVMs)
#del $pewerOnVMs

#
# 指定仮想マシンの起動
#
$vms | foreach {
    if (( Get-VM -Name $_ ).PowerState -eq 'PoweredOff' ) {
        Start-Sleep -s 20
        Get-VM -Name $_ | Start-VM
#        Start-VM -VM $_
    }
}

#Disconnect-VIServer ?Server $vcenter -Confirm:$False
