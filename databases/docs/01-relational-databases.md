# 馃捑 Base de datos relacionales 馃捑

Las bases de datos relacionales se basan en el modelamiento de un fen贸meno real bajo una estructura pre definida que permita saber lo que ah铆 ocurre.

## Introducci贸n

### 驴 Por qu茅 existen?

Existen porque representan fielmente la abstracci贸n humana en t茅rminos de c贸mo procesamos la informaci贸n en nuestro cerebro. Conectamos ideas, pensamientos y objetos, y las almacenamos en nuestra memoria con cierta estructura. Todo lo que sabemos o conocemos lo interconectamos para tomar alguna acci贸n o decisi贸n.

### Componentes de abstracci贸n

- **Entidad**: persona, lugar, objeto o evento de inter茅s acerca del cual se recogen o procesan datos. Esta se representa por medio de un rect谩ngulo, mismo que contiene dentro el nombre de la entidad.
- **Atributo**: es una caracter铆stica de una entidad o de una relaci贸n en funci贸n de lo que nos interesa en nuestra aplicaci贸n. Su representaci贸n gr谩fica es una elipse.
- **Relaci贸n**: Describe la interacci贸n entre dos o m谩s entidades.

<p align="center">
    <img src="./images/relational-databases-components.png" height="512"/>
</p>

Una **Tabla** es un conjunto de datos dispuesto en una estructura de filas y columnas. En una tabla las filas se denominan registros y las columnas campos; la primera fila contiene los nombres de campo. Cada campo contiene determinado tipo de datos y tiene una longitud expresada en el n煤mero de caracteres m谩ximo del campo. Para crear una tabla es necesario definir su estructura:

- El nombre de la tabla.
- Los tipos de dato de cada campo.
- Las propiedades o caracter铆sticas de cada campo.
- El campo clave.

<p align="center">
    <img src="./images/mer.png" height="512"/>
</p>

## Principales vendors

<p align="center">
    <img src="./images/vendors-relational-databases.jpeg" height="512"/>
</p>

## Conceptos b谩sicos

### Tipos de datos

- [PostgreSQL](https://www.postgresql.org/docs/9.5/datatype.html)
- [SQL Server](https://docs.microsoft.com/en-us/sql/t-sql/data-types/data-types-transact-sql?view=sql-server-ver15)

### Creaci贸n de objetos

#### Roles de usuarios

Los permisos de acceso en PostgreSQL se administran definiendo roles. Dentro de este concepto se incluyen tanto los usuarios como los grupos. La diferencia principal entre ambos es que, mientras el rol de tipo usuario se usa para acceder y trabajar con la base de datos, los grupos agregan a usuarios y definen permisos sobre esquemas y objetos de la estructura.

```sql
-- Ejemplo rol master con privilegios de super usuario.
CREATE ROLE master WITH
LOGIN
SUPERUSER
INHERIT
CREATEDB
CREATEROLE
REPLICATION
PASSWORD 'master.PASS'
VALID UNTIL '2022-01-01';
```

#### Base de datos

```sql
-- Base de datos por defecto.
CREATE DATABASE sales;

-- Crea una base de datos llamada "sales" cuyo owner es el usuario "salesapp" en el espacio de tablas "salesspace".
CREATE TABLESPACE salesspace LOCATION '/data/dbs';
CREATE DATABASE sales OWNER master TABLESPACE salesspace;
```

#### Esquemas

```sql
CREATE SCHEMA IF NOT EXISTS app AUTHORIZATION master;
```

#### Tablas

```sql
-- Creaci贸n de una tabla.
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
);
```

#### Carga de datos

```sql
-- https://www.kaggle.com/residentmario/iowa-liquor-sales/version/2
COPY app.sales(
	InvoiceItemNumber,
    SaleDate,
    StoreNumber,
    StoreName,
    Address,
    City,
    ZipCode,
    StoreLocation,
    CountyNumber,
    County,
    Category,
    CategoryName,
    VendorNumber,
    VendorName,
    ItemNumber,
    ItemDescription,
    Pack,
    BottleVolume,
    StateBottleCost,
    StateBottleRetail,
    BottlesSold,
    SaleDollars,
    VolumeSoldLiters,
    VolumeSoldGallons
)
FROM '/files/sales.csv'
DELIMITER ','
CSV HEADER;
```

### Consultas

#### Selecci贸n de datos

```sql
-- Seleccionar todos los registros de una tabla.
SELECT * FROM app.sales;

-- Seleccionar algunos campos solamente.
SELECT
    InvoiceItemNumber,
    SaleDate,
    StoreNumber,
    StoreName,
    Address
FROM app.sales;

-- Limitar el n煤mero de registros a retornar a 100 solamente.
SELECT
    InvoiceItemNumber,
    SaleDate,
    StoreNumber,
    StoreName,
    Address
FROM app.sales
LIMIT 100;

-- Selecci贸n con condiciones.
-- Ej. Las ventas mayores a 100 d贸lares realizadas en la ciudad de WATERLOO y SHELDON ordenados descendentemente por fecha.
SELECT *
FROM app.sales
WHERE SaleDollars > 100
AND City IN ('WATERLOO', 'SHELDON')
ORDER BY SaleDate DESC;
```

#### Actualizaci贸n de datos

```sql
-- Actualizaci贸n bajo condiciones.
UPDATE app.sales SET
    SaleDate = '2020-01-01'
WHERE SaleDate IS NULL;
```

#### Eliminaci贸n de datos

<p align="center">
    <img src="./images/delete-vs-truncate.png" height="512"/>
</p>

```sql
-- Elimina todos los registros de la tabla. Log m铆nimo de transacci贸n.
TRUNCATE TABLE app.sales;

-- Elimina ciertos registros en base a algunas condiciones entregadas
-- El Log depender谩 de la envergadura de la transacci贸n.
DELETE FROM app.sales
WHERE SaleDollars < 100;
```

## Conceptos avanzados

#### 脥ndices

Existen varios tipos de 铆ndices: B-tree, Hash, GiST o GIN. Cada tipo de 铆ndice utiliza un algoritmo diferente que se adapta mejor a diferentes tipos de consultas. De forma predeterminada, el comando CREATE INDEX crea 铆ndices de B-tree (脕rbol B), que se ajustan a las situaciones m谩s comunes. Comentar tambi茅n que al definir una Clave Primaria (PRIMARY KEY) sobre el campo de una tabla, este en s铆 se constituye como un 铆ndice, generando una restricci贸n que impide que este campo se repita (UNIQUE) y que contenga valores nulos (NOT NULL).

```sql
-- Indice para b煤squedas sobre fecha.
CREATE INDEX idx_sales_sales_date
ON app.sales(SaleDate);

-- Indice para b煤squedas sobre ciudad.
CREATE INDEX idx_sales_sales_city
ON app.sales(City);
```

#### Particiones

Para cuando existen tabla muy grandes. (1TB hacia arriba), los 铆ndices comienzan a perder poder debido a la volumentr铆a. Para ello existen las particiones de tabla, que segmentan y distribuye en tablas de partici贸n los datos. Esto permite que las consultas puedan ser resueltas de mejor forma. (Ver secci贸n c贸digos).

```sql
-- Ver la distinuci贸n de los registros por partici贸n
SELECT
	tableoid::regclass
	,count(*)
FROM app.sales_sample_range
GROUP BY tableoid::regclass
```

#### Procedimientos almacenados

Permiten automatizar operaciones recurrentes en un contexto de datos. Generalmente operaciones CRUD, transacciones y c谩lculos batch (Ver secci贸n de c贸digos).
