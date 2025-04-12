
import { readFile } from 'fs/promises'
//usuarios
const fileUsuarios = await readFile('./src/data/usuarios.json', 'utf-8')
const usuarios = JSON.parse(fileUsuarios)
//productos
const fileProductos = await readFile('./src/data/productos.json', 'utf-8')
const productos = JSON.parse(fileProductos)
//ventas
const fileVentas = await readFile('./src/data/ventas.json', 'utf-8')
const ventas = JSON.parse(fileVentas)


console.log("------------------Usuarios-------------------")
console.log(usuarios)
console.log("------------------Productos-------------------")
console.log(productos)
console.log("------------------Ventas-------------------")
console.log(ventas)

