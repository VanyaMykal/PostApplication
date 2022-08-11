using CarsPostApplication.Config;
using CarsPostApplication.Context;
using CarsPostApplication.Models;
using CarsPostApplication.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CarsPostApplication.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly AuthOptions options;
        private readonly IUserRepository userRepository;
        public AccountController(AuthOptions options, IUserRepository userRepository)
        {
            this.userRepository = userRepository;
            this.options = options;
        }

        [HttpPost]
        public IActionResult Register(User model)
        {
            User user = new User
            {
                UserName = model.UserName,
                Email = model.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(model.Password),
                ConfirmPassword = BCrypt.Net.BCrypt.HashPassword(model.ConfirmPassword)
            };
            var checkedUserName = userRepository.GetUserByName(model.UserName);
            var checkedUserEmail = userRepository.GetUserByName(model.Email);
            if (checkedUserName!=null)
            {
                return BadRequest(new { message = "This name already exist" });
            }
            else if (checkedUserEmail!=null)
            {
                return BadRequest(new { message = "This email already exist" });
            }
            else if (model.Password!=model.ConfirmPassword)
            {
                return BadRequest(new { message = "Password mismatch"});
            }
            else
            {
                string jwt = options.GenerateToken(user.UserId.ToString(), user.Email);
                Response.Cookies.Append("jwt", jwt, new Microsoft.AspNetCore.Http.CookieOptions
                {
                    HttpOnly = true
                });
            }
            return Created("ok", new { user = userRepository.Create(user) });

        }
        [HttpPost]
        public IActionResult Login(User modelUser)
        {
            var user = userRepository.GetUserByEmail(modelUser.Email);
            if (user==null)
            {
                return BadRequest(new { message = "Invalid user" });
            }
            else if (!BCrypt.Net.BCrypt.Verify(modelUser.Password, user.Password))
            {
                return BadRequest(new { message = "Invalid password" });
            }
            else
            {
                string jwt = options.GenerateToken(user.UserId.ToString(), user.Email);
                Response.Cookies.Append("jwt", jwt, new Microsoft.AspNetCore.Http.CookieOptions
                {
                    HttpOnly = true
                });
            }
            return Ok(new 
            {
                message="Ok",
                name = user.UserName
            });
        }     
        [HttpGet]
        public IActionResult GetUser()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = options.Verify(jwt);

                var userId = token.Issuer;
                var user = userRepository.GetUserById(Convert.ToInt32(userId));
                return Ok(user);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }
        [HttpPost]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new 
            {
                message = "user logout"
            });
        }

    }
}
