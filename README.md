# HDFISME
 
 Es un Sistema Help Desk para la Facultad de Igeniería de Sistemas y Mecánica Eléctrica (FISME) desarrollado con MySQL, Angular y Node.js

## Requisitos para ejecutar HDFISME
1. Tener instalado [Node.js](https://nodejs.org/es/):
2. Tener instalado [Angular CLI](https://cli.angular.io/):
   - Ejecuta el siguiente comando: ``` npm install -g @angular/cli ```
3. Tener instalado [MySQL](https://dev.mysql.com/downloads/mysql/):

## Ejecutando HDFISME
#### Instale las dependencias de Node.js y Angular
1. Instale las dependencias de Node.js
   - Dentro de la carpeta **server**, ejecute el siguiente comando: ``` npm install ```
2. Instale las dependencias Angular
   - Dentro de la carpeta **client**, ejecute el siguiente comando: ``` npm install ```

#### Cree y configure la base de datos
1. Ejecute el archivo ***[hdfisme.sql](https://github.com/edalvb/hdfisme/blob/master/db/hdfisme.sql "hdfisme.sql")***, ubicado en la carpeta **[db](https://github.com/edalvb/hdfisme/tree/master/db "db")**
   - O haga **reingeniería inversa** al modelo de la base de datos con el archivo ***[design.mwb](https://github.com/edalvb/hdfisme/blob/master/db/design.mwb "design.mwb")*** ubicado en la carpeta **[db](https://github.com/edalvb/hdfisme/tree/master/db "db")**

#### Ejecute HDFISME
1. Dentro de la carpeta **server** ejecute el siguiente comando: ``` node /build/index.js ```
   - Puede ejecutar el servidor en modo de desarrollo con ```npm run dev``` y ```npm run build```
2. Dentro de la carpeta **client** ejecute el siguiente comando: ``` ng serve ```
