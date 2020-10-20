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

SELECT * FROM estado_bien WHERE idestado = 'r';
SELECT * FROM tipo_bien;
SELECT * FROM modelo_bien;
SELECT * FROM marca_bien;

SELECT * FROM bien;

SELECT count(idbien) as totalbiens FROM bien;

# Consultar adminsitrativos
SELECT * FROM persona as p, administrativo as a
WHERE p.idpersona = a.idpersona;

# Consultar adminsitrativo por su código
SELECT * FROM persona as p, administrativo as a
WHERE p.idpersona = a.idpersona AND a.idpersona = '01721';

# Consultar proveedores
SELECT * FROM persona as per, proveedor as pro
WHERE per.idpersona = pro.idpersona;

# Consultar proveedores por su código
SELECT * FROM persona as per, proveedor as pro
WHERE per.idpersona = pro.idpersona AND pro.idpersona = '2';

SELECT 
    *
FROM
    persona;

/*
 * Procedimiento Almacenado "Administrativo"
 * Se crea este procedimiento para guardar en las tablas
 * Administrativo y Persona solo con este procedimento
 * admemás para evitar problemas de concurrencia.
 */

DELIMITER $$
CREATE PROCEDURE `list_bien` ()
BEGIN
SELECT 
	b.idbien,
    b.denominacion,
    p.numero as pecosa,
    b.valor_adquisicion,
    m.nombre as marca,
    mo.nombre as modelo,
    t.nombre as tipo,
    b.color,
    b.serie_dimension,
    s.nombre as estado,
    b.stock,
    um.nombre as unidad_medida,
    b.comentario,
    b.fecha_adquisicion,
    b.fecha_creacion
FROM bien b
LEFT JOIN pecosa p
		ON b.idpecosa = p.id
LEFT JOIN marca_bien m
		ON b.idmarca = m.id
LEFT JOIN modelo_bien mo
		ON b.idmodelo = mo.id
LEFT JOIN tipo_bien t
		ON b.idtipo = t.id
LEFT JOIN estado_bien s
		ON b.idestado = s.id
LEFT JOIN unidad_medida_bien um
		ON b.idunidad_medida = um.id
ORDER BY b.idbien;
END
DELIMITER $$

CALL list_bien();

DELIMITER $$
CREATE PROCEDURE create_administrativo(
	IN fechanacimiento DATE,
    IN email varchar(100),
    IN direccion varchar(500),
    IN celular char(12),
    IN telefono varchar(20),
    IN RUC char(11),
    IN pnombre varchar(100), -- A partir de aquí son los valores de la tabla "administrativo"
    IN snombre varchar(100),
    IN papellido varchar(100),
    IN sapellido varchar(100),
    IN DNI char(8),
    IN area INT)
BEGIN
    DECLARE id INT; -- Declaramos una variable que almacenará el "id" de la tabla "persona" y la tabla "administrativo"
    SET id = IFNULL((SELECT MAX(idpersona) + 1 FROM `hdfisme`.`persona`), 0); -- devuelve 0 si la primera expresion es NULL, sino devolverá el máximo de idpersona de la tabla persona.
    START TRANSACTION;
		INSERT INTO `hdfisme`.`persona` (
			`idpersona`,
			`fechanacimiento`,
			`email`,
			`direccion`,
			`celular`,
			`telefono`,
			`RUC` ) VALUES (
			id,
			fechanacimiento,
			email,
			direccion,
			celular,
			telefono,
			RUC);

		INSERT INTO `hdfisme`.`administrativo` VALUES (
			id,
			pnombre,
			snombre,
			papellido,
			sapellido,
			DNI,
			area);
	COMMIT;
END$$

DELIMITER $$
CREATE PROCEDURE `get_administrativo` (IN id INT)
BEGIN
    SELECT
		a.idpersona,
        p.fechanacimiento,
        p.email,
        p.direccion,
        p.celular,
        p.telefono,
        p.RUC as ruc,
        a.pnombre, 
        a.snombre, 
        a.papellido, 
        a.sapellido,
        a.DNI as dni,
        ar.id as idarea
    FROM administrativo a
    LEFT JOIN persona p
            ON p.idpersona = a.idpersona
    LEFT JOIN area ar
            ON ar.id = a.idarea
    WHERE p.idpersona = id
    ORDER BY a.pnombre;
END$$

CALL get_administrativo(3);

DELIMITER $$
CREATE PROCEDURE update_administrativo(
	IN id INT,
	IN fechana date,
    IN correo varchar(100),
    IN address varchar(500),
    IN celphonephone char(12),
    IN phone varchar(20),
    IN ruc char(11),
    IN pname varchar(100), -- A partir de aquí son los valores de la tabla "administrativo"
    IN sname varchar(100),
    IN plname varchar(100),
    IN slname varchar(100),
    IN dni char(8))
BEGIN
UPDATE `hdfisme`.`persona`
SET fechanacimiento = fechana,
email = correo,
direccion = address,
celular = celphonephone,
telefono = phone,
RUC = ruc
WHERE idpersona = id;

UPDATE `hdfisme`.`administrativo` 
SET 
    pnombre = pname,
    snombre = sname,
    papellido = plname,
    sapellido = slname,
    DNI = dni
WHERE
    idpersona = id;
END

DELIMITER $$
CREATE PROCEDURE create_proveedor(
	IN fechanacimiento date,
    IN email varchar(100),
    IN direccion varchar(500),
    IN celular char(12),
    IN telefono varchar(20),
    IN RUC char(11),
    IN razon_social varchar(500), -- A partir de aquí son los valores de la tabla "administrativo"
    IN rubro varchar(800))
BEGIN
DECLARE id INT; -- Declaramos una variable que almacenará el "id" de la tabla "persona" y la tabla "administrativo"
SET id = IFNULL((SELECT MAX(idpersona) + 1 FROM `hdfisme`.`persona`), 0); -- devuelve 0 si la primera expresion es NULL, sino devolverá el máximo de idpersona de la tabla persona.

INSERT INTO `hdfisme`.`persona` ( -- Se especifican los campos a ingresar porque el campo 'fecha_creacion' es automático y se insertará al crear éste regitro.
`idpersona`,
`fechanacimiento`,
`email`,
`direccion`,
`celular`,
`telefono`,
`RUC`
) VALUES (
	id,
	fechanacimiento,
	email,
	direccion,
	celular,
	telefono,
	RUC
);
INSERT INTO `hdfisme`.`proveedor` VALUES (
	id,
	razon_social,
	rubro
);
END$$

DELIMITER $$
CREATE PROCEDURE update_proveedor(
	IN id INT,
	IN fechana date,
    IN correo varchar(100),
    IN address varchar(500),
    IN celphonephone char(12),
    IN phone varchar(20),
    IN ruc char(11),
    IN rsocial varchar(500), -- A partir de aquí son los valores de la tabla "proveedor"
    IN rubre varchar(800))
BEGIN
UPDATE `hdfisme`.`persona`
SET fechanacimiento = fechana,
email = correo,
direccion = address,
celular = celphonephone,
telefono = phone,
RUC = ruc
WHERE idpersona = id;

UPDATE `hdfisme`.`proveedor` 
SET 
    razon_social = rsocial,
    rubro = rubre
WHERE
    idpersona = id;
END

CALL list_bien();

SELECT usuario_leer FROM rol_usuario WHERE id = 2;
SELECT * FROM persona as p, administrativo as a WHERE p.idpersona = a.idpersona AND a.idpersona = 0;
SELECT * FROM persona as p, administrativo as a WHERE p.idpersona = a.idpersona;

CALL create_administrativo(
'1979-01-17', -- fechanacimiento
'jacame@gmail.com', -- email
'Jr. Fernando de la Vega 1538', -- direccion
'943658102', -- celular
'', -- telefono
'10472839563', -- RUC
'Juan', -- pnombre
'Alberto', -- snombre
'Castillo', -- papellido
'Mendoza', -- sapellido
'47283956', -- DNI
null -- area
);


CALL update_administrativo(
5,
NULL,
'',
'',
'',
'',
'',
'Edward',
'',
'Vásquez',
'Becerra',
'78199079'
);

CALL insert_proveedor(
NULL,
'',
'',
'',
'',
'',
'Cheerful Gamer',
'Servicio de cabinas de internet y juegos online y offline'
);

CALL update_proveedor(
7,
NULL,
'',
'',
'',
'',
'',
'Multiservicios Pamelita',
'Servicio de cabinas de ineter y jugería'
);

SELECT * FROM proveedor;
SELECT * FROM administrativo;
select * from persona order by fecha_creacion desc limit 1;

SELECT * FROM estado_bien;


SELECT * FROM area;
SELECT * FROM tipo_movimiento;
SELECT * FROM estado_movimiento;
SELECT * FROM movimiento;

SELECT CONCAT_WS(" ", adm.pnombre, adm.snombre, adm.papellido, adm.sapellido) AS nombreCompleto FROM administrativo adm;

DELIMITER $$
CREATE PROCEDURE list_movimiento()
BEGIN
# Join para listar los biens con sus respectivos (modelo, estado, categoria y marca).
SELECT
	mov.idmovimiento as id, 
	tmov.nombre as tipo_movimiento,
	eq.descripcion as bien,
	CONCAT_WS(" ", adm.pnombre, adm.snombre, adm.papellido, adm.sapellido) AS nombreCompleto
FROM movimiento mov
INNER JOIN tipo_movimiento tmov
		ON mov.idtipo_movimiento = tmov.id
INNER JOIN bien eq
		ON mov.id = eq.idbien
INNER JOIN administrativo adm
		ON mov.idadministrativo_origen = adm.idpersona
INNER JOIN proveedor prov
		ON mov.idproveedor_origen = prov.idpersona
INNER JOIN area
		ON mov.idarea_origen = area.id
INNER JOIN estado_movimiento esmov
		ON mov.idestado_movimiento = esmov.id
ORDER BY mov.idtipo_movimiento;
END

-- CREATE PECOSAS -- CREATE PECOSAS -- CREATE PECOSAS -- CREATE PECOSAS -- CREATE PECOSAS -- CREATE PECOSAS -- CREATE PECOSAS -- CREATE PECOSAS -- CREATE PECOSAS --
/*
* Procedimiento para crear una PECOSA donde no se repiten los número en un mismo año.
*/
DELIMITER $$
CREATE PROCEDURE create_pecosa(
    IN pnumero INT,
    IN pyear CHAR(4),
    IN comentario varchar(500))
BEGIN
-- CREATE PECOSAS -- CREATE PECOSAS -- CREATE PECOSAS -- CREATE PECOSAS -- CREATE PECOSAS -- CREATE PECOSAS -- CREATE PECOSAS -- CREATE PECOSAS -- CREATE PECOSAS --

DECLARE filas INT DEFAULT 0; -- Se crea una variable que almacene el número de filas recuperadas para validar que no existan datos de la PECOSA que se repitan

SELECT COUNT(*) FROM -- Se cuenta las filas recuperadas con la consulta
`hdfisme`.`pecosa`
WHERE `numero` = pnumero AND `fecha` = pyear LIMIT 10
INTO filas; -- Se guarda el número de filas recuperadas

IF filas = 0 THEN -- Si No hay filas que coincidan entonces se guardan los datos
INSERT INTO `hdfisme`.`pecosa` (
    `numero`,
    `year`,
    `comentario`
) VALUES(
	pnumero,
    pyear,
    comentario
);
END IF;
END$$

CALL create_pecosa(3, 2020, 'algo');

-- UPDATE PECOSAS -- UPDATE PECOSAS -- UPDATE PECOSAS -- UPDATE PECOSAS -- UPDATE PECOSAS -- UPDATE PECOSAS -- UPDATE PECOSAS -- UPDATE PECOSAS --
/*
* Procedimiento para actualizar una PECOSA donde no se repiten los número en un mismo año.
*/
DELIMITER $$
CREATE PROCEDURE update_pecosa(
	IN cod INT,
    IN pnumero INT,
    IN pyear CHAR(4),
    IN comentario varchar(500))
BEGIN
-- UPDATE PECOSAS -- UPDATE PECOSAS -- UPDATE PECOSAS -- UPDATE PECOSAS -- UPDATE PECOSAS -- UPDATE PECOSAS -- UPDATE PECOSAS -- UPDATE PECOSAS --

DECLARE filas INT DEFAULT 0; -- Se crea una variable que almacene el número de filas recuperadas para validar que no existan datos de la PECOSA que se repitan

SELECT `id` FROM -- Se cuenta las filas recuperadas con la consulta
`hdfisme`.`pecosa`
WHERE (`numero` = pnumero AND `year` = pyear) AND `id` != cod LIMIT 10 
INTO filas; -- Se guarda el número de filas recuperadas

IF filas = 0 THEN -- Si No hay filas que coincidan entonces se guardan los datos
UPDATE `hdfisme`.`pecosa`
SET
    `numero` = pnumero,
    `year` = pyear,
    `comentario` = comentario
WHERE `id` = cod;
END IF;
END$$

-- PARA VALIDAR LAS PECOSAS DE ACUERDO A LOS DIAS ----------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
-- Devuelve los números anterior y posterior del número que se le pasa.
CREATE PROCEDURE mayMenCreatePecosa(
	IN peNumero INT,
    IN peFecha Date,
    OUT nAnterior INT,
    OUT aPosterior INT)
BEGIN
	SELECT MAX(`numero`) AS ANTERIOR FROM
    `hdfisme`.`pecosa`
    WHERE YEAR(`fecha`) = YEAR(peFecha) AND peNumero > `numero` -- <<<< OJO
    INTO nAnterior;
    
    SELECT MIN(`numero`) AS ANTERIOR FROM
    `hdfisme`.`pecosa`
    WHERE YEAR(`fecha`) = YEAR(peFecha) AND peNumero < `numero` -- <<<< OJO
    INTO aPosterior;
END $$
DELIMITER $$

DELIMITER $$
-- Devuelve los números anterior y posterior del número que se le pasa.
-- Esto es para actualizar porque acá se cuenta con todo el numero que se le esta pasando
CREATE PROCEDURE mayMenUpdatePecosa(
	IN peNumero INT,
    IN peFecha Date,
    OUT nAnterior INT,
    OUT aPosterior INT)
BEGIN
	SELECT MAX(`numero`) AS ANTERIOR FROM
    `hdfisme`.`pecosa`
    WHERE YEAR(`fecha`) = YEAR(peFecha) AND peNumero >= `numero` -- <<<< OJO
    INTO nAnterior;
    
    SELECT MIN(`numero`) AS ANTERIOR FROM
    `hdfisme`.`pecosa`
    WHERE YEAR(`fecha`) = YEAR(peFecha) AND peNumero <= `numero` -- <<<< OJO
    INTO aPosterior;
END $$
DELIMITER $$

DELIMITER $$
CREATE FUNCTION daysTransacurridosPecosa(
	peNumero INT,
    peFecha DATE)
RETURNS INT NOT DETERMINISTIC -- Es NOT DETERMINISTIC porque a veces retornará nulo y otras un entero
BEGIN
	DECLARE daysTrancurridos INT;
    CALL mayMenCreatePecosa (peNumero, peFecha, @nAnterior,  @nPosterior);
    -- Devuelve la diferencia de las fechas del número anterior y el que se consulta "peNumero"
    SET daysTrancurridos = TIMESTAMPDIFF(DAY, (
		-- Me devuelve la fecha del número anterior
		SELECT `fecha` FROM pecosa
		WHERE `numero` = (@nAnterior) AND YEAR(`fecha`) = YEAR(peFecha)
	), peFecha);
RETURN daysTrancurridos;
END $$
DELIMITER $$

DELIMITER $$
CREATE FUNCTION validarPecosa (
	peNumero INT,
    peFecha DATE)
RETURNS BOOLEAN READS SQL DATA
BEGIN

	DECLARE daysAnterior INT;
    DECLARE daysPosterior INT;
    DECLARE valAnterior BOOLEAN DEFAULT FALSE;
    DECLARE valPosterior BOOLEAN DEFAULT FALSE;
    DECLARE tempNumero INT;
	
	-- Esta sentencia me devuelve la diferencia de dias entre el numero anterior y el que pretendo pasarle
	CALL mayMenCreatePecosa (peNumero, peFecha, @nAnterior,  @nPosterior);
    SET tempNumero = @nAnterior;
    
    IF(ISNULL(tempNumero) = 0) THEN
        SET daysAnterior = daysTransacurridosPecosa(tempNumero, peFecha);
        IF(daysAnterior >= 0) THEN
			SET valAnterior = TRUE;
		END IF;
	END IF;
    
    SET tempNumero = @nPosterior;
    IF(ISNULL(tempNumero) = 0) THEN
		SET daysPosterior = daysTransacurridosPecosa(tempNumero, peFecha);
        IF(daysPosterior >= 0) THEN
			SET valPosterior = TRUE;
		END IF;
	END IF;
    
    RETURN valAnterior OR valPosterior;

END $$
DELIMITER $$

SELECT validarPecosa(15, '2021-04-30 09:42:42');
SELECT * FROM pecosa ORDER BY `numero`;
CALL mayMenCreatePecosa (15, '2021-04-30 09:42:42', @nAnterior,  @nPosterior);
SELECT (@nAnterior);
SELECT (@nPosterior);
-- SELECT daysTransacurridosPecosa(@nAnterior, '2021-04-30');
SELECT daysTransacurridosPecosa(@nPosterior, '2021-04-30');
-- PARA VALIDAR LAS PECOSAS DE ACUERDO A LOS DIAS ----------------------------------------------------------------------------------------------------------------------------------

CALL update_pecosa(
	3,
	3,
    '2020',
    'Comment1'
);

-- ------------------------------------------- LIST MOVIMIENTO ---------------------------------------------------------------

DELIMITER $$
CREATE PROCEDURE `list_movimiento` ()
BEGIN
    SELECT
        tm.nombre as tipo_movimiento,
        b.denominacion as bien,
        m.cantidad,
        CONCAT_WS(" ", adm.pnombre, adm.snombre, adm.papellido, adm.sapellido) as administrativo,
        prv.razon_social as proveedor,
        a.nombre as area,
        sm.nombre as estado_movimiento,
        m.fecha_movimiento,
        m.motivo,
        m.comentario
    FROM movimiento m
    LEFT JOIN tipo_movimiento tm
            ON m.idtipo_movimiento = tm.id
    LEFT JOIN bien b
            ON m.idbien = b.idbien
    LEFT JOIN administrativo adm
            ON m.idadministrativo = adm.idpersona
    LEFT JOIN proveedor prv
            ON m.idproveedor = prv.idpersona
    LEFT JOIN area a
            ON m.idarea = a.id
    LEFT JOIN estado_movimiento sm
            ON m.idestado_movimiento = sm.id
    ORDER BY m.idtipo_movimiento;
END$$

-- Funcion que evalua si existe algún administrador que ya sea responsable y que tenga algún bien asignado
DELIMITER $$
CREATE FUNCTION adminbien(
    idadmin INT,
    idbien INT,
    catidad DECIMAL(16, 3))
RETURNS BOOLEAN READS SQL DATA
BEGIN
    DECLARE stock DECIMAL(16, 3);
    SELECT `stock` FROM movimiento
    WHERE idadmin = `idpersona` AND idbien = `idbien`
    INTO stock;
    IF stock >= cantidad THEN
        RETURN TRUE;
    END IF;
    RETURN FALSE;
END $$


DELIMITER $$
CREATE PROCEDURE `create_movimiento` (
    IN idtipo_movimiento INT,
    IN idbien INT,
    IN idadministrativo INT,
    IN idproveedor INT,
    IN idarea INT,
    IN idestado_movimiento INT,
    IN responsable_anterior INT, -- ES ID DE UN MOVIMIENTO
    IN responsable_nuevo INT, -- ES ID DE UN MOVIMIENTO
    IN cantidad DECIMAL(16,3),
    IN stock DECIMAL(16,3),
    IN fecha TIMESTAMP,
    IN motivo VARCHAR(200),
    IN comentario VARCHAR(500))
BEGIN
	DECLARE stok DECIMAL(16,3);
    DECLARE idmov INT;
    
    SET idmov = IFNULL((SELECT MAX(`idmovimiento`) + 1 FROM `hdfisme`.`movimiento`), 0);

    INSERT INTO movimiento (
        `idmovimiento`,
        `idtipo_movimiento`,
        `idbien`,
        `idadministrativo`,
        `idproveedor`,
        `idarea`,
        `idestado_movimiento`,
        `stock`,
        `fecha_movimiento`,
        `motivo`,
        `comentario`) VALUES (
        idmov,
        idtipo_movimiento,
        idbien,
        idadministrativo,
        idproveedor,
        idarea,
        idestado_movimiento,
        stock,
        fecha,
        motivo,
        comentario);
    
    /* responsable_anterior Y responsable_nuevo DEBEN SER MOVIMIENTOS YA
       CREADOS PARA QUE NO HAYA ALGÚN ERROR MIENTRAS SE EJECUTA EL SP.*/
    IF(ISNULL(responsable_anterior) = 0 AND ISNULL(responsable_nuevo) = 0 AND ISNULL(cantidad) = 0) THEN

        IF(catidad >= 0) THEN
            SELECT `movimiento`.`stock` FROM `hdfisme`.`movimiento`
            WHERE `movimiento`.`idmovimiento` = responsable_anterior
            INTO stok;
        ELSE
            SELECT `movimiento`.`stock` FROM `hdfisme`.`movimiento`
            WHERE `movimiento`.`idmovimiento` = responsable_nuevo
            INTO stok;
        END IF;

        -- PARA CREAR UN RESPONSABLE Y ASIGNAR A OTRO RESPONSABLE stock NO TIENE QUE SER NULL
        -- O CANTIDAD NO PUEDE SER MAYOR QUE EL STOCK DEL responsable_anterior
        IF(stok >= ABS(cantidad)) THEN
            -- Actualiza el Movimiento
            UPDATE movimiento
            SET `stock` = (stok - cantidad)
            WHERE `idmovimiento` = responsable_anterior;

            SELECT `movimiento`.`stock` FROM `hdfisme`.`movimiento`
            WHERE `movimiento`.`idmovimiento` = responsable_nuevo
            INTO stok;

            IF(ISNULL(stok) = 1) THEN
                SET stok = 0;
            END IF;
            
            UPDATE movimiento
            SET `stock` = (stok + cantidad)
            WHERE `idmovimiento` = responsable_nuevo;

            -- Inserta un registro de asigna
            INSERT INTO asigna (
                `idmovimiento`,
                `idresponsable_anterior`,
                `idresponsable_nuevo`,
                `cantidad`) VALUES (
                idmov,
                responsable_anterior,
                responsable_nuevo,
                cantidad);
        END IF;
    END IF;
END$$

CALL create_movimiento(
    1, -- idtipo_movimiento
    null, -- idbien
    null, -- idadministrativo
    null, -- idproveedor
    null, -- idarea
    null, -- idestado_movimiento
    0, -- responsable_anterior
    1, -- responsable_nuevo
    (- 1), -- cantidad
    null, -- stock
    null, -- fecha
    'Esto es una prueba asignación', -- motivo
    null -- comentario
);

-- -------------------------------------------------------------------------------------------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE `list_responsable` ()
BEGIN
SELECT
	r.idresponsable,
	CONCAT_WS(" ", a.pnombre, a.snombre, a.papellido, a.sapellido) AS administrativo,
    b.denominacion AS bien,
    r.stock,
    r.comentario,
    r.fecha_creacion
FROM responsable r
INNER JOIN administrativo a
		ON a.idpersona = r.idpersona
INNER JOIN bien b
		ON b.idbien = r.idbien
ORDER BY r.idresponsable;
END$$

DELIMITER $$
CREATE PROCEDURE `get_responsable_bien` (
	IN bien INT)
BEGIN
	SELECT
		r.idresponsable,
		CONCAT_WS(" ", a.pnombre, a.snombre, a.papellido, a.sapellido) AS administrativo,
        r.stock
    FROM responsable r
    INNER JOIN administrativo a
		ON a.idpersona = r.idpersona
	WHERE r.idbien = bien;
END$$

CALL `list_responsable`();

DELIMITER $$
CREATE PROCEDURE create_responsable (
    IN bien INT,
    IN administrativo INT,
    IN stock DECIMAL (16,3),
    IN comentario VARCHAR(500))
BEGIN
    /*VERIFICA SI HAY UN ADMINISTRATIVO CON ESE BIEN*/
    SELECT COUNT(*) FROM `hdfisme`.`responsable`
    WHERE `idbien`= bien AND `idpersona` = administrativo
    INTO @validar;
    IF (@validar = 0) THEN
        INSERT INTO `hdfisme`.`responsable` (
            `idbien`,
            `idpersona`,
            `stock`,
            `comentario`)
        VALUES (
            bien,
            administrativo,
            stock,
            comentario);
    END IF;
END$$

DELIMITER $$
CREATE PROCEDURE `update_responsable`(
    IN responsable INT,
    IN bien INT,
    IN administrativo INT,
    IN stock DECIMAL (16,3),
    IN comentario VARCHAR(500))
BEGIN
    SELECT COUNT(*)
    FROM `hdfisme`.`responsable`
    WHERE `idbien` = bien AND `idpersona` = administrativo AND `idresponsable` != responsable
    INTO @validar;

    IF(@validar = 0) THEN
		UPDATE `hdfisme`.`responsable`
		SET `idbien` = bien,
			`idpersona` = administrativo,
			`stock` = stock,
			`comentario` = comentario
		WHERE `idresponsable` = responsable;
    END IF;
END $$

-- ASIGNA ASIGNA ASIGNA ASIGNA ASIGNA ASIGNA ASIGNA ASIGNA ASIGNA ASIGNA ASIGNA ASIGNA ASIGNA ASIGNA ASIGNA 

DELIMITER $$
CREATE PROCEDURE `get_asigna` (
	IN id_asigna INT)
BEGIN
    SELECT
        a.fecha_creacion,
        (SELECT CONCAT_WS(" ", ara.pnombre, ara.snombre, ara.papellido, ara.sapellido)
        FROM administrativo ara
        WHERE ara.idpersona = ra.idpersona) as responsable_anterior,
        (SELECT CONCAT_WS(" ", ara.pnombre, ara.snombre, ara.papellido, ara.sapellido)
        FROM administrativo ara
        WHERE ara.idpersona = rn.idpersona) as responsable_nuevo,
        (SELECT b.denominacion
        FROM bien b
        WHERE b.idbien = ra.idbien) as bien,
        a.cantidad,
        a.comentario
    FROM asigna a
    INNER JOIN responsable ra
        ON ra.idresponsable = a.idresponsable_anterior
    INNER JOIN responsable rn
        ON rn.idresponsable = a.idresponsable_nuevo
    WHERE a.idasigna = id_asigna;
END$$

CALL `get_asigna` (3);

DELIMITER $$
CREATE PROCEDURE `gets_asigna` ()
BEGIN
    SELECT
        a.fecha_creacion,
        (SELECT CONCAT_WS(" ", ara.pnombre, ara.snombre, ara.papellido, ara.sapellido)
        FROM administrativo ara
        WHERE ara.idpersona = ra.idpersona) as responsable_anterior,
        (SELECT CONCAT_WS(" ", ara.pnombre, ara.snombre, ara.papellido, ara.sapellido)
        FROM administrativo ara
        WHERE ara.idpersona = rn.idpersona) as responsable_nuevo,
        (SELECT b.denominacion
        FROM bien b
        WHERE b.idbien = ra.idbien) as bien,
        a.cantidad,
        a.comentario
    FROM asigna a
    INNER JOIN responsable ra
        ON ra.idresponsable = a.idresponsable_anterior
    INNER JOIN responsable rn
        ON rn.idresponsable = a.idresponsable_nuevo
    ORDER BY a.fecha_creacion;
END$$

CALL `gets_asigna` ();

DELIMITER $$
CREATE PROCEDURE `create_asigna`(
    IN responsable_anterior INT,
    IN responsable_nuevo INT,
    IN cantidad DECIMAL(16,3),
    IN comentario VARCHAR(500))
BEGIN
    DECLARE stocka INT;
    DECLARE stockn INT;

    SELECT `idbien` FROM `responsable` 
	WHERE `idresponsable` = responsable_anterior
	INTO @biena;
       
	SELECT `idbien` FROM `responsable` 
	WHERE `idresponsable` = responsable_nuevo
	INTO @bienn;

    IF(@biena = @bienn) THEN
        SELECT `stock` FROM `responsable` 
        WHERE `idresponsable` = responsable_anterior
        INTO stocka;
        
        SELECT `stock` FROM `responsable` 
        WHERE `idresponsable` = responsable_nuevo
        INTO stockn;

        -- Si la cantidad es + => es un aumento, por tanto disminuye al "responsable anterior"
        -- Si la cantidad es - => es una disminución por tanto disminuye al "nuevo responsable"
        SET @STOCK = IF(cantidad >= 0, stocka, stockn); -- operador condicional ternario

        -- cantidad tiene que ser menor que el stock que se va restar
        IF(@STOCK >= ABS(cantidad)) THEN
            START TRANSACTION;
                UPDATE `responsable`
                SET `stock` = stocka - cantidad
                WHERE responsable.idresponsable = responsable_anterior;
                
                UPDATE `responsable`
                SET `stock` = stockn + cantidad
                WHERE responsable.idresponsable = responsable_nuevo;
                
                INSERT INTO `hdfisme`.`asigna`(
                    `idresponsable_anterior`,
                    `idresponsable_nuevo`,
                    `cantidad`,
                    `comentario`) VALUES (
                    responsable_anterior,
                    responsable_nuevo,
                    cantidad,
                    comentario);
            COMMIT;
        END IF;
    END IF;
END$$

CALL `create_asigna` (
	12,
    2,
    1,
    null
);

-- Funcion que llena los nombres de las tablas en la tabla "tabla"
DELIMITER $$
CREATE FUNCTION llenarTabla ( )
RETURNS BOOLEAN READS SQL DATA
BEGIN
-- Variables donde almacenar lo que nos traemos desde el SELECT
DECLARE nombre VARCHAR(100);

-- Variable para controlar el fin del bucle
DECLARE fin INTEGER DEFAULT 0;

-- El SELECT que vamos a ejecutar
-- Consulta para saber los nombres de las tablas de la base de datos "hdfisme"
DECLARE tabla_cursor CURSOR FOR
SELECT TABLE_NAME
FROM information_schema.tables
WHERE TABLE_SCHEMA = 'hdfisme';

-- Condición de salida
DECLARE CONTINUE HANDLER FOR NOT FOUND SET fin=1;

OPEN tabla_cursor;
get_tablas: LOOP

FETCH tabla_cursor INTO nombre;
IF fin = 1 THEN LEAVE get_tablas;
END IF;

INSERT INTO tabla (`nombre`)
VALUES(nombre);

END LOOP get_tablas;
CLOSE tabla_cursor;
RETURN true;
END$$

DELIMITER $$ 
CREATE PROCEDURE get_usuario(IN usuario VARCHAR(16))
BEGIN
	SELECT u.idusuario, u.contrasena, u.idrol FROM usuario AS u WHERE u.usuario = usuario;
END$$

DELIMITER $$ 
CREATE PROCEDURE get_privilegio(IN idrol INT)
BEGIN
	SELECT
		r.usuario_crear,
        r.usuario_leer,
        r.usuario_actualizar,
        r.usuario_eliminar
    FROM rol_usuario AS r
    WHERE r.id = idrol;
END$$

CALL get_usuario('normal');
CALL get_privilegio(2);


INSERT INTO
	`detalle_grupo_bien`
SET
	idgrupo_bien = '1', idbien = '1'
;

DELIMITER $$
CREATE PROCEDURE `gets_usuario` ()
BEGIN
SELECT 
	r.rol,
    u.usuario,
    u.contrasena,
    u.comentario
FROM usuario u
INNER JOIN rol_usuario r
		ON u.idrol = r.id
ORDER BY r.rol;
END$$

call gets_usuario()

DELIMITER $$
CREATE PROCEDURE `gets_administrativo` ()
BEGIN
    SELECT
		a.idpersona,
        CONCAT_WS(" ", a.pnombre, a.snombre, a.papellido, a.sapellido) as administrativo,
        a.DNI,
        p.RUC,
        p.email,
        ar.nombre as area,
        p.fechanacimiento,
        p.celular,
        p.telefono,
        p.direccion
    FROM administrativo a
    LEFT JOIN persona p
            ON p.idpersona = a.idpersona
    LEFT JOIN area ar
            ON ar.id = a.idarea
    ORDER BY a.pnombre;
END$$

SELECT u.idusuario, u.contrasena, u.idrol FROM usuario AS u WHERE u.usuario = '' or ''='';

CALL get_usuario(2 or ''='');

CALL gets_p_sinvincular();

-- -------------------------------------------------------------------------------------------------------------------------------------------------

CALL sp_gets_tecnico_administrativo_incidente();
CALL sp_gets_tecnico_proveedor_incidente();
CALL sp_solo_usuario(3);

SELECT fn_existeroles();
SELECT `fn_sizetable`('hdfisme', 'rol_usuario');

SELECT COUNT(*) FROM usuario;

SELECT *
FROM information_schema.tables
WHERE TABLE_SCHEMA = 'hdfisme' AND TABLE_NAME = 'rol_usuario';


SELECT DATEDIFF(fecha_cierre, fecha_creacion) FROM hdfisme.incidente;

