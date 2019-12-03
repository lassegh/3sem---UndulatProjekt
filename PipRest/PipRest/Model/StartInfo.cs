using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PipRest.Model
{
    public class StartInfo
    {
        public StartInfo()
        {
            
        }

        public StartInfo(int id, string time)
        {
            Id = id;
            Time = time;
        }

        public int Id { get; set; }
        public string Time { get; set; }
    }
}
