dir * -Recurse | Select-String -Pattern "検索したい文字" -Encoding oem | Select-Object -Unique path
