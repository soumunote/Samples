--
-- Oracle PL/SQL 
--
declare
  assocArray dbms_utility.number_array;
begin
  assocArray(0) := 365;
  assocArray(1) := 31;
  assocArray(2) := 28;
  assocArray(3) := 31;
  assocArray(4) := 30;
  for i in 0 .. assocArray.count - 1 loop
    dbms_output.put_line(assocArray(i));
  end loop;
end;
/
