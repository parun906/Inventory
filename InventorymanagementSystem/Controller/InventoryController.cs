using InventorymanagementSystem.InventoryDbContext;
using InventorymanagementSystem.Models;
using Microsoft.AspNetCore.Mvc;
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
    public class InventoryController : ControllerBase  //controller for 
    {
        private readonly InventoryManagementContext _context;

        public InventoryController(InventoryManagementContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllItems() //get item list
        {
            List<Item> itemList = _context.Items.ToList();
            return Ok(itemList);
        }
        // POST: api/Inventory
        [HttpPost]
        public IActionResult CreateItem([FromBody] Item item)
        {
            if (item == null)
            {
                return BadRequest(); //empty form of item
            }

            _context.Items.Add(item);
            _context.SaveChanges();

            return Ok();
        }

        // PUT: api/Inventory/5
        [HttpPut("{id}")]
        public IActionResult UpdateItem(int id, [FromBody] Item item)
        {
            if (item == null )
            {
                return BadRequest(); // Return 400 Bad Request if the provided data is invalid.
            }

            var existingItem = _context.Items.Find(id);
            if (existingItem == null)
            {
                return NotFound(); // Return 404 Not Found if the item with the specified ID doesn't exist.
            }

            existingItem.ItemCode = item.ItemCode;
            existingItem.ItemName = item.ItemName;
            existingItem.BrandName = item.BrandName;
            existingItem.UnitOfMeasurement = item.UnitOfMeasurement;
            existingItem.PurchaseRate = item.PurchaseRate;
            existingItem.SalesRate = item.SalesRate;
            existingItem.IsActive = item.IsActive;

            _context.Items.Update(existingItem);
            _context.SaveChanges();

            return NoContent(); // Return 204 No Content to indicate a successful update.
        }

        // DELETE: api/Inventory/5
        [HttpDelete("{id}")]
        public IActionResult DeleteItem(int id)
        {
            var item = _context.Items.Find(id);
            if (item == null)
            {
                return NotFound(); // Return 404 Not Found if the item with the specified ID doesn't exist.
            }

            _context.Items.Remove(item);
            _context.SaveChanges();

            return NoContent(); // Return 204 No Content to indicate a successful delete.
        }
        [HttpGet("filter-items")]
        public async Task<IActionResult> FilterItemsByName(string itemNameFilter)
        {
            if (string.IsNullOrEmpty(itemNameFilter))
            {
                return BadRequest("Item name filter is required.");
            }

            // Use FromSqlRaw to call the stored procedure and pass the parameter
            var filteredItems = await _context.Items
                .FromSqlRaw("EXEC FilterItemsByName @p0", itemNameFilter)
                .ToListAsync();

            return Ok(filteredItems);
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
    [Route("api/[controller]")]
    [ApiController]
    public class StockController : ControllerBase  //controller for Stocks
    {
        private readonly InventoryManagementContext _context;

        public StockController(InventoryManagementContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllStocks()
        {
            var stocksList = (from stock in _context.Stocks
                              join store in _context.Stores on stock.StoreId equals store.StoreId
                              join item in _context.Items on stock.ItemId equals item.ItemId
                              select new
                              {
                                  StockId = stock.StockId,
                                  Quantity = stock.Quantity,
                                  ExpiryDate = stock.ExpiryDate,
                                  StoreName = store.StoreName,
                                  ItemName = item.ItemName
                              }).ToList();

            return Ok(stocksList);
        }
        // POST: api/Stock
        [HttpPost]
        public IActionResult CreateStock([FromBody] Stock stock)
        {
            if (stock == null)
            {
                return BadRequest(); // Return 400 Bad Request if the provided data is invalid.
            }

            _context.Stocks.Add(stock);
            _context.SaveChanges();

            return Ok();
        }

        // PUT: api/Stock/
        [HttpPut("{id}")]
        public IActionResult UpdateStock(int id, [FromBody] Stock stock)
        {
            if (id != stock.StockId)
            {
                return BadRequest(); // Return 400 Bad Request if IDs don't match.
            }

            _context.Entry(stock).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StockExists(id))
                {
                    return NotFound(); // Return 404 Not Found if the stock doesn't exist.
                }
                else
                {
                    throw;
                }
            }

            return NoContent(); // Return 204 No Content on successful update.
        }

        // DELETE: api/Stock
        [HttpDelete("{id}")]
        public IActionResult DeleteStock(int id)
        {
            var stock = _context.Stocks.Find(id);

            if (stock == null)
            {
                return NotFound(); // Return 404 Not Found if the stock doesn't exist.
            }

            _context.Stocks.Remove(stock);
            _context.SaveChanges();

            return Ok(stock);
        }

        private bool StockExists(int id)
        {
            return _context.Stocks.Any(e => e.StockId == id);
        }

    }
    [Route("api/[controller]")]
    [ApiController]
    public class GeneralController : ControllerBase  //controller for all
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

    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase  //controller for store
    {
        private readonly InventoryManagementContext _context;

        public StoreController(InventoryManagementContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllStore() //get store 
        {
            List<Store> storeList = _context.Stores.ToList();
            return Ok(storeList);
        }
        [HttpPost]
        public IActionResult CreateItem([FromBody] Store store)
        {
            if (store == null)
            {
                return BadRequest(); //empty form of store
            }

            _context.Stores.Add(store);
            _context.SaveChanges();

            return Ok();
        }
    }
}
