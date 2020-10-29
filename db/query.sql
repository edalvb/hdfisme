/*
¡ERROR!- Client does not support authentication protocol requested by server; consider upgrading MySQL client
https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
Ejecute la siguiente consulta en MYSQL Workbench
*/
CREATE USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345';
flush privileges;

/**
Problema con las fechas que no se guardan
https://stackoverflow.com/questions/44304777/er-truncated-wrong-value-incorrect-datetime-value
Este error se debe al modo SQL estricto. Entonces, solo eliminar STRICT_TRANS_TABLES de sql_mode es suficiente. por ejemplo
SET SESSION sql_mode = 'ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
*/
SELECT @@sql_mode;
SET SESSION SQL_MODE = 'ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
SET GLOBAL SQL_MODE = 'ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
SELECT @@GLOBAL.sql_mode;
SELECT @@SESSION.sql_mode;

-- Muestra las tablas de la base de datos
SHOW FULL TABLES FROM hdfisme;

SELECT TABLE_NAME
FROM information_schema.tables
WHERE TABLE_SCHEMA = 'hdfisme';

/*El ajuste relaja la comprobación de funciones no deterministas.
Las funciones no deterministas son funciones que modifican datos
(es decir, tienen instrucciones de actualización, inserción o eliminación). */
SET GLOBAL log_bin_trust_function_creators = 1;
-- -------------------------------------------------------------------------------------------------------------------------------------------------

SELECT *
FROM information_schema.tables
WHERE TABLE_SCHEMA = 'hdfisme' AND TABLE_NAME = 'rol_usuario';


SELECT DATEDIFF(fecha_cierre, fecha_creacion) FROM hdfisme.incidente;
