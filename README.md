# CeballosPardoSarah-10
Segunda entrega del Proyecto Final


Para cambiar la persistencia:
En el archivo /src/dao/config.js
En la linea 1 modificar la variable persistence
Opciones: "MEMORY", "MONGO", "FILES"

Para cambiar el tipo de usuario:
En el archivo /src/index.js
En la linea 8 modificar la variable admin
Opciones: true, false

Carga de Producto:
{
    "name":"Escuadra",
    "price":123,
    "thumbnail":"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    "code":"1wwe",
    "stock":5,
    "description":"Regla"
}

Carga de un Producto a un Carrito:
http://localhost:8080/api/carts/1/products
{
    "pid":1
}