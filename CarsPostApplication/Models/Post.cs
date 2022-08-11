using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarsPostApplication.Models
{
    public class Post
    {
        public Post()
        {
            Comments = new List<Comment>();
        }
        public int PostId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public int? UserId { get; set; }
        public User User { get; set; }
        public List<Comment> Comments { get; set; }
    }
}
