Sub CreateUser(p_szUsername, p_szFamilyName, p_szGivenName, p_szPassword)
    Set ou = GetObject("LDAP://CN=Users,DC=example,DC=local")
    set objUser = ou.Create("User", "cn=" & p_szUsername)
    objUser.Put "samAccountName", p_szUsername
    objUser.Put "distinguishedName", p_szUsername
    objUser.Put "UserPrincipalName", p_szUsername & "@example.local"
    objUser.Put "sn", p_szFamilyName
    objUser.Put "givenName", p_szGivenName
    objUser.Put "displayName", p_szFamilyName & " " & p_szGivenName
    objUser.SetInfo
    objUser.AccountDisabled = False
    objUser.SetPassword p_szPassword
    objUser.SetInfo

    ADS_PROPERTY_APPEND = 3
    Set objGroup = GetObject("LDAP://cn=AnyGroupName,cn=USERS,DC=example,DC=local")
    objGroup.PutEx ADS_PROPERTY_APPEND, "member", Array("CN=" & p_szUsername & ",CN=Users,DC=example,DC=local")
    objGroup.SetInfo

End Sub

'ここから追加
createUser "taro-yamada", "山田", "太郎", "Pa$$w0rd"
createUser "masami-iwaki", "岩鬼", "正美", "Pa$$w0rd"
