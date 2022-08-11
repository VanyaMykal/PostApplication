using CarsPostApplication.Context;
using CarsPostApplication.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarsPostApplication.Repositories
{
    public class PostRepository : IPostRepository
    {
        public PostContext context;
        public PostRepository(PostContext context)
        {
            this.context = context;
        }
        public List<Post> GetPosts()
        {
            return context.Posts.ToList();
        }
        public Post Create(Post car)
        {
            context.Posts.Add(car);
            context.SaveChanges();
            return car;
        }
    }
}
