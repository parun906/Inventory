using InventorymanagementSystem.InventoryDbContext;
using InventorymanagementSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventorymanagementSystem.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase  //controller for items
    {
        private readonly InventoryManagementContext _context;

        public ItemsController(InventoryManagementContext context)
        {
            _context = context;
        }

       /* [HttpGet]
        public IActionResult GetAllItems() //get item list
        {        
            List<Item> itemList = _context.Items.ToList();
            return Ok(itemList);
        }*/

        [HttpGet]
        public IActionResult GetAllItemsForUser()
        {
            List<Item> itemList = _context.Items.Where(item => item.IsActive).ToList();
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
            item.IsActive = true;
            _context.Items.Add(item);
            _context.SaveChanges();

            return Ok();
        }

       
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
            existingItem.IsActive = item.IsActive = true;

            _context.Items.Update(existingItem);
            _context.SaveChanges();

            return NoContent(); //  No Content to indicate a successful update.
        }

        
        [HttpDelete("{id}")]
        public IActionResult DeleteItem(int id)
        {
            var item = _context.Items.Find(id);
            if (item == null)
            {
                return NotFound(); // Return 404 Not Found if the item with the specified ID doesn't exist.
            }
            item.IsActive = false;

            
            _context.Items.Update(item);
            _context.SaveChanges();

            return NoContent(); 
        }

        //for search button
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
}
