Option Explicit

Private Const EXPIRE_LIMIT As Integer = 5


Private nWatchDogCounter As Integer ' 現在何カウント目
Private nextTime         As Date    ' タイマ実行時間

Private Sub ボタン1_Click()
    TimerInitializeSub
End Sub


'
' ■処理開始/ユーザアクション有り■
' ... 起動後や何か処理をするたびに本ルーチンをコールしタイマを初期化起動する
'
Private Sub TimerInitializeSub()
    TimerCountUpSub bInitialize:=True
End Sub


'
' 1秒毎のタイマ処理
'
Private Sub TimerCountUpSub(Optional bInitialize As Boolean)
    
    'Initializeパラメータが渡された時は最初から
    'そしてすでにカウント処理中なら前回の処理をキャンセル
    If IsMissing(bInitialize) Then
    Else
        If bInitialize Then
            If nWatchDogCounter > 0 Then
                On Error Resume Next
                'タイマのカウントアップ前に再設定する場合キャンセルが必要
                Application.OnTime EarliestTime:=nextTime, _
                                   ProceDure:="TimerCountUpSub", _
                                   Schedule:=False
                On Error GoTo 0
                Debug.Print "タイマクリア(" & Format(nextTime, "hh:nn:s") & ")"
            End If
            nWatchDogCounter = 0
        End If
    End If
    Debug.Print "経過(" & CStr(nWatchDogCounter) & ")分"
    
    'タイムアップなら終了
    If nWatchDogCounter >= EXPIRE_LIMIT Then
        '■時間経過時の処理がココ■
        Application.ThisWorkbook.Save
        If Application.Workbooks.Count > 1 Then
            Application.ThisWorkbook.Close
        Else
            Application.DisplayAlerts = False
            Application.Quit
        End If
    End If


    'カウントアップ
    nWatchDogCounter = nWatchDogCounter + 1
    '自分自身のSubを1分後に再登録
    nextTime = Now + TimeValue("00:01:00")
    Application.OnTime nextTime, "TimerCountUpSub"

End Sub
