using System;

namespace UdpProxy_3sem
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            Proxy p = new Proxy();
            p.Start();

            Console.ReadKey();
        }
    }
}
