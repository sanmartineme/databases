create or replace function app.get_city_count_up_100(
	city_param varchar(256)
)
returns int
language plpgsql
as
$$
declare
   city_count int;
begin
	select count(*) 
		into city_count
	from app.sales_sample_range
	where city = city_param
		and saledollars > CAST(100 as MONEY);
		
   return city_count;
end;
$$;

-- Ejemplo de uso.
-- select 
-- 	 city
-- 	,app.get_city_count_up_100(city)
-- from app.sales_sample_range;