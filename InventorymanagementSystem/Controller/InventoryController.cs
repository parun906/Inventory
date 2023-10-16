using InventorymanagementSystem.InventoryDbContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace InventorymanagementSystem.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly InventoryManagementContext _context;

        public UserController(InventoryManagementContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.Username);

            if (user != null)
            {

                if (model.Password == user.Password)
                {
                    var authToken = "test-token";
                    var cookieOptions = new CookieOptions
                    {
                        HttpOnly = true
                    };
                    Response.Cookies.Append("authToken", authToken, cookieOptions);
                    return Ok(new { message = "Authentication successful" });
                }
            }


            return Unauthorized(new { message = "Authentication failed" });
        }
    }

    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
    [Route("api/[controller]")]
    [ApiController]
    public class GeneralController : ControllerBase  //controller for all only testing
    {
        private readonly InventoryManagementContext _context;

        public GeneralController(InventoryManagementContext context)
        {
            _context = context;
        }
        [HttpGet("allData")]
        public IActionResult GetAllData()
        {
            var items = _context.Items.ToList();
            var stocks = _context.Stocks.ToList();
            var stores = _context.Stores.ToList();

            var response = new
            {
                Items = items,
                Stocks = stocks,
                Stores = stores
            };

            return Ok(response);
        }
    }
}
