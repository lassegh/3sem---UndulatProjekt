using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Net.Sockets;
using System.Text;
using ModelLib;
using Newtonsoft.Json;

namespace UdpProxy_3sem
{
    class Proxy
    {
        public void Start()
        {
            // Modtager

            // Når der modtages, skal portnummer, der lyttes på angives
            UdpClient client = new UdpClient(10100);

            // Dette bliver ikke brugt, når der modtages
            IPEndPoint ipRemote = new IPEndPoint(IPAddress.Any, 0);

            while (true)
            {
                // Der modtages bytes
                byte[] bytes = client.Receive(ref ipRemote);
                string str = "";
                str = Encoding.UTF8.GetString(bytes);
                // bytes konverteres til string
                PostMethod(str);


                Console.WriteLine("Modtaget " + str);
            }
        }

        private async void PostMethod(string censorData)
        {
            StringContent content = new StringContent(censorData, Encoding.UTF8, "application/json");

            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = await client.PostAsync("http://localhost:59055/api/Censors/", content);

                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine(response.RequestMessage);
                }
            }
        }
    }
}
