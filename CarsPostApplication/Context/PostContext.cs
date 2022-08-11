using CarsPostApplication.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarsPostApplication.Context
{
    public class PostContext :DbContext
    {
        public virtual DbSet<Post> Posts { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }
        public PostContext(DbContextOptions<PostContext> options):base(options)
        {
            Database.EnsureCreated();
        }
    }
}
