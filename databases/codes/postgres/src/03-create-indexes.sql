-- Indice para búsquedas sobre fecha.
CREATE INDEX idx_sales_sales_date ON app.sales(SaleDate);
CREATE INDEX idx_sales_sales_city ON app.sales(City);