﻿using InventorymanagementSystem.InventoryDbContext;
using InventorymanagementSystem.Models;
using Microsoft.AspNetCore.Mvc;

namespace InventorymanagementSystem.Controller
{
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
            List<Store> storeList = _context.Stores.Where(s => s.IsActive).ToList();
            return Ok(storeList);
        }
        [HttpPost]
        public IActionResult CreateItem([FromBody] Store store)
        {
            if (store == null)
            {
                return BadRequest(); //empty form of store
            }
            store.IsActive = true;
            _context.Stores.Add(store);
            _context.SaveChanges();

            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteItem(int id)
        {
            var store = _context.Stores.Find(id);
            if (store == null)
            {
                return NotFound(); // Return 404 Not Found if the store with the specified ID doesn't exist.
            }

            
            store.IsActive = false;

            _context.Stores.Update(store); 
            _context.SaveChanges();

            return NoContent(); 
        }
    }
}
