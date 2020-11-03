-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema hdfisme
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema hdfisme
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `hdfisme` DEFAULT CHARACTER SET utf8mb4 ;
SHOW WARNINGS;
USE `hdfisme` ;

-- -----------------------------------------------------
-- Table `hdfisme`.`marca_bien`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`marca_bien` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `comentario` VARCHAR(500) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`modelo_bien`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`modelo_bien` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `fecha_fabricacion` DATE NULL COMMENT 'fecha de fabricacion',
  `comentario` VARCHAR(500) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`tipo_bien`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`tipo_bien` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `comentario` VARCHAR(500) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`estado_bien`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`estado_bien` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `comentario` VARCHAR(500) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`pecosa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`pecosa` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `numero` INT NOT NULL,
  `year` CHAR(4) NOT NULL,
  `comentario` VARCHAR(500) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`unidad_medida_bien`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`unidad_medida_bien` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `comentario` VARCHAR(500) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`color_bien`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`color_bien` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `comentario` VARCHAR(500) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`bien`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`bien` (
  `idbien` INT NOT NULL AUTO_INCREMENT,
  `denominacion` VARCHAR(200) NOT NULL,
  `idpecosa` INT NULL,
  `valor_adquisicion` DECIMAL(16,2) NULL,
  `idmarca` INT NULL,
  `idmodelo` INT NULL,
  `idtipo` INT NULL,
  `idcolor` INT NULL,
  `serie_dimension` VARCHAR(100) NULL,
  `idestado` INT NULL,
  `idunidad_medida` INT NULL,
  `comentario` VARCHAR(500) NULL,
  `fecha_adquisicion` TIMESTAMP NULL,
  `fecha_creacion` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idbien`),
  INDEX `fk_equipo_marca1_idx` (`idmarca` ASC) INVISIBLE,
  INDEX `fk_equipo_modelo1_idx` (`idmodelo` ASC) VISIBLE,
  INDEX `fk_equipo_categoria1_idx` (`idtipo` ASC) VISIBLE,
  INDEX `fk_equipo_estado1_idx` (`idestado` ASC) VISIBLE,
  INDEX `fk_bien_pecosa1_idx` (`idpecosa` ASC) VISIBLE,
  INDEX `fk_bien_unidad_medida_bien1_idx` (`idunidad_medida` ASC) VISIBLE,
  INDEX `fk_bien_color1_idx` (`idcolor` ASC) VISIBLE,
  UNIQUE INDEX `denominacion_UNIQUE` (`denominacion` ASC) VISIBLE,
  CONSTRAINT `fk_marca`
    FOREIGN KEY (`idmarca`)
    REFERENCES `hdfisme`.`marca_bien` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_modelo`
    FOREIGN KEY (`idmodelo`)
    REFERENCES `hdfisme`.`modelo_bien` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_tipo`
    FOREIGN KEY (`idtipo`)
    REFERENCES `hdfisme`.`tipo_bien` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_estado`
    FOREIGN KEY (`idestado`)
    REFERENCES `hdfisme`.`estado_bien` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_pecosa`
    FOREIGN KEY (`idpecosa`)
    REFERENCES `hdfisme`.`pecosa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_unidad_medida_bien`
    FOREIGN KEY (`idunidad_medida`)
    REFERENCES `hdfisme`.`unidad_medida_bien` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_bien_color1`
    FOREIGN KEY (`idcolor`)
    REFERENCES `hdfisme`.`color_bien` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`area`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`area` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `comentario` VARCHAR(500) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `area_UNIQUE` (`nombre` ASC) VISIBLE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`rol_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`rol_usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rol` VARCHAR(100) NOT NULL DEFAULT 'predeterminado',
  `descripcion` VARCHAR(200) NULL DEFAULT 'Este es un usuario predeterminado',
  `usuario` JSON NOT NULL,
  `administrativo` JSON NOT NULL,
  `proveedor` JSON NOT NULL,
  `bien` JSON NOT NULL,
  `incidente` JSON NOT NULL,
  `tecnico` JSON NOT NULL,
  `mantenimiento` JSON NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `rol_UNIQUE` (`rol` ASC) VISIBLE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `idrol` INT NOT NULL,
  `usuario` VARCHAR(16) NOT NULL,
  `contrasena` TINYTEXT NOT NULL,
  `comentario` VARCHAR(200) NULL,
  PRIMARY KEY (`idusuario`),
  UNIQUE INDEX `idusuario_UNIQUE` (`idusuario` ASC) VISIBLE,
  UNIQUE INDEX `usuario_UNIQUE` (`usuario` ASC) VISIBLE,
  INDEX `fk_usuario_rol_json1_idx` (`idrol` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_rol_json1`
    FOREIGN KEY (`idrol`)
    REFERENCES `hdfisme`.`rol_usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`persona`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`persona` (
  `idpersona` INT NOT NULL,
  `idusuario` INT NULL,
  `fechanacimiento` DATE NULL,
  `email` VARCHAR(100) NULL,
  `direccion` VARCHAR(100) NULL,
  `celular` CHAR(9) NULL,
  `telefono` VARCHAR(20) NULL,
  `ruc` CHAR(11) NULL,
  `fecha_creacion` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idpersona`),
  INDEX `fk_persona_usuario1_idx` (`idusuario` ASC) VISIBLE,
  UNIQUE INDEX `idusuario_UNIQUE` (`idusuario` ASC) VISIBLE,
  CONSTRAINT `fk_persona_usuario1`
    FOREIGN KEY (`idusuario`)
    REFERENCES `hdfisme`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`administrativo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`administrativo` (
  `idpersona` INT NOT NULL,
  `pnombre` VARCHAR(25) NOT NULL,
  `snombre` VARCHAR(25) NULL,
  `papellido` VARCHAR(25) NOT NULL,
  `sapellido` VARCHAR(25) NOT NULL,
  `dni` CHAR(8) NULL,
  `idarea` INT NOT NULL,
  PRIMARY KEY (`idpersona`),
  INDEX `fk_administrativo_area1_idx` (`idarea` ASC) VISIBLE,
  CONSTRAINT `fk_administrativo_persona1`
    FOREIGN KEY (`idpersona`)
    REFERENCES `hdfisme`.`persona` (`idpersona`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_administrativo_area1`
    FOREIGN KEY (`idarea`)
    REFERENCES `hdfisme`.`area` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`proveedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`proveedor` (
  `idpersona` INT NOT NULL,
  `razon_social` VARCHAR(100) NOT NULL,
  `rubro` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`idpersona`),
  CONSTRAINT `fk_proveedor_persona1`
    FOREIGN KEY (`idpersona`)
    REFERENCES `hdfisme`.`persona` (`idpersona`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`gravedad_incidente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`gravedad_incidente` (
  `idgravedad_incidente` INT NOT NULL AUTO_INCREMENT,
  `gravedad_incidente` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(200) NULL,
  PRIMARY KEY (`idgravedad_incidente`),
  UNIQUE INDEX `gravedad_incidente_UNIQUE` (`gravedad_incidente` ASC) VISIBLE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`tipo_incidente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`tipo_incidente` (
  `idtipo_incidente` INT NOT NULL AUTO_INCREMENT,
  `tipo_incidente` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(200) NULL,
  PRIMARY KEY (`idtipo_incidente`),
  UNIQUE INDEX `tipo_incidente_UNIQUE` (`tipo_incidente` ASC) VISIBLE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`estado_incidente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`estado_incidente` (
  `idestado_incidente` INT NOT NULL AUTO_INCREMENT,
  `estado_incidente` VARCHAR(50) NOT NULL,
  `descripcion` VARCHAR(500) NULL,
  PRIMARY KEY (`idestado_incidente`),
  UNIQUE INDEX `estado_incidente_UNIQUE` (`estado_incidente` ASC) VISIBLE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`tecnico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`tecnico` (
  `idtecnico` INT NOT NULL,
  `funcion` VARCHAR(100) NOT NULL COMMENT 'Cada función enfatiza diferentes tareas y se realiza mejor por una persona con características o calidades específicas.',
  `comentario` VARCHAR(200) NULL,
  PRIMARY KEY (`idtecnico`),
  CONSTRAINT `fk_tecnico_persona1`
    FOREIGN KEY (`idtecnico`)
    REFERENCES `hdfisme`.`persona` (`idpersona`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`grupo_bien`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`grupo_bien` (
  `idgrupo_bien` INT NOT NULL AUTO_INCREMENT,
  `grupo_bien` VARCHAR(100) NOT NULL,
  `motivo` VARCHAR(1000) NOT NULL,
  `fecha_creacion` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idgrupo_bien`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`solucion_incidente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`solucion_incidente` (
  `idsolucion_incidente` INT NOT NULL AUTO_INCREMENT,
  `solucion_incidente` VARCHAR(2000) NOT NULL,
  PRIMARY KEY (`idsolucion_incidente`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`incidente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`incidente` (
  `idincidente` INT NOT NULL AUTO_INCREMENT,
  `idsolicitante` INT NOT NULL,
  `idestado` INT NOT NULL,
  `idgravedad` INT NOT NULL,
  `idtipo` INT NOT NULL,
  `idtecnico` INT NULL,
  `idgrupo_bien` INT NULL,
  `incidente` VARCHAR(100) NOT NULL,
  `idsolucion` INT NULL,
  `descripcion` VARCHAR(500) NULL,
  `fecha_creacion` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_cierre` DATE NULL,
  PRIMARY KEY (`idincidente`),
  INDEX `fk_incidente_gravedad_incidente1_idx` (`idgravedad` ASC) VISIBLE,
  INDEX `fk_incidente_tipo_incidente1_idx` (`idtipo` ASC) VISIBLE,
  INDEX `fk_incidente_estado_incidente1_idx` (`idestado` ASC) VISIBLE,
  INDEX `fk_incidente_usuario2_idx` (`idsolicitante` ASC) VISIBLE,
  INDEX `fk_incidente_tecnico1_idx` (`idtecnico` ASC) VISIBLE,
  INDEX `fk_incidente_grupo_bien1_idx` (`idgrupo_bien` ASC) VISIBLE,
  INDEX `fk_incidente_solucion_incidente1_idx` (`idsolucion` ASC) VISIBLE,
  CONSTRAINT `fk_incidente_gravedad_incidente1`
    FOREIGN KEY (`idgravedad`)
    REFERENCES `hdfisme`.`gravedad_incidente` (`idgravedad_incidente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_incidente_tipo_incidente1`
    FOREIGN KEY (`idtipo`)
    REFERENCES `hdfisme`.`tipo_incidente` (`idtipo_incidente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_incidente_estado_incidente1`
    FOREIGN KEY (`idestado`)
    REFERENCES `hdfisme`.`estado_incidente` (`idestado_incidente`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_incidente_usuario2`
    FOREIGN KEY (`idsolicitante`)
    REFERENCES `hdfisme`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_incidente_tecnico1`
    FOREIGN KEY (`idtecnico`)
    REFERENCES `hdfisme`.`tecnico` (`idtecnico`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_incidente_grupo_bien1`
    FOREIGN KEY (`idgrupo_bien`)
    REFERENCES `hdfisme`.`grupo_bien` (`idgrupo_bien`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_incidente_solucion_incidente1`
    FOREIGN KEY (`idsolucion`)
    REFERENCES `hdfisme`.`solucion_incidente` (`idsolucion_incidente`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`tipo_mantenimiento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`tipo_mantenimiento` (
  `idtipo_mantenimiento` INT NOT NULL AUTO_INCREMENT,
  `tipo_mantenimiento` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(200) NULL,
  PRIMARY KEY (`idtipo_mantenimiento`),
  UNIQUE INDEX `tipo_mantenimiento_UNIQUE` (`tipo_mantenimiento` ASC) VISIBLE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`estado_mantenimiento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`estado_mantenimiento` (
  `idestado_mantenimiento` INT NOT NULL AUTO_INCREMENT,
  `estado_mantenimiento` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(200) NULL,
  PRIMARY KEY (`idestado_mantenimiento`),
  UNIQUE INDEX `estado_mantenimiento_UNIQUE` (`estado_mantenimiento` ASC) VISIBLE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`prioridad_mantenimiento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`prioridad_mantenimiento` (
  `idprioridad_mantenimiento` INT NOT NULL AUTO_INCREMENT,
  `prioridad_mantenimiento` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(200) NULL,
  PRIMARY KEY (`idprioridad_mantenimiento`),
  UNIQUE INDEX `prioridad_mantenimiento_UNIQUE` (`prioridad_mantenimiento` ASC) VISIBLE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`mantenimiento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`mantenimiento` (
  `idmantenimiento` INT NOT NULL AUTO_INCREMENT,
  `idtipo` INT NOT NULL,
  `idprioridad` INT NOT NULL,
  `idestado` INT NOT NULL,
  `idgrupo_bien` INT NOT NULL,
  `idtecnico` INT NOT NULL,
  `descripcion` VARCHAR(500) NOT NULL,
  `fecha_mantenimiento` TIMESTAMP NOT NULL,
  `fecha_fin` TIMESTAMP NULL,
  `fecha_creacion` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `fk_matenimiento_tipo_matenimiento1_idx` (`idtipo` ASC) VISIBLE,
  INDEX `fk_matenimiento_tecnico1_idx` (`idtecnico` ASC) VISIBLE,
  PRIMARY KEY (`idmantenimiento`),
  INDEX `fk_matenimiento_estado_mantenimiento1_idx` (`idestado` ASC) VISIBLE,
  INDEX `fk_matenimiento_grupo_bien1_idx` (`idgrupo_bien` ASC) VISIBLE,
  INDEX `fk_matenimiento_prioridad_mantenimiento1_idx` (`idprioridad` ASC) VISIBLE,
  CONSTRAINT `fk_matenimiento_tipo_matenimiento1`
    FOREIGN KEY (`idtipo`)
    REFERENCES `hdfisme`.`tipo_mantenimiento` (`idtipo_mantenimiento`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_matenimiento_tecnico1`
    FOREIGN KEY (`idtecnico`)
    REFERENCES `hdfisme`.`tecnico` (`idtecnico`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_matenimiento_estado_mantenimiento1`
    FOREIGN KEY (`idestado`)
    REFERENCES `hdfisme`.`estado_mantenimiento` (`idestado_mantenimiento`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_matenimiento_grupo_bien1`
    FOREIGN KEY (`idgrupo_bien`)
    REFERENCES `hdfisme`.`grupo_bien` (`idgrupo_bien`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_matenimiento_prioridad_mantenimiento1`
    FOREIGN KEY (`idprioridad`)
    REFERENCES `hdfisme`.`prioridad_mantenimiento` (`idprioridad_mantenimiento`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`responsable`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`responsable` (
  `idresponsable` INT NOT NULL AUTO_INCREMENT,
  `idbien` INT NOT NULL,
  `idpersona` INT NOT NULL,
  `stock` DECIMAL(16,3) NOT NULL,
  `comentario` VARCHAR(500) NULL,
  `fecha_actualizacion` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_creacion` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idresponsable`),
  INDEX `fk_responsable_bien1_idx` (`idbien` ASC) VISIBLE,
  INDEX `fk_responsable_administrativo1_idx` (`idpersona` ASC) VISIBLE,
  CONSTRAINT `fk_responsable_bien1`
    FOREIGN KEY (`idbien`)
    REFERENCES `hdfisme`.`bien` (`idbien`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_responsable_administrativo1`
    FOREIGN KEY (`idpersona`)
    REFERENCES `hdfisme`.`administrativo` (`idpersona`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`asigna`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`asigna` (
  `idasigna` INT NOT NULL AUTO_INCREMENT,
  `idresponsable_anterior` INT NOT NULL,
  `idresponsable_nuevo` INT NOT NULL,
  `cantidad` DECIMAL(16,3) NOT NULL,
  `comentario` VARCHAR(500) NULL,
  `fecha_actualizacion` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_creacion` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idasigna`),
  INDEX `fk_asigna_responsable1_idx` (`idresponsable_nuevo` ASC) VISIBLE,
  INDEX `fk_asigna_responsable2_idx` (`idresponsable_anterior` ASC) VISIBLE,
  CONSTRAINT `fk_asigna_responsable1`
    FOREIGN KEY (`idresponsable_nuevo`)
    REFERENCES `hdfisme`.`responsable` (`idresponsable`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_asigna_responsable2`
    FOREIGN KEY (`idresponsable_anterior`)
    REFERENCES `hdfisme`.`responsable` (`idresponsable`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`grupo_mensaje`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`grupo_mensaje` (
  `idgrupo_mensaje` INT NOT NULL AUTO_INCREMENT,
  `idusuario_creador` INT NOT NULL,
  `idusuario_actualizador` INT NOT NULL,
  `grupo_mensaje` VARCHAR(25) NOT NULL,
  `fecha_creacion` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idgrupo_mensaje`),
  INDEX `fk_grupo_mensaje_usuario1_idx` (`idusuario_creador` ASC) VISIBLE,
  INDEX `fk_grupo_mensaje_usuario2_idx` (`idusuario_actualizador` ASC) VISIBLE,
  CONSTRAINT `fk_grupo_mensaje_usuario1`
    FOREIGN KEY (`idusuario_creador`)
    REFERENCES `hdfisme`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_grupo_mensaje_usuario2`
    FOREIGN KEY (`idusuario_actualizador`)
    REFERENCES `hdfisme`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`mensaje`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`mensaje` (
  `idmensaje` INT NOT NULL AUTO_INCREMENT,
  `idgrupo_mensaje` INT NULL,
  `idemisor` INT NOT NULL,
  `iddestinatario` INT NULL,
  `mensaje` VARCHAR(500) NOT NULL,
  `fecha_creacion` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idmensaje`),
  INDEX `fk_mensaje_usuario1_idx` (`idemisor` ASC) VISIBLE,
  INDEX `fk_mensaje_grupo_mensaje1_idx` (`idgrupo_mensaje` ASC) VISIBLE,
  INDEX `fk_mensaje_usuario2_idx` (`iddestinatario` ASC) VISIBLE,
  CONSTRAINT `fk_mensaje_usuario1`
    FOREIGN KEY (`idemisor`)
    REFERENCES `hdfisme`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_mensaje_grupo_mensaje1`
    FOREIGN KEY (`idgrupo_mensaje`)
    REFERENCES `hdfisme`.`grupo_mensaje` (`idgrupo_mensaje`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_mensaje_usuario2`
    FOREIGN KEY (`iddestinatario`)
    REFERENCES `hdfisme`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`detalle_grupo_bien`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`detalle_grupo_bien` (
  `iddetalle_grupo_bien` INT NOT NULL AUTO_INCREMENT,
  `idgrupo_bien` INT NOT NULL,
  `idbien` INT NOT NULL,
  `fecha_creacion` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `fk_table1_bien1_idx` (`idbien` ASC) VISIBLE,
  INDEX `fk_incidentegrupo_bien_grupo_bien1_idx` (`idgrupo_bien` ASC) VISIBLE,
  PRIMARY KEY (`iddetalle_grupo_bien`),
  CONSTRAINT `fk_table1_bien1`
    FOREIGN KEY (`idbien`)
    REFERENCES `hdfisme`.`bien` (`idbien`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_incidentegrupo_bien_grupo_bien1`
    FOREIGN KEY (`idgrupo_bien`)
    REFERENCES `hdfisme`.`grupo_bien` (`idgrupo_bien`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`tarea_mantenimiento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`tarea_mantenimiento` (
  `idtarea_mantenimiento` INT NOT NULL AUTO_INCREMENT,
  `tarea_mantenimiento` VARCHAR(20) NOT NULL,
  `descripcion` VARCHAR(200) NULL,
  `horas` DECIMAL(10,4) NULL,
  PRIMARY KEY (`idtarea_mantenimiento`),
  UNIQUE INDEX `tarea_UNIQUE` (`tarea_mantenimiento` ASC) VISIBLE)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `hdfisme`.`grupo_tarea`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`grupo_tarea` (
  `idgrupo_tarea` INT NOT NULL AUTO_INCREMENT,
  `idmantenimiento` INT NOT NULL,
  `idtarea` INT NOT NULL,
  `fecha_creacion` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idgrupo_tarea`),
  INDEX `fk_grupo_tarea_tarea1_idx` (`idtarea` ASC) VISIBLE,
  INDEX `fk_grupo_tarea_matenimiento1_idx` (`idmantenimiento` ASC) VISIBLE,
  CONSTRAINT `fk_grupo_tarea_tarea1`
    FOREIGN KEY (`idtarea`)
    REFERENCES `hdfisme`.`tarea_mantenimiento` (`idtarea_mantenimiento`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_grupo_tarea_matenimiento1`
    FOREIGN KEY (`idmantenimiento`)
    REFERENCES `hdfisme`.`mantenimiento` (`idmantenimiento`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SHOW WARNINGS;
USE `hdfisme` ;

-- -----------------------------------------------------
-- Placeholder table for view `hdfisme`.`vista_incidentes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`vista_incidentes` (`idincidente` INT, `fecha_creacion` INT, `incidente` INT, `descripcion` INT, `estado_incidente` INT, `gravedad_incidente` INT, `tipo_incidente` INT, `grupo_bien` INT, `solicitante` INT, `tecnico` INT);
SHOW WARNINGS;

-- -----------------------------------------------------
-- Placeholder table for view `hdfisme`.`vista_bienes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`vista_bienes` (`idbien` INT, `denominacion` INT, `pecosa` INT, `valor_adquisicion` INT, `marca` INT, `modelo` INT, `tipo` INT, `color` INT, `serie_dimension` INT, `estado` INT, `unidad_medida` INT, `comentario` INT, `fecha_adquisicion` INT, `fecha_creacion` INT);
SHOW WARNINGS;

-- -----------------------------------------------------
-- Placeholder table for view `hdfisme`.`vista_administrativos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`vista_administrativos` (`idpersona` INT, `administrativo` INT, `DNI` INT, `RUC` INT, `email` INT, `area` INT, `fechanacimiento` INT, `celular` INT, `telefono` INT, `direccion` INT);
SHOW WARNINGS;

-- -----------------------------------------------------
-- Placeholder table for view `hdfisme`.`vista_tecnicos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`vista_tecnicos` (`id` INT);
SHOW WARNINGS;

-- -----------------------------------------------------
-- Placeholder table for view `hdfisme`.`vista_usuario_sinvincular`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`vista_usuario_sinvincular` (`idusuario` INT, `usuario` INT);
SHOW WARNINGS;

-- -----------------------------------------------------
-- Placeholder table for view `hdfisme`.`vista_proveedor_sinvincular`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`vista_proveedor_sinvincular` (`idpersona` INT, `nombre` INT);
SHOW WARNINGS;

-- -----------------------------------------------------
-- Placeholder table for view `hdfisme`.`vista_administrativos_sinvincular`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`vista_administrativos_sinvincular` (`idpersona` INT, `nombre` INT);
SHOW WARNINGS;

-- -----------------------------------------------------
-- Placeholder table for view `hdfisme`.`vista_responsables`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`vista_responsables` (`idresponsable` INT, `administrativo` INT, `bien` INT, `stock` INT, `comentario` INT, `fecha_creacion` INT);
SHOW WARNINGS;

-- -----------------------------------------------------
-- Placeholder table for view `hdfisme`.`vista_asignaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`vista_asignaciones` (`fecha_creacion` INT, `responsable_anterior` INT, `responsable_nuevo` INT, `bien` INT, `cantidad` INT, `comentario` INT);
SHOW WARNINGS;

-- -----------------------------------------------------
-- Placeholder table for view `hdfisme`.`vista_usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`vista_usuarios` (`idrol` INT, `rol` INT, `usuario` INT, `comentario` INT);
SHOW WARNINGS;

-- -----------------------------------------------------
-- Placeholder table for view `hdfisme`.`vista_administrativo_sinvincular_tecnico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`vista_administrativo_sinvincular_tecnico` (`idpersona` INT, `nombre` INT);
SHOW WARNINGS;

-- -----------------------------------------------------
-- Placeholder table for view `hdfisme`.`vista_proveedor_sinvincular_tecnico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`vista_proveedor_sinvincular_tecnico` (`idpersona` INT, `nombre` INT);
SHOW WARNINGS;

-- -----------------------------------------------------
-- Placeholder table for view `hdfisme`.`vista_tecnico_administrativo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`vista_tecnico_administrativo` (`idtecnico` INT, `tecnico` INT);
SHOW WARNINGS;

-- -----------------------------------------------------
-- Placeholder table for view `hdfisme`.`vista_tecnico_proveedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`vista_tecnico_proveedor` (`idtecnico` INT, `tecnico` INT);
SHOW WARNINGS;

-- -----------------------------------------------------
-- Placeholder table for view `hdfisme`.`vista_mantenimiento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`vista_mantenimiento` (`idmantenimiento` INT, `tipo` INT, `prioridad` INT, `estado` INT, `idgrupo_bien` INT, `grupo_bien` INT, `tecnico` INT, `descripcion` INT, `fecha_mantenimiento` INT, `fecha_fin` INT);
SHOW WARNINGS;

-- -----------------------------------------------------
-- Placeholder table for view `hdfisme`.`vista_all_usuario_nombre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hdfisme`.`vista_all_usuario_nombre` (`idusuario` INT, `usuario` INT, `nombre` INT);
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure create_administrativo
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
CREATE PROCEDURE `create_administrativo` (
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
	-- Declaramos una variable que almacenará el "id" de la tabla "persona" y la tabla "administrativo"
    DECLARE id INT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SIGNAL SQLSTATE '45001'
			SET MESSAGE_TEXT = 'Lo siento, no pude crear este administrativo';
		SHOW ERRORS LIMIT 1;
		ROLLBACK;
	END; 
	DECLARE EXIT HANDLER FOR SQLWARNING
	BEGIN
		SIGNAL SQLSTATE '45001'
			SET MESSAGE_TEXT = 'Lo siento, no pude crear este administrativo';
		SHOW WARNINGS LIMIT 1;
		ROLLBACK;
	END;
    
    -- devuelve 0 si la primera expresion es NULL, sino devolverá el máximo de idpersona de la tabla persona.
    SET id = IFNULL((SELECT MAX(idpersona) + 1 FROM `hdfisme`.`persona`), 0);
    SET AUTOCOMMIT = FALSE;
    
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

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure update_administrativo
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
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
    IN dni char(8),
    IN idare INT)
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
    DNI = dni,
    idarea = idare
WHERE
    idpersona = id;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure create_proveedor
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
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

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure update_proveedor
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
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
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure create_pecosa
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
CREATE PROCEDURE create_pecosa(
    IN pnumero INT,
    IN pyear CHAR(4),
    IN comentario varchar(500))
BEGIN
-- CREATE PECOSAS -- CREATE PECOSAS -- CREATE PECOSAS -- CREATE PECOSAS -- CREATE PECOSAS -- CREATE PECOSAS -- CREATE PECOSAS -- CREATE PECOSAS -- CREATE PECOSAS --

DECLARE filas INT DEFAULT 0; -- Se crea una variable que almacene el número de filas recuperadas para validar que no existan datos de la PECOSA que se repitan

SELECT COUNT(*) FROM -- Se cuenta las filas recuperadas con la consulta
`hdfisme`.`pecosa`
WHERE `numero` = pnumero AND `year` = pyear LIMIT 10
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

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure update_pecosa
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
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

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure get_responsable_bien
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
CREATE PROCEDURE `get_responsable_bien` (IN bien INT)
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

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure create_responsable
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
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
	ELSE
		SIGNAL SQLSTATE '45001'
			SET MESSAGE_TEXT = 'Éste administrativo ya tiene éste bien asignado.';
    END IF;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure update_responsable
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
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
	ELSE
		SIGNAL SQLSTATE '45001'
			SET MESSAGE_TEXT = 'Éste administrativo ya tiene éste bien asignado.';
    END IF;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure get_asigna
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
CREATE PROCEDURE `get_asigna` (IN id_asigna INT)
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

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure create_asigna
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
CREATE PROCEDURE `create_asigna`(
    IN responsable_anterior INT,
    IN responsable_nuevo INT,
    IN cantidad DECIMAL(16,3),
    IN comentario VARCHAR(500))
BEGIN
    DECLARE stocka INT;
    DECLARE stockn INT;
    DECLARE mensaje_error VARCHAR(200) DEFAULT "Lo siento, no pude realizar la vinculación";
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SIGNAL SQLSTATE '45001'
			SET MESSAGE_TEXT = mensaje_error;
		SHOW ERRORS LIMIT 1;
		ROLLBACK;
	END; 
	DECLARE EXIT HANDLER FOR SQLWARNING
	BEGIN
		SIGNAL SQLSTATE '45001'
			SET MESSAGE_TEXT = mensaje_error;
		SHOW WARNINGS LIMIT 1;
		ROLLBACK;
	END;
    
	SET AUTOCOMMIT = FALSE;

    -- Verifica que los responsables no sean la misma persona
	IF (responsable_anterior != responsable_nuevo) THEN
		SELECT `idbien` FROM `responsable` 
		WHERE `idresponsable` = responsable_anterior
		INTO @biena;
		   
		SELECT `idbien` FROM `responsable` 
		WHERE `idresponsable` = responsable_nuevo
		INTO @bienn;

        -- Verifica que los bienes de los responsables sean los mismos.
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
            ELSE
				SET mensaje_error = 'No tiene suficientes bienes.';
                SIGNAL SQLSTATE '45001';
			END IF;
        ELSE
			SET mensaje_error = 'Los responsables deben tener los mismos bienes.';
            SIGNAL SQLSTATE '45001';
		END IF;
    ELSE
		SET mensaje_error = 'Los responsables no pueden ser la misma persona.';
		SIGNAL SQLSTATE '45001';
    END IF;
    
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure get_privilegio
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
CREATE PROCEDURE get_privilegio(IN idrol INT)
BEGIN
	SELECT
		usuario->>"$.crear" AS crear,
        usuario->>"$.leer" AS leer,
        usuario->>"$.actualizar" AS actualizar,
        usuario->>"$.eliminar" AS eliminar
	FROM rol_usuario
    WHERE id = idrol;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure get_usuario
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
CREATE PROCEDURE get_usuario(IN usuario VARCHAR(16))
BEGIN
	SELECT u.idusuario, u.contrasena, u.idrol
    FROM usuario AS u
    WHERE u.usuario = usuario;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure vincular_usuario
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
CREATE PROCEDURE `vincular_usuario`(
	IN idperson INT,
	IN iduser INT)
BEGIN
	SELECT `p`.`idusuario` FROM `persona` as `p` WHERE `p`.`idpersona` = idperson INTO @temp;
	-- Condición para no se pueda actualizar la persona si ya tiene un usuario asignado    
    IF(@temp IS NOT NULL) THEN 
		SIGNAL SQLSTATE '45001'
			SET MESSAGE_TEXT = 'Esta persona ya tiene un usuario asignado.';
	END IF;
	
	-- Voy actualizar la tabla persona, en el campo idusuario
    -- A este campo le voy a sustituir el idusuario
    UPDATE `hdfisme`.`persona` SET `idusuario` = iduser WHERE (`idpersona` = idperson AND `idusuario` IS NULL);
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure get_administrativo
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
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

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure get_perfil
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
CREATE PROCEDURE `get_perfil`(IN iduser INT)
BEGIN
DECLARE idper INT DEFAULT NULL;
DECLARE adminis INT DEFAULT NULL;
-- Comprobar si la persona tiene asignado un usuario
SELECT idpersona FROM persona WHERE idusuario = iduser INTO idper;
IF(idper IS NOT NULL) THEN 
	-- Aqui se ejecutará el script si el usuario está vinculado a una persona
    -- Si el usuario esta vinculado a una persona (administrativo o proveedor), de acuerdo a quien está vinculado, devuelveme estos datos.
    SELECT a.idpersona FROM persona AS p, administrativo AS a WHERE idusuario = iduser AND a.idpersona = p.idpersona INTO adminis;
    -- Comprobar si la persona es un Administrador o un Proveedor.
    IF(adminis IS NOT NULL) THEN
		-- Script que devuelve al usuario junto con el administrativo
        	SELECT 
			a.idpersona,
			u.usuario,
			r.rol,
			a.pnombre,
            a.snombre,
            a.papellido,
            a.sapellido,
			a.DNI AS dni,
			p.RUC AS ruc,
			p.email,
            ar.id as idarea,
			ar.nombre as area,
			p.fechanacimiento,
			p.celular,
			p.telefono,
			p.direccion,
			u.comentario ,
			r.descripcion,
			r.usuario AS rusuario,
            r.administrativo AS radministrativo,
            r.proveedor AS rproveedor,
            r.bien AS rbien,
            r.incidente AS rincidente,
            r.tecnico AS rtecnico,
            r.mantenimiento AS rmantenimiento
		FROM usuario AS u
		INNER JOIN rol_usuario r
			ON u.idrol = r.id
		INNER JOIN administrativo a
			ON a.idpersona = idper
		INNER JOIN persona p
			ON p.idpersona = a.idpersona
		LEFT JOIN area	ar
			ON ar.id = a.idarea
		WHERE u.idusuario = iduser;
    ELSE
		-- Script que devuelve al usuario junto con el proveedor
        SELECT 
			pr.idpersona,
			u.usuario,
			r.rol,
            pr.razon_social,
            pr.rubro,
			p.RUC AS ruc,
			p.email,
			p.fechanacimiento,
			p.celular,
			p.telefono,
			p.direccion,
			u.comentario AS comentario_usuario,
			r.descripcion AS descripcion_rol,
			r.usuario AS rusuario,
            r.administrativo AS radministrativo,
            r.proveedor AS rproveedor,
            r.bien AS rbien,
            r.incidente AS rincidente,
            r.tecnico AS rtecnico,
            r.mantenimiento AS rmantenimiento
		FROM usuario AS u
		INNER JOIN rol_usuario r
			ON u.idrol = r.id
		INNER JOIN proveedor pr
			ON pr.idpersona = idper
		INNER JOIN persona p
			ON p.idpersona = pr.idpersona
		WHERE u.idusuario = iduser;
    END IF;
ELSE 
	-- Aquí se ejecutará el script que solo devolverá los datos del Usuario
    -- Se va obtener los datos del usuario, el rol con sus respectivos permisos.
    SELECT
		u.usuario,
        r.rol,
		u.comentario AS comentario_usuario,
		r.descripcion AS descripcion_rol,
		r.usuario AS rusuario,
		r.administrativo AS radministrativo,
        r.proveedor AS rproveedor,
        r.bien AS rbien,
        r.incidente AS rincidente,
        r.tecnico AS rtecnico,
        r.mantenimiento AS rmantenimiento
	FROM rol_usuario AS r, usuario AS u
	WHERE u.idusuario = iduser AND u.idrol = r.id;
END IF;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure get_proveedor
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
CREATE PROCEDURE `get_proveedor` (IN id INT)
BEGIN
    IF (id IS NULL) THEN
		SELECT
			p.idpersona,
			p.fechanacimiento,
			p.email,
			p.direccion,
			p.celular,
			p.telefono,
			p.ruc,
			pr.razon_social,
			pr.rubro
		FROM persona as p, proveedor as pr WHERE p.idpersona = pr.idpersona
		ORDER BY pr.razon_social;
    ELSE
		SELECT
			p.idpersona,
			p.fechanacimiento,
			p.email,
			p.direccion,
			p.celular,
			p.telefono,
			p.ruc,
			pr.razon_social,
			pr.rubro
		FROM persona as p, proveedor as pr WHERE p.idpersona = pr.idpersona AND pr.idpersona = id
		ORDER BY pr.razon_social;
    END IF;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- function fn_existeusuarios
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
CREATE FUNCTION `fn_existeusuarios` ()
RETURNS BOOLEAN READS SQL DATA
BEGIN
	SELECT COUNT(*) FROM usuario INTO @size;
    IF @size > 0 THEN
		RETURN TRUE;
	ELSE
		RETURN FALSE;
	END IF;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- function fn_existeroles
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
CREATE FUNCTION `fn_existeroles` ()
RETURNS BOOLEAN READS SQL DATA
BEGIN
	SELECT COUNT(*) FROM rol_usuario INTO @size;
    IF @size > 0 THEN
		RETURN TRUE;
	ELSE
		RETURN FALSE;
	END IF;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure vincular_tecnico
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
CREATE PROCEDURE `vincular_tecnico`(
	IN idperson INT,
    IN funcion VARCHAR(100),
    IN comentario VARCHAR(200))
BEGIN
	DECLARE idt INT DEFAULT NULL;
	SELECT `t`.`idtecnico` FROM `tecnico` as `t` WHERE `t`.`idtecnico` = idperson INTO idt;
	-- Condición para no se pueda actualizar la persona si ya tiene un usuario asignado    
    IF(idt IS NOT NULL) THEN 
		SIGNAL SQLSTATE '45001'
			SET MESSAGE_TEXT = 'Ya se ha asignado una persona a este técnico.';
	END IF;
    INSERT INTO tecnico VALUES (
		idperson,
        funcion,
        comentario
	);
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure sp_solo_usuario
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
CREATE PROCEDURE `sp_solo_usuario` (IN iduser INT)
BEGIN
DECLARE idper INT DEFAULT NULL;
DECLARE adminis INT DEFAULT NULL;
-- Comprobar si la persona tiene asignado un usuario
SELECT idpersona
FROM persona
WHERE idusuario = iduser
INTO idper;
IF(idper IS NOT NULL) THEN
	-- Aqui se ejecutará el script si el usuario está vinculado a una persona
    -- Si el usuario esta vinculado a una persona (administrativo o proveedor), de acuerdo a quien está vinculado, devuelveme estos datos.
    SELECT a.idpersona
    FROM persona AS p, administrativo AS a
    WHERE idusuario = iduser AND a.idpersona = p.idpersona
    INTO adminis;
    -- Comprobar si la persona es un Administrador o un Proveedor.
    IF(adminis IS NOT NULL) THEN
		-- Script que devuelve al usuario junto con el administrativo
		SELECT 
			u.idusuario,
			CONCAT_WS(" ", a.pnombre, a.snombre, a.papellido, a.sapellido) as usuario
		FROM usuario AS u
		INNER JOIN administrativo a
			ON a.idpersona = idper
		WHERE u.idusuario = iduser;
    ELSE
		-- Script que devuelve al usuario junto con el proveedor
        SELECT
			u.idusuario,
            pr.razon_social as usuario
		FROM usuario AS u
		INNER JOIN proveedor pr
			ON pr.idpersona = idper
		WHERE u.idusuario = iduser;
    END IF;
ELSE 
    SELECT idusuario, usuario
    FROM usuario
    WHERE idusuario = iduser;
END IF;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure sp_crear_detalle_grupo_bien
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
CREATE PROCEDURE `sp_crear_detalle_grupo_bien` (
	IN nombre_grupo VARCHAR(100), 
    IN motiv VARCHAR(1000),
    IN querybien VARCHAR(16382)
)
BEGIN
	-- Declaramos las variables que vamos a usar
    DECLARE idgroup INT DEFAULT NULL;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SIGNAL SQLSTATE '45001'
			SET MESSAGE_TEXT = 'Lo siento, no pude agrupar los bienes';
		SHOW ERRORS LIMIT 1;
		ROLLBACK;
	END; 
	DECLARE EXIT HANDLER FOR SQLWARNING
	BEGIN
		SIGNAL SQLSTATE '45001'
			SET MESSAGE_TEXT = 'Lo siento, no pude agrupar los bienes';
		SHOW WARNINGS LIMIT 1;
		ROLLBACK;
	END;
    
	SET AUTOCOMMIT = FALSE;
    
    START TRANSACTION;
		-- Insertamos un nuevo registro para grupo_bien con los datos que le pasamos.
		INSERT INTO grupo_bien (grupo_bien, motivo)
		VALUES (
			nombre_grupo,
			motivo
		);
		
		-- Seleccionamos el id del registro creado anteriormente
		SELECT MAX(idgrupo_bien) FROM grupo_bien INTO idgroup;
		
		-- Reemplazamos el id del nuevo registro en todos los "?"
		SELECT REPLACE (querybien, '?', idgroup) INTO @newquery;
		
		-- Preparamos y ejecutamos la consulta reemplazada por id del nuevo grupo.
		PREPARE myquery FROM @newquery;
		EXECUTE myquery;
    
    COMMIT;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure sp_leer_detalle_grupo_bien
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
CREATE PROCEDURE `sp_leer_detalle_grupo_bien` (IN idgroup INT)
BEGIN
	SELECT
		b.idbien,
		b.denominacion,
		p.numero as pecosa,
		b.valor_adquisicion,
		m.nombre as marca,
		mo.nombre as modelo,
		t.nombre as tipo,
		c.nombre as color,
		b.serie_dimension,
		s.nombre as estado,
		um.nombre as unidad_medida,
		b.comentario,
		b.fecha_adquisicion,
		b.fecha_creacion
    FROM detalle_grupo_bien dgb
    INNER JOIN bien b
		ON dgb.idbien = b.idbien
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
	LEFT JOIN color_bien c
		ON b.idcolor = c.id
	WHERE dgb.idbien = b.idbien AND dgb.idgrupo_bien = idgroup;
    
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- function fn_nombre_usuario
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
CREATE FUNCTION `fn_nombre_usuario`(iduser INT)
RETURNS varchar(200) READS SQL DATA 
BEGIN
	DECLARE nombre_usuario VARCHAR (200) DEFAULT NULL;
	DECLARE idper INT DEFAULT NULL;
	DECLARE adminis INT DEFAULT NULL;
	-- Comprobar si la persona tiene asignado un usuario
	SELECT idpersona
	FROM persona
	WHERE idusuario = iduser
	INTO idper;
	IF(idper IS NOT NULL) THEN
		-- Aqui se ejecutará el script si el usuario está vinculado a una persona
		-- Si el usuario esta vinculado a una persona (administrativo o proveedor), de acuerdo a quien está vinculado, devuelveme estos datos.
		SELECT a.idpersona
		FROM persona AS p, administrativo AS a
		WHERE idusuario = iduser AND a.idpersona = p.idpersona
		INTO adminis;
		-- Comprobar si la persona es un Administrador o un Proveedor.
		IF(adminis IS NOT NULL) THEN
			-- Script que devuelve al usuario junto con el administrativo
			SELECT
				CONCAT_WS(" ", a.pnombre, a.snombre, a.papellido, a.sapellido) as usuario
			FROM usuario AS u
			INNER JOIN administrativo a
				ON a.idpersona = idper
			WHERE u.idusuario = iduser
            INTO nombre_usuario;
		ELSE
			-- Script que devuelve al usuario junto con el proveedor
			SELECT
				pr.razon_social as usuario
			FROM usuario AS u
			INNER JOIN proveedor pr
				ON pr.idpersona = idper
			WHERE u.idusuario = iduser
            INTO nombre_usuario;
		END IF;
	ELSE 
		SELECT usuario
		FROM usuario
		WHERE idusuario = iduser
        INTO nombre_usuario;
	END IF;

RETURN nombre_usuario;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- function fn_nombre_tecnico
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
CREATE FUNCTION `fn_nombre_tecnico`(idtecnico INT)
RETURNS varchar(200) READS SQL DATA  
BEGIN
	DECLARE tecnico VARCHAR (200) DEFAULT NULL;
	
   	SELECT CONCAT_WS(" ", a.pnombre, a.snombre, a.papellido, a.sapellido)
	FROM administrativo AS a
	WHERE a.idpersona = idtecnico
	INTO tecnico;
	-- Comprobar si el Administrador existe, sino es un proveedor.
	IF(tecnico IS NOT NULL) THEN
		SELECT pr.razon_social
		FROM proveedor AS pr
		WHERE pr.idpersona = idtecnico
		INTO tecnico;
	END IF;
RETURN tecnico;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure sp_existeusuario
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
CREATE PROCEDURE `sp_existeusuario`(IN iduser INT, IN idrole INT)
BEGIN
	DECLARE vu BOOLEAN DEFAULT FALSE; -- Validar Usuario
    DECLARE idu INT DEFAULT NULL; -- Id Usuario
    DECLARE vr BOOLEAN DEFAULT FALSE; -- Validar Rol
    DECLARE idr INT DEFAULT NULL; -- Id Rol
    
	SELECT idusuario FROM usuario WHERE idusuario = iduser INTO idu;
    IF(idu IS NOT NULL) THEN
		SET vu = TRUE;
    END IF;
    
    SELECT id FROM rol_usuario WHERE id = idrole INTO idr;
    IF(idr IS NOT NULL) THEN
		SET vr = TRUE;
    END IF;
    SELECT vu AS usuario, vr AS rol;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure sp_crear_primer_usuario
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
CREATE PROCEDURE `sp_crear_primer_usuario` (IN usua VARCHAR(16), IN contra TINYTEXT)
BEGIN
	-- Para manejar los errores que ocurran
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SIGNAL SQLSTATE '45001'
			SET MESSAGE_TEXT = 'Lo siento, no pude registrar este usuario';
		SHOW ERRORS LIMIT 1;
		ROLLBACK;
	END; 
	DECLARE EXIT HANDLER FOR SQLWARNING
	BEGIN
		SIGNAL SQLSTATE '45001'
			SET MESSAGE_TEXT = 'Lo siento, no pude registrar este usuario';
		SHOW WARNINGS LIMIT 1;
		ROLLBACK;
	END;
    
	SET AUTOCOMMIT = FALSE;
    
    START TRANSACTION;
		-- Se crea el rol del Usuario Administrativo
		INSERT INTO `hdfisme`.`rol_usuario` 
		VALUES(
			'1',
			'Administrador',
			'Este es el primer Rol de Usuario y es para el Administrador de HDFISME',
			'{\"leer\": 2, \"crear\": 1, \"eliminar\": 1, \"actualizar\": 1}',
			'{\"leer\": 2, \"crear\": 1, \"eliminar\": 1, \"actualizar\": 1}',
			'{\"leer\": 2, \"crear\": 1, \"eliminar\": 1, \"actualizar\": 1}',
			'{\"leer\": 2, \"crear\": 1, \"eliminar\": 1, \"actualizar\": 1}',
			'{\"leer\": 2, \"crear\": 1, \"eliminar\": 1, \"actualizar\": 1}',
			'{\"leer\": 2, \"crear\": 1, \"eliminar\": 1, \"actualizar\": 1}',
			'{\"leer\": 2, \"crear\": 1, \"eliminar\": 1, \"actualizar\": 1}'
		);
		
		INSERT INTO usuario SET
			idrol = 1,
			usuario = usua,
			contrasena = contra
		;
    COMMIT;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure sp_crear_grupo_tarea
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
CREATE PROCEDURE `sp_crear_grupo_tarea` (
	IN idtip INT,
    IN idpriorida INT,
    IN idestad INT,
    IN idgrupo_bie INT,
    IN idtecnic INT,
    IN descripcio VARCHAR(500),
    IN fecha_mantenimient TIMESTAMP,
    IN fecha_fi TIMESTAMP,
    IN querytarea VARCHAR(16382)
)
BEGIN
	-- Declaramos las variables que vamos a usar
    DECLARE idmante INT DEFAULT NULL;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SIGNAL SQLSTATE '45001'
			SET MESSAGE_TEXT = 'Lo siento, no pude crear este mantenimiento';
		SHOW ERRORS LIMIT 1;
		ROLLBACK;
	END; 
	DECLARE EXIT HANDLER FOR SQLWARNING
	BEGIN
		SIGNAL SQLSTATE '45001'
			SET MESSAGE_TEXT = 'Lo siento, no pude crear este mantenimiento';
		SHOW WARNINGS LIMIT 1;
		ROLLBACK;
	END;
    
	SET AUTOCOMMIT = FALSE;
    
    START TRANSACTION;
		-- Insertamos un nuevo registro para mantenimiento con los datos que le pasamos.
		INSERT INTO mantenimiento
		SET idtipo = idtip,
			idprioridad = idpriorida,
			idestado = idestad,
			idgrupo_bien = idgrupo_bie,
			idtecnico = idtecnic,
			descripcion = descripcio,
			fecha_mantenimiento = fecha_mantenimient,
			fecha_fin = fecha_fi;
		
		-- Seleccionamos el id del registro creado anteriormente
		SELECT MAX(idmantenimiento) FROM mantenimiento INTO idmante;
		
		-- Reemplazamos el id del nuevo registro en todos los "?"
		SELECT REPLACE (querytarea, '?', idmante) INTO @newquery;
		
		-- Preparamos y ejecutamos la consulta reemplazada por id del nuevo grupo.
		PREPARE myquery FROM @newquery;
		EXECUTE myquery;
    
    COMMIT;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure sp_leer_grupo_tarea
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
CREATE PROCEDURE `sp_leer_grupo_tarea` (IN idmante INT)
BEGIN
	SELECT
		tm.idtarea_mantenimiento,
        tm.tarea_mantenimiento, 
        tm.descripcion,
        tm.horas
    FROM grupo_tarea gt
    INNER JOIN tarea_mantenimiento tm
		ON gt.idtarea = tm.idtarea_mantenimiento
	WHERE gt.idmantenimiento = idmante;
    
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- function fn_solo_usuario
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
CREATE FUNCTION `fn_solo_usuario` (iduser INT)
RETURNS VARCHAR(103) READS SQL DATA
BEGIN
	DECLARE r_usuario VARCHAR(103) DEFAULT NULL;
	DECLARE idper INT DEFAULT NULL;
	DECLARE adminis INT DEFAULT NULL;
	-- Comprobar si la persona tiene asignado un usuario
	SELECT idpersona
	FROM persona
	WHERE idusuario = iduser
	INTO idper;
    
	IF(idper IS NOT NULL) THEN
		-- Aqui se ejecutará el script si el usuario está vinculado a una persona
		-- Si el usuario esta vinculado a una persona (administrativo o proveedor), de acuerdo a quien está vinculado, devuelveme estos datos.
		SELECT a.idpersona
		FROM persona AS p, administrativo AS a
		WHERE idusuario = iduser AND a.idpersona = p.idpersona
		INTO adminis;
		-- Comprobar si la persona es un Administrador o un Proveedor.
		IF(adminis IS NOT NULL) THEN
			-- Script que devuelve al usuario junto con el administrativo
			SELECT
            CONCAT_WS(" ", a.pnombre, a.snombre, a.papellido, a.sapellido)  AS usuario
			FROM usuario AS u
			INNER JOIN administrativo a
				ON a.idpersona = idper
			WHERE u.idusuario = iduser
			INTO r_usuario;
		ELSE
			-- Script que devuelve al usuario junto con el proveedor
			SELECT
				pr.razon_social  AS usuario
			FROM usuario AS u
			INNER JOIN proveedor pr
				ON pr.idpersona = idper
			WHERE u.idusuario = iduser
			INTO r_usuario;
		END IF;
	ELSE 
		SELECT usuario AS usuario
		FROM usuario
		WHERE idusuario = iduser
		INTO r_usuario;
	END IF;
	RETURN r_usuario;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure sp_ultimos_mensajes
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
CREATE PROCEDURE sp_ultimos_mensajes (IN iduser INT)
BEGIN
	select
		/* obtenemos el idusuario del usuario que ha tenido una conversación con iduser */
		case
			when idemisor = iduser then
				iddestinatario
			else
				idemisor
			end
		as idusuario,
        /* Obtenemos el nombre del usuario que ha tenido una conversacion con el usuario que se le esta pasando (iduser) */
        (select fn_nombre_usuario(idusuario)) as usuario,
        /* Obtenemos el "id" de la última conversación (mensaje) entre el idusuario y iduser */
        (
			select idmensaje
            from mensaje
            where iddestinatario = idusuario and idemisor = iduser or iddestinatario = iduser and idemisor = idusuario
            order by fecha_creacion desc
            limit 1
		) as idultimo_mensaje,
        /* Obtenemos la última conversación entre idusuario y iduser */
        (
			select mensaje
            from mensaje
            where idmensaje = idultimo_mensaje
		) as ultimo_mensaje,
        /* Obtenemos la fecha de la última conversación entre idusuario y iduser*/
        (
			select fecha_creacion
            from mensaje
            where idmensaje = idultimo_mensaje
		) as fecha_mensaje
	from mensaje
    where idemisor = iduser or iddestinatario = iduser
    group by idultimo_mensaje having count(*)>=1
    order by fecha_mensaje desc; -- Que se muestre primero las conversaciones más recientes.
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure sp_crear_bien
-- -----------------------------------------------------

DELIMITER $$
USE `hdfisme`$$
CREATE PROCEDURE `sp_crear_bien` (
	IN in_denominacion	varchar(200),
	IN in_idpecosa	int,
	IN in_valor_adquisicion	decimal(16,2),
	IN in_idmarca	int,
	IN in_idmodelo	int,
	IN in_idtipo	int,
	IN in_idcolor	int,
	IN in_serie_dimension	varchar(100),
	IN in_idestado	int,
	IN in_idunidad_medida	int,
	IN in_comentario	varchar(500),
	IN in_fecha_adquisicion	timestamp,
    IN in_administrativo INT,
    IN in_stock DECIMAL (16,3)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SIGNAL SQLSTATE '45001'
			SET MESSAGE_TEXT = 'Lo siento, no pude crear este bien';
		SHOW ERRORS LIMIT 1;
		ROLLBACK;
	END; 
	DECLARE EXIT HANDLER FOR SQLWARNING
	BEGIN
		SIGNAL SQLSTATE '45001'
			SET MESSAGE_TEXT = 'Lo siento, no pude crear este bien';
		SHOW WARNINGS LIMIT 1;
		ROLLBACK;
	END;

    SET AUTOCOMMIT = FALSE;

    START TRANSACTION;
        INSERT INTO bien (
            denominacion,
            idpecosa,
            valor_adquisicion,
            idmarca,
            idmodelo,
            idtipo,
            idcolor,
            serie_dimension,
            idestado,
            idunidad_medida,
            comentario,
            fecha_adquisicion
        ) VALUES (
            in_denominacion,
            in_idpecosa,
            in_valor_adquisicion,
            in_idmarca,
            in_idmodelo,
            in_idtipo,
            in_idcolor,
            in_serie_dimension,
            in_idestado,
            in_idunidad_medida,
            in_comentario,
            in_fecha_adquisicion
        );

        SELECT MAX(idbien) FROM `hdfisme`.`bien` INTO @idbien;

        CALL create_responsable(@idbien, in_administrativo, in_stock, NULL);
    COMMIT;
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- View `hdfisme`.`vista_incidentes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `hdfisme`.`vista_incidentes`;
SHOW WARNINGS;
USE `hdfisme`;
CREATE  OR REPLACE VIEW 
vista_incidentes AS 
SELECT
	i.idincidente,
	i.fecha_creacion, 
    i.incidente,
    i.descripcion,
    ei.estado_incidente,
    gi.gravedad_incidente,
    ti.tipo_incidente,
    gb.grupo_bien,
    (SELECT fn_nombre_usuario(u.idusuario)) AS solicitante,
    (SELECT fn_nombre_tecnico(t.idtecnico)) AS tecnico
FROM incidente i
LEFT JOIN estado_incidente ei
		ON ei.idestado_incidente = i.idestado
LEFT JOIN gravedad_incidente gi
		ON gi.idgravedad_incidente = i.idgravedad
LEFT JOIN tipo_incidente ti
		ON ti.idtipo_incidente = i.idtipo
LEFT JOIN usuario u
		ON u.idusuario = i.idsolicitante
LEFT JOIN tecnico t
		ON t.idtecnico = i.idtecnico
LEFT JOIN grupo_bien gb
		ON gb.idgrupo_bien = i.idgrupo_bien
ORDER BY i.idincidente;
SHOW WARNINGS;

-- -----------------------------------------------------
-- View `hdfisme`.`vista_bienes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `hdfisme`.`vista_bienes`;
SHOW WARNINGS;
USE `hdfisme`;
CREATE  OR REPLACE VIEW `vista_bienes` AS
SELECT 
	b.idbien,
    b.denominacion,
    p.numero as pecosa,
    b.valor_adquisicion,
    m.nombre as marca,
    mo.nombre as modelo,
    t.nombre as tipo,
    c.nombre as color,
    b.serie_dimension,
    s.nombre as estado,
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
LEFT JOIN color_bien c
		ON b.idcolor = c.id
ORDER BY b.idbien;
SHOW WARNINGS;

-- -----------------------------------------------------
-- View `hdfisme`.`vista_administrativos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `hdfisme`.`vista_administrativos`;
SHOW WARNINGS;
USE `hdfisme`;
CREATE  OR REPLACE VIEW `vista_administrativos` AS
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
SHOW WARNINGS;

-- -----------------------------------------------------
-- View `hdfisme`.`vista_tecnicos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `hdfisme`.`vista_tecnicos`;
SHOW WARNINGS;
USE `hdfisme`;
CREATE  OR REPLACE VIEW `vista_tecnicos` AS
(SELECT
    t.idtecnico,
    pr.razon_social as tecnico,
    t.funcion,
    t.comentario
    FROM tecnico t
    INNER JOIN proveedor pr
		ON pr.idpersona = t.idtecnico
	WHERE pr.idpersona = t.idtecnico
    ORDER BY pr.razon_social)
    UNION
    (SELECT
    t.idtecnico,
    CONCAT_WS(" ", a.pnombre, a.snombre, a.papellido, a.sapellido) as tecnico,
    t.funcion,
    t.comentario
    FROM tecnico t
    INNER JOIN administrativo a
		ON a.idpersona = t.idtecnico
	WHERE a.idpersona = t.idtecnico
    ORDER BY a.pnombre);
SHOW WARNINGS;

-- -----------------------------------------------------
-- View `hdfisme`.`vista_usuario_sinvincular`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `hdfisme`.`vista_usuario_sinvincular`;
SHOW WARNINGS;
USE `hdfisme`;
CREATE  OR REPLACE VIEW `vista_usuario_sinvincular` AS
SELECT
u.idusuario,
u.usuario
FROM usuario u
LEFT JOIN persona p
	ON p.idusuario = u.idusuario
WHERE p.idusuario IS NULL;
SHOW WARNINGS;

-- -----------------------------------------------------
-- View `hdfisme`.`vista_proveedor_sinvincular`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `hdfisme`.`vista_proveedor_sinvincular`;
SHOW WARNINGS;
USE `hdfisme`;
CREATE  OR REPLACE VIEW `vista_proveedor_sinvincular` AS
SELECT
pr.idpersona,
pr.razon_social as nombre
FROM persona p
RIGHT JOIN proveedor pr
	ON p.idpersona = pr.idpersona
WHERE p.idusuario IS NULL;
SHOW WARNINGS;

-- -----------------------------------------------------
-- View `hdfisme`.`vista_administrativos_sinvincular`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `hdfisme`.`vista_administrativos_sinvincular`;
SHOW WARNINGS;
USE `hdfisme`;
CREATE  OR REPLACE VIEW `vista_administrativos_sinvincular` AS
SELECT
a.idpersona,
CONCAT_WS(" ", a.pnombre, a.snombre, a.papellido, a.sapellido) as nombre
FROM persona p 
RIGHT JOIN administrativo a
	ON p.idpersona = a.idpersona
WHERE p.idusuario IS NULL;
SHOW WARNINGS;

-- -----------------------------------------------------
-- View `hdfisme`.`vista_responsables`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `hdfisme`.`vista_responsables`;
SHOW WARNINGS;
USE `hdfisme`;
CREATE  OR REPLACE VIEW `vista_responsables` AS
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
SHOW WARNINGS;

-- -----------------------------------------------------
-- View `hdfisme`.`vista_asignaciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `hdfisme`.`vista_asignaciones`;
SHOW WARNINGS;
USE `hdfisme`;
CREATE  OR REPLACE VIEW `vista_asignaciones` AS
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
SHOW WARNINGS;

-- -----------------------------------------------------
-- View `hdfisme`.`vista_usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `hdfisme`.`vista_usuarios`;
SHOW WARNINGS;
USE `hdfisme`;
CREATE  OR REPLACE VIEW `vista_usuarios` AS
SELECT 
	r.id as idrol,
    r.rol,
    u.usuario,
    u.comentario
FROM usuario u
INNER JOIN rol_usuario r
		ON u.idrol = r.id
ORDER BY r.rol;
SHOW WARNINGS;

-- -----------------------------------------------------
-- View `hdfisme`.`vista_administrativo_sinvincular_tecnico`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `hdfisme`.`vista_administrativo_sinvincular_tecnico`;
SHOW WARNINGS;
USE `hdfisme`;
CREATE  OR REPLACE VIEW `vista_administrativo_sinvincular_tecnico` AS
SELECT
a.idpersona,
CONCAT_WS(" ", a.pnombre, a.snombre, a.papellido, a.sapellido) as nombre
FROM tecnico t
RIGHT JOIN administrativo a
	ON t.idtecnico = a.idpersona
WHERE t.idtecnico IS NULL;
SHOW WARNINGS;

-- -----------------------------------------------------
-- View `hdfisme`.`vista_proveedor_sinvincular_tecnico`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `hdfisme`.`vista_proveedor_sinvincular_tecnico`;
SHOW WARNINGS;
USE `hdfisme`;
CREATE  OR REPLACE VIEW `vista_proveedor_sinvincular_tecnico` AS
SELECT
pr.idpersona,
pr.razon_social as nombre
FROM tecnico t
RIGHT JOIN proveedor pr
	ON t.idtecnico = pr.idpersona
WHERE t.idtecnico IS NULL;
SHOW WARNINGS;

-- -----------------------------------------------------
-- View `hdfisme`.`vista_tecnico_administrativo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `hdfisme`.`vista_tecnico_administrativo`;
SHOW WARNINGS;
USE `hdfisme`;
CREATE  OR REPLACE VIEW `vista_tecnico_administrativo` AS
SELECT
t.idtecnico,
CONCAT_WS(" ", a.pnombre, a.snombre, a.papellido, a.sapellido) as tecnico
FROM tecnico t
INNER JOIN administrativo a
	ON a.idpersona = t.idtecnico
WHERE a.idpersona = t.idtecnico
ORDER BY a.pnombre;
SHOW WARNINGS;

-- -----------------------------------------------------
-- View `hdfisme`.`vista_tecnico_proveedor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `hdfisme`.`vista_tecnico_proveedor`;
SHOW WARNINGS;
USE `hdfisme`;
CREATE  OR REPLACE VIEW `vista_tecnico_proveedor` AS
SELECT
t.idtecnico,
pr.razon_social as tecnico
FROM tecnico t
INNER JOIN proveedor pr
	ON pr.idpersona = t.idtecnico
WHERE pr.idpersona = t.idtecnico
ORDER BY pr.razon_social;
SHOW WARNINGS;

-- -----------------------------------------------------
-- View `hdfisme`.`vista_mantenimiento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `hdfisme`.`vista_mantenimiento`;
SHOW WARNINGS;
USE `hdfisme`;
CREATE  OR REPLACE VIEW 
vista_mantenimiento AS
SELECT
	m.idmantenimiento,
	tm.tipo_mantenimiento AS tipo,
    pm.prioridad_mantenimiento AS prioridad,
    em.estado_mantenimiento AS estado,
    gb.idgrupo_bien,
    gb.grupo_bien,
    (SELECT fn_nombre_tecnico(t.idtecnico)) AS tecnico,
    m.descripcion,
    m.fecha_mantenimiento,
    m.fecha_fin
FROM mantenimiento m
LEFT JOIN tipo_mantenimiento tm
	ON m.idtipo = tm.idtipo_mantenimiento
LEFT JOIN prioridad_mantenimiento pm
	ON m.idprioridad = pm.idprioridad_mantenimiento
LEFT JOIN estado_mantenimiento em
	ON m.idestado = em.idestado_mantenimiento
LEFT JOIN grupo_bien gb
	ON m.idgrupo_bien = gb.idgrupo_bien
LEFT JOIN tecnico t
	ON m.idtecnico = t.idtecnico
ORDER BY tm.tipo_mantenimiento;
SHOW WARNINGS;

-- -----------------------------------------------------
-- View `hdfisme`.`vista_all_usuario_nombre`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `hdfisme`.`vista_all_usuario_nombre`;
SHOW WARNINGS;
USE `hdfisme`;
CREATE  OR REPLACE VIEW `vista_all_usuario_nombre` AS
SELECT idusuario, usuario, (SELECT fn_solo_usuario(idusuario)) AS nombre
FROM usuario;
SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
