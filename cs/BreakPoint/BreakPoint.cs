namespace Samples
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Breakpoint will be invoked.");
            BreakPoint().Invoke();
            Console.WriteLine("BreakPoint Invoked.");
        }

        private static Action BreakPoint()
        {
            var breakPoint = new DynamicMethod("BreakPoint", typeof(void), new Type[] { }, typeof(Program).Module);
            var il = breakPoint.GetILGenerator();
            il.Emit(OpCodes.Break);
            il.Emit(OpCodes.Ret);
            return (Action)breakPoint.CreateDelegate(typeof(Action));
        }
    }
}
