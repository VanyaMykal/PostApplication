using CarsPostApplication.Config;
using CarsPostApplication.Context;
using CarsPostApplication.Models;
using CarsPostApplication.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarsPostApplication.Controllers
{
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]/[action]")]
    public class PostController : Controller
    {
        public readonly IPostRepository postRepository;
        private readonly IUserRepository userRepository;
        public readonly PostContext context;
        private readonly AuthOptions options;
        public PostController(PostContext context, IPostRepository postRepository, AuthOptions options, IUserRepository userRepository)
        {
            this.context = context;
            this.postRepository = postRepository;
            this.options = options;
            this.userRepository = userRepository;
        }
        [HttpGet]
        public IActionResult Posts()
        {
            return Ok(postRepository.GetPosts());
        }
        [HttpPost]
        public IActionResult Create(Post model)
        {
            //Car car = new Car
            //{
            //    Id = model.Id,
            //    Title = model.Title,
            //    Model = model.Model
            //};
            //context.Cars.Add(car);
            //await context.SaveChangesAsync();
            //return Ok(car);
            var jwt = Request.Cookies["jwt"];
            var token = options.Verify(jwt);

            var userId = token.Issuer;
            var user = userRepository.GetUserById(Convert.ToInt32(userId));
            Post car = new Post
            {
                Title = model.Title,
                Description = model.Description,
                Image = model.Image,
                User = user
            };
            return Created("ok", new { newcar = postRepository.Create(car) });

        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<Post>>> Delete(int id)
        {
            var removedCar = await context.Posts.FirstOrDefaultAsync(x => x.PostId == id);
            if (removedCar == null)
            {
                return NotFound();
            }
            context.Posts.Remove(removedCar);
            await context.SaveChangesAsync();
            return Ok(removedCar);
        }
        [HttpPut]
        public async Task<ActionResult<IEnumerable<Post>>> Edit(Post post)
        {
            if (post == null)
            {
                return BadRequest();
            }
            if (!context.Posts.Any(x=>x.PostId == post.PostId))
            {
                return NotFound();
            }
            context.Posts.Update(post);
            await context.SaveChangesAsync();
            return Ok(post);
        }
    
    }
}
