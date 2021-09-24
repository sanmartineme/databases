CREATE TABLE app.sales_sample_range (
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
) PARTITION BY RANGE(SaleDate);
CREATE TABLE app.sales_range_part_min_to_2014 PARTITION OF app.sales_sample_range FOR
VALUES
FROM (MINVALUE) TO ('2014-12-31');
CREATE TABLE app.sales_range_part_2015_to_max PARTITION OF app.sales_sample_range FOR
VALUES
FROM ('2015-01-01') TO (MAXVALUE);
-- Indice para búsquedas sobre fecha.
CREATE INDEX idx_sales_sales_sample_range_date ON app.sales_sample_range(SaleDate);
-- Indice para búsquedas sobre ciudad.
CREATE INDEX idx_sales_sales_sample_range_city ON app.sales_sample_range(City);