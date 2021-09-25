create or replace procedure app.best_seller_of_city(
	city_param varchar(256)
)
language plpgsql    
as
$proc$
begin
	create table if not exists app.best_seller(
		vendornumber int,
		vendorname varchar(256),
		saledollars money
	);
	
	insert into app.best_seller(
		vendornumber,
		vendorname,
		saledollars
	)
	select 
		vendornumber,
		vendorname,
		sum(saledollars)
	from app.sales_sample_range s
	where s.city = city_param
	group by 
		vendornumber,
		vendorname
	order by 3 desc
	limit 1;
end;
$proc$