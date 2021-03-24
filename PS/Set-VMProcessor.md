```PowerShell
PS C:\> set-vmprocessor -vmname sol-kanrisv -ExposeVirtualizationExtensions $true
PS C:\> get-vmprocessor -vmname sol-kanrisv | Format-List

ResourcePoolName                             : Primordial
Count                                        : 2
CompatibilityForMigrationEnabled             : False
CompatibilityForOlderOperatingSystemsEnabled : False
HwThreadCountPerCore                         : 1
ExposeVirtualizationExtensions               : True
Maximum                                      : 100
Reserve                                      : 0
RelativeWeight                               : 100
MaximumCountPerNumaNode                      : 16
MaximumCountPerNumaSocket                    : 1
EnableHostResourceProtection                 : False
OperationalStatus                            : {}
StatusDescription                            : {}
Name                                         : プロセッサ
Id                                           : Microsoft:8ED410B2-007B-4296-896A-C0B999531D80\b637f346-6a0e-4dec-af52-b
                                               d70cb80a21d\0
VMId                                         : 8ed410b2-007b-4296-896a-c0b999531d80
VMName                                       : SOL-KANRISV
VMSnapshotId                                 : 00000000-0000-0000-0000-000000000000
VMSnapshotName                               :
CimSession                                   : CimSession: .
ComputerName                                 : SOL-VMSV01
IsDeleted                                    : False
VMCheckpointId                               : 00000000-0000-0000-0000-000000000000
VMCheckpointName                             :

```
