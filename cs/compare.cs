using System;
using System.Collections.Generic;
using System.Linq;

public class Hello{
    public static void Main()
    {
        List<int> list;
        
        list = createList();
        list.Sort((lhs, rhs) => rhs - lhs); // Bad!
        PrintList(list);

        list = createList();
        list.Sort((lhs, rhs) => rhs.CompareTo(lhs)); // Good!
        PrintList(list);
    }
    
    public static List<int> createList()
    {
        return new List<int>() { 7, int.MinValue, 3, 2, 6, int.MaxValue, 9, 1, 4 }; 
    }
    
    public static void PrintList<T>(List<T> list)
    {
        var sorted = list.Select(i => i.ToString())
                         .Aggregate((lhs, rhs) => lhs + ", " + rhs);
        Console.WriteLine(sorted);
    }
}
