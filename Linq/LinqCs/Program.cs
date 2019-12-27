using System;
using System.Linq;

namespace LinqCs
{
    class Program
    {
        static void Main(string[] args)
        {
            var a1 = new string[] { "foo", "bar", "boo", "ham", "spam", "egg" };
            Console.WriteLine(string.Join(" ", a1.Skip(1)));
            // ↓ Syntax Error
            //Console.WriteLine(string.Join(" ", from s in a1 select s skip 1));
        }
    }
}
