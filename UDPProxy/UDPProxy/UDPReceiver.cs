using System;
using System.Net;
using System.Net.Http;
using System.Net.Sockets;
using System.Text;
using System.Text.Json.Serialization;
using Newtonsoft.Json;
using UDPProxy.Model;

namespace UDPProxy
{
    public class UDPReceiver
    {
        private const int PORT = 7008; // Port der skal lyttes på

        public void Start()
        {
            // Server er egentlig reciver
            UdpClient client = new UdpClient(PORT); // Her deklarere vi hvad port vi lytter på

            Console.WriteLine("UDP revicer started på port " + PORT);

            IPEndPoint remote = new IPEndPoint(IPAddress.Any, 0);


            while (true)
            {
                byte[] bytes = client.Receive(ref remote); // Vi modtager bytes og Reciveren er lige glad hvilken IP, den modtager fra, man kan sagtens skrive spesifikke IP Addresser
                string str = Encoding.UTF8.GetString(bytes); // Her encoder vi de modtaget bytes til en string 

                StartInfo startInfo = new StartInfo()
                {
                    Id = 0, 
                    Time = str
                };

                PostMethod(startInfo);

                Console.WriteLine(str);
            }
        }

        private async void PostMethod(StartInfo censorData)
        {
            string modeldata = JsonConvert.SerializeObject(censorData);

            StringContent content = new StringContent(modeldata, Encoding.UTF8, "application/json");

            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = await client.PostAsync("http://lgwebservice.azurewebsites.net/api/starttime", content);

                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine(response.RequestMessage);
                }
            }
        }
    }
}