CREATE DATABASE Inventorysys
GO
USE Inventorysys
GO
-- Create the tbl_users table to store user information
CREATE TABLE Users(
    userId INT PRIMARY KEY IDENTITY(1,1),
    fullName VARCHAR(255) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL, 
    role VARCHAR(50) NOT NULL,
    isActive BIT NOT NULL DEFAULT 1
);

-- Create the tbl_items table to store inventory item information
CREATE TABLE Items (
    itemId INT PRIMARY KEY IDENTITY(1,1),
    itemCode VARCHAR(20) NOT NULL UNIQUE,
    itemName VARCHAR(255) NOT NULL,
    brandName VARCHAR(100),
    unitOfMeasurement VARCHAR(50) NOT NULL,
    purchaseRate DECIMAL(10, 2) NOT NULL,
    salesRate DECIMAL(10, 2) NOT NULL,
    isActive BIT NOT NULL 
);



-- Create the tbl_stores table to store store information
Create TABLE Stores (
    storeId INT PRIMARY KEY IDENTITY(1,1),
    storeName VARCHAR(100) NOT NULL,
    isActive BIT NOT NULL DEFAULT 1
);
GO
-- Create the tbl_stocks table to store stock information
CREATE TABLE Stocks (
    stockId INT PRIMARY KEY IDENTITY(1,1),
    storeId INT NOT NULL,
    itemId INT NOT NULL,
    quantity INT NOT NULL,
    expiryDate DATE,
    FOREIGN KEY (storeId) REFERENCES Stores(storeId),
    FOREIGN KEY (itemId) REFERENCES Items(itemId)
);
GO
create PROCEDURE [dbo].[FilterItemsByName]
    @ItemNameFilter NVARCHAR(100) -- Input parameter for the item name filter
AS
BEGIN
    SELECT *
    FROM Items
    WHERE ItemName LIKE '%' + @ItemNameFilter + '%' AND isActive=1;
END
GO
ALTER TABLE Items
ADD CONSTRAINT DF_Items_isActive DEFAULT 1 FOR isActive;
GO
ALTER TABLE Stores
ADD CONSTRAINT DF_Stores_isActive DEFAULT 1 FOR isActive;
Go