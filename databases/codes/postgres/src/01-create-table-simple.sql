CREATE TABLE app.sales_sample (
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
)
TABLESPACE appspace;

-- Indice para búsquedas sobre fecha.
CREATE INDEX idx_sales_sales_sample_date ON app.sales_sample(SaleDate);

-- Indice para búsquedas sobre ciudad.
CREATE INDEX idx_sales_sales_sample_city ON app.sales_sample(City);