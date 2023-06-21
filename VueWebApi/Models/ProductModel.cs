namespace VueWebApi.Models
{
    public class ProductModel
    {
        public string value { get; set; }

        public string label { get; set; }

        public bool disabled { get; set; } = false;
    }

    public class UserLoginModel
    {
        public string username { get; set; }
        public string password { get; set; }
    }

    public class Result<T>
    {
        public int code { get; set; }

        public T data { get; set; }

        public string message { get; set; }
    }

    public class Data
    {
        public string token { get; set; }
    }

    public class UserInfo
    {
        public List<string> roles { get; set; }
        public string introduction { get; set; }
        public string avatar { get; set; }
        public string name { get; set; }
    }

    public class TableData
    {
        public string id { get; set; }
        public string title { get; set; }
        public string status { get; set; }
        public string author { get; set; }
        public string display_time { get; set; }
        public int pageviews { get; set; }
    }

    public class TableReuslt
    {
        public int total { get; set; }
        public List<TableData> items { get; set; }
    }
}
