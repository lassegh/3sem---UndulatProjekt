using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PipRest.Model;

namespace PipRest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StartTimeController : ControllerBase
    {
        private string connection = @"Data Source=groenbechserver.database.windows.net;Initial Catalog=LasseDB;User ID=lass813k;Password=Lasse1234;Connect Timeout=60;Encrypt=True;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        protected StartInfo ReadNextElement(SqlDataReader reader)
        {
            StartInfo item = new StartInfo();
            item.Id = reader.GetInt32(0);
            item.Time = reader.GetString(1);
            return item;
        }

        // GET: api/StartTime
        [HttpGet]
        public List<StartInfo> GetAll()
        {
            List<StartInfo> sList = new List<StartInfo>();
            using (SqlConnection conn = new SqlConnection(connection))
            {
                SqlCommand cmd = new SqlCommand("Select * from BirdTable", conn);

                cmd.Connection.Open();

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    StartInfo item = ReadNextElement(reader);
                    sList.Add(item);
                }
                reader.Close();
            }

            return sList;
        }

        // POST: api/StartTime
        [HttpPost]
        public void Post([FromBody] StartInfo value)
        {
            using (SqlConnection conn = new SqlConnection(connection))
            {
                string postString = "insert into dbo.BirdTable (StartTime) VALUES (@Time)";
                SqlCommand cmd = new SqlCommand(postString, conn);

                cmd.Parameters.AddWithValue("@Time", value.Time);

                cmd.Connection.Open();

                var isExecuted = cmd.ExecuteNonQuery();

            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            
            using (SqlConnection conn = new SqlConnection(connection))
            {
                string queryString = "Delete from dbo.BirdTable where Id=@id";
                SqlCommand cmd = new SqlCommand(queryString, conn);

                cmd.Parameters.AddWithValue("@id", id);

                cmd.Connection.Open();

                var isExecuted = cmd.ExecuteNonQuery();

            }
        }
    }
}
