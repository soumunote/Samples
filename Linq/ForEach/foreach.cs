using System;
using System.Collections.Generic;
using System.Linq;

public static class EnumerableExtention {
    public static void ForEach<T>(this IEnumerable<T> source, Action<T> action)
    {
        foreach(T e in source) 
        {
            action(e);    
        }
    }
}

public class Hello {
    public static void Main()
    {
        var words = new string[]{ "orange", "apple", "Article", "elephat" };
        words.Select(w => w.ToUpper()).ForEach(w => Console.WriteLine(w));
        (from word in words select word.ToUpper()).ForEach(w => Console.WriteLine(w));
    }
}
