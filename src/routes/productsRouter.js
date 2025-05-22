import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'

const router = Router()

//JSONS
const fileProductos = await readFile('./src/data/productos.json', 'utf-8')
const productos = JSON.parse(fileProductos)

//GET
router.get('/:productId', (req, res) => {
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
router.post('/nuevo', (req, res) => {    
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
        writeFile('./src/data/productos.json', JSON.stringify(productos, null, 2))
        res.status(200).json("Producto agregado!")        

    } catch (error) {
        res.status(500).json('Error interno')
    }
})


export default router