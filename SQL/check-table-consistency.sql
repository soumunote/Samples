--
-- 同じ項目名でありながら、属性の異なる列を一覧する
--
with
column_info as 
(select
     table_name,
     column_name,
     decode(data_type,'VARCHAR2','VARCHAR2(' || data_length || ')',
                      'NUMBER',  'NUMBER(' || data_precision || ',' || data_scale || ')',
                       data_type) datatype
 from
     user_tab_columns) 
select
    table_name,
    column_name,
    datatype
from
    column_info
where
    column_name in (select column_name from column_info group by column_name having count(distinct datatype) > 1)
order by
    column_name,
    datatype,
    table_name
