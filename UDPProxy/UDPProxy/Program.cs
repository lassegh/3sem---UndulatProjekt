using System;

namespace UDPProxy
{
    class Program
    {
        static void Main(string[] args)
        {
            UDPReceiver reciver = new UDPReceiver();
            reciver.Start();

            Console.ReadLine();
        }
    }
}
