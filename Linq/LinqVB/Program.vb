Imports System

Module Program
    Sub Main(args As String())
        Dim a1 = New String() {"foo", "bar", "boo", "ham", "spam", "egg"}
        Console.WriteLine(String.Join(" ", a1.Skip(1)))
        Console.WriteLine(String.Join(" ", From s In a1 Select s Skip 1))
    End Sub
End Module
