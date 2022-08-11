using CarsPostApplication.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarsPostApplication.Models
{
    public class TestData
    {
        public static void Initialize(PostContext context)
        {
            User user = new User
            {
                UserName = "Vanya",
                Email = "vmykal@ukr.net",
                Password = BCrypt.Net.BCrypt.HashPassword("123456"),
                ConfirmPassword = BCrypt.Net.BCrypt.HashPassword("123456")
            };
            if (!context.Users.Any())
            {
                context.Users.Add(user);
                context.SaveChanges();
            }

            Post post1 = new Post
            {
                Title = "Honda",
                Description = "Some car",
                User = user
            };
            Post post2 = new Post
            {
                Title = "Mercedes",
                Description = "Some car",
                User = user
            };
            if (!context.Posts.Any())
            {
                context.Posts.Add(post1);
                context.Posts.Add(post2);
                context.SaveChanges();
            }

            Comment comment = new Comment
            {
                Text = "Some comment",
                DateTime = "07.08.2022",
                User = user,
                Post = post1
            };
            if (!context.Comments.Any())
            {
                context.Comments.Add(comment);
                context.SaveChanges();
            }
        }
    }
}
