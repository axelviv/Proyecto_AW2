import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'

const router = Router()


//GET
router.get('/all', async (req, res) => {
    try {
        const fileProductos = await readFile('./src/data/productos.json', 'utf-8')
        const productos = JSON.parse(fileProductos)

        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json('Error al leer los productos')
    }
})


router.get('/:productId', async (req, res) => {
    const producto_id = req.params.productId
    try {
        const fileProductos = await readFile('./src/data/productos.json', 'utf-8')
        const productos = JSON.parse(fileProductos)

        const index = productos.findIndex(e => e.id == producto_id)
        if (index !== -1) {
            res.status(200).json(productos[index])
        }
        else {
            res.status(400).json('No se encontro el producto solicitado')
        }
    } catch (error) {
        res.status(500).json('Error interno')
    }
})

//POST
router.post('/nuevo', async (req, res) => {
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
        const fileProductos = await readFile('./src/data/productos.json', 'utf-8')
        const productos = JSON.parse(fileProductos)

        productos.push(nuevoProducto)
        await writeFile('./src/data/productos.json', JSON.stringify(productos, null, 2))
        res.status(200).json("Producto agregado!")

    } catch (error) {
        res.status(500).json('Error interno')
    }
})


export default router