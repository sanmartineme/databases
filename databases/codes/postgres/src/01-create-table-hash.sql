CREATE TABLE app.sales (
    InvoiceItemNumber VARCHAR(256),
    SaleDate DATE,
    StoreNumber INT,
    StoreName VARCHAR(256),
    Address VARCHAR(256),
    City VARCHAR(256),
    ZipCode VARCHAR(32),
    StoreLocation VARCHAR(256),
    CountyNumber INT,
    County VARCHAR(256),
    Category INT,
    CategoryName VARCHAR(256),
    VendorNumber INT,
    VendorName VARCHAR(256),
    ItemNumber INT,
    ItemDescription VARCHAR(256),
    Pack INT,
    BottleVolume MONEY,
    StateBottleCost MONEY,
    StateBottleRetail MONEY,
    BottlesSold INT,
    SaleDollars MONEY,
    VolumeSoldLiters FLOAT,
    VolumeSoldGallons FLOAT
) PARTITION BY HASH(id);
-- 3 particiones hash.
CREATE TABLE app.sales_part1 PARTITION OF app.sales FOR
VALUES WITH (modulus 3, remainder 0);
CREATE TABLE app.sales_part2 PARTITION OF app.sales FOR
VALUES WITH (modulus 3, remainder 0);
CREATE TABLE app.sales_part3 PARTITION OF app.sales FOR
VALUES WITH (modulus 3, remainder 0);