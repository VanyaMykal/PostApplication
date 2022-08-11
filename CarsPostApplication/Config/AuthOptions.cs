using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CarsPostApplication.Config
{
    public class AuthOptions
    {
        public const string ISSUER = "PostApplication";
        public const string AUDIENCE = "SomeClient";
        const string KEY = "ThisIsPostApplication";
        public const int LIFETIME = 5;
        public string GenerateToken(string id, string email)
        {
            SymmetricSecurityKey symmetricSecurityKey = new SymmetricSecurityKey(Encoding.Default.GetBytes(KEY));
            SigningCredentials credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
            JwtHeader header = new JwtHeader(credentials);
            var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, id),
                    new Claim(ClaimsIdentity.DefaultNameClaimType, email)
                };
            var payload = new JwtPayload(id, AUDIENCE, claims, null, DateTime.Now.AddMinutes(LIFETIME));
            var securityToken = new JwtSecurityToken(header, payload);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }
        public JwtSecurityToken Verify(string jwt)
        {
            JwtSecurityTokenHandler tokenHanler = new JwtSecurityTokenHandler();
            var key = Encoding.Default.GetBytes(KEY);
            tokenHanler.ValidateToken(jwt, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false
            }, out SecurityToken securityToken);
            return (JwtSecurityToken)securityToken;
        }
    }
}
