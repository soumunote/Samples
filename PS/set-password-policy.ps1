 $policiesToReplace = @(
  @{ name = "PasswordHistorySize";   old = 7;  new = 0  },
  @{ name = "MaximumPasswordAge";    old = 90; new = -1 },
  @{ name = "MinimumPasswordLength"; old = 14; new = 0  },
  @{ name = "PasswordComplexity";    old = 1;  new = 0  }
)
$orgFileName = "c:\tmp\secpolicy.org.inf"
$newFileName = "c:\tmp\secpolicy.new.inf"

if (-Not (Test-Path c:\tmp)) {
  mkdir c:\tmp
}
secedit /export /cfg $orgFileName

(Get-Content $orgFileName) | foreach {
  $line = $_
  $policiesToReplace | foreach {
    $line = ($line -replace ($_['name'] + " = " + $_['old']),
                            ($_['name'] + " = " + $_['new']))
  }
  $line
} | Set-Content -Path $newFileName -Encoding Unicode

secedit /configure /db secedit.sdb /cfg secpolicy.new.inf /log secpolicy.log 
