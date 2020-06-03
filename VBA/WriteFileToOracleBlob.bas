'********************************************************************************
'
' 機　能：BLOBへの書き込みサンプル
'
' 入　力：szUsername - DBユーザ名
'         szPassword - DBパスワード
'         szService  - 接続文字列 例) 192.168.1.1/ORCL
'         id - 主キーの値
'         fileName - BLOBへ書き込むファイル名
'
' 注　意：表
'         CREATE TABLE TABLE1
'         (
'             ID NUMBER(4,0) NOT NULL,
'             FL BLOB,
'             CONSTRAINT TABLE1_PK PRIMARY KEY (ID)
'         );
'
'********************************************************************************
Private Sub WriteBlob(szUsername As String, szPassword As String, szService As String, _
                      id As Long, fileName As String)
    Dim providerName As String
    Dim cn As New ADODB.Connection
    Dim rst As New ADODB.Recordset
    
    providerName = "OraOLEDB.Oracle.1"
    'providerName = "MSDAORA.1"
    cn.ConnectionString = "Provider=" & providerName & ";" _
                        & "User ID=" & szUsername & ";" _
                        & "Password=" & szPassword & ";" _
                        & "Data Source=" & szService
    cn.Open

    Set rst = New ADODB.Recordset
    rst.Open "select ID, FL from TABLE1 where rownum < 0", cn, adOpenDynamic, adLockOptimistic
    rst.AddNew
    rst.Fields("ID").Value = 123
    rst.Fields("FL").AppendChunk (ReadFileAsBinary(fileName))
    rst.Update

    rst.Close
    cn.Close

End Sub


Private Function ReadFileAsBinary(fileName As String) As Byte()

    Dim fn As Integer
    Dim fileSize As Long
    Dim bytContents() As Byte
    
    fn = FreeFile
    fileSize = fileLen(fileName)
    ReDim bytContents(fileSize - 1)
    
    Open fileName For Binary As #fn
    Get #fn, , bytContents
    Close #fn
    
    ReadFileAsBinary = bytContents

End Function
