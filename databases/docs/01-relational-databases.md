# 💾 Base de datos relacionales 💾

Las bases de datos relacionales se basan en el modelamiento de un fenómeno real bajo una estructura pre definida que permita saber lo que ahí ocurre.

## Introducción

### ¿ Por qué existen?

Existen porque representan fielmente la abstracción humana en términos de cómo procesamos la información en nuestro cerebro. Conectamos ideas, pensamientos y objetos, y las almacenamos en nuestra memoria con cierta estructura. Todo lo que sabemos o conocemos lo interconectamos para tomar alguna acción o decisión.

### Componentes de abstracción

- **Entidad**: persona, lugar, objeto o evento de interés acerca del cual se recogen o procesan datos. Esta se representa por medio de un rectángulo, mismo que contiene dentro el nombre de la entidad.
- **Atributo**: es una característica de una entidad o de una relación en función de lo que nos interesa en nuestra aplicación. Su representación gráfica es una elipse.
- **Relación**: Describe la interacción entre dos o más entidades.

<p align="center">
    <img src="./images/relational-databases-components.png" height="512"/>
</p>

### Conpectos básicos

Una **Tabla** es un conjunto de datos dispuesto en una estructura de filas y columnas. En una tabla las filas se denominan registros y las columnas campos; la primera fila contiene los nombres de campo. Cada campo contiene determinado tipo de datos y tiene una longitud expresada en el número de caracteres máximo del campo. Para crear una tabla es necesario definir su estructura:

- El nombre de la tabla.
- Los tipos de dato de cada campo.
- Las propiedades o características de cada campo.
- El campo clave.
