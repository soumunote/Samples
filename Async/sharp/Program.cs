using System;
using System.Threading;
using System.Threading.Tasks;

namespace sample_async_sharp01
{
    class Program
    {
        static void Main(string[] args)
        {
            ThreeFreeze();
            Console.WriteLine("Shown after 3Freeze!");
            Console.ReadLine();
        }

        static async void ThreeFreeze()
        {
            await Task.Run(() => {
                Thread.Sleep(3000);
                Console.WriteLine("3Freeze!");
            });
        }
    }
}
