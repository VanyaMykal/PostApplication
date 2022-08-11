using CarsPostApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarsPostApplication.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetPosts();
        Post Create(Post car);
    }
}
