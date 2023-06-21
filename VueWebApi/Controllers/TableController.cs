using Microsoft.AspNetCore.Mvc;
using VueWebApi.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VueWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableController : ControllerBase
    {
        [HttpGet("list")]
        public Result<TableReuslt> GetTableList()
        {
            Result<TableReuslt> result = new Result<TableReuslt>();

            result.code = 20000;
            result.data = new TableReuslt();
            result.data.total = 30;
            result.data.items = GetTableDatas(30);
            return result;
        }
        static Random random = new Random();
        private int rep = 0;
        private List<TableData> GetTableDatas(int num)
        {

            List<TableData> list = new List<TableData>();
            for (int i = 0; i < num; i++)
            {
                TableData data = new TableData();
                data.title = GenerateCheckCodeNum(random.Next(6, 100));
                data.author = "name";
                if (i % 2 == 0)
                {
                    data.status = "published";
                }
                if (i % 3 == 0)
                {
                    data.status = "draft";
                }
                if (i % 5 == 0)
                {
                    data.status = "deleted";
                }
                if (string.IsNullOrEmpty(data.status))
                {
                    data.status = "published";
                }
                data.id = Guid.NewGuid().ToString();
                data.display_time = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                data.pageviews = random.Next(100, 5000);
                list.Add(data);
            }
            return list;
        }


        private string GenerateCheckCodeNum(int codeCount)
        {
            string str = string.Empty;
            long num2 = DateTime.Now.Ticks + this.rep;
            this.rep++;
            Random rd = new Random(((int)(((ulong)num2) & 0xffffffffL)) | ((int)(num2 >> this.rep)));
            for (int i = 0; i < codeCount; i++)
            {
                int num = rd.Next();
                str = str + ((char)(0x30 + ((ushort)(num % 10)))).ToString();
            }
            return str;
        }
    }
}
