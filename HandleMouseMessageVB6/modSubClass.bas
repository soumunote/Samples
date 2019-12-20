Attribute VB_Name = "modSubClass"
Option Explicit

Private Declare Function SetWindowSubclass Lib "comctl32" (ByVal hwnd As Long, ByVal pfnSubclass As Long, ByVal uIdSubclass As Long, ByVal dwRefData As Long) As Long
Private Declare Function RemoveWindowSubclass Lib "comctl32" (ByVal hwnd As Long, ByVal pfnSubclass As Long, ByVal uIdSubclass As Long) As Long
Private Declare Function DefSubclassProc Lib "comctl32" (ByVal hwnd As Long, ByVal uMsg As Long, ByVal wParam As Long, ByVal lparam As Long) As Long
Private Declare Function SetWindowLong Lib "user32" Alias "SetWindowLongA" (ByVal hwnd As Long, ByVal nIndex As Long, ByVal dwNewLong As Long) As Long
Private Declare Function CallWindowProc Lib "user32" Alias "CallWindowProcA" (ByVal lpPrevWndFunc As Long, ByVal hwnd As Long, ByVal Msg As Long, ByVal wParam As Long, ByVal lparam As Long) As Long
Private Declare Function SetCapture Lib "user32" (ByVal hwnd As Long) As Long
Private Declare Function ReleaseCapture Lib "user32" () As Long

Private Const WM_LBUTTONDOWN = &H201
Private Const WM_LBUTTONUP = &H202
Private Const GWL_WNDPROC = -4

Private OriginalWndProc As Long

Public Const SUBCLASS_ID_LBUTTON As Long = 1

Private Function WindowProc(ByVal hwnd As Long, ByVal uMsg As Long, ByVal wParam As Long, ByVal lparam As Long, ByVal uIdSubclass As Long, ByVal dwRefData As Long) As Long

    Dim DefaultProc As Long

    Select Case uMsg
    Case WM_LBUTTONDOWN
        SetCapture hwnd
        Debug.Print "WM_LBUTTONDOWN dwRefData=(" & dwRefData & ")"
        WindowProc = 0
        Exit Function
    Case WM_LBUTTONUP
        ReleaseCapture
        Debug.Print "WM_LBUTTONUP   dwRefData=(" & dwRefData & ")"
        WindowProc = 0
        Exit Function
    End Select

    WindowProc = DefSubclassProc(hwnd, uMsg, wParam, lparam)

End Function


Public Sub SubclassWindow(hwnd As Long, ByVal dwRefData As Long)
    
    Dim bResult As Long
    bResult = SetWindowSubclass(hwnd, AddressOf WindowProc, SUBCLASS_ID_LBUTTON, dwRefData)
    Debug.Assert bResult <> 0

End Sub


Public Sub UnSubclassWindow(hwnd As Long)
    
    Dim bResult As Long
    bResult = RemoveWindowSubclass(hwnd, AddressOf WindowProc, SUBCLASS_ID_LBUTTON)
    Debug.Assert bResult <> 0

End Sub
