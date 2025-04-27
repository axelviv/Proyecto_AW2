//Importar
import express from 'express'
import dotenv from 'dotenv'
import { readFile, writeFile } from 'fs/promises'
import { get_user_byId } from './src/utils/usersUtil.js'
import { writeFileSync } from 'fs'

//Instancia de app
const app = express()

//Variables de entorno
dotenv.config()

//Configurar puerto
const port = process.env.PORT || 3000

//Para que express entienda json
app.use(express.json())

//Iniciar servidor
app.listen(port, ()=>{
    console.log(`Servidor iniciado en el puerto ${port}`)
})


//JSONS
//usuarios
const fileUsuarios = await readFile('./src/data/usuarios.json', 'utf-8')
const usuarios = JSON.parse(fileUsuarios)
//productos
const fileProductos = await readFile('./src/data/productos.json', 'utf-8')
const productos = JSON.parse(fileProductos)
//ventas
const fileVentas = await readFile('./src/data/ventas.json', 'utf-8')
const ventas = JSON.parse(fileVentas)


//Definicion de rutas
//GET
app.get('/users/all', (req, res) => {
    res.status(200).json(usuarios)
})

app.get('/users/nombre/:userId', (req, res) => {
    const user_id = req.params.userId
    
    try {
        const index = usuarios.findIndex(e => e.id == user_id)
        if (index !== -1){
            res.status(200).json(usuarios[index].nombre + ' ' + usuarios[index].apellido)
        }
        else
        {
            res.status(400).json('No se encontro al usuario')
        }
    } catch (error) {
        res.status(500).json('Error interno')
    }
})

app.get('/productos/:productId', (req, res) => {
    const producto_id = req.params.productId
    
    try {
        const index = productos.findIndex(e => e.id == producto_id)
        if (index !== -1){
            res.status(200).json(productos[index])
        }
        else
        {
            res.status(400).json('No se encontro el producto solicitado')
        }
    } catch (error) {
        res.status(500).json('Error interno')
    }
})


//POST
app.post('/productos/nuevo', (req, res) => {    
    const nuevoProducto = {
        id: req.body.id,
        nombre: req.body.nombre,
        desc: req.body.desc,
        precio: req.body.precio,
        imagen: req.body.imagen,
        stock: req.body.stock
    }

    //Body de Postman
    /* {
        "id": 87,
        "nombre": "nuevoProducto",
        "desc": "para perros y gatos",
        "precio": 5300,
        "imagen": "mascotas.jpg",
        "stock": false
    } */
    
    try {
        
        productos.push(nuevoProducto)
        writeFileSync('./src/data/productos.json', JSON.stringify(productos, null, 2))
        res.status(200).json("Producto agregado!")        

    } catch (error) {
        res.status(500).json('Error interno')
    }
})

app.post('/ventas/detalle', (req, res) => {
    //Rango del total de ventas que filtra en el body
    const from = Number(req.body.from)
    const to = Number(req.body.to)
    
    //Body de Postman
    /* {
        "from": 2300,
        "to":  5000
    } */

    let comprador = ''
    
    try {
        const array = ventas.filter(e => e.total >= from && e.total <= to)
        
        const result = array.map(e => {
            comprador = get_user_byId(e.id_usuario)
            comprador = comprador.nombre + ' ' + comprador.apellido

            return {
                id_venta: e.id,
                direccion: e.direccion,
                comprador: comprador
            }
        })

        if (result){
            res.status(200).json(result)
        }
        else
        {
            res.status(400).json(`No se encontraron ventas con valores entre ${from} y ${to}`)
        }
    } catch (error) {
        res.status(500).json('Error interno')
    }
})


//PUT
app.put('/users/email/:userId', (req, res)=>{
    const user_id = req.params.userId
    const correo = req.body.email

    //Body de Postman
    /* {
        "email": "pepito_argento73@hotmail.com"
    } */

    try {
        const index = usuarios.findIndex(e => e.id == user_id)
        if (index !== -1){
            usuarios[index].email = correo
            writeFile('./src/data/usuarios.json', JSON.stringify(usuarios, null, 2))
            res.status(200).json("Email actualizado!")
        }
        else
        {
            res.status(400).json('no se encontro al usuario')
        }
    } catch (error) {
        res.send(500).json('Error al actualizar el email')
    }
})


//DELETE
app.delete('/users/delete/:userId', (req, res)=>{
    const user_id = req.params.userId

    try {
        const index = usuarios.findIndex(e => e.id == user_id)

        if (index !== -1){
            //Eliminar usuario
            usuarios.splice(index, 1)
            writeFile('./src/data/usuarios.json', JSON.stringify(usuarios, null, 2))

            //Eliminar compras del usuario
            const ventasAjenasAlUsuario = ventas.filter(e => e.id_usuario != user_id)
            writeFile('./src/data/ventas.json', JSON.stringify(ventasAjenasAlUsuario, null, 2))

            res.status(200).json("El usuario y sus compras han sido eliminados!")
        }
        else
        {
            res.status(400).json('no se encontro al usuario') 
        }
    } catch (error) {
        res.send(500).json('Error al eliminar al usuario')
    }
})




