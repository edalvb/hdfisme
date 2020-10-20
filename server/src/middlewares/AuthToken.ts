import { Response, NextFunction } from "express";

import pool from "../utils/database";

const jwt = require('jsonwebtoken');

/**
 * Funcion que se va a encargar de validar los datos
 * Esta funcion tiene solo una tarea:
 * verifica en cada ruta, el token
 * Si existen el token, pues continua con el proceso tipico de la ruta.
 * Si no existe el token, envia un error, va a decir que no esta autorizado al usuario a solicitar esos datos.
 * 
 * Para que este token pueda verificar, vamos a pasarlo dentro de cada ruta, va ser una ruta en sí.
 * 
 * @next indica que puede pasar a la siguiente función, va ser utilizado desde el enrutador de express.
 */
export async function verifyToken(req: any, res: Response, next: NextFunction) {

    if ((req.path == '/api/acceso') || (req.path == '/api/registro')) return next();

    // Comprueba si en req, no existe una cabecera authorization (ahí guarda el token que tiene que generar antes), pues no puede continuar.
    if (!req.headers.authorization) return res.status(401).send({ mensaje: 'No estás autorizado.' });

    // Antes del token se escribe la palabra Bearer, se utiliza un estándar en nuestro token.
    // Esto lo que hace es almacenar un la variable token el token que se nos ha devuelto.
    const token = req.headers.authorization.split(' ')[1];

    // Se comprueba que el token no esté vacío.
    if (token === 'null') return res.status(401).send({ mensaje: 'Token vacío, no estás autorizado.' });

    let rol: number = -1;
    // Se comprueba que el token sea válido.
    jwt.verify(token, 'secret', async function (error: any, decoded: any) {
        // Si hay un error el token será inválido
        if (error) return res.status(401).send({ mensaje: 'El token es inválido.' });

        const eusuario = (await pool.query('CALL sp_existeusuario(?, ?);', [decoded._id, decoded.rol]))[0][0];

        if(eusuario.usuario == false) return res.status(401).send({ mensaje: 'El Usuario no existe' });
        if(eusuario.rol == false) return res.status(401).send({ mensaje: 'El Rol no existe' });
        
        rol = decoded.rol;
        // Se agrega al Request el id para que pueda ser evaluado
        // _id podría tener otro nombre
        req._id = decoded._id;

        console.log(`Ruta: ${req.path}`);
        /** Se deja realizar acciones a los usuario logeados */
        if (req.path.includes('/api/perfil') || 
        req.path.includes('/api/mensaje')) return next();

        let table: String = tabla(req.path);
        let action: string = accion(req.method);

        if (table == '' || action == '') return res.status(404).send({ mensaje: 'Ruta desconocida' });

        // desde
        // Obtiene el campo (permiso) de la tabla rol_usuario. que se desea consultar.
        // Por ejemplo; usuario->>"$.leer" as leer
        let campo: string = table + '->>"$.' + action + '" AS ' + action;
        
        // Se concatena los datos necesarios para realizar la consulta a la base datos.
        let query: string = 'SELECT ' + campo + ' FROM rol_usuario WHERE id = ' + rol;
        
        // Consultamos a las base datos y almacenamos en una variable.
        const permiso = (await pool.query(query))[0];
        
        // permiso[campo] es el dato que deseamos, puede ser (0, 1, 2, ...), 
        console.log(`Usuario: ${decoded._id} con el rol: ${decoded.rol}, desde ${req._remoteAddress} puede ${action} ${table}: ${permiso[action]}`);
        
        // Las acciones de leer pueden tener 3 estados (0 = No Permiso, 1 = Solo Uno y 2 = Todos)
        // del Request para que sea evaluado en los Controllers
        if (action == 'leer' && permiso[action] == 2) {

            // Como todas las funciones tiene un parámentro request (req),
            // creamos una propiedad pleer y le pasamos el valor de 2.
            // Se asigna al Request.pleer que significa que en los Routes se evaluará si puede leer a todos los datos de la tabla.
            // pleer (Permiso para LEER)

            req.pleer = 2;

            // una vez lo guarde lo que hace es simplemente continuar.
            return next();
        } else if (permiso[action] == 1) return next();

        return res.status(404).send({ mensaje: `No estas autorizado para ${action} ${table}`});
 
    });
}

/**
 * En las rutas para la api se definen también los nombres de las tablas, 
 * por eso se busca en las rutas los nombres de las tablas y se devuele
 * el nombre de la tabla que contenga la ruta.
 * Sino encuentra ninguna tabla por defecto devuelve un string vacío ''.
 * @param path Ruta que se obtiene del Request. path
 */
function tabla(path: any): string {
    if (path.includes('usuario'))
        return 'usuario';
    else if (path.includes('bien'))
        return 'bien'
    else if (path.includes('administrativo') || path.includes('responsable') || path.includes('asigna') || path.includes('persona'))
        return 'administrativo'
    else if (path.includes('proveedor') || path.includes('persona'))
        return 'proveedor'
    else if (path.includes('incidente'))
        return 'incidente'
    else if (path.includes('tecnico'))
        return 'tecnico'
    else if (path.includes('mantenimiento'))
        return 'mantenimiento'
    return '';
}

/**
 * De acuerdo al método HTTP que se especifique se realizarán distintas
 * acciones en la base de datos (POST = crear), (GET = leer), (PUT = actualizar) y
 * (DELETE = eliminar), devuelve las acciones,  (crea, leer, actualizar o eliminar)
 * esto puede servir también para concatenar con el método tabla y asi unido con un 
 * subguion "_" se podría obtener el campo de la tabla "rol_usuario" para obtener que permiso
 * tiene el usuario.
 * @param metodo Método HTTP, se encuentra en el Request.method
 */
function accion(metodo: any): string {
    if (metodo.includes('POST'))
        return 'crear';
    else if (metodo.includes('GET'))
        return 'leer';
    else if (metodo.includes('PUT'))
        return 'actualizar';
    else if (metodo.includes('DELETE'))
        return 'eliminar';
    return '';
}