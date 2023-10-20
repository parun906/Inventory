#Inventory Management System


  -> This system  helps the users efficiently track and manage inventory items. 
  -> The project  involves frontend development using Angular, backend development using .NET, and data storage in SQL Server.
  -> This project  contains Authentication and Authorization based on 2 roles (admin and user).
  

* Technologies and Components:
1. Angular (Frontend)
   -> a user-friendly web interface for managing inventory.
		->  Pages as below
			a. Items(list/add/update)
			b. Stocks (list/add/update)
   ->  features for adding, updating, and removing inventory items.
   -> validations.
   -> search and filtering capabilities for inventory items.
   -> use of ag-grid to list Inventory Items.
   -> Use of Angular services to interact with the backend API.
   -> User Authentication and Authorization
   -> Safeguard Routes based on User roles

2. .NET (Backend)
   ->  a RESTful API using ASP.NET Core for inventory management.
   -> endpoints for CRUD operations on inventory items.
   -> authentication and authorization to control access.
   ->  validation and error-handling mechanisms.
   
3. SQL Server (Database)
    ->  a database schema that can store users and their roles and Inventory Items with their stocks.			
    ->  a stored procedure to fetch stocks of items which should be capable to filter the stocks based in provided store.

