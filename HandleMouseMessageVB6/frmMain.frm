VERSION 5.00
Begin VB.Form frmMain 
   Caption         =   "Form1"
   ClientHeight    =   12930
   ClientLeft      =   2415
   ClientTop       =   1530
   ClientWidth     =   6600
   LinkTopic       =   "Form1"
   ScaleHeight     =   12930
   ScaleWidth      =   6600
   Begin VB.CommandButton Command2 
      Caption         =   "Command1"
      Height          =   1005
      Left            =   450
      TabIndex        =   2
      Top             =   2940
      Width           =   2955
   End
   Begin VB.CommandButton Command1 
      Caption         =   "Command1"
      Height          =   1005
      Left            =   420
      TabIndex        =   1
      Top             =   1740
      Width           =   2955
   End
   Begin VB.TextBox Text1 
      Height          =   825
      Left            =   330
      TabIndex        =   0
      Text            =   "Text1"
      Top             =   420
      Width           =   3045
   End
End
Attribute VB_Name = "frmMain"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Option Explicit

Private Sub Form_Load()
    SubclassWindow Command1.hWnd, 111
    SubclassWindow Command2.hWnd, 222
End Sub

Private Sub Command1_Click()
    Debug.Print "Command1_Click"
End Sub

Private Sub Command2_Click()
    Debug.Print "Command2_Click"
End Sub

Private Sub Form_Unload(Cancel As Integer)
    UnSubclassWindow Command1.hWnd
    UnSubclassWindow Command2.hWnd
End Sub
