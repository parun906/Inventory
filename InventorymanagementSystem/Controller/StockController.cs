using InventorymanagementSystem.InventoryDbContext;
using InventorymanagementSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventorymanagementSystem.Controller
{
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
}
