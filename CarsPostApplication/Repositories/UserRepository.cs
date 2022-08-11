using CarsPostApplication.Context;
using CarsPostApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarsPostApplication.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly PostContext context;
        public UserRepository(PostContext context)
        {
            this.context = context;
        }
        public User Create(User user)
        {
            context.Users.Add(user);
            context.SaveChanges();
            return user;
        }

        public User GetUserByEmail(string email)
        {
            return context.Users.FirstOrDefault(x=>x.Email==email);
        }

        public User GetUserById(int id)
        {
            return context.Users.FirstOrDefault(x=>x.UserId==id);
        }

        public User GetUserByName(string name)
        {
            return context.Users.FirstOrDefault(x => x.UserName == name);
        }
    }
}
