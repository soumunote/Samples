Rem Set net = WScript.CreateObject("WScript.Network")
Rem net.AddWindowsPrinterConnection "\\KA-DC1\鹿児島_Apeos_C6570"

Set sh = WScript.CreateObject("WScript.Shell")
Set exec = sh.Exec("NET USE \\KA-DC1\Apeos_C6570")
Do Until exec.StdOut.AtEndOfStream
  WScript.Echo exec.StdOut.ReadLine
Loop
