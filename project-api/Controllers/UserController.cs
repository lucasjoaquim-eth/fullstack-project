using System.Security.Claims;
using System;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using project.api.Dtos;
using project.domain.Identity;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;

namespace project_api.Controllers
{

    [Route("api/{controller}")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IMapper _mapper;

        public UserController(IConfiguration config, UserManager<User> userManager,
                              SignInManager<User> signInManager, IMapper mapper)
        {
            _mapper = mapper;
            _signInManager = signInManager;
            _userManager = userManager;
            _config = config;
        }

        [HttpGet("Get")]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(new User());
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de dados Falhou {ex.Message}");

            }
        }

        [HttpPost("Post")]
        [AllowAnonymous]
        public async Task<IActionResult> Post(UserDto userDto)
        {
            try
            {
                var user = _mapper.Map<User>(userDto);
                var result = await _userManager.CreateAsync(user, userDto.Password);
                var userToReturn = _mapper.Map<UserDto>(user);

                if (result.Succeeded)
                {
                    return Created("Get", userToReturn);
                }

                return BadRequest(result.Errors);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de dados Falhou {ex.Message}");
            }
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(UserLoginDto userLogin)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(userLogin.Name);
                var result = await _signInManager.CheckPasswordSignInAsync(user, userLogin.Password, false);
                if (result.Succeeded)
                {
                    var appUser = await _userManager.Users
                        .FirstOrDefaultAsync(u => u.NormalizedUserName == userLogin.Name.ToUpper());
                    var userToReturn = _mapper.Map<UserLoginDto>(appUser);
                    return Ok(new
                    {
                        token = GenerateJWToken(appUser).Result,
                        user = userToReturn
                    });
                }
                return Unauthorized();
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de dados Falhou {ex.Message}");

            }
        }

        private async Task<string> GenerateJWToken(User user)
        {
            try
            {
                var claims = new List<Claim>
                {
                   new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                   new Claim(ClaimTypes.Name, user.UserName)
                };

                var roles = await _userManager.GetRolesAsync(user);

                foreach (var role in roles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role));
                }

                var key = new SymmetricSecurityKey(Encoding.ASCII
                                   .GetBytes(_config.GetSection("AppSettings:Token").Value)
                );

                var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
                
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.Now.AddDays(1),
                    SigningCredentials = credentials
                };

                var tokenHandler = new JwtSecurityTokenHandler();

                var token = tokenHandler.CreateToken(tokenDescriptor);

                return tokenHandler.WriteToken(token);
            }            
            catch (System.Exception ex)
            {
                return "";
            }
        }
    }
}