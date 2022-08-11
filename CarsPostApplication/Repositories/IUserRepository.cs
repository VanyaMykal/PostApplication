using CarsPostApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarsPostApplication.Repositories
{
    public interface IUserRepository
    {
        User Create(User user);
        User GetUserById(int id);
        User GetUserByName(string name);
        User GetUserByEmail(string email);
    }
}
