Private Declare Function VarR8FromCy Lib "oleaut32" (ByVal cy As Currency, ByRef r8 As Double) As Long
Private Declare Function VarR8FromCyAny Lib "oleaut32" Alias "VarR8FromCy" (ByVal lo As Long, ByVal hi As Long, ByRef r8 As Double) As Long

Private Sub ConvertCurrency()

    Dim cy As Currency
    Dim r As Double
    
    '
    ' Currency を直接 Double へ変換
    '
    cy = 1.2345@
    Call VarR8FromCy(cy, r)
    MsgBox r

    '
    ' 32bit VBAから 64bit LongLong を渡す手段が無いので
    ' hi, lo を分割して渡す
    '
    Dim lo As Long: lo = 654321
    Dim hi As Long: hi = 0
    Call VarR8FromCyAny(lo, hi, r)
    MsgBox r
    
End Sub
