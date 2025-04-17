
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VueWebApi.Models;

namespace VueWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpPost("logout")]
        public Result<string> Logout()
        {
            Result<string> result = new Result<string>();
            result.code = 20000;
            result.data = "success";
            return result;
        }


        [HttpPost("login")]
        public Result<Data> UserLogin(UserLoginModel user)
        {
            Result<Data> result = new Result<Data>();
            result.code = 20000;
            if (user.username == "admin")
            {
                result.data = new Data();
                result.data.token = "admin-token";
            }
            if (user.username == "editor")
            {
                result.data = new Data();
                result.data.token = "editor-token";
            }
            return result;
        }

        [HttpGet("info")]
        public Result<UserInfo> UserInfo(string token)
        {
            Result<UserInfo> result = new Result<UserInfo>();
            result.code = 20000;
            result.data = new UserInfo();
            if (token == "admin-token")
            {
                result.data.avatar = "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif";
                result.data.name = "Super Admin";
                result.data.introduction = "I am a super administrator";
                result.data.roles = new List<string>();
                result.data.roles.Add("admin");
            }
            if (token == "editor-token")
            {
                result.data.avatar = "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif";
                result.data.name = "Normal Editor";
                result.data.introduction = "I am an editor";
                result.data.roles = new List<string>();
                result.data.roles.Add("editor");
            }

            return result;
        }




    }
}
